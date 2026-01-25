
import { Service, Barber, Product, Testimonial } from './types';

export const SERVICES: Service[] = [
  { id: '1', name: 'Classic Haircut', description: 'Traditional men\'s haircut using scissors and clippers.', duration: '60 min', price: 650, category: 'hair' },
  { id: '2', name: 'Beard & Moustache Trim', description: 'Contouring, length correction, and premium oil treatment.', duration: '40 min', price: 450, category: 'beard' },
  { id: '3', name: 'Grey Camouflage', description: 'Natural toning of grey hair without the "dyed" look.', duration: '30 min', price: 550, category: 'hair' },
  { id: '4', name: 'Straight Razor Shave', description: 'Royal shave with hot towels and premium grooming products.', duration: '50 min', price: 600, category: 'beard' },
  { id: '5', name: 'Combo: Cut & Beard', description: 'The ultimate grooming package for a complete sharp look.', duration: '90 min', price: 950, category: 'combo' },
  { id: '6', name: 'Junior Cut', description: 'Sharp styles for future gentlemen under 12 years old.', duration: '45 min', price: 400, category: 'hair' },
];

export const BARBERS: Barber[] = [
  { 
    id: 'b1', 
    name: 'Alex "Thunder" Storm', 
    role: 'Top Barber', 
    experience: '8 years', 
    bio: 'Master of classic shapes and perfect fades. Obsessed with facial geometry.',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400',
    specialty: ['Classics', 'Straight Razor', 'Fade']
  },
  { 
    id: 'b2', 
    name: 'Max Sharp', 
    role: 'Creative Master', 
    experience: '5 years', 
    bio: 'Specialist in modern trends and complex textures. Enjoys styling experiments.',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400',
    specialty: ['Crop', 'Modern Styles', 'Hair Tattoo']
  },
  { 
    id: 'b3', 
    name: 'Viktor "The Beard" Prague', 
    role: 'Senior Barber', 
    experience: '12 years', 
    bio: 'A local legend. The best specialist for beards of any complexity in Prague.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    specialty: ['Beard', 'Grooming', 'Traditional']
  },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Sandalwood Oil', brand: 'Iron & Steel', price: 350, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=300', category: 'beard', discount: 15 },
  { id: 'p2', name: 'Matte Clay', brand: 'Reuzel', price: 480, image: 'https://images.unsplash.com/photo-1554519934-e32b8b64f72f?auto=format&fit=crop&q=80&w=300', category: 'hair' },
  { id: 'p3', name: 'Daily Shampoo', brand: 'Uppercut', price: 420, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=300', category: 'care', discount: 10 },
  { id: 'p4', name: 'Sea Salt Spray', brand: 'Morgan\'s', price: 550, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=300', category: 'hair' },
  { id: 'p5', name: 'Beard Balm', brand: 'Proraso', price: 380, image: 'https://images.unsplash.com/photo-1594411133065-f483b156942c?auto=format&fit=crop&q=80&w=300', category: 'beard', discount: 20 },
  { id: 'p6', name: 'Aftershave Lotion', brand: 'Clubman', price: 290, image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=300', category: 'care' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', author: 'Mark D.', rating: 5, text: 'Best spot in Prague. Alex did an amazing transition. The vibe is absolute fire!', date: '12.10.2023', source: 'Google' },
  { id: 't2', author: 'Lukas M.', rating: 5, text: 'Visiting Viktor for a year now. Consistently high quality and excellent espresso.', date: '05.10.2023', source: 'Instagram' },
  { id: 't3', author: 'David V.', rating: 4, text: 'Cool interior and service. Hard to get an evening slot but worth the wait.', date: '28.09.2023', source: 'Instagram' },
];

export const COLORS = {
  primary: '#c5a059',
  secondary: '#1a1a1a',
  background: '#0a0a0a',
  text: '#ffffff',
  muted: '#888888',
};

export const RATING_SCALE = [1, 2, 3, 4, 5];
