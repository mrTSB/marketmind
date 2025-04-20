from typing import List
from pydantic import BaseModel
from models.llms import llm_call
from make_campaigns import DetailedCampaign
# from rich.console import Console
# from rich.panel import Panel
# from rich.table import Table
# from rich import print as rprint

class GTMPlan(BaseModel):
    title: str
    executive_summary: str
    market_analysis: str
    value_proposition: str
    competitive_strategy: str
    marketing_strategy: str
    marketing_channels: List[str]
    sales_and_pricing: str
    launch_plan: str
    timeline: List[str]
    metrics_and_goals: List[str]
    risk_and_resources: str
    growth_strategy: str

def generate_gtm_plan(campaign: 'DetailedCampaign') -> GTMPlan:
    """
    Generate a comprehensive go-to-market plan based on a DetailedCampaign.
    """
    system_prompt = """You are an expert marketing strategist and business consultant. 
    Your task is to create a detailed, actionable go-to-market plan based on the provided campaign details.
    Your response should be comprehensive, practical, and aligned with the campaign's objectives.
    Always provide specific, measurable, and realistic recommendations."""
    
    prompt = f"""Based on the following key campaign details, create a comprehensive go-to-market plan:

    Campaign Name: {campaign.name}
    Target Audience: {campaign.target_audience}
    Key Message: {campaign.key_message}
    Campaign Objectives: {', '.join(campaign.campaign_objectives)}
    Media Channels: {', '.join(campaign.media_channels)}
    Timeline: {campaign.timeline}
    KPIs: {', '.join(campaign.key_performance_indicators)}

    Create a detailed go-to-market plan that includes:
    Title: {campaign.name}
    1. Executive Summary (TLDR)
    2. Market Analysis (target market, segmentation, and problem statement)
    3. Value Proposition
    4. Competitive Strategy (analysis and differentiation)
    5. Marketing Strategy (including messaging)
    6. Marketing Channels
    7. Sales and Pricing Strategy (including monetization)
    8. Launch Plan
    9. Timeline with Milestones
    10. Metrics and Goals
    11. Risk and Resource Management
    12. Growth Strategy (partnerships, acquisition, retention, scalability)

    Ensure each section is detailed, actionable, and aligned with the campaign's objectives."""

    response = llm_call(
        prompt,
        system_prompt=system_prompt,
        response_format=GTMPlan
    )
    
    return response

def format_gtm_plan(gtm_plan: GTMPlan):
    """Format the GTM plan for console output"""
    print("\n=== EXECUTIVE SUMMARY ===")
    print(gtm_plan.title)
    print(gtm_plan.executive_summary)
    
    print("\n=== MARKET ANALYSIS ===")
    print("Market Analysis:")
    print(gtm_plan.market_analysis)
    print("\nValue Proposition:")
    print(gtm_plan.value_proposition)
    
    print("\n=== COMPETITIVE STRATEGY ===")
    print(gtm_plan.competitive_strategy)
    
    print("\n=== MARKETING STRATEGY ===")
    print("Strategy:")
    print(gtm_plan.marketing_strategy)
    print("\nMarketing Channels:")
    for channel in gtm_plan.marketing_channels:
        print(f"- {channel}")
    
    print("\n=== SALES AND PRICING STRATEGY ===")
    print(gtm_plan.sales_and_pricing)
    
    print("\n=== LAUNCH PLAN ===")
    print(gtm_plan.launch_plan)
    
    print("\n=== TIMELINE & MILESTONES ===")
    for milestone in gtm_plan.timeline:
        print(f"- {milestone}")
    
    print("\n=== METRICS AND GOALS ===")
    for metric in gtm_plan.metrics_and_goals:
        print(f"- {metric}")
    
    print("\n=== RISK AND RESOURCE MANAGEMENT ===")
    print(gtm_plan.risk_and_resources)
    
    print("\n=== GROWTH STRATEGY ===")
    print(gtm_plan.growth_strategy)

def main():
    # Create a hard-coded example campaign
    example_campaign = DetailedCampaign(
        name="EcoCharge - Sustainable Energy Solutions",
        slogan="Powering Tomorrow, Sustainably Today",
        concept="A comprehensive platform for residential and small business solar energy solutions",
        target_audience="Environmentally conscious homeowners and small business owners aged 30-55",
        key_message="Make the switch to solar energy with zero upfront costs and guaranteed savings",
        campaign_objectives=[
            "Achieve 1000 residential installations in first year",
            "Establish brand as leader in sustainable energy solutions",
            "Maintain 95% customer satisfaction rate",
            "Reduce customer acquisition cost by 20%"
        ],
        brand_positioning="The most accessible and reliable solar energy solution provider",
        creative_strategy="Focus on long-term savings and environmental impact through real customer stories",
        media_channels=[
            "Social media (LinkedIn, Instagram, Facebook)",
            "Content marketing (blog, whitepapers)",
            "Email marketing",
            "Local community events",
            "Partnerships with environmental organizations"
        ],
        budget_allocation="40% digital marketing, 30% community events, 20% content creation, 10% partnerships",
        timeline="6-month rollout with phased approach",
        key_performance_indicators=[
            "Installation conversion rate",
            "Customer acquisition cost",
            "Customer satisfaction score",
            "Social media engagement",
            "Website traffic and lead generation"
        ],
        competitive_analysis="Competitors focus on large-scale installations, leaving residential market underserved",
        risk_assessment="Market education needed, potential regulatory changes, seasonal installation challenges",
        success_metrics=[
            "Monthly installation targets",
            "Customer satisfaction scores",
            "Cost per acquisition",
            "Social media growth",
            "Partnership development"
        ]
    )
    
    print("\nGenerating GTM plan for EcoCharge...")
    gtm_plan = generate_gtm_plan(example_campaign)
    
    print("\n=== Campaign Details ===")
    print(f"Name: {example_campaign.name}")
    print(f"Slogan: {example_campaign.slogan}")
    print(f"Concept: {example_campaign.concept}")
    print(f"Target Audience: {example_campaign.target_audience}")
    print(f"Key Message: {example_campaign.key_message}")
    
    print("\n=== Go-To-Market Plan ===")
    format_gtm_plan(gtm_plan)

if __name__ == "__main__":
    main()
