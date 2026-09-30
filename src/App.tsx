import React, { useState } from 'react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  // Product State
  const [products, setProducts] = useState([
    { 
      id: 1, 
      title: 'হেয়ার ট্রিমার (T9)', 
      price: 253, 
      originalPrice: 430, 
      condition: 'new',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300'
    },
    { 
      id: 2, 
      title: 'নাগা মরীচ বীজ', 
      price: 43, 
      originalPrice: 150, 
      condition: 'new',
      category: 'groceries',
      image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300'
    },
    { 
      id: 3, 
      title: 'গোল্ডেন ব্রেসলেট', 
      price: 159, 
      originalPrice: 390, 
      condition: 'used',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300'
    },
    { 
      id: 4, 
      title: 'ব্লুটুথ স্পিকার', 
      price: 779, 
      originalPrice: 950, 
      condition: 'new',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300'
    }
  ]);

  const [cartItems, setCartItems] = useState<any[]>([]);

  // Post Ad Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCondition, setNewCondition] = useState('new');
  const [newCategory, setNewCategory] = useState('electronics');
  const [newImage, setNewImage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর ও ঠিকানা পূরণ করুন।');
      return;
    }

    alert(`ধন্যবাদ ${customerName}! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।`);
    setCartItems([]);
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const handlePostAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    
    const priceNum = Number(newPrice);
    const newProd = {
      id: Date.now(),
      title: newTitle,
      price: priceNum,
      originalPrice: priceNum + 100,
      condition: newCondition,
      category: newCategory,
      image: newImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    };

    setProducts([newProd, ...products]);
    alert('আপনার বিজ্ঞাপন সফলভাবে পোস্ট করা হয়েছে!');
    setIsPostModalOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewImage('');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-sans">
      {/* হেডার ও সার্চ বার */}
      <div className="bg-pink-600 p-3 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="পণ্যের নাম লিখে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-8 pr-8 rounded-full text-black text-sm outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-500 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
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
      </div>

      <main className="max-w-md mx-auto p-3 space-y-4">
        {/* ব্যানার */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
          <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">SALE</span>
          <h2 className="text-xl font-extrabold mt-1">বরিশাল সুপার শপ</h2>
          <p className="text-xs mt-1 opacity-90">দ্রুত ডেলিভারি সুবিধা!</p>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-pink-600 px-3 py-1.5 rounded-xl font-bold text-xs"
            >
              এখনই কিনুন
            </button>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-black/20 text-white px-3 py-1.5 rounded-xl font-semibold text-xs border border-white/30"
            >
              + ফ্রি বিজ্ঞাপন দিন
            </button>
          </div>
        </div>

        {/* পণ্য তালিকা */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-3">
            {searchQuery ? `"${searchQuery}" এর ফলাফল` : 'পণ্যসমূহ'}
          </h3>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-semibold text-gray-600">কোনো পণ্য পাওয়া যায়নি!</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs text-pink-600 font-bold underline"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-100 rounded-xl p-2 bg-white shadow-sm">
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">{product.title}</h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-pink-600 font-bold text-sm">৳{product.price}</span>
                    <span className="text-gray-400 text-[10px] line-through">৳{product.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 bg-pink-600 text-white py-1 rounded-lg text-xs font-bold"
                  >
                    কার্টে রাখুন
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* নেভিগেশন বার */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center max-w-md mx-auto z-20 text-xs text-gray-600">
        <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-pink-600 font-bold">
          🏠 হোম
        </button>
        <button onClick={() => setIsPostModalOpen(true)} className="bg-pink-600 text-white px-3 py-1 rounded-full font-bold">
          + পোস্ট
        </button>
        <button onClick={() => setIsCartOpen(true)} className="relative">
          🛒 কার্ট ({cartItems.length})
        </button>
      </div>

      {/* পোস্ট মডাল */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-800">ফ্রি বিজ্ঞাপন দিন</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-gray-500">✕</button>
            </div>
            <form onSubmit={handlePostAd} className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">পণ্যের নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: স্মার্ট ওয়াচ"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">মূল্য (৳)</label>
                <input
                  type="number"
                  required
                  placeholder="যেমন: ৫০০"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">ক্যাটাগরি</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1 outline-none"
                >
                  <option value="electronics">ইলেকট্রনিক্স</option>
                  <option value="fashion">ফ্যাশন</option>
                  <option value="groceries">মুদি ও খাদ্য</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">পণ্যের ছবি</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border rounded-lg p-1 text-xs mt-1"
                />
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-sm">
                পোস্ট করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* কার্ট মডাল */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-800">আপনার কার্ট</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500">✕</button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center py-6 text-gray-500 text-sm">কার্ট খালি!</p>
            ) : (
              <>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded-lg">
                      <span>{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-pink-600">৳{item.price}</span>
                        <button onClick={() => removeFromCart(idx)} className="text-red-500 font-bold">✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 flex justify-between font-bold text-sm text-gray-800">
                  <span>মোট:</span>
                  <span className="text-pink-600">৳{totalPrice}</span>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-2 pt-2">
                  <input
                    type="text"
                    placeholder="আপনার নাম"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border rounded-lg p-2 text-xs"
                  />
                  <input
                    type="tel"
                    placeholder="মোবাইল নম্বর"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border rounded-lg p-2 text-xs"
                  />
                  <textarea
                    placeholder="ডেলিভারি ঠিকানা"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full border rounded-lg p-2 text-xs"
                    rows={2}
                  />
                  <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-sm">
                    অর্ডার নিশ্চিত করুন
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
    
