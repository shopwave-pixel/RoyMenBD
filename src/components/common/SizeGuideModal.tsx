import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category = 'default' }) => {
  const [tab, setTab] = useState<'panjabi' | 'suit' | 'shirt'>('panjabi');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 text-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-400">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif uppercase tracking-wider">ROYMEN Size & Fit Guide</h3>
            <p className="text-xs text-zinc-400">Measurements in inches. Tailored to Bangladeshi fit standards.</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-zinc-800 mb-6 pb-2">
          <button
            onClick={() => setTab('panjabi')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
              tab === 'panjabi' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            Royal Panjabi
          </button>
          <button
            onClick={() => setTab('suit')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
              tab === 'suit' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            Suits & Blazers
          </button>
          <button
            onClick={() => setTab('shirt')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
              tab === 'shirt' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            Oxford Shirts
          </button>
        </div>

        {/* Panjabi Size Table */}
        {tab === 'panjabi' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-300 border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 text-amber-300 uppercase tracking-wider">
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest (Inches)</th>
                  <th className="py-3 px-4">Length (Inches)</th>
                  <th className="py-3 px-4">Sleeve (Inches)</th>
                  <th className="py-3 px-4">Collar (Inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">M (38)</td>
                  <td className="py-3 px-4">40"</td>
                  <td className="py-3 px-4">40"</td>
                  <td className="py-3 px-4">24.5"</td>
                  <td className="py-3 px-4">15.5"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">L (40)</td>
                  <td className="py-3 px-4">42"</td>
                  <td className="py-3 px-4">42"</td>
                  <td className="py-3 px-4">25.0"</td>
                  <td className="py-3 px-4">16.0"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">XL (42)</td>
                  <td className="py-3 px-4">44"</td>
                  <td className="py-3 px-4">44"</td>
                  <td className="py-3 px-4">25.5"</td>
                  <td className="py-3 px-4">16.5"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">XXL (44)</td>
                  <td className="py-3 px-4">46"</td>
                  <td className="py-3 px-4">45"</td>
                  <td className="py-3 px-4">26.0"</td>
                  <td className="py-3 px-4">17.0"</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Suit Size Table */}
        {tab === 'suit' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-300 border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 text-amber-300 uppercase tracking-wider">
                  <th className="py-3 px-4">Jacket Size</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Shoulder</th>
                  <th className="py-3 px-4">Jacket Length</th>
                  <th className="py-3 px-4">Waist (Matching Pants)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">38R</td>
                  <td className="py-3 px-4">38"-39"</td>
                  <td className="py-3 px-4">17.5"</td>
                  <td className="py-3 px-4">29.5"</td>
                  <td className="py-3 px-4">32"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">40R</td>
                  <td className="py-3 px-4">40"-41"</td>
                  <td className="py-3 px-4">18.0"</td>
                  <td className="py-3 px-4">30.0"</td>
                  <td className="py-3 px-4">34"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">42R</td>
                  <td className="py-3 px-4">42"-43"</td>
                  <td className="py-3 px-4">18.5"</td>
                  <td className="py-3 px-4">30.5"</td>
                  <td className="py-3 px-4">36"</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Shirt Size Table */}
        {tab === 'shirt' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-300 border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 text-amber-300 uppercase tracking-wider">
                  <th className="py-3 px-4">Collar Size</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Shoulder</th>
                  <th className="py-3 px-4">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">39 (Slim)</td>
                  <td className="py-3 px-4">39"</td>
                  <td className="py-3 px-4">17.0"</td>
                  <td className="py-3 px-4">28.5"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">40 (Regular)</td>
                  <td className="py-3 px-4">41"</td>
                  <td className="py-3 px-4">17.5"</td>
                  <td className="py-3 px-4">29.0"</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">42 (Comfort)</td>
                  <td className="py-3 px-4">44"</td>
                  <td className="py-3 px-4">18.5"</td>
                  <td className="py-3 px-4">30.0"</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zinc-900 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Need custom alterations? Visit our Gulshan Atelier or call our master tailor at +880 1700-998877.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
