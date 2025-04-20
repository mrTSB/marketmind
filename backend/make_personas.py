from pydantic import BaseModel
from typing import Dict, List
from models.llms import llm_call
from models.images import generate_image

class BasePersona(BaseModel):
    name: str
    age: int
    occupation: str
    income_level: str
    interests: List[str]
    pain_points: List[str]
    goals: List[str]
    preferred_channels: List[str]
    buying_behavior: str
    brand_preferences: List[str]

class Persona(BasePersona):
    chat_system_prompt: str
    image_url: str
    messages: List[Dict[str, str]]

class BasePersonaList(BaseModel):
    personas: List[BasePersona]

class PersonaList(BaseModel):
    personas: List[Persona]

def generate_base_personas(campaign_description: str) -> BasePersonaList:
    """
    Generate a list of base personas based on the campaign description.
    
    Args:
        campaign_description (str): Description of the ad campaign
        
    Returns:
        BasePersonaList: List of generated base personas
    """
    persona_prompt = f"""
    Based on the following ad campaign description, generate 3-5 detailed marketing personas.
    Each persona should be unique and relevant to the campaign.
    
    Campaign Description:
    {campaign_description}
    
    For each persona, provide:
    - Name
    - Age
    - Occupation
    - Income level
    - Key interests
    - Pain points
    - Goals
    - Preferred marketing channels
    - Buying behavior
    - Brand preferences
    
    Make the personas realistic and specific to the campaign context.
    """
    
    persona_system_prompt = """You are a marketing expert specializing in creating detailed customer personas.
    Generate realistic and specific personas that would be relevant to the given campaign.
    Ensure each persona has distinct characteristics and behaviors."""
    
    return llm_call(
        prompt=persona_prompt,
        system_prompt=persona_system_prompt,
        response_format=BasePersonaList
    )

def generate_chat_system_prompt(persona: BasePersona) -> str:
    """
    Generate a chat system prompt for a given persona.
    
    Args:
        persona (BasePersona): The base persona to generate a chat prompt for
        
    Returns:
        str: The generated chat system prompt
    """
    chat_prompt = f"""
    Create a detailed system prompt for chatting with the following persona:
    
    Name: {persona.name}
    Age: {persona.age}
    Occupation: {persona.occupation}
    Income Level: {persona.income_level}
    Interests: {', '.join(persona.interests)}
    Pain Points: {', '.join(persona.pain_points)}
    Goals: {', '.join(persona.goals)}
    Preferred Channels: {', '.join(persona.preferred_channels)}
    Buying Behavior: {persona.buying_behavior}
    Brand Preferences: {', '.join(persona.brand_preferences)}
    
    The system prompt should:
    - Capture their personality and communication style
    - Include their background and interests
    - Reflect their values and preferences
    - Guide how they would respond to questions about the campaign
    - Be written in second person (e.g., "You are...")
    """
    
    chat_system_prompt = """You are an expert at creating detailed system prompts for AI personas.
    Create a comprehensive system prompt that captures the persona's unique characteristics
    and would guide an AI in simulating conversations with them."""
    
    return llm_call(
        prompt=chat_prompt,
        system_prompt=chat_system_prompt
    )

def generate_persona_image(persona: BasePersona, model: str = "fal-ai/flux/schnell") -> str:
    """
    Generate an image for a given persona.
    
    Args:
        persona (BasePersona): The persona to generate an image for
        model (str): The model to use for image generation. Defaults to "fal-ai/flux/schnell"
        
    Returns:
        str: URL of the generated image
    """
    # Clean any special characters from the persona fields
    clean_name = ''.join(c for c in persona.name if ord(c) < 128)
    clean_occupation = ''.join(c for c in persona.occupation if ord(c) < 128)
    clean_income = ''.join(c for c in persona.income_level if ord(c) < 128)
    clean_interests = [''.join(c for c in interest if ord(c) < 128) for interest in persona.interests]
    
    image_prompt = f"""
    Create a realistic portrait of {clean_name}, a {persona.age}-year-old {clean_occupation.lower()}.
    They should appear {clean_income.lower()} and have a personality that matches their interests: {', '.join(clean_interests)}.
    The image should be professional and suitable for a marketing persona.
    Make sure to accurately represent their demographic characteristics based on their name.
    """
    
    image_url = generate_image(image_prompt, model="fal-ai/flux/schnell")
    return image_url

def generate_personas(campaign_description: str) -> PersonaList:
    """
    Generate a list of personas with chat system prompts and images based on the campaign description.
    
    Args:
        campaign_description (str): Description of the ad campaign
        
    Returns:
        PersonaList: List of generated personas with chat system prompts and images
    """
    # First generate base personas
    base_personas = generate_base_personas(campaign_description)
    
    # Then create full personas with chat system prompts and images
    personas = []
    for base_persona in base_personas.personas:
        chat_system_prompt = generate_chat_system_prompt(base_persona)
        image_url = generate_persona_image(base_persona)
        
        # Create a new Persona by extending the base persona with the chat system prompt and image
        persona = Persona(
            **base_persona.model_dump(),
            chat_system_prompt=chat_system_prompt,
            image_url=image_url,
            messages=[
                {
                    "role": base_persona.name,
                    "content": "Hey there! How can I help?"
                },
            ]
        )
        personas.append(persona)
    
    return PersonaList(personas=personas)

if __name__ == "__main__":
    # Example usage
    campaign = """
    A new line of eco-friendly home cleaning products that are:
    - Made from 100% natural ingredients
    - Biodegradable packaging
    - Priced 20% higher than conventional products
    - Available in major supermarkets and online
    - Focused on reducing environmental impact
    """
    
    personas = generate_personas(campaign)
    for persona in personas.personas:
        print(f"\nPersona: {persona.name}")
        print(f"Age: {persona.age}")
        print(f"Occupation: {persona.occupation}")
        print(f"Income Level: {persona.income_level}")
        print(f"Interests: {', '.join(persona.interests)}")
        print(f"Pain Points: {', '.join(persona.pain_points)}")
        print(f"Goals: {', '.join(persona.goals)}")
        print(f"Preferred Channels: {', '.join(persona.preferred_channels)}")
        print(f"Buying Behavior: {persona.buying_behavior}")
        print(f"Brand Preferences: {', '.join(persona.brand_preferences)}")
        print("\nChat System Prompt:")
        print(persona.chat_system_prompt)
        print(f"\nImage URL: {persona.image_url}")
        print(f"Messages: {len(persona.messages)} messages")
        print("\n" + "="*50)
