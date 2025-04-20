import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');
    const contentType = searchParams.get('contentType');
    
    if (!contentId || !contentType) {
      return NextResponse.json(
        { error: 'contentId and contentType are required' },
        { status: 400 }
      );
    }
    
    // Get the absolute path to the content directory
    const contentDir = join(process.cwd(), 'app', 'content');
    const filePath = join(contentDir, `${contentType}-${contentId}.json`);
    
    // Read the content data from the JSON file
    const content = await readFile(filePath, 'utf-8');
    
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error(`Error loading content:`, error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
} 