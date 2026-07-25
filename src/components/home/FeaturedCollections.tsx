import React from 'react';
import { Collection, Category } from '../../types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FeaturedCollectionsProps {
  collections: Collection[];
  categories: Category[];
  onSelectCategory: (categorySlug: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  collections,
  categories,
  onSelectCategory
}) => {
  return (
    <section className="py-20 bg-zinc-950 text-white font-sans border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              ROYMEN Curated Series
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white uppercase mt-1">
              Featured Atelier Collections
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md">
            Architectural tailoring meeting Bangladesh heritage. Discover our flagship seasonal series designed for high-profile affairs.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCategory('mens-apparel')}
              className="group cursor-pointer relative h-[420px] rounded-3xl overflow-hidden border border-zinc-800 shadow-xl"
            >
              <img
                src={col.bannerImage}
                alt={col.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <span className="self-start bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase px-3 py-1 rounded-full backdrop-blur-md">
                  {col.itemCount} Items
                </span>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black font-serif text-white group-hover:text-amber-300 transition-colors uppercase">
                      {col.name}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2">{col.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Shortcuts */}
        <div className="pt-8 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="p-4 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl text-left transition-all hover:border-zinc-700 group"
            >
              <h4 className="text-xs font-bold text-white group-hover:text-amber-300 font-serif uppercase">
                {cat.name}
              </h4>
              <span className="text-[10px] text-zinc-500 mt-1 block">{cat.itemCount} Products</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
