updatedPost.idimport React, { useState, useEffect } from 'react';
import { LoginModal } from './components/LoginModal';
import { EditPostModal } from './components/EditPostModal';
import { sendTelegramMessage } from './services/telegram';
import { UserProfile, Post } from './types';

export function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  // নতুন পোস্ট তৈরির ইনপুট স্টেট
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // ১. অ্যাপে ঢোকার সাথে সাথে কাস্টমার লগইন চেক করা
  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  // ২. নতুন কাস্টমার লগইন সম্পন্ন হলে
  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData);
    setShowLoginModal(false);
    
    // টেলিগ্রামে নোটিফিকেশন পাঠানো
    sendTelegramMessage(`
<b>🔔 নতুন রেজিস্ট্রেশন!</b>
👤 নাম: ${userData.name}
📱 ফোন: ${userData.phone}
    `);
  };

  // ৩. নতুন পোস্ট/বিজ্ঞাপন যোগ করা
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      title: newTitle,
      price: newPrice,
      description: newDesc,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500', // ডিফল্ট ছবি
      authorName: user.name,
      authorPhone: user.phone,
      status: 'approved',
      createdAt: new Date().toLocaleDateString('bn-BD'),
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');

    // টেলিগ্রামে নোটিফিকেশন পাঠানো
    sendTelegramMessage(`8633414899
<b>📢 নতুন পোস্ট করা হয়েছে!</b>
📌 শিরোনাম: ${newPost.title}
💰 দাম: ৳${newPost.price}
👤 পোস্টকারী: ${newPost.authorName} (${newPost.authorPhone})
    `);
  };

  // ৪. এডমিন/মডারেটর কর্তৃক পোস্ট আপডেট (এডিট)
  const handleSaveEdit = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  // ৫. পোস্ট ডিলিট করা
  const handleDeletePost = (id: string) => {
    if (confirm('আপনি কি পোস্টটি ডিলিট করতে চান?')) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* এককালীন বাধ্যতামূলক লগইন মোডাল */}
      {showLoginModal && <LoginModal onSuccess={handleLoginSuccess} />}

      {/* পোস্ট এডিট করার মোডাল */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleSaveEdit}
          onClose={() => setEditingPost(null)}
        />
      )}

      {/* হেডার / নেভিগেশন */}
      <header className="bg-green-700 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-xl font-bold">বরিশাল সুপার শপ</h1>
        {user && (
          <div className="text-sm bg-green-800 px-3 py-1.5 rounded-full border border-green-600">
            👤 {user.name} ({user.phone})
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* নতুন পোস্ট করার ফরম */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3">বিজ্ঞাপন বা পণ্য পোস্ট করুন</h2>
          <form onSubmit={handleCreatePost} className="space-y-3">
            <input
              type="text"
              required
              placeholder="পণ্যের নাম/শিরোনাম"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              required
              placeholder="দাম (টাকা)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="বিস্তারিত বিবরণ..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              rows={2}
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition shadow"
            >
              পোস্ট প্রকাশ করুন
            </button>
          </form>
        </div>

        {/* পোস্টের লিস্ট */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">সাম্প্রতিক বিজ্ঞাপন ও পোস্টসমূহ</h2>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-6 bg-white rounded-2xl">এখনো কোনো পোস্ট করা হয়নি।</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-green-700 font-semibold">৳{post.price}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{post.createdAt}</span>
                </div>

                <p className="text-sm text-gray-600">{post.description}</p>

                <div className="text-xs text-gray-500 border-t pt-2 flex justify-between items-center">
                  <span>পোস্টকারী: {post.authorName} ({post.authorPhone})</span>

                  {/* এডমিন/মডারেটর অ্যাকশন (এডিট ও ডিলিট) */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-blue-100"
                    >
                      ✏️ এডিট
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-red-100"
                    >
                      🗑️ ডিলিট
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
             }
              
