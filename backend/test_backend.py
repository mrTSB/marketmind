import requests
import json
from datetime import datetime
import os

# Test data
PRODUCT_INFO = {
    "product_info": "A revolutionary AI-powered marketing platform that helps businesses create personalized marketing campaigns, analyze market trends, and optimize their marketing strategies. The platform uses advanced machine learning algorithms to generate campaign ideas, create detailed marketing plans, and provide actionable insights.",
    "company_info": "MarketMind is a cutting-edge marketing technology company founded in 2023. We specialize in AI-driven marketing solutions that help businesses of all sizes optimize their marketing efforts. Our team consists of experienced marketers, data scientists, and software engineers dedicated to revolutionizing the marketing industry."
}

BASE_URL = "http://localhost:8000"

def save_response(response_data, endpoint_name):
    """Save response to a file for inspection"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"test_results/{endpoint_name}_{timestamp}.json"
    os.makedirs("test_results", exist_ok=True)
    
    with open(filename, "w") as f:
        json.dump(response_data, f, indent=2)
    print(f"Saved response to {filename}")

def print_debug_content():
    """Print the entire generated content dictionary in a readable format"""
    print("\n=== DEBUG: All Generated Content ===")
    try:
        response = requests.get(f"{BASE_URL}/debug/content")
        response.raise_for_status()  # Raise an exception for bad status codes
        all_content = response.json()
        
        if not all_content:
            print("No content has been generated yet.")
            return
            
        for content_id, content in all_content.items():
            print(f"\nContent ID: {content_id}")
            print(f"Generated at: {content.get('timestamp', 'N/A')}")
            
            # Campaigns
            if 'campaigns' in content and 'campaigns' in content['campaigns']:
                print("\nCampaigns:")
                for i, campaign in enumerate(content['campaigns']['campaigns'], 1):
                    print(f"  {i}. {campaign.get('title', 'Untitled')}")
            else:
                print("\nCampaigns: No campaigns found")
            
            # Detailed Campaign
            if 'detailed_campaign' in content:
                print("\nDetailed Campaign:")
                print(f"  Title: {content['detailed_campaign'].get('title', 'Untitled')}")
                print(f"  Concept: {content['detailed_campaign'].get('concept', 'No concept')}")
            else:
                print("\nDetailed Campaign: No detailed campaign found")
            
            # GTM Plan
            if 'gtm_plan' in content:
                print("\nGTM Plan:")
                print(f"  Strategy: {content['gtm_plan'].get('strategy', 'No strategy')}")
                print(f"  Timeline: {content['gtm_plan'].get('timeline', 'No timeline')}")
            else:
                print("\nGTM Plan: No GTM plan found")
            
            # Personas
            if 'personas' in content and 'personas' in content['personas']:
                print("\nPersonas:")
                for i, persona in enumerate(content['personas']['personas'], 1):
                    print(f"  {i}. {persona.get('name', 'Unnamed')} - {persona.get('role', 'No role')}")
            else:
                print("\nPersonas: No personas found")
            
            # Market Research
            if 'market_research' in content:
                print("\nMarket Research:")
                print(f"  Market Size: {content['market_research'].get('market_size', 'Not specified')}")
                trends = content['market_research'].get('key_trends', [])
                if trends:
                    print(f"  Key Trends: {', '.join(trends)}")
                else:
                    print("  Key Trends: No trends found")
            else:
                print("\nMarket Research: No market research found")
            
            # Executive Brief
            if 'executive_brief' in content:
                print("\nExecutive Brief:")
                print(f"  Summary: {content['executive_brief'].get('summary', 'No summary')}")
            else:
                print("\nExecutive Brief: No executive brief found")
            
            print("="*50)
            
    except requests.exceptions.RequestException as e:
        print(f"\nError fetching debug content: {str(e)}")
    except json.JSONDecodeError as e:
        print(f"\nError parsing debug content: {str(e)}")
    except Exception as e:
        print(f"\nUnexpected error: {str(e)}")

def test_backend():
    print("Starting backend test...")
    
    # 1. Generate all content
    print("\n1. Generating all content...")
    response = requests.post(f"{BASE_URL}/generate", json=PRODUCT_INFO)
    generation_response = response.json()
    content_id = generation_response["id"]
    save_response(generation_response, "generation_response")
    print(f"Generated content with ID: {content_id}")
    
    # 2. Get campaigns
    print("\n2. Getting campaigns...")
    response = requests.get(f"{BASE_URL}/content/{content_id}/campaigns")
    campaigns = response.json()
    save_response(campaigns, "campaigns")
    print(f"Retrieved {len(campaigns['campaigns'])} campaign ideas")
    
    # 3. Get detailed campaign
    print("\n3. Getting detailed campaign...")
    response = requests.get(f"{BASE_URL}/content/{content_id}/detailed-campaign")
    detailed_campaign = response.json()
    save_response(detailed_campaign, "detailed_campaign")
    print("Retrieved detailed campaign plan")
    
    # 4. Get GTM plan
    print("\n4. Getting GTM plan...")
    response = requests.get(f"{BASE_URL}/content/{content_id}/gtm-plan")
    gtm_plan = response.json()
    save_response(gtm_plan, "gtm_plan")
    print("Retrieved GTM plan")
    
    # 5. Get personas
    print("\n5. Getting personas...")
    response = requests.get(f"{BASE_URL}/content/{content_id}/personas")
    personas = response.json()
    save_response(personas, "personas")
    print(f"Retrieved {len(personas['personas'])} personas")
    
    # 6. Get market research
    print("\n6. Getting market research...")
    response = requests.get(f"{BASE_URL}/content/{content_id}/market-research")
    market_research = response.json()
    save_response(market_research, "market_research")
    print("Retrieved market research")
    
    # 7. Get executive brief
    print("\n7. Getting executive brief...")
    response = requests.get(f"{BASE_URL}/content/{content_id}/executive-brief")
    executive_brief = response.json()
    save_response(executive_brief, "executive_brief")
    print("Retrieved executive brief")
    
    print("\nBackend test completed successfully!")
    
    # Print debug content
    print_debug_content()

if __name__ == "__main__":
    test_backend() 