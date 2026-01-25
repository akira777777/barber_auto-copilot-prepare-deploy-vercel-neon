
import React, { useState } from 'react';
import { ShoppingCart, Phone, Send, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onCartClick: () => void;
  onNavigate: (section: string) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick, onCartClick, onNavigate, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Barbers', id: 'team' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Shop', id: 'shop' },
    { name: 'Contacts', id: 'contacts' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="bg-zinc-950/50 border-b border-white/5 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-end items-center space-x-6">
          <a 
            href="tel:+420000000000" 
            className="text-[10px] font-bold text-zinc-500 hover:text-[#c5a059] flex items-center gap-2 transition-all uppercase tracking-[0.2em] oswald"
          >
            <Phone size={12} className="text-[#c5a059]" />
            +420 000 000 000
          </a>
          <div className="h-3 w-[1px] bg-white/10"></div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              target="_blank" 
              className="text-zinc-500 hover:text-[#c5a059] flex items-center gap-1.5 transition-all text-[9px] font-bold uppercase tracking-widest oswald"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
            <a 
              href="#" 
              target="_blank" 
              className="text-zinc-500 hover:text-[#c5a059] flex items-center gap-1.5 transition-all text-[9px] font-bold uppercase tracking-widest oswald"
            >
              <Send size={12} />
              Telegram
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-extrabold tracking-tighter oswald flex items-center text-white">
              IRON <span className="text-[#c5a059] mx-1">&</span> STEEL
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-gray-300 hover:text-[#c5a059] px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-wider oswald"
                >
                  {link.name}
                </button>
              ))}
              
              <button 
                onClick={onCartClick}
                className="relative text-gray-300 hover:text-[#c5a059] p-2 transition-colors group"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in group-hover:scale-110 transition-transform oswald">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={onBookClick}
                className="bg-[#c5a059] text-black px-8 py-3 border-2 border-[#c5a059] font-bold text-sm uppercase tracking-[0.2em] hover:bg-transparent hover:text-[#c5a059] transition-all transform hover:scale-105 oswald"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={onCartClick} className="relative text-gray-300 hover:text-[#c5a059] p-2 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white">
              <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-2 text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setIsOpen(false); }}
                className="text-gray-300 hover:text-[#c5a059] block px-3 py-4 text-xl font-bold oswald w-full uppercase tracking-widest border-b border-white/5 last:border-0"
              >
                {link.name}
              </button>
            ))}
            
            <button
              onClick={() => { onBookClick(); setIsOpen(false); }}
              className="w-full bg-[#c5a059] text-black px-6 py-5 font-black text-xl uppercase oswald tracking-[0.2em] mt-8 border-2 border-[#c5a059]"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
