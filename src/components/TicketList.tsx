'use client';

import { useTicketStore } from '../store/ticketStore';
import { Ticket as TicketIcon, MapPin } from 'lucide-react';

import { useState, useEffect } from 'react';

export default function TicketList() {
    const { filteredTickets } = useTicketStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return <div className="p-10 text-center text-gray-400">Loading tickets...</div>;

    if (filteredTickets.length === 0) {
        return (
            <div className="bg-gray-50 p-10 text-center rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No tickets found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {filteredTickets.map((ticket) => (
                <div
                    key={ticket.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                    {/* Ticket Info */}
                    <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900">{ticket.seat_details.category}</h4>

                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <MapPin size={16} /> Section {ticket.seat_details.section}
                            </span>
                            <span className="flex items-center gap-1">
                                <TicketIcon size={16} /> Row {ticket.seat_details.row}
                            </span>
                        </div>

                        <div className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-fit">
                            {ticket.delivery.type} • {ticket.number_of_tickets_for_sale.quantity_available} Available
                        </div>
                    </div>

                    {/* Pricing & Action */}
                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                        <div className="text-right">
                            <span className="block text-2xl font-bold text-blue-600">
                                £{ticket.proceed_price.amount}
                            </span>
                            <span className="text-xs text-gray-400">per ticket</span>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
