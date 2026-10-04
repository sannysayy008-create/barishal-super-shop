import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'payment' | 'account'>('shop');
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>('bKash');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'প্রিমিয়াম লেদার জ্যাকেট',
      price: 2500,
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'
    },
    {
      id: 2,
      name: 'স্মার্ট ওয়াচ সিরিজ ৮',
      price: 1850,
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    }
  ]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert('কার্টে পণ্য যোগ করা হয়েছে!');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('আপনার কার্ট খালি!');
      return;
    }
    setActiveTab('payment');
  };

  const confirmOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      setActiveTab('shop');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* লোগো ও হেডার */}
      <header className="bg-orange-500 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white text-orange-600 font-bold rounded-full flex items-center justify-center text-sm shadow">
            BS
          </div>
          <h1 className="text-base font-bold">Barishal Super Shop</h1>
        </div>
        <span className="text-xs bg-orange-600 px-2 py-1 rounded">Fida Al Sani</span>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {orderPlaced ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm my-10">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-lg font-bold text-gray-800">অর্ডার সফল হয়েছে!</h2>
            <p className="text-xs text-gray-500 mt-1">আপনার পেমেন্ট ({selectedPayment}) সফলভাবে গৃহীত হয়েছে। খুব শীঘ্রই পণ্য পৌঁছে দেওয়া হবে।</p>
          </div>
        ) : (
          <>
            {/* বিজ্ঞাপন / ব্যানার */}
            {activeTab === 'shop' && (
              <div className="mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white shadow relative overflow-hidden">
                  <span className="bg-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">বিজ্ঞাপন / মেগা অফার</span>
                  <h2 className="text-md font-bold mt-2">শনিবার স্পেশাল ডিসকাউন্ট! ⚡</h2>
                  <p className="text-xs opacity-90 mt-0.5">যেকোনো পণ্যে ফ্ল্যাট ২০% ছাড় এবং ফ্রি হোম ডেলিভারি!</p>
                </div>
              </div>
            )}

            {/* শপ ট্যাব */}
            {activeTab === 'shop' && (
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-800">সকল পণ্যসমূহ</h3>
                <div className="grid grid-cols-2 gap-3">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
                      <img src={p.img} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
                      <h4 className="font-medium text-xs text-gray-800 truncate">{p.name}</h4>
                      <p className="text-orange-600 font-bold text-sm mt-1">৳ {p.price}</p>
                      <button 
                        onClick={() => addToCart(p)} 
                        className="mt-2 bg-orange-500 text-white text-xs py-1.5 rounded-lg font-medium hover:bg-orange-600">
                        কার্টে যোগ করুন
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* কার্ট ট্যাব */}
            {activeTab === 'cart' && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-md font-semibold mb-4 text-gray-800">আমার কার্ট ({cart.length})</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-12 text-sm">আপনার কার্ট খালি রয়েছে।</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b pb-3">
                        <h4 className="font-medium text-xs text-gray-800">{item.name}</h4>
                        <p className="text-xs text-orange-600 font-bold">৳ {item.price}</p>
                      </div>
                    ))}
                    <div className="pt-2 flex justify-between items-center font-bold text-sm">
                      <span>মোট মূল্য:</span>
                      <span className="text-orange-600">৳ {totalPrice}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-xs font-bold mt-2 hover:bg-orange-600">
                      পেমেন্টে যান
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* পেমেন্ট পদ্ধতি ট্যাব */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                <h2 className="text-md font-semibold text-gray-800">পেমেন্ট পদ্ধতি নির্বাচন করুন</h2>
                <div className="space-y-2 text-xs">
                  {['bKash', 'Nagad', 'Rocket', 'Cash On Delivery'].map((method) => (
                    <label key={method} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${selectedPayment === method ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={selectedPayment === method} 
                          onChange={() => setSelectedPayment(method)}
                          className="text-orange-500"
                        />
                        <span className="font-medium text-gray-800">{method}</span>
                      </div>
                      <span className="text-orange-600 font-bold">✔</span>
                    </label>
                  ))}
                </div>

                <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1">
                  <p className="text-gray-600">পরিশোধযোগ্য মোট পরিমাণ:</p>
                  <p className="text-base font-bold text-orange-600">৳ {totalPrice}</p>
                </div>

                <button 
                  onClick={confirmOrder}
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-700">
                  {selectedPayment} দিয়ে পেমেন্ট কনফার্ম করুন
                </button>
              </div>
            )}

            {/* প্রোফাইল ট্যাব */}
            {activeTab === 'account' && (
              <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
                <h2 className="text-md font-semibold mb-3 text-gray-800">প্রোফাইল</h2>
                <p className="text-xs"><strong>নাম:</strong> Fida Al Sani</p>
                <p className="text-xs"><strong>ইউজারনেম:</strong> sannysayy008</p>
                <p className="text-xs"><strong>ঠিকানা:</strong> Barishal Sadar</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* নিচের নেভিগেশন বার */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 shadow-lg z-50 max-w-lg mx-auto">
        <button onClick={() => setActiveTab('shop')} className={`text-xs ${activeTab === 'shop' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          🏠 হোম
        </button>
        <button onClick={() => setActiveTab('cart')} className={`text-xs ${activeTab === 'cart' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          🛒 কার্ট ({cart.length})
        </button>
        <button onClick={() => setActiveTab('payment')} className={`text-xs ${activeTab === 'payment' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          💳 পেমেন্ট
        </button>
        <button onClick={() => setActiveTab('account')} className={`text-xs ${activeTab === 'account' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          👤 প্রোফাইল
        </button>
      </nav>
    </div>
  );
}
