import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';
import { Banner } from '../../types';

interface HeroBannerProps {
  banner: Banner;
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ banner, onExplore }) => {
  return (
    <div className="relative min-h-[85vh] bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-zinc-800">
      
      {/* Background Image with Dark Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={banner.imageUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"}
          alt="ROYMEN Luxury Editorial"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse transition-transform duration-1000 font-serif"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12">
        
        {/* Subtle Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-[0.2em] backdrop-blur-md shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>WINTER ATELIER '26 • BANGLADESH LUXURY</span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-serif tracking-tight uppercase leading-[1.08] max-w-4xl mx-auto">
          WEAR CONFIDENCE.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto font-sans font-normal leading-relaxed tracking-wide">
          Bespoke Italian suits, pure Mulberry silk Royal Panjabis, and heavyweight cashmere coats. Tailored for those who lead without asking.
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-white hover:bg-amber-400 text-black font-black px-8 py-4 rounded-2xl shadow-2xl uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#ethnic"
            className="w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-2xl border border-zinc-700/80 backdrop-blur-md uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Royal Panjabi Series</span>
          </a>
        </div>

        {/* Trust Stats Bar */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-xs text-zinc-400 border-t border-zinc-800/80">
          <div>
            <strong className="text-white text-base font-serif font-black block">100% ITALIAN</strong>
            <span>Super 150s Wool Fabrics</span>
          </div>
          <div>
            <strong className="text-white text-base font-serif font-black block">GULSHAN ATELIER</strong>
            <span>Master Tailors in Dhaka</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <strong className="text-white text-base font-serif font-black block">24-48 HR DELIVERY</strong>
            <span>Express Courier in BD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
