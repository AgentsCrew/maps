'use client';

import { MOCK_VENUE } from '../data/mockData';
import { useTicketStore } from '../store/ticketStore';
import { Venue } from '../types';

import { useState, useEffect } from 'react';

interface VenueMapProps {
    currentVenue?: Venue;
}

export default function VenueMap({ currentVenue }: VenueMapProps) {
    const { selectedCategory, filterByCategory } = useTicketStore();
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    // Use passed venue or fallback to mock
    const venue = currentVenue || MOCK_VENUE;

    if (!mounted) return <div className="aspect-video bg-gray-100 rounded-xl animate-pulse"></div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-4">Venue Map: {venue.name}</h3>

            <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                {/* Placeholder for the actual map image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={venue.map_url || MOCK_VENUE.map_url}
                    alt="Stadium Map"
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('bg-gray-300');
                        e.currentTarget.parentElement!.innerHTML += '<div class="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">Map Image Failed to Load</div>';
                    }}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                        Interactive Map Visualization
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Select Section</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {venue.venue_details.map((sectionGroup) => {
                        const isSelected = selectedCategory === sectionGroup.name;
                        return (
                            <button
                                key={sectionGroup.name}
                                onClick={() => filterByCategory(isSelected ? null : sectionGroup.name)}
                                className={`
                  text-sm px-3 py-2 rounded-lg transition-all text-left border
                  ${isSelected
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                `}
                            >
                                {sectionGroup.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
