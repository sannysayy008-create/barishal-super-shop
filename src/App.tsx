import React, { useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
}

export function App() {
  // 🔴 এখানে @BotFather থেকে পাওয়া টোকেনটি বসান
  const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN_HERE";
  
  // 🟢 আপনার দেওয়া Chat ID
  const TELEGRAM_CHAT_ID = "8633414899";

  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // User Role State: 'user' | 'admin' | 'moderator'
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'moderator'>('user');

  // Customer Profile State
  const [customerName, setCustomerName] = useState<string>(() => localStorage.getItem('cust_name') || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => localStorage.getItem('cust_phone') || '');
  const [customerAddress, setCustomerAddress] = useState<string>(() => localStorage.getItem('cust_address') || '');

  // Settings State
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Auto save profile data
  const saveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('cust_name', customerName);
    localStorage.setItem('cust_phone', customerPhone);
    localStorage.setItem('cust_address', customerAddress);
    alert('প্রোফাইল তথ্য সংরক্ষণ করা হয়েছে!');
  };

  // Products State
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      title: 'হেয়ার ট্রিমার (T9)', 
      price: 253, 
      originalPrice: 430, 
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300'
    },
    { 
      id: 2, 
      title: 'নাগা মরীচ বীজ', 
      price: 43, 
      originalPrice: 150, 
      category: 'groceries',
      image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300'
    },
    { 
      id: 3, 
      title: 'গোল্ডেন ব্রেসলেট', 
      price: 159, 
      originalPrice: 390, 
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300'
    },
    { 
      id: 4, 
      title: 'ব্লুটুথ স্পিকার', 
      price: 779, 
      originalPrice: 950, 
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300'
    }
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Post Ad State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('electronics');

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  // Admin Functionality
  const deleteProduct = (id: number) => {
    if (window.confirm('আপনি কি নিশ্চিত এই পণ্যটি ডিলিট করতে চান?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  // 📩 টেলিগ্রাম বটে অর্ডার পাঠানোর ফংশন
  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে আপনার নাম, নম্বর ও ঠিকানা লিখুন।');
      return;
    }

    const itemsList = cartItems.map((item) => `• ${item.title} - ৳${item.price}`).join('\n');
    
    const telegramMessage = 
`🛒 *নতুন অর্ডার এসেছে!*

👤 *গ্রাহকের নাম:* ${customerName}
📞 *ফোন নম্বর:* ${customerPhone}
🏠 *ঠিকানা:* ${customerAddress}

📦 *অর্ডারকৃত পণ্যসমূহ:*
${itemsList}

💰 *সর্বমোট:* ৳${totalPrice}`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });

      alert(`ধন্যবাদ ${customerName}! আপনার অর্ডারটি গ্রহণ করা হয়েছে।`);
      setCartItems([]);
      setActiveTab('home');
    } catch (error) {
      console.error(error);
      alert('অর্ডার পাঠাতে সমস্যা হয়েছে। আপনার Bot Token সঠিক আছে কিনা চেক করুন।');
    }
  };

  const handlePostAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    
    const priceNum = Number(newPrice);
    const newProd: Product = {
      id: Date.now(),
      title: newTitle,
      price: priceNum,
      originalPrice: priceNum + 100,
      category: newCategory,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    };

    setProducts([newProd, ...products]);
    alert('বিজ্ঞাপন পোস্ট করা হয়েছে!');
    setActiveTab('home');
    setNewTitle('');
    setNewPrice('');
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen pb-20 font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* নেভিগেশন হেডার */}
      <div className="bg-pink-600 p-3 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 rounded-full text-black text-sm outline-none"
          />
          <button 
            onClick={() => setActiveTab('cart')}
            className="relative p-2 bg-pink-700 rounded-full text-lg"
          >
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        {activeTab === 'home' && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1 max-w-md mx-auto text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
                selectedCategory === 'all' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
              }`}
            >
              সব পণ্য
            </button>
            <button
              onClick={() => setSelectedCategory('electronics')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
                selectedCategory === 'electronics' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
              }`}
            >
              ইলেকট্রনিক্স
            </button>
            <button
              onClick={() => setSelectedCategory('fashion')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
                selectedCategory === 'fashion' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
              }`}
            >
              ফ্যাশন
            </button>
            <button
              onClick={() => setSelectedCategory('groceries')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
                selectedCategory === 'groceries' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
              }`}
            >
              মুদি ও খাদ্য
            </button>
          </div>
        )}
      </div>

      {/* মেইন কন্টেন্ট এলাকা */}
      <main className="max-w-md mx-auto p-3 space-y-4">
        
        {/* রোল ইন্ডিকেটর ব্যানার */}
        {userRole !== 'user' && (
          <div className={`p-2 rounded-xl text-center text-xs font-bold ${userRole === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
            {userRole === 'admin' ? '👑 এডমিন মোড সক্রিয়' : '🛡️ মডারেটর মোড সক্রিয়'}
          </div>
        )}

        {/* হোম পেইজ */}
        {activeTab === 'home' && (
          <>
            {/* ব্যানার */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
              <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">SALE</span>
              <h2 className="text-xl font-extrabold mt-1">বরিশাল সুপার শপ</h2>
              <p className="text-xs mt-1 opacity-90">দ্রুত ডেলিভারি সুবিধা!</p>
              <div className="mt-3 flex gap-2">
                <button 
                  onClick={() => setActiveTab('cart')}
                  className="bg-white text-pink-600 px-3 py-1.5 rounded-xl font-bold text-xs"
                >
                  কার্ট দেখুন
                </button>
                <button 
                  onClick={() => setActiveTab('post')}
                  className="bg-black/20 text-white px-3 py-1.5 rounded-xl font-semibold text-xs border border-white/30"
                >
                  + ফ্রি বিজ্ঞাপন দিন
                </button>
              </div>
            </div>

            {/* প্রোডাক্ট গ্রিড */}
            <div className={`p-3 rounded-2xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="grid grid-cols-2 gap-2">
                {filteredProducts.map((product) => (
                  <div key={product.id} className={`border rounded-xl p-2 shadow-sm relative ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'}`}>
                    
                    {/* Admin Delete Button */}
                    {userRole === 'admin' && (
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10"
                      >
                        ডিলিট 🗑️
                      </button>
                    )}

                    <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-xs font-semibold line-clamp-1">{product.title}</h4>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-pink-600 font-bold text-sm">৳{product.price}</span>
                      <span className="text-gray-400 text-[10px] line-through">৳{product.originalPrice}</span>
                    </div>

                    {userRole === 'moderator' ? (
                      <button
                        onClick={() => alert(`মডারেটর একশন: ${product.title} ফ্ল্যাগড করা হয়েছে।`)}
                        className="w-full mt-2 bg-blue-600 text-white py-1 rounded-lg text-xs font-bold"
                      >
                        রিভিউ করুন
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full mt-2 bg-pink-600 text-white py-1 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                      >
                        কার্টে রাখুন
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* কার্ট পেইজ */}
        {activeTab === 'cart' && (
          <div className={`p-4 rounded-2xl shadow-sm space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold border-b pb-2 text-base">আপনার শপিং কার্ট</h3>
            {cartItems.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>আপনার কার্ট খালি!</p>
                <button onClick={() => setActiveTab('home')} className="mt-3 bg-pink-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold">
                  কেনাকাটা করুন
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center text-xs p-2.5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span>{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-pink-600">৳{item.price}</span>
                        <button onClick={() => removeFromCart(idx)} className="text-red-500 font-bold px-1">✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 flex justify-between font-bold text-sm">
                  <span>মোট টাকা:</span>
                  <span className="text-pink-600">৳{totalPrice}</span>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-2 pt-2 border-t mt-3">
                  <h4 className="text-xs font-semibold text-gray-500">ডেলিভারির তথ্য</h4>
                  <input
                    type="text"
                    placeholder="আপনার নাম"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full border rounded-lg p-2 text-xs outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                  />
                  <input
                    type="tel"
                    placeholder="মোবাইল নম্বর"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={`w-full border rounded-lg p-2 text-xs outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                  />
                  <textarea
                    placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className={`w-full border rounded-lg p-2 text-xs outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                    rows={2}
                  />
                  <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md">
                    অর্ডার কনফার্ম করুন
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* পোস্ট বিজ্ঞাপন পেইজ */}
        {activeTab === 'post' && (
          <div className={`p-4 rounded-2xl shadow-sm space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold border-b pb-2 text-base">নতুন বিজ্ঞাপন দিন</h3>
            <form onSubmit={handlePostAd} className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">পণ্যের নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: স্মার্টওয়াচ"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">দাম (৳)</label>
                <input
                  type="number"
                  required
                  placeholder="যেমন: ১২০০"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">ক্যাটাগরি</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={`w-full border rounded-lg p-2 text-sm mt-1 outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                >
                  <option value="electronics">ইলেকট্রনিক্স</option>
                  <option value="fashion">ফ্যাশন</option>
                  <option value="groceries">মুদি ও খাদ্য</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md">
                বিজ্ঞাপন প্রকাশ করুন
              </button>
            </form>
          </div>
        )}

        {/* 👤 প্রোফাইল পেইজ */}
        {activeTab === 'profile' && (
          <div className={`p-4 rounded-2xl shadow-sm space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {customerName ? customerName[0].toUpperCase() : '👤'}
              </div>
              <div>
                <h3 className="font-bold text-base">{customerName || 'আপনার প্রোফাইল'}</h3>
                <p className="text-xs text-gray-400">{customerPhone || 'তথ্য সেট করুন'}</p>
              </div>
            </div>

            <form onSubmit={saveProfile} className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-500">আপনার ডিফল্ট শিপিং এড্রেস</h4>
              <div>
                <label className="text-xs text-gray-500">নাম</label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full border rounded-lg p-2 text-xs mt-1 outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">ফোন নম্বর</label>
                <input
                  type="tel"
                  placeholder="মোবাইল নম্বর"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full border rounded-lg p-2 text-xs mt-1 outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">ঠিকানা</label>
                <textarea
                  placeholder="আপনার স্থায়ী ঠিকানা"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className={`w-full border rounded-lg p-2 text-xs mt-1 outline-none ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}
                  rows={2}
                />
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-xs shadow">
                তথ্য সেভ করুন
              </button>
     
