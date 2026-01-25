
import React, { useState } from 'react';
import { SERVICES, BARBERS } from '../constants';
import { X, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    barberId: '',
    date: '',
    time: '',
    name: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const steps = [
    { title: 'Select Service', id: 1 },
    { title: 'Select Barber', id: 2 },
    { title: 'Date & Time', id: 3 },
    { title: 'Your Details', id: 4 },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => { setFormData({ ...formData, serviceId: s.id }); handleNext(); }}
                className={`w-full p-4 border text-left flex justify-between items-center transition-all ${formData.serviceId === s.id ? 'border-[#c5a059] bg-[#c5a059]/10' : 'border-white/10 hover:border-white/30'}`}
              >
                <div>
                  <p className="font-bold uppercase tracking-tight">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.duration}</p>
                </div>
                <span className="font-bold oswald text-[#c5a059]">{s.price} Kč</span>
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-3">
             <button
                onClick={() => { setFormData({ ...formData, barberId: 'any' }); handleNext(); }}
                className="p-4 border border-white/10 text-center hover:border-[#c5a059] transition-all font-bold uppercase oswald tracking-widest text-sm"
              >
                Any Free Master
              </button>
            {BARBERS.map((b) => (
              <button
                key={b.id}
                onClick={() => { setFormData({ ...formData, barberId: b.id }); handleNext(); }}
                className={`p-4 border text-left flex items-center space-x-4 transition-all ${formData.barberId === b.id ? 'border-[#c5a059] bg-[#c5a059]/10' : 'border-white/10 hover:border-white/30'}`}
              >
                <img src={b.image} alt={b.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                <div>
                  <p className="font-bold uppercase">{b.name}</p>
                  <p className="text-xs text-gray-500">{b.role}</p>
                </div>
              </button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <input 
              type="date" 
              className="w-full bg-black border border-white/20 p-4 text-white focus:outline-none focus:border-[#c5a059] uppercase oswald"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            <div className="grid grid-cols-4 gap-2">
              {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                <button
                  key={t}
                  onClick={() => { setFormData({...formData, time: t}); handleNext(); }}
                  className={`p-2 text-sm border font-bold oswald ${formData.time === t ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-white/10 hover:border-white/40'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full bg-black border border-white/20 p-4 text-white uppercase oswald"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="tel" 
              placeholder="+420 ___ ___ ___"
              className="w-full bg-black border border-white/20 p-4 text-white oswald"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <button 
              onClick={() => setStep(5)}
              className="w-full bg-[#c5a059] text-black font-bold p-4 uppercase oswald tracking-widest mt-4 hover:bg-white transition-all"
            >
              Confirm Booking
            </button>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-10 space-y-4">
            <CheckCircle className="mx-auto text-[#c5a059] w-16 h-16" />
            <h3 className="text-2xl font-bold uppercase oswald">You're Booked!</h3>
            <p className="text-gray-400">We've sent a confirmation via Telegram/SMS. See you soon in Prague!</p>
            <button 
              onClick={onClose}
              className="mt-6 border border-[#c5a059] text-[#c5a059] px-8 py-2 uppercase oswald tracking-widest hover:bg-[#c5a059] hover:text-black transition-all"
            >
              Close
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-zinc-900 border-2 border-zinc-800 w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-black/40">
          <h2 className="text-xl font-bold oswald uppercase tracking-widest text-[#c5a059]">
            {step < 5 ? steps.find(s => s.id === step)?.title : 'Success'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {renderStep()}
        </div>

        {step > 1 && step < 5 && (
          <div className="p-6 border-t border-zinc-800 flex justify-between items-center bg-black/40">
            <button onClick={handlePrev} className="text-zinc-500 hover:text-white text-[10px] uppercase font-black tracking-widest transition-colors">Back</button>
            <div className="flex space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-1.5 w-6 ${step >= i ? 'bg-[#c5a059]' : 'bg-zinc-800'}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
