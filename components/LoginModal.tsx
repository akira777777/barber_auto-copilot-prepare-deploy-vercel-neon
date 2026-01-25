
import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { loginAdmin } from '../services/api';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (token: string, user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const data = await loginAdmin({ username, password });
            localStorage.setItem('token', data.token);
            onLoginSuccess(data.token, data.user);
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-zinc-900 border-2 border-zinc-800 w-full max-w-md overflow-hidden shadow-2xl p-8">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#c5a059] flex items-center justify-center text-black mx-auto mb-4">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-black oswald uppercase tracking-widest text-white">Staff Login</h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mt-2">Iron & Steel Prague Management</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 oswald">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#c5a059] uppercase oswald"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 oswald">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#c5a059] oswald"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-black uppercase oswald tracking-widest">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#c5a059] text-black font-black p-4 uppercase oswald tracking-[0.2em] mt-6 hover:bg-white transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Enter Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
