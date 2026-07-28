import React, { useState, useRef, useEffect } from 'react';
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
  Printer,
  Search,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { CartItem, Coupon, PaymentMethod, Address, Order, User } from '../../types';
import { StorageService } from '../../services/storageService';
import { InvoiceView } from '../common/InvoiceView';

const BANGLADESH_DISTRICTS = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura', 'Brahmanbaria', 'Chandpur',
  'Chattogram', 'Chuadanga', 'Cox\'s Bazar', 'Cumilla', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni',
  'Gaibandha', 'Gazipur', 'Gopalganj', 'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokathi', 'Jhenaidah',
  'Joypurhat', 'Khagrachhari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur', 'Lalmonirhat',
  'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar', 'Munshiganj', 'Mymensingh', 'Naogaon',
  'Narail', 'Narayanganj', 'Narsingdi', 'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna',
  'Panchagarh', 'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur', 'Satkhira',
  'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet', 'Tangail', 'Thakurgaon'
];

interface SearchableDistrictSelectProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchableDistrictSelect: React.FC<SearchableDistrictSelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredDistricts = BANGLADESH_DISTRICTS.filter(d =>
    d.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, filteredDistricts.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredDistricts[focusedIndex]) {
        onChange(filteredDistricts[focusedIndex]);
        setIsOpen(false);
        setSearchQuery('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery('');
          setFocusedIndex(0);
        }}
        className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-xs text-left flex items-center justify-between font-medium transition-all ${
          isOpen ? 'border-amber-400 ring-1 ring-amber-400/30' : 'border-zinc-800 hover:border-zinc-700'
        } ${value ? 'text-white' : 'text-zinc-500'}`}
      >
        <span className="truncate">{value || '-- Select District --'}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2.5 space-y-2 max-h-72 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
              }}
              placeholder="Search District..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="overflow-y-auto max-h-48 space-y-0.5 pr-1 custom-scrollbar">
            {filteredDistricts.length === 0 ? (
              <div className="px-3 py-3 text-xs text-zinc-500 text-center">
                No district matching "{searchQuery}"
              </div>
            ) : (
              filteredDistricts.map((d, index) => {
                const isSelected = value === d;
                const isFocused = focusedIndex === index;
                return (
                  <button
                    key={d}
                    ref={el => (itemRefs.current[index] = el)}
                    type="button"
                    onClick={() => {
                      onChange(d);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                        : isFocused
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <span>{d}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

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
  const [district, setDistrict] = useState('');
  const [dhakaZone, setDhakaZone] = useState<'Dhaka Metro' | 'Outside Dhaka Metro'>('Dhaka Metro');
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
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [codSubMethod, setCodSubMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [bkashTxnId, setBkashTxnId] = useState('');
  const [nagadTxnId, setNagadTxnId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDistrictSelected = district.trim().length > 0;
  const isDhaka = district.trim().toLowerCase() === 'dhaka';
  
  // Delivery Charge rules:
  // IF District = Dhaka:
  //   IF Delivery Zone = Dhaka Metro -> ৳70
  //   IF Delivery Zone = Outside Dhaka Metro -> ৳130
  // IF District ≠ Dhaka:
  //   Delivery Charge = ৳130
  const deliveryFee = !isDistrictSelected
    ? 0
    : isDhaka
    ? (dhakaZone === 'Dhaka Metro' ? 70 : 130)
    : 130;

  const activeMfs = paymentMethod === 'COD' ? codSubMethod : paymentMethod;
  const activeTxnId = activeMfs === 'bKash' ? bkashTxnId : (activeMfs === 'Nagad' ? nagadTxnId : '');
  
  // Validation conditions
  const isFormValid =
    currentUser !== null &&
    customerName.trim().length > 0 &&
    customerEmail.trim().length > 0 &&
    customerPhone.trim().length >= 8 &&
    addressLine.trim().length > 0 &&
    isDistrictSelected &&
    (!isDhaka || (dhakaZone === 'Dhaka Metro' || dhakaZone === 'Outside Dhaka Metro')) &&
    area.trim().length > 0 &&
    paymentMethod !== null &&
    (paymentMethod === 'bKash' || paymentMethod === 'Nagad' || (paymentMethod === 'COD' && (codSubMethod === 'bKash' || codSubMethod === 'Nagad'))) &&
    senderPhone.trim().length >= 8 &&
    activeTxnId.trim().length >= 3;

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

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please sign in to continue with your purchase.');
      if (onRequireAuth) {
        onRequireAuth();
      }
      return;
    }

    if (!isFormValid) {
      alert('Please fill in all required contact, address, and payment verification details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const shippingAddress: Address = {
        id: `addr-${Date.now()}`,
        fullName: customerName,
        phone: customerPhone,
        addressLine,
        district: isDhaka ? `Dhaka (${dhakaZone})` : district,
        area: area || district,
        isDefault: true
      };

      const zoneInfo = isDhaka ? ` (${dhakaZone})` : '';
      const methodLabel = paymentMethod === 'COD' 
        ? `Cash on Delivery (Delivery Charge ৳${deliveryFee} via ${codSubMethod})` 
        : `${paymentMethod} (Full Payment ৳${total})`;
      const paymentDetailsNote = `[Payment Method: ${methodLabel}] Sender Mobile: ${senderPhone}, TrxID: ${activeTxnId}, Delivery Charge: ৳${deliveryFee}, Total: ৳${total}, District: ${district}${zoneInfo}, Thana: ${area}, Payment Time: ${new Date().toLocaleString()}`;
      const fullNotes = notes ? `${notes} | ${paymentDetailsNote}` : paymentDetailsNote;

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
        paymentMethod: paymentMethod || 'COD',
        paymentStatus: 'paid',
        orderStatus: 'pending',
        notes: fullNotes
      });

      setIsSubmitting(false);
      setPlacedOrder(newOrder);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  // If order was successfully placed, show Confirmation Receipt Screen
  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-white font-sans space-y-8">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Order Confirmed</span>
            <h2 className="text-3xl font-black text-white font-serif mt-1">Thank You, {placedOrder.customerName}!</h2>
            <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
              Your order has been logged into the ROYMEN ERP system. A confirmation email was sent to <strong className="text-white">{placedOrder.customerEmail}</strong>.
            </p>
          </div>
        </div>

        {/* Complete Official Invoice Display */}
        <InvoiceView order={placedOrder} onPrint={() => window.print()} />

        <div className="text-center pt-2">
          <button
            onClick={onBackToShop}
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-black px-8 py-3.5 rounded-xl border border-zinc-700 uppercase text-xs tracking-wider transition-colors"
          >
            Return To Shop
          </button>
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

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">District / Division *</label>
                    <SearchableDistrictSelect
                      value={district}
                      onChange={val => {
                        setDistrict(val);
                        if (val.toLowerCase().trim() === 'dhaka') {
                          setDhakaZone('Dhaka Metro');
                        }
                      }}
                    />
                    {isDistrictSelected && !isDhaka && (
                      <span className="text-[11px] font-bold text-amber-400 mt-1 block">
                        ✓ Delivery Charge: ৳130 (Outside Dhaka)
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Thana / Area *</label>
                    <input
                      type="text"
                      required
                      value={area}
                      onChange={e => setArea(e.target.value)}
                      placeholder="e.g. Banani / Gulshan / Nasirabad"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Dhaka Delivery Zone Selector - Appears automatically when District === 'Dhaka' */}
                {isDhaka && (
                  <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs text-amber-300 font-bold uppercase block mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> Select Delivery Zone (Dhaka) *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDhakaZone('Dhaka Metro')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          dhakaZone === 'Dhaka Metro'
                            ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold">Dhaka Metro</span>
                          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">৳70</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">Inside Dhaka City Metro Area</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDhakaZone('Outside Dhaka Metro')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          dhakaZone === 'Outside Dhaka Metro'
                            ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold">Outside Dhaka Metro</span>
                          <span className="text-xs font-extrabold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">৳130</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">Suburbs & Greater Dhaka Area</p>
                      </button>
                    </div>
                    <span className="text-[11px] font-bold text-amber-400 mt-1 block">
                      ✓ Selected Zone: <span className="text-white font-bold">{dhakaZone}</span> — Delivery Charge: <span className="text-emerald-400 font-extrabold">৳{deliveryFee}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Select Payment Method Section */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5 animate-in fade-in slide-in-from-top-3 duration-300">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" /> Select Payment Method *
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Choose your payment method below to proceed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. bKash Mobile */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'bKash'
                      ? 'bg-pink-950/40 border-pink-500 text-white shadow-lg ring-1 ring-pink-500/50'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-pink-400">bKash Mobile</span>
                    <Smartphone className="w-4 h-4 text-pink-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2 font-medium">Pay Full Total: ৳{total.toLocaleString()}</span>
                </button>

                {/* 2. Nagad Direct */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'Nagad'
                      ? 'bg-orange-950/40 border-orange-500 text-white shadow-lg ring-1 ring-orange-500/50'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-orange-400">Nagad Direct</span>
                    <Smartphone className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2 font-medium">Pay Full Total: ৳{total.toLocaleString()}</span>
                </button>

                {/* 3. Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'COD'
                      ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase text-amber-400">Cash on Delivery</span>
                    <Truck className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2 font-medium">Pay ৳{isDistrictSelected ? deliveryFee : (isDhaka ? 70 : 130)} Delivery Charge</span>
                </button>
              </div>

              {/* DEFAULT STATE: If paymentMethod is null, nothing else is displayed */}

              {/* Direct bKash Payment Instructions */}
              {paymentMethod === 'bKash' && (
                <div className="p-5 bg-pink-950/20 border border-pink-500/30 rounded-2xl text-xs space-y-3 text-pink-200 transition-all animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center border-b border-pink-500/20 pb-2">
                    <p className="font-bold text-sm text-pink-300">bKash Payment Steps</p>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Amount: ৳{total.toLocaleString()}
                    </span>
                  </div>
                  <ol className="list-decimal list-inside text-xs space-y-1.5 text-zinc-300 leading-relaxed">
                    <li>Open the <strong className="text-pink-300 font-bold">bKash App</strong> and select <strong className="text-white font-bold">Send Money</strong>.</li>
                    <li>Send Money Number: <strong className="text-pink-400 font-mono font-bold">01721922927</strong></li>
                    <li>Enter Amount: <strong className="text-emerald-400 font-bold">৳{total.toLocaleString()}</strong> (Full Order Amount)</li>
                    <li>Enter Reference: <strong className="text-amber-300 font-bold">ROYMEN</strong></li>
                    <li>Complete the payment.</li>
                    <li>Save your <strong className="text-white font-bold">Transaction ID (TrxID)</strong>.</li>
                    <li>Enter your <strong className="text-white font-bold">Sender Mobile Number</strong> and <strong className="text-white font-bold">Transaction ID (TrxID)</strong> below to verify your payment.</li>
                  </ol>

                  <div className="pt-3 border-t border-pink-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Sender Mobile Number *</label>
                      <input
                        type="tel"
                        value={senderPhone}
                        onChange={e => setSenderPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Transaction ID (TrxID) *</label>
                      <input
                        type="text"
                        value={bkashTxnId}
                        onChange={e => setBkashTxnId(e.target.value)}
                        placeholder="e.g. 9J87XX12A"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500 uppercase font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Nagad Payment Instructions */}
              {paymentMethod === 'Nagad' && (
                <div className="p-5 bg-orange-950/20 border border-orange-500/30 rounded-2xl text-xs space-y-3 text-orange-200 transition-all animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center border-b border-orange-500/20 pb-2">
                    <p className="font-bold text-sm text-orange-300">Nagad Payment Steps</p>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Amount: ৳{total.toLocaleString()}
                    </span>
                  </div>
                  <ol className="list-decimal list-inside text-xs space-y-1.5 text-zinc-300 leading-relaxed">
                    <li>Open the <strong className="text-orange-300 font-bold">Nagad App</strong> and select <strong className="text-white font-bold">Send Money</strong>.</li>
                    <li>Send Money Number: <strong className="text-orange-400 font-mono font-bold">01721922927</strong></li>
                    <li>Enter Amount: <strong className="text-emerald-400 font-bold">৳{total.toLocaleString()}</strong> (Full Order Amount)</li>
                    <li>Enter Reference: <strong className="text-amber-300 font-bold">ROYMEN</strong></li>
                    <li>Complete the payment.</li>
                    <li>Save your <strong className="text-white font-bold">Transaction ID (TrxID)</strong>.</li>
                    <li>Enter your <strong className="text-white font-bold">Sender Mobile Number</strong> and <strong className="text-white font-bold">Transaction ID (TrxID)</strong> below to verify your payment.</li>
                  </ol>

                  <div className="pt-3 border-t border-orange-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Sender Mobile Number *</label>
                      <input
                        type="tel"
                        value={senderPhone}
                        onChange={e => setSenderPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Transaction ID (TrxID) *</label>
                      <input
                        type="text"
                        value={nagadTxnId}
                        onChange={e => setNagadTxnId(e.target.value)}
                        placeholder="e.g. 7N92XX88B"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 uppercase font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cash on Delivery Flow: Expandable Delivery Charge Section */}
              {paymentMethod === 'COD' && (
                <div className="p-5 bg-zinc-900/90 border border-amber-500/30 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-400" /> Pay Delivery Charge to Confirm Order
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Pay advance delivery charge to confirm your Cash on Delivery order.
                      </p>
                    </div>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
                      Delivery Charge: ৳{isDistrictSelected ? deliveryFee : (isDhaka ? 70 : 130)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCodSubMethod('bKash')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        codSubMethod === 'bKash'
                          ? 'bg-pink-950/50 border-pink-500 text-white ring-1 ring-pink-500/40 shadow-lg'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black text-pink-400 block uppercase">bKash Mobile</span>
                        <span className="text-[10px] text-zinc-400 font-medium">Pay ৳{isDistrictSelected ? deliveryFee : 130} via bKash</span>
                      </div>
                      <Smartphone className="w-4 h-4 text-pink-400 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setCodSubMethod('Nagad')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        codSubMethod === 'Nagad'
                          ? 'bg-orange-950/50 border-orange-500 text-white ring-1 ring-orange-500/40 shadow-lg'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black text-orange-400 block uppercase">Nagad Direct</span>
                        <span className="text-[10px] text-zinc-400 font-medium">Pay ৳{isDistrictSelected ? deliveryFee : 130} via Nagad</span>
                      </div>
                      <Smartphone className="w-4 h-4 text-orange-400 shrink-0" />
                    </button>
                  </div>

                  {/* COD sub-method bKash instructions */}
                  {codSubMethod === 'bKash' && (
                    <div className="p-4 bg-pink-950/20 border border-pink-500/30 rounded-xl text-xs space-y-3 text-pink-200">
                      <p className="font-bold text-xs text-pink-300">bKash Delivery Charge Payment Steps</p>
                      <ol className="list-decimal list-inside text-xs space-y-1.5 text-zinc-300 leading-relaxed">
                        <li>Open the <strong className="text-pink-300 font-bold">bKash App</strong> and select <strong className="text-white font-bold">Send Money</strong>.</li>
                        <li>Send Money Number: <strong className="text-pink-400 font-mono font-bold">01721922927</strong></li>
                        <li>Enter Amount: <strong className="text-emerald-400 font-bold">৳{isDistrictSelected ? deliveryFee : 130}</strong> (Your Delivery Charge)</li>
                        <li>Enter Reference: <strong className="text-amber-300 font-bold">ROYMEN</strong></li>
                        <li>Complete the payment.</li>
                        <li>Save your <strong className="text-white font-bold">Transaction ID (TrxID)</strong>.</li>
                        <li>Enter your <strong className="text-white font-bold">Sender Mobile Number</strong> and <strong className="text-white font-bold">Transaction ID (TrxID)</strong> below to verify your payment.</li>
                      </ol>

                      <div className="pt-3 border-t border-pink-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Sender Mobile Number *</label>
                          <input
                            type="tel"
                            value={senderPhone}
                            onChange={e => setSenderPhone(e.target.value)}
                            placeholder="017XXXXXXXX"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Transaction ID (TrxID) *</label>
                          <input
                            type="text"
                            value={bkashTxnId}
                            onChange={e => setBkashTxnId(e.target.value)}
                            placeholder="e.g. 9J87XX12A"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500 uppercase font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COD sub-method Nagad instructions */}
                  {codSubMethod === 'Nagad' && (
                    <div className="p-4 bg-orange-950/20 border border-orange-500/30 rounded-xl text-xs space-y-3 text-orange-200">
                      <p className="font-bold text-xs text-orange-300">Nagad Delivery Charge Payment Steps</p>
                      <ol className="list-decimal list-inside text-xs space-y-1.5 text-zinc-300 leading-relaxed">
                        <li>Open the <strong className="text-orange-300 font-bold">Nagad App</strong> and select <strong className="text-white font-bold">Send Money</strong>.</li>
                        <li>Send Money Number: <strong className="text-orange-400 font-mono font-bold">01721922927</strong></li>
                        <li>Enter Amount: <strong className="text-emerald-400 font-bold">৳{isDistrictSelected ? deliveryFee : 130}</strong> (Your Delivery Charge)</li>
                        <li>Enter Reference: <strong className="text-amber-300 font-bold">ROYMEN</strong></li>
                        <li>Complete the payment.</li>
                        <li>Save your <strong className="text-white font-bold">Transaction ID (TrxID)</strong>.</li>
                        <li>Enter your <strong className="text-white font-bold">Sender Mobile Number</strong> and <strong className="text-white font-bold">Transaction ID (TrxID)</strong> below to verify your payment.</li>
                      </ol>

                      <div className="pt-3 border-t border-orange-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Sender Mobile Number *</label>
                          <input
                            type="tel"
                            value={senderPhone}
                            onChange={e => setSenderPhone(e.target.value)}
                            placeholder="017XXXXXXXX"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">Transaction ID (TrxID) *</label>
                          <input
                            type="text"
                            value={nagadTxnId}
                            onChange={e => setNagadTxnId(e.target.value)}
                            placeholder="e.g. 7N92XX88B"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 uppercase font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full font-black py-4 rounded-2xl text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 ${
                isFormValid && !isSubmitting
                  ? 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer shadow-amber-500/20'
                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-80'
              }`}
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
            {!isFormValid && (
              <div className="text-[11px] text-amber-400/90 text-center font-medium space-y-1">
                {!isDistrictSelected ? (
                  <p>* Please select a District to calculate delivery charge.</p>
                ) : !area.trim() ? (
                  <p>* Please enter your Thana / Area.</p>
                ) : paymentMethod === null ? (
                  <p>* Please select a Payment Method above to proceed.</p>
                ) : (!senderPhone.trim() || !activeTxnId.trim()) ? (
                  <p>* Please enter your Sender Mobile Number and Transaction ID (TrxID) to confirm payment.</p>
                ) : (
                  <p>* Please fill in all required shipping address and contact details.</p>
                )}
              </div>
            )}
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
                <span>Delivery Charge {isDistrictSelected ? `(${district}${isDhaka ? ` - ${dhakaZone}` : ''})` : ''}</span>
                <span className={isDistrictSelected ? "text-emerald-400 font-bold" : "text-zinc-500 italic"}>
                  {isDistrictSelected ? `৳${deliveryFee}` : 'Select District'}
                </span>
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
