import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Phone,
  Sparkles
} from 'lucide-react';
import { User, CartItem, WishlistItem } from '../../types';

interface HeaderProps {
  currentUser: User | null;
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onNavigate: (view: string, param?: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  cartItems,
  wishlistItems,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAuth,
  onNavigate,
  currentView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency] = useState('BDT (৳)');

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800">
      {/* Announcement Top Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800/80 px-4 py-1.5 text-xs text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-semibold uppercase px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> EID & WINTER ATELIER '26
            </span>
            <span className="hidden sm:inline text-zinc-400">|</span>
            <span>FREE EXPRESS DELIVERY ON ORDERS OVER ৳5,000 IN BANGLADESH</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-zinc-500" /> Hot Line: +880 1700-998877
            </span>
            <span className="text-zinc-700">|</span>
            <span className="font-semibold text-zinc-200">{currency}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Tagline */}
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer group flex flex-col items-start select-none"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-white group-hover:text-zinc-200 transition-colors uppercase font-serif">
              ROYMEN
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 font-sans font-medium -mt-1 group-hover:text-amber-400 transition-colors">
              Wear Confidence.
            </span>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-white transition-colors relative py-1 ${
                currentView === 'home' ? 'text-white font-bold' : ''
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-white transition-colors relative py-1 ${
                currentView === 'shop' ? 'text-white font-bold' : ''
              }`}
            >
              Shop All
              {currentView === 'shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('category', 'ethnic-panjabi')}
              className="hover:text-amber-300 transition-colors text-amber-200 flex items-center gap-1"
            >
              Royal Panjabi
            </button>

            <button
              onClick={() => onNavigate('category', 'mens-apparel')}
              className="hover:text-white transition-colors"
            >
              Men's Formal
            </button>

            <button
              onClick={() => onNavigate('category', 'outerwear-blazers')}
              className="hover:text-white transition-colors"
            >
              Outerwear
            </button>

            <button
              onClick={() => onNavigate('category', 'womens-couture')}
              className="hover:text-white transition-colors"
            >
              Women Couture
            </button>

            <button
              onClick={() => onNavigate('brand-story')}
              className="hover:text-white transition-colors"
            >
              Atelier Story
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Instant Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative group"
              title="Search products..."
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors relative border border-zinc-700 flex items-center justify-center"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-zinc-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / User Button */}
            <button
              onClick={currentUser ? () => onNavigate('account') : onOpenAuth}
              className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium transition-colors"
            >
              <UserIcon className="w-4 h-4 text-zinc-300" />
              <span className="hidden sm:inline max-w-[90px] truncate text-zinc-200">
                {currentUser ? currentUser.name : 'Account'}
              </span>
            </button>

            {/* Admin Portal Toggle Button */}
            <button
              onClick={() => onNavigate('admin')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all border border-amber-400/30"
              title="Open Enterprise Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 font-semibold text-sm uppercase tracking-widest text-zinc-300">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 hover:text-white"
            >
              Shop All
            </button>
            <button
              onClick={() => { onNavigate('category', 'ethnic-panjabi'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 text-amber-300 font-bold"
            >
              Royal Panjabi Series
            </button>
            <button
              onClick={() => { onNavigate('category', 'mens-apparel'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 hover:text-white"
            >
              Men's Formal
            </button>
            <button
              onClick={() => { onNavigate('category', 'outerwear-blazers'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 hover:text-white"
            >
              Outerwear & Blazers
            </button>
            <button
              onClick={() => { onNavigate('category', 'womens-couture'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 hover:text-white"
            >
              Women's Couture
            </button>
            <button
              onClick={() => { onNavigate('brand-story'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-zinc-900 hover:text-white"
            >
              Brand Story
            </button>

            <button
              onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-amber-400 font-bold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Portal & Google Sheets Sync
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
