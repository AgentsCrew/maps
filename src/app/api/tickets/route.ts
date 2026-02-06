
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    const token = process.env.TIXSTOCK_TOKEN;

    if (!token) {
        console.error('TIXSTOCK_TOKEN environment variable is not set');
        return NextResponse.json({
            error: 'Missing TIXSTOCK_TOKEN',
            message: 'Server configuration error'
        }, { status: 500 });
    }

    try {
        // Fetch tickets (defaulting to first page/event for now)
        const res = await fetch('https://sandbox-pf.tixstock.com/v1/tickets/feed', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            console.error(`Tixstock API Error: ${res.status} ${res.statusText}`);
            return NextResponse.json({
                error: `API Error: ${res.status}`,
                message: res.statusText
            }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Tickets API Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
