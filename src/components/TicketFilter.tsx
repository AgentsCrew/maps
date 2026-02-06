'use client';

import { useTicketStore } from '../store/ticketStore';
import { MOCK_VENUE } from '../data/mockData';
import { Filter, RotateCcw } from 'lucide-react';
import { Venue } from '../types';

import { useState, useEffect } from 'react';

interface TicketFilterProps {
    currentVenue?: Venue;
}

export default function TicketFilter({ currentVenue }: TicketFilterProps) {
    const {
        selectedCategory,
        priceRange,
        minQuantity,
        filterByCategory,
        setPriceRange,
        setQuantity,
        resetFilters
    } = useTicketStore();

    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    // Use passed venue or fallback
    const venue = currentVenue || MOCK_VENUE;
    const categories = venue.venue_details.map(v => v.name);

    if (!mounted) return <div className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Filter size={20} /> Filters
                </h3>
                <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedCategory || ''}
                        onChange={(e) => filterByCategory(e.target.value || null)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Quantity Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity: {minQuantity}+</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={minQuantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>10</span>
                    </div>
                </div>

                {/* Price Filter (Simple Max Price for Prototype) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price: £{priceRange[1]}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
