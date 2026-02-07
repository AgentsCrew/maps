
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        // Read JSON from public directory (included in Vercel deployment)
        const filePath = path.join(process.cwd(), 'public', 'data', 'real_venue.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const venueData = JSON.parse(fileContents);

        const response = NextResponse.json(venueData);
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error("Venue API Error:", error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
