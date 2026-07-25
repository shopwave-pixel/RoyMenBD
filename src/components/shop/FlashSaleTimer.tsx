import React, { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';

export const FlashSaleTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900 to-amber-950/80 border-y border-amber-500/30 py-3.5 px-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-serif font-bold text-sm tracking-wide">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="uppercase text-amber-300">LIMITED ATELIER FLASH SALE</span>
          <span className="hidden md:inline text-zinc-400 text-xs font-sans font-normal">
            | Enjoy up to 25% OFF on Royal Silk Panjabis & Executive Tuxedos.
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-400 uppercase font-sans font-bold text-[10px]">ENDS IN:</span>
          <div className="flex items-center gap-1">
            <span className="bg-zinc-950 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg font-bold text-xs">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="bg-zinc-950 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg font-bold text-xs">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="bg-zinc-950 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg font-bold text-xs">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
