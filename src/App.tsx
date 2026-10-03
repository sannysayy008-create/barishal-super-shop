import React, { useState, useEffect } from 'react';

// Product Interface Type
interface Product {
  id: number;
  title: string;
  price: number;
  discount: string;
  category: string;
  seller: string;
  img: string;
}

export default function App() {
  // PWA/Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Active Tab: 'shop', 'post', 'cart'
  const [activeTab, setActiveTab] = useState<'shop' | 'post' | 'cart'>('shop');

  // Products Data State
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'স্মার্ট ওয়াচ (Smart Watch)', price: 551, discount: '-72%', category: 'গ্যাজেট', seller: 'রনি ট্রেইডার্স', img: 'https://via.placeholder.com/150/000000/FFFFFF?text=SmartWatch' },
    { id: 2, title: 'এয়ারপডস প্রু (Airpods Pro)', price: 249, discount: '-71%', category: 'গ্যাজেট', seller: 'সাফওয়ান স্টোর', img: 'https://via.placeholder.com/150/000000/FFFFFF?text=Airpods' },
    { id: 3, title: 'ম্যাসাজ গান (Massage Gun)', price: 464, discount: '-54%', category: 'হেলথ', seller: 'বরিশাল মার্ট', img: 'https://via.placeholder.com/150/000000/FFFFFF?text=MassageGun' },
  ]);

  // Cart State
  const [cart, setCart] = useState<Product[]>([]);

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postCategory, setPostCategory] = useState('গ্যাজেট');
  const [sellerName, setSellerName] = useState('');
  const [postPhone, setPostPhone] = useState('');

  // PWA Installation Listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle Install Click
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      alert('আপনার ব্রাউজারের মেনু (⋮) থেকে "Add to Home screen" বা "Install App" অপশনে ক্লিক করে অ্যাপ ইনস্টল করুন।');
    }
  };

  // Submit New Product Post
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postPrice || !sellerName || !postPhone) {
      alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন!');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title: postTitle,
      price: Number(postPrice),
      discount: 'NEW',
      category: postCategory,
      seller: `${sellerName} (${postPhone})`,
      img: 'https://via.placeholder.com/150/10b981/FFFFFF?text=' + encodeURIComponent(postTitle),
    };

    setProducts([newProduct, ...products]);
    setPostTitle('');
    setPostPrice('');
    setSellerName('');
    setPostPhone('');
    setActiveTab('shop');
    alert('🎉 আপনার পণ্যটি সফলভাবে বিক্রি করার জন্য পোস্ট করা হয়েছে!');
  };

  // Add To Cart
  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`"${product.title}" কার্টে যোগ করা হয়েছে!`);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '70px' }}>
      
      {/* Top Header */}
      <div style={{ backgroundColor: '#e11d48', color: '#fff', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>বরিশাল সুপার শপ</h2>
          <small style={{ fontSize: '11px', opacity: 0.9 }}>কেনাবেচার সেরা স্থান</small>
        </div>
        <button 
          onClick={handleInstallClick}
          style={{ backgroundColor: '#fff', color: '#e11d48', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
        >
          📲 অ্যাপ ইনস্টল করুন
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

          <div style={{ margin: '10px 12px', backgroundColor: '#fef2f2', border: '1px dashed #f87171', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#991b1b', fontSize: '12px', fontWeight: 'bold' }}>📢 আপনার পণ্য ফ্রিতে বিক্রি করতে নিচে "বিক্রি করুন" বাটনে চাপ দিন!</p>
          </div>

          <div style={{ padding: '0 12px 12px 12px' }}>
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
                      onClick={() => handleAddToCart(p)}
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
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#3f3f46' }}>পণ্যের নাম</label>
                <input type="text" required placeholder="যেমন: নতুন ঘড়ি" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#3f3f46' }}>বিক্রয় মূল্য (৳)</label>
                <input type="number" required placeholder="যেমন: 550" value={postPrice} onChange={(e) => setPostPrice(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#3f3f46' }}>ক্যাটাগরি</label>
                <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }}>
                  <option value="গ্যাজেট">গ্যাজেট</option>
                  <option value="পোশাক">পোশাক</option>
                  <option value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</option>
                  <option value="অন্যান্য">অন্যান্য</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#3f3f46' }}>আপনার নাম/দোকানের নাম</label>
                <input type="text" required placeholder="আপনার নাম" value={sellerName} onChange={(e) => setSellerName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#3f3f46' }}>মোবাইল নম্বর</label>
                <input type="tel" required placeholder="017xxxxxxxx" value={postPhone} onChange={(e) => setPostPhone(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>
                🚀 পাবলিশ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CART VIEW */}
      {activeTab === 'cart' && (
        <div style={{ padding: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🛒 আপনার কার্ট ({cart.length})</h3>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#71717a', margin: '40px 0' }}>আপনার কার্টে কোনো পণ্য নেই!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '13px' }}>{item.title}</h4>
                    <span style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '13px' }}>৳{item.price}</span>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, i) => i !== index))} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>মুছে ফেলুন</button>
                </div>
              ))}
              <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', marginTop: '10px', textAlign: 'right' }}>
                <h4 style={{ margin: 0 }}>মোট মূল্য: ৳{cart.reduce((sum, item) => sum + item.price, 0)}</h4>
                <button onClick={() => { alert('অর্ডার কনফার্ম করা হয়েছে!'); setCart([]); }} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', marginTop: '8px', fontWeight: 'bold', cursor: 'pointer' }}>অর্ডার কনফার্ম করুন</button>
              </div>
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
        <div onClick={() => setActiveTab('cart')} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === 'cart' ? '#e11d48' : '#71717a', fontWeight: activeTab === 'cart' ? 'bold' : 'normal' }}>
          🛒<br />কার্ট ({cart.length})
        </div>
      </div>

    </div>
  );
                                }
                  
