export type Currency = 'BDT';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  collection: string;
  description: string;
  shortDescription: string;
  price: number; // in BDT
  discountPrice?: number; // in BDT
  stock: number;
  lowStockAlert: number;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  bannerImage: string;
  description: string;
  itemCount: number;
  isFeatured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  district: string; // e.g. Dhaka, Chittagong, Sylhet, Rajshahi, etc.
  area: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  status: 'active' | 'blocked';
  createdAt: string;
  addresses: Address[];
}

export interface AdminAccount {
  adminId: string;
  name: string;
  email: string;
  passwordHash: string;
  secretCode: string;
  role: 'Super Admin' | 'Admin' | 'Manager' | 'Staff';
  status: 'active' | 'locked' | 'disabled';
  failedAttempts: number;
  lockedUntil?: string | null;
  lastLogin?: string;
  rememberToken?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'COD' | 'bKash' | 'Nagad' | 'SSLCommerz';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type CourierPartner = 'Pathao' | 'Steadfast' | 'RedX' | 'Paperfly';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  sku: string;
  selectedColor: string;
  selectedSize: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface Order {
  id: string; // e.g. ROY-2026-8492
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierPartner?: CourierPartner;
  createdAt: string;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // % or BDT value
  minSpend: number;
  usageLimit: number;
  usageCount: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'disabled';
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  verifiedBuyer: boolean;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  ctaText: string;
  position: 'hero' | 'middle' | 'sidebar' | 'flash_sale';
  order: number;
  status: 'active' | 'inactive';
}

export interface AnalyticsSummary {
  todayOrders: number;
  todayRevenue: number;
  monthlyRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalCustomers: number;
  totalProducts: number;
  inventoryValue: number;
  lowStockCount: number;
}

export interface VisitorLog {
  id: string;
  ip: string;
  device: string;
  path: string;
  timestamp: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'stock' | 'review' | 'user';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  adminUser: string;
  action: string;
  module: string;
  timestamp: string;
  details: string;
}

export interface ApiKey {
  id: string;
  clientName: string;
  key: string;
  role: 'read' | 'write' | 'admin';
  status: 'active' | 'revoked';
  createdAt: string;
}

export interface Settings {
  brandName: string;
  tagline: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  address: string;
  googleSheetId: string;
  googleWebAppUrl: string;
  autoSyncGoogleSheets: boolean;
  bkashMerchantNumber: string;
  nagadMerchantNumber: string;
}
