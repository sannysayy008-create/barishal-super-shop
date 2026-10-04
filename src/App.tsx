import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [allProducts, setAllProducts] = useState([
    { id: 1, name: "বরিশালের গাওয়া ঘি", price: 1200, unit: "১ কেজি", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80", seller: "সুপার শপ" },
    { id: 2, name: "সুন্দরবনের খাঁটি মধু", price: 750, unit: "৫০০ গ্রাম", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500&q=80", seller: "সুপার শপ" },
    { id: 3, name: "দেশি মুগ ডাল", price: 140, unit: "১ কেজি", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80", seller: "সুপার শপ" },
    { id: 4, name: "স্মার্ট ওয়াচ", price: 1850, unit: "১ পিস", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", seller: "সুপার শপ" }
  ]);

  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdPrice, setNewAdPrice] = useState('');
  const [newAdUnit, setNewAdUnit] = useState('');
  const [newAdImage, setNewAdImage] = useState('');

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

  const addToCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === p.id);
      if (exist) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    alert(lang === 'bn' ? 'কার্টে যোগ করা হয়েছে!' : 'Added to cart!');
  };

  const handlePostAd = (e: any) => {
    e.preventDefault();
    if (!newAdTitle || !newAdPrice) return;
    const newProduct = {
      id: Date.now(),
      name: newAdTitle,
      price: Number(newAdPrice),
      unit: newAdUnit || '১ পিস',
      image: newAdImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      seller: userName
    };
    setAllProducts([newProduct, ...allProducts]);
    setNewAdTitle('');
    setNewAdPrice('');
    setNewAdUnit('');
    setNewAdImage('');
    alert(lang === 'bn' ? 'বিজ্ঞাপন সফলভাবে পোস্ট হয়েছে!' : 'Ad posted successfully!');
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 text-gray-800">
      {!isLoggedIn && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-extrabold text-orange-600">
                {lang === 'bn' ? 'বরিশাল সুপার শপ' : 'Barishal Super Shop'}
              </h2>
              <button onClick={() => setLang(l => l === 'bn' ? 'en' : 'bn')} className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-600">
                {lang === 'bn' ? 'English 🌐' : 'বাংলা 🌐'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {lang === 'bn' ? 'দয়া করে আপনার নাম ও মোবাইল নম্বর দিয়ে প্রবেশ করুন' : 'Please enter your name & phone number'}
            </p>
            <form onSubmit={handleLogin} className="space-y-3">
              <input type="text" required placeholder={lang === 'bn' ? "আপনার নাম" : "Your Name"} value={userName} onChange={e => setUserName(e.target.value)} className="w-full p-3.5 border rounded-2xl text-sm bg-gray-50" />
              <input type="tel" required placeholder={lang === 'bn' ? "মোবাইল নম্বর" : "Phone Number"} value={userPhone} onChange={e => setUserPhone(e.target.value)} className="w-full p-3.5 border rounded-2xl text-sm bg-gray-50" />
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3.5 rounded-2xl font-bold text-sm shadow-lg">
                {lang === 'bn' ? 'প্রবেশ করুন' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      )}

      <header className="bg-orange-600 text-white p-4 sticky top-0 z-30 shadow-md flex justify-between items-center">
        <div className="font-extrabold text-base tracking-wide">
          🛍️ {lang === 'bn' ? 'বরিশাল সুপার শপ' : 'Barishal Super Shop'}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(l => l === 'bn' ? 'en' : 'bn')} className="text-xs bg-orange-700 px-2.5 py-1 rounded-xl font-bold">
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <button onClick={() => setActiveTab('admin')} className="text-xs bg-orange-700 px-2.5 py-1 rounded-xl font-bold">
            ⚙️ {lang === 'bn' ? 'অ্যাডমিন' : 'Admin'}
          </button>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-4">
        {activeTab === 'home' && (
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder={lang === 'bn' ? "পণ্য খুঁজুন..." : "Search products..."} 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="w-full p-3.5 border border-gray-200 rounded-2xl text-xs bg-white shadow-xs" 
            />
            <div className="grid grid-cols-2 gap-3">
              {allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div key={p.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-xl mb-2 bg-gray-50" />
                    <h3 className="font-bold text-xs text-gray-800 line-clamp-1">{p.name}</h3>
                    <p className="text-[10px] text-gray-400">Seller: {p.seller}</p>
                    <p className="text-orange-600 font-extrabold text-xs mt-1">৳ {p.price} <span className="text-[10px] text-gray-400 font-normal">({p.unit})</span></p>
                  </div>
                  <button onClick={() => addToCart(p)} className="mt-3 bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-600 font-bold py-2 rounded-xl text-xs w-full transition-all border border-orange-100">
                    {lang === 'bn' ? 'কার্টে নিন' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm border-b pb-2 text-orange-600">
              📢 {lang === 'bn' ? 'নতুন বিজ্ঞাপন পোস্ট করুন' : 'Post New Advertisement'}
            </h3>
            <form onSubmit={handlePostAd} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-500 font-bold">{lang === 'bn' ? 'পণ্যের নাম' : 'Product Name'}</label>
                <input type="text" required placeholder="যেমন: নতুন কুকার" value={newAdTitle} onChange={e => setNewAdTitle(e.target.value)} className="w-full p-3 mt-1 border rounded-xl bg-gray-50" />
              </div>
              <div>
                <label className="text-gray-500 font-bold">{lang === 'bn' ? 'মূল্য (টাকা)' : 'Price (BDT)'}</label>
                <input type="number" required placeholder="যেমন: ৫০০" value={newAdPrice} onChange={e => setNewAdPrice(e.target.value)} className="w-full p-3 mt-1 border rounded-xl bg-gray-50" />
              </div>
              <div>
                <label className="text-gray-500 font-bold">{lang === 'bn' ? 'পরিমাণ/ইউনিট' : 'Unit'}</label>
                <input type="text" placeholder="যেমন: ১ কেজি / ১ পিস" value={newAdUnit} onChange={e => setNewAdUnit(e.target.value)} className="w-full p-3 mt-1 border rounded-xl bg-gray-50" />
              </div>
              <div>
                <label className="text-gray-500 font-bold">{lang === 'bn' ? 'ছবির লিংক (URL)' : 'Image URL'}</label>
                <input type="url" placeholder="https://..." value={newAdImage} onChange={e => setNewAdImage(e.target.value)} className="w-full p-3 mt-1 border rounded-xl bg-gray-50" />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold shadow-md">
                {lang === 'bn' ? 'বিজ্ঞাপন প্রকাশ করুন' : 'Publish Ad'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-3xl shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm border-b pb-2">🛒 {lang === 'bn' ? 'আপনার কার্ট' : 'Your Cart'}</h3>
            {cart.length === 0 ? <p className="text-xs text-gray-400 text-center py-10">{lang === 'bn' ? 'আপনার কার্ট খালি!' : 'Cart is empty!'}</p> : (
              cart.map(i => (
                <div key={i.id} className="flex justify-between items-center text-xs border-b pb-2">
                  <span>{i.name} (x{i.qty})</span>
                  <span className="font-bold text-orange-600">৳ {i.price * i.qty}</span>
                </div>
              ))
            )}
            {cart.length > 0 && (
              <button onClick={() => { alert(lang === 'bn' ? 'অর্ডার সফলভাবে কনফার্ম হয়েছে!' : 'Order confirmed successfully!'); setCart([]); }} className="w-full bg-orange-600 text-white py-3 rounded-2xl font-bold text-xs shadow-md">
                {lang === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order'}
              </button>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4 text-xs">
            <div className="border-b pb-3">
              <h3 className="font-extrabold text-sm text-orange-600">⚙️ {lang === 'bn' ? 'এডমিন ও অ্যাকাউন্ট প্যানেল' : 'Admin & Account Panel'}</h3>
              <p className="text-gray-400 text-[10px] mt-1">Role: Administrator</p>
            </div>
            <div className="space-y-2 bg-gray-50 p-3 rounded-2xl">
              <p><strong className="text-gray-500">{lang === 'bn' ? 'নাম:' : 'Name:'}</strong> {userName || 'N/A'}</p>
              <p><strong className="text-gray-500">{lang === 'bn' ? 'ফোন:' : 'Phone:'}</strong> {userPhone || 'N/A'}</p>
            </div>
            <div className="border-t pt-3 space-y-2">
              <button onClick={() => setActiveTab('post')} className="w-full bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold py-3 rounded-xl border border-orange-200">
                📢 {lang === 'bn' ? 'বিজ্ঞাপন দিন' : 'Post Ad'}
              </button>
              <button onClick={handleLogout} className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl border border-red-100">
                🚪 {lang === 'bn' ? 'লগআউট করুন' : 'Logout'}
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-40 text-xs shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
          <span className="text-base">🏠</span><span className="text-[10px]">{lang === 'bn' ? 'হোম' : 'Home'}</span>
        </button>
        <button onClick={() => setActiveTab('post')} className={`flex flex-col items-center ${activeTab === 'post' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
          <span className="text-base">📢</span><span className="text-[10px]">{lang === 'bn' ? 'বিজ্ঞাপন' : 'Post'}</span>
        </button>
        <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center relative ${activeTab === 'cart' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
          <span className="text-base">🛒</span>
          <span className="text-[10px]">{lang === 'bn' ? 'কার্ট' : 'Cart'} ({cart.reduce((a, c) => a + c.qty, 0)})</span>
        </button>
        <button onClick={() => setActiveTab('admin')} className={`flex flex-col items-center ${activeTab === 'admin' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
          <span className="text-base">⚙️</span><span className="text-[10px]">{lang === 'bn' ? 'এডমিন' : 'Admin'}</span>
        </button>
      </nav>
    </div>
  );
                  }
