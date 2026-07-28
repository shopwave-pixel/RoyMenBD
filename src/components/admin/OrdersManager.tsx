import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Order, OrderStatus, CourierPartner } from '../../types';
import { Truck, Printer, Eye, CheckCircle2, Clock, Search, CreditCard } from 'lucide-react';
import { InvoiceView } from '../common/InvoiceView';
import { PaymentDetailsModal } from './PaymentDetailsModal';

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState<Order | null>(null);
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
          <h1 className="text-3xl md:text-2xl font-black font-serif text-white">Order Dispatch & Courier Management</h1>
        </div>

        {/* Filter Status */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors flex-1 sm:flex-initial flex items-center justify-center ${
                filterStatus === s ? 'bg-amber-500 text-black font-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Container: Desktop Table vs Mobile Cards */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
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
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-amber-300 font-bold uppercase focus:outline-none cursor-pointer"
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
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="Pathao">Pathao Express</option>
                      <option value="Steadfast">Steadfast Courier</option>
                      <option value="RedX">RedX Logistics</option>
                      <option value="Paperfly">Paperfly</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedPaymentOrder(ord)}
                        className="px-2.5 py-1.5 bg-zinc-800 hover:bg-amber-500 hover:text-black border border-zinc-700 text-amber-300 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Payment
                      </button>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Order Cards View */}
        <div className="block md:hidden p-4 space-y-4">
          {filteredOrders.map(ord => (
            <div key={ord.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
              {/* Order Top Bar */}
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2.5">
                <div>
                  <span className="font-mono font-bold text-amber-300 text-base">{ord.id}</span>
                  <span className="text-xs text-zinc-400 block">{ord.shippingAddress?.district || 'Dhaka'}</span>
                </div>
                <span className="bg-zinc-800 px-2.5 py-1 rounded-lg text-xs font-bold text-zinc-200">
                  {ord.paymentMethod}
                </span>
              </div>

              {/* Client Info & Total */}
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-zinc-400 text-xs block uppercase">Customer</span>
                  <span className="font-bold text-white">{ord.customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 text-xs block uppercase">Total BDT</span>
                  <span className="font-bold text-amber-400 font-mono text-base">৳{ord.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Controls & Dropdowns */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Status</label>
                  <select
                    value={ord.orderStatus}
                    onChange={e => handleUpdateStatus(ord.id, e.target.value as OrderStatus, ord.courierPartner, ord.trackingNumber)}
                    className="w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-amber-300 font-bold uppercase focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Courier</label>
                  <select
                    value={ord.courierPartner || 'Pathao'}
                    onChange={e => handleUpdateStatus(ord.id, ord.orderStatus, e.target.value as CourierPartner, ord.trackingNumber || `PTH-BD-${Math.floor(100000 + Math.random() * 900000)}`)}
                    className="w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-emerald-400 font-bold focus:outline-none"
                  >
                    <option value="Pathao">Pathao Express</option>
                    <option value="Steadfast">Steadfast Courier</option>
                    <option value="RedX">RedX Logistics</option>
                    <option value="Paperfly">Paperfly</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
                <button
                  onClick={() => setSelectedPaymentOrder(ord)}
                  className="min-h-[44px] w-full bg-zinc-800 hover:bg-amber-500 hover:text-black border border-zinc-700 text-amber-300 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase"
                >
                  <CreditCard className="w-4 h-4" /> Payment
                </button>
                <button
                  onClick={() => setSelectedOrder(ord)}
                  className="min-h-[44px] w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase"
                >
                  <Eye className="w-4 h-4" /> Invoice Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPaymentOrder && (
        <PaymentDetailsModal
          order={selectedPaymentOrder}
          onClose={() => setSelectedPaymentOrder(null)}
        />
      )}

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto print:p-0 print:bg-transparent print:static">
          <div className="max-w-3xl w-full my-8 relative print:m-0 print:max-w-none print:w-full">
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 z-20 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors shadow-lg print:hidden no-print close-btn"
            >
              ✕ Close
            </button>
            <InvoiceView
              order={selectedOrder}
              onPrint={() => window.print()}
              onClose={() => setSelectedOrder(null)}
              isAdmin={true}
              onUpdateOrder={(updated) => {
                setSelectedOrder(updated);
                setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
