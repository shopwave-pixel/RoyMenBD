import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Users,
  Package,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { Order, Product } from '../../types';

interface DashboardOverviewProps {
  onNavigateToTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateToTab }) => {
  const summary = StorageService.getAnalyticsSummary();
  const recentOrders = StorageService.getOrders().slice(0, 5);
  const lowStockProducts = StorageService.getProducts().filter(p => p.stock <= p.lowStockAlert);

  return (
    <div className="space-y-6 sm:space-y-8 font-sans w-full max-w-full">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            ROYMEN Executive Control Center
          </span>
          <h1 className="text-3xl md:text-2xl font-black font-serif text-white mt-1">
            Real-Time Business KPI Overview
          </h1>
        </div>

        <button
          onClick={() => onNavigateToTab('sheets-sync')}
          className="self-start sm:self-auto min-h-[44px] bg-amber-500 hover:bg-amber-400 text-black font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Layers className="w-4 h-4" /> Export To Google Sheets (`Code.gs`)
        </button>
      </div>

      {/* KPI Cards Grid - Stack Vertically on Mobile (w-full) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
        
        {/* Today's Revenue */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <span>Today's Revenue</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">
            ৳{summary.todayRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs yesterday
          </div>
        </div>

        {/* Total Monthly Revenue */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <span>Monthly Revenue</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">
            ৳{summary.monthlyRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-400">
            Total Sales Logged in ERP
          </div>
        </div>

        {/* Pending Orders */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <span>Pending Orders</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-serif">
            {summary.pendingOrders} Orders
          </div>
          <div className="text-[11px] text-zinc-400">
            Awaiting Courier Dispatch
          </div>
        </div>

        {/* Inventory Total Value */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <span>Inventory Stock Value</span>
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">
            ৳{summary.inventoryValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-400">
            Across {summary.totalProducts} active SKUs
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm md:text-xs font-sans w-full">
        <div className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <span className="text-zinc-400 font-bold uppercase">Total Customers</span>
          <strong className="text-white text-base font-mono">{summary.totalCustomers}</strong>
        </div>

        <div className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <span className="text-zinc-400 font-bold uppercase">Completed Orders</span>
          <strong className="text-emerald-400 text-base font-mono">{summary.completedOrders}</strong>
        </div>

        <div className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <span className="text-zinc-400 font-bold uppercase">Low Stock SKUs</span>
          <strong className="text-amber-400 text-base font-mono">{summary.lowStockCount}</strong>
        </div>

        <div className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <span className="text-zinc-400 font-bold uppercase">Cancelled</span>
          <strong className="text-red-400 text-base font-mono">{summary.cancelledOrders}</strong>
        </div>
      </div>

      {/* Recent Orders & Low Stock Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full">
        
        {/* Recent Orders Section */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h3 className="text-xl md:text-lg font-bold uppercase tracking-wider text-white font-serif">
              Recent Customer Orders
            </h3>
            <button
              onClick={() => onNavigateToTab('orders')}
              className="text-xs text-amber-400 hover:underline font-bold min-h-[44px] flex items-center px-2"
            >
              View All Orders →
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Total (BDT)</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {recentOrders.map(ord => (
                  <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-amber-300">{ord.id}</td>
                    <td className="py-3 px-3 font-semibold text-white">{ord.customerName}</td>
                    <td className="py-3 px-3">
                      <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-zinc-300">
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white">৳{ord.total.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.orderStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-3">
            {recentOrders.map(ord => (
              <div key={ord.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-amber-300">{ord.id}</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                    ord.orderStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {ord.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="font-bold text-white">{ord.customerName}</span>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs font-bold text-zinc-300">{ord.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
                  <span className="text-zinc-400 text-xs">Total Amount:</span>
                  <span className="font-bold text-white font-mono text-base">৳{ord.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 text-amber-400 font-bold text-xl md:text-lg uppercase font-serif">
            <AlertTriangle className="w-5 h-5" /> Low Stock Alerts
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-zinc-500 py-6 text-center">All product stocks are healthy.</p>
            ) : (
              lowStockProducts.map(prod => (
                <div key={prod.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between text-sm">
                  <div>
                    <h4 className="font-bold text-white line-clamp-1">{prod.name}</h4>
                    <span className="text-xs text-zinc-500">SKU: {prod.sku}</span>
                  </div>
                  <span className="bg-red-950 text-red-300 border border-red-800 px-2.5 py-1 rounded-lg font-bold text-xs shrink-0">
                    {prod.stock} Left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
