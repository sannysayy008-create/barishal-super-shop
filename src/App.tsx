import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);

  return (
    <div className="min-h-screen pb-24 font-sans bg-gray-100 text-gray-900 max-w-md mx-auto shadow-xl">
      {/* Top Search Bar */}
      <div className="bg-pink-600 p-2.5 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
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

            {/* Welcome Voucher Banner */}
            <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded-xl border border-pink-200 flex justify-between items-center shadow-sm mb-3">
              <div>
                <p className="text-xs font-bold text-pink-600">Welcome: 15% OFF + Free Delivery</p>
                <p className="text-[10px] text-gray-600">Up to ৳100 | Save on Delivery ৳75</p>
              </div>
              <button className="px-3 py-1 text-xs rounded-full font-bold bg-orange-500 text-white shadow">
                Collect All
              </button>
            </div>

            {/* Payday Sale Banner */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl text-white font-bold text-xs flex justify-between items-center shadow mb-3">
              <div>
                <span className="text-sm">🔥 PAYDAY SALE</span>
                <span className="block text-[10px] font-normal mt-0.5">EXTRA 15% OFF ON YOUR FIRST ORDER</span>
              </div>
              <span className="bg-black text-white text-[10px] px-2 py-1 rounded-full">UP TO 80% OFF</span>
            </div>

            {/* Flash Sale Section */}
            <div className="bg-white p-2 rounded-xl shadow-sm mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-pink-600">Flash Sale ⚡</span>
                  <div className="flex gap-0.5 text-[10px] font-bold text-white">
                    <span className="bg-pink-600 px-1 rounded">00</span>:
                    <span className="bg-pink-600 px-1 rounded">13</span>:
                    <span className="bg-pink-600 px-1 rounded">22</span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">Shop More &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-54%</span>
                  <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" alt="Bag" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">ব্যাকপ্যাক ব্যাগ</p>
                  <p className="text-pink-600 font-bold text-xs">৳580</p>
                  <button className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">Add</button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-70%</span>
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300" alt="Earbuds" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">ওয়্যারলেস এয়ারবাডস</p>
                  <p className="text-pink-600 font-bold text-xs">৳365</p>
                  <button className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">Add</button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">-65%</span>
                  <img src="https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300" alt="Seeds" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">মিক্সড কালার বীজ</p>
                  <p className="text-pink-600 font-bold text-xs">৳33</p>
                  <button className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">Add</button>
                </div>
              </div>
            </div>

            {/* Daily Shera Deals Section */}
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xs text-orange-600">Daily Shera Deals 🏆</span>
                <span className="text-[10px] text-gray-500 font-medium">Shop Now | Free Gift! &gt;</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded">-59%</span>
                  <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300" alt="Slippers" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">স্লাইডার স্লিপার</p>
                  <p className="text-pink-600 font-bold text-xs">৳269</p>
                  <button className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">Add</button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded">-54%</span>
                  <img src="https://images.unsplash.com/photo-1611591475168-525492261614?w=300" alt="Bracelet" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">লেদার ব্রেসলেট</p>
                  <p className="text-pink-600 font-bold text-xs">৳145</p>
                  <button className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">Add</button>
                </div>
                <div className="border rounded-lg p-1 relative text-center bg-gray-50">
                  <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded">-70%</span>
                  <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300" alt="Lipstick" className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-[10px] line-clamp-1 font-medium">লিপস্টিক সেট</p>
                  <p className="text-pink-600 font-bold text-xs">৳100</p>
                  <button className="w-full mt-1 bg-pink-600 text-white text-[10px] py-0.5 rounded font-bold">Add</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3">
            <div className="text-4xl">💬</div>
            <h3 className="font-bold text-sm">মেসেজ সেন্টার</h3>
            <p className="text-xs text-gray-500">আপনার কোনো নতুন মেসেজ বা নোটিফিকেশন আসেনি।</p>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">📌 বিজ্ঞাপন পোস্ট করুন</h3>
            <p className="text-gray-500">এখানে আপনার নতুন পণ্যের বিবরণ দিন।</p>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2 text-sm text-pink-600">🛍️ শপিং কার্ট</h3>
            <p className="text-gray-500 text-center py-4">আপনার কার্টে ২ টি পণ্য রয়েছে।</p>
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
          <span className="absolute -top-1 right-1 bg-red-500 text-white text-[8px] px-1 rounded-full font-bold">12</span>
        </button>
        
        <button onClick={() => setActiveTab('post')} className="flex flex-col items-center -mt-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[9px] font-black p-2 rounded-full shadow-lg border-2 border-white text-center leading-tight">
            ➕<br/><span className="text-[8px]">বিজ্ঞাপন</span>
          </div>
        </button>

        <button onClick={() => setActiveTab('cart')} className={activeTab === 'cart' ? 'flex flex-col items-center relative text-pink-600 font-bold' : 'flex flex-col items-center relative'}>
          <span className="text-base">🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] px-1 rounded-full font-bold">
              {cartCount}
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
