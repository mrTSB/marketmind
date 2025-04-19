from models.llms import llm_call
from pydantic import BaseModel
from typing import List

class Campaign(BaseModel):
    name: str
    slogan: str
    concept: str
    target_audience: str
    key_message: str

class CampaignList(BaseModel):
    campaigns: List[Campaign]

class DetailedCampaign(BaseModel):
    name: str
    slogan: str
    concept: str
    target_audience: str
    key_message: str
    campaign_objectives: List[str]
    brand_positioning: str
    creative_strategy: str
    media_channels: List[str]
    budget_allocation: str
    timeline: str
    key_performance_indicators: List[str]
    competitive_analysis: str
    risk_assessment: str
    success_metrics: List[str]

def generate_campaign_ideas(product_info: str, company_info: str) -> CampaignList:
    prompt = f"""Generate 5 unique and creative ad campaign ideas for the following product and company:

    Product Information:
    {product_info}

    Company Information:
    {company_info}

    Each campaign should include:
    - A catchy name
    - A memorable slogan
    - A brief concept description
    - Target audience
    - Key message
    
    Make the campaigns diverse in approach while staying true to the product and company's identity."""
    
    system_prompt = """You are a creative advertising expert. Generate unique and compelling ad campaign ideas that are specifically tailored to the given product and company.
    Each campaign should be distinct and cover different marketing approaches while maintaining brand consistency.
    Focus on modern, relevant concepts that would resonate with the target audience and highlight the product's unique selling points."""
    
    structured_response = llm_call(
        prompt,
        system_prompt=system_prompt,
        response_format=CampaignList
    )
    
    return structured_response

def generate_detailed_campaign(campaign: Campaign, product_info: str, company_info: str) -> DetailedCampaign:
    prompt = f"""Generate a detailed marketing campaign plan for the following campaign, product, and company:

    Campaign Information:
    Name: {campaign.name}
    Slogan: {campaign.slogan}
    Concept: {campaign.concept}
    Target Audience: {campaign.target_audience}
    Key Message: {campaign.key_message}

    Product Information:
    {product_info}

    Company Information:
    {company_info}
    
    Provide a comprehensive campaign plan including:
    - Specific campaign objectives
    - Brand positioning statement
    - Creative strategy
    - Recommended media channels
    - Budget allocation recommendations
    - Campaign timeline
    - Key performance indicators
    - Competitive analysis
    - Risk assessment
    - Success metrics"""
    
    system_prompt = """You are a strategic marketing expert. Create a detailed, actionable marketing campaign plan that aligns with both the product's features and the company's brand identity.
    Focus on practical implementation while maintaining creative excellence and brand consistency.
    Provide specific, measurable, and realistic recommendations that leverage the product's unique selling points."""
    
    structured_response = llm_call(
        prompt,
        system_prompt=system_prompt,
        response_format=DetailedCampaign
    )
    
    return structured_response

if __name__ == "__main__":
    # Example product and company information as strings
    product_info = """
    Product Name: EcoSmart Water Bottle
    Description: A sustainable, smart water bottle that tracks hydration and reduces plastic waste
    Key Features: Smart hydration tracking, Temperature control, Built-in filter, Durable materials
    Target Market: Health-conscious professionals and students
    Price Point: Premium ($49.99)
    Unique Selling Points: Eco-friendly materials, Smart technology integration, Long-lasting design
    """
    
    company_info = """
    Company Name: GreenTech Solutions
    Industry: Sustainable Consumer Products
    Brand Values: Sustainability, Innovation, Health, Quality
    Mission Statement: To create innovative, sustainable products that improve lives while protecting the planet
    Target Audience: Environmentally conscious millennials and Gen Z
    Market Position: Premium sustainable lifestyle brand
    """
    
    # Generate initial campaign ideas
    campaigns = generate_campaign_ideas(product_info, company_info)
    print("\n=== Ad Campaign Ideas ===\n")
    for i, campaign in enumerate(campaigns.campaigns, 1):
        print(f"Campaign #{i}: {campaign.name}")
        print(f"Slogan: {campaign.slogan}")
        print(f"Concept: {campaign.concept}")
        print(f"Target Audience: {campaign.target_audience}")
        print(f"Key Message: {campaign.key_message}")
        print("\n" + "-"*50 + "\n")
    
    # Example of generating detailed campaign for the first campaign
    if campaigns.campaigns:
        detailed_campaign = generate_detailed_campaign(campaigns.campaigns[0], product_info, company_info)
        print("\n=== Detailed Campaign Plan ===\n")
        print(f"Campaign Name: {detailed_campaign.name}")
        print(f"Slogan: {detailed_campaign.slogan}")
        print("\nCampaign Objectives:")
        for obj in detailed_campaign.campaign_objectives:
            print(f"- {obj}")
        print(f"\nBrand Positioning: {detailed_campaign.brand_positioning}")
        print(f"\nCreative Strategy: {detailed_campaign.creative_strategy}")
        print("\nMedia Channels:")
        for channel in detailed_campaign.media_channels:
            print(f"- {channel}")
        print(f"\nBudget Allocation: {detailed_campaign.budget_allocation}")
        print(f"\nTimeline: {detailed_campaign.timeline}")
        print("\nKey Performance Indicators:")
        for kpi in detailed_campaign.key_performance_indicators:
            print(f"- {kpi}")
        print(f"\nCompetitive Analysis: {detailed_campaign.competitive_analysis}")
        print(f"\nRisk Assessment: {detailed_campaign.risk_assessment}")
        print("\nSuccess Metrics:")
        for metric in detailed_campaign.success_metrics:
            print(f"- {metric}")
