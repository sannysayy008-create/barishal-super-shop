import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'account'>('shop');
  const [cart, setCart] = useState<Product[]>([]);
  
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
    alert('কার্টে যোগ করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-orange-500 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-lg font-bold">🛒 Barishal Super Shop</h1>
        <span className="text-xs bg-orange-600 px-2 py-1 rounded">Fida Al Sani</span>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {activeTab === 'shop' && (
          <div>
            <h2 className="text-md font-semibold mb-3 text-gray-800">সকল পণ্যসমূহ</h2>
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
                  <img src={p.img} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
                  <h4 className="font-medium text-xs text-gray-800 truncate">{p.name}</h4>
                  <p className="text-orange-600 font-bold text-sm mt-1">৳ {p.price}</p>
                  <button 
                    onClick={() => addToCart(p)} 
                    className="mt-2 bg-orange-500 text-white text-xs py-1.5 rounded-lg font-medium">
                    কার্টে যোগ করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-md font-semibold mb-4 text-gray-800">আমার কার্ট ({cart.length})</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-12 text-sm">আপনার কার্ট খালি রয়েছে।</p>
            ) : (
              <div>
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-3 mb-3">
                    <h4 className="font-medium text-xs text-gray-800">{item.name}</h4>
                    <p className="text-xs text-orange-600 font-bold">৳ {item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
            <h2 className="text-md font-semibold mb-3 text-gray-800">প্রোফাইল</h2>
            <p className="text-xs"><strong>নাম:</strong> Fida Al Sani</p>
            <p className="text-xs"><strong>ফোন:</strong> 01700000000</p>
            <p className="text-xs"><strong>ঠিকানা:</strong> Barishal Sadar</p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 shadow-lg z-50 max-w-lg mx-auto">
        <button onClick={() => setActiveTab('shop')} className={`text-xs ${activeTab === 'shop' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          হোম
        </button>
        <button onClick={() => setActiveTab('cart')} className={`text-xs ${activeTab === 'cart' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          কার্ট ({cart.length})
        </button>
        <button onClick={() => setActiveTab('account')} className={`text-xs ${activeTab === 'account' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          প্রোফাইল
        </button>
      </nav>
    </div>
  );
}
