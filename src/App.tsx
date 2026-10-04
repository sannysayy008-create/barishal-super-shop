import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('barishal_shop_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u?.name) {
          setUserName(u.name);
          setUserPhone(u.phone || '');
          setIsLoggedIn(true);
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (userName.trim() && userPhone.trim()) {
      localStorage.setItem('barishal_shop_user', JSON.stringify({ name: userName, phone: userPhone }));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('barishal_shop_user');
    setIsLoggedIn(false);
    setUserName('');
    setUserPhone('');
  };

  const products = [
    { id: 1, name: "বরিশালের গাওয়া ঘি", price: 1200, unit: "১ কেজি", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80" },
    { id: 2, name: "সুন্দরবনের খাঁটি মধু", price: 750, unit: "৫০০ গ্রাম", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&q=80" },
    { id: 3, name: "দেশি মুগ ডাল", price: 140, unit: "১ কেজি", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&q=80" },
    { id: 4, name: "স্মার্ট ওয়াচ", price: 1850, unit: "১ পিস", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }
  ];

  const addToCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === p.id);
      if (exist) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    alert('কার্টে যোগ করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 text-gray-800">
      {!isLoggedIn && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-orange-600 mb-2">বরিশাল সুপার শপ</h2>
            <p className="text-xs text-gray-500 mb-4">নাম ও মোবাইল নম্বর দিয়ে প্রবেশ করুন</p>
            <form onSubmit={handleLogin} className="space-y-3">
              <input type="text" required placeholder="আপনার নাম" value={userName} onChange={e => setUserName(e.target.value)} className="w-full p-3 border rounded-xl text-sm" />
              <input type="tel" required placeholder="মোবাইল নম্বর" value={userPhone} onChange={e => setUserPhone(e.target.value)} className="w-full p-3 border rounded-xl text-sm" />
              <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold text-sm">প্রবেশ করুন</button>
            </form>
          </div>
        </div>
      )}

      <header className="bg-orange-600 text-white p-4 font-bold text-center">Barishal Super Shop</header>

      <main className="p-4 max-w-md mx-auto space-y-4">
        {activeTab === 'home' && (
          <div className="space-y-3">
            <input type="text" placeholder="পণ্য খুঁজুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-white" />
            <div className="grid grid-cols-2 gap-3">
              {products.filter(p => p.name.includes(searchQuery)).map(p => (
                <div key={p.id} className="bg-white p-3 rounded-xl shadow-sm border flex flex-col justify-between">
                  <div>
                    <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-lg mb-2" />
                    <h3 className="font-bold text-xs">{p.name}</h3>
                    <p className="text-orange-600 font-bold text-xs mt-1">৳ {p.price}</p>
                  </div>
                  <button onClick={() => addToCart(p)} className="mt-2 bg-orange-50 text-orange-600 font-bold py-1.5 rounded-lg text-xs w-full">কার্টে নিন</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="font-bold text-sm border-b pb-2">আপনার কার্ট</h3>
            {cart.length === 0 ? <p className="text-xs text-gray-400 text-center py-6">কার্ট খালি</p> : (
              cart.map(i => (
                <div key={i.id} className="flex justify-between items-center text-xs border-b pb-2">
                  <span>{i.name} (x{i.qty})</span>
                  <span className="font-bold text-orange-600">৳ {i.price * i.qty}</span>
                </div>
              ))
            )}
            {cart.length > 0 && (
              <button onClick={() => { alert('অর্ডার কনফার্ম হয়েছে!'); setCart([]); }} className="w-full bg-orange-600 text-white py-2.5 rounded-xl font-bold text-xs">অর্ডার কনফার্ম করুন</button>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 text-xs">
            <p className="font-bold">ব্যবহারকারী: {userName || 'N/A'}</p>
            <button onClick={handleLogout} className="w-full bg-red-100 text-red-600 font-bold py-2 rounded-xl">লগআউট করুন</button>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 z-40 text-xs">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-orange-600 font-bold' : 'text-gray-400'}>🏠 হোম</button>
        <button onClick={() => setActiveTab('cart')} className={activeTab === 'cart' ? 'text-orange-600 font-bold' : 'text-gray-400'}>🛒 কার্ট ({cart.reduce((a, c) => a + c.qty, 0)})</button>
        <button onClick={() => setActiveTab('admin')} className={activeTab === 'admin' ? 'text-orange-600 font-bold' : 'text-gray-400'}>⚙️ একাউন্ট</button>
      </nav>
    </div>
  );
}
