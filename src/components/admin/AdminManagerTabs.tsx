import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Coupon, Review, Banner, User, Settings, AuditLog } from '../../types';
import { Tag, Star, Image as ImageIcon, Users, Settings as SettingsIcon, BarChart3, Plus, Trash2, Check, Shield } from 'lucide-react';

interface AdminManagerTabsProps {
  activeTab: string;
}

export const AdminManagerTabs: React.FC<AdminManagerTabsProps> = ({ activeTab }) => {
  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => StorageService.getCoupons());
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(10);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => StorageService.getReviews());

  // Banners State
  const [banners, setBanners] = useState<Banner[]>(() => StorageService.getBanners());

  // Users State
  const [users, setUsers] = useState<User[]>(() => StorageService.getUsers());

  // Settings State
  const [settings, setSettings] = useState<Settings>(() => StorageService.getSettings());

  // Audit Logs
  const auditLogs = StorageService.getAuditLogs();

  // Create New Coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newC: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      type: 'percentage',
      value: newCouponVal,
      minSpend: 2000,
      usageLimit: 100,
      usageCount: 0,
      expiryDate: '2026-12-31',
      status: 'active'
    };
    const updated = [...coupons, newC];
    setCoupons(updated);
    setNewCouponCode('');
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateSettings(settings);
    alert('Settings updated successfully in 01_Settings tab!');
  };

  if (activeTab === 'coupons') {
    return (
      <div className="space-y-6 font-sans text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 09_Coupons</span>
          <h1 className="text-2xl font-black font-serif text-white">Promotional Coupons & Discounts</h1>
        </div>

        {/* Create Form */}
        <form onSubmit={handleCreateCoupon} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-3 max-w-xl text-xs">
          <input
            type="text"
            required
            value={newCouponCode}
            onChange={e => setNewCouponCode(e.target.value)}
            placeholder="COUPON CODE (e.g. EID2026)"
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white uppercase font-bold"
          />
          <input
            type="number"
            required
            value={newCouponVal}
            onChange={e => setNewCouponVal(parseInt(e.target.value))}
            placeholder="Discount %"
            className="w-24 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
          />
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-black px-4 py-2 rounded-xl uppercase">
            Create
          </button>
        </form>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Min Spend</th>
                <th className="py-3 px-4">Usage</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {coupons.map(c => (
                <tr key={c.id}>
                  <td className="py-3 px-4 font-bold text-amber-300 font-mono">{c.code}</td>
                  <td className="py-3 px-4 font-bold text-white">{c.type === 'percentage' ? `${c.value}% OFF` : `৳${c.value}`}</td>
                  <td className="py-3 px-4">৳{c.minSpend.toLocaleString()}</td>
                  <td className="py-3 px-4">{c.usageCount} times</td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'reviews') {
    return (
      <div className="space-y-6 font-sans text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 10_Reviews</span>
          <h1 className="text-2xl font-black font-serif text-white">Product Review Moderation</h1>
        </div>

        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{r.customerName}</span>
                  <span className="text-amber-400 font-bold">★ {r.rating}</span>
                  {r.verifiedBuyer && <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold">Verified Buyer</span>}
                </div>
                <p className="text-zinc-300">{r.comment}</p>
                <span className="text-[10px] text-zinc-500">{r.date}</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded text-[10px] font-bold uppercase">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'banners') {
    return (
      <div className="space-y-6 font-sans text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 11_Banners</span>
          <h1 className="text-2xl font-black font-serif text-white">Homepage Banner & Hero Manager</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map(b => (
            <div key={b.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <img src={b.imageUrl} alt="" referrerPolicy="no-referrer" className="w-full h-40 object-cover" />
              <div className="p-4 space-y-2 text-xs">
                <h3 className="font-serif font-black text-white text-base">{b.title}</h3>
                <p className="text-zinc-400">{b.subtitle}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-amber-400 font-bold uppercase text-[10px]">{b.position} slider</span>
                  <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{b.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'users') {
    return (
      <div className="space-y-6 font-sans text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 02_Users</span>
          <h1 className="text-2xl font-black font-serif text-white">Registered Clients & Admin Staff</h1>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{u.phone || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-6 font-sans text-white max-w-3xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 01_Settings</span>
          <h1 className="text-2xl font-black font-serif text-white">Store Settings & MFS Payment Credentials</h1>
        </div>

        <form onSubmit={handleSaveSettings} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Brand Name</label>
              <input type="text" value={settings.brandName} onChange={e => setSettings({ ...settings, brandName: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white" />
            </div>

            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Tagline</label>
              <input type="text" value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">bKash Merchant Number</label>
              <input type="text" value={settings.bkashMerchantNumber} onChange={e => setSettings({ ...settings, bkashMerchantNumber: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>

            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Nagad Merchant Number</label>
              <input type="text" value={settings.nagadMerchantNumber} onChange={e => setSettings({ ...settings, nagadMerchantNumber: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Delivery Charge Inside Dhaka (BDT)</label>
              <input type="number" value={settings.deliveryInsideDhaka} onChange={e => setSettings({ ...settings, deliveryInsideDhaka: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>

            <div>
              <label className="text-zinc-400 font-bold uppercase block mb-1">Delivery Charge Outside Dhaka (BDT)</label>
              <input type="number" value={settings.deliveryOutsideDhaka} onChange={e => setSettings({ ...settings, deliveryOutsideDhaka: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>
          </div>

          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl uppercase tracking-wider text-xs">
            Save Settings To Sheet 01
          </button>
        </form>
      </div>
    );
  }

  // Analytics & Audit Logs
  return (
    <div className="space-y-6 font-sans text-white">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 12_Analytics & 19_Audit_Log</span>
        <h1 className="text-2xl font-black font-serif text-white">Audit Trail & Security Logs</h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif font-bold text-amber-300 text-sm uppercase">Audit Trail Activity</h3>
        <div className="space-y-2 font-mono text-xs max-h-80 overflow-y-auto">
          {auditLogs.map(log => (
            <div key={log.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-center text-zinc-300">
              <div>
                <span className="text-amber-400 font-bold">[{log.module}]</span> <span className="text-white font-bold">{log.action}:</span> {log.details}
              </div>
              <span className="text-[10px] text-zinc-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
