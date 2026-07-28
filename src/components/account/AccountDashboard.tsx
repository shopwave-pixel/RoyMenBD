import React, { useState } from 'react';
import { User, Order } from '../../types';
import { StorageService } from '../../services/storageService';
import { Package, MapPin, User as UserIcon, LogOut, Truck, CheckCircle2, Clock, ChevronRight, Shield, FileText } from 'lucide-react';
import { InvoiceView } from '../common/InvoiceView';

interface AccountDashboardProps {
  currentUser: User;
  onLogout: () => void;
  onOpenShop: () => void;
  onOpenAdmin?: () => void;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({ currentUser, onLogout, onOpenShop, onOpenAdmin }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [userOrders] = useState<Order[]>(() => {
    return StorageService.getOrders().filter(o => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase());
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(userOrders[0] || null);

  const isAdmin = currentUser.role === 'admin' || currentUser.role === 'super_admin' || (currentUser.role as string).toLowerCase().includes('admin');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white font-sans">
      
      {/* Header Profile Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 text-black font-black text-2xl rounded-2xl flex items-center justify-center font-serif shadow-xl">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              {isAdmin ? 'ROYMEN EXECUTIVE ADMIN' : 'ROYMEN VIP CLIENT'}
            </span>
            <h1 className="text-2xl font-black text-white font-serif">{currentUser.name}</h1>
            <p className="text-xs text-zinc-400 mt-0.5">{currentUser.email} • {currentUser.phone || 'No phone set'}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2.5 bg-zinc-900 hover:bg-red-950/40 text-zinc-300 hover:text-red-400 rounded-xl text-xs font-bold border border-zinc-800 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Main Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="w-full text-left px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between border bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black border-amber-300 shadow-xl hover:brightness-110 mb-3 cursor-pointer"
            >
              <span className="flex items-center gap-2.5 font-extrabold text-black">
                <Shield className="w-4 h-4 text-black" /> Admin Dashboard
              </span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          )}

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between border ${
              activeTab === 'orders' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <span className="flex items-center gap-2.5"><Package className="w-4 h-4" /> Order History ({userOrders.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between border ${
              activeTab === 'profile' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <span className="flex items-center gap-2.5"><UserIcon className="w-4 h-4" /> Client Profile</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between border ${
              activeTab === 'addresses' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4" /> Saved Address Book</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-9">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {userOrders.length === 0 ? (
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
                  <Package className="w-12 h-12 text-zinc-600 mx-auto" />
                  <h3 className="text-sm font-bold uppercase text-zinc-300">No Orders Found</h3>
                  <p className="text-xs text-zinc-500">You haven't placed any orders yet. Discover our latest collections.</p>
                  <button
                    onClick={onOpenShop}
                    className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Order List */}
                  <div className="md:col-span-5 space-y-3">
                    {userOrders.map((ord) => (
                      <div
                        key={ord.id}
                        onClick={() => setSelectedOrder(ord)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          selectedOrder?.id === ord.id
                            ? 'bg-zinc-900 border-amber-400/80 shadow-lg'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono font-bold text-amber-300">{ord.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ord.orderStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </div>
                        <div className="text-xs font-serif font-black text-white mt-2">
                          ৳{ord.total.toLocaleString()} • {ord.items.length} item(s)
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-1">
                          {new Date(ord.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Live Tracker Details */}
                  {selectedOrder && (
                    <div className="md:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-6">
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-zinc-400">Order Tracker</span>
                          <h3 className="text-lg font-mono font-bold text-amber-300">{selectedOrder.id}</h3>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                          {selectedOrder.courierPartner || 'Pathao Express'} ({selectedOrder.trackingNumber || 'Tracking Generated'})
                        </span>
                      </div>

                      {/* Timeline Steps */}
                      <div className="space-y-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold">✓</div>
                          <div>
                            <p className="font-bold text-white">Order Received & Logged in Sheet</p>
                            <p className="text-[11px] text-zinc-500">Verified payment method: {selectedOrder.paymentMethod}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            selectedOrder.orderStatus !== 'pending' ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {selectedOrder.orderStatus !== 'pending' ? '✓' : '2'}
                          </div>
                          <div>
                            <p className="font-bold text-white">Atelier Quality Inspection</p>
                            <p className="text-[11px] text-zinc-500">Hand-checked and packaged in Gulshan, Dhaka.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            selectedOrder.orderStatus === 'shipped' || selectedOrder.orderStatus === 'delivered' ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            <Truck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-white">Handed to Express Courier</p>
                            <p className="text-[11px] text-zinc-500">Courier Tracking #: {selectedOrder.trackingNumber || 'PTH-BD-8849201'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Complete Official Invoice */}
                      <div className="pt-4 border-t border-zinc-800">
                        <InvoiceView order={selectedOrder} onPrint={() => window.print()} onClose={() => setSelectedOrder(null)} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase text-white font-serif border-b border-zinc-800 pb-3">Client Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-zinc-500 uppercase font-bold block mb-1">Full Name</label>
                  <input type="text" readOnly value={currentUser.name} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white" />
                </div>
                <div>
                  <label className="text-zinc-500 uppercase font-bold block mb-1">Email Address</label>
                  <input type="text" readOnly value={currentUser.email} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase text-white font-serif border-b border-zinc-800 pb-3">Address Book</h3>
              <p className="text-xs text-zinc-400">Default delivery address saved for 1-click Express Checkout in Bangladesh.</p>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs space-y-1">
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded">Default Address</span>
                <p className="font-bold text-white mt-1">{currentUser.name}</p>
                <p className="text-zinc-400">{currentUser.addresses[0]?.addressLine || 'House 42, Road 11, Banani, Dhaka-1213'}</p>
                <p className="text-zinc-400">District: {currentUser.addresses[0]?.district || 'Dhaka'}, Bangladesh</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
