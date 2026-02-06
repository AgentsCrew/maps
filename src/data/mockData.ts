import { Ticket, Venue, Event } from "../types";

export const MOCK_VENUE: Venue = {
    id: "01fwnncmg6796w6rs5scx4wesx",
    name: "Old Trafford",
    address_line_1: "Sir Matt Busby Way",
    city: "Manchester",
    country_code: "GB",
    map_url: "https://upload.wikimedia.org/wikipedia/commons/8/81/AngelStadiumSchematic.svg",
    venue_details: [
        { name: "Longside Lower Tier", sections: ["N1401", "N1402", "N1403", "S122"] },
        { name: "Longside Upper Tier", sections: ["N3401", "N3402", "QS228"] },
        { name: "Shortside Lower Tier", sections: ["E132", "E133", "W205"] },
        { name: "VIP Packages", sections: ["Hospitality Lounge", "Executive Box"] },
        { name: "Away Fan Section", sections: ["Away Section"] }
    ]
};

export const MOCK_EVENT: Event = {
    id: "01g5nw2bgnza5dw5cc0xefccsh",
    name: "Manchester United vs Manchester City",
    datetime: "2023-01-14T14:55:00+0000",
    venue: MOCK_VENUE
};

// Generate 50 mock tickets
export const MOCK_TICKETS: Ticket[] = Array.from({ length: 50 }).map((_, i) => {
    const categories = MOCK_VENUE.venue_details;
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const section = cat.sections[Math.floor(Math.random() * cat.sections.length)];
    const price = Math.floor(Math.random() * 400) + 40; // Random price 40-440

    return {
        id: `t${i}`,
        event: MOCK_EVENT,
        seat_details: {
            category: cat.name,
            section: `${cat.name} ${section}`,
            row: `${Math.floor(Math.random() * 30) + 1}`
        },
        face_value: { amount: "50.00", currency: "GBP" },
        proceed_price: { amount: price.toFixed(2), currency: "GBP" },
        number_of_tickets_for_sale: {
            quantity_available: Math.floor(Math.random() * 6) + 1, // 1-6 tickets
            split_type: "Any"
        },
        ticket: { type: Math.random() > 0.5 ? "E-Ticket" : "Mobile App" },
        delivery: { type: Math.random() > 0.7 ? "INSTANT" : "EMAIL" }
    };
});
