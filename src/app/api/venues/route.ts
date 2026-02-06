
import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.TIXSTOCK_TOKEN;

    if (!token) {
        return NextResponse.json({ error: 'Missing TIXSTOCK_TOKEN' }, { status: 500 });
    }

    try {
        const res = await fetch('https://sandbox-pf.tixstock.com/v1/venues/feed', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ error: `API Error: ${res.status}`, details: errorText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
