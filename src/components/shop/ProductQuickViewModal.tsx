import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, Check, ShieldCheck, Truck, Ruler } from 'lucide-react';
import { Product, ProductColor } from '../../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onBuyNow: (product: Product, color: ProductColor, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSizeGuide: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Black', hex: '#000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);

  const mainImg = product.images[activeImg] || product.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 relative">
              <img
                src={mainImg}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border shrink-0 transition-all ${
                      activeImg === idx ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">{product.brand}</span>
                <span className="text-xs text-zinc-400">SKU: {product.sku}</span>
              </div>

              <h2 className="text-2xl font-black text-white font-serif mt-1">{product.name}</h2>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-sm text-white">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-zinc-400">({product.reviewCount} verified reviews)</span>
                <span className="text-zinc-700">|</span>
                <span className="text-xs text-emerald-400 font-semibold">In Stock ({product.stock} units)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">
                  ৳{(product.discountPrice || product.price).toLocaleString()}
                </span>
                {product.discountPrice && (
                  <span className="text-sm text-zinc-500 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-300 mt-4 leading-relaxed border-t border-zinc-800 pt-4">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Select Color: <span className="text-white font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                        selectedColor.name === c.name
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-zinc-700" style={{ backgroundColor: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Select Size:
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-10 rounded-xl text-xs font-bold uppercase border transition-all flex items-center justify-center ${
                        selectedSize === s
                          ? 'bg-white text-black border-white shadow-lg'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-2xl border border-zinc-700 flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Bag
                </button>

                <button
                  onClick={() => {
                    onBuyNow(product, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-black py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-wider"
                >
                  Express Buy Now
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    isWishlisted ? 'bg-amber-500 text-black border-amber-400' : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-black' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-around text-[11px] text-zinc-400 pt-2">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-amber-400" /> Express Delivery in BD</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 100% Authentic Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
