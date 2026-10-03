import React, { useState, useEffect } from 'react';

// Interfaces
interface Product {
  id: number;
  title: string;
  price: number;
  discount: string;
  category: string;
  seller: string;
  img: string;
}

interface UserProfile {
  name: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  items: Product[];
  totalAmount: number;
  date: string;
}

export default function App() {
  // PWA/Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Active Tab: 'shop', 'post', 'cart', 'admin'
  const [activeTab, setActiveTab] = useState<'shop' | 'post' | 'cart' | 'admin'>('shop');

  // User Profile State (Stored in LocalStorage)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('bss_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login Form State
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginAddress, setLoginAddress] = useState('');

  // Products Data State
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      title: 'স্মার্ট ওয়াচ (Smart Watch)', 
      price: 551, 
      discount: '-72%', 
      category: 'গ্যাজেট', 
      seller: 'রনি ট্রেইডার্স', 
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=60' 
    },
    { 
      id: 2, 
      title: 'এয়ারপডস প্রু (Airpods Pro)', 
      price: 249, 
      discount: '-71%', 
      category: 'গ্যাজেট', 
      seller: 'সাফওয়ান স্টোর', 
      img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&auto=format&fit=crop&q=60' 
    },
    { 
      id: 3, 
      title: 'ম্যাসাজ গান (Massage Gun)', 
      price: 464, 
      discount: '-54%', 
      category: 'হেলথ', 
      seller: 'বরিশাল মার্ট', 
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&auto=format&fit=crop&q=60' 
    },
  ]);

  // Cart State
  const [cart, setCart] = useState<Product[]>([]);

  // Orders State (Stored in LocalStorage for Admin)
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('bss_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postCategory, setPostCategory] = useState('গ্যাজেট');
  const [sellerName, setSellerName] = useState('');
  const [postPhone, setPostPhone] = useState('');
  const [postImage, setPostImage] = useState<string>('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=60');

  // PWA Listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Save Orders to LocalStorage whenever updated
  useEffect(() => {
    localStorage.setItem('bss_orders', JSON.stringify(orders));
  }, [orders]);

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName || !loginPhone) {
      alert('অনুগ্রহ করে নাম এবং মোবাইল নম্বর দিন!');
      return;
    }
    const profile: UserProfile = {
      name: loginName,
      phone: loginPhone,
      address: loginAddress,
    };
    setUser(profile);
    localStorage.setItem('bss_user', JSON.stringify(profile));
    alert('স্বাগতম! আপনার অ্যাকাউন্ট নিবন্ধিত হয়েছে।');
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPostImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Submit Product Post
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postPrice || !sellerName || !postPhone) {
      alert('সকল তথ্য সঠিকভাবে পূরণ করুন!');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title: postTitle,
      price: Number(postPrice),
      discount: 'NEW',
      category: postCategory,
      seller: `${sellerName} (${postPhone})`,
      img: postImage,
    };

    setProducts([newProduct, ...products]);
    setPostTitle('');
    setPostPrice('');
    setSellerName('');
    setPostPhone('');
    setActiveTab('shop');
    alert('🎉 আপনার পণ্যটি পোস্ট করা হয়েছে!');
  };

  // Order Placement
  const handlePlaceOrder = () => {
    if (!user) return;
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userName: user.name,
      userPhone: user.phone,
      userAddress: user.address || 'ঠিকানা দেওয়া হয়নি',
      items: cart,
      totalAmount: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleString('bn-BD'),
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert(`🎉 আপনার অর্ডারটি সফলভাবে নেওয়া হয়েছে!\nঅর্ডার আইডি: ${newOrder.id}`);
  };

  // If First Time User (Not Logged In)
  if (!user) {
    return (
      <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#e11d48', marginTop: 0 }}>বরিশাল সুপার শপ</h2>
          <p style={{ textAlign: 'center', color: '#52525b', fontSize: '14px', marginBottom: '20px' }}>একবার রেজিস্ট্রেশন করে কেনাকাটা শুরু করুন</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>আপনার নাম *</label>
              <input type="text" required placeholder="উদাহরণ: সানি" value={loginName} onChange={(e) => setLoginName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>মোবাইল নম্বর *</label>
              <input type="tel" required placeholder="017xxxxxxxx" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>ডেলিভারি ঠিকানা (ঐচ্ছিক)</label>
              <textarea placeholder="আপনার এলাকা/রোড নং/বাড়ি নং" value={loginAddress} onChange={(e) => setLoginAddress(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box', height: '60px' }} />
            </div>

            <button type="submit" style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>
              প্রবেশ করুন 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '70px' }}>
      
      {/* Top Header */}
      <div style={{ backgroundColor: '#e11d48', color: '#fff', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>বরিশাল সুপার শপ</h2>
          <small style={{ fontSize: '11px', opacity: 0.9 }}>👤 {user.name} ({user.phone})</small>
        </div>
        <button 
          onClick={() => setActiveTab('admin')}
          style={{ backgroundColor: '#fff', color: '#e11d48', border: 'none', padding: '6px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ⚙️ এডমিন প্যানেল
        </button>
      </div>

      {/* SHOP VIEW */}
      {activeTab === 'shop' && (
        <div>
          <div style={{ backgroundColor: '#fff', padding: '10px 12px', borderBottom: '1px solid #e4e4e7' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" placeholder="পণ্য খুঁজুন..." style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #d4d4d8', outline: 'none', fontSize: '13px' }} />
              <button style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 16px', fontWeight: 'bold', fontSize: '12px' }}>Search</button>
            </div>
          </div>

          <div style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '15px', color: '#27272a', marginBottom: '10px' }}>সর্বশেষ পণ্যসমূহ 🛍️</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {products.map((p) => (
                <div key={p.id} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '8px', border: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
                    <span style={{ fontSize: '9px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#4b5563', display: 'inline-block', marginTop: '4px' }}>{p.category}</span>
                    <h4 style={{ margin: '4px 0', fontSize: '13px', color: '#18181b', lineHeight: '1.2' }}>{p.title}</h4>
                    <small style={{ fontSize: '10px', color: '#71717a', display: 'block' }}>বিক্রেতা: {p.seller}</small>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '14px' }}>৳{p.price}</span>
                      <span style={{ backgroundColor: '#ffe4e6', color: '#e11d48', fontSize: '10px', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold' }}>{p.discount}</span>
                    </div>
                    <button 
                      onClick={() => { setCart([...cart, p]); alert('কার্টে যোগ করা হয়েছে!'); }}
                      style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      🛒 কার্টে যোগ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POST PRODUCT VIEW */}
      {activeTab === 'post' && (
        <div style={{ padding: '12px' }}>
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e4e4e7' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#18181b', fontSize: '16px' }}>➕ পণ্য বিক্রির জন্য পোস্ট করুন</h3>
            <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>পণ্যের ছবি আপলোড</label>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '6px', marginTop: '4px', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>পণ্যের নাম</label>
                <input type="text" required value={postTitle} onChange={(e) => setPostTitle(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>মূল্য (৳)</label>
                <input type="number" required value={postPrice} onChange={(e) => setPostPrice(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>বিক্রেতার নাম</label>
                <input type="text" required value={sellerName} onChange={(e) => setSellerName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>মোবাইল নম্বর</label>
                <input type="tel" required value={postPhone} onChange={(e) => setPostPhone(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                🚀 পাবলিশ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CART & ORDER FORM VIEW */}
      {activeTab === 'cart' && (
        <div style={{ padding: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🛒 আপনার কার্ট ও অর্ডার ফর্ম</h3>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#71717a', margin: '40px 0' }}>আপনার কার্টে কোনো পণ্য নেই!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '13px' }}>{item.title}</h4>
                    <span style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '13px' }}>৳{item.price}</span>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, i) => i !== index))} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>মুছে ফেলুন</button>
                </div>
              ))}

              {/* Automated Order Form Details */}
              <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e4e4e7', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#18181b', borderBottom: '1px solid #f4f4f5', paddingBottom: '4px' }}>📋 কাস্টমার ডেলিভারি তথ্য</h4>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>নাম:</strong> {user.name}</p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>ফোন:</strong> {user.phone}</p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>ঠিকানা:</strong> {user.address || 'ঠিকানা দেওয়া হয়নি'}</p>
                <hr style={{ border: 'none', borderTop: '1px dashed #e4e4e7', margin: '8px 0' }} />
                <h3 style={{ margin: '0 0 10px 0', color: '#e11d48' }}>মোট প্রদেয়: ৳{cart.reduce((sum, item) => sum + item.price, 0)}</h3>
                <button onClick={handlePlaceOrder} style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                  ✅ অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADMIN PANEL VIEW */}
      {activeTab === 'admin' && (
        <div style={{ padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>⚙️ এডমিন প্যানেল - অর্ডারসমূহ</h3>
            <span style={{ fontSize: '12px', backgroundColor: '#e11d48', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>{orders.length} টি অর্ডার</span>
          </div>

          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#71717a', margin: '40px 0' }}>এখনো কোনো অর্ডার পাওয়া যায়নি!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orders.map((ord) => (
                <div key={ord.id} style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e4e4e7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f4f4f5', paddingBottom: '6px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 'bold', color: '#e11d48', fontSize: '12px' }}>{ord.id}</span>
                    <small style={{ color: '#71717a', fontSize: '10px' }}>{ord.date}</small>
                  </div>
                  <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>কাস্টমার:</strong> {ord.userName}</p>
                  <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>ফোন:</strong> <a href={`tel:${ord.userPhone}`} style={{ color: '#2563eb' }}>{ord.userPhone}</a></p>
                  <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>ঠিকানা:</strong> {ord.userAddress}</p>
                  <div style={{ marginTop: '6px', backgroundColor: '#f9fafb', padding: '6px', borderRadius: '4px' }}>
                    <small style={{ fontWeight: 'bold', color: '#374151', display: 'block' }}>অর্ডারকৃত আইটেম:</small>
                    {ord.items.map((item, i) => (
                      <span key={i} style={{ fontSize: '11px', color: '#4b5563', display: 'block' }}>• {item.title} (৳{item.price})</span>
                    ))}
                  </div>
                  <div style={{ marginTop: '6px', textAlign: 'right', fontWeight: 'bold', color: '#16a34a', fontSize: '13px' }}>
                    মোট: ৳{ord.totalAmount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', backgroundColor: '#fff', borderTop: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-around', padding: '8px 0', fontSize: '11px', color: '#71717a', zIndex: 30 }}>
        <div onClick={() => setActiveTab('shop')} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'shop' ? '#e11d48' : '#71717a', fontWeight: activeTab === 'shop' ? 'bold' : 'normal' }}>
          🛍️<br />শপ
        </div>
        <div onClick={() => setActiveTab('post')} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'post' ? '#e11d48' : '#71717a', fontWeight: activeTab === 'post' ? 'bold' : 'normal' }}>
          ➕<br />বিক্রি করুন
        </div>
        <div onClick={() => setActiveTab('cart')} style={{ textAlign: 'center', cursor: 'pointer', color: acti
