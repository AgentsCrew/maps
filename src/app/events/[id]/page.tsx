'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowLeft, Ticket } from 'lucide-react';
import { WORLD_CUP_MATCHES, getStageDisplayName, getCategoryInfo } from '@/data/worldcup2026Data';
import VenueMap from '@/components/VenueMap';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const match = WORLD_CUP_MATCHES.find(m => m.id === resolvedParams.id);

    if (!match) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
        });
    };

    // Calculate tickets by category
    const ticketsByCategory = {
        CAT1: Math.floor(match.ticketsAvailable * 0.15),
        CAT2: Math.floor(match.ticketsAvailable * 0.25),
        CAT3: Math.floor(match.ticketsAvailable * 0.35),
        CAT4: Math.floor(match.ticketsAvailable * 0.25),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to All Matches
                </Link>

                {/* Match Header */}
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            Match #{match.matchNumber}
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            {getStageDisplayName(match.stage)}
                        </span>
                        {match.stage === 'FINAL' && (
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                                🏆 World Cup Final
                            </span>
                        )}
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-center gap-12 mb-8">
                        <div className="text-center">
                            <div className="text-6xl font-bold text-gray-900 mb-2">{match.homeTeam}</div>
                            <div className="text-gray-500">{match.homeTeamCode}</div>
                        </div>
                        <div className="text-5xl font-bold text-gray-400">VS</div>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-gray-900 mb-2">{match.awayTeam}</div>
                            <div className="text-gray-500">{match.awayTeamCode}</div>
                        </div>
                    </div>

                    {/* Match Details */}
                    <div className="flex flex-wrap items-center justify-center gap-8 text-gray-700 border-t border-gray-200 pt-6">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{formatDate(match.date)}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{formatTime(match.date)}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{match.venue.name}, {match.venue.city}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-600">{match.ticketsAvailable.toLocaleString()} tickets</span>
                        </span>
                    </div>
                </div>

                {/* FIFA Ticket Categories */}
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ticket Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['CAT1', 'CAT2', 'CAT3', 'CAT4'].map((cat) => {
                            const info = getCategoryInfo(cat);
                            const section = match.venue.sections.find(s => s.category === cat);
                            const available = ticketsByCategory[cat as keyof typeof ticketsByCategory];

                            return (
                                <div key={cat} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                    <div
                                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold mb-4"
                                        style={{ backgroundColor: info.color, color: info.textColor }}
                                    >
                                        {cat.replace('CAT', '')}
                                    </div>
                                    <div className="font-bold text-lg mb-2">{info.name}</div>
                                    <div className="text-sm text-gray-600 mb-4">{info.description}</div>
                                    {section && (
                                        <>
                                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                                ${section.priceRange.min} - ${section.priceRange.max}
                                            </div>
                                            <div className="text-sm text-gray-500 mb-3">{section.priceRange.currency}</div>
                                            <div className="flex items-center gap-2 text-green-600 mb-4">
                                                <Ticket className="w-4 h-4" />
                                                <span className="text-sm font-semibold">{available.toLocaleString()} available</span>
                                            </div>
                                            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                                                Select Seats
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Stadium Map */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Stadium Seating Map</h2>
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">{match.venue.name}</h3>
                        <p className="text-gray-600">
                            Capacity: {match.venue.capacity.toLocaleString()} • {match.venue.city}, {match.venue.country}
                        </p>
                    </div>
                    <VenueMap
                        currentVenue={{
                            ...match.venue,
                            address_line_1: '',
                            country_code: match.venue.country,
                            venue_details: match.venue.sections.map(s => ({
                                name: getCategoryInfo(s.category).name,
                                sections: [s.name]
                            }))
                        }}
                    />

                    {/* Section Legend */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-4">Color Legend</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['CAT1', 'CAT2', 'CAT3', 'CAT4'].map((cat) => {
                                const info = getCategoryInfo(cat);
                                return (
                                    <div key={cat} className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg"
                                            style={{ backgroundColor: info.color }}
                                        />
                                        <div className="text-sm">
                                            <div className="font-semibold">{info.name}</div>
                                            <div className="text-gray-500 text-xs">{cat}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Venue Info */}
                <div className="mt-8 bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About {match.venue.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Location</div>
                            <div className="font-semibold">{match.venue.city}, {match.venue.country}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Capacity</div>
                            <div className="font-semibold">{match.venue.capacity.toLocaleString()} spectators</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Sections</div>
                            <div className="font-semibold">{match.venue.sections.length} seating sections</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Clock({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
        </svg>
    );
}
