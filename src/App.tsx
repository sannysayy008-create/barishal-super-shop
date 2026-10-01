import React, { useState, useEffect } from 'react';

export function App() {
  const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN_HERE";
  const TELEGRAM_CHAT_ID = "8633414899";

  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState('bn');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [voucherCollected, setVoucherCollected] = useState(false);

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

  const [products, setProducts] = useState([
    { id: 1, title: 'ব্যাকপ্যাক ব্যাগ', price: 580, originalPrice: 1260, discount: '-54%', category: 'fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', isFlashSale: true },
    { id: 2, title: 'Hi-Fi ওয়্যারলেস এয়ারবাডস', price: 365, originalPrice: 1200, discount: '-70%', category: 'electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300', isFlashSale: true },
    { id: 3, title: 'মিক্সড কালার বীজ', price: 33, originalPrice: 95, discount: '-65%', category: 'groceries', image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300', isFlashSale: true },
    { id: 4, title: 'নাইকি স্টাইল স্লাইডার স্লিপার', price: 269, originalPrice: 650, discount: '-59%', category: 'fashion', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300' },
    { id: 5, title: 'ব্ল্যাক লেদার ব্রেসলেট', price: 145, originalPrice: 315, discount: '-54%', category: 'fashion', image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300' },
    { id: 6, title: 'রোড ম্যাট লিপস্টিক সেট', price: 100, originalPrice: 330, discount: '-70%', category: 'fashion', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300' }
  ]);

  const [cartItems, setCartItems] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newCategory, setNewCategory] = useState('electronics');
  const [isFlash, setIsFlash] = useState(false);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300');

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে সব তথ্য পূরণ করুন');
      return;
    }
    const itemsList = cartItems.map((item) => '• ' + item.title + ' - ৳' + item.price).join('\n');
    const telegramMessage = '🛒 *নতুন অর্ডার এসেছে!*\n\n👤 *নাম:* ' + customerName + '\n📞 *ফোন:* ' + customerPhone + '\n🏠 *ঠিকানা:* ' + customerAddress + '\n\n📦 *পণ্য:* \n' + itemsList + '\n\n💰 *মোট:* ৳' + totalPrice;

    try {
      if (TELEGRAM_BOT_TOKEN !== "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
        await fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMessage, parse_mode: 'Markdown' }),
        });
      }
      alert('আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
      setCartItems([]);
      setActiveTab('home');
    } catch {
      alert('অর্ডার পাঠাতে সমস্যা হয়েছে।');
    }
  };

  const handlePostAd = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const priceNum = Number(newPrice);
    const origPriceNum = newOriginalPrice ? Number(newOriginalPrice) : priceNum + 200;
    const discountPercent = Math.round(((origPriceNum - priceNum) / origPriceNum) * 100);

    const newProd = {
      id: Date.now(),
      title: newTitle,
      price: priceNum,
      originalPrice: origPriceNum,
      discount: '-' + (discountPercent > 0 ? discountPercent : 20) + '%',
      category: newCategory,
      image: newImage,
      isFlashSale: isFlash
    };

    setProducts([newProd, ...products]);
    alert('বিজ্ঞাপনটি সফলভাবে পোস্ট হয়েছে!');
    setNewTitle('');
    setNewPrice('');
    setNewOriginalPrice('');
    setIsFlash(false);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen pb-24 font-sans bg-gray-100 text-gray-900">
      <div className="bg-pink-600 p-2.5 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative w-full flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder="watch for man..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-black outline-none pr-6 bg-transparent"
            />
            <span className="text-gray-500 text-sm">🔍</span>
          </div>
          <button className="bg-pink-700 text-white font-bold text-xs px-3 py-1.5 rounded-full border border-pink-400">
            Search
          </button>
        </div>

        <div className="flex justify-between max-w-md mx-auto text-[10px] text-white mt-2 px-1 font-medium">
          <span>💳 Safe Payment</span>
          <span>🚚 Fast Delivery</span>
          <span>🔄 Free Return</span>
        </div>
      </div>

      <main className="max-w-md mx-auto p-2 space-y-3">
        {activeTab === 'home' && (
          <div>
            <div className="grid grid-cols-5 gap-1 text-center text-[10px] bg-white p-2 rounded-xl shadow-sm mb-3">
              <div className="p-1"><div className="bg-yellow-400 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🪙</div><span className="mt-1 block">Coins</span></div>
              <div className="p-1"><div className="bg-orange-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">CHOICE</div><span className="mt-1 block">Choice</span></div>
              <div className="p-1"><div className="bg-purple-600 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">📱</div><span className="mt-1 block">Mobile</span></div>
              <div className="p-1"><div className="bg-pink-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🎁</div><span className="mt-1 block">Freebie</span></div>
              <div className="p-1"><div className="bg-red-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">BUY</div><span className="mt-1 block">Save More</span></div>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded-xl border border-pink-200 flex justify-between items-center shadow-sm mb-3">
              <div>
                <p className="text-xs font-bold text-pink-600">Welcome: 15% OFF + Free Delivery</p>
                <p className="text-[10px] text-gray-600">Up to ৳100 | Save on Delivery ৳75</p>
              </div>
              <button 
                onClick={() => setVoucherCollected(true)}
                className={voucherCollected ? 'px-3 py-1 text-xs rounded-full font-bold bg-gray-400 text-white' : 'px-3 py-1 text-xs rounded-full font-bold bg-orange-500 text-white shadow'}
              >
                {voucherCollected ? 'Collected' : 'Collect All'}
              </button>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl text-white font-bold text-xs flex justify-between items-center shadow mb-3">
              <div>
                <span className="text-sm">🔥 PAYDAY SALE</span>
                <span className="block text-[10px] font-normal mt-0.5">EXTRA 15% OFF ON YOUR FIRST ORDER</span>
              </div>
              <span className="bg-black text-white text-[10px] px-2 py-1 rounded-full">UP TO 80% OFF</span>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-sm mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-pink-600">Flash Sale ⚡</span>
                  <div className="flex gap-0.5 text-[10px] font-bold text-white">
                    <span className="bg-pink-600 px-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>:
                    <span className="bg-pink-600 px-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                    <span className="bg-pink-600 px-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">Shop More &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {products.filter(p => p.isFlashSale).map((product) => (
                  <div key={product.id} className="border rounded-lg p-1 relative text-center bg-gray-50">
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

            <div className="bg-white p-2 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xs text-orange-600">Daily Shera Deals 🏆</span>
                <span className="text-[10px] text-gray-500 font-medium">Shop Now | Free Gift! &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-1 relative text-center bg-gray-50">
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
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">📌 নতুন বিজ্ঞাপন পোস্ট বা ব্যানার যোগ করুন</h3>
            <form onSubmit={handlePostAd} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-600 font-semibold">পণ্যের নাম / শিরোনাম</label>
                <input type="text" placeholder="যেমন: নতুন ঘড়ি বা ব্যাগ" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border p-2 rounded text-black outline-none mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-600 font-semibold">অফার মূল্য (৳)</label>
                  <input type="number" placeholder="300" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border p-2 rounded text-black outline-none mt-1" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">আসল মূল্য (৳)</label>
                  <input type="number" placeholder="500" value={newOriginalPrice} onChange={(e) => setNewOriginalPrice(e.target.value)} className="w-full border p-2 rounded text-black outline-none mt-1" />
                </div>
              </div>

              <div>
                <label className="text-gray-600 font-semibold">ক্যাটাগরি</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full border p-2 rounded text-black outline-none mt-1">
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion & Lifestyle</option>
                  <option value="groceries">Groceries & Plant</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-pink-50 p-2 rounded border border-pink-200">
                <input type="checkbox" id="flashSaleOpt" checked={isFlash} onChange={(e) => setIsFlash(e.target.checked)} className="w-4 h-4 text-pink-600" />
                <label htmlFor="flashSaleOpt" className="font-bold text-pink-600 cursor-pointer text-xs">⚡ Flash Sale-এ দেখান</label>
              </div>

              <div>
                <label className="text-gray-600 font-semibold">পণ্যের ছবি আপলোড করুন</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-1 rounded text-black mt-1" />
              </div>

              {newImage && (
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">ছবি প্রিভিউ:</p>
                  <img src={newImage} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                </div>
              )}

              <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-bold text-xs shadow-md hover:bg-pink-700">
                🚀 বিজ্ঞাপন পোস্ট করুন
              </button>
            </form>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3">
            <div className="text-4xl">💬</div>
            <h3 className="font-bold text-sm">মেসেজ সেন্টার</h3>
            <p className="text-xs text-gray-500">আপনার কোনো নতুন মেসেজ বা নোটিফিকেশন আসেনি।</p>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">🛍️ শপিং কার্ট ({cartItems.length})</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">আপনার কার্ট খালি রয়েছে।</p>
            ) : (
              <>
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded bg-gray-50 border-b">
                    <span>{item.title}</span>
                    <span className="font-bold text-pink-600">৳{item.price}</span>
                  </div>
                ))}
                <div className="font-bold text-sm border-t pt-2 flex justify-between">
                  <span>মোট বিল:</span>
                  <span className="text-pink-600">৳{totalPrice}</span>
                </div>
                <form onSubmit={handleOrderSubmit} className="space-y-2 pt-2">
                  <input type="text" placeholder="আপনার নাম" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border p-2 rounded text-black outline-none" />
                  <input type="tel" placeholder="মোবাইল নম্বর" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full border p-2 rounded text-black outline-none" />
                  <textarea placeholder="পূর্ণাঙ্গ ঠিকানা" required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full border p-2 rounded text-black outline-none" />
                  <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-bold text-xs shadow">
                    অর্ডার কনফার্ম করুন
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 text-xs">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg">👤</div>
              <div>
                <h4 className="font-bold text-sm">ভ্যালুয়াবল কাস্টমার</h4>
                <p className="text-[10px] text-gray-500">Account ID: #863341</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-700">ভাষা পরিবর্তন করুন (Language)</p>
              <div className="flex gap-2">
                <button onClick={() => setLang('bn')} className={lang === 'bn' ? 'px-4 py-1.5 rounded border font-bold bg-pink-600 text-white' : 'px-4 py-1.5 rounded border font-bold'}>বাংলা</button>
                <button onClick={() => setLang('en')} className={lang === 'en' ? 'px-4 py-1.5 rounded border font-bold bg-pink-600 text-white' : 'px-4 py-1.5 rounded border font-bold'}>English</button>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2 text-gray-600">
              <p className="font-semibold cursor-pointer hover:text-pink-600">📦 আমার অর্ডারসমূহ</p>
              <p className="font-semibold cursor-pointer hover:text-pink-600">⚙ অ্যাপ সেটিংস ও নোটিফিকেশন</p>
              <p className="font-semibold cursor-pointer hover:text-pink-600">📞 হেল্প ও সাপোর্ট</p>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t py-1.5 bg-white flex justify-around text-[10px] text-gray-700 font-medium z-40 shadow-lg">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'flex flex-col items-center text-pink-600 font-bold' : 'flex flex-col items-center'}>
          <span className="text-base">🏠</span>
          <span>For You</span>
        </button>
        <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'flex flex-col items-center relative text-pink-600 font-bold' : 'flex flex-col items-center relative'}>
          <span className="text-base">💬</span>
          <span>Messages</span>
        </button>
        
        <button onClick={() => setActiveTab('post')} className="flex flex-col items-center -mt-4">
          <div className="bg-gradient-to-r from-o
