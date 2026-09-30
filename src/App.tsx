import React, { useState } from 'react';

// Telegram Notification Handler
const sendTelegramOrder = async (orderDetails: any) => {
  const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
  const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

  const message = `
🛍️ *নতুন অর্ডার এসেছে - বরিশাল সুপার শপ*
----------------------------------
👤 *কাস্টমার:* ${orderDetails.name}
📞 *ফোন:* ${orderDetails.phone}
📍 *ঠিকানা:* ${orderDetails.address}
💳 *পেমেন্ট:* ${orderDetails.paymentMethod.toUpperCase()}

📦 *পণ্যসমূহ:*
${orderDetails.cartItems.map((item: any, idx: number) => `${idx + 1}. ${item.title} - ৳${item.price}`).join('\n')}

💰 *মোট:* ৳${orderDetails.totalPrice}
----------------------------------
⏰ *সময়:* ${new Date().toLocaleString('bn-BD')}
  `;

  try {
    if (TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }),
      });
    } else {
      console.log('Order notification:', message);
    }
  } catch (err) {
    console.error('Telegram Notification Error:', err);
  }
};

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  // Product State with Images
  const [products, setProducts] = useState<any[]>([
    { 
      id: 1, 
      title: 'হেয়ার ট্রিমার (T9)', 
      price: 253, 
      originalPrice: 430, 
      discount: '-41%', 
      condition: 'new',
      image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300'
    },
    { 
      id: 2, 
      title: 'নাগা মরীচ বীজ', 
      price: 43, 
      originalPrice: 150, 
      discount: '-71%', 
      condition: 'new',
      image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300'
    },
    { 
      id: 3, 
      title: 'গোল্ডেন ব্রেসলেট', 
      price: 159, 
      originalPrice: 390, 
      discount: '-59%', 
      condition: 'used',
      image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300'
    },
    { 
      id: 4, 
      title: 'ব্লুটুথ স্পিকার', 
      price: 779, 
      originalPrice: 950, 
      discount: '-18%', 
      condition: 'new',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300'
    }
  ]);

  const [cartItems, setCartItems] = useState<any[]>([]);

  // Post Ad Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCondition, setNewCondition] = useState('new');

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর ও ঠিকানা পূরণ করুন।');
      return;
    }

    const orderDetails = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      paymentMethod,
      cartItems,
      totalPrice: cartItems.reduce((acc, item) => acc + item.price, 0)
    };

    await sendTelegramOrder(orderDetails);
    alert(`ধন্যবাদ ${customerName}! আপনার অর্ডার সফলভাবে ডেস্প্যাচ করা হয়েছে।`);
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
      discount: '-10%',
      condition: newCondition,
      image: 'https://via.placeholder.com/150'
    };

    setProducts([newProd, ...products]);
    alert('আপনার বিজ্ঞাপন সফলভাবে পোস্ট করা হয়েছে!');
    setIsPostModalOpen(false);
    setNewTitle('');
    setNewPrice('');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-sans">
      {/* হেডার */}
      <div className="bg-pink-600 p-3 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="বরিশাল সুপার শপে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-3 pr-8 rounded-full text-black text-sm outline-none"
            />
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
        <div className="flex justify-between text-[10px] mt-2 pt-1 border-t border-pink-500 opacity-90 max-w-md mx-auto">
          <span>💳 Safe Payment</span>
          <span>🚚 Fast Delivery</span>
          <span>🔄 Free Return</span>
        </div>
      </div>

      <main className="max-w-md mx-auto p-3 space-y-4">
        {/* ব্যানার */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
          <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">PAYDAY SALE</span>
          <h2 className="text-xl font-extrabold mt-1">15% OFF + Free Delivery</h2>
          <p className="text-xs mt-1 opacity-90">বরিশাল সদরে ২ ঘণ্টায় হোম ডেলিভারি!</p>
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

        {/* ফ্ল্যাশ সেল সেকশন */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-red-600 text-base">Flash Sale</h3>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded">02:27:22</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border border-gray-100 rounded-xl p-2 bg-white relative shadow-sm">
                <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <span className={`absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    product.condition === 'new' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {product.condition === 'new' ? 'নতুন' : 'পুরাতন'}
                  </span>
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
        </div>
      </main>

      {/* নেভিগেশন বার */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center max-w-md mx-auto z-20 text-xs text-gray-600">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-pink-600 font-bold' : ''}>
          🏠 হোম
        </button>
        <button onClick={() => setIsPostModalOpen(true)} className="bg-pink-600 text-white px-3 py-1 rounded-full font-bold">
          + পোস্ট
        </button>
        <button onClick={() => setIsCartOpen(true)} className="relative">
          🛒 কার্ট
          {cartItems.length > 0 && (
            <span className="bg-pink-600 text-white text-[10px] px-1 rounded-full ml-0.5 font-bold">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* পোস্ট মডাল */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-800">ফ্রি বিজ্ঞাপন দিন</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-gray-500 text-lg">✕</button>
            </div>
            <form onSubmit={handlePostAd} className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">পণ্যের নাম</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">মূল্য (৳)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">অবস্থা</label>
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1"
                >
                  <option value="new">নতুন</option>
                  <option value="used">পুরাতন</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-sm">
                পোস্ট করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* চেকআউট ও পেমেন্ট মডাল */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-800">আপনার কার্ট ও চেকআউট</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 text-lg">✕</button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center py-6 text-gray-500 text-sm">আপনার কার্ট খালি!</p>
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
                  <span>মোট সর্বমোট:</span>
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
                    placeholder="ডেলিভারি ঠিকানা (বরিশাল)"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full border rounded-lg p-2 text-xs"
                    rows={2}
                  />

                  <div>
                    <label className="text-xs font-semibold text-gray-700">পেমেন্ট মেথড নির্বাচন করুন:</label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-2 rounded-lg border text-xs font-bold ${
                          paymentMethod === 'bkash' ? 'border-pink-600 bg-pink-50 text-pink-600' : 'border-gray-200'
                        }`}
                      >
                        bKash
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('nagad')}
                        className={`p-2 rounded-lg border text-xs font-bold ${
                          paymentMethod === 'nagad' ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-gray-200'
                        }`}
                      >
                        Nagad
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 rounded-lg border text-xs font-bold ${
                          paymentMethod === 'cod' ? 'border-green-600 bg-green-50 text-green-600' : 'border-gray-200'
                        }`}
                      >
                        Cash On
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-xl font-bold text-sm mt-2">
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
    
