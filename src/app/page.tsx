'use client';

import { useEffect, useState } from 'react';
import VenueMap from '../components/VenueMap';
import TicketFilter from '../components/TicketFilter';
import TicketList from '../components/TicketList';
import { Calendar, MapPin, Loader2, BarChart3 } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { fetchRealVenues, fetchRealTickets } from '../lib/api';
import { generateMockTickets } from '../utils/mockGenerator';
import { Event, Venue, VenueSection } from '../types';

// Fallback if API fails completely
import { MOCK_EVENT } from '../data/mockData';

export const dynamic = 'force-dynamic';

export default function Home() {
  const { setTickets } = useTicketStore();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event>(MOCK_EVENT);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Fetching Real Venues...");
        const venues = await fetchRealVenues();

        if (venues.length > 0) {
          // Find a venue that actually has details (likely inside its events array)
          let realVenue: Venue | null = null;
          let venueDetails: VenueSection[] = [];

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
                  break;
                }
              }
            }
            if (realVenue) break;
          }

          if (realVenue) {
            // Patch the venue object
            realVenue.venue_details = venueDetails;

            const currentEvent: Event = {
              id: "real-event-1",
              name: "Live Event @ " + realVenue.name,
              datetime: new Date().toISOString(),
              venue: realVenue
            };
            setEvent(currentEvent);

            // Now fetch tickets
            const realTickets = await fetchRealTickets();

            if (realTickets.length > 0) {
              console.log("Using Real Tickets from API");
              setTickets(realTickets);
            } else {
              console.log("Ticket Feed Empty - Generating Hybrid Mock Tickets...");
              // HYBRID MODE: Real Venue + Mock Tickets
              const hybridTickets = generateMockTickets(realVenue, currentEvent);
              setTickets(hybridTickets);
            }
          } else {
            console.warn("No venues with details found. Using fallback mock data.");
          }
        } else {
          console.warn("No venues found in API. Using fallback mock data.");
        }
      } catch (err) {
        console.error("Hybrid Load Failed:", err);
        setError("Failed to load live data. Check console.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [setTickets]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading Live Venue Data...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 mb-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                {new Date(event.datetime).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                {event.venue.name}, {event.venue.country_code}
              </span>
            </div>
            <a
              href="/stats"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm">
              <BarChart3 size={18} />
              <span className="hidden sm:inline">Stats</span>
            </a>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Map (Sticky) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-32">
              <VenueMap currentVenue={event.venue} />
            </div>
          </div>

          {/* Right Column: Filters & List */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Pass venue explicitly to filters if needed, or rely on store if updated */}
            <TicketFilter currentVenue={event.venue} />
            <TicketList />
          </div>
        </div>
      </div>
    </main>
  );
}
