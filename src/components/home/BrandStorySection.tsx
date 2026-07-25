import React from 'react';
import { ShieldCheck, Award, Sparkles, MapPin } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 text-white font-sans border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Editorial Image Stack */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
              alt="ROYMEN Atelier Craftsmanship"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -right-6 hidden sm:block bg-zinc-900 border border-zinc-800 p-6 rounded-3xl max-w-xs shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Gulshan Atelier
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Every seam, buttonhole, and lapel curvature is crafted under the supervision of master tailors in Dhaka.
            </p>
          </div>
        </div>

        {/* Narrative Text */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            THE ROYMEN MANIFESTO
          </span>

          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white uppercase leading-tight">
            Wear Confidence. Lead The Room.
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            Founded in Dhaka, ROYMEN was born out of a desire to elevate Bangladeshi menswear and couture to international luxury standards. We reject disposable fast fashion, focusing instead on Italian Super 150s wools, pure Mulberry silks, and timeless monochromatic silhouettes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Uncompromising Quality</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Hand-embroidered zardozi and Italian leather detailing.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">100% Authentic Guarantee</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Directly sourced fabrics with official serial certification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
