import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  category: string;
  image: string;
  isFlashSale?: boolean;
}

export function App() {
  const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN_HERE";
  const TELEGRAM_CHAT_ID = "8633414899";

  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [voucherCollected, setVoucherCollected] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 13, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'ব্যাগ', price: 580, originalPrice: 1260, discount: '-54%', category: 'fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', isFlashSale: true },
    { id: 2, title: 'এয়ারবাডস', price: 365, originalPrice: 1200, discount: '-70%', category: 'electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300', isFlashSale: true },
    { id: 3, title: 'স্মার্টওয়াচ', price: 850, originalPrice: 1500, discount: '-43%', category: 'electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' }
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('electronics');
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string>('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('সব তথ্য দিন');
      return;
    }
    const itemsList = cartItems.map((item) => item.title + ' - ' + item.price).join(', ');
    const msg = 'অর্ডার: ' + customerName + ' | ' + customerPhone + ' | ' + customerAddress + ' | পণ্য: ' + itemsList + ' | মোট: ' + totalPrice;

    try {
      if (TELEGRAM_BOT_TOKEN !== "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
        await fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg }),
        });
      }
      alert('অর্ডার সফল হয়েছে!');
      setCartItems([]);
      setActiveTab('home');
    } catch {
      alert('এরর হয়েছে');
    }
  };

  const handlePostAd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const priceNum = Number(newPrice);

    const newProd: Product = {
      id: Date.now(),
      title: newTitle,
      price: priceNum,
      originalPrice: priceNum + 100,
      discount: '-10%',
      category: newCategory,
      image: newImage,
      isFlashSale: isFlash
    };

    setProducts([newProd, ...products]);
    alert('পোস্ট সফল হয়েছে!');
    setNewTitle('');
    setNewPrice('');
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-100 text-gray-900">
      <div className="bg-pink-600 p-3 sticky top-0 z-30">
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-full outline-none"
          />
          <button className="bg-pink-800 text-white font-bold text-xs px-4 py-2 rounded-full">
            Search
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto p-2 space-y-3">
        {activeTab === 'home' && (
          <div>
            <div className="bg-white p-3 rounded-xl shadow mb-3 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-pink-600">ওয়েলকাম অফার: ১৫% ছাড়</p>
              </div>
              <button 
                onClick={() => setVoucherCollected(true)}
                className="px-3 py-1 text-xs rounded-full font-bold bg-orange-500 text-white"
              >
                {voucherCollected ? 'কমিট' : 'সংগ্রহ করুন'}
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl shadow mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xs text-pink-600">ফ্ল্যাশ সেল ⚡</span>
                <span className="text-xs">{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {products.map((product) => (
                  <div key={product.id} className="border rounded p-1 text-center">
                    <img src={product.image} alt={product.title} className="w-full h-20 object-cover rounded mb-1" />
                    <p className="text-[10px] font-bold">{product.title}</p>
                    <p className="text-pink-600 font-bold text-xs">৳{product.price}</p>
                    <button onClick={() => addToCart(product)} className="w-full mt-1 bg-pink-600 text-white text-[10px] py-1 rounded">
                      কার্টে যোগ করুন
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'post' && (
          <div className="bg-white p-4 rounded-xl shadow space-y-3 text-xs">
            <h3 className="font-bold text-pink-600">নতুন বিজ্ঞাপন পোস্ট করুন</h3>
            <form onSubmit={handlePostAd} className="space-y-2">
              <input type="text" placeholder="পণ্যের নাম" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border p-2 rounded" />
              <input type="number" placeholder="দাম" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border p-2 rounded" />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold">
                পোস্ট করুন
              </button>
            </form>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white p-4 rounded-xl shadow space-y-3 text-xs">
            <h3 className="font-bold border-b pb-2">শপিং কার্ট</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between p-1 border-b">
                <span>{item.title}</span>
                <span className="font-bold">৳{item.price}</span>
              </div>
            ))}
            <div className="font-bold text-sm pt-2 flex justify-between">
              <span>মোট:</span>
              <span className="text-pink-600">৳{totalPrice}</span>
            </div>
            <form onSubmit={handleOrderSubmit} className="space-y-2 pt-2">
              <input type="text" placeholder="নাম" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border p-2 rounded" />
              <input type="tel" placeholder="মোবাইল" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full border p-2 rounded" />
              <textarea placeholder="ঠিকানা" required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full border p-2 rounded" />
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold">
                অর্ডার নিশ্চিত করুন
              </button>
            </form>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t py-2 bg-white flex justify-around text-xs font-bold bg-white z-40">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-pink-600' : ''}>হোম</button>
        <button onClick={() => setActiveTab('post')} className={activeTab === 'post' ? 'text-pink-600' : ''}>পোস্ট</button>
        <button onClick={() => setActiveTab('cart')} className={activeTab === 'cart' ? 'text-pink-600' : ''}>কার্ট ({cartItems.length})</button>
      </div>
    </div>
  );
}

export default App;
