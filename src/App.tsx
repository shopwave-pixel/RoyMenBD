import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { StorageService } from './services/storageService';
import {
  Product,
  Category,
  Brand,
  Collection,
  CartItem,
  WishlistItem,
  User,
  Coupon,
  Order,
  ProductColor
} from './types';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SizeGuideModal } from './components/common/SizeGuideModal';

// Home Components
import { HeroBanner } from './components/home/HeroBanner';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { BrandStorySection } from './components/home/BrandStorySection';

// Shop Components
import { ProductCard } from './components/shop/ProductCard';
import { ProductQuickViewModal } from './components/shop/ProductQuickViewModal';
import { FilterSidebar } from './components/shop/FilterSidebar';
import { CartDrawer } from './components/shop/CartDrawer';
import { SearchModal } from './components/shop/SearchModal';
import { FlashSaleTimer } from './components/shop/FlashSaleTimer';

// Checkout & Account
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AuthModal } from './components/account/AuthModal';
import { AccountDashboard } from './components/account/AccountDashboard';

// Admin Panel
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview } from './components/admin/DashboardOverview';
import { ProductsManager } from './components/admin/ProductsManager';
import { OrdersManager } from './components/admin/OrdersManager';
import { GoogleSheetsSync } from './components/admin/GoogleSheetsSync';
import { AdminManagerTabs } from './components/admin/AdminManagerTabs';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('');
  const [selectedBrandName, setSelectedBrandName] = useState<string>('');
  const [selectedCollectionName, setSelectedCollectionName] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 30000]);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authNoticeMessage, setAuthNoticeMessage] = useState<string>('');
  const [pendingCheckoutAfterAuth, setPendingCheckoutAfterAuth] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Admin Tab State
  const [adminActiveTab, setAdminActiveTab] = useState<string>('overview');

  // Data & Local Persistence
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [categories] = useState<Category[]>(() => StorageService.getCategories());
  const [brands] = useState<Brand[]>(() => StorageService.getBrands());
  const [collections] = useState<Collection[]>(() => StorageService.getCollections());
  const [banners] = useState(() => StorageService.getBanners());

  const [cartItems, setCartItems] = useState<CartItem[]>(() => StorageService.getCart());
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => StorageService.getWishlist());
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sync cart to storage
  useEffect(() => {
    StorageService.saveCart(cartItems);
  }, [cartItems]);

  // Handle Add to Cart
  const handleAddToCart = (product: Product, color: ProductColor, size: string) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.productId === product.id && item.selectedColor.name === color.name && item.selectedSize === size
      );

      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity: 1,
          price: product.discountPrice || product.price
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  // Trigger mandatory authentication checkout flow
  const triggerCheckoutFlow = () => {
    if (!currentUser) {
      setAuthNoticeMessage('Please sign in to continue with your purchase.');
      setPendingCheckoutAfterAuth(true);
      setIsAuthOpen(true);
    } else {
      setCurrentView('checkout');
    }
  };

  // Handle Buy Now
  const handleBuyNow = (product: Product, color: ProductColor, size: string) => {
    handleAddToCart(product, color, size);
    triggerCheckoutFlow();
  };

  // Handle Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    const res = StorageService.toggleWishlist(product);
    setWishlistItems(res.wishlist);
  };

  // Navigation Handler
  const handleNavigate = (view: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'category' && param) {
      setSelectedCategorySlug(param);
      setCurrentView('shop');
    } else if (view === 'checkout') {
      triggerCheckoutFlow();
    } else {
      setCurrentView(view);
    }
  };

  // Filter Products
  const getFilteredProducts = () => {
    return products.filter(p => {
      if (selectedCategorySlug && p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') !== selectedCategorySlug && p.category !== selectedCategorySlug) {
        return false;
      }
      if (selectedBrandName && p.brand !== selectedBrandName) return false;
      if (selectedCollectionName && p.collection !== selectedCollectionName) return false;

      const effectivePrice = p.discountPrice || p.price;
      if (effectivePrice > priceRange[1]) return false;

      if (selectedSizeFilter && !p.sizes.includes(selectedSizeFilter)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      if (sortBy === 'price-high') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      if (sortBy === 'popular') return b.rating - a.rating;
      if (sortBy === 'discount') return ((b.price - (b.discountPrice || b.price)) - (a.price - (a.discountPrice || a.price)));
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const filteredProducts = getFilteredProducts();

  // If Admin View is active
  if (currentView === 'admin') {
    if (currentUser && currentUser.role === 'admin') {
      return (
        <AdminLayout
          activeTab={adminActiveTab}
          onTabChange={setAdminActiveTab}
          onCloseAdmin={() => setCurrentView('home')}
        >
          {adminActiveTab === 'overview' && <DashboardOverview onNavigateToTab={setAdminActiveTab} />}
          {adminActiveTab === 'products' && <ProductsManager />}
          {adminActiveTab === 'orders' && <OrdersManager />}
          {adminActiveTab === 'sheets-sync' && <GoogleSheetsSync />}
          {['coupons', 'reviews', 'banners', 'users', 'settings', 'analytics'].includes(adminActiveTab) && (
            <AdminManagerTabs activeTab={adminActiveTab} />
          )}
        </AdminLayout>
      );
    }

    // Access Denied for Customers or Unauthenticated Visitors
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Security Access Policy</span>
            <h2 className="text-2xl font-black font-serif text-white uppercase tracking-wider">Access Denied</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {currentUser
                ? `Logged in as customer (${currentUser.email}). Customer accounts do not have Administrator privileges.`
                : 'Administrator authentication required. Please enter your email address via Account Sign In.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider transition-colors shadow-lg"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-xl uppercase text-xs tracking-wider transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          noticeMessage={authNoticeMessage}
          onClose={() => {
            setIsAuthOpen(false);
            setAuthNoticeMessage('');
          }}
          onAuthSuccess={usr => {
            setCurrentUser(usr);
            setAuthNoticeMessage('');
            if (usr.role === 'admin') {
              setCurrentView('admin');
              setPendingCheckoutAfterAuth(false);
            } else if (pendingCheckoutAfterAuth) {
              setPendingCheckoutAfterAuth(false);
              setCurrentView('checkout');
            } else {
              setCurrentView('account');
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Header */}
      <Header
        currentUser={currentUser}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setCurrentView('wishlist')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <HeroBanner
              banner={banners[0] || {
                id: '1',
                title: 'WEAR CONFIDENCE',
                subtitle: 'WINTER ATELIER 2026',
                imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop',
                linkUrl: '',
                ctaText: '',
                position: 'hero',
                order: 1,
                status: 'active'
              }}
              onExplore={() => handleNavigate('shop')}
            />

            {/* Flash Sale Banner */}
            <FlashSaleTimer />

            {/* Featured Collections */}
            <FeaturedCollections
              collections={collections}
              categories={categories}
              onSelectCategory={(catSlug) => handleNavigate('category', catSlug)}
            />

            {/* Featured Products Grid */}
            <section className="py-20 bg-zinc-950 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Atelier Highlights</span>
                  <h2 className="text-3xl font-black font-serif uppercase text-white mt-1">Featured Best Sellers</h2>
                </div>
                <button
                  onClick={() => handleNavigate('shop')}
                  className="text-xs text-amber-400 hover:underline font-bold uppercase tracking-wider self-start sm:self-auto"
                >
                  View Full Catalog ({products.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={p => setQuickViewProduct(p)}
                    onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistItems.some(w => w.productId === product.id)}
                    onSelectProduct={p => {
                      setSelectedProduct(p);
                      setCurrentView('product-details');
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Brand Story Section */}
            <BrandStorySection />
          </div>
        )}

        {/* SHOP CATALOG VIEW */}
        {currentView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-zinc-800 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">ROYMEN Storefront</span>
              <h1 className="text-3xl sm:text-4xl font-black font-serif uppercase text-white mt-1">
                {selectedCategorySlug ? selectedCategorySlug.replace('-', ' ') : 'All Luxury Apparel'}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Showing {filteredProducts.length} items. Tailored with Italian fabrics for Bangladeshi climate.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-3">
                <FilterSidebar
                  categories={categories}
                  brands={brands}
                  collections={collections}
                  selectedCategory={selectedCategorySlug}
                  onSelectCategory={setSelectedCategorySlug}
                  selectedBrand={selectedBrandName}
                  onSelectBrand={setSelectedBrandName}
                  selectedCollection={selectedCollectionName}
                  onSelectCollection={setSelectedCollectionName}
                  priceRange={priceRange}
                  onChangePriceRange={setPriceRange}
                  selectedSize={selectedSizeFilter}
                  onSelectSize={setSelectedSizeFilter}
                  sortBy={sortBy}
                  onChangeSortBy={setSortBy}
                  onResetFilters={() => {
                    setSelectedCategorySlug('');
                    setSelectedBrandName('');
                    setSelectedCollectionName('');
                    setPriceRange([1000, 30000]);
                    setSelectedSizeFilter('');
                  }}
                />
              </div>

              {/* Product Grid */}
              <div className="lg:col-span-9">
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-3">
                    <h3 className="text-sm font-bold uppercase text-zinc-300">No matching products found</h3>
                    <p className="text-xs text-zinc-500">Try loosening your filters or price slider.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={p => setQuickViewProduct(p)}
                        onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistItems.some(w => w.productId === product.id)}
                        onSelectProduct={p => {
                          setSelectedProduct(p);
                          setCurrentView('product-details');
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT DETAILS VIEW */}
        {currentView === 'product-details' && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-bold uppercase text-zinc-400 hover:text-white flex items-center gap-1"
            >
              ← Back to Shop
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
                  <img src={selectedProduct.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">{selectedProduct.brand}</span>
                  <h1 className="text-3xl font-black font-serif text-white mt-1">{selectedProduct.name}</h1>
                  <span className="text-2xl font-black text-white mt-3 block">৳{(selectedProduct.discountPrice || selectedProduct.price).toLocaleString()}</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed border-t border-zinc-800 pt-4">
                  {selectedProduct.description}
                </p>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct, selectedProduct.colors[0], selectedProduct.sizes[0] || 'M')}
                    className="flex-1 bg-white hover:bg-amber-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider"
                  >
                    Add To Shopping Bag
                  </button>
                  <button
                    onClick={() => handleBuyNow(selectedProduct, selectedProduct.colors[0], selectedProduct.sizes[0] || 'M')}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider shadow-xl"
                  >
                    Express Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WISHLIST VIEW */}
        {currentView === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Saved Favorites</span>
              <h1 className="text-3xl font-black font-serif uppercase text-white mt-1">My Atelier Wishlist</h1>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="py-20 text-center bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-3">
                <h3 className="text-sm font-bold uppercase text-zinc-300">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-500">Heart items as you browse to save them for later.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-white text-black font-bold uppercase text-xs rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Explore Shop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item.product}
                    onQuickView={p => setQuickViewProduct(p)}
                    onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={true}
                    onSelectProduct={p => {
                      setSelectedProduct(p);
                      setCurrentView('product-details');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT VIEW */}
        {currentView === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            appliedCoupon={appliedCoupon}
            currentUser={currentUser}
            onBackToShop={() => setCurrentView('shop')}
            onOrderPlaced={(ord) => {
              setCartItems([]);
              setAppliedCoupon(null);
            }}
            onRequireAuth={() => {
              setAuthNoticeMessage('Please sign in to continue with your purchase.');
              setPendingCheckoutAfterAuth(true);
              setIsAuthOpen(true);
            }}
          />
        )}

        {/* ACCOUNT DASHBOARD VIEW */}
        {currentView === 'account' && currentUser && (
          <AccountDashboard
            currentUser={currentUser}
            onLogout={() => {
              StorageService.setCurrentUser(null);
              setCurrentUser(null);
              setCurrentView('home');
            }}
            onOpenShop={() => setCurrentView('shop')}
          />
        )}

        {/* BRAND STORY VIEW */}
        {currentView === 'brand-story' && (
          <div className="space-y-0">
            <BrandStorySection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, qty) => {
          if (qty <= 0) {
            setCartItems(prev => prev.filter(i => i.id !== id));
          } else {
            setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
          }
        }}
        onRemoveItem={id => setCartItems(prev => prev.filter(i => i.id !== id))}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          triggerCheckoutFlow();
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(coup, discount) => setAppliedCoupon(coup)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
        onBuyNow={(p, c, s) => handleBuyNow(p, c, s)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistItems.some(w => w.productId === quickViewProduct.id) : false}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={p => {
          setSelectedProduct(p);
          setCurrentView('product-details');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        noticeMessage={authNoticeMessage}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthNoticeMessage('');
        }}
        onAuthSuccess={usr => {
          setCurrentUser(usr);
          setAuthNoticeMessage('');
          if (usr.role === 'admin') {
            setCurrentView('admin');
            setPendingCheckoutAfterAuth(false);
          } else if (pendingCheckoutAfterAuth) {
            setPendingCheckoutAfterAuth(false);
            setCurrentView('checkout');
          } else {
            setCurrentView('account');
          }
        }}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
