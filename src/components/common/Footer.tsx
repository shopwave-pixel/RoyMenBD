import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      StorageService.subscribeNewsletter(newsletterEmail.trim());
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 pt-16 pb-12 font-sans">
      {/* Trust Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-900 rounded-xl text-amber-400 border border-zinc-800">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Express Dispatch</h4>
            <p className="text-xs text-zinc-400 mt-1">24-48 hr delivery across Dhaka & Bangladesh via Pathao / Steadfast.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-900 rounded-xl text-amber-400 border border-zinc-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Master Craftsmanship</h4>
            <p className="text-xs text-zinc-400 mt-1">Italian fabrics, Mulberry silks, and bespoke tailoring quality.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-900 rounded-xl text-amber-400 border border-zinc-800">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">7-Day Easy Exchange</h4>
            <p className="text-xs text-zinc-400 mt-1">Hassle-free size and product replacement guarantee.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-900 rounded-xl text-amber-400 border border-zinc-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Secure BD Checkout</h4>
            <p className="text-xs text-zinc-400 mt-1">Cash on Delivery, bKash, Nagad, and SSLCommerz verified.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-[0.25em] text-white uppercase font-serif">
              ROYMEN
            </span>
            <span className="text-xs tracking-[0.4em] uppercase text-amber-400 font-sans font-medium mt-0.5">
              Wear Confidence.
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
            ROYMEN is Bangladesh’s premier luxury fashion atelier. Combining heritage craftsmanship with monochromatic minimalism to deliver refined apparel for those who lead with confidence.
          </p>

          <div className="pt-2 space-y-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Gulshan Atelier: Level 4, Gulshan Avenue, Dhaka-1212, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hotline: +880 1700-998877 (10 AM - 10 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: concierge@roymen.com.bd</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Collections</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#mens" className="hover:text-white transition-colors">Men's Formal Suits</a></li>
            <li><a href="#ethnic" className="hover:text-amber-300 transition-colors text-amber-200 font-medium">Royal Heritage Panjabi</a></li>
            <li><a href="#blazers" className="hover:text-white transition-colors">Outerwear & Blazers</a></li>
            <li><a href="#women" className="hover:text-white transition-colors">Atelier Women Couture</a></li>
            <li><a href="#accessories" className="hover:text-white transition-colors">Italian Leather Belts</a></li>
            <li><a href="#winter" className="hover:text-white transition-colors">Winter Atelier '26</a></li>
          </ul>
        </div>

        {/* Client Care */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Client Concierge</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#tracking" className="hover:text-white transition-colors">Track Your Order</a></li>
            <li><a href="#size-guide" className="hover:text-white transition-colors">ROYMEN Size Guide</a></li>
            <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery Rates</a></li>
            <li><a href="#returns" className="hover:text-white transition-colors">7-Day Return Policy</a></li>
            <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Terms</a></li>
            <li><a href="#admin" className="hover:text-amber-400 font-semibold transition-colors">Enterprise Admin Portal</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">The Atelier Newsletter</h4>
          <p className="text-xs text-zinc-400 mb-3">
            Subscribe to receive private invitations to new collection drops & VIP trunk shows.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3 bg-zinc-900 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-medium">
              ✓ Welcome to ROYMEN Insider Access.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-white text-black px-3 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 flex items-center gap-2">
            <span className="text-[11px] font-bold text-zinc-300">Country:</span>
            <span className="bg-zinc-900 px-2 py-1 rounded text-[11px] font-semibold text-white border border-zinc-800 flex items-center gap-1.5">
              <span>🇧🇩 Bangladesh</span>
            </span>
          </div>
        </div>
      </div>

      {/* Payment Partners & Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          © {new Date().getFullYear()} ROYMEN Enterprise. All rights reserved. Registered Trademark in Bangladesh.
        </div>

        {/* Payment Partner Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-zinc-900 text-pink-400 px-2.5 py-1 rounded text-[10px] font-black border border-zinc-800 uppercase tracking-wide">
            bKash
          </span>
          <span className="bg-zinc-900 text-orange-400 px-2.5 py-1 rounded text-[10px] font-black border border-zinc-800 uppercase tracking-wide">
            Nagad
          </span>
          <span className="bg-zinc-900 text-blue-400 px-2.5 py-1 rounded text-[10px] font-black border border-zinc-800 uppercase tracking-wide">
            SSLCommerz
          </span>
          <span className="bg-zinc-900 text-emerald-400 px-2.5 py-1 rounded text-[10px] font-black border border-zinc-800 uppercase tracking-wide">
            Cash On Delivery
          </span>
        </div>
      </div>
    </footer>
  );
};
