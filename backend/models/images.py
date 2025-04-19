import json
import fal_client
from pydantic import BaseModel, Field
from openai import OpenAI
# from together import Together
# from rembg import remove
# from PIL import Image
# import onnxruntime as ort
import requests
import os
import time
from concurrent.futures import ThreadPoolExecutor
from functools import partial


# text_model = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"
image_model = "fal-ai/flux/schnell"
# image_to_image_model = "fal-ai/flux/schnell/redux"

# client = Together()


# def remove_background(input_path, output_path):
#     providers = (
#         ["CoreMLExecutionProvider"]
#         if "CoreMLExecutionProvider" in ort.get_available_providers()
#         else ["CPUExecutionProvider"]
#     )

#     input_image = Image.open(input_path)

#     output_image = remove(input_image, session_options={"providers": providers})

#     output_image.save(output_path)


def generate_image(prompt: str, model: str = image_model):
    """
    Generate an image using fal.ai's image generation API.
    
    Args:
        prompt (str): The text prompt describing the image to generate
        model (str): The model to use for generation
        
    Returns:
        tuple: (image_url, metadata) containing the URL of the generated image and metadata
    """

    def on_queue_update(update):
        if isinstance(update, fal_client.InProgress):
            for log in update.logs:
                print(log["message"])

    try:
        # Configure the image generation parameters
        generation_params = {
            "prompt": prompt,
        }

        # Make the API call
        result = fal_client.subscribe(
            model,
            arguments=generation_params,
            with_logs=True,
            on_queue_update=on_queue_update
        )

        # Extract the image URL and metadata
        image_url = result["images"][0]["url"]
        # metadata = {
        #     "time": result["timings"]["inference"],
        #     "width": result["images"][0]["width"],
        #     "height": result["images"][0]["height"]
        # }
        
        return image_url
        
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        raise



# def generate_image_to_image(image_url: str, model: str = image_to_image_model):
#     def on_queue_update(update):
#         if isinstance(update, fal_client.InProgress):
#             for log in update.logs:
#                 print(log["message"])

#     url = fal_client.upload_file(image_url)
#     result = fal_client.subscribe(
#         model,
#         arguments={"image_url": url},
#         with_logs=True,
#         on_queue_update=on_queue_update,
#     )
#     image_url = result["images"][0]["url"]
#     metadata = {
#         "time": result["timings"]["inference"],
#         "width": result["images"][0]["width"],
#         "height": result["images"][0]["height"],
#     }
#     return image_url, metadata


# def save_image(image_url: str, output_path: str):
#     response = requests.get(image_url)

#     with open(output_path, "wb") as f:
#         f.write(response.content)


# def llm_call(
#     prompt: str,
#     system_prompt: str = None,
#     response_format: BaseModel = None,
#     model: str = text_model,
# ):
#     kwargs = {}

#     kwargs["model"] = model
#     kwargs["stream"] = False

#     if system_prompt:
#         kwargs["messages"] = [
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": prompt},
#         ]
#     else:
#         kwargs["messages"] = [
#             {"role": "user", "content": prompt},
#         ]

#     if response_format is not None:
#         kwargs["response_format"] = {
#             "type": "json_object",
#             "schema": response_format.model_json_schema(),
#         }
#         kwargs["messages"].append(
#             {
#                 "role": "system",
#                 "content": "Please respond with the JSON object only, no other text or comments.",
#             }
#         )
#         return json.loads(
#             client.chat.completions.create(**kwargs).choices[0].message.content
#         )

#     return client.chat.completions.create(**kwargs).choices[0].message.content


# def improve_prompt(prompt: str, style: str = "") -> str:
#     system_prompt = """
#     You are a prompt engineer specializing in sprite and icon generation. Your task is to transform basic descriptions into detailed prompts that will generate clean, isolated sprites with consistent style and clear backgrounds. Make sure to include the actual subject in the prompt verbatim. A word like capybara shouldn't be changed to "rodent" and a word like "lion cub" shouldn't be changed to "kitten"

#     1. Composition Requirements:
#     - Clear background (mandatory)
#     - Single centered subject
#     - Clear silhouette with defined edges
#     - Subject fills most of the frame by default
#     - Always show the full body of the subject
#     - Never cut off parts of the subject
#     - If there are multiple subjects, make sure to include all of them without overlapping

#     2. Technical Specifications:
#     - Resolution: High detail (4K)
#     - Lighting: Main light 45° above-right
#     - Secondary fill light from left
#     - Soft shadows for depth
#     - Sharp focus throughout

#     3. Style Parameters:
#     - Clean vector-like rendering
#     - Smooth gradients
#     - Crisp edges
#     - Professional color palette
#     - Subtle highlights and shadows
#     - Modern minimalist approach

#     Output Format:
#     [Style][View][Subject][Technical][Composition]

#     Example Outputs:

#     "Professional photo realistic style, full body shot, golden retriever puppy with expressive eyes and soft fur detail, centered composition fill the frame, clear background, clean edges with subtle shadows"

#     """

#     # Include style in the context if provided
#     if style:
#         context = f"Description: {prompt}\nStyle: {style}"
#     else:
#         context = f"Description: {prompt}\nStyle: none"

#     return llm_call(
#         context, system_prompt, model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"
#     )


# def crop_blank_space(image_url: str, output_path: str):
#     image = Image.open(image_url)
#     image = image.convert("RGB")
#     image = image.crop(image.getbbox())
#     image.save(output_path)

#     if __name__ == "__main__":
#         prompt = "An elephant with a red hat in a photorealistic style"
#         improved_prompt = improve_prompt(prompt)
#         print(improved_prompt)
#         image_url, metadata = generate_image(improved_prompt)
#         save_image(image_url, "output.png")
#         remove_background("output.png", "output-no-bg.png")

#         no_bg_image = Image.open("output-no-bg.png")
#         no_bg_image.show()

#     class ExampleSchema(BaseModel):
#         name: str = Field(description="The name of the element")
#         position_x: float = Field(description="The x position of the element")
#         position_y: float = Field(description="The y position of the element")
#         scale: float = Field(description="The scale of the element")
#         description: str = Field(description="A short description of the element")

#     prompt = "A red hat on an elephant"
#     response = llm_call(prompt, response_format=ExampleSchema)
#     print(response)

#     image_url, metadata = generate_image_to_image("output-no-bg.png")
#     save_image(image_url, "output.png")
#     remove_background("output.png", "output-no-bg.png")

#     no_bg_image = Image.open("output-no-bg.png")

#     crop_blank_space("output-no-bg.png", "output-no-bg-cropped.png")

#     cropped_image = Image.open("output-no-bg-cropped.png")
#     cropped_image.show()
