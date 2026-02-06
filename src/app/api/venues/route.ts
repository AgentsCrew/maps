
import { NextResponse } from 'next/server';
import venueData from '@/data/real_venue.json';

export async function GET() {
    try {
        return NextResponse.json(venueData);
    } catch (error) {
        console.error("Local API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
