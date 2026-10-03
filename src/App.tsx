import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  discount: string;
  category: string;
  seller: string;
  img: string;
  rating?: number;
  sold?: number;
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
  status: 'To Pay' | 'To Ship' | 'To Receive' | 'To Review';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'messages' | 'cart' | 'account' | 'post' | 'admin'>('shop');

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('bss_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginAddress, setLoginAddress] = useState('');

  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      title: '1.8" / 2.4" Full Touch Bluetooth MP3 Player', 
      price: 1664, 
      discount: '-61%', 
      category: 'গ্যাজেট', 
      seller: 'রনি ট্রেইডার্স', 
      img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=60',
      rating: 4.1,
      sold: 46
    },
    { 
      id: 2, 
      title: 'Mini CCTV Camera A9 WiFi 1080P', 
      price: 458, 
      discount: 'HOT', 
      category: 'গ্যাজেট', 
      seller: 'সাফওয়ান স্টোর', 
      img: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=300&auto=format&fit=crop&q=60',
      rating: 4.0,
      sold: 91
    },
    { 
      id: 3, 
      title: 'Coolpad Cool 40i Smartphone 8GB+128GB', 
      price: 12990, 
      discount: 'OFFER', 
      category: 'মোবাইল', 
      seller: 'বরিশাল মার্ট', 
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=60',
      rating: 5.0,
      sold: 12
    },
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('bss_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [postTitle, setPostTitle] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postCategory, setPostCategory] = useState('গ্যাজেট');
  const [sellerName, setSellerName] = useState('');
  const [postPhone, setPostPhone] = useState('');
  const [postImage, setPostImage] = useState<string>('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=60');

  useEffect(() => {
    localStorage.setItem('bss_orders', JSON.stringify(orders));
  }, [orders]);

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
  };

  const handleProductClick = (p: Product) => {
    if (!recentlyViewed.some(item => item.id === p.id)) {
      setRecentlyViewed([p, ...recentlyViewed]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPostImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
      rating: 5.0,
      sold: 0
    };

    setProducts([newProduct, ...products]);
    setPostTitle('');
    setPostPrice('');
    setSellerName('');
    setPostPhone('');
    setActiveTab('shop');
    alert('আপনার পণ্যটি পোস্ট করা হয়েছে!');
  };

  const handlePlaceOrder = () => {
    if (!user || cart.length === 0) return;

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userName: user.name,
      userPhone: user.phone,
      userAddress: user.address || 'ঠিকানা দেওয়া হয়নি',
      items: cart,
      totalAmount: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleString('bn-BD'),
      status: 'To Ship'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert(`আপনার অর্ডারটি সফলভাবে নেওয়া হয়েছে!\nঅর্ডার আইডি: ${newOrder.id}`);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#f57224', marginTop: 0 }}>বরিশাল সুপার শপ</h2>
          <p style={{ textAlign: 'center', color: '#52525b', fontSize: '14px', marginBottom: '20px' }}>লগইন করে কেনাকাটা শুরু করুন</p>
          
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

            <button type="submit" style={{ backgroundColor: '#f57224', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>
              প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#f4f4f5', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '70px' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: '#f57224', color: '#fff', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>বরিশাল সুপার শপ</h2>
          <small style={{ fontSize: '11px', opacity: 0.9 }}>👤 {user.name}</small>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setActiveTab('post')} style={{ backgroundColor: '#fff', color: '#f57224', border: 'none', padding: '6px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            ➕ বিক্রি করুন
          </button>
          <button onClick={() => setActiveTab('admin')} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            ⚙️ এডমিন
          </button>
        </div>
      </div>

      {/* SHOP / HOME TAB */}
      {activeTab === 'shop' && (
        <div>
          <div style={{ backgroundColor: '#fff', padding: '10px 12px', borderBottom: '1px solid #e4e4e7' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" placeholder="পণ্য খুঁজুন..." style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #d4d4d8', outline: 'none', fontSize: '13px' }} />
              <button style={{ backgroundColor: '#f57224', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 16px', fontWeight: 'bold', fontSize: '12px' }}>Search</button>
            </div>
          </div>

          <div style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '15px', color: '#27272a', marginBottom: '10px' }}>সর্বশেষ পণ্যসমূহ 🛍</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {products.map((p) => (
                <div key={p.id} onClick={() => handleProductClick(p)} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '8px', border: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
                    <span style={{ fontSize: '9px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#4b5563', display: 'inline-block', marginTop: '4px' }}>{p.category}</span>
                    <h4 style={{ margin: '4px 0', fontSize: '13px', color: '#18181b', lineHeight: '1.2' }}>{p.title}</h4>
                    {p.rating && (
                      <div style={{ fontSize: '10px', color: '#f59e0b', margin: '2px 0' }}>
                        ⭐ {p.rating} | <span style={{ color: '#71717a' }}>{p.sold} Sold</span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: '#f57224', fontWeight: 'bold', fontSize: '14px' }}>৳{p.price}</span>
                      <span style={{ backgroundColor: '#ffe4e6', color: '#f57224', fontSize: '10px', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold' }}>{p.discount}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCart([...cart, p]); alert('কার্টে যোগ করা হয়েছে!'); }}
                      style={{ width: '100%', backgroundColor: '#f57224', color: '#fff', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
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

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div style={{ padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Messages</h3>
            <span style={{ fontSize: '12px', color: '#71717a' }}>🧹 Mark all as read</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #f57224', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '12px', color: '#f57224', fontWeight: 'bold' }}>🔥 FUN COINS SATURDAY WITH FREE GIFTS</div>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#3f3f46' }}>40% OFF + free gifts from Coins Treasure Chest!</p>
              <small style={{ fontSize: '10px', color: '#a1a1aa' }}>Yesterday</small>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold' }}>🕹️ 1 Min of Candy = Coins 🕶️</div>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#3f3f46' }}>Start playing NOW or regret later!</p>
              <small style={{ fontSize: '10px', color: '#a1a1aa' }}>Yesterday</small>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #16a34a', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 'bold' }}>🚚 এবার পার্সেল পৌঁছবে দ্রুত</div>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#3f3f46' }}>বরিশাল সদরে দ্রুত হোম ডেলিভারি শুরু হয়েছে!</p>
              <small style={{ fontSize: '10px', color: '#a1a1aa' }}>2 days ago</small>
            </div>
          </div>
        </div>
      )}

      {/* CART TAB */}
      {activeTab === 'cart' && (
        <div style={{ padding: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🛒 My Cart</h3>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#71717a', margin: '40px 0' }}>আপনার কার্টে কোনো পণ্য নেই!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '13px' }}>{item.title}</h4>
                    <span style={{ color: '#f57224', fontWeight: 'bold', fontSize: '13px' }}>৳{item.price}</span>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, i) => i !== index))} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>মুছে ফেলুন</button>
                </div>
              ))}

              <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e4e4e7', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#18181b', borderBottom: '1px solid #f4f4f5', paddingBottom: '4px' }}>কাস্টমার ডেলিভারি তথ্য</h4>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>নাম:</strong> {user.name}</p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>ফোন:</strong> {user.phone}</p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}><strong>ঠিকানা:</strong> {user.address || 'ঠিকানা দেওয়া হয়নি'}</p>
                <hr style={{ border: 'none', borderTop: '1px dashed #e4e4e7', margin: '8px 0' }} />
                <h3 style={{ margin: '0 0 10px 0', color: '#f57224' }}>Subtotal: ৳{cart.reduce((sum, item) => sum + item.price, 0)}</h3>
                <button onClick={handlePlaceOrder} style={{ width: '100%', backgroundColor: '#f57224', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                  Check Out (ক্যাশ অন ডেলিভারি)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ACCOUNT TAB */}
      {activeTab === 'account' && (
        <div style={{ padding: '12px' }}>
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f57224', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#18181b' }}>{user.name}</h3>
              <p style={{ margin: '2px 0', fontSize: '12px', color: '#71717a' }}>📱 {user.phone}</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '14px', borderRadius: '10px', border: '1px solid #e4e4e7', marginBottom: '14px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#27272a' }}>📦 My Orders</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#fbfcfd', padding: '8px', borderRadius: '6px', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '18px' }}>💳</div>
                <span style={{ fontSize: '10px', color: '#4b5563' }}>To Pay</span>
              </div>
              <div style={{ backgroundColor: '#fbfcfd', padding: '8px', borderRadius: '6px', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '18px' }}>📦</div>
                <span style={{ fontSize: '10px', color: '#4b5563' }}>To Ship</span>
              </div>
              <div style={{ backgroundColor: '#fbfcfd', padding: '8px', borderRadius: '6px', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '18px' }}>🚚</div>
                <span style={{ fontSize: '10px', color: '#4b5563' }}>To Receive</span>
              </div>
              <div style={{ backgroundColor: '#fbfcfd', padding: '8px', borderRadius: '6px', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '18px' }}>⭐</div>
                <span style={{ fontSize: '10px', color: '#4b5563' }}>To Review</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '14px', borderRadius: '10px', border: '1px solid #e4e4e7' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#27272a' }}>👁️ Recently Viewed</h4>
            {recentlyViewed.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0 }}>সম্প্রতি কোনো প্রোডাক্ট দেখা হয়নি</p>
            ) : (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {recentlyViewed.map((item) => (
                  <div key={item.id} style={{ minWidth: '90px', border: '1px solid #f3f4f6', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <p style={{ margin: '4px 0 0 0', fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                    <span style={{ color: '#f57224', fontWeight: 'bold', fontSize: '11px' }}>৳{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* POST PRODUCT TAB */}
      {activeTab === 'post' && (
        <div style={{ padding: '12px' }}>
          <div style={{ back
