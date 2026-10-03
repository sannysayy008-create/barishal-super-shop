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

interface Order {
  id: string;
  items: Product[];
  totalAmount: number;
  date: string;
  status: 'To Pay' | 'To Ship' | 'To Receive' | 'To Review';
}

interface UserProfile {
  name: string;
  phone: string;
  address: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'account' | 'post' | 'admin'>('shop');
  
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('bss_user');
    return savedUser ? JSON.parse(savedUser) : { name: 'Fida Al Sani', phone: '01700000000', address: 'Barishal Sadar' };
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

  // নতুন প্রোডাক্ট পোস্ট করার স্টেট
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
    alert('কার্টে যুক্ত করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <header className="bg-emerald-600 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold">🛒 Barishal Super Shop</h1>
        <span className="text-sm bg-emerald-700 px-2 py-1 rounded">স্বাগতম, {user?.name}</span>
      </header>

      {/* Main Content Based on Active Tab */}
      <main className="p-4 max-w-4xl mx-auto">
        {activeTab === 'shop' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">সকল পণ্যসমূহ</h2>
            <div className="grid grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-lg shadow p-3 flex flex-col justify-between">
                  <img src={p.img} alt={p.name} className="h-36 w-full object-cover rounded-md mb-2" />
                  <h3 className="font-medium text-sm text-gray-800 truncate">{p.name}</h3>
                  <p className="text-emerald-600 font-bold mt-1">৳ {p.price}</p>
                  <button 
                    onClick={() => addToCart(p)} 
                    className="mt-2 bg-emerald-600 text-white text-xs py-2 rounded font-medium hover:bg-emerald-700">
                    কার্টে যোগ করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">আপনার কার্ট ({cart.length})</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">কার্ট খালি রয়েছে।</p>
            ) : (
              <div>
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-white p-3 mb-2 rounded shadow flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">৳ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">নতুন পণ্য পোস্ট করুন</h2>
            <form onSubmit={handlePostProduct} className="space-y-3">
              <div>
                পণ্যর নাম:
                <input 
                  type="text" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border p-2 rounded mt-1 text-sm" 
                  placeholder="পণ্যের নাম লিখুন" 
                  required 
                />
              </div>
              <div>
                মূল্য (টাকা):
                <input 
                  type="number" 
                  value={newProduct.price} 
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full border p-2 rounded mt-1 text-sm" 
                  placeholder="দাম লিখুন" 
                  required 
                />
              </div>
              <div>
                ছবির লিংক (URL):
                <input 
                  type="text" 
                  value={newProduct.img} 
                  onChange={(e) => setNewProduct({...newProduct, img: e.target.value})}
                  className="w-full border p-2 rounded mt-1 text-sm" 
                  placeholder="Image URL দিন" 
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded font-medium">
                পাবলিশ করুন
              </button>
            </form>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">প্রোফাইল ড্যাশবোর্ড</h2>
            <p className="text-sm"><strong>নাম:</strong> {user?.name}</p>
            <p className="text-sm mt-2"><strong>ফোন:</strong> {user?.phone}</p>
            <p className="text-sm mt-2"><strong>ঠিকানা:</strong> {user?.address}</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 shadow-lg z-50">
        <button onClick={() => setActiveTab('shop')} className={`text-xs ${activeTab === 'shop' ? 'text-emerald-600 font-bold' : 'text-gray-500'}`}>
          হোম
        </button>
        <button onClick={() => setActiveTab('cart')} className={`text-xs ${activeTab === 'cart' ? 'text-emerald-600 font-bold' : 'text-gray-500'}`}>
          কার্ট ({cart.length})
        </button>
        <button onClick={() => setActiveTab('post')} className={`text-xs ${activeTab === 'post' ? 'text-emerald-600 font-bold' : 'text-gray-500'}`}>
          পস্ট
        </button>
        <button onClick={() => setActiveTab('account')} className={`text-xs ${activeTab === 'account' ? 'text-emerald-600 font-bold' : 'text-gray-500'}`}>
          প্রোফাইল
        </button>
      </nav>
    </div>
  );
}
