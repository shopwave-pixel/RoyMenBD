import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Order, OrderStatus, CourierPartner } from '../../types';
import { Truck, Printer, Eye, CheckCircle2, Clock, Search } from 'lucide-react';

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleUpdateStatus = (
    orderId: string,
    status: OrderStatus,
    courier?: CourierPartner,
    trackingNum?: string
  ) => {
    StorageService.updateOrderStatus(orderId, status, courier, trackingNum);
    setOrders(StorageService.getOrders());
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(StorageService.getOrderById(orderId) || null);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'all') return true;
    return o.orderStatus === filterStatus;
  });

  return (
    <div className="space-y-6 font-sans text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 07_Orders & 08_Order_Items</span>
          <h1 className="text-2xl font-black font-serif text-white">Order Dispatch & Courier Management</h1>
        </div>

        {/* Filter Status */}
        <div className="flex gap-2">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors ${
                filterStatus === s ? 'bg-amber-500 text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total (BDT)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Courier Partner</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">{ord.id}</td>
                  <td className="py-3 px-4 font-semibold text-white">{ord.customerName}</td>
                  <td className="py-3 px-4">{ord.shippingAddress?.district || 'Dhaka'}</td>
                  <td className="py-3 px-4">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-bold text-zinc-200">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">৳{ord.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={ord.orderStatus}
                      onChange={e => handleUpdateStatus(ord.id, e.target.value as OrderStatus, ord.courierPartner, ord.trackingNumber)}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-amber-300 font-bold uppercase focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={ord.courierPartner || 'Pathao'}
                      onChange={e => handleUpdateStatus(ord.id, ord.orderStatus, e.target.value as CourierPartner, ord.trackingNumber || `PTH-BD-${Math.floor(100000 + Math.random() * 900000)}`)}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold focus:outline-none"
                    >
                      <option value="Pathao">Pathao Express</option>
                      <option value="Steadfast">Steadfast Courier</option>
                      <option value="RedX">RedX Logistics</option>
                      <option value="Paperfly">Paperfly</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400">ROYMEN Invoice Spec</span>
                <h3 className="text-xl font-mono font-bold text-white">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
              <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress?.addressLine}, {selectedOrder.shippingAddress?.district}</p>
              <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber || 'PTH-BD-9948102'}</p>
            </div>

            <div className="border-t border-zinc-800 pt-4 space-y-2 text-xs">
              <h4 className="font-bold text-amber-300 uppercase">Items</h4>
              {selectedOrder.items.map(it => (
                <div key={it.id} className="flex justify-between text-zinc-300">
                  <span>{it.productName} ({it.selectedColor} / {it.selectedSize}) × {it.quantity}</span>
                  <span className="font-bold text-white">৳{it.subtotal.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
              <span className="text-sm font-bold text-amber-400">Total: ৳{selectedOrder.total.toLocaleString()}</span>
              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-xl text-xs uppercase flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
