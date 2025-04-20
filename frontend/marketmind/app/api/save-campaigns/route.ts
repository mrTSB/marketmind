import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { contentId, campaigns } = await request.json();
    
    // Get the absolute path to the content directory
    const contentDir = join(process.cwd(), 'app', 'content');
    
    // Save the campaigns data to a JSON file
    const filePath = join(contentDir, `campaigns-${contentId}.json`);
    await writeFile(filePath, campaigns, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to save campaigns' },
      { status: 500 }
    );
  }
} 