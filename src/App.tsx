import React, { useState } from 'react';

export function App() {
  // Language State ('bn' | 'en')
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  // Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percentage or fixed amount
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });

  // Translations
  const t = {
    bn: {
      siteName: 'বরিশাল সুপার শপ',
      searchPlaceholder: 'পণ্যের নাম লিখে খুঁজুন...',
      all: 'সব পণ্য',
      electronics: 'ইলেকট্রনিক্স',
      fashion: 'ফ্যাশন',
      groceries: 'মুদি ও খাদ্য',
      bannerTitle: 'বিশেষ অফার!',
      bannerSub: 'বরিশাল সদরে দ্রুত হোম ডেলিভারি!',
      buyNow: 'এখনই কিনুন',
      postAdBtn: '+ ফ্রি বিজ্ঞাপন দিন',
      cartTitle: 'আপনার কার্ট',
      cartEmpty: 'আপনার কার্ট খালি!',
      addToCart: 'কার্টে রাখুন',
      total: 'মোট:',
      discountText: 'ডিসকাউন্ট:',
      payableTotal: 'সর্বমোট দেয়া মূল্য:',
      couponPlaceholder: 'কুপন কোড লিখুন (যেমন: BARISAL10)',
      applyCoupon: 'কুপন প্রয়োগ করুন',
      namePlaceholder: 'আপনার নাম',
      phonePlaceholder: 'মোবাইল নম্বর',
      addressPlaceholder: 'ডেলিভারি ঠিকানা',
      confirmOrder: 'অর্ডার নিশ্চিত করুন',
      postTitle: 'ফ্রি বিজ্ঞাপন দিন',
      pName: 'পণ্যের নাম',
      pPrice: 'মূল্য (৳)',
      pCategory: 'ক্যাটাগরি',
      pPhoto: 'পণ্যের ছবি',
      postSubmit: 'পোস্ট করুন',
      noResult: 'কোনো পণ্য পাওয়া যায়নি!',
      showAll: 'সব পণ্য দেখুন'
    },
    en: {
      siteName: 'Barishal Super Shop',
      searchPlaceholder: 'Search products...',
      all: 'All Products',
      electronics: 'Electronics',
      fashion: 'Fashion',
      groceries: 'Groceries',
      bannerTitle: 'Special Offer!',
      bannerSub: 'Fast home delivery in Barishal!',
      buyNow: 'Buy Now',
      postAdBtn: '+ Post Free Ad',
      cartTitle: 'Your Cart',
      cartEmpty: 'Your cart is empty!',
      addToCart: 'Add to Cart',
      total: 'Subtotal:',
      discountText: 'Discount:',
      payableTotal: 'Payable Total:',
      couponPlaceholder: 'Enter Coupon Code (e.g. BARISAL10)',
      applyCoupon: 'Apply',
      namePlaceholder: 'Your Name',
      phonePlaceholder: 'Phone Number',
      addressPlaceholder: 'Delivery Address',
      confirmOrder: 'Confirm Order',
      postTitle: 'Post Free Ad',
      pName: 'Product Name',
      pPrice: 'Price (৳)',
      pCategory: 'Category',
      pPhoto: 'Product Photo',
      postSubmit: 'Post Now',
      noResult: 'No products found!',
      showAll: 'Show All Products'
    }
  }[lang];

  // Product List
  const [products, setProducts] = useState([
    { 
      id: 1, 
      title: 'হেয়ার ট্রিমার (T9)', 
      price: 253, 
      originalPrice: 430, 
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300'
    },
    { 
      id: 2, 
      title: 'নাগা মরীচ বীজ', 
      price: 43, 
      originalPrice: 150, 
      category: 'groceries',
      image: 'https://images.unsplash.com/photo-1588879460608-251c8901239c?w=300'
    },
    { 
      id: 3, 
      title: 'গোল্ডেন ব্রেসলেট', 
      price: 159, 
      originalPrice: 390, 
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1611591475168-525492261614?w=300'
    },
    { 
      id: 4, 
      title: 'ব্লুটুথ স্পিকার', 
      price: 779, 
      originalPrice: 950, 
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300'
    }
  ]);

  const [cartItems, setCartItems] = useState<any[]>([]);

  // Post Ad Form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('electronics');
  const [newImage, setNewImage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  // Coupon Apply Handler
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === 'BARISAL10') {
      setAppliedDiscount(10); // 10% Off
      setCouponMsg({ text: lang === 'bn' ? '১০% ডিসকাউন্ট যোগ হয়েছে!' : '10% Discount Applied!', isError: false });
    } else if (code === 'FREE50') {
      setAppliedDiscount(50); // 50 Tk Off
      setCouponMsg({ text: lang === 'bn' ? '৫০ টাকা কুপন ছাড় যোগ হয়েছে!' : '৳50 Off Applied!', isError: false });
    } else {
      setCouponMsg({ text: lang === 'bn' ? 'ভুল বা মেয়াদোত্তীর্ণ কুপন কোড!' : 'Invalid Coupon Code!', isError: true });
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(lang === 'bn' ? 'দয়া করে সব তথ্য পূরণ করুন।' : 'Please fill all details.');
      return;
    }

    alert(lang === 'bn' ? `ধন্যবাদ ${customerName}! অর্ডার গ্রহণ করা হয়েছে।` : `Thank you ${customerName}! Order placed successfully.`);
    setCartItems([]);
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCouponInput('');
    setAppliedDiscount(0);
    setCouponMsg({ text: '', isError: false });
  };

  const handlePostAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    
    const priceNum = Number(newPrice);
    const newProd = {
      id: Date.now(),
      title: newTitle,
      price: priceNum,
      originalPrice: priceNum + 100,
      category: newCategory,
      image: newImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    };

    setProducts([newProd, ...products]);
    alert(lang === 'bn' ? 'বিজ্ঞাপন সফলভাবে পোস্ট করা হয়েছে!' : 'Ad posted successfully!');
    setIsPostModalOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewImage('');
  };

  // Price Calculation with Coupon
  const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = appliedDiscount > 0 ? (appliedDiscount <= 100 ? (subTotal * appliedDiscount) / 100 : appliedDiscount) : 0;
  const finalTotal = Math.max(0, subTotal - discountAmount);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-sans">
      {/* হেডার ও অপশনস */}
      <div className="bg-pink-600 p-3 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between max-w-md mx-auto mb-2 text-xs">
          <span className="font-bold">{t.siteName}</span>
          {/* ভাষা পরিবর্তন বাটন */}
          <div className="flex gap-1 bg-pink-800 p-1 rounded-lg">
            <button
              onClick={() => setLang('bn')}
              className={`px-2 py-0.5 rounded font-bold ${lang === 'bn' ? 'bg-white text-pink-600' : 'text-white'}`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded font-bold ${lang === 'en' ? 'bg-white text-pink-600' : 'text-white'}`}
            >
              ENG
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-3 pr-8 rounded-full text-black text-sm outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-500 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-pink-700 rounded-full text-lg"
          >
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 max-w-md mx-auto text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              selectedCategory === 'all' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
            }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setSelectedCategory('electronics')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              selectedCategory === 'electronics' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
            }`}
          >
            {t.electronics}
          </button>
          <button
            onClick={() => setSelectedCategory('fashion')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              selectedCategory === 'fashion' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
            }`}
          >
            {t.fashion}
          </button>
          <button
            onClick={() => setSelectedCategory('groceries')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              selectedCategory === 'groceries' ? 'bg-white text-pink-600 font-bold' : 'bg-pink-700 text-white'
            }`}
          >
            {t.groceries}
          </button>
        </div>
      </div>

      <main className="max-w-md mx-auto p-3 space-y-4">
        {/* ব্যানার */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
          <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">PROMO</span>
          <h2 className="text-xl font-extrabold mt-1">{t.bannerTitle}</h2>
          <p className="text-xs mt-1 opacity-90">{t.bannerSub}</p>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-pink-600 px-3 py-1.5 rounded-xl font-bold text-xs"
            >
              {t.buyNow}
            </button>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-black/20 text-white px-3 py-1.5 rounded-xl font-semibold text-xs border border-white/30"
            >
              {t.postAdBtn}
            </button>
          </div>
        </div>

        {/* পণ্য তালিকা */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-semibold text-gray-600">{t.noResult}</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs text-pink-600 font-bold underline"
              >
                {t.showAll}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-100 rounded-xl p-2 bg-white shadow-sm">
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">{product.title}</h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-pink-600 font-bold text-sm">৳{product.price}</span>
                    <span className="text-gray-400 text-[10px] line-through">৳{product.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 bg-pink-600 text-white py-1 rounded-lg text-xs font-bold"
                  >
                    {t.addToCart}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* নেভিগেশন বার */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center max-w-md mx-auto z-20 text-xs text-gray-600">
        <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-pink-600 font-bold">
          🏠 {lang === 'bn' ? 'হোম' : 'Home'}
        </button>
        <button onClick={() => setIsPostModalOpen(true)} className="bg-pink-600 text-white px-3 py-1 rounded-full font-bold">
          {t.postAdBtn}
        </button>
        <button onClick={() => setIsCartOpen(true)} className="relative">
          🛒 {lang === 'bn' ? 'কার্ট' : 'Cart'} ({cartItems.length})
        </button>
      </div>

      {/* পোস্ট মডাল */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-800">{t.postTitle}</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-gray-500">✕</button>
            </div>
            <form onSubmit={handlePostAd} className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">{t.pName}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Watch"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">{t.pPrice}</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 500"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">{t.pCategory}</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mt-1 outline-none"
                >
                  <option value="electronics">{t.electronics}</option>
                  <option value="fashion">{t.fashion}</option>
                  <option value="groceries">{t.groceries}</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">{t.pPhoto}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border rounded-lg p-1 text-xs mt-1"
                />
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold text-sm">
                {t.postSubmit}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* কার্ট ও কুপন মডাল */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-800">{t.cartTitle}</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500">✕</button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center py-6 text-gray-500 text-sm">{t.cartEmpty}</p>
            ) : (
              <>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded-lg">
                      <span>{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-pink-600">৳{item.price}</span>
                        <button onClick={() => removeFromCart(idx)} className="text-red-500 font-bold">✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* কুপন কোড সেকশন */}
                <div className="border-t pt-2 space-y-1">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder={t.couponPlaceholder}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 border rounded-lg px-2 py-1 text-xs outline-none uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-gray-800 text-white px-3 py-1 rounded-lg text-xs font-bold"
                    >
                      {t.applyCoupon}
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`text-[10px] ${couponMsg.isError ? 'text-red-500' : 'text-green-600 font-bold'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* দাম এর হিসাব */}
                <div className="border-t pt-2 space-y-1 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>{t.total}</span>
                    <span>৳{subTotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>{t.discountText}</s
