import {
  Product,
  Category,
  Brand,
  Collection,
  Banner,
  Coupon,
  Order,
  Review,
  Settings,
  User,
  AdminAccount,
  AuditLog,
  NotificationItem,
  ContactMessage,
  NewsletterSubscriber,
  ApiKey
} from '../types';

export const initialSettings: Settings = {
  brandName: 'ROYMEN',
  tagline: 'Wear Confidence.',
  currency: 'BDT',
  currencySymbol: '৳',
  taxRate: 0,
  deliveryInsideDhaka: 80,
  deliveryOutsideDhaka: 150,
  freeShippingThreshold: 5000,
  contactEmail: 'support@roymen.com.bd',
  contactPhone: '+880 1700-998877',
  address: 'Level 4, ROYMEN Atelier, Gulshan Avenue, Dhaka-1212, Bangladesh',
  googleSheetId: '1ROYMEN_ENTERPRISE_SHEET_MASTER_2026',
  googleWebAppUrl: 'https://script.google.com/macros/s/AKfycbx_ROYMEN_GAS_REST_API/exec',
  autoSyncGoogleSheets: true,
  bkashMerchantNumber: '01700998877',
  nagadMerchantNumber: '01800998877'
};

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: "Men's Apparel",
    slug: 'mens-apparel',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    itemCount: 24,
    description: 'Tailored suits, crisp oxford shirts, and refined trousers designed for the modern gentleman.'
  },
  {
    id: 'cat-2',
    name: 'Ethnic & Royal Panjabi',
    slug: 'ethnic-panjabi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    itemCount: 18,
    description: 'Bespoke silk, cotton viscose, and hand-embroidered Panjabis for weddings and festivities.'
  },
  {
    id: 'cat-3',
    name: 'Outerwear & Blazers',
    slug: 'outerwear-blazers',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    itemCount: 12,
    description: 'Structured wool blazers, leather coats, and trench coats crafted with precision.'
  },
  {
    id: 'cat-4',
    name: "Women's Couture",
    slug: 'womens-couture',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    itemCount: 15,
    description: 'Minimalist luxury gowns, silk dresses, and monochrome power suits.'
  },
  {
    id: 'cat-5',
    name: 'Luxury Accessories',
    slug: 'luxury-accessories',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop',
    itemCount: 30,
    description: 'Italian leather belts, silver cufflinks, luxury ties, and handcrafted leather wallets.'
  }
];

export const initialBrands: Brand[] = [
  {
    id: 'b-1',
    name: 'ROYMEN Signature',
    slug: 'roymen-signature',
    logo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200&auto=format&fit=crop',
    description: 'Our flagship line of luxury menswear and iconic everyday essentials.'
  },
  {
    id: 'b-2',
    name: 'ROYMEN Atelier',
    slug: 'roymen-atelier',
    logo: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=200&auto=format&fit=crop',
    description: 'Handcrafted bespoke couture and artisanal embroidery limited editions.'
  },
  {
    id: 'b-3',
    name: 'ROYMEN Urban',
    slug: 'roymen-urban',
    logo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=200&auto=format&fit=crop',
    description: 'Minimalist streetwear, monochrome hoodies, and architectural outerwear.'
  }
];

export const initialCollections: Collection[] = [
  {
    id: 'col-1',
    name: "Winter Atelier '26",
    slug: 'winter-atelier-26',
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    description: 'Heavyweight cashmere coats, double-breasted blazers, and luxury knitwear.',
    itemCount: 14,
    isFeatured: true
  },
  {
    id: 'col-2',
    name: 'Royal Panjabi Series',
    slug: 'royal-panjabi-series',
    bannerImage: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1200&auto=format&fit=crop',
    description: 'Pure Jamdani accents, raw silk fabrics, and gold zardozi collar embroidery.',
    itemCount: 10,
    isFeatured: true
  },
  {
    id: 'col-3',
    name: 'Monochromatic Formal',
    slug: 'monochromatic-formal',
    bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    description: 'High-contrast black, ivory, and charcoal boardroom attire.',
    itemCount: 16,
    isFeatured: true
  }
];

export const initialProducts: Product[] = [
  {
    id: 'p-101',
    name: 'ROYMEN Bespoke Black Tuxedo Suit',
    slug: 'roymen-bespoke-black-tuxedo-suit',
    sku: 'ROY-SUIT-001',
    barcode: '890123450001',
    category: "Men's Apparel",
    brand: 'ROYMEN Atelier',
    collection: 'Monochromatic Formal',
    description: 'Precision-tailored two-piece tuxedo crafted from Italian Super 150s wool with satin peak lapels. Designed for gala evenings, weddings, and formal executive summits.',
    shortDescription: 'Italian Super 150s Wool Tuxedo with Satin Peak Lapels.',
    price: 18500,
    discountPrice: 15990,
    stock: 12,
    lowStockAlert: 3,
    colors: [
      { name: 'Onyx Black', hex: '#0a0a0a' },
      { name: 'Midnight Blue', hex: '#0f172a' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    tags: ['Tuxedo', 'Suit', 'Wedding', 'Formal', 'Bespoke'],
    seoTitle: 'ROYMEN Bespoke Black Tuxedo Suit | Luxury Menswear Bangladesh',
    seoDescription: 'Shop the ROYMEN Bespoke Black Tuxedo Suit in Italian Super 150s wool. Free delivery in Dhaka.',
    featured: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-01-15'
  },
  {
    id: 'p-102',
    name: 'Royal Heritage Raw Silk Panjabi',
    slug: 'royal-heritage-raw-silk-panjabi',
    sku: 'ROY-PANJ-002',
    barcode: '890123450002',
    category: 'Ethnic & Royal Panjabi',
    brand: 'ROYMEN Signature',
    collection: 'Royal Panjabi Series',
    description: 'Pure handloom raw silk Panjabi with subtle tonal metallic embroidery on mandarin collar and placket. Includes custom ROYMEN engraved mother-of-pearl buttons.',
    shortDescription: 'Pure Handloom Raw Silk with Tonal Collar Embroidery.',
    price: 8900,
    discountPrice: 7490,
    stock: 25,
    lowStockAlert: 5,
    colors: [
      { name: 'Ivory White', hex: '#f8fafc' },
      { name: 'Imperial Gold', hex: '#d97706' },
      { name: 'Jet Black', hex: '#18181b' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
    ],
    tags: ['Panjabi', 'Silk', 'Eid', 'Wedding', 'Ethnic'],
    seoTitle: 'Royal Heritage Raw Silk Panjabi | ROYMEN Bangladesh',
    seoDescription: 'Handcrafted luxury raw silk Panjabi for men. Premium embroidery and comfortable tailor fit.',
    featured: true,
    status: 'active',
    rating: 4.8,
    reviewCount: 52,
    createdAt: '2026-01-20'
  },
  {
    id: 'p-103',
    name: 'Monochrome Cashmere Overcoat',
    slug: 'monochrome-cashmere-overcoat',
    sku: 'ROY-COAT-003',
    barcode: '890123450003',
    category: 'Outerwear & Blazers',
    brand: 'ROYMEN Atelier',
    collection: "Winter Atelier '26",
    description: 'Heavyweight cashmere-blend knee-length overcoat featuring horn buttons, clean notch lapel, and structured shoulder padding for an authoritative silhouette.',
    shortDescription: 'Heavyweight Cashmere Blend Knee-Length Overcoat.',
    price: 22000,
    discountPrice: 19500,
    stock: 8,
    lowStockAlert: 2,
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Pitch Black', hex: '#09090b' }
    ],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    tags: ['Coat', 'Cashmere', 'Winter', 'Luxury', 'Outerwear'],
    seoTitle: 'Monochrome Cashmere Overcoat | ROYMEN Winter Atelier',
    seoDescription: 'Order the ROYMEN Cashmere Overcoat. Premium insulation and timeless luxury design.',
    featured: true,
    status: 'active',
    rating: 5.0,
    reviewCount: 19,
    createdAt: '2026-01-10'
  },
  {
    id: 'p-104',
    name: 'Atelier Silk Minimalist Evening Dress',
    slug: 'atelier-silk-minimalist-evening-dress',
    sku: 'ROY-DRESS-004',
    barcode: '890123450004',
    category: "Women's Couture",
    brand: 'ROYMEN Atelier',
    collection: "Winter Atelier '26",
    description: 'Fluid Mulberry silk crepe gown with draped cowl neck and side split. Minimal luxury silhouette tailored to accentuate effortless elegance.',
    shortDescription: 'Mulberry Silk Crepe Gown with Draped Cowl Neck.',
    price: 14500,
    discountPrice: 12800,
    stock: 10,
    lowStockAlert: 3,
    colors: [
      { name: 'Noir', hex: '#111827' },
      { name: 'Champagne Silk', hex: '#e2e8f0' }
    ],
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
    ],
    tags: ['Couture', 'Dress', 'Women', 'Silk', 'Evening Wear'],
    seoTitle: 'Atelier Silk Evening Dress | ROYMEN Women Couture',
    seoDescription: 'Buy luxury Mulberry silk evening dress online in Bangladesh. Fast home delivery.',
    featured: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 24,
    createdAt: '2026-02-01'
  },
  {
    id: 'p-105',
    name: 'Minimalist Egyptian Cotton Oxford Shirt',
    slug: 'minimalist-egyptian-cotton-oxford-shirt',
    sku: 'ROY-SHIRT-005',
    barcode: '890123450005',
    category: "Men's Apparel",
    brand: 'ROYMEN Urban',
    collection: 'Monochromatic Formal',
    description: '100% Giza Egyptian long-staple cotton formal shirt with French seams and hidden button-down collar. Wrinkle-resistant finish.',
    shortDescription: '100% Giza Cotton Oxford Shirt with French Seams.',
    price: 3950,
    discountPrice: 3290,
    stock: 45,
    lowStockAlert: 10,
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Slate Gray', hex: '#64748b' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    images: [
      'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop'
    ],
    tags: ['Shirt', 'Cotton', 'Formal', 'Office', 'Monochrome'],
    seoTitle: 'Egyptian Cotton Oxford Shirt | ROYMEN Essential',
    seoDescription: 'Premium Egyptian cotton shirts for men in Bangladesh. Best office and formal wear.',
    featured: false,
    status: 'active',
    rating: 4.7,
    reviewCount: 88,
    createdAt: '2026-01-28'
  },
  {
    id: 'p-106',
    name: 'Italian Calfskin Reversible Belt',
    slug: 'italian-calfskin-reversible-belt',
    sku: 'ROY-BELT-006',
    barcode: '890123450006',
    category: 'Luxury Accessories',
    brand: 'ROYMEN Signature',
    collection: 'Monochromatic Formal',
    description: 'Handcrafted full-grain Italian leather belt with 360-degree rotating brushed gunmetal pin buckle. Reversible from Matte Black to Rich Mahogany.',
    shortDescription: 'Italian Full-Grain Leather Reversible Belt.',
    price: 2850,
    discountPrice: 2450,
    stock: 35,
    lowStockAlert: 5,
    colors: [
      { name: 'Black / Mahogany', hex: '#18181b' }
    ],
    sizes: ['32', '34', '36', '38', '40'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    tags: ['Belt', 'Leather', 'Accessories', 'Italian'],
    seoTitle: 'Italian Calfskin Reversible Belt | ROYMEN Accessories',
    seoDescription: 'Authentic Italian leather reversible belt with brushed gunmetal hardware.',
    featured: false,
    status: 'active',
    rating: 4.8,
    reviewCount: 41,
    createdAt: '2026-02-05'
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'ban-1',
    title: 'WEAR CONFIDENCE.',
    subtitle: 'THE WINTER ATELIER 2026 COLLECTION IS HERE.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop',
    linkUrl: '/category/mens-apparel',
    ctaText: 'EXPLORE COLLECTION',
    position: 'hero',
    order: 1,
    status: 'active'
  },
  {
    id: 'ban-2',
    title: 'ROYAL HERITAGE PANJABI',
    subtitle: 'Hand-embroidered silk couture for celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
    linkUrl: '/category/ethnic-panjabi',
    ctaText: 'DISCOVER PANJABI',
    position: 'middle',
    order: 2,
    status: 'active'
  }
];

export const initialCoupons: Coupon[] = [
  {
    id: 'coup-1',
    code: 'ROYMEN10',
    type: 'percentage',
    value: 10,
    minSpend: 3000,
    usageLimit: 500,
    usageCount: 142,
    expiryDate: '2026-12-31',
    status: 'active'
  },
  {
    id: 'coup-2',
    code: 'CONFIDENCE1000',
    type: 'fixed',
    value: 1000,
    minSpend: 10000,
    usageLimit: 100,
    usageCount: 28,
    expiryDate: '2026-12-31',
    status: 'active'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ROY-2026-9041',
    customerId: 'usr-101',
    customerName: 'Tanvir Hossain',
    customerEmail: 'tanvir.hossain@gmail.com',
    customerPhone: '+880 1712-345678',
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Tanvir Hossain',
      phone: '+880 1712-345678',
      addressLine: 'House 42, Road 11, Block D, Banani',
      district: 'Dhaka',
      area: 'Banani',
      isDefault: true
    },
    items: [
      {
        id: 'oi-1',
        orderId: 'ROY-2026-9041',
        productId: 'p-101',
        productName: 'ROYMEN Bespoke Black Tuxedo Suit',
        sku: 'ROY-SUIT-001',
        selectedColor: 'Onyx Black',
        selectedSize: '40R',
        price: 15990,
        quantity: 1,
        subtotal: 15990,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=200&auto=format&fit=crop'
      }
    ],
    subtotal: 15990,
    discount: 1000,
    couponCode: 'CONFIDENCE1000',
    deliveryFee: 80,
    total: 15070,
    paymentMethod: 'bKash',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    trackingNumber: 'PTH-BD-8849201',
    courierPartner: 'Pathao',
    createdAt: '2026-02-22T14:30:00Z',
    notes: 'Please call before delivery.'
  },
  {
    id: 'ROY-2026-9042',
    customerId: 'usr-102',
    customerName: 'Nusrat Jahan',
    customerEmail: 'nusrat.jahan@yahoo.com',
    customerPhone: '+880 1819-876543',
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Nusrat Jahan',
      phone: '+880 1819-876543',
      addressLine: 'Flat 4B, Green Luxury Villa, Nasirabad',
      district: 'Chittagong',
      area: 'Nasirabad',
      isDefault: true
    },
    items: [
      {
        id: 'oi-2',
        orderId: 'ROY-2026-9042',
        productId: 'p-102',
        productName: 'Royal Heritage Raw Silk Panjabi',
        sku: 'ROY-PANJ-002',
        selectedColor: 'Ivory White',
        selectedSize: 'L',
        price: 7490,
        quantity: 1,
        subtotal: 7490,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200&auto=format&fit=crop'
      }
    ],
    subtotal: 7490,
    discount: 749,
    couponCode: 'ROYMEN10',
    deliveryFee: 150,
    total: 6891,
    paymentMethod: 'COD',
    paymentStatus: 'pending',
    orderStatus: 'processing',
    trackingNumber: 'STD-CG-99201',
    courierPartner: 'Steadfast',
    createdAt: '2026-02-23T09:15:00Z'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'p-101',
    customerName: 'Rafiqul Islam',
    rating: 5,
    comment: 'Exceptional craftsmanship! The fit around shoulders and waist is equivalent toSavile Row bespoke tailoring. Received so many compliments at my corporate gala.',
    verifiedBuyer: true,
    date: '2026-02-18',
    status: 'approved'
  },
  {
    id: 'rev-2',
    productId: 'p-102',
    customerName: 'Ayman Sadiq',
    rating: 5,
    comment: 'The raw silk texture is rich and breathability is unmatched for Dhaka climate. Collar work is clean and regal.',
    verifiedBuyer: true,
    date: '2026-02-20',
    status: 'approved'
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-101',
    name: 'Tanvir Hossain',
    email: 'tanvir.hossain@gmail.com',
    phone: '+880 1712-345678',
    role: 'customer',
    status: 'active',
    createdAt: '2026-02-10',
    addresses: [
      {
        id: 'addr-1',
        fullName: 'Tanvir Hossain',
        phone: '+880 1712-345678',
        addressLine: 'House 42, Road 11, Block D, Banani',
        district: 'Dhaka',
        area: 'Banani',
        isDefault: true
      }
    ]
  }
];

export const initialAdmins: AdminAccount[] = [
  {
    adminId: 'ADM-000001',
    name: 'ROYMEN Executive Admin',
    email: 'admin@roymen.com.bd',
    passwordHash: 'roy_hash_Admin123!',
    secretCode: '889900',
    role: 'Super Admin',
    status: 'active',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '2026-02-24T00:00:00Z',
    rememberToken: '',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    adminId: 'ADM-000002',
    name: 'ROYMEN Operations Manager',
    email: 'manager@roymen.com.bd',
    passwordHash: 'roy_hash_Manager123!',
    secretCode: '776655',
    role: 'Manager',
    status: 'active',
    failedAttempts: 0,
    lockedUntil: null,
    lastLogin: '2026-02-20T10:00:00Z',
    rememberToken: '',
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    adminUser: 'admin@roymen.com.bd',
    action: 'SYSTEM_BOOT',
    module: '01_Settings',
    timestamp: '2026-02-24T00:00:00Z',
    details: 'ROYMEN Enterprise 20-Sheet Architecture Initialized Successfully.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'New High Value Order #ROY-2026-9041',
    message: 'Customer Tanvir Hossain placed order worth ৳15,070 via bKash.',
    read: false,
    timestamp: '2026-02-24T08:30:00Z'
  },
  {
    id: 'notif-2',
    type: 'stock',
    title: 'Low Stock Alert: ROYMEN Bespoke Tuxedo',
    message: 'Onyx Black 40R stock reached low threshold (3 remaining).',
    read: false,
    timestamp: '2026-02-24T07:12:00Z'
  }
];

export const initialNewsletters: NewsletterSubscriber[] = [
  { id: 'nl-1', email: 'vip.client@roymen.bd', subscribedAt: '2026-02-01', status: 'active' }
];

export const initialContacts: ContactMessage[] = [
  {
    id: 'cnt-1',
    name: 'Mahbubur Rahman',
    email: 'mahbub@corporate.bd',
    phone: '+880 1911-223344',
    subject: 'Bulk Corporate Order Inquiry',
    message: 'We require 50 custom embroidered blazers for our annual summit.',
    status: 'unread',
    createdAt: '2026-02-23T11:00:00Z'
  }
];

export const initialApiKeys: ApiKey[] = [
  {
    id: 'apk-1',
    clientName: 'Google Apps Script Auto-Sync Connector',
    key: 'roy_live_key_994821a8849b29c',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-01'
  }
];
