import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [language, setLanguage] = useState('bn');
  const [showProfile, setShowProfile] = useState(false);
  
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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
    setShowProfile(false);
  };

  const products = [
    { id: 1, nameBn: "বরিশালের বিখ্যাত গাওয়া ঘি", nameEn: "Barishal Special Ghee", price: 1200, category: "food", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80", unit: "১ কেজি" },
    { id: 2, nameBn: "সুন্দরবনের খাঁটি মধু", nameEn: "Sundarban Honey", price: 750, category: "food", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&q=80", unit: "৫০০ গ্রাম" },
    { id: 3, nameBn: "টাটকা দেশি মুগ ডাল", nameEn: "Deshi Moog Dal", price: 140, category: "grocery", image: "https://images.unsplash.com/photo-1585998066829-70233b497672?w=500&q=80", unit: "১ কেজি" },
    { id: 4, nameBn: "অর্গানিক সরিষার তেল", nameEn: "Organic Mustard Oil", price: 220, category: "grocery", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80", unit: "১ লিটার" },
    { id: 5, nameBn: "হাতে ভাজা মুড়ি", nameEn: "Hand-roasted Muri", price: 90, category: "snacks", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&q=80", unit: "১ কেজি" },
    { id: 6, nameBn: "বরিশালের স্পেশাল নারিকেল নাড়ੂ", nameEn: "Coconut Naru", price: 300, category: "snacks", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80", unit: "৫০০ গ্রাম" },
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
      searchPlaceholder: "পণ্য খুঁজুন...",
      addToCart: "কারټে যোগ করুন",
      cart: "কার্ট",
      total: "মোট",
      checkout: "অর্ডার কনফার্ম করুন",
      emptyCart: "আপনার কার্ট খালি!",
      orderSuccessMsg: "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে! খুব শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।"
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
      searchPlaceholder: "Search products...",
      addToCart: "Add to Cart",
      cart: "Cart",
      total: "Total",
      checkout: "Confirm Order",
      emptyCart: "Your cart is empty!",
      orderSuccessMsg: "Your order has been placed successfully! We will contact you soon."
    }
  };

  const currentT = t[language];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) || p.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#18101B] pb-24">
      {!isLoggedIn && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-orange-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#D94E28]">{currentT.welcome}</h2>
              <p className="text-sm text-gray-600 mt-1">{currentT.subtitle}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{currentT.nameLabel}</label>
                <input 
                  type="text" 
                  required
                  placeholder={language === 'bn' ? "যেমন: রাহিম আহমেদ" : "e.g. Rahim Ahmed"} 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D94E28]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{currentT.phoneLabel}</label>
                <input 
                  type="tel" 
                  required
                  placeholder="01712345678" 
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D94E28]"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#D94E28] hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
              >
                {currentT.loginBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-center shadow-md flex items-center justify-center space-x-2">
        <span className="animate-bounce">📢</span>
        <p className="text-xs font-semibold">{currentT.offer}</p>
      </div>

      <header className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-lg font-bold text-[#D94E28]">{currentT.shopTitle}</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full border border-gray-300 transition-all"
          >
            {language === 'bn' ? 'English 🇬🇧' : 'বাংলা 🇧🇩'}
          </button>

          {isLoggedIn && (
            <button 
              onClick={() => setShowProfile(true)}
              className="flex items-center space-x-1 bg-orange-100 text-[#D94E28] px-2.5 py-1 rounded-full font-semibold text-xs shadow-sm hover:bg-orange-200 transition-all"
            >
              <span>👤</span>
              <span>{userName.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </header>

      {showProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 text-[#D94E28] rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
              {userName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{userName}</h3>
              <p className="text-sm text-gray-500">{userPhone}</p>
            </div>
            <div className="pt-2 space-y-2">
              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl transition-all text-sm"
              >
                {currentT.logout}
              </button>
              <button 
                onClick={() => setShowProfile(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-all text-sm"
              >
                {currentT.close}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="p-4 max-w-4xl mx-auto space-y-4">
        {/* Search bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder={currentT.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28] text-sm"
          />
          <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat.id 
                  ? 'bg-[#D94E28] text-white shadow-orange-200 shadow-md' 
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
                <div className="relative rounded-xl overflow-hiden mb-2 bg-gray-100 aspect-square">
                  <img src={product.image} alt={product.nameBn} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {product.unit}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-sm line-clamp-1">
                  {language === 'bn' ? product.nameBn : product.nameEn}
                </h3>
                <p className="text-[#D94E28] font-extrabold text-sm mt-0.5">৳ {product.price}</p>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-orange-50 hover:bg-[#D94E28] text-[#D94E28] hover:text-white font-bold py-2 rounded-xl text-xs transition-all border border-orange-100"
              >
                {currentT.addToCart}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto z-40">
          <button 
            onClick={() => setShowCartModal(true)}
            className="w-full bg-[#D94E28] hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl flex justify-between items-center transition-all"
          >
            <div className="flex items-center space-x-2">
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs">
                {cart.reduce((s, i) => s + i.qty, 0)} items
              </span>
              <span>{currentT.cart}</span>
            </div>
            <span>৳ {totalPrice} ➔</span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">{currentT.cart}</h3>
              <button onClick={() => setShowCartModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {orderSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="text-5xl">🎉</div>
                  <p className="text-sm font-semibold text-gray-700">{currentT.orderSuccessMsg}</p>
                  <button 
                    onClick={() => { setOrderSuccess(false); setCart([]); setShowCartModal(false); }}
                    className="mt-4 bg-[#D94E28] text-white px-6 py-2 rounded-xl text-sm font-bold"
                  >
                    {currentT.close}
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <p className="text-center text-gray-400 py-8">{currentT.emptyCart}</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <h4 className="font-bold text-xs text-gray-800">{language === 'bn' ? item.nameBn : item.nameEn}</h4>
                      <p className="text-[11px] text-[#D94E28] font-bold">৳ {item.price} x {item.qty}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border shadow-xs">
                      <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 font-bold px-1">-</button>
                      <span className="text-xs font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-[#D94E28] font-bold px-1">+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!orderSuccess && cart.length > 0 && (
              <div className="pt-4 border-t mt-4 space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span>{currentT.total}:</span>
                  <span className="text-[#D94E28]">৳ {totalPrice}</span>
                </div>
                <button 
                  onClick={() => setOrderSuccess(true)}
                  className="w-full bg-[#D94E28] hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  {currentT.checkout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
      }
