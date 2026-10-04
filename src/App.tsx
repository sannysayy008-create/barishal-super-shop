import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [language, setLanguage] = useState('bn');
  
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState('home'); // home, posts, cart, orders, admin
  
  // Shop & Products State
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin & Posts State
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<any[]>([
    { id: 1, title: "শনিবার বিশেষ অফার! ⚡", desc: "ফ্ল্যাট ২০% ছাড় ও ফ্রি ডেলিভারি যেকোনো অর্ডারে।", date: "২০২৬-১০-০৪", seller: "Admin" },
    { id: 2, title: "খাঁটি মধু ও গাওয়া ঘি স্টকে আছে", desc: "সুন্দরবনের খাঁটি মধু ও বরগুনার ঐতিহ্যবাহী ঘি এখন পাওয়া যাচ্ছে।", date: "২০২৬-১০-০৩", seller: "Admin" }
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('barishal_shop_user');
    setIsLoggedIn(false);
    setUserName('');
    setUserPhone('');
    setIsAdmin(false);
  };

  // Combined Products (Grocery, Food & Gadgets)
  const products = [
    { id: 1, nameBn: "বরিশালের বিখ্যাত গাওয়া ঘি", nameEn: "Barishal Special Ghee", price: 1200, category: "food", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80", unit: "১ কেজি", seller: "Admin" },
    { id: 2, nameBn: "সুন্দরবনের খাঁটি মধু", nameEn: "Sundarban Honey", price: 750, category: "food", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&q=80", unit: "৫০০ গ্রাম", seller: "Admin" },
    { id: 3, nameBn: "টাটকা দেশি মুগ ডাল", nameEn: "Deshi Moog Dal", price: 140, category: "grocery", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&q=80", unit: "১ কেজি", seller: "Admin" },
    { id: 4, nameBn: "অর্গানিক সরিষার তেল", nameEn: "Organic Mustard Oil", price: 220, category: "grocery", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80", unit: "১ লিটার", seller: "Admin" },
    { id: 5, nameBn: "লেদার জ্যাকেট", nameEn: "Leather Jacket", price: 2500, category: "fashion", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80", unit: "১ পিস", seller: "Admin" },
    { id: 6, nameBn: "স্মার্ট ওয়াচ", nameEn: "Smart Watch", price: 1850, category: "gadgets", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", unit: "১ পিস", seller: "Admin" }
  ];

  const categories = [
    { id: 'all', nameBn: 'সব পণ্য', nameEn: 'All Products' },
    { id: 'food', nameBn: 'খাঁটি খাবার', nameEn: 'Pure Foods' },
    { id: 'grocery', nameBn: 'মুদি বাজার', nameEn: 'Grocery' },
    { id: 'fashion', nameBn: 'ফ্যাশন', nameEn: 'Fashion' },
    { id: 'gadgets', nameBn: 'গ্যাজেট', nameEn: 'Gadgets' },
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    alert('পণ্যটি কার્টে যোগ করা হয়েছে!');
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
        date: new Date().toISOString().split('T')[0],
        seller: userName || "Admin"
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setNewPostDesc('');
      alert('বিজ্ঞাপন সফলভাবে পোস্ট করা হয়েছে!');
    }
  };

  const t: any = {
    bn: {
      welcome: "বরিশাল সুপার শপে স্বাগতম!",
      subtitle: "কেনাকাটা করতে আপনার নাম ও মোবাইল নম্বর দিয়ে প্রবেশ করুন",
      nameLabel: "আপনার নাম",
      phoneLabel: "মোবাইল নম্বর",
      loginBtn: "প্রবেশ করুন 🚀",
      shopTitle: "Barishal Super Shop",
      bannerTitle: "বরিশাল সুপার শপ অফিসিয়াল অ্যাপ",
      bannerSub: "এক ক্লিকে ডাউনলোড করুন এবং সহজে কেনাকাটা করুন!",
      installBtn: "⚡ দ্রুত ইনস্টল করুন (১৫ সেকেন্ডে ডাউনলোড)",
      sellerPost: "বিক্রেতা পোস্ট",
      adminBtn: "অ্যাডমিন",
      searchPlaceholder: "পণ্য খুঁজুন...",
      addToCart: "কার্টে নিন",
      cartTitle: "কার্ট",
      total: "মোট",
      checkout: "অর্ডার কনফার্ম করুন",
      emptyCart: "আপনার কার্ট খালি!",
      home: "হোম",
      postsTab: "বিক্রেতা পোস্ট",
      cartTab: "কার্ট",
      ordersTab: "অর্ডারস",
      adminTab: "অ্যাডমিন"
    },
    en: {
      welcome: "Welcome to Barishal Super Shop!",
      subtitle: "Enter your name and mobile number to start shopping",
      nameLabel: "Your Name",
      phoneLabel: "Mobile Number",
      loginBtn: "Login 🚀",
      shopTitle: "Barishal Super Shop",
      bannerTitle: "Barishal Super Shop Official App",
      bannerSub: "Download in one click and shop easily!",
      installBtn: "⚡ Quick Install (15s Download)",
      sellerPost: "Seller Post",
      adminBtn: "Admin",
      searchPlaceholder: "Search products...",
      addToCart: "Add to Cart",
      cartTitle: "Cart",
      total: "Total",
      checkout: "Confirm Order",
      emptyCart: "Your cart is empty!",
      home: "Home",
      postsTab: "Posts",
      cartTab: "Cart",
      ordersTab: "Orders",
      adminTab: "Admin"
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
                  placeholder="Fida Al Sani" 
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

      {/* Top Banner (App Download Style) */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 text-center shadow-md space-y-2">
        <h2 className="text-sm font-bold flex items-center justify-center space-x-1">
          <span>⚡</span>
          <span>{currentT.bannerTitle}</span>
        </h2>
        <p className="text-[11px] opacity-90">{currentT.bannerSub}</p>
        <button 
          onClick={() => alert('অ্যাপ ডাউনলোড শুরু হয়েছে!')}
          className="bg-white text-emerald-700 px-4 py-2 rounded-full text-xs font-bold shadow hover:bg-emerald-50 transition-all inline-block"
        >
          {currentT.installBtn}
        </button>
      </div>

      {/* Header bar */}
      <header className="p-3 bg-[#D94E28] text-white shadow-sm flex justify-between items-center">
        <h1 className="text-sm font-bold">{currentT.shopTitle}</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setActiveTab('posts')}
            className="bg-white/20 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1"
          >
            <span>📢</span>
            <span>{currentT.sellerPost}</span>
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className="bg-black/30 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1"
          >
            <span>⚙️</span>
            <span>{currentT.adminBtn}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 max-w-4xl mx-auto space-y-4">
        
        {/* TAB 1: HOME */}
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

            {/* Special Offer Alert Box */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-2xl shadow-sm space-y-1">
              <h3 className="text-xs font-bold">শনিবার বিশেষ অফার! ⚡</h3>
              <p className="text-[11px] opacity-90">ফ্ল্যাট ২০% ছাড় ও ফ্রি ডেলিভারি যেকোনো অর্ডারে।</p>
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
                    <p className="text-[10px] text-gray-400 mt-0.5">বিক্রেতা: {product.seller}</p>
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

        {/* TAB 2: POSTS */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-800 border-b pb-2">📢 বিক্রেতা ও অ্যাডমিন পোস্টসমূহ</h2>
            
            {/* Create Post Form */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-200 space-y-3">
              <h3 className="text-xs font-bold text-[#D94E28]">নতুন বিজ্ঞাপন বা পোস্ট দিন</h3>
              <form onSubmit={handleAddPost} className="space-y-2">
                <input 
                  type="text" 
                  placeholder="বিজ্ঞাপনের শিরোনাম" 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                  required
                />
                <textarea 
                  placeholder="বিস্তারিত বিবরণ..." 
                  value={newPostDesc}
                  onChange={(e) => setNewPostDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs h-20"
                  required
                ></textarea>
                <button type="submit" className="bg-[#D94E28] text-white px-4 py-2 rounded-xl text-xs font-bold">
                  পোস্ট পাবলিশ করুন
                </button>
              </form>
            </div>

            {/* Post Feed */}
            <div className="space-y-3">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs text-[#D94E28]">{post.title}</h3>
                    <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <p className="text-xs text-gray-600">{post.desc}</p>
                  <p className="text-[10px] text-gray-400 pt-1">পোস্টকারী: {post.seller}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CART */}
        {activeTab === 'cart' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b pb-2">{currentT.cartTitle}</h3>
            
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
                      <button onClick={() => updateQty(item.id, 1)} className="text-[#D94E28] font-bold px-1">+</button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{currentT.total}:</span>
                    <span className="text-[#D94E28]">৳ {totalPrice}</span>
                  </div>
                  <button 
                    onClick={() => { alert('অর্ডার সফলভাবে কনফার্ম হয়েছে!'); setCart([]); }}
                    className="w-full bg-[#D94E28] hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-xs"
                  >
                    {currentT.checkout}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-center py-10">
            <div className="text-4xl">📦</div>
            <h3 className="text-sm font-bold text-gray-800">আপনার কোনো অর্ডার নেই</h3>
            <p className="text-xs text-gray-500">হোম থেকে আপনার পছন্দের পণ্য অর্ডার করুন।</p>
          </div>
        )}

        {/* TAB 5: ADMIN */}
        {activeTab === 'admin' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-800 border-b pb-2">⚙️ অ্যাডমিন ও মডারেটর প্যানেল</h2>
            <div className="space-y-3 text-xs">
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 flex justify-between items-center">
                <span>মডারেটর স্ট্যাটাস: <b>সক্রিয় (Active)</b></span>
                <span className="text-green-600 font-bold">Online</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border">
                <p className="font-bold mb-1">ব্যবহারকারী তথ্য:</p>
                <p className="text-gray-600">নাম: {userName || "N/A"}</p>
                <p className="text-gray-600">ফোন: {userPhone || "N/A"}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.
