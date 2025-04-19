from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

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

class ProductInfo(BaseModel):
    product_info: str
    company_info: str

class CampaignDescription(BaseModel):
    campaign_description: str

class ExecutiveBriefInput(BaseModel):
    campaign: DetailedCampaign
    gtm_plan: GTMPlan

@app.post("/campaigns/generate", response_model=CampaignList)
async def generate_campaigns(product_info: ProductInfo):
    """Generate campaign ideas based on product and company information"""
    return generate_campaign_ideas(product_info.product_info, product_info.company_info)

@app.post("/campaigns/detailed", response_model=DetailedCampaign)
async def generate_detailed_campaign_endpoint(campaign: Campaign, product_info: ProductInfo):
    """Generate a detailed campaign plan"""
    return generate_detailed_campaign(campaign, product_info.product_info, product_info.company_info)

@app.post("/gtm/generate", response_model=GTMPlan)
async def generate_gtm_plan_endpoint(campaign: DetailedCampaign):
    """Generate a go-to-market plan for a campaign"""
    return generate_gtm_plan(campaign)

@app.post("/personas/generate", response_model=PersonaList)
async def generate_personas_endpoint(campaign_description: CampaignDescription):
    """Generate buyer personas"""
    return generate_personas(campaign_description.campaign_description)

@app.post("/market-research/generate", response_model=MarketResearch)
async def generate_market_research_endpoint(product_info: ProductInfo):
    """Generate market research analysis"""
    return conduct_market_research(product_info.product_info, product_info.company_info)

@app.post("/executive-briefs/generate", response_model=ExecutiveBrief)
async def generate_executive_brief_endpoint(input_data: ExecutiveBriefInput):
    """Generate an executive brief"""
    return generate_executive_brief(input_data.campaign, input_data.gtm_plan)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 