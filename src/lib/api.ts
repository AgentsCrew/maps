import { Venue, Ticket } from "../types";

export async function fetchRealVenues(): Promise<Venue[]> {
    try {
        const res = await fetch('/api/venues');
        if (!res.ok) throw new Error('Failed to fetch venues');
        const json = await res.json();
        return json.data || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function fetchRealTickets(): Promise<Ticket[]> {
    try {
        const res = await fetch('/api/tickets');
        if (!res.ok) throw new Error('Failed to fetch tickets');
        const json = await res.json();
        return json.data || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}
