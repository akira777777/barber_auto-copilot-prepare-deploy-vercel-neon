import React, { useState, useRef } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Sparkles, Camera, Loader2, Send, ShoppingBag, Plus, Check, X } from 'lucide-react';

interface StyleAssistantProps {
  onAddToCart?: (product: Product) => void;
  addedItems?: Record<string, boolean>;
}

const StyleAssistant: React.FC<StyleAssistantProps> = ({ onAddToCart, addedItems = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImageBase64(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!description && !imageBase64) return;
    setLoading(true);
    try {
      // Lazy load Gemini service only when needed
      const { getStyleAdvice } = await import('../services/gemini');
      const advice = await getStyleAdvice(description, imageBase64 || undefined);
      setResult(advice);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getProductData = (id: string) => PRODUCTS.find(p => p.id === id);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#c5a059] text-black p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center space-x-3 font-black uppercase oswald"
      >
        <Sparkles size={20} strokeWidth={2.5} />
        <span className="hidden md:inline tracking-widest">AI Stylist</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-full max-w-md bg-zinc-900 border-2 border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
      <div className="bg-[#c5a059] p-4 flex justify-between items-center shrink-0 border-b-2 border-zinc-800">
        <div className="flex items-center space-x-2 text-black">
          <Sparkles size={20} />
          <h3 className="font-bold oswald uppercase tracking-wider">AI Style Advisor</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-black hover:opacity-50 transition-all" aria-label="Close AI Style Advisor">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-4 overflow-y-auto">
        {!result ? (
          <>
            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
              Describe your style goals or upload a photo. Our AI will analyze your features and suggest the perfect cut and products from our Prague collection.
            </p>
            <div className="space-y-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: I want a sharp fade, I have a square face, beard grows unevenly..."
                className="w-full bg-black border-2 border-zinc-800 p-4 text-sm focus:border-[#c5a059] outline-none h-28 text-white resize-none oswald uppercase tracking-widest placeholder:text-zinc-800"
              />
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center space-x-2 bg-zinc-950 border-2 border-zinc-800 py-3 hover:bg-zinc-900 hover:border-[#c5a059] transition-all text-white font-black uppercase oswald text-xs tracking-widest"
                >
                  <Camera size={16} />
                  <span>Upload Photo</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  aria-label="Upload photo for style analysis"
                />
              </div>
              {imageBase64 && (
                <div className="p-2 border-2 border-[#c5a059] bg-[#c5a059]/5 text-center text-[10px] text-[#c5a059] uppercase font-black tracking-widest animate-pulse">
                  IMAGE READY
                </div>
              )}
              <button
                disabled={loading || (!description && !imageBase64)}
                onClick={handleAnalyze}
                className="w-full bg-black border-2 border-[#c5a059] text-[#c5a059] font-black py-4 flex items-center justify-center space-x-3 hover:bg-[#c5a059] hover:text-black disabled:opacity-50 transition-all oswald uppercase tracking-[0.2em]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> <span>Analyze Style</span></>}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-4">
              <div className="border-b-2 border-zinc-800 pb-4">
                <h4 className="text-[#c5a059] text-[10px] font-black uppercase oswald tracking-widest mb-1">Recommended Look</h4>
                <p className="font-black text-2xl leading-tight uppercase oswald text-white">{result.haircutRecommendation}</p>
                <p className="text-sm text-zinc-500 mt-1 uppercase font-bold tracking-wider">{result.beardRecommendation}</p>
              </div>
              
              <div className="bg-black p-5 border-2 border-zinc-800">
                <p className="text-xs text-zinc-400 leading-relaxed italic uppercase tracking-wide">{result.reasoning}</p>
              </div>

              {result.productRecommendations?.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-[#c5a059] text-[10px] font-black uppercase oswald tracking-[0.2em] flex items-center gap-2">
                    <ShoppingBag size={14} /> Iron & Steel Grooming
                  </h4>
                  <div className="grid gap-4">
                    {result.productRecommendations.map((rec: any, idx: number) => {
                      const product = getProductData(rec.productId);
                      if (!product) return null;
                      const isAdded = addedItems[product.id];
                      return (
                        <div key={rec.productId} className="bg-zinc-950 border-2 border-zinc-800 p-4 group hover:border-[#c5a059] transition-all">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-16 h-16 bg-zinc-900 overflow-hidden shrink-0 border-2 border-zinc-800 group-hover:border-[#c5a059] transition-colors">
                              <img src={product.image} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt={product.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] text-[#c5a059] font-black uppercase tracking-widest leading-none mb-1">{product.brand}</p>
                              <p className="text-base font-bold uppercase oswald truncate text-white mb-1 leading-tight">{product.name}</p>
                              <p className="text-sm font-black text-white">{product.price} Kč</p>
                            </div>
                            <button 
                              onClick={() => onAddToCart?.(product)}
                              className={`w-10 h-10 border-2 flex items-center justify-center transition-all ${
                                isAdded 
                                ? 'bg-[#c5a059] border-[#c5a059] text-black' 
                                : 'bg-black border-zinc-800 text-zinc-500 hover:border-[#c5a059] hover:text-[#c5a059]'
                              }`}
                            >
                              {isAdded ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                            </button>
                          </div>
                          <p className="text-[10px] text-zinc-600 leading-snug italic border-t border-zinc-800 pt-3 mt-1 group-hover:text-zinc-300">
                            {rec.reason}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-[#c5a059] text-[10px] font-black uppercase oswald tracking-widest">Expert Care Tips</h4>
                <div className="space-y-2">
                  {result.careTips?.map((tip: string, idx: number) => (
                    <div key={tip} className="flex items-start space-x-3 text-[10px] text-zinc-500 bg-black p-3 border border-zinc-800 uppercase font-bold tracking-widest leading-normal">
                      <span className="text-[#c5a059] shrink-0 font-black">/</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {setResult(null); setDescription(''); setImageBase64(null);}}
              className="w-full bg-zinc-950 border-2 border-zinc-800 py-4 text-[11px] font-black uppercase oswald tracking-[0.3em] hover:bg-zinc-900 hover:border-white transition-all text-white mt-6"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleAssistant;