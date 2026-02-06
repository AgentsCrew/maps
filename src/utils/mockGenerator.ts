import { Venue, Ticket, Event } from "../types";

export const generateMockTickets = (venue: Venue, eventBase: Event): Ticket[] => {
    const tickets: Ticket[] = [];
    const sections = venue.venue_details.flatMap(group =>
        group.sections.map(sectionName => ({ groupName: group.name, sectionName }))
    );

    // Generate 50 realistic tickets distributed across sections
    for (let i = 0; i < 50; i++) {
        const section = sections[Math.floor(Math.random() * sections.length)];

        // Determine price based on section name heuristic
        let basePrice = 50;
        if (section.groupName.includes("VIP") || section.groupName.includes("Loge")) basePrice = 250;
        else if (section.groupName.includes("Lower") || section.groupName.includes("Unterrang")) basePrice = 120;
        else if (section.groupName.includes("Upper") || section.groupName.includes("Oberrang")) basePrice = 60;

        const price = basePrice + Math.floor(Math.random() * 40);

        tickets.push({
            id: `mock-t-${i}`,
            event: { ...eventBase, venue }, // Ensure event links to this real venue
            seat_details: {
                category: section.groupName,
                section: section.sectionName,
                row: `${Math.floor(Math.random() * 25) + 1}`,
                first_seat: `${Math.floor(Math.random() * 100) + 1}`
            },
            face_value: { amount: basePrice.toFixed(2), currency: "EUR" },
            proceed_price: { amount: price.toFixed(2), currency: "EUR" },
            number_of_tickets_for_sale: {
                quantity_available: Math.floor(Math.random() * 4) + 1, // 1-4 tickets
                split_type: "Any"
            },
            ticket: { type: Math.random() > 0.5 ? "E-Ticket" : "Mobile App" },
            delivery: { type: Math.random() > 0.7 ? "INSTANT" : "EMAIL" }
        });
    }

    return tickets.sort((a, b) => parseFloat(a.proceed_price.amount) - parseFloat(b.proceed_price.amount));
};
