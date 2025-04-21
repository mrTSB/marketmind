from models.agents import Agent
from models.tool_registry import tool_registry
from models.llms import llm_call
from pydantic import BaseModel
from typing import List, Optional


class Competitor(BaseModel):
    name: str
    description: str
    market_share: Optional[float]
    strengths: List[str]
    weaknesses: List[str]
    pricing_strategy: str
    target_audience: str
    status: str  # active, defunct, etc.
    reason_for_status: Optional[str]  # if defunct, why?

class CompetitorList(BaseModel):
    competitor: List[Competitor]

class MarketSize(BaseModel):
    total_market_value: float
    unit: str  # e.g., "USD", "EUR"
    year: int
    growth_rate: float
    projected_value: float
    projection_year: int

class MarketDemographics(BaseModel):
    age_groups: List[str]
    income_levels: List[str]
    geographic_regions: List[str]
    education_levels: List[str]
    key_psychographics: List[str]

class RegulatoryEnvironment(BaseModel):
    current_regulations: List[str]
    pending_regulations: List[str]
    compliance_requirements: List[str]
    regulatory_bodies: List[str]
    potential_risks: List[str]

class MarketTrends(BaseModel):
    current_trends: List[str]
    emerging_trends: List[str]
    declining_trends: List[str]
    technology_impact: List[str]
    social_impact: List[str]

class PainPoints(BaseModel):
    customer_pain_points: List[str]
    industry_pain_points: List[str]
    unsolved_problems: List[str]
    current_solutions: List[str]
    solution_gaps: List[str]

class MarketInfluencers(BaseModel):
    key_opinion_leaders: List[str]
    industry_experts: List[str]
    thought_leaders: List[str]
    media_outlets: List[str]
    social_media_influencers: List[str]

class MarketResearch(BaseModel):
    title: str
    competitors: List[Competitor]
    market_size: MarketSize
    demographics: MarketDemographics
    regulatory_environment: RegulatoryEnvironment
    trends: MarketTrends
    pain_points: PainPoints
    influencers: MarketInfluencers
    summary: str



def research_competitors(product_description: str, company_description: str) -> List[Competitor]:
    prompt = f"""
    Based on the following product and company descriptions, identify and analyze key competitors (both current and past).
    For each competitor, provide concise information, where each idea is in as few words as possible following this exact structure:
    
    For each competitor, provide:
    - name: The company name
    - description: A detailed description of the competitor
    - market_share: Their market share percentage (if known)
    - strengths: A list of their key strengths
    - weaknesses: A list of their key weaknesses
    - pricing_strategy: Their pricing approach
    - target_audience: Their primary target market
    - status: Whether they are "active" or "defunct"
    - reason_for_status: If defunct, explain why they failed
    
    Product Description:
    {product_description}
    
    Company Description:
    {company_description}
    
    Include both direct and indirect competitors, and analyze why any past competitors may have failed.
    Ensure each competitor has all the required fields filled out.
    """
    
    system_prompt = """You are a market research expert specializing in competitive analysis.
    Provide concise, accurate, and well-structured information about competitors in the market.
    Always include all required fields for each competitor, even if some information needs to be estimated.
    If market share is unknown, provide a reasonable estimate based on available information.
    For defunct competitors, provide detailed reasons for their failure."""
    
    competitor_list = llm_call(
        prompt=prompt,
        system_prompt=system_prompt,
        response_format=CompetitorList
    )
    return competitor_list.competitor

def research_market_size(product_description: str) -> MarketSize:
    prompt = f"""
    Analyze the market size and growth potential for the following product, providing concise information following this exact structure:
    
    Required fields:
    - total_market_value: The current total market value in the specified unit
    - unit: The currency unit (e.g., "USD", "EUR")
    - year: The current year for the market value
    - growth_rate: The annual growth rate as a percentage
    - projected_value: The projected market value in the specified unit
    - projection_year: The year for the projected value
    
    Product Description:
    {product_description}
    
    Provide realistic and well-researched market size data and growth projections. Ensure you are concise and use as few words as possible to convey ideas.
    """
    
    system_prompt = """You are a market research expert specializing in market sizing and growth analysis.
    Provide concise and accurate market size data and realistic growth projections.
    Ensure all required fields are filled with meaningful data.
    Use current year for the market value and project 5 years into the future for projections.

    You have access to the Web Search tool, which can be used to search the web for market size data and growth projections.
    
    """

    search_agent = Agent(
        name="Market Research",
        system_prompt=system_prompt,
        description="A market research agent that can search the web for market size data and growth projections.",
        tools=[tool_registry.get_tool("web_search")]
    )
    
    agent_response = search_agent.call(prompt)

    json_parser_prompt = f"""
    Parse the following response into a MarketSize object with the following structure:
    - total_market_value: The current total market value in the specified unit
    - unit: The currency unit (e.g., "USD", "EUR")
    - year: The current year for the market value
    - growth_rate: The annual growth rate as a percentage
    - projected_value: The projected market value in the specified unit
    - projection_year: The year for the projected value
    
    {agent_response} 
    """

    return llm_call(
        prompt=json_parser_prompt,
        response_format=MarketSize
    )
        

def research_demographics(product_description: str) -> MarketDemographics:
    prompt = f"""
    Analyze the target demographics for the following product, providing concise information following this exact structure:
    
    Required fields:
    - age_groups: List of target age groups (e.g., ["18-24", "25-34", "35-44"])
    - income_levels: List of target income levels (e.g., ["$50k-$75k", "$75k-$100k"])
    - geographic_regions: List of target geographic regions
    - education_levels: List of target education levels
    - key_psychographics: List of key psychographic characteristics
    
    Product Description:
    {product_description}
    
    Provide comprehensive demographic information about the target market. Ensure you are concise and use as few words as possible to convey ideas.
    """
    
    system_prompt = """You are a market research expert specializing in demographic analysis.
    Provide comprehensive demographic information about the target market.
    Ensure all lists contain meaningful, specific entries.
    Include a diverse range of demographic segments where applicable."""
    
    return llm_call(
        prompt=prompt,
        system_prompt=system_prompt,
        response_format=MarketDemographics
    )

def research_regulatory_environment(product_description: str) -> RegulatoryEnvironment:
    prompt = f"""
    Analyze the regulatory environment for the following product, providing concise information following this exact structure:
    
    Required fields:
    - current_regulations: List of current regulations affecting the product
    - pending_regulations: List of pending or proposed regulations
    - compliance_requirements: List of specific compliance requirements
    - regulatory_bodies: List of relevant regulatory bodies
    - potential_risks: List of potential regulatory risks
    
    Product Description:
    {product_description}
    
    Include comprehensive information about the regulatory landscape and compliance requirements. Ensure you are concise and use as few words as possible to convey ideas.
    """
    
    system_prompt = """You are a market research expert specializing in regulatory analysis.
    Provide comprehensive and concise information about the regulatory landscape and compliance requirements.
    Ensure all lists contain specific, concise, and actionable information.
    Include both general and product-specific regulations where applicable."""
    
    search_agent = Agent(
        name="Market Research",
        system_prompt=system_prompt,
        description="A market research agent that can search the web for market size data and growth projections.",
        tools=[tool_registry.get_tool("web_search")]
    )

    agent_response = search_agent.call(prompt)

    json_parser_prompt = f"""
    Parse the following response into a RegulatoryEnvironment object with the following structure:
    - current_regulations: List of current regulations affecting the product
    - pending_regulations: List of pending or proposed regulations
    - compliance_requirements: List of specific compliance requirements
    - regulatory_bodies: List of relevant regulatory bodies
    - potential_risks: List of potential regulatory risks
    
    {agent_response} 
    """

    return llm_call(
        prompt=json_parser_prompt,
        response_format=RegulatoryEnvironment
    )

def research_trends(product_description: str) -> MarketTrends:
    prompt = f"""
    Analyze current and emerging trends relevant to the following product, providing concise information following this exact structure:
    
    Required fields:
    - current_trends: List of current market trends
    - emerging_trends: List of emerging or upcoming trends
    - declining_trends: List of declining or outdated trends
    - technology_impact: List of technology-related impacts on the market
    - social_impact: List of social and cultural impacts on the market
    
    Product Description:
    {product_description}
    
    Include comprehensive information about market trends and their implications. Ensure you are concise and use as few words as possible to convey ideas.
    """
    
    system_prompt = """You are a market research expert specializing in trend analysis.
    Provide comprehensive information about market trends and their implications.
    Ensure all lists contain specific, actionable trends.
    Include both short-term and long-term trends where applicable
    
    """
    search_agent = Agent(
        name="Market Research",
        system_prompt=system_prompt,
        description="A market research agent that can search the web for market size data and growth projections.",
        tools=[tool_registry.get_tool("web_search")]
    )
    
    agent_response = search_agent.call(prompt)

    json_parser_prompt = f"""
    Parse the following response into a MarketTrends object with the following structure. Each trend should be a string of max 80 characters:
    - current_trends: List of current market trends
    - emerging_trends: List of emerging or upcoming trends
    - declining_trends: List of declining or outdated trends
    - technology_impact: List of technology-related impacts on the market
    - social_impact: List of social and cultural impacts on the market
    
    {agent_response} 
    """

    return llm_call(
        prompt=json_parser_prompt,
        response_format=MarketTrends
    )

def research_pain_points(product_description: str) -> PainPoints:
    prompt = f"""
    Analyze the pain points and problems in the market for the following product, providing information following this exact structure:
    
    Required fields:
    - customer_pain_points: List of specific customer pain points
    - industry_pain_points: List of industry-wide challenges
    - unsolved_problems: List of currently unsolved problems
    - current_solutions: List of existing solutions
    - solution_gaps: List of gaps in current solutions
    
    Product Description:
    {product_description}
    
    Include comprehensive information about market pain points and solution gaps. Ensure you are concise and use as few words as possible to convey ideas.
    """
    
    system_prompt = """You are a market research expert specializing in problem analysis.
    Provide comprehensive, concise information about market pain points and solution gaps.
    Ensure all lists contain specific, concise, and actionable problems and solutions.
    Focus on both immediate and systemic issues."""
    
    return llm_call(
        prompt=prompt,
        system_prompt=system_prompt,
        response_format=PainPoints
    )

def research_influencers(product_description: str) -> MarketInfluencers:
    prompt = f"""
    Identify key influencers and opinion leaders in the market for the following product, providing information following this exact structure:
    
    Required fields:
    - key_opinion_leaders: List of key opinion leaders in the industry
    - industry_experts: List of recognized industry experts
    - thought_leaders: List of thought leaders in the space
    - media_outlets: List of relevant media outlets
    - social_media_influencers: List of relevant social media influencers
    
    Product Description:
    {product_description}
    
    Include comprehensive information about market influencers and their impact. Ensure you are concise and use as few words as possible to convey ideas.
    """
    
    system_prompt = """You are a market research expert specializing in influencer analysis.
    Provide comprehensive, concise information about market influencers and their impact.
    Ensure all lists contain specific, concise, and relevant influencers and outlets.
    Include both traditional and digital influencers where applicable."""
    
    return llm_call(
        prompt=prompt,
        system_prompt=system_prompt,
        response_format=MarketInfluencers
    )

def conduct_market_research(product_description: str, company_description: str) -> MarketResearch:
    """
    Conduct comprehensive market research for a product and company.
    
    Args:
        product_description (str): Description of the product
        company_description (str): Description of the company
        
    Returns:
        MarketResearch: Comprehensive market research data
    """
    # Generate a title based on the product description
    title_prompt = f"""
    Based on the following product description, create a concise and descriptive title for the market being researched:
    
    Product Description:
    {product_description}
    
    Create a title that captures the essence of the market being researched.

    DO NOT SAY "Market Research" or "Market Research Report" or anything similar.
    """
    
    system_prompt = """You are a market research expert specializing in creating clear and descriptive titles.
    Create a concise title that accurately represents the market being researched."""
    
    title = llm_call(
        prompt=title_prompt,
        system_prompt=system_prompt
    )
    
    competitors = research_competitors(product_description, company_description)
    market_size = research_market_size(product_description)
    demographics = research_demographics(product_description)
    regulatory_environment = research_regulatory_environment(product_description)
    trends = research_trends(product_description)
    pain_points = research_pain_points(product_description)
    influencers = research_influencers(product_description)
    
    # Generate a summary of the research
    summary_prompt = f"""
    Create a brief market summary:
    
    Product: {product_description}
    Company: {company_description}
    
    Market Size: {market_size.model_dump_json()}
    Demographics: {demographics.model_dump_json()}
    Regulatory Environment: {regulatory_environment.model_dump_json()}
    Trends: {trends.model_dump_json()}
    Pain Points: {pain_points.model_dump_json()}
    Influencers: {influencers.model_dump_json()}
    
    Keep it under 3 sentences.
    """
    
    system_prompt = """You are a market research expert specializing in creating comprehensive research summaries.
    Create a detailed, well-structured summary that highlights the most important findings and insights."""
    
    summary = llm_call(
        prompt=summary_prompt,
        system_prompt=system_prompt
    )
    
    return MarketResearch(
        title=title,
        competitors=competitors,
        market_size=market_size,
        demographics=demographics,
        regulatory_environment=regulatory_environment,
        trends=trends,
        pain_points=pain_points,
        influencers=influencers,
        summary=summary
    )

if __name__ == "__main__":
    # Example usage
    product_description = """
    A new line of eco-friendly home cleaning products that are:
    - Made from 100% natural ingredients
    - Biodegradable packaging
    - Priced 20% higher than conventional products
    - Available in major supermarkets and online
    - Focused on reducing environmental impact
    """
    
    company_description = """
    A startup company focused on sustainable home products with:
    - 5 years of experience in eco-friendly product development
    - Strong commitment to environmental sustainability
    - Distribution partnerships with major retailers
    - Plans to expand into international markets
    """
    
    research = conduct_market_research(product_description, company_description)
    print(research.model_dump_json(indent=2))
