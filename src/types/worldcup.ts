
export type FIFACategory = 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4';

export type MatchStage =
    | 'GROUP_STAGE'
    | 'ROUND_OF_16'
    | 'QUARTER_FINAL'
    | 'SEMI_FINAL'
    | 'FINAL';

export interface WorldCupVenue {
    id: string;
    name: string;
    city: string;
    country: string;
    capacity: number;
    map_url: string;
    sections: WorldCupSection[];
}

export interface WorldCupSection {
    id: string;
    name: string;
    category: FIFACategory;
    rows: number;
    seatsPerRow: number;
    priceRange: {
        min: number;
        max: number;
        currency: string;
    };
}

export interface WorldCupMatch {
    id: string;
    matchNumber: number;
    stage: MatchStage;
    homeTeam: string;
    awayTeam: string;
    homeTeamCode: string;
    awayTeamCode: string;
    date: string; // ISO datetime
    venue: WorldCupVenue;
    ticketsAvailable: number;
}

export interface WorldCupTicket {
    id: string;
    match: WorldCupMatch;
    section: WorldCupSection;
    row: number;
    seat: number;
    category: FIFACategory;
    price: number;
    currency: string;
}
