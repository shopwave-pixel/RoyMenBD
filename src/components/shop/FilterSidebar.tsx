import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { Category, Brand, Collection } from '../../types';

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  collections: Collection[];
  selectedCategory: string;
  onSelectCategory: (catSlug: string) => void;
  selectedBrand: string;
  onSelectBrand: (brandName: string) => void;
  selectedCollection: string;
  onSelectCollection: (colName: string) => void;
  priceRange: [number, number];
  onChangePriceRange: (range: [number, number]) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  sortBy: string;
  onChangeSortBy: (sort: string) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  collections,
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedCollection,
  onSelectCollection,
  priceRange,
  onChangePriceRange,
  selectedSize,
  onSelectSize,
  sortBy,
  onChangeSortBy,
  onResetFilters
}) => {
  const sizesList = ['38R', '40R', '42R', '44R', 'S', 'M', 'L', 'XL', 'XXL', '39', '40', '41', '42'];

  return (
    <aside className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-white space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest font-serif">Refine Catalog</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Sort By Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Sort By</label>
        <select
          value={sortBy}
          onChange={e => onChangeSortBy(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular & Top Rated</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Categories</label>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => onSelectCategory('')}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
              selectedCategory === '' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'hover:bg-zinc-900 text-zinc-400'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === '' && <Check className="w-3.5 h-3.5" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              <span>{cat.name}</span>
              {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2 pt-4 border-t border-zinc-900">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Brands</label>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => onSelectBrand('')}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
              selectedBrand === '' ? 'bg-zinc-800 font-bold text-white' : 'hover:bg-zinc-900 text-zinc-400'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => onSelectBrand(b.name)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                selectedBrand === b.name ? 'bg-zinc-800 font-bold text-amber-300' : 'hover:bg-zinc-900 text-zinc-400'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider in BDT */}
      <div className="space-y-3 pt-4 border-t border-zinc-900">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold uppercase tracking-wider text-zinc-400">Max Price (BDT)</label>
          <span className="font-bold text-amber-400">৳{priceRange[1].toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="30000"
          step="500"
          value={priceRange[1]}
          onChange={e => onChangePriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-amber-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
          <span>৳1,000</span>
          <span>৳30,000</span>
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2 pt-4 border-t border-zinc-900">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Filter By Size</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectSize('')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
              selectedSize === '' ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            ANY
          </button>
          {sizesList.map((sz) => (
            <button
              key={sz}
              onClick={() => onSelectSize(sz)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border uppercase transition-colors ${
                selectedSize === sz ? 'bg-amber-500 text-black border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
