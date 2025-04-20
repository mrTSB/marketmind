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

app = FastAPI(title="MarketMind API", description="API for marketing campaign generation and analysis")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for generated content
generated_content: Dict[str, Dict] = {}

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

async def generate_parallel(product_info: str, company_info: str):
    """Run market research and campaigns in parallel"""
    market_research_task = asyncio.to_thread(conduct_market_research, product_info, company_info)
    campaigns_task = asyncio.to_thread(generate_campaign_ideas, product_info, company_info)
    
    market_research, campaigns = await asyncio.gather(market_research_task, campaigns_task)
    return market_research, campaigns

async def generate_secondary_parallel(detailed_campaign: DetailedCampaign):
    """Run GTM plan and personas generation in parallel"""
    gtm_plan_task = asyncio.to_thread(generate_gtm_plan, detailed_campaign)
    personas_task = asyncio.to_thread(generate_personas, detailed_campaign.concept)
    
    gtm_plan, personas = await asyncio.gather(gtm_plan_task, personas_task)
    return gtm_plan, personas

@app.post("/generate", response_model=GenerationResponse)
async def generate_all(product_info: ProductInfo):
    """Generate all marketing content based on product and company information"""
    # Generate a unique ID
    content_id = str(uuid.uuid4())
    timestamp = datetime.now().isoformat()
    
    try:
        # Generate market research and campaigns in parallel
        market_research, campaigns = await generate_parallel(
            product_info.product_info, 
            product_info.company_info
        )
        
        # Generate detailed campaign (needs campaigns result)
        detailed_campaign = generate_detailed_campaign(campaigns.campaigns[0], product_info.product_info, product_info.company_info)
        
        # Generate GTM plan and personas in parallel
        gtm_plan, personas = await generate_secondary_parallel(detailed_campaign)
        
        # Generate executive brief (needs both detailed campaign and GTM plan)
        executive_brief = generate_executive_brief(detailed_campaign, gtm_plan)
        
        # Store all generated content
        generated_content[content_id] = {
            "timestamp": timestamp,
            "campaigns": campaigns,
            "detailed_campaign": detailed_campaign,
            "gtm_plan": gtm_plan,
            "personas": personas,
            "market_research": market_research,
            "executive_brief": executive_brief
        }
        
        return GenerationResponse(id=content_id, timestamp=timestamp)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/content/{content_id}/campaigns", response_model=CampaignList)
async def get_campaigns(content_id: str):
    """Get generated campaigns"""
    if content_id not in generated_content:
        raise HTTPException(status_code=404, detail="Content not found")
    return generated_content[content_id]["campaigns"]

@app.get("/content/{content_id}/detailed-campaign", response_model=DetailedCampaign)
async def get_detailed_campaign(content_id: str):
    """Get detailed campaign"""
    if content_id not in generated_content:
        raise HTTPException(status_code=404, detail="Content not found")
    return generated_content[content_id]["detailed_campaign"]

@app.get("/content/{content_id}/gtm-plan", response_model=GTMPlan)
async def get_gtm_plan(content_id: str):
    """Get GTM plan"""
    if content_id not in generated_content:
        raise HTTPException(status_code=404, detail="Content not found")
    return generated_content[content_id]["gtm_plan"]

@app.get("/content/{content_id}/personas", response_model=PersonaList)
async def get_personas(content_id: str):
    """Get personas"""
    if content_id not in generated_content:
        raise HTTPException(status_code=404, detail="Content not found")
    return generated_content[content_id]["personas"]

@app.get("/content/{content_id}/market-research", response_model=MarketResearch)
async def get_market_research(content_id: str):
    """Get market research"""
    if content_id not in generated_content:
        raise HTTPException(status_code=404, detail="Content not found")
    return generated_content[content_id]["market_research"]

@app.get("/content/{content_id}/executive-brief", response_model=ExecutiveBrief)
async def get_executive_brief(content_id: str):
    """Get executive brief"""
    if content_id not in generated_content:
        raise HTTPException(status_code=404, detail="Content not found")
    return generated_content[content_id]["executive_brief"]

@app.get("/debug/content", response_model=Dict[str, Dict])
async def get_all_content():
    """Debug endpoint to view all generated content"""
    return generated_content

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
