import { WorldCupVenue, WorldCupMatch, WorldCupSection } from '../types/worldcup';

// MetLife Stadium - Host of 2026 World Cup Final
export const METLIFE_STADIUM_SECTIONS: WorldCupSection[] = [
    // Category 1 - Best Views (Lower Sideline)
    { id: 'sec-111', name: 'Section 111', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-112', name: 'Section 112', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-113', name: 'Section 113', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-114', name: 'Section 114', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-115', name: 'Section 115', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-134', name: 'Section 134', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-135', name: 'Section 135', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },
    { id: 'sec-136', name: 'Section 136', category: 'CAT1', rows: 30, seatsPerRow: 28, priceRange: { min: 600, max: 800, currency: 'USD' } },

    // Category 2 - Corners & Upper Sideline
    { id: 'sec-101', name: 'Section 101', category: 'CAT2', rows: 28, seatsPerRow: 24, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-102', name: 'Section 102', category: 'CAT2', rows: 28, seatsPerRow: 24, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-120', name: 'Section 120', category: 'CAT2', rows: 28, seatsPerRow: 24, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-121', name: 'Section 121', category: 'CAT2', rows: 28, seatsPerRow: 24, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-201', name: 'Section 201', category: 'CAT2', rows: 25, seatsPerRow: 22, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-212', name: 'Section 212', category: 'CAT2', rows: 25, seatsPerRow: 22, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-213', name: 'Section 213', category: 'CAT2', rows: 25, seatsPerRow: 22, priceRange: { min: 350, max: 500, currency: 'USD' } },
    { id: 'sec-234', name: 'Section 234', category: 'CAT2', rows: 25, seatsPerRow: 22, priceRange: { min: 350, max: 500, currency: 'USD' } },

    // Category 3 - Upper Corners & End Zones
    { id: 'sec-301', name: 'Section 301', category: 'CAT3', rows: 22, seatsPerRow: 20, priceRange: { min: 180, max: 300, currency: 'USD' } },
    { id: 'sec-302', name: 'Section 302', category: 'CAT3', rows: 22, seatsPerRow: 20, priceRange: { min: 180, max: 300, currency: 'USD' } },
    { id: 'sec-320', name: 'Section 320', category: 'CAT3', rows: 22, seatsPerRow: 20, priceRange: { min: 180, max: 300, currency: 'USD' } },
    { id: 'sec-321', name: 'Section 321', category: 'CAT3', rows: 22, seatsPerRow: 20, priceRange: { min: 180, max: 300, currency: 'USD' } },
    { id: 'sec-340', name: 'Section 340', category: 'CAT3', rows: 22, seatsPerRow: 20, priceRange: { min: 180, max: 300, currency: 'USD' } },

    // Category 4 - Highest Sections
    { id: 'sec-341', name: 'Section 341', category: 'CAT4', rows: 20, seatsPerRow: 18, priceRange: { min: 95, max: 150, currency: 'USD' } },
    { id: 'sec-342', name: 'Section 342', category: 'CAT4', rows: 20, seatsPerRow: 18, priceRange: { min: 95, max: 150, currency: 'USD' } },
    { id: 'sec-343', name: 'Section 343', category: 'CAT4', rows: 20, seatsPerRow: 18, priceRange: { min: 95, max: 150, currency: 'USD' } },
    { id: 'sec-344', name: 'Section 344', category: 'CAT4', rows: 20, seatsPerRow: 18, priceRange: { min: 95, max: 150, currency: 'USD' } },
];

export const METLIFE_STADIUM: WorldCupVenue = {
    id: 'venue-metlife',
    name: 'MetLife Stadium',
    city: 'East Rutherford',
    country: 'USA',
    capacity: 82500,
    map_url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/AngelStadiumSchematic.svg', // Placeholder - will use custom
    sections: METLIFE_STADIUM_SECTIONS,
};

// World Cup 2026 Matches
export const WORLD_CUP_MATCHES: WorldCupMatch[] = [
    {
        id: 'match-wc2026-sf1',
        matchNumber: 61,
        stage: 'SEMI_FINAL',
        homeTeam: 'TBD',
        awayTeam: 'TBD',
        homeTeamCode: 'TBD',
        awayTeamCode: 'TBD',
        date: '2026-07-14T20:00:00-04:00',
        venue: METLIFE_STADIUM,
        ticketsAvailable: 75000,
    },
    {
        id: 'match-wc2026-final',
        matchNumber: 64,
        stage: 'FINAL',
        homeTeam: 'Winner SF1',
        awayTeam: 'Winner SF2',
        homeTeamCode: 'WSF1',
        awayTeamCode: 'WSF2',
        date: '2026-07-19T15:00:00-04:00',
        venue: METLIFE_STADIUM,
        ticketsAvailable: 82500,
    },
];

// Helper to get category display info
export function getCategoryInfo(category: string) {
    switch (category) {
        case 'CAT1':
            return {
                name: 'Category 1',
                description: 'Best views from lower central sideline sections',
                color: '#FFD700', // Gold
                textColor: '#000',
            };
        case 'CAT2':
            return {
                name: 'Category 2',
                description: 'Corners, lower ends, upper central areas',
                color: '#C0C0C0', // Silver
                textColor: '#000',
            };
        case 'CAT3':
            return {
                name: 'Category 3',
                description: 'Upper corners and end zones',
                color: '#CD7F32', // Bronze
                textColor: '#FFF',
            };
        case 'CAT4':
            return {
                name: 'Category 4',
                description: 'Most affordable - highest sections',
                color: '#4169E1', // Royal Blue
                textColor: '#FFF',
            };
        default:
            return {
                name: 'General',
                description: 'Standard seating',
                color: '#808080',
                textColor: '#FFF',
            };
    }
}

// Helper to get stage display name
export function getStageDisplayName(stage: string): string {
    switch (stage) {
        case 'GROUP_STAGE':
            return 'Group Stage';
        case 'ROUND_OF_16':
            return 'Round of 16';
        case 'QUARTER_FINAL':
            return 'Quarter Final';
        case 'SEMI_FINAL':
            return 'Semi Final';
        case 'FINAL':
            return 'Final';
        default:
            return stage;
    }
}
