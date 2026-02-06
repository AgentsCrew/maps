
import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.TIXSTOCK_TOKEN;

    if (!token) {
        return NextResponse.json({ error: 'Missing TIXSTOCK_TOKEN' }, { status: 500 });
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
            return NextResponse.json({ error: `API Error: ${res.status}` }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
