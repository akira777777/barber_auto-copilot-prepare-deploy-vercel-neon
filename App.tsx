import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import StyleAssistant from './components/StyleAssistant';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import { SERVICES, PRODUCTS, RATING_SCALE } from './constants';
import {
  Phone, MapPin, Clock, Instagram, Star,
  ArrowRight, Check, ShoppingCart,
  Maximize2, X, ChevronLeft, ChevronRight, ArrowUp
} from 'lucide-react';
import LoginModal from './components/LoginModal';
import { Product } from './types';

interface CartItem {
  product: Product;
  quantity: number;
}

const RatingStars: React.FC<{
  productName: string;
  rating: number;
  hover: number;
  onRate: (star: number) => void;
  onHover: (star: number) => void;
  onClearHover: () => void;
}> = ({ productName, rating, hover, onRate, onHover, onClearHover }) => {
  return (
    <fieldset
      className="flex items-center space-x-1 border-0 p-0 m-0"
      aria-label={`${productName} rating`}
      onMouseLeave={onClearHover}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover || rating);

        return (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            className="transition-transform hover:scale-125 focus:outline-none"
            aria-label={`${productName}: rate ${star} out of 5`}
          >
            <Star
              size={14}
              className={isActive ? 'text-[#c5a059] fill-[#c5a059]' : 'text-zinc-800'}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
          </button>
        );
      })}
    </fieldset>
  );
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productRatings, setProductRatings] = useState<Record<string, number>>({});
  const [hoveredStars, setHoveredStars] = useState<Record<string, number>>({});
  const [activeGalleryImage, setActiveGalleryImage] = useState<number | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    alert("Thank you for your order! Our manager in Prague will contact you for delivery confirmation.");
    setCart([]);
    setIsCartOpen(false);
  };

  const handleSetRating = (productId: string, rating: number) => {
    setProductRatings(prev => ({ ...prev, [productId]: rating }));
    // Simulate a feedback effect
    const btn = document.getElementById(`rating-toast-${productId}`);
    if (btn) {
      btn.classList.remove('hidden');
      setTimeout(() => btn.classList.add('hidden'), 2000);
    }
  };

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const galleryImages = [1, 2, 3, 4, 5, 6, 7, 8].map(i => `https://picsum.photos/seed/hair${i + 10}/800/1000`);

  if (isAdmin) {
    return <AdminDashboard onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#c5a059] selection:text-black">
      <Navbar
        onBookClick={() => setIsBookingOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        cartCount={cartCount}
      />

      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2070"
            alt="Barber Shop Interior"
            className="w-full h-full object-cover brightness-[0.35] scale-105"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl animate-in fade-in zoom-in duration-1000 ease-out">
          <h2 className="text-[#c5a059] font-black tracking-[0.4em] oswald text-sm md:text-lg mb-6 uppercase flex items-center justify-center gap-4">
            <span className="w-10 h-[1px] bg-[#c5a059]/30"></span>{' '}
            Established in Prague{' '}
            <span className="w-10 h-[1px] bg-[#c5a059]/30"></span>
          </h2>
          <h1 className="text-6xl md:text-[10rem] font-black oswald leading-[0.85] mb-10 tracking-tighter uppercase">
            CRAFTED <br /> BY <span className="text-transparent" style={{ WebkitTextStroke: '2px #c5a059' }}>STEEL</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto mb-14 font-medium uppercase oswald tracking-widest leading-relaxed">
            Premium grooming for those who define the standards. Uncompromising quality in the heart of the Czech capital.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="group relative w-full md:w-auto bg-[#c5a059] text-black px-16 py-6 oswald font-black text-xl uppercase tracking-[0.2em] transition-all overflow-hidden"
            >
              <span className="relative z-10">Book Experience</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="w-full md:w-auto border-2 border-white/10 text-white px-16 py-6 oswald font-black text-xl uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all"
            >
              Menu List
            </button>
          </div>
        </div>
        <button
          onClick={() => scrollToSection('services')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity animate-bounce"
        >
          <span className="text-[10px] font-black uppercase oswald tracking-[0.4em] rotate-90 origin-left mb-2">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#c5a059] to-transparent"></div>
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#080808] relative border-y border-white/5">
        <div className="absolute left-0 top-0 text-[10vw] font-black oswald text-zinc-900/10 -translate-x-1/4 -translate-y-1/4 pointer-events-none select-none uppercase">Service</div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[#c5a059] font-black oswald tracking-[0.4em] mb-4 uppercase text-sm">Fine Selection</h2>
              <h3 className="text-6xl md:text-8xl font-black oswald uppercase tracking-tighter leading-none mb-6">Expert <br /> <span className="text-[#c5a059]">Solutions</span></h3>
              <p className="text-zinc-500 uppercase font-black oswald tracking-widest text-sm max-w-md">Each session includes a consultation, wash, and styling with premium Iron & Steel products.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', 'hair', 'beard', 'combo'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-10 py-3 text-[11px] font-black uppercase tracking-[0.2em] oswald transition-all border-2 ${activeCategory === cat ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-zinc-800 text-zinc-600 hover:border-zinc-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setIsBookingOpen(true)}
                aria-label={`Book: ${service.name}`}
                className="group w-full flex justify-between items-start border-b-2 border-zinc-900 pb-8 hover:border-[#c5a059]/40 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black oswald text-zinc-700 group-hover:text-[#c5a059] transition-colors">0{service.id}</span>
                    <h4 className="text-2xl md:text-3xl font-black uppercase oswald group-hover:text-[#c5a059] transition-colors leading-none tracking-tight">
                      {service.name}
                    </h4>
                  </div>
                  <p className="text-zinc-500 text-sm max-w-sm font-medium uppercase tracking-wide leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                      <Clock size={12} className="text-[#c5a059]" /> {service.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <span className="text-3xl font-black oswald text-white group-hover:text-[#c5a059] transition-colors shrink-0">{service.price} Kč</span>
                  <div className="mt-2 text-[9px] font-black oswald text-[#c5a059] tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end gap-1">
                    Book <ArrowRight size={10} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#c5a059]/30 flex items-center justify-center group-hover:bg-[#c5a059] group-hover:border-[#c5a059] transition-all duration-500">
                <ArrowRight className="text-[#c5a059] group-hover:text-black transition-colors" size={24} />
              </div>
              <span className="text-lg font-black uppercase oswald tracking-[0.3em] group-hover:text-[#c5a059] transition-colors">Book Full Treatment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section with Lightbox */}
      <section id="gallery" className="py-32 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
            <div>
              <h2 className="text-[#c5a059] font-black oswald tracking-[0.4em] mb-4 uppercase text-sm">Style Archive</h2>
              <h3 className="text-6xl md:text-8xl font-black oswald uppercase tracking-tighter leading-none">The <span className="text-zinc-800 text-stroke-zinc">Portfolio</span></h3>
            </div>
            <p className="text-zinc-500 uppercase font-black oswald tracking-widest text-xs max-w-xs border-l-2 border-[#c5a059] pl-6">Real clients. Real transformations. All crafted at Iron & Steel Prague.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {galleryImages.map((src, idx) => (
              <button
                key={src}
                onClick={() => setActiveGalleryImage(idx)}
                type="button"
                aria-label={`View work ${idx + 1}`}
                className="group relative aspect-[3/4] overflow-hidden bg-zinc-900 border-2 border-zinc-900 hover:border-[#c5a059] transition-all duration-500 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a059]"
              >
                <img
                  src={src}
                  alt={`Work ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-[#c5a059] flex items-center justify-center text-black">
                    <Maximize2 size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase oswald tracking-widest text-white translate-y-4 group-hover:translate-y-0 transition-transform">View Work 0{idx + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeGalleryImage !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <button
            onClick={() => setActiveGalleryImage(null)}
            type="button"
            aria-label="Close gallery"
            className="absolute top-10 right-10 text-white hover:text-[#c5a059] transition-colors z-[110]"
          >
            <X size={40} strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setActiveGalleryImage(prev => prev! > 0 ? prev! - 1 : galleryImages.length - 1); }}
            type="button"
            aria-label="Previous image"
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4"
          >
            <ChevronLeft size={60} strokeWidth={1} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveGalleryImage(prev => prev! < galleryImages.length - 1 ? prev! + 1 : 0); }}
            type="button"
            aria-label="Next image"
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4"
          >
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          <div 
            className="max-w-4xl max-h-[85vh] p-4 relative group" 
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setActiveGalleryImage(null);
            }}
            tabIndex={-1}
            role="dialog"
          >
            <img
              src={galleryImages[activeGalleryImage]}
              alt="Enlarged Work"
              className="w-full h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500 border border-white/10"
            />
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <div>
                <span className="text-[#c5a059] text-[10px] font-black uppercase oswald tracking-[0.4em] mb-2 block">Iron & Steel Portfolio</span>
                <h4 className="text-4xl font-black oswald uppercase text-white leading-none">Craft #0{activeGalleryImage + 1}</h4>
              </div>
              <div className="flex gap-4">
                <a href="https://twitter.com/ironsteel_prague" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-[#c5a059] transition-colors text-xs font-black uppercase tracking-widest oswald">
                  <Instagram size={16} /> Share
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shop Section */}
      <section id="shop" className="py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-[#c5a059] font-black oswald tracking-[0.4em] mb-4 uppercase text-sm">Grooming Goods</h2>
              <h3 className="text-6xl md:text-8xl font-black oswald uppercase tracking-tighter leading-none">The <span className="text-[#c5a059]">Shop</span></h3>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
              <p className="text-zinc-500 uppercase font-black oswald tracking-widest text-xs max-w-xs">Professional products used in our Prague chairs. Ships across CZ.</p>
              <div className="flex gap-4 mt-4">
                <button className="text-[10px] font-black text-[#c5a059] border-b-2 border-[#c5a059] pb-1 uppercase tracking-widest oswald">New Arrivals</button>
                <button className="text-[10px] font-black text-zinc-700 hover:text-white transition-colors pb-1 uppercase tracking-widest oswald">Best Sellers</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
            {PRODUCTS.map(product => (
              <div
                key={product.id}
                className="group relative bg-black border-2 border-zinc-900 hover:border-[#c5a059] transition-all duration-300 flex flex-col transform hover:-translate-y-2"
              >
                <div className="aspect-square bg-zinc-950 overflow-hidden relative group-hover:bg-zinc-900 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 p-8"
                  />
                  <div className="absolute top-4 left-4 bg-[#c5a059] text-black text-[9px] font-black px-3 py-1.5 uppercase tracking-widest oswald rotate-[-5deg]">
                    In Stock
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col border-t border-zinc-900 bg-[#050505]">
                  <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-[0.3em] mb-2">{product.brand}</p>
                  <h4 className="text-2xl font-black uppercase oswald mb-4 leading-tight text-white group-hover:text-[#c5a059] transition-colors">
                    {product.name}
                  </h4>

                  {/* Rating System with Active Feedback */}
                  <div className="flex items-center gap-3 mb-6">
                    <fieldset className="flex items-center space-x-1" onMouseLeave={() => setHoveredStars(prev => ({ ...prev, [product.id]: 0 }))}>
                      {RATING_SCALE.map((star) => {
                        const currentRating = productRatings[product.id] || 0;
                        const currentHover = hoveredStars[product.id] || 0;
                        const isActive = star <= (currentHover || currentRating);

                        return (
                          <button
                            key={star}
                            onClick={() => handleSetRating(product.id, star)}
                            onMouseEnter={() => setHoveredStars(prev => ({ ...prev, [product.id]: star }))}
                            className="transition-transform hover:scale-125 focus:outline-none"
                          >
                            <Star
                              size={14}
                              className={isActive ? "text-[#c5a059] fill-[#c5a059]" : "text-zinc-800"}
                              strokeWidth={2}
                            />
                          </button>
                        );
                      })}
                    </fieldset>
                    <div id={`rating-toast-${product.id}`} className="hidden text-[8px] font-black uppercase tracking-widest text-green-500 animate-in fade-in slide-in-from-left-2">Saved</div>
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-900">
                    <span className="text-3xl font-black oswald text-white">{product.price} Kč</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-12 h-12 flex items-center justify-center transition-all border-2 ${addedItems[product.id]
                          ? 'bg-[#c5a059] border-[#c5a059] text-black'
                          : 'bg-black border-zinc-800 text-zinc-600 hover:border-[#c5a059] hover:text-[#c5a059] active:scale-90'
                        }`}
                    >
                      {addedItems[product.id] ? <Check size={20} strokeWidth={4} /> : <ShoppingCart size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts & Map */}
      <section id="contacts" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <div>
                <h2 className="text-[#c5a059] font-black oswald tracking-[0.4em] mb-4 uppercase text-sm">Prague District 1</h2>
                <h3 className="text-6xl md:text-9xl font-black oswald uppercase tracking-tighter leading-none mb-10">Visit <br /> <span className="text-[#c5a059]">The Shop</span></h3>
                <p className="text-zinc-500 text-lg md:text-xl font-medium uppercase oswald tracking-widest leading-relaxed max-w-md italic">
                  Located in the historic Vodičkova Street. A true gentlemen's sanctuary.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-12">
                {[
                  { label: 'Address', value: 'Vodičkova 36, 110 00 Prague 1', icon: MapPin },
                  { label: 'Phone', value: '+420 000 000 000', icon: Phone },
                  { label: 'Opening', value: 'MON-SUN: 10:00 - 22:00', icon: Clock },
                  { label: 'Connect', value: '@ironsteel_prague', icon: Instagram },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-[#c5a059] shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] oswald text-zinc-500 mb-1">{item.label}</p>
                      <p className="text-sm font-bold uppercase tracking-tight text-white oswald">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-zinc-900 flex gap-6">
                <button type="button" onClick={() => window.open('https://maps.google.com/maps/search/Vodičkova+36,+Prague', '_blank')} className="flex-1 bg-zinc-900 border border-zinc-800 text-white p-6 text-center oswald font-black uppercase tracking-widest hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all">Directions</button>
                <button type="button" onClick={() => setIsBookingOpen(true)} className="flex-1 bg-white text-black p-6 text-center oswald font-black uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all">Book Now</button>
              </div>
            </div>

            <div className="relative group aspect-square">
              <div className="absolute -inset-4 border-2 border-zinc-900 group-hover:border-[#c5a059]/30 transition-all duration-1000 pointer-events-none"></div>
              <div className="w-full h-full bg-zinc-950 border-2 border-zinc-800 overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/prague-map/1200/1200"
                  alt="Prague Location"
                  className="w-full h-full object-cover opacity-40 grayscale contrast-125 scale-110 group-hover:scale-100 transition-all duration-[20s] linear infinite"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#c5a059] rounded-full animate-ping opacity-20"></div>
                    <div className="w-16 h-16 bg-[#c5a059] border-4 border-black text-black flex items-center justify-center shadow-2xl relative z-10">
                      <MapPin size={28} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-md p-6 border border-white/5 translate-y-12 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-sm font-black uppercase oswald tracking-widest mb-2">Iron & Steel Prague 1</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-4">Historic District • Complimentary Parking for Clients</p>
                  <button className="w-full py-3 bg-[#c5a059] text-black font-black uppercase oswald tracking-widest text-xs">Open in Navigation</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <span className="text-4xl font-black tracking-tighter oswald flex items-center text-white mb-8">
              IRON <span className="text-[#c5a059] mx-2">&</span> STEEL
            </span>
            <p className="text-zinc-500 text-sm max-w-sm font-bold uppercase oswald tracking-widest leading-relaxed">
              Premium grooming sanctuary for the modern man. Crafting perfection in Prague since 2014. Join the elite.
            </p>
          </div>
          <div>
            <h5 className="text-[#c5a059] font-black uppercase tracking-[0.4em] oswald text-xs mb-8">Navigation</h5>
            <ul className="space-y-4">
              {['Services', 'Barbers', 'Gallery', 'Shop', 'Contacts'].map(item => (
                <li key={item}><button onClick={() => scrollToSection(item.toLowerCase())} className="text-zinc-400 hover:text-white transition-colors uppercase font-black oswald tracking-widest text-xs">{item}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[#c5a059] font-black uppercase tracking-[0.4em] oswald text-xs mb-8">Company</h5>
            <ul className="space-y-4">
              {['About Us', 'Privacy Policy', 'Terms of Service', 'Career', 'Gift Cards'].map(item => (
                <li key={item}><button type="button" onClick={() => {}} className="text-zinc-400 hover:text-white transition-colors uppercase font-black oswald tracking-widest text-xs text-left">{item}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-zinc-900 pt-12">
          <div className="flex gap-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-700 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-white transition-colors text-xs font-black uppercase oswald tracking-widest">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-white transition-colors text-xs font-black uppercase oswald tracking-widest">Facebook</a>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-zinc-800 text-[10px] font-black uppercase oswald tracking-widest">© 2024 IRON & STEEL PRAGUE. ALL RIGHTS RESERVED.</p>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-zinc-800 hover:text-[#c5a059] text-[9px] uppercase tracking-[0.4em] font-black transition-all p-2 border border-zinc-900 rounded-sm"
            >
              STAFF LOGIN
            </button>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        type="button"
        aria-label="Scroll to top"
        className={`fixed bottom-8 left-8 z-[50] w-14 h-14 bg-zinc-900 border-2 border-zinc-800 text-[#c5a059] flex items-center justify-center transition-all ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:bg-[#c5a059] hover:text-black`}
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>

      {/* Overlays */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      <StyleAssistant onAddToCart={handleAddToCart} addedItems={addedItems} />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => setIsAdmin(true)}
      />
    </div>
  );
};

export default App;