import React, { useState, useEffect } from 'react';
import { LoginModal } from './components/LoginModal';

export function App() {
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const handleLoginSuccess = (userData: { name: string; phone: string }) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showLoginModal && <LoginModal onSuccess={handleLoginSuccess} />}

      <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-bold">বরিশাল সুপার শপ</h1>
        {user && <span className="text-sm bg-green-700 px-3 py-1 rounded-full">👤 {user.name}</span>}
      </header>

      {/* আপনার বাকী অ্যাপ কোড */}
    </div>
  );
}
import React, { useMemo, useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  SlidersHorizontal,
  ShoppingCart,
  MessageSquare,
  Smartphone,
  Shirt,
  ShoppingBasket,
  Tv,
  Recycle,
  Bike,
  LayoutGrid,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  BARISHAL_AREAS,
  CATEGORIES,
  INITIAL_CHATS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  formatTaka,
  toBengaliNumber,
} from './data/mockData';
import {
  BarishalArea,
  CartItem,
  CategoryId,
  ChatThread,
  OrderRecord,
  ProductItem,
} from './types';
import { ActiveTab, Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroBanner } from './components/HeroBanner';
import { SafeImage } from './components/SafeImage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PostAdModal } from './components/PostAdModal';
import { CartDrawer } from './components/CartDrawer';
import { ChatView } from './components/ChatView';
import { UserDashboard } from './components/UserDashboard';
import { OfflineIndicator, QuickAppDownloadBanner } from './components/PWAInstallButton';

type PriceFilter = 'all' | 'under_2000' | 'under_10000' | 'under_50000' | 'above_50000';

const CATEGORY_ICONS: Record<CategoryId, React.ReactNode> = {
  all: <LayoutGrid className="w-5 h-5" />,
  electronics: <Tv className="w-5 h-5" />,
  fashion: <Shirt className="w-5 h-5" />,
  grocery: <ShoppingBasket className="w-5 h-5" />,
  mobile: <Smartphone className="w-5 h-5" />,
  used_items: <Recycle className="w-5 h-5" />,
  vehicles: <Bike className="w-5 h-5" />,
};

// সরাসরি টেলিগ্রাম এপিআইতে ডাটা পাঠানোর সরলীকৃত ফাংশন
const sendTelegramNotification = (order: OrderRecord) => {
  const BOT_TOKEN = "8685426962:AAF5HuKvQd_oeT2YZVMSI4vueLaF89r5F0M";
  const CHAT_ID = "8633414899";

  const name = order?.customerName || 'N/A';
  const phone = order?.phone || 'N/A';
  const address = order?.address || 'N/A';
  const total = order?.totalAmount || 0;

  const text = `🛒 নতুন অর্ডার এসেছে!\n\n👤 নাম: ${name}\n📞 ফোন: ${phone}\n📍 ঠিকানা: ${address}\n💰 মোট টাকা: ৳${total}`;

  // URL Encode করে নোটিফিকেশন সেন্ড
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log("Telegram Result:", data))
    .catch((err) => console.error("Telegram Error:", err));
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
  ]);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHATS);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedArea, setSelectedArea] = useState<BarishalArea>('সব এলাকা');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [listingModeFilter, setListingModeFilter] = useState<'all' | 'ecommerce' | 'classified'>('all');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (listingModeFilter !== 'all' && item.listingType !== listingModeFilter) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedArea !== 'সব এলাকা' && item.area !== selectedArea) return false;
      if (priceFilter === 'under_2000' && item.price > 2000) return false;
      if (priceFilter === 'under_10000' && item.price > 10000) return false;
      if (priceFilter === 'under_50000' && item.price > 50000) return false;
      if (priceFilter === 'above_50000' && item.price <= 50000) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.area.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, listingModeFilter, selectedCategory, selectedArea, priceFilter, searchQuery]);

  const totalCartItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const unreadChatCount = useMemo(
    () => chatThreads.reduce((sum, t) => sum + t.unreadCount, 0),
    [chatThreads]
  );

  const handleAddToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleBuyNow = (product: ProductItem, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handlePlaceOrder = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);

    // সঙ্গে সঙ্গে টেলিগ্রাম নোটিফিকেশন ট্রিগার
    sendTelegramNotification(newOrder);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      <OfflineIndicator />
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        listingModeFilter={listingModeFilter}
        setListingModeFilter={setListingModeFilter}
        cartCount={totalCartItems}
        unreadChatCount={unreadChatCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPostAd={() => setIsPostAdOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-4 space-y-6">
        <HeroBanner
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenPostAd={() => setIsPostAdOpen(true)}
        />
        <QuickAppDownloadBanner />

        {/* Categories */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-800">ক্যাটাগরি</h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md scale-105'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
                }`}
              >
                {CATEGORY_ICONS[cat.id]}
                <span className="text-xs font-medium mt-1.5 text-center line-clamp-1">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-800">পণ্যসমূহ</h2>
            <span className="text-sm text-stone-500">
              মোট: {toBengaliNumber(filteredProducts.length)} টি
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div
                  className="cursor-pointer relative"
                  onClick={() => setSelectedProduct(product)}
                >
                  <SafeImage
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-bold text-stone-800 line-clamp-2 mt-1 text-sm">
                      {product.title}
                    </h3>
                    <p className="text-amber-600 font-bold mt-2 text-base">
                      {formatTaka(product.price)}
                    </p>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    কার্টে রাখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {isPostAdOpen && (
        <PostAdModal
          onClose={() => setIsPostAdOpen(false)}
          onAddProduct={(newProd) => setProducts((prev) => [newProd, ...prev])}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onPlaceOrder={handlePlaceOrder}
      />

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadChatCount={unreadChatCount}
      />
    </div>
  );
    }
