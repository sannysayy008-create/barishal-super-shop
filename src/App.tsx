import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PostAdModal } from './components/PostAdModal';
import { CheckoutModal } from './components/CheckoutModal';
import { sendTelegramOrder } from './services/telegram';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<'admin' | 'moderator' | 'user'>('admin'); // Admin / Moderator management

  // প্রোডাক্ট লিস্ট
  const [products, setProducts] = useState<any[]>([
    { id: 1, title: 'হেয়ার ট্রিমার (T9)', price: 253, originalPrice: 430, discount: '-41%', condition: 'new', category: 'electronics', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'নাগা মরীচ বীজ', price: 43, originalPrice: 150, discount: '-71%', condition: 'new', category: 'gardening', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'গোল্ডেন ব্রেসলেট', price: 159, originalPrice: 390, discount: '-59%', condition: 'used', category: 'fashion', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'ব্লুটুথ স্পিকার', price: 779, originalPrice: 950, discount: '-18%', condition: 'new', category: 'electronics', image: 'https://via.placeholder.com/150' }
  ]);

  const [cartItems, setCartItems] = useState<any[]>([]);

  // অর্ডারের সময় টেলিগ্রামে নোটিফিকেশন পাঠানো
  const handleCompleteOrder = async (orderDetails: any) => {
    await sendTelegramOrder(orderDetails);
    alert(`ধন্যবাদ ${orderDetails.name}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে এবং টেলিগ্রাম বটে নোটিফিকেশন পাঠানো হয়েছে।`);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('আপনি কি নিশ্চিত যে এই প্রোডাক্টটি ডিলিট করতে চান?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-sans">
      {/* দারাজ স্টাইল সার্চবার ও হেডার */}
      <div className="bg-pink-600 p-3 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="বরিশাল সুপার শপে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-3 pr-10 rounded-full text-black text-sm outline-none shadow-inner"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-700 text-white px-3 py-1 rounded-full text-xs font-bold">
              Search
            </button>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-pink-700 rounded-full"
          >
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* সার্ভিস ট্রাস্ট ব্যাজ */}
        <div className="flex justify-between items-center text-[10px] mt-2 pt-2 border-t border-pink-500/50 px-1 opacity-90">
          <span>💳 Safe Payment</span>
          <span>🚚 Fast Delivery</span>
          <span>🔄 Free Return</span>
        </div>
      </div>

      <main className="max-w-md mx-auto p-3 space-y-4">
        {/* রানিং প্রমোশনাল ব্যানার */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">PAYDAY SALE</span>
            <span className="text-xs">23 - 30 SEP</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-wide">Welcome: 15% OFF + Free Delivery</h2>
          <p className="text-xs mt-1 opacity-90">বরিশাল সদরে ২ ঘণ্টায় হোম ডেলিভারি!</p>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-pink-600 px-3 py-1.5 rounded-xl font-bold text-xs shadow"
            >
              Shop Now
            </button>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-black/20 text-white px-3 py-1.5 rounded-xl font-semibold text-xs border border-white/30"
            >
              + ফ্রি বিজ্ঞাপন দিন
            </button>
          </div>
        </div>

        {/* ফ্ল্যাশ সেল সেকশন (Flash Sale) */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-red-600 text-base">Flash Sale</h3>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">02:27:22</span>
            </div>
            <span className="text-xs text-pink-600 font-semibold cursor-pointer">Shop More &gt;</span>
          </div>

          {/* প্রডাক্ট গ্রিড */}
          <div className="grid grid-cols-2 gap-2">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border border-gray-100 rounded-xl p-2 bg-white relative shadow-sm">
                {/* এডমিন/মডারেটর কন্টেন্ট কন্ট্রোল */}
                {(role === 'admin' || role === 'moderator') && (
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full z-10 font-bold"
                    title="ডিলিট করুন"
                  >
                    ✕
                  </button>
                )}

                <div className="w-full h-28 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-xs text-gray-400 relative">
                  [ছবি]
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
                  <span className="text-red-500 text-[9px] font-bold">{product.discount}</span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-2 bg-pink-600 hover:bg-pink-700 text-white py-1 rounded-lg text-xs font-bold transition-colors"
                >
                  কার্টে রাখুন
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* নেভিগেশন বার */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => setIsPostModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        user={{ role }}
      />

      {/* পোস্ট মডাল */}
      {isPostModalOpen && (
        <PostAdModal
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={(postData) => {
            setProducts([...products, { id: Date.now(), ...postData, originalPrice: Number(postData.price) + 100, discount: '-10%', image: '' }]);
            alert('বিজ্ঞাপনটি সফলভাবে যুক্ত করা হয়েছে!');
            setIsPostModalOpen(false);
          }}
        />
      )}

      {/* অর্ডার ও চেকআউট মডাল (বিকাশ/নগদ/ক্যাশ অন ডেলিভারি পেমেন্ট) */}
      {isCartOpen && (
        <CheckoutModal
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClose={() => setIsCartOpen(false)}
          onCompleteOrder={handleCompleteOrder}
        />
      )}
    </div>
  );
}

export default App;
            
