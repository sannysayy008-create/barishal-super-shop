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
  Heart,
  LogOut,
  Settings,
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
import { AuthUtils } from './utils/auth';
import { DeliveryCalculator } from './utils/deliveryCalculator';

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

// Send notification via backend API (secure approach)
const sendNotification = async (messageText: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    await fetch(`${apiUrl}/api/notifications/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText }),
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUser, setCurrentUser] = useState(AuthUtils.getUser());
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
  ]);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_CHATS[0].id);
  const [wishlist, setWishlist] = useState<string[]>([]);

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
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (listingModeFilter !== 'all' && item.listingType !== listingModeFilter) {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedArea !== 'সব এলাকা' && item.area !== selectedArea) {
        return false;
      }
      if (priceFilter === 'under_2000' && item.price > 2000) return false;
      if (priceFilter === 'under_10000' && item.price > 10000) return false;
      if (priceFilter === 'under_50000' && item.price > 50000) return false;
      if (priceFilter === 'above_50000' && item.price <= 50000) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchArea = item.area.toLowerCase().includes(q);
        const matchCat = item.categoryLabel.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchArea || matchCat;
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

  const userPostedAds = useMemo(
    () => products.filter((p) => p.isUserPosted || p.listingType === 'classified'),
    [products]
  );

  // Handlers
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
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1400);
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

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handlePlaceOrder = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);

    // Send notification
    const orderMessage = `🛒 *নতুন অর্ডার!*\n👤 নাম: ${newOrder.customerName}\n📞 ফোন: ${newOrder.customerPhone}\n💰 মোট: ৳${newOrder.total}`;
    sendNotification(orderMessage);
  };

  const handleAddNewAd = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveTab('home');
    setSelectedCategory('all');
    setListingModeFilter(newProduct.listingType);
  };

  const handleStartChatWithSeller = (product: ProductItem) => {
    setSelectedProduct(null);
    const existing = chatThreads.find((t) => t.productId === product.id);
    if (existing) {
      setActiveChatId(existing.id);
      setChatThreads((prev) =>
        prev.map((t) => (t.id === existing.id ? { ...t, unreadCount: 0 } : t))
      );
    } else {
      const newThread: ChatThread = {
        id: `chat-${Date.now()}`,
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        productPrice: product.price,
        sellerName: product.seller.name,
        sellerId: product.seller.id,
        sellerPhone: product.seller.phone,
        sellerArea: product.area,
        listingType: product.listingType,
        unreadCount: 0,
        messages: [
          {
            id: `m-${Date.now()}`,
            sender: 'seller',
            text: `আসসালামু আলাইকুম! "${product.title}" সম্পর্কে আপনার কোনো প্রশ্ন থাকলে এখানে লিখুন।`,
            timestamp: 'এইমাত্র',
          },
        ],
      };
      setChatThreads((prev) => [newThread, ...prev]);
      setActiveChatId(newThread.id);
    }
    setActiveTab('chat');
  };

  const handleSendMessage = (threadId: string, text: string) => {
    const buyerMsg = {
      id: `msg-${Date.now()}`,
      sender: 'buyer' as const,
      text,
      timestamp: 'এইমাত্র',
    };

    setChatThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, unreadCount: 0, messages: [...t.messages, buyerMsg] }
          : t
      )
    );

    // Contextual automated seller response
    setTimeout(() => {
      setChatThreads((prev) =>
        prev.map((t) => {
          if (t.id !== threadId) return t;
          const replyText =
            t.listingType === 'ecommerce'
              ? `ধন্যবাদ আপনার বার্তার জন্য! পণ্যটি আমাদের স্টকে রেডি আছে। আপনি চাইলে আজই অর্ডার করতে পারেন।`
              : `জি ভাই, পণ্যটি এখনো আছে। আপনি চাইলে ${t.sellerArea}-এ এসে সরাসরি দেখে কিনতে পারেন।`;

          return {
            ...t,
            messages: [
              ...t.messages,
              {
                id: `msg-reply-${Date.now()}`,
                sender: 'seller',
                text: replyText,
                timestamp: 'এইমাত্র',
              },
            ],
          };
        })
      );
    }, 600);
  };

  const handleToggleSoldAd = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, soldOut: !p.soldOut } : p))
    );
  };

  const handleDeleteAd = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    const flow: OrderRecord['status'][] = [
      'অর্ডার গৃহীত',
      'প্যাকিং চলছে',
      'ডেলিভারির পথে',
      'সম্পন্ন',
    ];
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const idx = flow.indexOf(o.status);
        const next = flow[Math.min(flow.length - 1, idx + 1)];
        return { ...o, status: next };
      })
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLogin = (email: string, password: string) => {
    const user = AuthUtils.mockLogin(email, password);
    setCurrentUser(user);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    AuthUtils.logout();
    setCurrentUser(null);
    setActiveTab('home');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedArea('সব এলাকা');
    setPriceFilter('all');
    setListingModeFilter('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#18181B] pb-20">
      {/* 1-Click Customer App Download Bar */}
      <QuickAppDownloadBanner />

      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        listingModeFilter={listingModeFilter}
        setListingModeFilter={setListingModeFilter}
        cartCount={totalCartItems}
        unreadChatCount={unreadChatCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPostAd={() => setIsPostAdOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {activeTab === 'home' && (
          <>
            {/* Hero Promotional Banner Slider */}
            <HeroBanner
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onOpenPostAd={() => setIsPostAdOpen(true)}
            />

            {/* Category Grid & Search/Filter Bar */}
            <section className="space-y-5">
              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`min-h-[64px] p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isActive
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-white text-stone-800 border-stone-200/90 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            isActive ? 'text-[#D94E28]' : 'text-stone-500'
                          }
                        >
                          {CATEGORY_ICONS[cat.id]}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-bold whitespace-nowrap truncate">
                          {cat.nameBn}
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isActive ? 'text-stone-300' : 'text-stone-400'
                          }`}
                        >
                          {cat.subBn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Search & Filters */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/90 space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Search Input */}
                  <div className="md:col-span-5 relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="পণ্য বা এলাকার নাম লিখে খুঁজুন..."
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#D94E28]"
                    />
                  </div>

                  {/* Area Filter */}
                  <div className="md:col-span-3 relative">
                    <MapPin className="w-4 h-4 text-[#D94E28] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      aria-label="এলাকা নির্বাচন করুন"
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value as BarishalArea)}
                      className="w-full h-11 pl-9 pr-3 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-white focus:outline-none focus:border-[#D94E28]"
                    >
                      {BARISHAL_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div className="md:col-span-4 relative">
                    <SlidersHorizontal className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      aria-label="মূল্য নির্বাচন করুন"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
                      className="w-full h-11 pl-9 pr-3 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-white focus:outline-none focus:border-[#D94E28]"
                    >
                      <option value="all">সকল বাজেট</option>
                      <option value="under_2000">৳২,০০০ এর নিচে</option>
                      <option value="under_10000">৳১০,০০০ এর নিচে</option>
                      <option value="under_50000">৳৫০,০০০ এর নিচে</option>
                      <option value="above_50000">৳৫০,০০০ এর উপরে</option>
                    </select>
                  </div>
                </div>

                {/* Listing Mode Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setListingModeFilter('all')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        listingModeFilter === 'all'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      সব তালিকা ({toBengaliNumber(products.length)})
                    </button>
                    <button
                      type="button"
                      onClick={() => setListingModeFilter('ecommerce')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        listingModeFilter === 'ecommerce'
                          ? 'bg-white text-[#D94E28] shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      দারাজ স্টাইল
                    </button>
                    <button
                      type="button"
                      onClick={() => setListingModeFilter('classified')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        listingModeFilter === 'classified'
                          ? 'bg-white text-teal-800 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      ক্লাসিফাইড
                    </button>
                  </div>

                  {(searchQuery ||
                    selectedCategory !== 'all' ||
                    selectedArea !== 'সব এলাকা' ||
                    priceFilter !== 'all' ||
                    listingModeFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs font-semibold text-[#D94E28] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>রিসেট করুন</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Product Grid */}
            <section className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                    পণ্য সমূহ
                  </h2>
                  <p className="text-xs text-stone-500">
                    মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য পাওয়া গেছে
                  </p>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
                  <p className="text-base font-semibold text-stone-800">
                    পণ্য পাওয়া যায়নি
                  </p>
                  <p className="text-xs text-stone-500">
                    অন্য ফিল্টার চেষ্টা করুন।
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    সব পণ্য দেখুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isAdded = recentlyAddedId === product.id;
                    const isWishlisted = wishlist.includes(product.id);

                    return (
                      <article
                        key={product.id}
                        className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {/* Product Image */}
                        <div
                          onClick={() => setSelectedProduct(product)}
                          className="cursor-pointer flex-1 flex flex-col"
                        >
                          <div className="aspect-[4/3] w-full bg-[#F9F9F8] overflow-hidden relative border-b border-stone-100">
                            <SafeImage
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleWishlist(product.id);
                              }}
                              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm hover:bg-stone-100 transition-colors"
                            >
                              <Heart
                                className={`w-5 h-5 ${
                                  isWishlisted
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-stone-400'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                                <span
                                  className={
                                    product.listingType === 'ecommerce'
                                      ? 'font-semibold text-[#D94E28]'
                                      : 'font-semibold text-teal-700'
                                  }
                                >
                                  {product.listingType === 'ecommerce'
                                    ? 'অফিশিয়াল শপ'
                                    : 'ক্লাসিফাইড'}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{product.categoryLabel}</span>
                                <span aria-hidden="true">·</span>
                                <span>{product.area}</span>
                              </div>

                              <h3 className="text-base font-semibold text-stone-900 line-clamp-2 group-hover:text-[#D94E28] transition-colors leading-snug">
                                {product.title}
                              </h3>
                            </div>

                            {/* Price & Rating */}
                            <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between gap-2">
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-lg font-bold text-stone-900 tabular-nums">
                                  {formatTaka(product.price)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-xs text-stone-400 line-through tabular-nums">
                                    {formatTaka(product.originalPrice)}
                                  </span>
                                )}
                              </div>

                              <div className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 shrink-0">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                <span className="tabular-nums">
                                  {toBengaliNumber(product.rating)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-4 pb-4 pt-1 flex items-center gap-2">
                          {product.listingType === 'ecommerce' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product, 1)}
                                className="flex-1 min-h-[42px] px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-4 h-4 text-amber-300" />
                                    <span>যোগ হয়েছে</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    <span>কার্টে যোগ করুন</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedProduct(product)}
                                className="min-h-[42px] px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
                              >
                                বিস্তারিত
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleStartChatWithSeller(product)}
                                className="flex-1 min-h-[42px] px-3 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>বিক্রেতার সাথে চ্যাট</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedProduct(product)}
                                className="min-h-[42px] px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
                              >
                                তথ্য
                              </button>
                            </>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === 'chat' && (
          <ChatView
            threads={chatThreads}
            activeThreadId={activeChatId}
            onSelectThread={(id) => {
              setActiveChatId(id);
              setChatThreads((prev) =>
                prev.map((t) => (t.id === id ? { ...t, unreadCount: 0 } : t))
              );
            }}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'profile' && (
          <UserDashboard
            currentUser={currentUser}
            orders={orders}
            userAds={userPostedAds}
            onOpenPostAd={() => setIsPostAdOpen(true)}
            onToggleSoldAd={handleToggleSoldAd}
            onDeleteAd={handleDeleteAd}
            onAdvanceOrderStatus={handleAdvanceOrderStatus}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-6 px-4 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© ২০২৬ বরিশাল সুপার শপ — সর্বস্বত্ব সংরক্ষিত।</span>
          <span>সদর রোড · নথুল্লাবাদ · রূপাতলী · চৌমাথা</span>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartItems}
        unreadChatCount={unreadChatCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPostAd={() => setIsPostAdOpen(true)}
      />

      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onStartChat={handleStartChatWithSeller}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={() =>
          selectedProduct && handleToggleWishlist(selectedProduct.id)
        }
      />

      {/* Post Ad Modal */}
      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
        onAddProduct={handleAddNewAd}
        currentUser={currentUser}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
        currentUser={currentUser}
      />

      {/* PWA Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
}
