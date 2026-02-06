
export interface VenueSection {
  name: string;
  sections: string[];
}

export interface Venue {
  id: string;
  name: string;
  address_line_1: string;
  city: string;
  country_code: string;
  map_url: string; // Static map image
  venue_details: VenueSection[];
}

export interface Event {
  id: string;
  name: string;
  datetime: string;
  venue: Venue;
}

export interface Ticket {
  id: string;
  event: Event;
  seat_details: {
    category: string; // The broader area (e.g. "Longside Lower Tier")
    section: string;  // The specific block (e.g. "Longside Lower Tier N1403")
    row: string;
    first_seat?: string;
  };
  face_value: {
    amount: string;
    currency: string;
  };
  proceed_price: {
    amount: string; // The actual price the user pays
    currency: string;
  };
  number_of_tickets_for_sale: {
    quantity_available: number;
    split_type: string; // e.g. "No Preferences", "Avoid Leaving One", "Etc"
  };
  ticket: {
    type: string; // e.g. "E-Ticket", "Paper"
  };
  delivery: {
    type: string; // "SHIPPING", "EMAIL", etc.
  };
}
