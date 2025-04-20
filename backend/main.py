from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import uvicorn
import uuid
from datetime import datetime
import asyncio

from make_campaigns import Campaign, CampaignList, DetailedCampaign, generate_campaign_ideas, generate_detailed_campaign
from generate_gtm import GTMPlan, generate_gtm_plan
from make_personas import Persona, PersonaList, generate_personas
from market_research import MarketResearch, conduct_market_research
from executive_briefs import ExecutiveBrief, generate_executive_brief
from models.llms import llm_call_messages_async
from db import JsonDB

app = FastAPI(title="MarketMind API", description="API for marketing campaign generation and analysis")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
db = JsonDB("marketmind_content")

class ProductInfo(BaseModel):
    product_info: str
    company_info: str

class CampaignDescription(BaseModel):
    campaign_description: str

class ExecutiveBriefInput(BaseModel):
    campaign: DetailedCampaign
    gtm_plan: GTMPlan

class GenerationResponse(BaseModel):
    id: str
    timestamp: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    content_id: str
    persona_name: str
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str

class GroupChatRequest(BaseModel):
    content_id: str
    initial_message: str

class PersonaResponse(BaseModel):
    persona_name: str
    response: str

class GroupChatResponse(BaseModel):
    responses: List[PersonaResponse]

async def generate_parallel(product_info: str, company_info: str):
    """Run all content generation in parallel"""
    # First level of parallelization
    market_research_task = asyncio.to_thread(conduct_market_research, product_info, company_info)
    campaigns_task = asyncio.to_thread(generate_campaign_ideas, product_info, company_info)
    
    market_research, campaigns = await asyncio.gather(market_research_task, campaigns_task)
    
    # Generate detailed campaign (needs campaigns result)
    detailed_campaign = generate_detailed_campaign(campaigns.campaigns[0], product_info, company_info)
    
    # Second level of parallelization
    gtm_plan_task = asyncio.to_thread(generate_gtm_plan, detailed_campaign)
    personas_task = asyncio.to_thread(generate_personas, detailed_campaign.concept)
    
    gtm_plan, personas = await asyncio.gather(gtm_plan_task, personas_task)
    
    # Generate executive brief (needs both detailed campaign and GTM plan)
    executive_brief = generate_executive_brief(detailed_campaign, gtm_plan)
    
    return {
        "campaigns": campaigns,
        "detailed_campaign": detailed_campaign,
        "gtm_plan": gtm_plan,
        "personas": personas,
        "market_research": market_research,
        "executive_brief": executive_brief
    }

@app.post("/generate", response_model=GenerationResponse)
async def generate_all(product_info: ProductInfo):
    """Generate all marketing content based on product and company information"""
    content_id = str(uuid.uuid4())
    timestamp = datetime.now().isoformat()
    
    # Store initial entry in database
    db.create(content_id, {
        "timestamp": timestamp,
        "product_info": product_info.product_info,
        "company_info": product_info.company_info
    })
    
    # Generate content in parallel
    content = await generate_parallel(
        product_info.product_info, product_info.company_info
    )
    
    # Update database with generated content
    db.update(content_id, {
        "timestamp": timestamp,
        "product_info": product_info.product_info,
        "company_info": product_info.company_info,
        "campaigns": [campaign.dict() for campaign in content["campaigns"].campaigns],
        "detailed_campaign": content["detailed_campaign"].dict(),
        "gtm_plan": content["gtm_plan"].dict(),
        "personas": [persona.dict() for persona in content["personas"].personas],
        "market_research": content["market_research"].dict(),
        "executive_brief": content["executive_brief"].dict()
    })
    
    return GenerationResponse(id=content_id, timestamp=timestamp)

@app.get("/content/{content_id}/campaigns", response_model=CampaignList)
async def get_campaigns(content_id: str):
    """Get generated campaigns"""
    content = db.read(content_id)
    if not content or "campaigns" not in content:
        raise HTTPException(status_code=404, detail="Content not found")
    return CampaignList(campaigns=[Campaign(**campaign) for campaign in content["campaigns"]])

@app.get("/content/{content_id}/detailed-campaign", response_model=DetailedCampaign)
async def get_detailed_campaign(content_id: str):
    """Get detailed campaign"""
    content = db.read(content_id)
    if not content or "detailed_campaign" not in content:
        raise HTTPException(status_code=404, detail="Content not found")
    return DetailedCampaign(**content["detailed_campaign"])

@app.get("/content/{content_id}/gtm-plan", response_model=GTMPlan)
async def get_gtm_plan(content_id: str):
    """Get GTM plan"""
    content = db.read(content_id)
    if not content or "gtm_plan" not in content:
        raise HTTPException(status_code=404, detail="Content not found")
    return GTMPlan(**content["gtm_plan"])

@app.get("/content/{content_id}/personas", response_model=PersonaList)
async def get_personas(content_id: str):
    """Get personas"""
    content = db.read(content_id)
    if not content or "personas" not in content:
        raise HTTPException(status_code=404, detail="Content not found")
    return PersonaList(personas=[Persona(**persona) for persona in content["personas"]])

@app.get("/content/{content_id}/market-research", response_model=MarketResearch)
async def get_market_research(content_id: str):
    """Get market research"""
    content = db.read(content_id)
    if not content or "market_research" not in content:
        raise HTTPException(status_code=404, detail="Content not found")
    return MarketResearch(**content["market_research"])

@app.get("/content/{content_id}/executive-brief", response_model=ExecutiveBrief)
async def get_executive_brief(content_id: str):
    """Get executive brief"""
    content = db.read(content_id)
    if not content or "executive_brief" not in content:
        raise HTTPException(status_code=404, detail="Content not found")
    return ExecutiveBrief(**content["executive_brief"])

@app.get("/debug/content", response_model=Dict[str, Dict])
async def get_all_content():
    """Debug endpoint to view all generated content"""
    return db.list_all()

@app.post("/chat", response_model=ChatResponse)
async def chat_with_persona(chat_request: ChatRequest):
    """Chat with a persona using their system prompt"""
    content = db.read(chat_request.content_id)
    if not content:
        print(f"Content not found: {chat_request.content_id}")
        raise HTTPException(status_code=404, detail=f"Content not found: {chat_request.content_id}")
    
    # Find the persona by name
    personas = content.get("personas", [])
    persona = next((p for p in personas if p["name"] == chat_request.persona_name), None)
    
    if not persona:
        print(f"Persona not found: {chat_request.persona_name}")
        raise HTTPException(status_code=404, detail=f"Persona not found: {chat_request.persona_name}")
    
    # Prepare messages for the LLM
    messages = [
        {"role": "system", "content": persona["chat_system_prompt"]}
    ]
    
    # Add user messages
    for msg in chat_request.messages:
        messages.append({"role": msg.role, "content": msg.content})
    
    # Get response from LLM
    response = await llm_call_messages_async(messages, model="google/gemini-2.5-flash-preview")
    
    return ChatResponse(response=response)

@app.post("/group-chat", response_model=GroupChatResponse)
async def group_chat(chat_request: GroupChatRequest):
    """Generate responses from all personas for a given message"""
    content = db.read(chat_request.content_id)
    if not content:
        raise HTTPException(status_code=404, detail=f"Content not found: {chat_request.content_id}")
    
    personas = content.get("personas", [])
    if not personas:
        raise HTTPException(status_code=404, detail="No personas found for this content")
    
    responses = []
    for persona in personas:
        # Prepare messages for the LLM
        messages = [
            {"role": "system", "content": persona["chat_system_prompt"]},
            {"role": "user", "content": chat_request.initial_message}
        ]
        
        # Get response from LLM
        response = await llm_call_messages_async(messages, model="google/gemini-2.5-flash-preview")
        
        responses.append(PersonaResponse(
            persona_name=persona["name"],
            response=response
        ))
    
    return GroupChatResponse(responses=responses)

class HeatmapRequest(BaseModel):
    image_url: str
    description: str

class HeatmapResponse(BaseModel):
    base64_heatmap: str

@app.post("/generate-heatmap", response_model=HeatmapResponse)
async def generate_heatmap(heatmap_request: HeatmapRequest):
    """Generate a heatmap for a given image and description"""
    base64_heatmap = generate_heatmap(heatmap_request.image_url, heatmap_request.description)
    return HeatmapResponse(base64_heatmap=base64_heatmap)   


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
