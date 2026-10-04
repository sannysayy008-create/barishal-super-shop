import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [language, setLanguage] = useState('bn');
  
  // Tabs & Navigation State
  const [activeTab, setActiveTab] = useState('home'); // home, messages, deals, cart, account
  const [showProfile, setShowProfile] = useState(false);
  
  // Shop & Admin State
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Admin / Posts State
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<any[]>([
    { id: 1, title: "ঈদ ধামাকা অফার - সব পণ্যে ২০% ছাড়!", date: "২০২৬-০৬-০৭", desc: "আমাদের শপের যেকোনো পণ্যে পাচ্ছেন আকর্ষনীয় ছাড়।" },
    { id: 2, title: "নতুন খাঁটি মধু ও ঘি এসেছে", date: "২০২৬-০৬-০৫", desc: "সুন্দরবনের খাঁটি মধু ও বরগুনার গাওয়া ঘি এখন স্টকে আছে।" }
  ]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDesc, setNewPostDesc] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('barishal_shop_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.name) {
          setUserName(parsedUser.name);
          setUserPhone(parsedUser.phone || '');
          setIsLoggedIn(true);
          // যদি ইউজার sanny07077 বা admin হয় তবে অ্যাডমিন এক্সেস দিতে পারেন
          if (parsedUser.name.toLowerCase().includes('admin') || parsedUser.phone === '01700000000') {
            setIsAdmin(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (userName.trim() && userPhone.trim()) {
      const userData = { name: userName, phone: userPhone };
      localStorage.setItem('barishal_shop_user', JSON.stringify(userData));
      setIsLoggedIn(true);
      if (userName.toLowerCase().includes('admin')) {
        setIsAdmin(true);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('barishal_shop_user');
    setIsLoggedIn(false);
    setUserName('');
    setUserPhone('');
    setIsAdmin(false);
    setShowProfile(false);
  };

  const products = [
    { id: 1, nameBn: "বরিশালের বিখ্যাত গাওয়া ঘি", nameEn: "Barishal Special Ghee", price: 1200, category: "food", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80", unit: "১ কেজি" },
    { id: 2, nameBn: "সুন্দরবনের খাঁটি মধু", nameEn: "Sundarban Honey", price: 750, category: "food", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&q=80", unit: "৫০০ গ্রাম" },
    { id: 3, nameBn: "টাটকা দেশি মুগ ডাল", nameEn: "Deshi Moog Dal", price: 140, category: "grocery", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&q=80", unit: "১ কেজি" },
    { id: 4, nameBn: "অর্গানিক সরিষার তেল", nameEn: "Organic Mustard Oil", price: 220, category: "grocery", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80", unit: "১ লিটার" },
    { id: 5, nameBn: "হাতে ভাজা মুড়ি", nameEn: "Hand-roasted Muri", price: 90, category: "snacks", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&q=80", unit: "১ কেজি" },
    { id: 6, nameBn: "বরিশালের স্পেশাল নারিকেল নাড়ু", nameEn: "Coconut Naru", price: 300, category: "snacks", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80", unit: "৫০০ গ্রাম" },
  ];

  const categories = [
    { id: 'all', nameBn: 'সব পণ্য', nameEn: 'All Products' },
    { id: 'food', nameBn: 'খাঁটি খাবার', nameEn: 'Pure Foods' },
    { id: 'grocery', nameBn: 'মুদি বাজার', nameEn: 'Grocery' },
    { id: 'snacks', nameBn: 'নাস্তা ও মিষ্টি', nameEn: 'Snacks & Sweets' },
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleAddPost = (e: any) => {
    e.preventDefault();
    if (newPostTitle && newPostDesc) {
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
        desc: newPostDesc,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setNewPostDesc('');
      alert('বিজ্ঞাপন বা পোস্ট সফলভাবে পাবলিশ হয়েছে!');
    }
  };

  const t: any = {
    bn: {
      welcome: "বরিশাল সুপার শপে স্বাগতম!",
      subtitle: "কেনাকাটা করতে আপনার নাম ও মোবাইল নম্বর দিয়ে প্রবেশ করুন",
      nameLabel: "আপনার নাম",
      phoneLabel: "মোবাইল নম্বর",
      loginBtn: "প্রবেশ করুন 🚀",
      shopTitle: "বরিশাল সুপার শপ",
      offer: "বিশেষ অফার: যেকোনো অর্ডারে পাচ্ছেন আকর্ষণীয় ছাড় ও দ্রুত হোম ডেলিভারি!",
      profile: "প্রোফাইল",
      logout: "লগআউট",
      close: "বন্ধ করুন",
      searchPlaceholder: "পণ্য বা অফার খুঁজুন...",
      addToCart: "কার্টে যোগ করুন",
      cart: "কার্ট",
      total: "মোট",
      checkout: "অর্ডার কনফার্ম করুন",
      emptyCart: "আপনার কার্ট খালি!",
      orderSuccessMsg: "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!",
      myOrders: "আমার অর্ডারসমূহ",
      toPay: "পেমেন্ট বাকি",
      toShip: "প্রস্তুত হচ্ছে",
      toReceive: "পথে আছে",
      toReview: "রিভিউ",
      returns: "রিটার্ন",
      adminPanel: "অ্যাডমিন ও মডারেটর প্যানেল",
      createPost: "নতুন পোস্ট বা বিজ্ঞাপন তৈরি করুন",
      postTitle: "বিজ্ঞাপনের শিরোনাম",
      postDesc: "বিস্তারিত বিবরণ",
      publishBtn: "পাবলিশ করুন",
      coins: "শপ কয়েন",
      vouchers: "ভাউচার",
      home: "হোম",
      messages: "মেসেজ",
      deals: "অফার",
      account: "একাউন্ট"
    },
    en: {
      welcome: "Welcome to Barishal Super Shop!",
      subtitle: "Enter your name and mobile number to start shopping",
      nameLabel: "Your Name",
      phoneLabel: "Mobile Number",
      loginBtn: "Login 🚀",
      shopTitle: "Barishal Super Shop",
      offer: "Special Offer: Get exciting discounts and fast home delivery on any order!",
      profile: "Profile",
      logout: "Logout",
      close: "Close",
      searchPlaceholder: "Search products or posts...",
      addToCart: "Add to Cart",
      cart: "Cart",
      total: "Total",
      checkout: "Confirm Order",
      emptyCart: "Your cart is empty!",
      orderSuccessMsg: "Your order has been placed successfully!",
      myOrders: "My Orders",
      toPay: "To Pay",
      toShip: "To Ship",
      toReceive: "To Receive",
      toReview: "To Review",
      returns: "Returns",
      adminPanel: "Admin & Moderator Panel",
      createPost: "Create New Post or Ad",
      postTitle: "Post Title",
      postDesc: "Description",
      publishBtn: "Publish",
      coins: "Shop Coins",
      vouchers: "Vouchers",
      home: "Home",
      messages: "Messages",
      deals: "Deals",
      account: "Account"
    }
  };

  const currentT = t[language];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) || p.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#18101B] pb-24">
      {/* Login Modal */}
      {!isLoggedIn && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-orange-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 text-[#D94E28] rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3 shadow-inner">
                🛒
              </div>
              <h2 className="text-2xl font-bold text-[#D94E28]">{currentT.welcome}</h2>
              <p className="text-xs text-gray-500 mt-1">{currentT.subtitle}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{currentT.nameLabel}</label>
                <input 
                  type="text" 
                  required
                  placeholder={language === 'bn' ? "যেমন: Fida Al Sani" : "e.g. Fida Al Sani"} 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D94E28] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{currentT.phoneLabel}</label>
                <input 
                  type="tel" 
                  required
                  placeholder="01712345678" 
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D94E28] text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#D94E28] hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm"
              >
                {currentT.loginBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-center shadow-md flex items-center justify-center space-x-2">
        <span className="animate-bounce">📢</span>
        <p className="text-[11px] font-semibold">{currentT.offer}</p>
      </div>

      {/* Header */}
      <header className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-base font-bold text-[#D94E28]">{currentT.shopTitle}</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1 text-[11px] font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full border border-gray-300 transition-all"
          >
            {language === 'bn' ? 'English 🇬🇧' : 'বাংলা 🇧🇩'}
          </button>

          {isLoggedIn && (
            <button 
              onClick={() => setActiveTab('account')}
              className="flex items-center space-x-1 bg-orange-50 text-[#D94E28] px-2.5 py-1 rounded-full font-bold text-xs shadow-xs border border-orange-200"
            >
              <span>👤</span>
              <span className="max-w-[80px] truncate">{userName}</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Container based on Tab */}
      <main className="p-4 max-w-4xl mx-auto space-y-4">
        
        {/* ================= TAB 1: HOME ================= */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder={currentT.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28] text-xs"
              />
              <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
            </div>

            {/* Daraz Style Coins & Vouchers Widget */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl border border-orange-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold">🪙 {currentT.coins}</p>
                  <h4 className="text-sm font-extrabold text-[#D94E28]">৯৯% Off Coins</h4>
                </div>
                <span className="text-xs bg-[#D94E28] text-white px-2 py-1 rounded-lg font-bold">Use</span>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold">🎟️ {currentT.vouchers}</p>
                  <h4 className="text-sm font-extrabold text-purple-600">Free Delivery</h4>
                </div>
                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-lg font-bold">Get</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all shadow-xs ${
                    selectedCategory === cat.id 
                      ? 'bg-[#D94E28] text-white shadow-orange-200' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="relative rounded-xl overflow-hidden mb-2 bg-gray-100 aspect-square">
                      <img src={product.image} alt={product.nameBn} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {product.unit}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-xs line-clamp-1">
                      {language === 'bn' ? product.nameBn : product.nameEn}
                    </h3>
                    <p className="text-[#D94E28] font-extrabold text-xs mt-1">৳ {product.price}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full bg-orange-50 hover:bg-[#D94E28] text-[#D94E28] hover:text-white font-bold py-2 rounded-xl text-[11px] transition-all border border-orange-100"
                  >
                    {currentT.addToCart}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: MESSAGES & POSTS ================= */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-800 border-b pb-2">📢 শপের পোস্ট ও বিজ্ঞাপন (Announcements)</h2>
            
            {/* Admin Post Creator Box */}
            {isAdmin && (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-200 space-y-3">
                <h3 className="text-xs font-bold text-[#D94E28]">{currentT.createPost}</h3>
                <form onSubmit={handleAddPost} className="space-y-2">
                  <input 
                    type="text" 
                    placeholder={currentT.postTitle}
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                    required
                  />
                  <textarea 
                    placeholder={currentT.postDesc}
                    value={newPostDesc}
                    onChange={(e) => setNewPostDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs h-20"
                    required
                  ></textarea>
                  <button type="submit" className="bg-[#D94E28] text-white px-4 py-2 rounded-xl text-xs font-bold">
                    {currentT.publishBtn}
                  </button>
                </form>
              </div>
            )}

            {/* Posts List */}
            <div className="space-y-3">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs text-[#D94E28]">{post.title}</h3>
                    <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <p className="text-xs text-gray-600">{post.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DEALS & OFFERS ================= */}
        {activeTab === 'deals' && (
          <div className="space-y-4 text-center py-10">
            <div className="text-5xl">🔥</div>
            <h2 className="text-lg font-bold text-gray-800">ফ্ল্যাশ সেল ও হট ডিলস</h2>
            <p className="text-xs text-gray-500">প্রতিদিন দুপুর ১২টায় থাকছে আকর্ষনীয় ডিসকাউন্ট অফার!</p>
            <div className="bg-orange-100 text-[#D94E28] p-4 rounded-2xl font-bold text-xs inline-block">
              ⏳ ডিল শুরু হতে বাকী: ০৩ ঘণ্টা ১২ মিনিট
            </div>
          </div>
        )}

        {/* ================= TAB 4: CART ================= */}
        {activeTab === 'cart' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b pb-2">{currentT.cart}</h3>
            
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 py-10 text-xs">{currentT.emptyCart}</p>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <h4 className="font-bold text-xs text-gray-800">{language === 'bn' ? item.nameBn : item.nameEn}</h4>
                      <p className="text-[11px] text-[#D94E28] font-bold">৳ {item.price} x {item.qty}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border">
                      <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 font-bold px-1">-</button>
                      <span className="text-xs font-bold">{item.qty}</span>
      
