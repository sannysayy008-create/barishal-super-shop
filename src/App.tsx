import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  seller: string;
  img: string;
  rating: number;
  sold: number;
}

interface UserProfile {
  name: string;
  username: string;
  phone: string;
  address: string;
  wishlistCount: number;
  followedStores: number;
  vouchers: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'messages' | 'account' | 'post' | 'admin'>('shop');
  
  const [user] = useState<UserProfile>({
    name: 'Fida Al Sani',
    username: 'sannysayy008',
    phone: '01700000000',
    address: 'Barishal Sadar',
    wishlistCount: 1,
    followedStores: 0,
    vouchers: 0
  });

  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'প্রিমিয়াম লেদার জ্যাকেট',
      price: 2500,
      category: 'ফ্যাশন',
      seller: 'বরিশাল স্টোর',
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      rating: 4.8,
      sold: 120
    },
    {
      id: 2,
      name: 'স্মার্ট ওয়াচ সিরিজ ৮',
      price: 1850,
      category: 'ইলেকট্রনিক্স',
      seller: 'টেক ওয়ার্ল্ড',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      rating: 4.5,
      sold: 85
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'সাধারণ',
    seller: 'Fida Al Sani',
    img: ''
  });

  const handlePostProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      seller: newProduct.seller,
      img: newProduct.img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      rating: 5.0,
      sold: 0
    };

    setProducts([product, ...products]);
    setNewProduct({ name: '', price: '', category: 'সাধারণ', seller: 'Fida Al Sani', img: '' });
    setActiveTab('shop');
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert('পণ্যটি কার্টে যোগ করা হয়েছে!');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Top Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-lg font-bold text-emerald-600">🛒 Barishal Super Shop</h1>
        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">
          {user.name}
        </span>
      </header>

      {/* Main Content Area */}
      <main className="p-4 max-w-lg mx-auto">
        {/* Shop / Home Tab */}
        {activeTab === 'shop' && (
          <div>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white mb-4 shadow">
              <h2 className="text-lg font-bold">মেগা সেল চলছে! ⚡</h2>
              <p className="text-xs opacity-90 mt-1">সব পণ্যে আকর্ষণীয় ডিসকাউন্ট ও ফ্রি ডেলিভারি।</p>
            </div>
            
            <h3 className="text-md font-semibold mb-3 text-gray-800">সকল পণ্যসমূহ</h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between border border-gray-100">
                  <img src={p.img} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
                  <h4 className="font-medium text-xs text-gray-800 line-clamp-1">{p.name}</h4>
                  <p className="text-orange-600 font-bold text-sm mt-1">৳ {p.price}</p>
                  <button 
                    onClick={() => addToCart(p)} 
                    className="mt-2 bg-orange-500 text-white text-xs py-1.5 rounded-lg font-medium hover:bg-orange-600 transition">
                    কার্টে যোগ করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-md font-semibold mb-4 text-gray-800">আমার কার্ট ({cart.length})</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-12 text-sm">আপনার কার্ট খালি রয়েছে।</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-medium text-xs text-gray-800">{item.name}</h4>
                      <p className="text-xs text-orange-600 font-bold mt-1">৳ {item.price}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">সাবটোটাল:</span>
                  <span className="text-base font-bold text-orange-600">৳ {subtotal}</span>
                </div>
                <button 
                  onClick={() => alert('অর্ডার সফলভাবে প্লেস হয়েছে!')}
                  className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-sm font-bold mt-3 shadow hover:bg-orange-600">
                  চেক আউট ({cart.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Messages / Notifications Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-3">
            <h2 className="text-md font-semibold text-gray-800 mb-2">মেসেজ ও নোটিফিকেশন</h2>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
              <span className="text-xs text-orange-600 font-bold">সিস্টেম অ্যালার্ট</span>
              <p className="text-xs text-gray-700 mt-1">স্বাগতম Barishal Super Shop-এ! আপনার শপিং উপভোগ করুন।</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
              <span className="text-xs text-orange-600 font-bold">ডিসকাউন্ট অফার</span>
              <p className="text-xs text-gray-700 mt-1">শনিবার স্পেশাল ডিসকাউন্টে ফ্ল্যাট ২০% ছাড়!</p>
            </div>
          </div>
        )}

        {/* Post Product Tab */}
        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-md font-semibold mb-4 text-gray-800">নতুন পণ্য পোস্ট করুন</h2>
            <form onSubmit={handlePostProduct} className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 font-medium">পণ্যের নাম</label>
                <input 
                  type="text" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border p-2 rounded-lg mt-1 text-xs outline-none focus:border-orange-500" 
                  placeholder="পণ্যের নাম লিখুন" 
                  required 
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">মূল্য (টাকা)</label>
                <input 
                  type="number" 
                  value={newProduct.price} 
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full border p-2 rounded-lg mt-1 text-xs outline-none focus:border-orange-500" 
                  placeholder="দাম দিন" 
                  required 
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">ছবির লিংক (URL)</label>
                <input 
                  type="text" 
                  value={newProduct.img} 
                  onChange={(e) => setNewProduct({...newProduct, img: e.target.value})}
                  className="w-full border p-2 rounded-lg mt-1 text-xs outline-none focus:border-orange-500" 
                  placeholder="Image URL দিন" 
                />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg text-xs font-bold">
                পাবলিশ করুন
              </button>
            </form>
          </div>
        )}

        {/* Account Profile Tab (Daraz Style) */}
        {activeTab === 'account' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-4 text-white shadow-sm flex items-center space-x-3">
              <div className="w-12 h-12 bg-white text-orange-600 font-bold rounded-full flex items-center justify-center text-lg shadow">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm">{user.name}</h3>
                <p className="text-xs opacity-90">@{user.username} | {user.phone}</p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white rounded-xl p-3 shadow-sm flex justify-around text-center">
              <div>
                <p className="font-bold text-sm text-gray-800">{user.wishlistCount}</p>
                <p className="text-[10px] text-gray-500">Wishlist</p>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">{user.followedStores}</p>
                <p className="text-[10px] text-gray-500">Followed Stores</p>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">{user.vouchers}</p>
                <p className="text-[10px] text-gray-500">Vouchers</p>
              </div>
            </div>

            {/* My Orders Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">My Orders</h4>
              <div className="grid grid-cols-4 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">💳</span>
                  <span>To Pay</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">📦</span>
                  <span>To Ship</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">🚚</span>
                  <span>To Receive</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">⭐</span>
                  <span>To Review</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm text-xs space-y-2">
              <p><strong>ঠিকানা:</strong> {user.address}</p>
              <button 
                onClick={() => setActiveTab('post')} 
                className="w-full mt-2 bg-gray-100 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-200">
                নতুন পণ্য পোস্ট করুন
              </button>
            </div>
          </div>
        )}

        {/* Admin Tab */}
        {activeTab === 'admin' && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-md font-semibold mb-3 text-gray-800">অ্যাডমিন প্যানেল</h2>
            <p className="text-xs text-gray-600">মোট তালিকাভুক্ত পণ্য: {products.length} টি</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2.5 shadow-lg z-50 max-w-lg mx-auto">
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center text-[10px] ${activeTab === 'shop' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          <span className="text-base">🏠</span>
           হোম
        </button>
        <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center text-[10px] ${activeTab === 'messages' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          <span className="text-base">💬</span>
          মেসেজ
        </button>
        <button onClick={() => setActiveTab('post')} className={`flex flex-col items-center text-[10px] ${activeTab === 'post' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          <span className="text-base">➕</span>
          পোস্ট
        </button>
        <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center text-[10px] relative ${activeTab === 'cart' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          <span className="text-base">🛒</span>
          কার্ট ({cart.length})
        </button>
        <button onClick={() => setActiveTab('account')} className={`flex flex-col items-center text-[10px] ${activeTab === 'account' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          <span className="text-base">👤</span>
          প্রোফাইল
        </button>
      </nav>
    </div>
  );
      }
                  
