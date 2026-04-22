import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-4 shadow-xl shadow-indigo-600/20">
            <TrendingUp className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Zenith Trade</h1>
          <p className="text-zinc-500 mt-2 font-medium">Next-generation financial terminal</p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-md relative shadow-2xl">
          <div className="flex bg-black p-1 rounded-xl mb-8 border border-zinc-800/50">
            <button 
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                isLogin ? "bg-zinc-800 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                !isLogin ? "bg-zinc-800 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Get Started
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Identity</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Full Name"
                    className="w-full bg-black border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">Terminal ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address"
                  className="w-full bg-black border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Secret Key</label>
                {isLogin && <button type="button" className="text-[10px] text-zinc-500 hover:text-white font-bold uppercase tracking-widest transition-colors">Recover</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-black border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="uppercase tracking-widest text-xs">{isLogin ? 'Establish Connection' : 'Register Terminal'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800/50"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#0c0c0e] px-4 text-zinc-600 font-bold">Standard Auth</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-800/30 transition-all text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-800/30 transition-all text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8 opacity-50">
          <p className="text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            High-Security Encryption Enabled
          </p>
          <p className="text-center text-zinc-500 text-[9px] leading-relaxed uppercase tracking-tight px-4">
            Risk Warning: Trading foreign exchange and derivatives involves significant risk and is not suitable for all investors. You could lose more than your initial deposit.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
