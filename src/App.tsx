import React, { useState, useEffect } from 'react';
import { LoginModal } from './components/LoginModal';
import { EditPostModal } from './components/EditPostModal';
import { sendTelegramMessage } from './services/telegram';
import { UserProfile, Post } from './types';

export function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn'); // ভাষা সেটিং
  const [activeTab, setActiveTab] = useState<'posts' | 'ads' | 'transactions'>('posts');

  // পোস্ট ও বিজ্ঞাপন স্টেট
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // নতুন পোস্ট/বিজ্ঞাপন ইনপুট
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [postType, setPostType] = useState<'product' | 'ad'>('product');

  // লেনদেন/পেমেন্ট স্টেট
  const [transactions, setTransactions] = useState<Array<{ id: string; amount: string; type: string; date: string }>>([]);
  const [trxAmount, setTrxAmount] = useState('');
  const [trxType, setTrxType] = useState('bKash');

  // ১. লগইন চেক
  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  // ২. রেজিস্ট্রেশন/লগইন সফল হলে
  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData);
    setShowLoginModal(false);
    sendTelegramMessage(`<b>🔔 নতুন ব্যবহারকারী:</b> ${userData.name} (${userData.phone})`);
  };

  // ৩. নতুন পোস্ট/বিজ্ঞাপন জমা দেওয়া
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      price,
      description: desc,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
      authorName: user.name,
      authorPhone: user.phone,
      status: 'approved',
      createdAt: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US'),
    };

    setPosts([newPost, ...posts]);
    setTitle('');
    setPrice('');
    setDesc('');

    sendTelegramMessage(`<b>📢 নতুন ${postType === 'ad' ? 'বিজ্ঞাপন' : 'পোস্ট'}:</b>\n${title} - ৳${price}\nপোস্টকারী: ${user.name}`);
  };

  // ৪. এডমিন দিয়ে এডিট ও ডিলিট
  const handleSaveEdit = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm(lang === 'bn' ? 'আপনি কি পোস্টটি ডিলিট করতে চান?' : 'Are you sure to delete?')) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  // ৫. লেনদেন/পেমেন্ট যুক্ত করা
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxAmount) return;

    const newTrx = {
      id: Date.now().toString(),
      amount: trxAmount,
      type: trxType,
      date: new Date().toLocaleString(),
    };

    setTransactions([newTrx, ...transactions]);
    setTrxAmount('');

    sendTelegramMessage(`<b>💸 নতুন লেনদেন:</b>\nপদ্ধতি: ${trxType}\nপরিমাণ: ৳${trxAmount}\nগ্রাহক: ${user?.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* লগইন মোডাল */}
      {showLoginModal && <LoginModal onSuccess={handleLoginSuccess} />}

      {/* এডিট মোডাল */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleSaveEdit}
          onClose={() => setEditingPost(null)}
        />
      )}

      {/* হেডার ও ভাষা সেটিং */}
      <header className="bg-green-700 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-bold">{lang === 'bn' ? 'বরিশাল সুপার শপ' : 'Barishal Super Shop'}</h1>
          {user && <p className="text-xs text-green-200">👤 {user.name} ({user.phone})</p>}
        </div>

        {/* ভাষা পরিবর্তনের বাটন */}
        <button
          onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
          className="bg-green-800 border border-green-500 text-xs px-3 py-1.5 rounded-full font-bold hover:bg-green-600 transition"
        >
          🌐 {lang === 'bn' ? 'English' : 'বাংলা'}
        </button>
      </header>

      {/* নেভিগেশন ট্যাব */}
      <div className="bg-white border-b flex justify-around p-2 text-sm font-semibold text-gray-700">
        <button
          onClick={() => setActiveTab('posts')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'posts' ? 'bg-green-100 text-green-700' : ''}`}
        >
          {lang === 'bn' ? 'পোস্টসমূহ' : 'Posts'}
        </button>
        <button
          onClick={() => setActiveTab('ads')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'ads' ? 'bg-green-100 text-green-700' : ''}`}
        >
          {lang === 'bn' ? 'বিজ্ঞাপন' : 'Ads'}
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-2 px-4 rounded-xl ${activeTab === 'transactions' ? 'bg-green-100 text-green-700' : ''}`}
        >
          {lang === 'bn' ? 'লেনদেন' : 'Transactions'}
        </button>
      </div>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* পোস্ট ও বিজ্ঞাপন ট্যাব */}
        {(activeTab === 'posts' || activeTab === 'ads') && (
          <>
            {/* পোস্ট/বিজ্ঞাপন দেওয়ার ফর্ম */}
            <div className="bg-white p-5 rounded-2xl shadow-md border">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                {activeTab === 'posts' 
                  ? (lang === 'bn' ? 'নতুন পণ্য পোস্ট করুন' : 'Post New Product')
                  : (lang === 'bn' ? 'নতুন বিজ্ঞাপন দিন' : 'Post New Ad')}
              </h2>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'শিরোনাম / নাম' : 'Title / Name'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'মূল্য (টাকা)' : 'Price (BDT)'}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder={lang === 'bn' ? 'বিস্তারিত তথ্য...' : 'Details...'}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  rows={2}
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition"
                >
                  {lang === 'bn' ? 'প্রকাশ করুন' : 'Publish'}
                </button>
              </form>
            </div>

            {/* পোস্ট বা বিজ্ঞাপনের লিস্ট */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-4 shadow-md border space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-green-700 font-semibold">৳{post.price}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{post.createdAt}</span>
                  </div>
                  <p className="text-sm text-gray-600">{post.description}</p>
                  
                  {/* এডমিন এডিট ও ডিলিট অপশন */}
                  <div className="text-xs text-gray-500 border-t pt-2 flex justify-between items-center">
                    <span>{post.authorName} ({post.authorPhone})</span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingPost(post)} className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-semibold">
                        ✏️ {lang === 'bn' ? 'এডিট' : 'Edit'}
                      </button>
                      <button onClick={() => handleDeletePost(post.id)} className="bg-red-50 text-red-600 px-2 py-1 rounded font-semibold">
                        🗑️ {lang === 'bn' ? 'ডিলিট' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* লেনদেন/পেমেন্ট ট্যাব */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-md border">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                {lang === 'bn' ? 'নতুন লেনদেন জমা দিন' : 'Submit New Transaction'}
              </h2>
              <form onSubmit={handleAddTransaction} className="space-y-3">
                <select
                  value={trxType}
                  onChange={(e) => setTrxType(e.target.value)}
                  className="w-full p-2.5 border rounded-xl outline-none"
                >
                  <option value="bKash">bKash (বিকাশ)</option>
                  <option value="Nagad">Nagad (নগদ)</option>
                  <option value="Rocket">Rocket (রকেট)</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
                <input
                  type="number"
                  required
                  placeholder={lang === 'bn' ? 'টাকার পরিমাণ' : 'Amount'}
                  value={trxAmount}
                  onChange={(e) => setTrxAmount(e.target.value)}
                  className="w-full p-2.5 border rounded-xl outline-none"
                />
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-2.5 rounded-xl">
                  {lang === 'bn' ? 'লেনদেন নিশ্চিত করুন' : 'Confirm Transaction'}
                </button>
              </form>
            </div>

            {/* লেনদেন লিস্ট */}
            <div className="bg-white rounded-2xl p-4 shadow-md border space-y-3">
              <h3 className="font-bold text-gray-800">{lang === 'bn' ? 'লেনদেনের ইতিহাস' : 'Transaction History'}</h3>
              {transactions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">{lang === 'bn' ? 'কোনো লেনদেন পাওয়া যায়নি' : 'No transactions found'}</p>
              ) : (
                transactions.map((trx) => (
                  <div key={trx.id} className="flex justify-between items-center border-b pb-2 text-sm">
                    <div>
                      <p className="font-bold text-gray-800">{trx.type}</p>
                      <p className="text-xs text-gray-500">{trx.date}</p>
                    </div>
                    <p className="font-bold text-green-600">৳{trx.amount}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
    }
      
export default App;
