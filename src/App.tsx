import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  category: string;
  image: string;
  isFlashSale?: boolean;
  isTopRanked?: boolean;
}

export function App() {
  const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN_HERE";
  const TELEGRAM_CHAT_ID = "8633414899";

  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'moderator'>('user');
  
  // Language & Profile State
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [customerName, setCustomerName] = useState<string>(() => localStorage.getItem('cust_name') || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => localStorage.getItem('cust_phone') || '');
  const [customerAddress, setCustomerAddress] = useState<string>(() => localStorage.getItem('cust_address') || '');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [voucherCollected, setVoucherCollected] = useState<boolean>(false);

  // Flash Sale Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 13, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Products Database
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'ব্যাকপ্যাক ব্যাগ', price: 580, originalPrice: 1260, discount: '-54%', category: 'fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', isFlashSale: true },
    { id: 2, title: 'Hi-Fi ওয়্যারলেস এয়ারবাডস', price: 365, originalPrice: 1200, discount: '-70%', category: 'electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300', isFlashSale: true },
    { id: 3, title: 'মিক্সড কালার বীজ', price: 33, originalPrice: 95, discount: '-65%', category: 'groceries', image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300', isFlashSale: true },
    { id: 4, title: 'নাইকি স্টাইল স্লাইডার স্লিপার', price: 269, originalPrice: 650, discount: '-59%', category: 'fashion', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300' },
    { id: 5, title: 'ব্ল্যাক লেদার ব্রেসলেট', price: 145, originalPrice: 315, discount: '-54%', category: 'fashion', image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300' },
    { id: 6, title: 'রোড ম্যাট লিপস্টিক সেট', price: 100, originalPrice: 330, discount: '-70%', category: 'fashion', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300', isTopRanked: true },
    { id: 7, title: 'স্মার্টওয়াচ ওয়াচ', price: 850, originalPrice: 1500, discount: '-43%', category: 'electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', isTopRanked: true }
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('electronics');
  const [newImage, setNewImage] = useState<string>('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300');

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product: Product) => setCartItems([...cartItems, product]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(lang === 'bn' ? 'সব তথ্য পূরণ করুন' : 'Fill all fields');
      return;
    }
    const itemsList = cartItems.map((item) => `• ${item.title} - ৳${item.price}`).join('\n');
    const telegramMessage = `🛒 *নতুন অর্ডার এসেছে!*\n\n👤 *নাম:* ${customerName}\n📞 *ফোন:* ${customerPhone}\n🏠 *ঠিকানা:* ${customerAddress}\n\n📦 *পণ্য:* \n${itemsList}\n\n💰 *মোট:* ৳${totalPrice}`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMessage, parse_mode: 'Markdown' }),
      });
      alert(lang === 'bn' ? 'অর্ডার গ্রহণ করা হয়েছে!' : 'Order received!');
      setCartItems([]);
      setActiveTab('home');
    } catch {
      alert('Error sending order');
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
      originalPrice: priceNum + 150,
      discount: '-50%',
      category: newCategory,
      image: newImage
    };
    setProducts([newProd, ...products]);
    alert(lang === 'bn' ? 'বিজ্ঞাপন প্রকাশিত হয়েছে!' : 'Post published!');
    setActiveTab('home');
    setNewTitle('');
    setNewPrice('');
  };

  return (
    <div className={`min-h-screen pb-20 font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Header Search Bar with Camera Icon */}
      <div className="bg-pink-600 p-2.5 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative w-full flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder={lang === 'bn' ? "watch for man..." : "Search watch for man..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-black outline-none pr-6 bg-transparent"
            />
            {/* Camera Search Icon */}
            <label className="cursor-pointer text-gray-500 text-sm hover:text-pink-600">
              📷
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <button className="bg-pink-700 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-pink-400">
            Search
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex justify-between max-w-md mx-auto text-[10px] text-white mt-2 px-1 font-medium">
          <span>💳 Safe Payment</span>
          <span>🚚 Fast Delivery</span>
          <span>🔄 Free Return</span>
        </div>
      </div>

      <main className="max-w-md mx-auto p-2 space-y-3">
        
        {/* Home Tab Content */}
        {activeTab === 'home' && (
          <>
            {/* Quick Category Icons */}
            <div className="grid grid-cols-5 gap-1 text-center text-[10px] bg-white p-2 rounded-xl shadow-sm">
              <div className="p-1"><div className="bg-yellow-400 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">💰</div><span>Coins</span></div>
              <div className="p-1"><div className="bg-orange-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">CHOICE</div><span>Choice</span></div>
              <div className="p-1"><div className="bg-purple-600 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">📱</div><span>Mobile</span></div>
              <div className="p-1"><div className="bg-pink-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🎁</div><span>Freebie</span></div>
              <div className="p-1"><div className="bg-red-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">BUY</div><span>Save More</span></div>
            </div>

            {/* Voucher Banner */}
            <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded-xl border border-pink-200 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-xs font-bold text-pink-600">Welcome: 15% OFF + Free Delivery</p>
                <p className="text-[10px] text-gray-600">Up to ৳100 | Save on Delivery ৳75</p>
              </div>
              <button 
                onClick={() => setVoucherCollected(true)}
                className={`px-3 py-1 text-xs rounded-full font-bold ${voucherCollected ? 'bg-gray-400 text-white' : 'bg-orange-500 text-white shadow'}`}
              >
                {voucherCollected ? 'Collected' : 'Collect All'}
              </button>
            </div>

            {/* Payday Sale Banner */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl text-white font-bold text-xs flex justify-between items-center shadow">
              <div>
                <span>🔥 PAYDAY SALE</span>
                <span className="block text-[10px] font-normal">EXTRA 15% OFF ON YOUR FIRST ORDER</span>
              </div>
              <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">UP TO 80% OFF</span>
            </div>

            {/* Flash Sale Section */}
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-pink-600">Flash Sale ⚡</span>
                  <div className="flex gap-0.5 text-[10px] font-bold text-white">
                    <span className="bg-pink-600 px-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>:
                    <span className="bg-pink-600 px-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                    <span className="bg-pink-600 px-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-500">Shop More &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {products.filter(p => p.isFlashSale).map((product) => (
                  <div key={product.id} className="border rounded-lg p-1 relative text-center">
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">{product.discount}</span>
                    <img src={product.image} alt={product.title} className="w-full h-20 object-cover rounded mb-1" />
                    <p className="text-[10px] line-clamp-1 font-medium">{product.title}</p>
                    <p className="text-pink-600 font-bold text-xs">৳{product.price}</p>
                    <button onClick={() => addToCart(product)} className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Ranking Section */}
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xs text-orange-600">Top Ranking 🏆</span>
                <span className="text-[10px] text-gray-500">Discover More Rankings &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-1 relative text-center">
                    <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded">{product.discount}</span>
                    <img src={product.image} alt={product.title} className="w-full h-20 object-cover rounded mb-1" />
                    <p className="text-[10px] line-clamp-1 font-medium">{product.title}</p>
                    <p className="text-pink-600 font-bold text-xs">৳{product.price}</p>
                    <button onClick={() => addToCart(product)} className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Post Ad Tab */}
        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="font-bold border-b pb-2 text-sm">{lang === 'bn' ? 'নতুন বিজ্ঞাপন দিন' : 'Post New Ad'}</h3>
            <form onSubmit={handlePostAd} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-500">{lang === 'bn' ? 'পণ্যের নাম' : 'Product Name'}</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border p-2 rounded text-black outline-none mt-1" />
              </div>
              <div>
                <label className="text-gray-500">{lang === 'bn' ? 'দাম (৳)' : 'Price (৳)'}</label>
                <input type="number" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border p-2 rounded text-black outline-none mt-1" />
              </div>
              <div>
                <label className="text-gray-500">{lang === 'bn' ? 'ছবি আপলোড করুন (ফোন/কম্পিউটার)' : 'Upload Image'}</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-1 rounded text-black mt-1" />
              </div>
              {newImage && <img src={newImage} alt="Preview" className="w-16 h-16 object-cover rounded border" />}
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg font-bold text-xs shadow">
                {lang === 'bn' ? 'বিজ্ঞাপন প্রকাশ করুন' : 'Publish Ad'}
              </button>
            </form>
          </div>
        )}

        {/* Messages / Inbox Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white p-4 rounded-xl shadow-sm text-center space-y-2">
            <div className="text-3xl">💬</div>
            <h3 className="font-bold text-sm">মেসেজ সেন্টার</h3>
            <p className="text-xs text-gray-500">আপনার কোনো নতুন নোটিফিকেশন বা মেসেজ নেই।</p>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm">{lang === 'bn' ? 'আপনার শপিং কার্ট' : 'Shopping Cart'}</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded bg-gray-50">
                <span>{item.title}</span>
                <span className="font-bold text-pink-600">৳{item.price}</span>
              </div>
            ))}
            <div className="font-bold text-sm border-t pt-2 flex justify-between">
              <span>{lang === 'bn' ? 'মোট:' : 'Total:'}</span>
              <span className="text-pink-600">৳{totalPrice}</span>
            </div>
            <form onSubmit={handleOrderSubmit} className="space-y-2 pt-2">
              <input type="text" placeholder={lang === 'bn' ? "নাম" : "Name"} required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border p-2 rounded text-black" />
              <input type="tel" placeholder={lang === 'bn' ? "মোবাইল" : "Phone"} required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full border p-2 rounded text-black" />
              <textarea placeholder={lang === 'bn' ? "ঠিকানা" : "Address"} required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full border p-2 rounded text-black" />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg font-bold text-xs shadow">
                {lang === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order'}
              </button>
            </form>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm">{lang === 'bn' ? 'সেটিংস' : 'Settings'}</h3>
            <div>
              <p className="font-semibold mb-2">{lang === 'bn' ? 'ভাষা চয়েস করুন' : 'Language'}</p>
              <div className="flex gap-2">
                <button onClick={() => setLang('bn')} className={`px-3 py-1 rounded border font-bold ${lang === 'bn' ? 'bg-pink-600 text-white' : ''}`}>বাংলা</button>
                <button onClick={() => setLang('en')} className={`px-3 py-1 rounded border font-bold ${lang === 'en' ? 'bg-pink-600 text-white' : ''}`}>English</button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Daraz Exact Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t py-1 bg-white flex justify-around text-[10px] text-gray-700 font-medium z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-pink-600 font-bold' : ''}`}>
          <span className="text-sm">🏠</span>
          <span>For You</span>
        </button>
        <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center relative ${activeTab === 'messages' ? 'text-pink-600 font-bold' : ''}`}>
          <span className="text-sm">💬</span>
          <span>Messages</span>
          <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] px-1 rounded-full font-bold">12</span>
        </button>
        
        {/* Middle 50% OFF Banner Badge */}
        <button onClick={() => setActiveTab('post')} className="flex flex-col items-center -mt-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-black p-1.5 rounded-full shadow-lg border-2 border-white text-center leading-tight">
            UP TO<br/><span className="text-[10px]">50%</span><br/>OFF
          </div>
        </button>

        <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center relative ${activeTab === 'cart' ? 'text-pink-600 font-bold' : ''}`}>
          <span className="text-sm">🛒</span>
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] px-1 rounded-full font-bold">
              {cartItems.length}
            </span>
          )}
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center ${activeTab === 'settings' ? 'text-pink-600 font-bold' : ''}`}>
          <span className="text-sm">👤</span>
          <span>Account</span>
        </button>
      </div>

    </div>
  );
}

export default App;
    
