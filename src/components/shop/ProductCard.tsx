import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product, ProductColor } from '../../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Black', hex: '#000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const mainImage = product.images[currentImgIndex] || product.images[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop';
  const hoverImage = product.images[1] || mainImage;

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col relative"
    >
      {/* Image Container with Hover Swap */}
      <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" /> ATELIER
            </span>
          )}
          {hasDiscount && (
            <span className="bg-white text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.stock <= product.lowStockAlert && product.stock > 0 && (
            <span className="bg-red-900/90 text-red-200 border border-red-700/50 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full backdrop-blur-sm">
              ONLY {product.stock} LEFT
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 border ${
            isWishlisted
              ? 'bg-amber-500 text-black border-amber-400 shadow-lg scale-110'
              : 'bg-zinc-950/60 text-white border-zinc-700/60 hover:bg-zinc-900'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4" /> Quick View
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="uppercase tracking-widest font-semibold text-amber-400/90">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-200">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors font-serif">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.shortDescription || product.category}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === c.name ? 'ring-2 ring-white scale-125 border-zinc-900' : 'border-zinc-700 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-white tracking-tight">
                ৳{(product.discountPrice || product.price).toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs text-zinc-500 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
              addedAnimation
                ? 'bg-emerald-500 text-black scale-105'
                : 'bg-white hover:bg-amber-400 text-black'
            }`}
            title="Add to Cart"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
