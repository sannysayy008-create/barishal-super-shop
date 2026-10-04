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
}

export default function App() {
  const [tab, setTab] = useState<'shop' | 'seller' | 'cart' | 'orders' | 'admin'>('shop');
  const [cart, setCart] = useState<Product[]>([]);
  const [payment, setPayment] = useState('bKash');
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState('');

  // Form states
  const [cName, setCName] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cAddress, setCAddress] = useState('');

  const [sShop, setSShop] = useState('');
  const [sPhone, setSPhone] = useState('');
  const [sName, setSName] = useState('');
  const [sPrice, setSPrice] = useState('');
  const [sImg, setSImg] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500');

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'লেদার জ্যাকেট', price: 2500, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', sellerName: 'Admin', status: 'Approved' },
    { id: 2, name: 'স্মার্ট ওয়াচ', price: 1850, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', sellerName: 'Admin', status: 'Approved' }
  ]);

  const [orders, setOrders] = useState<Order[]>([]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSellerPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sShop || !sPhone || !sName || !sPrice) {
      alert('সব তথ্য পূরণ করুন!');
      return;
    }
    const newP: Product = {
      id: Date.now(),
      name: sName,
      price: Number(sPrice),
      img: sImg,
      sellerName: `${sShop} (${sPhone})`,
      status: 'Pending'
    };
    setProducts([newP, ...products]);
    setSName(''); setSPrice('');
    alert('বিজ্ঞাপন সাবমিট হয়েছে! অ্যাডমিন অ্যাপ্রুভ করলে শপে দেখাবে।');
    setTab('shop');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !cName || !cPhone || !cAddress) {
      alert('কার্ট খালি অথবা তথ্য অসম্পূর্ণ!');
      return;
    }
    const newOrd: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: cName,
      phone: cPhone,
      address: cAddress,
      items: [...cart],
      total: cart.reduce((sum, i) => sum + i.price, 0),
      status: 'Pending',
      paymentMethod: payment
    };
    setOrders([newOrd, ...orders]);
    setCart([]);
    setCName(''); setCPhone(''); setCAddress('');
    alert('অর্ডার সফল হয়েছে!');
    setTab('orders');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-orange-500 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow">
        <h1 className="font-bold text-sm">Barishal Super Shop</h1>
        <div className="flex gap-2">
          <button onClick={() => setTab('seller')} className="bg-amber-600 text-xs px-2 py-1 rounded font-bold">📢 বিক্রেতা পোস্ট</button>
          <button onClick={() => setTab('admin')} className="bg-red-600 text-xs px-2 py-1 rounded font-bold">⚙️ অ্যাডমিন</button>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {tab === 'shop' && (
          <div>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-xl mb-4 shadow">
              <h2 className="font-bold text-sm">শনিবার স্পেশাল অফার! ⚡</h2>
              <p className="text-xs opacity-90">ফ্ল্যাট ২০% ছাড় ও ফ্রি ডেলিভারি।</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {products.filter(p => p.status === 'Approved').map(p => (
                <div key={p.id} className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={p.img} alt={p.name} className="h-28 w-full object-cover rounded mb-2" />
                    <h3 className="text-xs font-bold truncate">{p.name}</h3>
                    <p className="text-[10px] text-gray-500">বিক্রেতা: {p.sellerName}</p>
                  </div>
                  <div>
                    <p className="text-orange-600 font-bold text-xs mt-1">৳ {p.price}</p>
                    <button onClick={() => { setCart([...cart, p]); alert('কার্টে যোগ হয়েছে!'); }} className="w-full bg-orange-500 text-white text-xs py-1 rounded mt-2 font-medium">কার্টে নিন</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'seller' && (
          <form onSubmit={handleSellerPost} className="bg-white p-4 rounded-xl shadow space-y-3 text-xs">
            <h2 className="font-bold text-sm text-amber-600 border-b pb-2">📢 বিক্রেতা বিজ্ঞাপন ফর্ম</h2>
            <div>
              <label>দোকান বা আপনার নাম</label>
              <input type="text" value={sShop} onChange={e => setSShop(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="যেমন: ফ্যাশন হাউজ" required />
            </div>
            <div>
              <label>মোবাইল নম্বর</label>
              <input type="tel" value={sPhone} onChange={e => setSPhone(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="01700000000" required />
            </div>
            <div>
              <label>পণ্যের নাম</label>
              <input type="text" value={sName} onChange={e => setSName(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="পণ্যের নাম" required />
            </div>
            <div>
              <label>দাম (টাকা)</label>
              <input type="number" value={sPrice} onChange={e => setSPrice(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="দাম" required />
            </div>
            <div>
              <label>পণ্যের ছবি</label>
              <input type="file" accept="image/*" onChange={handleImage} className="w-full border p-2 rounded mt-1 text-xs" />
            </div>
            <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded font-bold">পোস্ট সাবমিট করুন</button>
          </form>
        )}

        {tab === 'cart' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow space-y-2 text-xs">
              <h2 className="font-bold text-sm border-b pb-2">আমার কার্ট ({cart.length})</h2>
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b pb-1">
                  <span>{item.name}</span>
                  <span className="font-bold text-orange-600">৳ {item.price}</span>
                </div>
              ))}
              <div className="font-bold text-sm flex justify-between pt-2">
                <span>মোট:</span>
                <span className="text-orange-600">৳ {cart.reduce((s, i) => s + i.price, 0)}</span>
              </div>
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="bg-white p-4 rounded-xl shadow space-y-3 text-xs">
                <h3 className="font-bold text-sm border-b pb-2">ডেলিভারির তথ্য</h3>
                <input type="text" value={cName} onChange={e => setCName(e.target.value)} placeholder="আপনার নাম" className="w-full border p-2 rounded" required />
                <input type="tel" value={cPhone} onChange={e => setCPhone(e.target.value)} placeholder="মোবাইল নম্বর" className="w-full border p-2 rounded" required />
                <textarea value={cAddress} onChange={e => setCAddress(e.target.value)} placeholder="ঠিকানা" className="w-full border p-2 rounded" rows={2} required />
                <div className="grid grid-cols-2 gap-2">
                  {['bKash', 'Nagad', 'Cash On Delivery'].map(m => (
                    <button type="button" key={m} onClick={() => setPayment(m)} className={`p-2 border rounded font-medium ${payment === m ? 'bg-orange-50 border-orange-500 text-orange-600' : ''}`}>{m}</button>
                  ))}
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded font-bold">অর্ডার কনফার্ম করুন</button>
              </form>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-3 text-xs">
            <h2 className="font-bold text-sm">আমার অর্ডারসমূহ</h2>
            {orders.map(o => (
              <div key={o.id} className="bg-white p-3 rounded-xl shadow space-y-1">
                <div className="flex justify-between font-bold border-b pb-1">
                  <span>{o.id}</span>
                  <span className="text-orange-600">{o.status}</span>
                </div>
                <p>নাম: {o.customerName} ({o.phone})</p>
                <p>ঠিকানা: {o.address}</p>
                <p className="font-bold text-orange-600 pt-1">মোট: ৳ {o.total} ({o.paymentMethod})</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'admin' && (
          <div className="bg-white p-4 rounded-xl shadow text-xs space-y-3">
            {!isAdmin ? (
              <div className="text-center space-y-3 py-6">
                <h2 className="font-bold text-sm">অ্যাডমিন পিন দিন (1234)</h2>
                <input type="password" value={pin} onChange={e => setPin(e.target.value)} className="border p-2 rounded text-center tracking-widest font-bold" placeholder="PIN" />
                <br />
                <button onClick={() => { if (pin === '1234') setIsAdmin(true); else alert('ভুল পিন!'); }} className="bg-red-600 text-white px-4 py-2 rounded font-bold">লগইন</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="font-bold text-sm text-red-600">অ্যাডমিন কন্ট্রোল প্যানেল</h2>
                  <button onClick={() => setIsAdmin(false)} className="text-red-600 font-bold">লগআউট</button>
                </div>
                <h3 className="font-bold">অপেক্ষমাণ বিজ্ঞাপন ({products.filter(p => p.status === 'Pending').length})</h3>
                {products.filter(p => p.status === 'Pending').map(p => (
                  <div key={p.id} className="bg-amber-50 p-2 rounded border flex justify-between items-center">
                    <div>
                      <p className="font-bold">{p.name} - ৳ {p.price}</p>
                      <p className="text-[10px] text-gray-500">বিক্রেতা: {p.sellerName}</p>
                    </div>
                    <button onClick={() => setProducts(products.map(x => x.id === p.id ? { ...x, status: 'Approved' } : x))} className="bg-emerald-600 text-white px-3 py-1 rounded font-bold">অ্যাপ্রুভ</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-50 max-w-md mx-auto text-xs font-bold shadow-lg">
        <button onClick={() => setTab('shop')} className={tab === 'shop' ? 'text-orange-500' : 'text-gray-500'}>🏠 হোম</button>
        <button onClick={() => setTab('seller')} className={tab === 'seller' ? 'text-amber-600' : 'text-gray-500'}>📢 বিক্রেতা পোস্ট</button>
        <button onClick={() => setTab('cart')} className={tab === 'cart' ? 'text-orange-500' : 'text-gray-500'}>🛒 কার্ট ({cart.length})</button>
        <button onClick={() => setTab('orders')} className={tab === 'orders' ? 'text-orange-500' : 'text-gray-500'}>📦 অর্ডার্স</button>
        <button onClick={() => setTab('admin')} className={tab === 'admin' ? 'text-red-600' : 'text-gray-500'}>⚙️ অ্যাডমিন</button>
      </nav>
    </div>
  );
          }
