import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const contentDir = path.join(process.cwd(), 'app', 'content');
    
    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json({ message: 'Content directory does not exist' }, { status: 200 });
    }

    // Read all files in the content directory
    const files = fs.readdirSync(contentDir);
    
    // Delete each file
    files.forEach(file => {
      const filePath = path.join(contentDir, file);
      fs.unlinkSync(filePath);
    });

    return NextResponse.json({ message: 'All content files deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing content:', error);
    return NextResponse.json({ error: 'Failed to clear content' }, { status: 500 });
  }
} 