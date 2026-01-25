
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Zap, Store, Calendar, Info } from 'lucide-react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout 
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-zinc-900 shadow-2xl border-l-2 border-zinc-800">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-6">
                <h2 className="text-xl font-bold oswald uppercase tracking-widest flex items-center gap-3 text-white">
                  <ShoppingBag className="text-[#c5a059]" />
                  Your Cart
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-all transform hover:rotate-90">
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8">
                {items.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag size={48} className="mx-auto text-zinc-800 mb-4" />
                    <p className="text-zinc-500 mb-6 font-black oswald uppercase tracking-widest">Cart is empty</p>
                    <button 
                      onClick={onClose}
                      className="text-[#c5a059] oswald uppercase tracking-[0.2em] font-black border-2 border-[#c5a059] px-8 py-4 hover:bg-[#c5a059] hover:text-black transition-all"
                    >
                      Return to Shop
                    </button>
                  </div>
                ) : (
                  <>
                    <ul className="divide-y-2 divide-zinc-800 mb-10">
                      {items.map((item) => (
                        <li key={item.product.id} className="py-6 flex animate-in slide-in-from-right-4 duration-300">
                          <div className="flex-shrink-0 w-24 h-24 border-2 border-zinc-800 overflow-hidden bg-black/40">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-center object-cover grayscale group-hover:grayscale-0 transition-all"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-bold oswald uppercase text-white">
                                <h3 className="line-clamp-1 pr-2">{item.product.name}</h3>
                                <p className="text-[#c5a059] shrink-0">{item.product.price * item.quantity} Kč</p>
                              </div>
                              <p className="mt-1 text-[10px] text-zinc-500 uppercase tracking-widest font-black">{item.product.brand}</p>
                            </div>
                            
                            <div className="flex-1 flex items-end justify-between text-sm mt-4">
                              {/* Direct Quantity Controls */}
                              <div className="flex items-center border-2 border-zinc-800 bg-black">
                                <button 
                                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                                  className="p-2 hover:bg-[#c5a059] hover:text-black text-zinc-500 transition-all border-r-2 border-zinc-800"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} strokeWidth={3} />
                                </button>
                                <span className="px-4 py-1 font-black oswald text-white min-w-[2.5rem] text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                                  className="p-2 hover:bg-[#c5a059] hover:text-black text-zinc-500 transition-all border-l-2 border-zinc-800"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} strokeWidth={3} />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => onRemove(item.product.id)}
                                className="font-black text-zinc-700 hover:text-red-500 flex items-center gap-1.5 uppercase text-[9px] tracking-[0.2em] transition-colors oswald"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Shipping Info */}
                    <div className="bg-black border-2 border-zinc-800 p-5 mb-8 space-y-6">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <h4 className="text-[#c5a059] text-[11px] font-black uppercase oswald tracking-widest flex items-center gap-2">
                          <Truck size={14} /> Delivery Methods
                        </h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                            <Store className="text-[#c5a059]" size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="text-[11px] font-black text-white uppercase tracking-wider">Store Pickup</p>
                              <p className="text-[11px] font-black text-[#c5a059]">FREE</p>
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">Ready in 30m • Prague 1</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                            <Truck className="text-zinc-500" size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="text-[11px] font-black text-white uppercase tracking-wider">Courier Delivery</p>
                              <p className="text-[11px] font-black text-[#c5a059]">150 Kč</p>
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">Prague area • 1-2 days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="border-t-2 border-zinc-800 py-8 px-4 sm:px-6 bg-black">
                <div className="flex justify-between text-base font-black oswald uppercase text-white mb-6">
                  <p className="tracking-[0.2em] text-zinc-500 text-[11px]">Subtotal</p>
                  <p className="text-2xl text-[#c5a059]">{subtotal} Kč</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-[#c5a059] text-black px-6 py-5 oswald font-black text-xl uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-[#c5a059]"
                  >
                    Checkout Now
                  </button>
                </div>
                <p className="mt-6 text-[9px] text-center text-zinc-600 uppercase font-black tracking-[0.2em] oswald">
                  Secure Payment Processing • Prague HQ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
