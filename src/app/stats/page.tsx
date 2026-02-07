'use client';

import { useEffect, useState } from 'react';
import { BarChart3, MapPin, Ticket, Calendar, Globe, TrendingUp } from 'lucide-react';

interface VenueInfo {
    id: string;
    name: string;
    city: string;
    country: string;
    hasMap: boolean;
    hasRealMap: boolean;
    hasDetails: boolean;
    hasRealDetails: boolean;
    sectionCount: number;
    mapUrl?: string;
}

interface Stats {
    totalVenues: number;
    venuesWithMaps: number;
    venuesWithoutMaps: number;
    venuesWithDummyMaps: number;
    totalEvents: number;
    totalTickets: number;
    venuesByCountry: Record<string, number>;
    venuesWithDetails: number;
    venuesWithDummyDetails: number;
    totalSections: number;
    venues: VenueInfo[];
}

export default function StatsPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('/api/stats');
                if (!response.ok) throw new Error('Failed to fetch stats');
                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading statistics...</div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-red-400 text-xl">Error: {error || 'No data available'}</div>
            </div>
        );
    }

    const mapCoverage = ((stats.venuesWithMaps / stats.totalVenues) * 100).toFixed(1);
    const detailCoverage = ((stats.venuesWithDetails / stats.totalVenues) * 100).toFixed(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <BarChart3 className="w-10 h-10 text-purple-400" />
                        Platform Statistics
                    </h1>
                    <p className="text-purple-200">Real-time insights into venues, events, and tickets</p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Venues */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <MapPin className="w-8 h-8 text-blue-400" />
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.totalVenues}</div>
                        <div className="text-blue-200 text-sm">Total Venues</div>
                    </div>

                    {/* Total Events */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <Calendar className="w-8 h-8 text-purple-400" />
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.totalEvents}</div>
                        <div className="text-purple-200 text-sm">Live Events</div>
                    </div>

                    {/* Total Tickets */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <Ticket className="w-8 h-8 text-pink-400" />
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.totalTickets.toLocaleString()}</div>
                        <div className="text-pink-200 text-sm">Available Tickets</div>
                    </div>

                    {/* Interactive Maps */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <Globe className="w-8 h-8 text-emerald-400" />
                            <div className="text-emerald-400 text-sm font-semibold">{mapCoverage}%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stats.venuesWithMaps}</div>
                        <div className="text-emerald-200 text-sm">Interactive Maps</div>
                    </div>
                </div>

                {/* Coverage Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Map Coverage */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Map Coverage</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-emerald-300">With Real Maps</span>
                                    <span className="text-white font-semibold">{stats.venuesWithMaps} venues</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-green-400 h-3 rounded-full transition-all"
                                        style={{ width: `${mapCoverage}%` }}
                                    ></div>
                                </div>
                            </div>
                            {stats.venuesWithDummyMaps > 0 && (
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-yellow-300">With Dummy Maps</span>
                                        <span className="text-white font-semibold">{stats.venuesWithDummyMaps} venues</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-yellow-500 to-orange-400 h-3 rounded-full transition-all"
                                            style={{ width: `${(stats.venuesWithDummyMaps / stats.totalVenues * 100).toFixed(1)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            <div className="text-xs text-purple-300 mt-3">
                                💡 Dummy maps are auto-generated for venues without official maps
                            </div>
                        </div>
                    </div>

                    {/* Venue Details Coverage */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Venue Details</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-blue-300">With Real Section Details</span>
                                    <span className="text-white font-semibold">{stats.venuesWithDetails} venues</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-400 h-3 rounded-full transition-all"
                                        style={{ width: `${detailCoverage}%` }}
                                    ></div>
                                </div>
                            </div>
                            {stats.venuesWithDummyDetails > 0 && (
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-cyan-300">With Dummy Details</span>
                                        <span className="text-white font-semibold">{stats.venuesWithDummyDetails} venues</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-cyan-500 to-blue-400 h-3 rounded-full transition-all"
                                            style={{ width: `${(stats.venuesWithDummyDetails / stats.totalVenues * 100).toFixed(1)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            <div className="text-sm text-purple-200 mt-4">
                                <div className="flex justify-between">
                                    <span>Total Sections:</span>
                                    <span className="font-semibold text-white">{stats.totalSections}</span>
                                </div>
                            </div>
                            <div className="text-xs text-purple-300 mt-3">
                                💡 Dummy details include standard sections for complete coverage
                            </div>
                        </div>
                    </div>
                </div>

                {/* Venues by Country */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Venues by Country</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.entries(stats.venuesByCountry).map(([country, count]) => (
                            <div key={country} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="text-2xl font-bold text-white mb-1">{count}</div>
                                <div className="text-purple-200 text-sm">{country}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Venue Details Table */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-4">Venue Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-3 px-4 text-purple-200 font-semibold">Venue</th>
                                    <th className="text-left py-3 px-4 text-purple-200 font-semibold">Location</th>
                                    <th className="text-center py-3 px-4 text-purple-200 font-semibold">Map</th>
                                    <th className="text-center py-3 px-4 text-purple-200 font-semibold">Details</th>
                                    <th className="text-center py-3 px-4 text-purple-200 font-semibold">Sections</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.venues.map((venue) => (
                                    <tr key={venue.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-4 text-white font-medium">{venue.name}</td>
                                        <td className="py-3 px-4 text-purple-200">{venue.city}, {venue.country}</td>
                                        <td className="py-3 px-4 text-center">
                                            {venue.hasRealMap ? (
                                                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                                                    ✓ Real
                                                </span>
                                            ) : venue.hasMap ? (
                                                <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                                                    🔄 Dummy
                                                </span>
                                            ) : (
                                                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                                                    ✗ None
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {venue.hasRealDetails ? (
                                                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                                    ✓ Real
                                                </span>
                                            ) : venue.hasDetails ? (
                                                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                                                    🔄 Dummy
                                                </span>
                                            ) : (
                                                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                                                    ✗ None
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center text-white font-semibold">
                                            {venue.sectionCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Link back to main page */}
                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                        ← Back to Tickets
                    </a>
                </div>
            </div>
        </div>
    );
}
