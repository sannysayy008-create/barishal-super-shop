import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  items: Product[];
  total: number;
  status: string;
  paymentMethod: string;
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'orders' | 'admin' | 'account'>('shop');
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>('bKash');
  
  // কাস্টমার তথ্য
  const [customerName, setCustomerName] = useState<string>('Fida Al Sani');
  const [customerPhone, setCustomerPhone] = useState<string>('01700000000');

  // পণ্যের তালিকা
  const [products, setProducts] = useState<Product[]>([
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

  // অর্ডার তালিকা (অ্যাডমিন প্যানেলে দেখার জন্য)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1001',
      customerName: 'Fida Al Sani',
      phone: '01700000000',
      items: [{ id: 1, name: 'প্রিমিয়াম লেদার জ্যাকেট', price: 2500, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' }],
      total: 2500,
      status: 'Pending',
      paymentMethod: 'bKash',
      date: '04 Oct 2026'
    }
  ]);

  // নতুন পণ্য যোগ করার স্টেট (অ্যাডমিন প্যানেলের জন্য)
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdImg, setNewProdImg] = useState('');

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

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: customerName,
      phone: customerPhone,
      items: [...cart],
      total: totalPrice,
      status: 'Pending',
      paymentMethod: selectedPayment,
      date: new Date().toLocaleDateString()
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert('অর্ডার সফলভাবে সম্পন্ন হয়েছে! অ্যাডমিন প্যানেলে চেক করুন।');
    setActiveTab('orders');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const product: Product = {
      id: Date.now(),
      name: newProdName,
      price: Number(newProdPrice),
      img: newProdImg || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    };

    setProducts([product, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdImg('');
    alert('নতুন পণ্য সফলভাবে যুক্ত করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* হেডার ও লোগো */}
      <header className="bg-orange-500 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white text-orange-600 font-bold rounded-full flex items-center justify-center text-sm shadow">
            BS
          </div>
          <h1 className="text-base font-bold">Barishal Super Shop</h1>
        </div>
        <button 
          onClick={() => setActiveTab('admin')} 
          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-md font-bold shadow">
          ⚙️ অ্যাডমিন প্যানেল
        </button>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {/* হোম / শপ ট্যাব */}
        {activeTab === 'shop' && (
          <div>
            {/* বিজ্ঞাপন ব্যানার */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white shadow mb-4">
              <span className="bg-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">মেগা অফার</span>
              <h2 className="text-md font-bold mt-2">শনিবার স্পেশাল ডিসকাউন্ট! ⚡</h2>
              <p className="text-xs opacity-90 mt-0.5">সব পণ্যে ফ্ল্যাট ২০% ছাড় এবং ফ্রি ডেলিভারি।</p>
            </div>

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
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <h2 className="text-md font-semibold text-gray-800">আমার কার্ট ({cart.length})</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-10 text-sm">আপনার কার্ট খালি রয়েছে।</p>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-3">
                      <h4 className="font-medium text-xs text-gray-800">{item.name}</h4>
                      <p className="text-xs text-orange-600 font-bold">৳ {item.price}</p>
                    </div>
                  ))}
                </div>

                {/* পেমেন্ট পদ্ধতি */}
                <div className="pt-2">
                  <p className="text-xs font-semibold text-gray-700 mb-2">পেমেন্ট পদ্ধতি নির্বাচন করুন:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['bKash', 'Nagad', 'Rocket', 'Cash On Delivery'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setSelectedPayment(method)}
                        className={`p-2.5 rounded-lg border font-medium text-center ${selectedPayment === method ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-700'}`}>
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t flex justify-between items-center text-sm font-bold">
                  <span>মোট মূল্য:</span>
                  <span className="text-orange-600">৳ {totalPrice}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-xs font-bold hover:bg-orange-600 shadow">
                  অর্ডার কনফার্ম করুন ({selectedPayment})
                </button>
              </>
            )}
          </div>
        )}

        {/* অর্ডার হিস্ট্রি ট্যাব */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            <h2 className="text-md font-semibold text-gray-800 mb-2">আমার অর্ডারসমূহ</h2>
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-10 text-sm bg-white rounded-xl">কোনো অর্ডার পাওয়া যায়নি।</p>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-xl p-4 shadow-sm space-y-2 border border-gray-100">
                  <div className="flex justify-between items-center text-xs border-b pb-2">
                    <span className="font-bold text-gray-700">{ord.id}</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold">{ord.status}</span>
                  </div>
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-600">
                      <span>{item.name}</span>
                      <span className="font-bold">৳ {item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t text-xs">
                    <span className="text-gray-500">পেমেন্ট: {ord.paymentMethod}</span>
                    <span className="font-bold text-orange-600">মোট: ৳ {ord.total}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ⚙️ আসল অ্যাডমিন প্যানেল ট্যাব */}
        {activeTab === 'admin' && (
          <div className="space-y-4">
            <div className="bg-red-500 text-white p-4 rounded-xl shadow">
              <h2 className="text-base font-bold">⚙️ অ্যাডমিন কন্ট্রোল প্যানেল</h2>
              <p className="text-xs opacity-90 mt-1">এখান থেকে আপনি কাস্টমারদের সব অর্ডার দেখতে পারবেন এবং নতুন পণ্য যোগ করতে পারবেন।</p>
            </div>

            {/* কাস্টমারদের অর্ডার তালিকা */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-gray-800 border-b pb-2">📦 কাস্টমারদের সমস্ত অর্ডার ({orders.length})</h3>
              {orders.map((ord) => (
                <div key={ord.id} className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>{ord.id}</span>
                    <span className="text-red-600">৳ {ord.total}</span>
                  </div>
                  <p className="text-gray-600"><strong>গ্রাহক:</strong> {ord.customerName} ({ord.phone})</p>
                  <p className="text-gray-600"><strong>পেমেন্ট মাধ্যম:</strong> {ord.paymentMethod}</p>
                  <p className="text-gray-600"><strong>তারিখ:</strong> {ord.date}</p>
                  <div className="pt-1 border-t mt-1">
                    <span className="font-semibold text-gray-700">পণ্য: </span>
                    {ord.items.map((it, idx) => (
                      <span key={idx} className="text-orange-600 font-medium">{it.name}, </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* নতুন পণ্য যোগ করার ফর্ম */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">➕ নতুন পণ্য যোগ করুন</h3>
              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="text-gray-600 font-medium">পণ্যের নাম</label>
                  <input 
                    type="text" 
                    value={newProdName} 
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="পণ্যের নাম লিখুন" 
                    className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-orange-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium">দাম (টাকা)</label>
                  <input 
                    type="number" 
                    value={newProdPrice} 
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="মূল্য দিন" 
                    className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-orange-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium">ছবির লিংক (Image URL)</label>
                  <input 
                    type="text" 
                    value={newProdImg} 
                    onChange={(e) => setNewProdImg(e.target.value)}
                    placeholder="https://... ছবির লিংক দিন" 
                    className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-orange-500" 
                  />
                </div>
                <button type="submit" className="w-full bg-red-600 text-white py-2.5 rounded-lg font-bold hover:bg-red-700">
                  পণ্য পাবলিশ করুন
                </button>
              </form>
            </div>
          </div>
        )}

        {/* প্রোফাইল ট্যাব */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex items-center space-x-3 border-b pb-3">
              <div className="w-12 h-12 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center text-base">
                F
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-800">Fida Al Sani</h3>
                <p className="text-xs text-gray-500">sannysayy008 (Admin)</p>
              </div>
            </div>
            <div className="text-xs space-y-2 text-gray-700">
              <p><strong>মোবাইল:</strong> {customerPhone}</p>
              <p><strong>ঠিকানা:</strong> Barishal Sadar</p>
            </div>
          </div>
        )}
      </main>

      {/* নেভিগেশন বার */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 shadow-lg z-50 max-w-lg mx-auto">
        <button onClick={() => setActiveTab('shop')} className={`text-xs ${activeTab === 'shop' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          🏠 হোম
        </button>
        <button onClick={() => setActiveTab('cart')} className={`text-xs ${activeTab === 'cart' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          🛒 কার্ট ({cart.length})
        </button>
        <button onClick={() => setActiveTab('orders')} className={`text-xs ${activeTab === 'orders' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          📦 অর্ডার্স
        </button>
        <button onClick={() => setActiveTab('admin')} className={`text-xs ${activeTab === 'admin' ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
          ⚙️ অ্যাডমিন
        </button>
        <button onClick={() => setActiveTab('account')} className={`text-xs ${activeTab === 'account' ? 'text-orange-500 font-bold' : 'text-gray-500'}`}>
          👤 প্রোফাইল
        </button>
      </nav>
    </div>
  );
              }
              
