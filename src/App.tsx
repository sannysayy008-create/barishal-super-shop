import React, { useState } from 'react';

type Role = 'customer' | 'moderator' | 'admin';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: string;
};

type Post = {
  id: string;
  title: string;
  price: number;
  desc: string;
  seller: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [role, setRole] = useState<Role>('customer');

  const text = {
    bn: {
      search: 'পণ্য বা বিজ্ঞাপন খুঁজুন...',
      searchBtn: 'খুঁজুন',
      home: 'হোম',
      messages: 'মেসেজ',
      cart: 'কার্ট',
      account: 'একাউন্ট',
      login: 'লগইন / সাইন আপ',
      phone: 'মোবাইল নম্বর',
      password: 'পাসওয়ার্ড',
      loginBtn: 'প্রবেশ করুন',
      logout: 'লগআউট',
      flash: 'ফ্ল্যাশ সেল ⚡',
      shopMore: 'আরও দেখুন',
      add: 'যোগ করুন',
      ads: 'গ্রাহকদের বিজ্ঞাপনসমূহ',
      order: 'পণ্য অর্ডারের বিস্তারিত',
      productName: 'পণ্যের নাম লিখুন',
      name: 'আপনার নাম',
      address: 'পুরো ঠিকানা',
      confirm: 'অর্ডার নিশ্চিত করুন',
      cartTitle: 'শপিং কার্ট',
      emptyCart: 'আপনার কার্ট খালি রয়েছে',
      post: 'বিজ্ঞাপন প্রকাশ করুন',
      publish: 'বিজ্ঞাপন পোস্ট করুন',
      title: 'পণ্যের শিরোনাম',
      price: 'দাম (টাকা)',
      description: 'পণ্যের বিস্তারিত বিবরণ...',
      admin: '👑 অ্যাডমিন প্যানেল',
      moderator: '🛡️ মডারেটর প্যানেল',
      customer: '👤 কাস্টমার',
      role: 'আপনার রোল',
      products: 'পণ্য',
      orders: 'অর্ডার',
      users: 'ব্যবহারকারী',
      offers: 'অফার',
      stock: 'স্টক',
      dashboard: 'ড্যাশবোর্ড',
      telegram: 'টেলিগ্রাম নোটিফিকেশন',
    },
    en: {
      search: 'Search products or ads...',
      searchBtn: 'Search',
      home: 'Home',
      messages: 'Messages',
      cart: 'Cart',
      account: 'Account',
      login: 'Login / Sign Up',
      phone: 'Mobile number',
      password: 'Password',
      loginBtn: 'Login',
      logout: 'Logout',
      flash: 'Flash Sale ⚡',
      shopMore: 'Shop More',
      add: 'Add',
      ads: 'Customer Ads',
      order: 'Order Details',
      productName: 'Enter Product Name',
      name: 'Your Name',
      address: 'Full Address',
      confirm: 'Confirm Order',
      cartTitle: 'Shopping Cart',
      emptyCart: 'Your cart is empty',
      post: 'Post an Ad',
      publish: 'Publish Ad',
      title: 'Product Title',
      price: 'Price (BDT)',
      description: 'Detailed description...',
      admin: '👑 Admin Panel',
      moderator: '🛡️ Moderator Panel',
      customer: '👤 Customer',
      role: 'Your Role',
      products: 'Products',
      orders: 'Orders',
      users: 'Users',
      offers: 'Offers',
      stock: 'Stock',
      dashboard: 'Dashboard',
      telegram: 'Telegram Notification',
    },
  };

  const t = text[language];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Barishal Super Shop</h2>
      <p>{t.role}: {role}</p>
      <input 
        type="text" 
        placeholder={t.search} 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button style={{ padding: '8px 16px' }}>{t.searchBtn}</button>
    </div>
  );
}
