import React, { useState, useEffect } from 'react';
import { Order, PaymentMethod, PaymentStatus } from '../../types';
import { StorageService } from '../../services/storageService';
import { X, Pencil, DollarSign, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';

interface EditInvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
  adminName?: string;
  adminEmail?: string;
}

export const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
  onSave,
  adminName = 'ROYMEN Executive Admin',
  adminEmail = 'admin@roymen.com.bd'
}) => {
  if (!isOpen) return null;

  const isInitialCOD = order.paymentMethod === 'COD' || order.paymentMethod.toLowerCase().includes('cash');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(order.paymentMethod);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.paymentStatus);
  const [deliveryFee, setDeliveryFee] = useState<number>(order.deliveryFee ?? 0);
  const [discount, setDiscount] = useState<number>(order.discount ?? 0);
  const [subtotal] = useState<number>(order.subtotal ?? 0);
  
  const initialTotal = Math.max(0, subtotal + (order.deliveryFee ?? 0) - (order.discount ?? 0));
  const [total, setTotal] = useState<number>(order.total ?? initialTotal);

  const initialDeliveryPaid = order.deliveryFeePaid !== undefined 
    ? order.deliveryFeePaid 
    : (isInitialCOD ? order.deliveryFee : order.total);
    
  const [deliveryFeePaid, setDeliveryFeePaid] = useState<number>(initialDeliveryPaid);
  const [error, setError] = useState<string>('');

  // Auto Recalculate Grand Total & Due on Delivery
  const recalculateTotal = (newFee: number, newDiscount: number) => {
    const calculatedTotal = Math.max(0, subtotal + newFee - newDiscount);
    setTotal(calculatedTotal);
    return calculatedTotal;
  };

  const handleDeliveryFeeChange = (val: number) => {
    const fee = Math.max(0, val);
    setDeliveryFee(fee);
    const newTotal = recalculateTotal(fee, discount);
    
    // If COD, adjust default delivery charge paid if user hasn't explicitly changed it to 0
    if (paymentMethod === 'COD' && deliveryFeePaid > 0) {
      setDeliveryFeePaid(fee);
    } else if (paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'SSLCommerz') {
      setDeliveryFeePaid(newTotal);
    }
  };

  const handleDiscountChange = (val: number) => {
    const disc = Math.max(0, val);
    setDiscount(disc);
    const newTotal = recalculateTotal(deliveryFee, disc);
    
    if (paymentMethod !== 'COD') {
      setDeliveryFeePaid(newTotal);
    }
  };

  const handlePaymentMethodChange = (methodStr: string) => {
    let newMethod: PaymentMethod = 'COD';
    if (methodStr === 'bKash') newMethod = 'bKash';
    else if (methodStr === 'Nagad') newMethod = 'Nagad';
    else if (methodStr === 'SSLCommerz') newMethod = 'SSLCommerz';
    else newMethod = 'COD';

    setPaymentMethod(newMethod);

    if (newMethod === 'bKash' || newMethod === 'Nagad' || newMethod === 'SSLCommerz') {
      setPaymentStatus('paid');
      setDeliveryFeePaid(total);
    } else {
      setPaymentStatus('partially_paid');
      setDeliveryFeePaid(deliveryFee);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (deliveryFee < 0) {
      setError('Delivery charge cannot be negative.');
      return;
    }
    if (discount < 0) {
      setError('Discount cannot be negative.');
      return;
    }
    if (total < 0) {
      setError('Grand total cannot be negative.');
      return;
    }
    if (deliveryFeePaid < 0) {
      setError('Delivery charge paid cannot be negative.');
      return;
    }

    try {
      const updatedOrder = StorageService.updateOrderInvoice(
        order.id,
        {
          paymentMethod,
          paymentStatus,
          deliveryFee: Number(deliveryFee),
          discount: Number(discount),
          total: Number(total),
          deliveryFeePaid: Number(deliveryFeePaid)
        },
        adminEmail,
        adminName
      );

      onSave(updatedOrder);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to update invoice. Please try again.');
    }
  };

  const dueOnDelivery = Math.max(0, total - deliveryFeePaid);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Pencil className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-black font-serif text-white">Edit Invoice Settings</h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Order Reference: <span className="font-mono font-bold text-amber-300">{order.id}</span> • Admin Only
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Payment Method
            </label>
            <select
              value={paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none transition-colors"
            >
              <option value="bKash">bKash (Mobile)</option>
              <option value="Nagad">Nagad (Direct)</option>
              <option value="Cash on Delivery">Cash on Delivery (COD)</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Payment Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none transition-colors"
            >
              <option value="paid">🟢 Paid (Full)</option>
              <option value="partially_paid">🟡 Partially Paid (Delivery Charge Paid)</option>
              <option value="pending">🟡 Pending (Unpaid / COD Pending)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Delivery Charge */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Delivery Charge (৳)
              </label>
              <input
                type="number"
                min="0"
                value={deliveryFee}
                onChange={(e) => handleDeliveryFeeChange(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Discount (৳)
              </label>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Grand Total */}
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5 text-amber-400" /> Grand Total (৳)
              </label>
              <input
                type="number"
                min="0"
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-amber-500/40 text-amber-400 font-bold rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>

            {/* Delivery Charge Paid */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Delivery Fee Paid (৳)
              </label>
              <input
                type="number"
                min="0"
                value={deliveryFeePaid}
                onChange={(e) => setDeliveryFeePaid(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Live Preview / Calculation Summary Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Auto Calculation Preview</p>
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal:</span>
              <span className="font-mono text-white">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Delivery Charge:</span>
              <span className="font-mono text-white">৳{deliveryFee.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount:</span>
                <span className="font-mono">-৳{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-amber-300 pt-1 border-t border-zinc-800">
              <span>Grand Total:</span>
              <span className="font-mono text-amber-400">৳{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span>Delivery Charge Paid:</span>
              <span className="font-mono text-emerald-400">৳{deliveryFeePaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-amber-400 pt-1 border-t border-zinc-800">
              <span>Due on Delivery:</span>
              <span className="font-mono text-lg text-amber-400">৳{dueOnDelivery.toLocaleString()}</span>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Save Invoice Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
