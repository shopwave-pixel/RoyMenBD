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
  ExternalLink,
  MoreVertical,
  X,
  CreditCard,
  Receipt,
  TrendingUp,
  Store,
  User,
  Menu
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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Admin Top Navigation */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest uppercase font-serif text-white">ROYMEN</span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-400 font-sans -mt-1">ENTERPRISE ERP (20 SHEETS)</span>
            </div>

            <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-zinc-700">
              GOOGLE APPS SCRIPT REST API V3
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onTabChange('sheets-sync')}
              className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Google Sheets Sync</span>
            </button>

            <button
              onClick={onCloseAdmin}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Return To Storefront
            </button>
          </div>
        </div>

        {/* Mobile Top Bar (Screens < 768px): Row 1 - ROYMEN Logo, Notification, More (⋮) */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 min-h-[52px]">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest uppercase font-serif text-white">ROYMEN</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400 font-sans -mt-1">ENTERPRISE ERP</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('ROYMEN Enterprise Alerts: 20 Google Sheets active & synced.')}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl border border-zinc-700 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-amber-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full" />
            </button>

            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
              aria-label="More Menu"
            >
              {isMoreMenuOpen ? <X className="w-6 h-6" /> : <MoreVertical className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Down More Menu for Mobile */}
      {isMoreMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[53px] bottom-[60px] bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-800 z-50 overflow-y-auto p-4 space-y-2 font-sans animate-in slide-in-from-top duration-200">
          <div className="text-xs font-black uppercase tracking-widest text-amber-400 px-3 py-1 border-b border-zinc-800 mb-2 flex items-center justify-between">
            <span>ERP NAVIGATION MENU</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">13 MODULES</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => { onTabChange('overview'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'overview' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 text-amber-400 shrink-0" /> 🏠 Dashboard
            </button>

            <button
              onClick={() => { onTabChange('orders'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'orders' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <Layers className="w-5 h-5 text-amber-400 shrink-0" /> 📦 Orders
            </button>

            <button
              onClick={() => { onTabChange('products'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'products' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <ShoppingBag className="w-5 h-5 text-amber-400 shrink-0" /> 👕 Products
            </button>

            <button
              onClick={() => { onTabChange('users'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'users' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <Users className="w-5 h-5 text-amber-400 shrink-0" /> 👥 Customers
            </button>

            <button
              onClick={() => { onTabChange('settings'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'settings' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <CreditCard className="w-5 h-5 text-amber-400 shrink-0" /> 💳 Payments
            </button>

            <button
              onClick={() => { onTabChange('orders'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'orders' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <Receipt className="w-5 h-5 text-amber-400 shrink-0" /> 🧾 Invoices
            </button>

            <button
              onClick={() => { onTabChange('analytics'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'analytics' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <BarChart3 className="w-5 h-5 text-amber-400 shrink-0" /> 📊 Reports
            </button>

            <button
              onClick={() => { onTabChange('analytics'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'analytics' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <TrendingUp className="w-5 h-5 text-amber-400 shrink-0" /> 📈 Analytics
            </button>

            <button
              onClick={() => { onTabChange('sheets-sync'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'sheets-sync' ? 'bg-amber-500 text-black font-black' : 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-400 shrink-0" /> 📤 Export to Google Sheets
            </button>

            <button
              onClick={() => { onTabChange('settings'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'settings' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <SettingsIcon className="w-5 h-5 text-amber-400 shrink-0" /> ⚙ Settings
            </button>

            <button
              onClick={() => { onCloseAdmin(); setIsMoreMenuOpen(false); }}
              className="min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 bg-zinc-900/90 text-zinc-200 border border-zinc-700 hover:bg-zinc-800"
            >
              <Store className="w-5 h-5 text-amber-400 shrink-0" /> 🏪 Return to Storefront
            </button>

            <button
              onClick={() => { onTabChange('users'); setIsMoreMenuOpen(false); }}
              className={`min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                activeTab === 'users' ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900/90 text-white hover:bg-zinc-800'
              }`}
            >
              <User className="w-5 h-5 text-amber-400 shrink-0" /> 👤 Profile
            </button>

            <button
              onClick={() => { onCloseAdmin(); setIsMoreMenuOpen(false); }}
              className="min-h-[44px] w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-3 bg-red-950/80 text-red-300 border border-red-800/60 hover:bg-red-900"
            >
              <LogOut className="w-5 h-5 text-red-400 shrink-0" /> 🚪 Logout
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Admin Sidebar Navigation for Desktop */}
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
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto bg-zinc-950/80 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Sticky Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 border-t border-zinc-800 py-1 px-2 flex justify-around items-center backdrop-blur-md shadow-2xl">
        <button
          onClick={() => { onTabChange('overview'); setIsMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors ${
            activeTab === 'overview' && !isMoreMenuOpen ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Dashboard</span>
        </button>

        <button
          onClick={() => { onTabChange('orders'); setIsMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors ${
            activeTab === 'orders' && !isMoreMenuOpen ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Orders</span>
        </button>

        <button
          onClick={() => { onTabChange('products'); setIsMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors ${
            activeTab === 'products' && !isMoreMenuOpen ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Products</span>
        </button>

        <button
          onClick={() => { onTabChange('analytics'); setIsMoreMenuOpen(false); }}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors ${
            activeTab === 'analytics' && !isMoreMenuOpen ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Reports</span>
        </button>

        <button
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors ${
            isMoreMenuOpen ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">More</span>
        </button>
      </nav>
    </div>
  );
};

