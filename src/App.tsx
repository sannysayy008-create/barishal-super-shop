import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  sellerName: string;
  status: 'Pending' | 'Approved';
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: Product[];
  total: number;
  status: string;
  paymentMethod: string;
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'orders' | 'seller' | 'admin' | 'account'>('shop');
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>('bKash');
  
  // অ্যাডমিন সিকিউরিটি স্টেট
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const CORRECT_PIN = '1234';

  // অর্ডার ফর্মের কাস্টমার ইনপুট স্টেট
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // বিক্রেতা (Seller) পণ্য আপলোড স্টেট
  const [sellerShopName, setSellerShopName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerProdName, setSellerProdName] = useState('');
  const [sellerProdPrice, setSellerProdPrice] = useState('');
  const [sellerProdImg, setSellerProdImg] = useState('');

  // পণ্যের তালিকা
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'প্রিমিয়াম লেদার জ্যাকেট',
      price: 2500,
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      sellerName: 'Barishal Official',
      status: 'Approved'
    },
    {
      id: 2,
      name: 'স্মার্ট ওয়াচ সিরিজ ৮',
      price: 1850,
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      sellerName: 'Barishal Official',
      status: 'Approved'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1001',
      customerName: 'Fida Al Sani',
      phone: '01700000000',
      address: 'Barishal Sadar',
      items: [{ id: 1, name: 'প্রিমিয়াম লেদার জ্যাকেট', price: 2500, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', sellerName: 'Barishal Official', status: 'Approved' }],
      total: 2500,
      status: 'Pending',
      paymentMethod: 'bKash',
      date: '04 Oct 2026'
    }
  ]);

  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdImg, setNewProdImg] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === CORRECT_PIN) {
      setIsAdminLoggedIn(true);
      alert('অ্যাডমিন প্যানেলে সফলভাবে প্রবেশ করেছেন!');
    } else {
      alert('ভুল পিন কোড! আবার চেষ্টা করুন।');
      setAdminPin('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isSeller: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isSeller) {
          setSellerProdImg(reader.result as string);
        } else {
          setNewProdImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerShopName || !sellerPhone || !sellerProdName || !sellerProdPrice) {
      alert('দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন!');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: sellerProdName,
      price: Number(sellerProdPrice),
      img: sellerProdImg || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      sellerName: `${sellerShopName} (${sellerPhone})`,
      status: 'Pending'
    };

    setProducts([newProduct, ...products]);
    setSellerProdName('');
    setSellerProdPrice('');
    setSellerProdImg('');
    alert('বিজ্ঞাপন সফলভাবে সাবমিট হয়েছে! অ্যাডমিন অনুমোদন করার পর এটি শপে দেখা যাবে।');
    setActiveTab('shop');
  };

  const handleApproveProduct = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    alert('পণ্যটি সফলভাবে অ্যাপ্রুভ করা হয়েছে!');
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    alert('পণ্যটি মুছে ফেলা হয়েছে!');
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert('কার্টে পণ্য যোগ করা হয়েছে!');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('আপনার কার্ট খালি!');
      return;
    }
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন!');
      return;
    }

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: customerName,
      phone: customerPhone,
      address: customerAddress,
      items: [...cart],
      total: totalPrice,
      status: 'Pending',
      paymentMethod: selectedPayment,
      date: new Date().toLocaleDateString()
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    alert('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
    setActiveTab('orders');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const product: Product = {
      id: Date.now(),
      name: newProdName,
      price: Number(newProdPrice),
      img: newProdImg || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      sellerName: 'Barishal Official (Admin)',
      status: 'Approved'
    };

    setProducts([product, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdImg('');
    alert('নতুন পণ্য সফলভাবে যুক্ত করা হয়েছে!');
    setActiveTab('shop');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <header className="bg-orange-500 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white text-orange-600 font-bold rounded-full flex items-center justify-center text-sm shadow">
            BS
          </div>
          <h1 className="text-base font-bold">Barishal Super Shop</h1>
        </div>
        <div className="flex space-x-1.5">
          <button 
            onClick={() => setActiveTab('seller')} 
            className="text-xs bg-amber-600 text-white px-2 py-1 rounded-md font-bold shadow">
            📢 বিক্রেতা পোস্ট
          </button>
          <button 
            onClick={() => setActiveTab('admin')} 
            className="text-xs bg-red-600 text-white px-2 py-1 rounded-md font-bold shadow">
            ⚙️ অ্যাডমিন
          </button>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {activeTab === 'shop' && (
          <div>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white shadow mb-4">
              <span className="bg-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">মেগা অফার</span>
              <h2 className="text-md font-bold mt-2">শনিবার স্পেশাল ডিসকাউন্ট! ⚡</h2>
              <p className="text-xs opacity-90 mt-0.5">সব পণ্যে ফ্ল্যাট ২০% ছাড় এবং ফ্রি ডেলিভারি।</p>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-800">সকল পণ্যসমূহ</h3>
              <button 
                onClick={() => setActiveTab('seller')}
                className="text-xs text-orange-600 font-bold underline">
                + আপনিও পণ্য বিক্রি করতে চান?
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products.filter(p => p.status === 'Approved').map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
                  <div>
                    <img src={p.img} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
                    <h4 className="font-medium text-xs text-gray-800 truncate">{p.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">বিক্রেতা: {p.sellerName}</p>
                  </div>
                  <div>
                    <p className="text-orange-600 font-bold text-sm mt-1">৳ {p.price}</p>
                    <button 
                      onClick={() => addToCart(p)} 
                      className="mt-2 w-full bg-orange-500 text-white text-xs py-1.5 rounded-lg font-medium">
                      কার্টে যোগ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seller' && (
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="bg-amber-500 text-white p-3 rounded-xl shadow-sm text-center">
              <h2 className="text-sm font-bold">📢 বিক্রেতা পোর্টাল (বিজ্ঞাপন পোস্ট)</h2>
              <p className="text-[11px] opacity-90 mt-0.5">আপনার পণ্য পোস্ট করুন। অ্যাডমিন অ্যাপ্রুভ করার পর তা শপে দেখাবে।</p>
            </div>

            <form onSubmit={handleSellerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-600 font-medium">দোকান বা আপনার নাম</label>
                <input 
                  type="text" 
                  value={sellerShopName} 
                  onChange={(e) => setSellerShopName(e.target.value)}
                  placeholder="যেমন: ভাই ভাই ফ্যাশন" 
                  className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-amber-500" 
                  required 
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">আপনার মোবাইল নম্বর</label>
                <input 
                  type="tel" 
                  value={sellerPhone} 
                  onChange={(e) => setSellerPhone(e.target.value)}
                  placeholder="01700000000" 
                  className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-amber-500" 
                  required 
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">পণ্যের নাম</label>
                <input 
                  type="text" 
                  value={sellerProdName} 
                  onChange={(e) => setSellerProdName(e.target.value)}
                  placeholder="পণ্যের নাম লিখুন" 
                  className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-amber-500" 
                  required 
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">দাম (টাকা)</label>
                <input 
                  type="number" 
                  value={sellerProdPrice} 
                  onChange={(e) => setSellerProdPrice(e.target.value)}
                  placeholder="মূল্য দিন" 
                  className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-amber-500" 
                  required 
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">পণ্যের ছবি (গ্যালারি থেকে)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="w-full border p-2 rounded-lg mt-1 text-xs bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" 
                />
              </div>
              {sellerProdImg && (
                <div className="mt-2">
                  <p className="text-[10px] text-emerald-600 font-bold">✓ ছবি সিলেক্ট হয়েছে</p>
                  <img src={sellerProdImg} alt="Preview" className="h-16 w-16 object-cover rounded mt-1 border" />
                </div>
              )}
              <button type="submit" className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-bold hover:bg-amber-700 shadow">
                অনুমোদনের জন্য পোস্ট সাবমিট করুন
              </button>
            </form>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              <h2 className="text-md font-semibold text-gray-800 border-b pb-2">আমার কার্ট ({cart.length})</h2>
              {cart.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-gray-400 text-sm">আপনার কার্ট খালি রয়েছে।</p>
                  <button 
                    onClick={() => setActiveTab('shop')} 
                    className="text-xs bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                    পণ্য কিনতে হোম পেজে যান
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b pb-2">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-orange-600 font-bold">৳ {item.price}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between items-center text-sm font-bold">
                    <span>মোট মূল্য:</span>
                    <span className="text-orange-600">৳ {totalPrice}</span>
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <h3 className="text-sm font-bold text-gray-800 border-b pb-2">📝 অর্ডারের তথ্য দিন (ফর্ম)</h3>
                
                <div className="text-xs space-y-3">
                  <div>
                    <label className="text-gray-600 font-medium">আপনার নাম</label>
                    <input 
                      type="text" 
                      value={customerName} 
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="পুরো নাম লিখুন" 
                      className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-orange-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">মোবাইল নম্বর</label>
                    <input 
                      type="tel" 
                      value={customerPhone} 
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="যেমন: 01700000000" 
                      className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-orange-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">ডেলিভারি ঠিকানা</label>
                    <textarea 
                      value={customerAddress} 
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="বাসা/রোড, এলাকা, থানা, জেলা" 
                      className="w-full border p-2 rounded-lg mt-1 outline-none focus:border-orange-500" 
                      rows={2}
                      required 
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700 mb-1.5">পেমেন্ট মাধ্যম:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['bKash', 'Nagad', 'Rocket', 'Cash On Delivery'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setSelectedPayment(method)}
                          className={`p-2 rounded-lg border font-medium text-center ${selectedPayment === method ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-700'}`}>
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-xs font-bold shadow hover:bg-orange-600 mt-2">
                  অর্ডার কনফার্ম করুন ({selectedPayment})
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-3">
            <h2 className="text-md font-semibold text-gray-800 mb-2">আমার অর্ডারসমূহ</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-xl p-4 shadow-sm space-y-2 border border-gray-100 text-xs">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-bold text-gray-700">{ord.id}</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold">{ord.status}</span>
                </div>
                <p><strong>গ্রাহক:</strong> {ord.customerName} ({ord.phone})</p>
                <p><strong>ঠিকানা:</strong> {ord.address}</p>
                {ord.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-600">
                    <span>{item.name}</span>
                    <span className="font-bold">৳ {item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-500">পেমেন্ট: {ord.paymentMethod}</span>
                  <span className="font-bold text-orange-600">মোট: ৳ {ord.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'admin' && (
          <div>
            {!isAdminLoggedIn ? (
              <div className="bg-white rounded-xl p-6 shadow-sm max-w-sm mx-auto text-center space-y-4 mt-10">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                  🔒
                </div>
                <h2 className="text-sm font-bold text-gray-800">অ্যাডমিন সিক্রেট পিন দিন</h2>
                <p className="text-xs text-gray-500">অনুমোদিত ব্যক্তি ছাড়া কেউ এখানে প্রবেশ করতে পারবে না।</p>
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input 
                    type="password" 
                    value={adminPin} 
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="পিন কোড দিন (1234)" 
                    className="w-full border p-2.5 rounded-lg text-xs text-center outline-none focus:border-red-500 font-bold tracking-widest" 
                    required 
                  />
                  <button type="submit" className="w-full bg-red-600 text-white py-2.5 rounded-lg text-xs font-bold shadow hover:bg-red-700">
                    লগইন করুন
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-500 text-wh
