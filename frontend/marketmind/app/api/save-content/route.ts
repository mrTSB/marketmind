import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { contentId, content, contentType } = await request.json();
    
    // Get the absolute path to the content directory
    const contentDir = join(process.cwd(), 'app', 'content');
    
    // Save the content data to a JSON file
    const filePath = join(contentDir, `${contentType}-${contentId}.json`);
    await writeFile(filePath, content, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error saving ${request.json()}:`, error);
    return NextResponse.json(
      { error: `Failed to save ${request.json()}` },
      { status: 500 }
    );
  }
} 