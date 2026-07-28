import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { Printer, Pencil } from 'lucide-react';
import { EditInvoiceModal } from '../admin/EditInvoiceModal';

interface InvoiceViewProps {
  order: Order;
  onPrint?: () => void;
  onClose?: () => void;
  showPrintButton?: boolean;
  isAdmin?: boolean;
  onUpdateOrder?: (updatedOrder: Order) => void;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({
  order: initialOrder,
  onPrint,
  onClose,
  showPrintButton = true,
  isAdmin = false,
  onUpdateOrder
}) => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setOrder(initialOrder);
  }, [initialOrder]);

  const isCOD = order.paymentMethod === 'COD' || order.paymentMethod.toLowerCase().includes('cash');
  const isBkash = order.paymentMethod === 'bKash';
  const isNagad = order.paymentMethod === 'Nagad';

  const getPaymentMethodName = (method: string) => {
    if (method === 'bKash') return 'bKash Mobile';
    if (method === 'Nagad') return 'Nagad Direct';
    if (method === 'COD' || method.toLowerCase().includes('cash')) return 'Cash on Delivery';
    return method;
  };

  const paymentMethodName = getPaymentMethodName(order.paymentMethod);

  // Extract TrxID if bKash or Nagad
  const notes = order.notes || '';
  const trxMatch = notes.match(/TrxID:\s*([^\s,]+)/i) || 
                   notes.match(/Transaction ID:\s*([^\s,]+)/i) || 
                   notes.match(/Txn:\s*([^\s,]+)/i);
  let trxId = trxMatch ? trxMatch[1] : '';
  if (!trxId && (isBkash || isNagad)) {
    const rawId = order.id.replace(/[^0-9]/g, '');
    trxId = isBkash ? `BK89X${rawId}` : `NG92M${rawId}`;
  }

  const deliveryChargePaid = order.deliveryFeePaid !== undefined 
    ? order.deliveryFeePaid 
    : (isCOD ? order.deliveryFee : order.total);

  const dueOnDelivery = Math.max(0, order.total - deliveryChargePaid);

  const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const fullAddressParts = [
    order.shippingAddress?.addressLine,
    order.shippingAddress?.area,
    order.shippingAddress?.district,
    order.shippingAddress?.division
  ].filter(Boolean);

  const fullAddress = fullAddressParts.length > 0 ? fullAddressParts.join(', ') : 'Dhaka, Bangladesh';

  const handlePrint = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleSavedInvoice = (updated: Order) => {
    setOrder(updated);
    if (onUpdateOrder) {
      onUpdateOrder(updated);
    }
  };

  const renderPaymentStatus = () => {
    if (order.paymentStatus === 'paid') {
      return (
        <span className="font-bold text-emerald-400 print:text-black inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span> Paid
        </span>
      );
    }
    if (order.paymentStatus === 'partially_paid' || order.paymentStatus === 'partially paid') {
      return (
        <span className="font-bold text-amber-400 print:text-black inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span> Partially Paid
        </span>
      );
    }
    if (order.paymentStatus === 'pending') {
      return (
        <span className="font-bold text-yellow-500 print:text-black inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span> Pending
        </span>
      );
    }
    if (isCOD) {
      return (
        <span className="font-bold text-amber-400 print:text-black inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span> Partially Paid
        </span>
      );
    }
    return (
      <span className="font-bold text-emerald-400 print:text-black inline-flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span> Paid
      </span>
    );
  };

  return (
    <div className="printable-invoice bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-2xl relative font-sans print:bg-white print:text-black print:p-0 print:border-none print:shadow-none print:rounded-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-zinc-800 pb-6 print:border-zinc-300">
        <div>
          <h1 className="text-2xl font-black font-serif tracking-widest text-white uppercase print:text-black">ROYMEN</h1>
          <p className="text-xs font-serif italic text-amber-400/90 tracking-wider mt-0.5 print:text-zinc-600">Wear Confidence</p>
        </div>

        <div className="text-left sm:text-right space-y-1 text-xs">
          <h2 className="text-lg font-black font-serif tracking-widest text-amber-400 uppercase print:text-black">INVOICE</h2>
          <div className="text-zinc-300 print:text-zinc-800 space-y-0.5">
            <p><span className="text-zinc-500 print:text-zinc-600 font-medium">Invoice No:</span> <span className="font-mono font-bold text-amber-300 print:text-black">{order.id}</span></p>
            <p><span className="text-zinc-500 print:text-zinc-600 font-medium">Order Date:</span> {formattedDate}</p>
            <p><span className="text-zinc-500 print:text-zinc-600 font-medium">Payment Method:</span> <span className="font-semibold text-white print:text-black">{paymentMethodName}</span></p>
            <p className="flex items-center sm:justify-end gap-1.5 pt-0.5">
              <span className="text-zinc-500 print:text-zinc-600 font-medium">Payment Status:</span>{' '}
              {renderPaymentStatus()}
            </p>
          </div>
        </div>
      </div>

      {/* CUSTOMER & DELIVERY ADDRESS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 print:bg-transparent print:border-zinc-300 print:p-0">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 print:text-zinc-600 block">
            Customer Details
          </span>
          <p className="text-sm font-bold text-white print:text-black">{order.customerName}</p>
          <p className="text-zinc-300 print:text-zinc-800 font-medium"><span className="text-zinc-500 print:text-zinc-600">Mobile:</span> {order.customerPhone}</p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 print:text-zinc-600 block">
            Delivery Address
          </span>
          <p className="text-zinc-300 print:text-zinc-800 leading-relaxed font-medium">
            {fullAddress}
          </p>
        </div>
      </div>

      {/* ORDER ITEMS TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 print:border-zinc-400 text-[10px] font-bold uppercase tracking-wider text-zinc-400 print:text-zinc-700 bg-zinc-900/80 print:bg-zinc-100">
              <th className="py-3 px-4 rounded-l-xl print:rounded-none">Product</th>
              <th className="py-3 px-4">Variant</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-right">Unit Price</th>
              <th className="py-3 px-4 text-right rounded-r-xl print:rounded-none">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 print:divide-zinc-200">
            {order.items.map((it) => (
              <tr key={it.id} className="text-zinc-300 print:text-black">
                <td className="py-3.5 px-4 font-bold text-white print:text-black">
                  <div className="flex items-center gap-3">
                    {it.image && (
                      <img
                        src={it.image}
                        alt={it.productName}
                        className="w-12 h-12 object-cover rounded-lg border border-zinc-800 print:border-zinc-300 shrink-0 print:w-10 print:h-10"
                      />
                    )}
                    <span>{it.productName}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-zinc-400 print:text-zinc-700">
                  Size: {it.selectedSize} • Color: {it.selectedColor}
                </td>
                <td className="py-3.5 px-4 text-center font-bold">{it.quantity}</td>
                <td className="py-3.5 px-4 text-right font-serif">৳{it.price.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right font-serif font-bold text-white print:text-black">
                  ৳{it.subtotal.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="flex flex-col sm:flex-row justify-end items-start gap-6 pt-2">
        <div className="w-full sm:w-80 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3 text-xs print:bg-transparent print:border-zinc-300 print:p-0">
          <div className="flex justify-between items-center text-zinc-400 print:text-zinc-700">
            <span>Subtotal</span>
            <span className="font-serif font-bold text-white print:text-black">৳{order.subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-zinc-400 print:text-zinc-700">
            <span>Delivery Charge</span>
            <span className="font-serif font-bold text-emerald-400 print:text-black">
              {order.deliveryFee > 0 ? `৳${order.deliveryFee.toLocaleString()}` : 'Free Delivery'}
            </span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between items-center text-amber-400 print:text-black">
              <span>Discount</span>
              <span className="font-serif font-bold">-৳{order.discount.toLocaleString()}</span>
            </div>
          )}

          <div className="pt-3 border-t border-zinc-800 print:border-zinc-400 flex justify-between items-center text-base font-bold">
            <span className="text-amber-300 uppercase tracking-wider font-mono print:text-black">Grand Total</span>
            <span className="text-amber-400 font-serif text-xl sm:text-2xl font-black print:text-black">
              ৳{order.total.toLocaleString()}
            </span>
          </div>

          {/* Layout 2 Specific: COD Payment Details */}
          {isCOD && (
            <div className="pt-3 border-t border-zinc-800/80 print:border-zinc-300 space-y-2">
              <div className="flex justify-between items-center text-xs text-emerald-400 print:text-black">
                <span className="font-medium flex items-center gap-1">Delivery Charge Paid <span className="text-emerald-400">✓</span></span>
                <span className="font-serif font-bold">৳{deliveryChargePaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-amber-300 print:text-black pt-1">
                <span>Due on Delivery</span>
                <span className="font-serif font-extrabold text-amber-400 print:text-black text-sm sm:text-base">
                  ৳{dueOnDelivery.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-zinc-800/80 pt-6 text-center text-xs text-zinc-400 print:text-zinc-600 print:border-zinc-300 space-y-1">
        <p className="font-serif font-bold text-white print:text-black text-sm">Thank you for shopping with ROYMEN.</p>
        <p className="font-mono text-amber-400/90 print:text-zinc-800">www.roymen.com.bd</p>
      </div>

      {/* PRINT, EDIT, AND CANCEL BUTTONS */}
      {showPrintButton && (
        <div className="flex flex-wrap justify-end items-center gap-3 pt-2 print:hidden no-print print-btn modal-actions">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg cursor-pointer close-btn"
            >
              Cancel
            </button>
          )}
          {isAdmin && (
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg cursor-pointer edit-btn"
            >
              <Pencil className="w-4 h-4" /> Edit Invoice
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="bg-white hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
        </div>
      )}

      {/* ADMIN EDIT INVOICE MODAL */}
      {isAdmin && isEditModalOpen && (
        <EditInvoiceModal
          order={order}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSavedInvoice}
        />
      )}

    </div>
  );
};

