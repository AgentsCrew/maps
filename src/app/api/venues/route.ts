
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const cwd = process.cwd();
        // Construct absolute path to the file. Adjust 'real_venue.json' location if needed.
        // Based on file list, it's in the root.
        const filePath = path.join(cwd, 'real_venue.json');

        const fileContent = fs.readFileSync(filePath, 'utf16le'); // The file seemed to be utf16le based on previous checks

        // Remove BOM if present
        const cleanContent = fileContent.charCodeAt(0) === 65279 ? fileContent.slice(1) : fileContent;

        const data = JSON.parse(cleanContent);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Local API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
