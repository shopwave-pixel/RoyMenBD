import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  CreditCard,
  Smartphone,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  User as UserIcon,
  Printer
} from 'lucide-react';
import { CartItem, Coupon, PaymentMethod, Address, Order, User } from '../../types';
import { StorageService } from '../../services/storageService';

interface CheckoutPageProps {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  currentUser: User | null;
  onBackToShop: () => void;
  onOrderPlaced: (order: Order) => void;
  onRequireAuth?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  appliedCoupon,
  currentUser,
  onBackToShop,
  onOrderPlaced,
  onRequireAuth
}) => {
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+880 ');
  const [addressLine, setAddressLine] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [notes, setNotes] = useState('');

  // Sync state if user logs in while on checkout
  React.useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name || '');
      if (!customerEmail) setCustomerEmail(currentUser.email || '');
      if (!customerPhone || customerPhone === '+880 ') setCustomerPhone(currentUser.phone || '+880 ');
    }
  }, [currentUser]);
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bKash');
  const [bkashTxnId, setBkashTxnId] = useState('');
  const [nagadTxnId, setNagadTxnId] = useState('');
  
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate Coupon Discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const deliveryFee = subtotal >= 5000 ? 0 : (district === 'Dhaka' ? 80 : 150);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const districtsList = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
    'Comilla', 'Narayanganj', 'Gazipur', 'Bogra', 'Feni', 'Cox\'s Bazar', 'Kushtia', 'Jessore'
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please sign in to continue with your purchase.');
      if (onRequireAuth) {
        onRequireAuth();
      }
      return;
    }

    if (!customerName || !customerEmail || !customerPhone || !addressLine) {
      alert('Please fill in all required shipping address details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const shippingAddress: Address = {
        id: `addr-${Date.now()}`,
        fullName: customerName,
        phone: customerPhone,
        addressLine,
        district,
        area: area || district,
        isDefault: true
      };

      const newOrder = StorageService.placeOrder({
        customerId: currentUser?.id || 'GUEST',
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items: cartItems.map(item => ({
          id: `oi-${Math.random()}`,
          orderId: '',
          productId: item.productId,
          productName: item.product.name,
          sku: item.product.sku,
          selectedColor: item.selectedColor.name,
          selectedSize: item.selectedSize,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
          image: item.product.images[0]
        })),
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'pending' : 'paid',
        orderStatus: 'pending',
        notes
      });

      setIsSubmitting(false);
      setPlacedOrder(newOrder);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  // If order was successfully placed, show Confirmation Receipt Screen
  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-white font-sans">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          <div className="w-20 h-20 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Order Confirmed</span>
            <h2 className="text-3xl font-black text-white font-serif mt-1">Thank You, {placedOrder.customerName}!</h2>
            <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
              Your order has been logged into the ROYMEN Google Sheets ERP system. A confirmation email was sent to <strong className="text-white">{placedOrder.customerEmail}</strong>.
            </p>
          </div>

          {/* Receipt Info Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase">Order Reference:</span>
              <span className="text-amber-300 font-mono font-bold text-sm">{placedOrder.id}</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase">Payment Method:</span>
              <span className="text-white font-bold">{placedOrder.paymentMethod} ({placedOrder.paymentStatus.toUpperCase()})</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase">Assigned Courier:</span>
              <span className="text-emerald-400 font-bold">Pathao / Steadfast Express</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-zinc-400 font-bold uppercase">Total Paid:</span>
              <span className="text-amber-400 font-serif text-lg font-black">৳{placedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-3.5 rounded-xl border border-zinc-700 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Printer className="w-4 h-4" /> Print Official Invoice
            </button>

            <button
              onClick={onBackToShop}
              className="w-full sm:w-auto bg-white hover:bg-amber-400 text-black font-black px-8 py-3.5 rounded-xl uppercase text-xs tracking-wider transition-colors"
            >
              Return To Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white font-sans">
      {/* Back Button */}
      <button
        onClick={onBackToShop}
        className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Step 1 of 2</span>
            <h1 className="text-3xl font-black font-serif text-white mt-1">Express Delivery Details</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Orders placed before 4:00 PM are dispatched same-day from our Gulshan Atelier.
            </p>
          </div>

          {!currentUser && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">Sign In Required For Checkout</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">
                    Please sign in to your ROYMEN account to complete your purchase. Guest checkout is disabled.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onRequireAuth}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl uppercase text-xs tracking-wider transition-all shadow-lg shrink-0"
              >
                Sign In / Register
              </button>
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Contact Details */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <UserIcon className="w-4 h-4" /> Client Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="e.g. tanvir@domain.bd"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Mobile Phone (For Delivery SMS) *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+880 1712-345678"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Bangladesh Delivery Address
              </h3>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Street / House / Road / Block *</label>
                <textarea
                  rows={2}
                  required
                  value={addressLine}
                  onChange={e => setAddressLine(e.target.value)}
                  placeholder="e.g. House 42, Road 11, Block D, Banani, Dhaka-1213"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">District / Division *</label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {districtsList.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Thana / Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    placeholder="e.g. Banani / Gulshan / Nasirabad"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Select Payment Method
              </h3>

              <div className="grid grid-cols-2 gap-3">
                
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'bKash'
                      ? 'bg-pink-950/40 border-pink-500 text-white shadow-lg'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-pink-400">bKash Mobile</span>
                    <Smartphone className="w-4 h-4 text-pink-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2">Instant MFS Payment</span>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'Nagad'
                      ? 'bg-orange-950/40 border-orange-500 text-white shadow-lg'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-orange-400">Nagad Direct</span>
                    <Smartphone className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2">Fast MFS Payment</span>
                </button>

                {/* SSLCommerz */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('SSLCommerz')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'SSLCommerz'
                      ? 'bg-blue-950/40 border-blue-500 text-white shadow-lg'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-blue-400">Cards & Internet</span>
                    <CreditCard className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2">Visa, Mastercard, Amex</span>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'COD'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-emerald-400">Cash On Delivery</span>
                    <Truck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2">Pay on delivery</span>
                </button>
              </div>

              {/* MFS Instructions */}
              {paymentMethod === 'bKash' && (
                <div className="p-4 bg-pink-950/20 border border-pink-500/30 rounded-2xl text-xs space-y-2 text-pink-200">
                  <p className="font-bold">bKash Merchant Payment Steps:</p>
                  <ol className="list-decimal list-inside text-[11px] space-y-1 text-zinc-300">
                    <li>Go to bKash App & Select <strong>Make Payment</strong>.</li>
                    <li>Enter Merchant Number: <strong className="text-pink-400 font-mono">01700998877</strong></li>
                    <li>Enter Amount: <strong className="text-white font-mono">৳{total.toLocaleString()}</strong></li>
                    <li>Enter Reference: <strong className="text-amber-300">ROYMEN</strong></li>
                  </ol>
                </div>
              )}

              {paymentMethod === 'Nagad' && (
                <div className="p-4 bg-orange-950/20 border border-orange-500/30 rounded-2xl text-xs space-y-2 text-orange-200">
                  <p className="font-bold">Nagad Merchant Payment Steps:</p>
                  <ol className="list-decimal list-inside text-[11px] space-y-1 text-zinc-300">
                    <li>Open Nagad App & Select <strong>Merchant Pay</strong>.</li>
                    <li>Enter Merchant Number: <strong className="text-orange-400 font-mono">01800998877</strong></li>
                    <li>Amount: <strong className="text-white font-mono">৳{total.toLocaleString()}</strong></li>
                  </ol>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Processing Order & Logging to ERP...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Place Order - ৳{total.toLocaleString()}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sticky top-28 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-4 font-serif">
              Order Summary ({cartItems.length} items)
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover rounded-xl border border-zinc-800"
                    />
                    <div>
                      <h4 className="font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <p className="text-[11px] text-zinc-400">
                        {item.selectedColor.name} | Size: {item.selectedSize} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-white">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-800">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-zinc-200">৳{subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Courier Charge ({district})</span>
                <span className="text-zinc-200">{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-zinc-800 text-sm font-black text-white">
                <span>Grand Total</span>
                <span className="text-amber-400 text-lg font-serif">৳{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[11px] text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Truck className="w-3.5 h-3.5 text-amber-400" /> Pathao & Steadfast Partner
              </div>
              <p>Real-time SMS tracking code will be sent immediately after order dispatch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
