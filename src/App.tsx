import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([
    { id: 1, name: 'ব্যাকপ্যাক ব্যাগ', price: 580, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=60' }
  ]);
  const [posts, setPosts] = useState<string[]>([]);
  const [newPost, setNewPost] = useState('');
  
  // Order Form State
  const [orderProduct, setOrderProduct] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Add to cart function
  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
    alert(`"${product.name}" কার্টে যোগ করা হয়েছে!`);
  };

  // Handle Post submission
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([newPost, ...posts]);
    setNewPost('');
    alert('আপনার বিজ্ঞাপন সফলভাবে পোস্ট করা হয়েছে!');
    setActiveTab('home');
  };

  // Handle Order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chatId = "8633414899"; // আপনার টেলিগ্রাম আইডি
    const message = `🚨 নতুন অর্ডার এসেছে!\n\n🛍️ পণ্য: ${orderProduct}\n👤 নাম: ${name}\n📞 ফোন: ${phone}\n📍 ঠিকানা: ${address}`;
    console.log("Telegram Order Sent to ID:", chatId, message);
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
              placeholder="পণ্য খুঁজুন..."
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
              <div className="p-1 cursor-pointer"><div className="bg-yellow-400 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🪙</div><span className="mt-1 block">Coins</span></div>
              <div className="p-1 cursor-pointer"><div className="bg-orange-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">CHOICE</div><span className="mt-1 block">Choice</span></div>
              <div className="p-1 cursor-pointer"><div className="bg-purple-600 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">📱</div><span className="mt-1 block">Mobile</span></div>
              <div className="p-1 cursor-pointer"><div className="bg-pink-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-xs text-white">🎁</div><span className="mt-1 block">Freebie</span></div>
              <div className="p-1 cursor-pointer"><div className="bg-red-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center font-bold text-[9px] text-white">BUY</div><span className="mt-1 block">Save More</span></div>
            </div>

            {/* Welcome Voucher Banner */}
            <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded-xl border border-pink-200 flex justify-between items-center shadow-sm mb-3">
              <div>
                <p className="text-xs font-bold text-pink-600">Welcome: 15% OFF + Free Delivery</p>
                <p className="text-[10px] text-gray-600">Up to ৳100 | Save on Delivery ৳75</p>
              </div>
              <button onClick={() => alert('ভাউচার সফলভাবে সংগ্রহ করা হয়েছে!')} className="px-3 py-1 text-xs rounded-full font-bold bg-orange-500 text-white shadow">
                Collect All
              </button>
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
                  <button 
                    onClick={() => addToCart({ id: 1, name: 'ব্যাকপ্যাক ব্যাগ', price: 580, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=60' })}
                    className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded font-bold hover:bg-pink-700"
                  >
                    Add
                  </button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-70%</span>
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=60" alt="Earbuds" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">ওয়্যারলেস এয়ারবাডস</p>
                  <p className="text-pink-600 font-bold text-xs">৳365</p>
                  <button 
                    onClick={() => addToCart({ id: 2, name: 'ওয়্যারলেস এয়ারবাডস', price: 365, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=60' })}
                    className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded font-bold hover:bg-pink-700"
                  >
                    Add
                  </button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-65%</span>
                  <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&auto=format&fit=crop&q=60" alt="Seeds" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">মিক্সড কালার বীজ</p>
                  <p className="text-pink-600 font-bold text-xs">৳33</p>
                  <button 
                    onClick={() => addToCart({ id: 3, name: 'মিক্সড কালার বীজ', price: 33, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&auto=format&fit=crop&q=60' })}
                    className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded font-bold hover:bg-pink-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Order Form Section on Home */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-pink-100">
              <h3 className="font-bold text-xs text-pink-600 mb-2 border-b pb-1">📦 সরাসরি অর্ডার ফর্ম</h3>
              {orderSuccess ? (
                <div className="text-center py-3 text-green-600 font-bold text-xs">
                  ✅ আপনার অর্ডারটি সফলভাবে সাবমিট হয়েছে!
                  <button onClick={() => setOrderSuccess(false)} className="block mx-auto mt-2 bg-pink-600 text-white px-3 py-1 rounded text-[10px]">নিন</button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-2 text-xs">
                  <input type="text" required placeholder="পণ্যের নাম লিখুন" value={orderProduct} onChange={(e) => setOrderProduct(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <input type="text" required placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <input type="tel" required placeholder="মোবাইল নাম্বার (01XXXXXXXXX)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <textarea required rows={2} placeholder="পূর্ণ ঠিকানা (বাসা, রোড, জেলা)" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded p-1.5 outline-none focus:border-pink-600" />
                  <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold shadow">অর্ডার কনফার্ম করুন</button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3">
            <div className="text-4xl">💬</div>
            <h3 className="font-bold text-sm">মেসেজ সেন্টার</h3>
            <p className="text-xs text-gray-500">আপনার টেলিগ্রাম বটের সাথে চ্যাট হিস্ট্রি এখানে দেখাবে।</p>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">📌 নতুন বিজ্ঞাপন পোস্ট করুন</h3>
            <form onSubmit={handlePostSubmit} className="space-y-2">
              <textarea 
                rows={4} 
                required
                value={newPost} 
                onChange={(e) => setNewPost(e.target.value)} 
                placeholder="আপনার পণ্যের বিবরণ, দাম ও ছবি বা বিস্তারিত এখানে লিখুন..." 
                className="w-full border rounded p-2 outline-none focus:border-pink-600 text-xs"
              />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold">পোস্ট পাবলিশ করুন</button>
            </form>
            
            <div className="mt-4">
              <h4 className="font-bold text-gray-700 mb-2">আপনার প্রকাশিত বিজ্ঞাপনসমূহ:</h4>
              {posts.length === 0 ? <p className="text-gray-400">কোনো বিজ্ঞাপন নেই।</p> : (
                posts.map((p, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 border rounded mb-2 text-xs">
                    <p>{p}</p>
                  </div>
                ))
              )}
            </div>
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
                <button onClick={() => alert('চেকআউট পেজে যাওয়া হচ্ছে...')} className="w-full mt-3 bg-pink-600 text-white py-2 rounded font-bold">সব পণ্যের অর্ডার করুন</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 text-xs">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg">👤</div>
              <div>
                <h4 className="font-bold text-sm">টেলিগ্রাম ইউজার</h4>
                <p className="text-[10px] text-gray-500">Telegram ID: #8633414899</p>
              </div>
            </div>
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
              
