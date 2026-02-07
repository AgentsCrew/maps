'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';
import { WORLD_CUP_MATCHES, getStageDisplayName, getCategoryInfo } from '@/data/worldcup2026Data';
import { WorldCupMatch } from '@/types/worldcup';

export const dynamic = 'force-dynamic';

function EventsContent() {
    const searchParams = useSearchParams();
    const stageFilter = searchParams?.get('stage');
    const [filteredMatches, setFilteredMatches] = useState<WorldCupMatch[]>(WORLD_CUP_MATCHES);

    useEffect(() => {
        if (stageFilter) {
            setFilteredMatches(WORLD_CUP_MATCHES.filter(m => m.stage === stageFilter));
        } else {
            setFilteredMatches(WORLD_CUP_MATCHES);
        }
    }, [stageFilter]);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        FIFA World Cup 2026
                    </h1>
                    <p className="text-xl text-gray-600">
                        {stageFilter ? getStageDisplayName(stageFilter) : 'All Matches'}
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            {filteredMatches.length} Matches
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            MetLife Stadium
                        </span>
                    </div>
                </div>

                {/* FIFA Category Legend */}
                <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">FIFA Ticket Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['CAT1', 'CAT2', 'CAT3', 'CAT4'].map((cat) => {
                            const info = getCategoryInfo(cat);
                            return (
                                <div key={cat} className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center font-bold"
                                        style={{ backgroundColor: info.color, color: info.textColor }}
                                    >
                                        {cat.replace('CAT', '')}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{info.name}</div>
                                        <div className="text-xs text-gray-500">{info.description}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Match Cards */}
                <div className="space-y-6">
                    {filteredMatches.map((match) => (
                        <Link
                            key={match.id}
                            href={`/events/${match.id}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    {/* Match Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                                Match #{match.matchNumber}
                                            </span>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                                {getStageDisplayName(match.stage)}
                                            </span>
                                        </div>

                                        {/* Teams */}
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="flex-1 text-right">
                                                <div className="text-3xl font-bold text-gray-900 mb-1">{match.homeTeam}</div>
                                                <div className="text-sm text-gray-500">{match.homeTeamCode}</div>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-400">VS</div>
                                            <div className="flex-1 text-left">
                                                <div className="text-3xl font-bold text-gray-900 mb-1">{match.awayTeam}</div>
                                                <div className="text-sm text-gray-500">{match.awayTeamCode}</div>
                                            </div>
                                        </div>

                                        {/* Date & Venue */}
                                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                                {formatDate(match.date)}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                {formatTime(match.date)}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-blue-600" />
                                                {match.venue.name}, {match.venue.city}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tickets Available */}
                                    <div className="flex flex-col items-center md:items-end gap-4">
                                        <div className="text-center md:text-right">
                                            <div className="flex items-center gap-2 text-green-600 mb-1">
                                                <Users className="w-5 h-5" />
                                                <span className="text-2xl font-bold">{match.ticketsAvailable.toLocaleString()}</span>
                                            </div>
                                            <div className="text-sm text-gray-500">Tickets Available</div>
                                        </div>

                                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold group-hover:gap-3 transition-all">
                                            View Tickets
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredMatches.length === 0 && (
                    <div className="text-center py-20">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches found</h3>
                        <p className="text-gray-500">Try selecting a different stage</p>
                        <Link
                            href="/events"
                            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View All Matches
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function EventsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-500">Loading matches...</div>
            </div>
        }>
            <EventsContent />
        </Suspense>
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
