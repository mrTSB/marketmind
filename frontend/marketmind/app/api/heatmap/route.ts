import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const persona = formData.get('persona') as string;

    if (!image || !persona) {
      return NextResponse.json(
        { error: 'Image and persona are required' },
        { status: 400 }
      );
    }

    // Convert the image to base64
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageUrl = `data:${image.type};base64,${base64Image}`;

    // Call the backend API
    const response = await fetch('http://localhost:8000/heatmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        description: `Analyze how a ${persona} would view this image`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing heatmap request:', error);
    return NextResponse.json(
      { error: 'Failed to process heatmap analysis' },
      { status: 500 }
    );
  }
} 