'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Calendar, MapPin, BarChart3 } from 'lucide-react';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
    const [venuesDropdownOpen, setVenuesDropdownOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ⚽ FIFA 2026
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Events Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setEventsDropdownOpen(!eventsDropdownOpen);
                                    setVenuesDropdownOpen(false);
                                }}
                                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <Calendar size={18} />
                                <span>Events</span>
                                <ChevronDown size={16} className={`transition-transform ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {eventsDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setEventsDropdownOpen(false)}
                                    />
                                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                        <Link
                                            href="/events"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setEventsDropdownOpen(false)}
                                        >
                                            All Events
                                        </Link>
                                        <div className="border-t border-gray-100 my-2" />
                                        <Link
                                            href="/events?stage=GROUP_STAGE"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setEventsDropdownOpen(false)}
                                        >
                                            Group Stage
                                        </Link>
                                        <Link
                                            href="/events?stage=ROUND_OF_16"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setEventsDropdownOpen(false)}
                                        >
                                            Round of 16
                                        </Link>
                                        <Link
                                            href="/events?stage=QUARTER_FINAL"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setEventsDropdownOpen(false)}
                                        >
                                            Quarter Finals
                                        </Link>
                                        <Link
                                            href="/events?stage=SEMI_FINAL"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setEventsDropdownOpen(false)}
                                        >
                                            Semi Finals
                                        </Link>
                                        <Link
                                            href="/events?stage=FINAL"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors"
                                            onClick={() => setEventsDropdownOpen(false)}
                                        >
                                            🏆 Final
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Venues Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setVenuesDropdownOpen(!venuesDropdownOpen);
                                    setEventsDropdownOpen(false);
                                }}
                                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <MapPin size={18} />
                                <span>Venues</span>
                                <ChevronDown size={16} className={`transition-transform ${venuesDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {venuesDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setVenuesDropdownOpen(false)}
                                    />
                                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                                            Featured Venue
                                        </div>
                                        <Link
                                            href="/venues/metlife-stadium"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setVenuesDropdownOpen(false)}
                                        >
                                            <div className="font-semibold">MetLife Stadium</div>
                                            <div className="text-sm text-gray-500">New York/New Jersey • 82,500</div>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Stats Link */}
                        <Link
                            href="/stats"
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <BarChart3 size={18} />
                            <span>Statistics</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 p-2"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MobileMenu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-3 space-y-2">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Events</div>
                            <Link
                                href="/events"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                All Events
                            </Link>
                            <Link
                                href="/events?stage=SEMI_FINAL"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Semi Finals
                            </Link>
                            <Link
                                href="/events?stage=FINAL"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                🏆 Final
                            </Link>
                        </div>

                        <div className="border-t border-gray-200 pt-2">
                            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Venues</div>
                            <Link
                                href="/venues/metlife-stadium"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                MetLife Stadium
                            </Link>
                        </div>

                        <div className="border-t border-gray-200 pt-2">
                            <Link
                                href="/stats"
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <BarChart3 size={18} />
                                Statistics
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
