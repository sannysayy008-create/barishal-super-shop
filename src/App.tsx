import React, { useState } from 'react';

type Role = 'customer' | 'moderator' | 'admin';

type Product = {
  name: string;
  price: number;
  image: string;
  discount?: string;
};

type Post = {
  title: string;
  price: string;
  desc: string;
  seller: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // =========================
  // LANGUAGE
  // =========================
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const text = {
    bn: {
      search: 'পণ্য বা বিজ্ঞাপন খুঁজুন...',
      searchBtn: 'Search',
      home: 'For You',
      messages: 'Messages',
      cart: 'Cart',
      account: 'Account',
      login: 'লগইন / সাইন আপ',
      phone: 'মোবাইল নাম্বার দিন',
      password: 'পাসওয়ার্ড',
      loginBtn: 'প্রবেশ করুন',
      logout: 'লগআউট',
      flash: 'Flash Sale ⚡',
      shopMore: 'Shop More >',
      add: 'Add',
      ads: '📢 ব্যবহারকারীদের বিজ্ঞাপনসমূহ',
      order: '📦 সরাসরি অর্ডার করুন',
      productName: 'পণ্যের নাম লিখুন',
      name: 'আপনার নাম',
      address: 'পূর্ণ ঠিকানা',
      confirm: 'অর্ডার কনফার্ম করুন',
      cartTitle: '🛍️ শপিং কার্ট',
      emptyCart: 'আপনার কার্ট খালি রয়েছে।',
      post: '📌 নতুন বিজ্ঞাপন পোস্ট করুন',
      publish: 'বিজ্ঞাপন পাবলিশ করুন',
      title: 'পণ্যের শিরোনাম',
      price: 'দাম (যেমন: ৳৫০০)',
      description: 'পণ্যের বিস্তারিত বিবরণ...',
      admin: '👑 Admin Panel',
      moderator: '🛡️ Moderator Panel',
      customer: '👤 Customer',
      role: 'আপনার Role',
      products: 'পণ্য',
      orders: 'অর্ডার',
      users: 'ইউজার',
      offers: 'অফার',
      stock: 'স্টক',
      dashboard: 'Dashboard',
      telegram: 'টেলিগ্রাম চ্যাট ও নোটিফিকেশন',
    },
    en: {
      search: 'Search products or ads...',
      searchBtn: 'Search',
      home: 'For You',
      messages: 'Messages',
      cart: 'Cart',
      account: 'Account',
      login: 'Login / Sign Up',
      phone: 'Mobile number',
      password: 'Password',
      loginBtn: 'Login',
      logout: 'Logout',
      flash: 'Flash Sale ⚡',
      shopMore: 'Shop More >',
      add: 'Add',
      ads: '📢 User Advertisements',
      order: '📦 Direct Order',
      productName: 'Product name',
      name: 'Your name',
      address: 'Full address',
      confirm: 'Confirm Order',
      cartTitle: '🛍️ Shopping Cart',
      emptyCart: 'Your cart is empty.',
      post: '📌 Create Advertisement',
      publish: 'Publish Advertisement',
      title: 'Product title',
      price: 'Price',
      description: 'Product description...',
      admin: '👑 Admin Panel',
      moderator: '🛡️ Moderator Panel',
      customer: '👤 Customer',
      role: 'Your Role',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
      offers: 'Offers',
      stock: 'Stock',
      dashboard: 'Dashboard',
      telegram: 'Telegram Chat & Notification',
    },
  }[language];

  // =========================
  // AUTH
  // =========================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [role, setRole] = useState<Role>('customer');

  // =========================
  // CART
  // =========================
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // =========================
  // POSTS
  // =========================
  const [posts, setPosts] = useState<Post[]>([
    {
      title: 'স্মার্ট ওয়াচ প্রিমিয়াম এডিশন',
      price: '৳১৫০০',
      desc: 'দারুণ লুকিং স্মার্ট ওয়াচ।',
      seller: 'রকিবুল ইসলাম',
    },
  ]);

  const [postTitle, setPostTitle] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postDesc, setPostDesc] = useState('');

  // =========================
  // ORDER
  // =========================
  const [orderProduct, setOrderProduct] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // =========================
  // ADMIN STATES
  // =========================
  const [adminSection, setAdminSection] = useState('dashboard');

  // =========================
  // PRODUCTS
  // =========================
  const products: Product[] = [
    {
      name: 'ব্যাকপ্যাক ব্যাগ',
      price: 580,
      discount: '-54%',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=60',
    },
    {
      name: 'ওয়্যারলেস এয়ারবাডস',
      price: 365,
      discount: '-70%',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=60',
    },
    {
      name: 'মিক্সড কালার বীজ',
      price: 33,
      discount: '-65%',
      image:
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&auto=format&fit=crop&q=60',
    },
  ];

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (item: Product) => {
    setCartItems([...cartItems, item]);
    alert(`"${item.name}" কার্টে যোগ করা হয়েছে!`);
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authPhone.trim() || !authPass.trim()) {
      alert('মোবাইল নাম্বার এবং পাসওয়ার্ড দিন।');
      return;
    }

    /*
      DEMO ROLE LOGIN

      Demo Admin:
      Phone: admin
      Password: admin

      Demo Moderator:
      Phone: moderator
      Password: moderator

      অন্য যেকোনো তথ্য = Customer
    */

    if (authPhone === 'admin' && authPass === 'admin') {
      setRole('admin');
    } else if (
      authPhone === 'moderator' &&
      authPass === 'moderator'
    ) {
      setRole('moderator');
    } else {
      setRole('customer');
    }

    setIsLoggedIn(true);
    alert('সফলভাবে লগইন হয়েছে!');
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setIsLoggedIn(false);
    setRole('customer');
    setAuthPhone('');
    setAuthPass('');
    setActiveTab('home');
  };

  // =========================
  // CREATE POST
  // =========================
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!postTitle || !postPrice) {
      alert('শিরোনাম ও দাম দিন।');
      return;
    }

    const newAd: Post = {
      title: postTitle,
      price: postPrice,
      desc: postDesc,
      seller: authPhone || 'গ্রাহক',
    };

    setPosts([newAd, ...posts]);

    setPostTitle('');
    setPostPrice('');
    setPostDesc('');

    alert('আপনার বিজ্ঞাপন সফলভাবে পাবলিশ হয়েছে!');
    setActiveTab('home');
  };

  // =========================
  // TELEGRAM ORDER
  // =========================
  const handleTelegramOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const chatId = '8633414899';

    const message =
      `🚨 নতুন অর্ডার এসেছে!\n\n` +
      `🛍️ পণ্য: ${orderProduct}\n` +
      `👤 নাম: ${buyerName}\n` +
      `📞 ফোন: ${buyerPhone}\n` +
      `📍 ঠিকানা: ${buyerAddress}`;

    console.log('Telegram ID:', chatId);
    console.log(message);

    setOrderSuccess(true);
  };

  // =========================
  // ADMIN PANEL
  // =========================
  const AdminPanel = () => {
    const isAdmin = role === 'admin';

    return (
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white p-4 rounded-xl shadow">
          <h2 className="font-extrabold text-lg">
            {isAdmin ? text.admin : text.moderator}
          </h2>

          <p className="text-xs mt-1">
            {text.role}: {role.toUpperCase()}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <div className="text-2xl">📦</div>
            <p className="text-xs text-gray-500">{text.orders}</p>
            <p className="font-bold text-lg">24</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow text-center">
            <div className="text-2xl">🛍️</div>
            <p className="text-xs text-gray-500">{text.products}</p>
            <p className="font-bold text-lg">128</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow text-center">
            <div className="text-2xl">👥</div>
            <p className="text-xs text-gray-500">{text.users}</p>
            <p className="font-bold text-lg">356</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow text-center">
            <div className="text-2xl">🏷️</div>
            <p className="text-xs text-gray-500">{text.offers}</p>
            <p className="font-bold text-lg">12</p>
          </div>
        </div>

        {/* Admin Menu */}
        <div className="bg-white rounded-xl shadow p-3">
          <h3 className="font-bold text-sm text-pink-600 mb-2">
            ⚙️ Management
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setAdminSection('products')}
              className="bg-gray-100 rounded-lg p-3 text-xs font-bold"
            >
              🛍️ {text.products}
            </button>

            <button
              onClick={() => setAdminSection('orders')}
              className="bg-gray-100 rounded-lg p-3 text-xs font-bold"
            >
              📦 {text.orders}
            </button>

            <button
              onClick={() => setAdminSection('stock')}
              className="bg-gray-100 rounded-lg p-3 text-xs font-bold"
            >
              📊 {text.stock}
            </button>

            <button
              onClick={() => setAdminSection('offers')}
              className="bg-gray-100 rounded-lg p-3 text-xs font-bold"
            >
              🏷️ {text.offers}
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => setAdminSection('users')}
                  className="bg-gray-100 rounded-lg p-3 text-xs font-bold"
                >
                  👥 {text.users}
                </button>

                <button
                  onClick={() => setAdminSection('ads')}
                  className="bg-gray-100 rounded-lg p-3 text-xs font-bold"
                >
                  📢 Ads
                </button>
              </>
            )}
          </div>
        </div>

        {/* Management Content */}
        <div className="bg-white rounded-xl shadow p-4">
          {adminSection === 'dashboard' && (
            <div className="text-center py-5">
              <div className="text-4xl">📊</div>
              <h3 className="font-bold mt-2">
                {text.dashboard}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                আপনার দোকানের সব তথ্য এখানে পরিচালনা করুন।
              </p>
            </div>
          )}

          {adminSection === 'products' && (
            <div>
              <h3 className="font-bold text-sm mb-3">
                🛍️ Product Management
              </h3>

              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2 text-xs"
                >
                  <span>{product.name}</span>
                  <span className="font-bold text-pink-600">
                    ৳{product.price}
                  </span>
                </div>
              ))}

              <button
                onClick={() =>
                  alert('নতুন Product যোগ করার ফর্ম এখানে আসবে।')
                }
                className="w-full mt-3 bg-pink-600 text-white py-2 rounded-lg font-bold text-xs"
              >
                ➕ নতুন পণ্য যোগ করুন
              </button>
            </div>
          )}

          {adminSection === 'orders' && (
            <div>
              <h3 className="font-bold text-sm mb-3">
                📦 Order Management
              </h3>

              {[
                'অর্ডার #1001',
                'অর্ডার #1002',
                'অর্ডার #1003',
              ].map((order) => (
                <div
                  key={order}
                  className="border rounded-lg p-3 mb-2 text-xs"
                >
                  <div className="flex justify-between">
                    <b>{order}</b>
                    <span className="text-orange-500">
                      Processing
                    </span>
                  </div>

                  <p className="text-gray-500 mt-1">
                    কাস্টমার অর্ডার
                  </p>
                </div>
              ))}
            </div>
          )}

          {adminSection === 'stock' && (
            <div>
              <h3 className="font-bold text-sm mb-3">
                📊 Stock Management
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span>ব্যাকপ্যাক ব্যাগ</span>
                  <b>45 pcs</b>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>এয়ারবাডস</span>
                  <b>28 pcs</b>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>বীজ</span>
                  <b>63 pcs</b>
                </div>
              </div>
            </div>
          )}

          {adminSection === 'offers' && (
            <div className="text-center py-4">
              <div className="text-3xl">🏷️</div>
              <h3 className="font-bold text-sm mt-2">
                Offer Management
              </h3>

              <button
                onClick={() =>
                  alert('নতুন অফার তৈরি করার ফর্ম এখানে আসবে।')
                }
                className="mt-3 bg-pink-600 text-white px-4 py-2 rounded text-xs font-bold"
              >
                ➕ নতুন অফার
              </button>
            </div>
          )}

          {adminSection === 'users' && isAdmin && (
            <div>
              <h3 className="font-bold text-sm mb-3">
                👥 User Management
              </h3>

              <div className="space-y-2 text-xs">
                <div className="border rounded p-2">
                  👤 Customer — Active
                </div>

                <div className="border rounded p-2">
                  🛡️ Moderator — Active
                </div>

                <div className="border rounded p-2">
                  👑 Admin — Active
                </div>
              </div>
            </div>
          )}

          {adminSection === 'ads' && isAdmin && (
            <div className="text-center py-4">
              <div className="text-3xl">📢</div>
              <h3 className="font-bold text-sm mt-2">
                Advertisement Management
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Banner, বিজ্ঞাপন ও Promotional Content পরিচালনা করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 font-sans bg-gray-100 text-gray-900 max-w-md mx-auto shadow-xl relative">

      {/* =========================
          TOP BAR
      ========================= */}
      <div className="bg-pink-600 p-2.5 sticky top-0 z-30 shadow-md">

        <div className="flex items-center gap-2">

          <div className="relative w-full flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">

            <input
              type="text"
              placeholder={text.search}
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full text-xs text-black outline-none pr-6 bg-transparent"
            />

            <span className="text-gray-500 text-sm">
              🔍
            </span>
          </div>

          <button
            onClick={() =>
              alert(`Search: ${searchQuery}`)
            }
            className="bg-pink-700 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-pink-400"
          >
            {text.searchBtn}
          </button>

        </div>

        <div className="flex justify-between text-[10px] text-white mt-2 px-1 font-medium">
          <span>💳 Safe Payment</span>
          <span>🚚 Fast Delivery</span>
          <span>🔄 Free Return</span>
        </div>

        {/* Language Button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={() =>
              setLanguage(language === 'bn' ? 'en' : 'bn')
            }
            className="bg-white text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold shadow"
          >
            {language === 'bn'
              ? '🇬🇧 English'
              : '🇧🇩 বাংলা'}
          </button>
        </div>
      </div>

      {/* =========================
          MAIN
      ========================= */}
      <main className="p-2 space-y-3">

        {/* HOME */}
        {activeTab === 'home' && (
          <div>

            {/* Categories */}
            <div className="grid grid-cols-5 gap-1 text-center text-[10px] bg-white p-2 rounded-xl shadow-sm mb-3">

              <div className="p-1">
                <div className="bg-yellow-400 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">
                  🪙
                </div>
                <span className="mt-1 block">Coins</span>
              </div>

              <div className="p-1">
                <div className="bg-orange-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">
                  CHOICE
                </div>
                <span className="mt-1 block">Choice</span>
              </div>

              <div className="p-1">
                <div className="bg-purple-600 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">
                  📱
                </div>
                <span className="mt-1 block">Mobile</span>
              </div>

              <div className="p-1">
                <div className="bg-pink-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">
                  🎁
                </div>
                <span className="mt-1 block">Freebie</span>
              </div>

              <div className="p-1">
                <div className="bg-red-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">
                  BUY
                </div>
                <span className="mt-1 block">
                  Save More
                </span>
              </div>

            </div>

            {/* FLASH SALE */}
            <div className="bg-white p-2 rounded-xl shadow-sm mb-3">

              <div className="flex justify-between items-center mb-2">

                <span className="font-extrabold text-xs text-pink-600">
                  {text.flash}
                </span>

                <span className="text-[11px] text-gray-500 font-medium">
                  {text.shopMore}
                </span>

              </div>

              <div className="grid grid-cols-3 gap-2">

                {products.map((product, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-1 relative text-center bg-gray-50"
                  >

                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bol
