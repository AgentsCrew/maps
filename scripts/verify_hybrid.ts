
import { generateMockTickets } from '../src/utils/mockGenerator';
import { Event, VenueSection } from '../src/types';

// Mock the API fetch by using the real JSON we saved earlier
// In a real integration test we would mock the fetch, but here we just want to test logic
import fs from 'fs';
import path from 'path';

async function verify() {
    console.log("1. Loading Real Venue API Response...");
    try {
        // PowerShell 'Out-File' defaults to UTF-16LE, which node fs needs help with
        const rawData = fs.readFileSync(path.join(process.cwd(), 'real_venue.json'), 'utf16le');
        // Remove BOM if present
        const cleanData = rawData.replace(/^\uFEFF/, '');
        const json = JSON.parse(cleanData);
        const venues = json.data;

        if (!venues || venues.length === 0) {
            console.error("❌ No venues found in real_venue.json");
            return;
        }

        // Find a venue that actually has details (likely inside its events array)
        let realVenue = null;
        let venueDetails = null;

        for (const v of venues) {
            // Check if venue has details at root
            if (v.venue_details && v.venue_details.length > 0) {
                realVenue = v;
                venueDetails = v.venue_details;
                break;
            }
            // Check if any event in this venue has details
            if (v.events && v.events.length > 0) {
                for (const e of v.events) {
                    if (e.venue_details && e.venue_details.length > 0) {
                        realVenue = v;
                        venueDetails = e.venue_details;
                        // Patch the venue object to match our internal type expectation for the generator
                        realVenue.venue_details = venueDetails;
                        break;
                    }
                }
            }
            if (realVenue) break;
        }

        if (!realVenue) {
            console.error("❌ No venue with 'venue_details' found in the entire feed.");
            return;
        }

        console.log(`✅ Loaded Venue: ${realVenue.name} (${realVenue.country_code})`);
        console.log(`   Sections found: ${venueDetails.length} groups`);

        // Print first few sections to prove they are real
        console.log(`   Sample Sections: ${venueDetails.slice(0, 2).map((v: VenueSection) => v.name).join(', ')}...`);

        console.log("\n2. Generating Hybrid Tickets...");
        const mockEvent: Event = {
            id: "test",
            name: "Test Event",
            datetime: new Date().toISOString(),
            venue: realVenue
        };

        const tickets = generateMockTickets(realVenue, mockEvent);

        console.log(`✅ Generated ${tickets.length} tickets`);

        if (tickets.length > 0) {
            const firstTicket = tickets[0];
            console.log(`   Sample Ticket 1: Section "${firstTicket.seat_details.category} - ${firstTicket.seat_details.section}"`);
            console.log(`   Price: ${firstTicket.proceed_price.amount} ${firstTicket.proceed_price.currency}`);

            // Verify the section actually exists in the venue
            const exists = realVenue.venue_details.some((v: VenueSection) => v.name === firstTicket.seat_details.category);
            if (exists) {
                console.log("✅ Verified: Ticket section matches API venue data.");
            } else {
                console.error("❌ Mismatch: Ticket generated for unknown section.");
            }
        }

    } catch (error) {
        console.error("❌ Verification Failed:", error);
    }
}

verify();
