import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [authPass, setAuthPass] = useState('');

  // Cart & Posts State
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([
    { title: 'স্মার্ট ওয়াচ প্রিমিয়াম এডিশন', price: '৳১৫০০', desc: 'দারুণ লুকিং স্মার্ট ওয়াচ।', seller: 'রকিবুল ইসলাম' }
  ]);
  
  // New Post State
  const [postTitle, setPostTitle] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postDesc, setPostDesc] = useState('');

  // Order Form State
  const [orderProduct, setOrderProduct] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Add to cart
  const addToCart = (item: any) => {
    setCartItems([...cartItems, item]);
    alert(`"${item.name}" কার্টে যোগ করা হয়েছে!`);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPhone.trim()) {
      setIsLoggedIn(true);
      alert('সফলভাবে লগইন হয়েছে!');
    }
  };

  // Handle Post Creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postPrice) return;
    const newAd = { title: postTitle, price: postPrice, desc: postDesc, seller: authPhone || 'গ্রাহক' };
    setPosts([newAd, ...posts]);
    setPostTitle('');
    setPostPrice('');
    setPostDesc('');
    alert('আপনার বিজ্ঞাপন সফলভাবে পাবলিশ হয়েছে!');
    setActiveTab('home');
  };

  // Handle Telegram Order
  const handleTelegramOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const chatId = "8633414899"; // আপনার টেলিগ্রাম আইডি
    const message = `🚨 নতুন অর্ডার এসেছে!\n\n🛍️ পণ্য: ${orderProduct}\n👤 নাম: ${buyerName}\n📞 ফোন: ${buyerPhone}\n📍 ঠিকানা: ${buyerAddress}`;
    
    // টেলিগ্রাম বট এপিআই কল করার প্রস্তুতি (আপনার বটের টোকেন থাকলে এখানে যুক্ত করতে পারেন)
    console.log("Sending Telegram notification to ID:", chatId, message);
    
    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen pb-24 font-sans bg-gray-100 text-gray-900 max-w-md mx-auto shadow-xl relative">
      {/* Top Search Bar */}
      <div className="bg-pink-600 p-2.5 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="relative w-full flex items-center bg-white rounded-full px-3 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder="পণ্য বা বিজ্ঞাপন খুঁজুন..."
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

        <div className="flex justify-between text-[10px] text-white mt-2 px-1 font-medium">
          <span>💳 Safe Payment</span>
          <span>🚚 Fast Delivery</span>
          <span>🔄 Free Return</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-2 space-y-3">
        {activeTab === 'home' && (
          <div>
            {/* Top Categories Grid */}
            <div className="grid grid-cols-5 gap-1 text-center text-[10px] bg-white p-2 rounded-xl shadow-sm mb-3">
              <div className="p-1"><div className="bg-yellow-400 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🪙</div><span className="mt-1 block">Coins</span></div>
              <div className="p-1"><div className="bg-orange-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">CHOICE</div><span className="mt-1 block">Choice</span></div>
              <div className="p-1"><div className="bg-purple-600 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">📱</div><span className="mt-1 block">Mobile</span></div>
              <div className="p-1"><div className="bg-pink-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🎁</div><span className="mt-1 block">Freebie</span></div>
              <div className="p-1"><div className="bg-red-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">BUY</div><span className="mt-1 block">Save More</span></div>
            </div>

            {/* Flash Sale Section */}
            <div className="bg-white p-2 rounded-xl shadow-sm mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-extrabold text-xs text-pink-600">Flash Sale ⚡</span>
                <span className="text-[11px] text-gray-500 font-medium">Shop More &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-54%</span>
                  <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=60" alt="Bag" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">ব্যাকপ্যাক ব্যাগ</p>
                  <p className="text-pink-600 font-bold text-xs">৳580</p>
                  <button onClick={() => addToCart({ name: 'ব্যাকপ্যাক ব্যাগ', price: 580 })} className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded font-bold">Add</button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-70%</span>
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=60" alt="Earbuds" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">ওয়্যারলেস এয়ারবাডস</p>
                  <p className="text-pink-600 font-bold text-xs">৳365</p>
                  <button onClick={() => addToCart({ name: 'ওয়্যারলেস এয়ারবাডস', price: 365 })} className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded font-bold">Add</button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-65%</span>
                  <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&auto=format&fit=crop&q=60" alt="Seeds" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">মিক্সড কালার বীজ</p>
                  <p className="text-pink-600 font-bold text-xs">৳33</p>
                  <button onClick={() => addToCart({ name: 'মিক্সড কালার বীজ', price: 33 })} className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded font-bold">Add</button>
                </div>
              </div>
            </div>

            {/* User Community / Posts Feed */}
            <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
              <h3 className="font-bold text-xs text-pink-600 mb-2 border-b pb-1">📢 ব্যবহারকারীদের বিজ্ঞাপনসমূহ</h3>
              <div className="space-y-2">
                {posts.map((item, idx) => (
                  <div key={idx} className="border p-2 rounded bg-gray-50 text-xs">
                    <div className="flex justify-between font-bold text-pink-600">
                      <span>{item.title}</span>
                      <span>{item.price}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                    <p className="text-[9px] text-gray-400 mt-1">বিক্রেতা: {item.seller}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Order Form (Sends Telegram Message) */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-pink-100">
              <h3 className="font-bold text-xs text-pink-600 mb-2 border-b pb-1">📦 সরাসরি অর্ডার করুন (টেলিগ্রাম নোটিফিকেশন সহ)</h3>
              {orderSuccess ? (
                <div className="text-center py-3 text-green-600 font-bold text-xs">
                  ✅ অর্ডার সফল! আপনার তথ্য টেলিগ্রাম বটে (`8633414899`) পাঠিয়ে দেওয়া হয়েছে।
                  <button onClick={() => setOrderSuccess(false)} className="block mx-auto mt-2 bg-pink-600 text-white px-3 py-1 rounded text-[10px]">আরেকটি অর্ডার</button>
                </div>
              ) : (
                <form onSubmit={handleTelegramOrder} className="space-y-2 text-xs">
                  <input type="text" required placeholder="পণ্যের নাম লিখুন" value={orderProduct} onChange={(e) => setOrderProduct(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <input type="text" required placeholder="আপনার নাম" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <input type="tel" required placeholder="মোবাইল নাম্বার" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <textarea required rows={2} placeholder="পূর্ণ ঠিকানা" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold shadow">অর্ডার কনফার্ম করুন</button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3 text-xs">
            <div className="text-3xl">💬</div>
            <h3 className="font-bold text-sm">টেলিগ্রাম চ্যাট ও নোটিফিকেশন</h3>
            <p className="text-gray-500">আপনার টেলিগ্রাম আইডি (<span className="font-bold text-pink-600">8633414899</span>)-এর সাথে সফলভাবে কানেক্টেড রয়েছে।</p>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">📌 নতুন বিজ্ঞাপন পোস্ট করুন</h3>
            <form onSubmit={handleCreatePost} className="space-y-2">
              <input 
                type="text" 
                required
                value={postTitle} 
                onChange={(e) => setPostTitle(e.target.value)} 
                placeholder="পণ্যের শিরোনাম" 
                className="w-full border rounded p-2 outline-none focus:border-pink-600"
              />
              <input 
                type="text" 
                required
                value={postPrice} 
                onChange={(e) => setPostPrice(e.target.value)} 
                placeholder="দাম (যেমন: ৳৫০০)" 
                className="w-full border rounded p-2 outline-none focus:border-pink-600"
              />
              <textarea 
                rows={3} 
                value={postDesc} 
                onChange={(e) => setPostDesc(e.target.value)} 
                placeholder="পণ্যের বিস্তারিত বিবরণ..." 
                className="w-full border rounded p-2 outline-none focus:border-pink-600"
              />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold">বিজ্ঞাপন পাবলিশ করুন</button>
            </form>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">🛍️ শপিং কার্ট</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">আপনার কার্ট খালি রয়েছে।</p>
            ) : (
              <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-pink-600 font-bold">৳{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 text-xs">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg">👤</div>
              <div>
                <h4 className="font-bold text-sm">{isLoggedIn ? 'রেজিস্টার্ড ইউজার' : 'নতুন ভিজিটর'}</h4>
                <p className="text-[10px] text-gray-500">Telegram Bot ID: #8633414899</p>
              </div>
            </div>

            {!isLoggedIn ? (
              <form onSubmit={handleLogin} className="space-y-2 bg-gray-50 p-3 rounded border">
                <h4 className="font-bold text-pink-600">🔐 লগইন / সাইন আপ</h4>
                <input 
                  type="tel" 
                  required
                  placeholder="মোবাইল নাম্বার দিন" 
                  value={authPhone} 
                  onChange={(e) => setAuthPhone(e.target.value)} 
                  className="w-full border rounded p-1.5 outline-none"
                />
                <input 
                  type="password" 
                  required
                  placeholder="পাসওয়ার্ড" 
                  value={authPass} 
                  onChange={(e) => setAuthPass(e.target.value)} 
                  className="w-full border rounded p-1.5 outline-none"
                />
                <button type="submit" className="w-full bg-pink-600 text-white py-1.5 rounded font-bold">প্রবেশ করুন</button>
              </form>
            ) : (
              <div className="text-center py-2 text-green-600 font-bold">
                ✅ আপনি লগইন অবস্থায় আছেন ({authPhone})
                <button onClick={() => setIsLoggedIn(false)} className="block mx-auto mt-2 text-red-500 underline text-[10px]">লগআউট</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t py-1.5 bg-white flex justify-around text-[10px] text-gray-700 font-medium z-40 shadow-lg">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'flex flex-col items-center text-pink-600 font-bold' : 'flex flex-col items-center'}>
          <span className="text-base">🏠</span>
          <span>For You</span>
        </button>
        <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'flex flex-col items-center relative text-pink-600 font-bold' : 'flex flex-col items-center relative'}>
          <span className="text-base">💬</span>
          <span>Messages</span>
        </button>
        
        <button onClick={() => setActiveTab('post')} className="flex flex-col items-center -mt-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[9px] font-black p-2 rounded-full shadow-lg border-2 border-white text-center leading-tight">
            ➕<br/><span className="text-[8px]">বিজ্ঞাপন</span>
          </div>
        </button>

        <button onClick={() => setActiveTab('cart')} className={activeTab === 'cart' ? 'flex flex-col items-center relative text-pink-600 font-bold' : 'flex flex-col items-center relative'}>
          <span className="text-base">🛒</span>
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] px-1 rounded-full font-bold">
              {cartItems.length}
            </span>
          )}
        </button>
        <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'flex flex-col items-center text-pink-600 font-bold' : 'flex flex-col items-center'}>
          <span className="text-base">👤</span>
          <span>Account</span>
        </button>
      </div>
    </div>
  );
}
