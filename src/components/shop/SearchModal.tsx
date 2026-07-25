import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const results = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [query, products]);

  if (!isOpen) return null;

  const popularKeywords = ['Tuxedo', 'Raw Silk Panjabi', 'Cashmere Coat', 'Oxford Shirt', 'Leather Belt', 'Women Couture'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Search Header */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search suits, royal panjabis, cashmere, shirts..."
            autoFocus
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-sans"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Trending Keywords if empty query */}
        {!query.trim() && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <TrendingUp className="w-4 h-4" /> Trending Searches in ROYMEN Atelier
            </div>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs text-zinc-300 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
            <p className="text-xs text-zinc-400 font-medium">
              Found <strong className="text-white">{filtered.length}</strong> matching luxury items for "{query}"
            </p>

            {filtered.length === 0 ? (
              <div className="py-10 text-center text-zinc-500 text-xs">
                No items match your query. Try searching for "Suit", "Panjabi", or "Shirt".
              </div>
            ) : (
              filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="p-3 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover rounded-xl border border-zinc-800"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                        {prod.brand}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors font-serif">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-black text-white mt-0.5 block">
                        ৳{(prod.discountPrice || prod.price).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
