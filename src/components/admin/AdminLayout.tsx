import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Tag,
  Users,
  Star,
  Ticket,
  Image as ImageIcon,
  BarChart3,
  Settings as SettingsIcon,
  FileSpreadsheet,
  Activity,
  ShieldCheck,
  LogOut,
  RefreshCcw,
  Bell,
  Search,
  ExternalLink
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCloseAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  onCloseAdmin,
  children
}) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest uppercase font-serif text-white">ROYMEN</span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-amber-400 font-sans -mt-1">ENTERPRISE ERP (20 SHEETS)</span>
          </div>

          <span className="hidden sm:inline bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-zinc-700">
            GOOGLE APPS SCRIPT REST API V3
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onTabChange('sheets-sync')}
            className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Google Sheets Sync</span>
          </button>

          <button
            onClick={onCloseAdmin}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Return To Storefront
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar Navigation */}
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-4 space-y-1.5 hidden md:block shrink-0 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            MASTER ENTERPRISE MODULES
          </div>

          <button
            onClick={() => onTabChange('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'overview' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview Dashboard
          </button>

          <button
            onClick={() => onTabChange('products')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'products' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> 03_Products Manager
          </button>

          <button
            onClick={() => onTabChange('orders')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'orders' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> 07_Orders & Courier ERP
          </button>

          <button
            onClick={() => onTabChange('coupons')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'coupons' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" /> 09_Coupons & Discounts
          </button>

          <button
            onClick={() => onTabChange('reviews')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'reviews' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" /> 10_Reviews Moderator
          </button>

          <button
            onClick={() => onTabChange('banners')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'banners' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> 11_Banners & Hero
          </button>

          <button
            onClick={() => onTabChange('users')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'users' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> 02_Users & Customers
          </button>

          <button
            onClick={() => onTabChange('analytics')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'analytics' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> 12_Analytics & Logs
          </button>

          <button
            onClick={() => onTabChange('settings')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'settings' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <SettingsIcon className="w-4 h-4" /> 01_Settings & MFS
          </button>

          <button
            onClick={() => onTabChange('sheets-sync')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'sheets-sync' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" /> Operations Center & GAS
          </button>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-zinc-950/80">
          {children}
        </main>
      </div>
    </div>
  );
};
