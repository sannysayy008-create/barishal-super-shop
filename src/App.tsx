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
  const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN_HERE";
  const TELEGRAM_CHAT_ID = "8633414899";

  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'moderator'>('user');

  const [customerName, setCustomerName] = useState<string>(() => localStorage.getItem('cust_name') || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => localStorage.getItem('cust_phone') || '');
  const [customerAddress, setCustomerAddress] = useState<string>(() => localStorage.getItem('cust_address') || '');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'হেয়ার ট্রিমার (T9)', price: 253, originalPrice: 430, category: 'electronics', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300' },
    { id: 2, title: 'নাগা মরীচ বীজ', price: 43, originalPrice: 150, category: 'groceries', image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300' },
    { id: 3, title: 'গোল্ডেন ব্রেসলেট', price: 159, originalPrice: 390, category: 'fashion', image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300' },
    { id: 4, title: 'ব্লুটুথ স্পিকার', price: 779, originalPrice: 950, category: 'electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300' }
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('electronics');

  const addToCart = (product: Product) => setCartItems([...cartItems, product]);
  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const deleteProduct = (id: number) => {
    if (window.confirm('আপনি কি নিশ্চিত এই পণ্যটি ডিলিট করতে চান?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে আপনার নাম, নম্বর ও ঠিকানা লিখুন।');
      return;
    }
    const itemsList = cartItems.map((item) => `• ${item.title} - ৳${item.price}`).join('\n');
    const telegramMessage = `🛒 *নতুন অর্ডার এসেছে!*\n\n👤 *নাম:* ${customerName}\n📞 *ফোন:* ${customerPhone}\n🏠 *ঠিকানা:* ${customerAddress}\n\n📦 *পণ্যসমূহ:*\n${itemsList}\n\n💰 *মোট:* ৳${totalPrice}`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMessage, parse_mode: 'Markdown' }),
      });
      alert(`ধন্যবাদ ${customerName}! আপনার অর্ডারটি গ্রহণ করা হয়েছে।`);
      setCartItems([]);
      setActiveTab('home');
    } catch {
      alert('অর্ডার পাঠাতে সমস্যা হয়েছে।');
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
      <div className="bg-pink-600 p-3 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 rounded-full text-black text-sm outline-none"
          />
          <button onClick={() => setActiveTab('cart')} className="relative p-2 bg-pink-700 rounded-full text-lg">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto p-3 space-y-4">
        {userRole !== 'user' && (
          <div className={`p-2 rounded-xl text-center text-xs font-bold ${userRole === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
            {userRole === 'admin' ? '👑 এডমিন মোড সক্রিয়' : '🛡️ মডারেটর মোড সক্রিয়'}
          </div>
        )}

        {activeTab === 'home' && (
          <div className={`p-3 rounded-2xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-xl p-2 relative">
                  {userRole === 'admin' && (
                    <button onClick={() => deleteProduct(product.id)} className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full z-10">
                      ডিলিট 🗑️
                    </button>
                  )}
                  <img src={product.image} alt={product.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h4 className="text-xs font-semibold line-clamp-1">{product.title}</h4>
                  <p className="text-pink-600 font-bold text-sm">৳{product.price}</p>
                  <button onClick={() => addToCart(product)} className="w-full mt-2 bg-pink-600 text-white py-1 rounded-lg text-xs font-bold">
                    কার্টে রাখুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className={`p-4 rounded-2xl shadow-sm space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold border-b pb-2 text-base">আপনার শপিং কার্ট</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 rounded bg-gray-50 text-black">
                <span>{item.title}</span>
                <span className="font-bold">৳{item.price}</span>
              </div>
            ))}
            <div className="font-bold text-sm border-t pt-2">মোট: ৳{totalPrice}</div>
            <form onSubmit={handleOrderSubmit} className="space-y-2">
              <input type="text" placeholder="নাম" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border p-2 text-xs rounded text-black" />
              <input type="tel" placeholder="ফোন" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full border p-2 text-xs rounded text-black" />
              <textarea placeholder="ঠিকানা" required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full border p-2 text-xs rounded text-black" />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-sm">অর্ডার করুন</button>
            </form>
          </div>
        )}

        {activeTab === 'post' && (
          <div className={`p-4 rounded-2xl shadow-sm space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold border-b pb-2 text-base">নতুন বিজ্ঞাপন দিন</h3>
            <form onSubmit={handlePostAd} className="space-y-3">
              <input type="text" placeholder="পণ্যের নাম" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border p-2 text-sm rounded text-black" />
              <input type="number" placeholder="দাম" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border p-2 text-sm rounded text-black" />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-sm">পোস্ট করুন</button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={`p-4 rounded-2xl shadow-sm space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold border-b pb-2 text-base">সেটিংস</h3>
            <div className="flex gap-2">
              <button onClick={() => setUserRole('user')} className="p-2 border text-xs rounded">User</button>
              <button onClick={() => setUserRole('moderator')} className="p-2 border text-xs rounded">Moderator</button>
              <button onClick={() => setUserRole('admin')} className="p-2 border text-xs rounded">Admin</button>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t py-2 bg-white flex justify-around text-xs text-black">
        <button onClick={() => setActiveTab('home')}>🏠 হোম</button>
        <button onClick={() => setActiveTab('cart')}>🛒 কার্ট ({cartItems.length})</button>
        <button onClick={() => setActiveTab('post')}>➕ পোস্ট</button>
        <button onClick={() => setActiveTab('settings')}>⚙️ সেটিংস</button>
      </div>
    </div>
  );
}

export default App;
                
