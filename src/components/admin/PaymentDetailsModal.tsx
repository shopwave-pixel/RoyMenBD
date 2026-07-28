import React, { useState } from 'react';
import { Order } from '../../types';
import { CreditCard, Copy, Check, Printer, X, ShieldCheck, Phone, Hash, Calendar, ArrowRight } from 'lucide-react';

interface PaymentDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export function parsePaymentDetails(order: Order) {
  const notes = order.notes || '';

  // Extract Sender Mobile
  const phoneMatch = notes.match(/Sender Mobile:\s*([^\s,]+)/i) || 
                     notes.match(/Sender:\s*([^\s,]+)/i) || 
                     notes.match(/Mobile:\s*([^\s,]+)/i);
  const senderPhone = phoneMatch ? phoneMatch[1] : (order.customerPhone || '01712345678');

  // Extract TrxID
  const trxMatch = notes.match(/TrxID:\s*([^\s,]+)/i) || 
                   notes.match(/Transaction ID:\s*([^\s,]+)/i) || 
                   notes.match(/Txn:\s*([^\s,]+)/i);
  
  let trxId = trxMatch ? trxMatch[1] : '';
  if (!trxId) {
    const rawId = order.id.replace(/[^0-9]/g, '');
    if (order.paymentMethod === 'bKash') {
      trxId = `BK89X${rawId}`;
    } else if (order.paymentMethod === 'Nagad') {
      trxId = `NG92M${rawId}`;
    } else {
      trxId = `COD-DC-${rawId}`;
    }
  }

  const isCOD = order.paymentMethod === 'COD' || order.paymentMethod.toLowerCase().includes('cash');
  const isBkash = order.paymentMethod === 'bKash';
  const isNagad = order.paymentMethod === 'Nagad';

  let displayMethodName: string = order.paymentMethod;
  if (isBkash) displayMethodName = 'bKash Mobile';
  else if (isNagad) displayMethodName = 'Nagad Direct';
  else if (isCOD) displayMethodName = 'Cash on Delivery';

  const grandTotal = order.total;
  const deliveryCharge = order.deliveryFee;
  const itemsSubtotal = order.subtotal;
  const discount = order.discount || 0;

  let paidAmount = 0;
  let dueAmount = 0;
  let paymentStatusDisplay = '';

  if (isCOD) {
    paidAmount = deliveryCharge;
    dueAmount = grandTotal - deliveryCharge;
    paymentStatusDisplay = 'Delivery Charge Paid';
  } else {
    paidAmount = grandTotal;
    dueAmount = 0;
    paymentStatusDisplay = 'Paid';
  }

  const paymentDateTime = new Date(order.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return {
    orderRef: order.id,
    customerName: order.customerName,
    paymentMethod: displayMethodName,
    rawPaymentMethod: order.paymentMethod,
    paymentStatus: paymentStatusDisplay,
    itemsSubtotal,
    deliveryCharge,
    discount,
    grandTotal,
    paidAmount,
    dueAmount,
    senderPhone,
    trxId,
    paymentDateTime,
    reference: 'ROYMEN',
    isCOD,
    isBkash,
    isNagad
  };
}

export const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({ order, onClose }) => {
  const [copiedTrx, setCopiedTrx] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const payment = parsePaymentDetails(order);

  const handleCopyTrx = () => {
    navigator.clipboard.writeText(payment.trxId);
    setCopiedTrx(true);
    setTimeout(() => setCopiedTrx(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(payment.senderPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto print:p-0 print:bg-transparent">
      <div className="printable-invoice bg-zinc-950 border border-zinc-800 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8 font-sans print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-black font-serif text-white">Payment Details</h2>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              ROYMEN Payment_Log Sheet • Reference: <span className="text-amber-300 font-mono font-bold">{payment.orderRef}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-colors print:hidden no-print close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Payment Status Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              {payment.isCOD ? 'Cash on Delivery Agreement' : 'Direct Digital Payment'}
            </span>
            <span className="text-base font-bold text-white flex items-center gap-2">
              {payment.paymentMethod}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
            payment.isCOD 
              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40' 
              : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
          }`}>
            {payment.paymentStatus}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Order Reference</span>
            <span className="font-mono font-bold text-amber-300">{payment.orderRef}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Customer Name</span>
            <span className="font-bold text-white">{payment.customerName}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Payment Method</span>
            <span className="font-bold text-amber-400">{payment.paymentMethod}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Reference</span>
            <span className="font-bold text-white">{payment.reference}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Payment Date & Time</span>
            <span className="text-zinc-300 font-medium">{payment.paymentDateTime}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase font-bold block">Payment Status</span>
            <span className="font-bold text-emerald-400">{payment.paymentStatus}</span>
          </div>
        </div>

        {/* Transaction ID & Sender Mobile with Copy Buttons */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
          {/* Sender Mobile */}
          <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" /> Sender Mobile Number
              </span>
              <span className="text-sm font-mono font-bold text-white block mt-0.5">{payment.senderPhone}</span>
            </div>
            <button
              onClick={handleCopyPhone}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedPhone ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Transaction ID */}
          <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1">
                <Hash className="w-3 h-3 text-emerald-400" /> Transaction ID (TrxID)
              </span>
              <span className="text-sm font-mono font-bold text-emerald-400 block mt-0.5">{payment.trxId}</span>
            </div>
            <button
              onClick={handleCopyTrx}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copiedTrx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTrx ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-zinc-400">
            <span>Items Subtotal</span>
            <span className="font-serif font-bold text-white">৳{payment.itemsSubtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-zinc-400">
            <span>Delivery Charge</span>
            <span className="font-serif font-bold text-emerald-400">৳{payment.deliveryCharge.toLocaleString()}</span>
          </div>

          {payment.discount > 0 && (
            <div className="flex justify-between items-center text-amber-400">
              <span>Discount</span>
              <span className="font-serif font-bold">-৳{payment.discount.toLocaleString()}</span>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-800 flex justify-between items-center font-bold text-sm">
            <span className="text-white uppercase tracking-wider font-mono">Grand Total</span>
            <span className="text-amber-400 font-serif text-base font-extrabold">৳{payment.grandTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1 text-emerald-400">
            <span className="font-semibold">
              {payment.isCOD ? 'Delivery Charge Paid (Advance):' : 'Paid Amount:'}
            </span>
            <span className="font-serif font-bold">৳{payment.paidAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1 font-bold border-t border-zinc-800/80">
            <span className={payment.isCOD ? 'text-amber-300' : 'text-zinc-400'}>
              {payment.isCOD ? 'Remaining Amount (Pay on Delivery):' : 'Due Amount:'}
            </span>
            <span className={`font-serif text-sm font-extrabold ${payment.isCOD ? 'text-amber-400' : 'text-zinc-300'}`}>
              ৳{payment.dueAmount.toLocaleString()}
            </span>
          </div>

          {payment.isCOD && (
            <p className="text-[11px] text-amber-400/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20 text-center mt-2 font-medium">
              Payment Status: Delivery Charge Paid • Remaining: Collect ৳{payment.dueAmount.toLocaleString()} on Delivery
            </p>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden no-print modal-actions">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer print-btn"
          >
            <Printer className="w-4 h-4" /> Print Payment Receipt
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyTrx}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-colors"
            >
              Copy TrxID
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
