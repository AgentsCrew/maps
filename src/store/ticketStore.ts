import { create } from 'zustand';
import { Ticket } from '../types';
import { MOCK_TICKETS } from '../data/mockData';

interface TicketStore {
    tickets: Ticket[];
    filteredTickets: Ticket[];

    // Filters
    selectedCategory: string | null;
    priceRange: [number, number];
    minQuantity: number;

    // Actions
    setTickets: (tickets: Ticket[]) => void;
    filterByCategory: (category: string | null) => void;
    setPriceRange: (range: [number, number]) => void;
    setQuantity: (qty: number) => void;
    resetFilters: () => void;
}

const filterTickets = (
    tickets: Ticket[],
    category: string | null,
    priceRange: [number, number],
    minQuantity: number
) => {
    return tickets.filter(t => {
        const price = parseFloat(t.proceed_price.amount);
        const qty = t.number_of_tickets_for_sale.quantity_available;

        const categoryMatch = category ? t.seat_details.category === category : true;
        const priceMatch = price >= priceRange[0] && price <= priceRange[1];
        const qtyMatch = qty >= minQuantity;

        return categoryMatch && priceMatch && qtyMatch;
    });
};

export const useTicketStore = create<TicketStore>((set) => ({
    tickets: MOCK_TICKETS,
    filteredTickets: MOCK_TICKETS,

    selectedCategory: null,
    priceRange: [0, 10000],
    minQuantity: 1,

    setTickets: (tickets) => set({ tickets, filteredTickets: tickets }),

    filterByCategory: (category) => {
        set((state) => ({
            selectedCategory: category,
            filteredTickets: filterTickets(state.tickets, category, state.priceRange, state.minQuantity)
        }));
    },

    setPriceRange: (range) => {
        set((state) => ({
            priceRange: range,
            filteredTickets: filterTickets(state.tickets, state.selectedCategory, range, state.minQuantity)
        }));
    },

    setQuantity: (qty) => {
        set((state) => ({
            minQuantity: qty,
            filteredTickets: filterTickets(state.tickets, state.selectedCategory, state.priceRange, qty)
        }));
    },

    resetFilters: () => {
        set((state) => ({
            selectedCategory: null,
            priceRange: [0, 10000],
            minQuantity: 1,
            filteredTickets: state.tickets
        }));
    }
}));
