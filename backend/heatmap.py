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
from fastapi import HTTPException

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


def plot_heatmap(scores, img_array: np.ndarray) -> str:
    """
    Creates a heatmap overlay on the original image.
    
    Args:
        scores (list): List of tuples containing (row, col, score)
        img_array (np.ndarray): Numpy array of the image
    """
    try:
        # Create a 4x4 grid of zeros
        heatmap = np.zeros((4, 4))
        
        # Fill in the scores
        for row, col, score in scores:
            heatmap[row, col] = score
        
        # Normalize scores to 0-1 range
        heatmap = (heatmap - np.min(heatmap)) / (np.max(heatmap) - np.min(heatmap))
        
        # Upscale the heatmap using interpolation
        upscale_factor = 25  # Reduced from 50 to 25
        heatmap_upscaled = np.kron(heatmap, np.ones((upscale_factor, upscale_factor)))
        
        # Apply Gaussian blur for smoothing
        heatmap_smooth = gaussian_filter(heatmap_upscaled, sigma=upscale_factor/2)
        
        # Create figure and axis
        plt.figure(figsize=(img_array.shape[1]/100, img_array.shape[0]/100), dpi=100)

        # Plot the base image
        plt.imshow(img_array)

        # Plot heatmap overlay with matching dimensions and coordinates
        plt.imshow(heatmap_smooth,
                cmap='RdYlGn_r',
                alpha=0.7,
                interpolation='gaussian',
                extent=[0, img_array.shape[1], 0, img_array.shape[0]])
        
        # Remove axes
        plt.axis('off')
        
        # Remove padding
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
        plt.tight_layout(pad=0)

        # Save to bytes buffer
        buf = io.BytesIO()
        plt.savefig(buf, 
                    format='png', 
                    bbox_inches='tight', 
                    pad_inches=0, 
                    dpi=100)  # Reduced from 300 to 100
        plt.close()
        
        # Convert to base64
        buf.seek(0)
        base64_heatmap = base64.b64encode(buf.getvalue()).decode('utf-8')
        return base64_heatmap
        
    except Exception as e:
        print(f"Error in plot_heatmap: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to plot heatmap: {str(e)}"
        )

def generate_heatmap(image_url: str, description: str) -> str:
    try:
        # Check if the input is already a base64 string
        if image_url.startswith('data:image'):
            # Extract the base64 part after the comma
            base64_data = image_url.split(',')[1]
            # Decode base64 to bytes
            image_content = base64.b64decode(base64_data)
        else:
            # Fetch image from URL
            response = requests.get(image_url)
            response.raise_for_status()
            image_content = response.content

        # Convert to base64 for evaluate_image
        base64_image = base64.b64encode(image_content).decode('utf-8')
        
        # Evaluate the image to get scores
        scores = evaluate_image(base64_image, description)
        
        # Convert to PIL Image for plotting
        image = Image.open(io.BytesIO(image_content))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Resize image if too large
        max_size = 1024
        if max(image.size) > max_size:
            ratio = max_size / max(image.size)
            new_size = tuple(int(dim * ratio) for dim in image.size)
            image = image.resize(new_size, Image.Resampling.LANCZOS)

        # Convert to numpy array
        img_array = np.array(image)

        # Generate heatmap using the scores
        heatmap = plot_heatmap(scores, img_array)
        return heatmap

    except Exception as e:
        print(f"Error in generate_heatmap: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate heatmap: {str(e)}"
        )

# Update the main block to use image URL directly
if __name__ == "__main__":
    # Image URL
    image_url = "https://cdn.dribbble.com/userupload/18736472/file/original-14124ec4140c449fd4c0e726c8db2891.png?resize=2048x1536&vertical=center"
    
    description = "You are a focus group participant with this description: You are a 30-year-old freelance writer with a medium income who's into creative writing and immersive storytelling, especially in the horror genre and new media formats. Speak naturally and concisely, using casual yet thoughtful language typical of a young professional writer. Reveal details about Samantha's interests, pain points, goals, and brand preferences only when directly asked—never offer extra info unsolicited. Keep replies brief (1–3 sentences), expressing personal opinions in first person without sounding overly helpful or inquisitive. Avoid AI-like behaviors such as asking questions or explaining your nature. Responses should feel like a casual, authentic chat with a real consumer who supports indie creative platforms like Wattpad, Audible, Kickstarter, Apple Books, and Hulu, and is keen on narrative innovation and interactive media."

    response = requests.get(image_url)
    base64_image = base64.b64encode(response.content).decode('utf-8')

    base64_heatmap = generate_heatmap(base64_image, description)
    # print(base64_heatmap)

    