import base64
import io
import requests
from PIL import Image
from pydantic import BaseModel
import concurrent.futures
from models.llms import llm_call_messages
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter

def segment_image_into_16_sections(base64_image):
    """
    Segments a base64-encoded image into 16 equal sections.
    
    Args:
        base64_image (str): Base64-encoded image string
        
    Returns:
        list: List of 16 PIL Image objects representing the segments
    """
    # Decode base64 string to binary data
    image_data = base64.b64decode(base64_image)
    
    # Convert binary data to PIL Image
    image = Image.open(io.BytesIO(image_data))
    
    # Get image dimensions
    width, height = image.size
    
    # Calculate dimensions for each segment
    segment_width = width // 4
    segment_height = height // 4
    
    # Create segments
    segments = []
    for row in range(4):
        for col in range(4):
            # Calculate coordinates for cropping
            left = col * segment_width
            top = row * segment_height
            right = left + segment_width
            bottom = top + segment_height
            
            # Crop the image to create a segment
            segment = image.crop((left, top, right, bottom))
            segments.append(segment)
    
    return segments

def segment_image_into_16_sections_with_coordinates(base64_image):
    """
    Segments a base64-encoded image into 16 equal sections and returns them with their coordinates.
    
    Args:
        base64_image (str): Base64-encoded image string
        
    Returns:
        list: List of tuples containing (segment, row, col) where segment is a PIL Image
    """
    # Decode base64 string to binary data
    image_data = base64.b64decode(base64_image)
    
    # Convert binary data to PIL Image
    image = Image.open(io.BytesIO(image_data))
    
    # Get image dimensions
    width, height = image.size
    
    # Calculate dimensions for each segment
    segment_width = width // 4
    segment_height = height // 4
    
    # Create segments with coordinates
    segments_with_coords = []
    for row in range(4):
        for col in range(4):
            # Calculate coordinates for cropping
            left = col * segment_width
            top = row * segment_height
            right = left + segment_width
            bottom = top + segment_height
            
            # Crop the image to create a segment
            segment = image.crop((left, top, right, bottom))
            segments_with_coords.append((segment, row, col))
    
    return segments_with_coords

def segment_image_into_16_sections_as_base64(base64_image):
    """
    Segments a base64-encoded image into 16 equal sections and returns them as base64 strings.
    
    Args:
        base64_image (str): Base64-encoded image string
        
    Returns:
        list: List of 16 base64-encoded strings representing the segments
    """
    segments = segment_image_into_16_sections(base64_image)
    
    # Convert each segment to base64
    base64_segments = []
    for segment in segments:
        # Convert PIL Image to bytes
        img_byte_arr = io.BytesIO()
        segment.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        # Convert bytes to base64
        base64_segment = base64.b64encode(img_byte_arr).decode('utf-8')
        base64_segments.append(base64_segment)
    
    return base64_segments

def evaluate_section(section_base64: Image.Image, description: str):
    """
    Evaluates a section of an image and returns a score between 0 and 100.
    
    Args:
        section_base64 (PIL.Image): PIL Image object
    """
    # Convert PIL Image to base64
    img_byte_arr = io.BytesIO()
    section_base64.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    base64_str = base64.b64encode(img_byte_arr).decode('utf-8')
    description = ""

    messages = [
        {
            "role": "system",
            "content": f"You are a focus group participant with this description: {description}"
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Evaluate the following section of an image on how long you would look at it. Return a score between 0 and 100."},
                {
                "type": "image_url",
                "image_url": {
                        "url": f"data:image/png;base64,{base64_str}",
                    },
                },
            ],
        }
    ]

    class Score(BaseModel):
        score: int

    response = llm_call_messages(messages, model="openai/gpt-4.1-nano", response_format=Score)
    return response.score

def evaluate_image(base64_image, description: str):
    """
    Evaluates an image and returns a heatmap of the scores.
    
    Args:
        base64_image (str): Base64-encoded image string
    """

    segments = segment_image_into_16_sections_with_coordinates(base64_image)
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [
            executor.submit(evaluate_section, segment, description)
            for segment, row, col in segments
        ]
        scores = [
            (row, col, future.result())
            for (segment, row, col), future in zip(segments, futures)
        ]
    return scores


def plot_heatmap(scores, image_url=None):
    """
    Creates a heatmap overlay on the original image.
    
    Args:
        scores (list): List of tuples containing (row, col, score)
        image_url (str, optional): URL of the original image
    """
    
    
    # Create a 4x4 grid of zeros
    heatmap = np.zeros((4, 4))
    
    # Fill in the scores
    for row, col, score in scores:
        heatmap[row, col] = score
    
    # Normalize scores to 0-1 range
    heatmap = (heatmap - np.min(heatmap)) / (np.max(heatmap) - np.min(heatmap))
    
    # Upscale the heatmap using interpolation
    upscale_factor = 50  # This will make each cell 50x50 pixels
    heatmap_upscaled = np.kron(heatmap, np.ones((upscale_factor, upscale_factor)))
    
    # Apply Gaussian blur for smoothing
    heatmap_smooth = gaussian_filter(heatmap_upscaled, sigma=upscale_factor/2)
    
    # Create figure and axis
    
    response = requests.get(image_url)
    image = Image.open(io.BytesIO(response.content))
    plt.figure(figsize=(image.size[0]/100, image.size[1]/100), dpi=100)

    # Plot the base image
    plt.imshow(image, extent=[0, image.size[0], 0, image.size[1]])

    # Plot heatmap overlay with matching dimensions and coordinates
    plt.imshow(heatmap_smooth,
            cmap='RdYlGn_r',
            alpha=0.7,
            interpolation='gaussian',
            extent=[0, image.size[0], 0, image.size[1]])

    # Remove axes
    plt.axis('off')

    # Remove padding
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    plt.tight_layout(pad=0)

    # Save with exact dimensions
    plt.savefig('heatmap_overlay.png',
                bbox_inches='tight',
                pad_inches=0,
                dpi=300)
    
    # Convert the plot to base64
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0, dpi=300)
    buf.seek(0)
    plt.close()
    
    # Convert to base64
    base64_heatmap = base64.b64encode(buf.getvalue()).decode('utf-8')
    return base64_heatmap

def generate_heatmap(image_url: str, description: str):
    """
    Generates a heatmap overlay on the original image.
    
    Args:
        image_url (str): URL of the original image
        description (str): Description of the focus group participant
    Returns:
        str: Base64-encoded image string
    """
    response = requests.get(image_url)
    base64_image = base64.b64encode(response.content).decode('utf-8')
    scores = evaluate_image(base64_image, description)
    base64_heatmap = plot_heatmap(scores, image_url)
    return base64_heatmap
    

# Update the main block to use image URL directly
if __name__ == "__main__":
    # Image URL
    image_url = "https://cdn.dribbble.com/userupload/18736472/file/original-14124ec4140c449fd4c0e726c8db2891.png?resize=2048x1536&vertical=center"
    
    description = "You are a focus group participant with this description: You are a 30-year-old freelance writer with a medium income who's into creative writing and immersive storytelling, especially in the horror genre and new media formats. Speak naturally and concisely, using casual yet thoughtful language typical of a young professional writer. Reveal details about Samantha's interests, pain points, goals, and brand preferences only when directly asked—never offer extra info unsolicited. Keep replies brief (1–3 sentences), expressing personal opinions in first person without sounding overly helpful or inquisitive. Avoid AI-like behaviors such as asking questions or explaining your nature. Responses should feel like a casual, authentic chat with a real consumer who supports indie creative platforms like Wattpad, Audible, Kickstarter, Apple Books, and Hulu, and is keen on narrative innovation and interactive media."

    # Get image data and convert to base64
    response = requests.get(image_url)
    base64_image = base64.b64encode(response.content).decode('utf-8')
    
    # Generate and plot heatmap
    scores = evaluate_image(base64_image, description)
    print("Finished evaluating", scores)
    plot_heatmap(scores, image_url)