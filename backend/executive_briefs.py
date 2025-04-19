from typing import List
from pydantic import BaseModel
from models.llms import llm_call
from make_campaigns import DetailedCampaign
from generate_gtm import GTMPlan

class ExecutiveBrief(BaseModel):
    title: str
    executive_summary: str
    business_opportunity: str
    investment_required: str
    expected_roi: str
    key_risks: List[str]
    key_benefits: List[str]
    timeline_highlights: List[str]
    recommendation: str
    next_steps: List[str]

def generate_executive_brief(campaign: DetailedCampaign, gtm_plan: GTMPlan) -> ExecutiveBrief:
    """
    Generate a concise executive brief combining campaign and GTM plan information.
    """
    system_prompt = """You are an expert business strategist and executive communicator.
    Your task is to create a compelling executive brief that clearly communicates the value proposition,
    required investment, and expected returns of a marketing campaign and GTM plan.
    Focus on business impact, ROI, and strategic alignment while keeping the content concise and actionable.
    Use clear, executive-friendly language and highlight key decision points."""

    prompt = f"""Create an executive brief for the following campaign and GTM plan:

    CAMPAIGN DETAILS:
    Name: {campaign.name}
    Target Audience: {campaign.target_audience}
    Key Message: {campaign.key_message}
    Campaign Objectives: {', '.join(campaign.campaign_objectives)}
    Media Channels: {', '.join(campaign.media_channels)}
    Budget Allocation: {campaign.budget_allocation}
    Timeline: {campaign.timeline}

    GTM PLAN HIGHLIGHTS:
    Market Analysis: {gtm_plan.market_analysis}
    Value Proposition: {gtm_plan.value_proposition}
    Competitive Strategy: {gtm_plan.competitive_strategy}
    Marketing Strategy: {gtm_plan.marketing_strategy}
    Sales and Pricing: {gtm_plan.sales_and_pricing}
    Launch Plan: {gtm_plan.launch_plan}
    Growth Strategy: {gtm_plan.growth_strategy}

    Create a concise executive brief that includes:
    1. A compelling title
    2. Executive summary (2-3 sentences)
    3. Clear business opportunity statement
    4. Required investment (high-level)
    5. Expected ROI
    6. Key risks (3-4 bullet points)
    7. Key benefits (3-4 bullet points)
    8. Timeline highlights (3-4 key milestones)
    9. Clear recommendation
    10. Next steps (3-4 actionable items)

    Focus on business impact and strategic value while keeping the content concise and actionable."""

    structured_response = llm_call(
        prompt,
        system_prompt=system_prompt,
        response_format=ExecutiveBrief
    )
    
    return structured_response

def format_executive_brief(brief: ExecutiveBrief):
    """Format the executive brief for console output"""
    print("\n" + "="*50)
    print(f"EXECUTIVE BRIEF: {brief.title}")
    print("="*50)
    
    print("\nEXECUTIVE SUMMARY:")
    print(brief.executive_summary)
    
    print("\nBUSINESS OPPORTUNITY:")
    print(brief.business_opportunity)
    
    print("\nINVESTMENT REQUIRED:")
    print(brief.investment_required)
    
    print("\nEXPECTED ROI:")
    print(brief.expected_roi)
    
    print("\nKEY RISKS:")
    for risk in brief.key_risks:
        print(f"- {risk}")
    
    print("\nKEY BENEFITS:")
    for benefit in brief.key_benefits:
        print(f"- {benefit}")
    
    print("\nTIMELINE HIGHLIGHTS:")
    for milestone in brief.timeline_highlights:
        print(f"- {milestone}")
    
    print("\nRECOMMENDATION:")
    print(brief.recommendation)
    
    print("\nNEXT STEPS:")
    for step in brief.next_steps:
        print(f"- {step}")
    
    print("\n" + "="*50)

def main():
    # Example usage with the existing example campaign and GTM plan
    from generate_gtm import GTMPlan
    
    # Get the example campaign and GTM plan
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
    
    # Hardcoded GTM plan
    gtm_plan = GTMPlan(
        executive_summary="EcoCharge aims to revolutionize residential solar adoption through a comprehensive marketing and sales strategy targeting environmentally conscious homeowners.",
        market_analysis="The residential solar market is growing at 15% annually, with increasing consumer awareness and government incentives driving demand.",
        value_proposition="Zero upfront cost solar solutions with guaranteed savings and environmental impact.",
        competitive_strategy="Focus on residential market underserved by competitors, emphasizing ease of adoption and guaranteed returns.",
        marketing_strategy="Multi-channel approach combining digital marketing, community engagement, and strategic partnerships.",
        marketing_channels=[
            "Digital marketing (SEO, PPC, social media)",
            "Community events and workshops",
            "Strategic partnerships with environmental organizations",
            "Content marketing and thought leadership"
        ],
        sales_and_pricing="Flexible financing options with no upfront costs, competitive pricing with guaranteed savings.",
        launch_plan="Phased rollout starting with key markets, followed by national expansion.",
        timeline=[
            "Month 1-2: Market research and strategy development",
            "Month 3-4: Initial launch in key markets",
            "Month 5-6: National expansion and optimization",
            "Month 7-12: Scale operations and refine strategy"
        ],
        metrics_and_goals=[
            "1000 installations in first year",
            "20% reduction in customer acquisition cost",
            "95% customer satisfaction rate",
            "30% increase in brand awareness"
        ],
        risk_and_resources="Key risks include regulatory changes and seasonal installation challenges. Resources include experienced team and strategic partnerships.",
        growth_strategy="Expand through strategic partnerships, optimize operations, and scale marketing efforts based on performance data."
    )
    
    # Generate and display the executive brief
    brief = generate_executive_brief(example_campaign, gtm_plan)
    format_executive_brief(brief)

if __name__ == "__main__":
    main()
