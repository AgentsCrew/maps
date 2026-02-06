
import { NextResponse } from 'next/server';
import venueData from '@/data/real_venue.json';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        // Ensure data is properly serialized
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
