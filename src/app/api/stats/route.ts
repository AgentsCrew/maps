
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Dummy map URLs for venues without maps
const DUMMY_MAPS = [
    'https://upload.wikimedia.org/wikipedia/commons/8/81/AngelStadiumSchematic.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Wembley_Stadium_interior.jpg/1280px-Wembley_Stadium_interior.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Camp_Nou_aerial_%28cropped%29.jpg/1280px-Camp_Nou_aerial_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Allianz_Arena_Panorama.jpg/1280px-Allianz_Arena_Panorama.jpg',
];

// Generate dummy venue details based on venue name
function generateDummyVenueDetails(venueName: string) {
    return [
        {
            name: "Lower Tier",
            sections: ["L101", "L102", "L103", "L104", "L105", "L106"]
        },
        {
            name: "Upper Tier",
            sections: ["U201", "U202", "U203", "U204"]
        },
        {
            name: "Premium",
            sections: ["VIP Lounge", "Executive Box"]
        },
        {
            name: "Standing",
            sections: ["Standing A", "Standing B"]
        }
    ];
}

export async function GET() {
    try {
        // Read venue data
        const filePath = path.join(process.cwd(), 'public', 'data', 'real_venue.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const venueData = JSON.parse(fileContents);

        let venues = venueData.data || [];

        // Enhance venues with missing data
        venues = venues.map((v: any, index: number) => {
            const enhanced = { ...v };

            // Add dummy map if missing
            if (!enhanced.map_url || enhanced.map_url === '') {
                enhanced.map_url = DUMMY_MAPS[index % DUMMY_MAPS.length];
                enhanced._hasRealMap = false;
            } else {
                enhanced._hasRealMap = true;
            }

            // Add dummy venue details if missing
            if (!enhanced.venue_details || enhanced.venue_details.length === 0) {
                enhanced.venue_details = generateDummyVenueDetails(enhanced.name);
                enhanced._hasRealDetails = false;
            } else {
                enhanced._hasRealDetails = true;
            }

            return enhanced;
        });

        // Calculate statistics
        const stats = {
            totalVenues: venues.length,
            venuesWithMaps: venues.filter((v: any) => v._hasRealMap).length,
            venuesWithoutMaps: venues.filter((v: any) => !v._hasRealMap).length,
            venuesWithDummyMaps: venues.filter((v: any) => !v._hasRealMap).length,
            totalEvents: venues.length, // 1 event per venue
            totalTickets: venues.length * 50, // 50 tickets per venue
            venuesByCountry: {} as Record<string, number>,
            venuesWithDetails: venues.filter((v: any) => v._hasRealDetails).length,
            venuesWithDummyDetails: venues.filter((v: any) => !v._hasRealDetails).length,
            totalSections: venues.reduce((sum: number, v: any) => {
                if (v.venue_details) {
                    return sum + v.venue_details.reduce((sectionSum: number, detail: any) => {
                        return sectionSum + (detail.sections?.length || 0);
                    }, 0);
                }
                return sum;
            }, 0),
            venues: venues.map((v: any) => ({
                id: v.id,
                name: v.name,
                city: v.city,
                country: v.country_code,
                hasMap: !!v.map_url,
                hasRealMap: v._hasRealMap,
                hasDetails: v.venue_details && v.venue_details.length > 0,
                hasRealDetails: v._hasRealDetails,
                sectionCount: v.venue_details ? v.venue_details.reduce((sum: number, detail: any) => {
                    return sum + (detail.sections?.length || 0);
                }, 0) : 0,
                mapUrl: v.map_url
            }))
        };

        // Count by country
        venues.forEach((v: any) => {
            const country = v.country_code || 'Unknown';
            stats.venuesByCountry[country] = (stats.venuesByCountry[country] || 0) + 1;
        });

        const response = NextResponse.json(stats);
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
