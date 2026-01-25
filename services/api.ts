import { Service, Barber, Product } from '../types';

const API_BASE =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    'http://localhost:3001';
const API_URL = `${API_BASE.replace(/\/$/, '')}/api`;

export const fetchServices = async (): Promise<Service[]> => {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
};

export const fetchBarbers = async (): Promise<Barber[]> => {
    // Currently returning static data if backend doesn't have it yet
    const response = await fetch(`${API_URL}/barbers`);
    if (!response.ok) return []; // Fallback to avoid breaking
    return response.json();
};

export const createBooking = async (bookingData: any) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
    }
    return response.json();
};

export const loginAdmin = async (credentials: any) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
};
