import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import { CartItem, Coupon } from '../../types';
import { StorageService } from '../../services/storageService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null, discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Calculate Coupon Discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const deliveryFee = subtotal > freeShippingThreshold ? 0 : 80;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (!couponInput.trim()) return;

    const res = StorageService.validateCoupon(couponInput, subtotal);
    if (res.valid && res.coupon) {
      onApplyCoupon(res.coupon, res.discount);
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null, 0);
    setCouponSuccess('');
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold uppercase tracking-wider font-serif">Shopping Bag</h3>
              <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full font-bold text-zinc-300">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-zinc-900 px-5 py-3 border-b border-zinc-800 text-xs">
            <div className="flex items-center justify-between font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-4 h-4 text-amber-400" /> Free Shipping in BD:
              </span>
              {remainingForFreeShipping > 0 ? (
                <span className="text-amber-400 font-bold">Add ৳{remainingForFreeShipping.toLocaleString()} more</span>
              ) : (
                <span className="text-emerald-400 font-bold">✓ Unlocked!</span>
              )}
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-900">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Your bag is empty</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore our luxury formal suites, royal Panjabis, and winter atelier collections.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-24 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white line-clamp-1 font-serif">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-zinc-400 mt-0.5 space-x-2">
                        <span>Color: <strong className="text-zinc-200">{item.selectedColor.name}</strong></span>
                        <span>Size: <strong className="text-zinc-200">{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-800 rounded text-zinc-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-800 rounded text-zinc-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-900/60 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" /> Code '{appliedCoupon.code}' Applied (-৳{discountAmount.toLocaleString()})
                    </span>
                    <button onClick={handleRemoveCoupon} className="text-zinc-400 hover:text-white underline text-[11px]">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. ROYMEN10)"
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase rounded-xl border border-zinc-700"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && <p className="text-[11px] text-red-400 mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-400 mt-1">{couponSuccess}</p>}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-zinc-200">৳{subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400 font-medium">
                    <span>Coupon Discount</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Express Delivery</span>
                  <span className="text-zinc-200">{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-black text-white">
                  <span>Grand Total</span>
                  <span className="text-amber-400 font-serif text-base">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-white hover:bg-amber-400 text-black font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs transition-all"
              >
                <span>Proceed To Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-zinc-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Secure Checkout via bKash, Nagad, SSLCommerz & COD
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
