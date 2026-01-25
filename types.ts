
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: 'hair' | 'beard' | 'care' | 'combo';
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  image: string;
  specialty: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  discount?: number; // Optional discount percentage (0-100)
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google' | 'Yandex' | 'Instagram';
}

export interface BookingState {
  serviceId?: string;
  barberId?: string;
  date?: string;
  time?: string;
}
