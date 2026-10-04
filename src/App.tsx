import React, { useState, useEffect } from 'react';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('barishal_shop_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.name) {
          setUserName(parsedUser.name);
          setUserPhone(parsedUser.phone || '');
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && userPhone.trim()) {
      const userData = { name: userName, phone: userPhone };
      localStorage.setItem('barishal_shop_user', JSON.stringify(userData));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('barishal_shop_user');
    setIsLoggedIn(false);
    setUserName('');
    setUserPhone('');
    setShowProfile(false);
  };

  const t = {
    bn: {
      welcome: "বরিশাল সুপার শপে স্বাগতম!",
      subtitle: "কেনাকাটা করতে আপনার নাম ও মোবাইল নম্বর দিয়ে প্রবেশ করুন",
      nameLabel: "আপনার নাম",
      phoneLabel: "মোবাইল নম্বর",
      loginBtn: "প্রবেশ করুন 🚀",
      shopTitle: "বরিশাল সুপার শপ",
      offer: "বিশেষ অফার: যেকোনো অর্ডারে পাচ্ছেন আকর্ষণীয় ছাড় ও দ্রুত হোম ডেলিভারি!",
      profile: "প্রোফাইল",
      logout: "লগআউট",
      close: "বন্ধ করুন"
    },
    en: {
      welcome: "Welcome to Barishal Super Shop!",
      subtitle: "Enter your name and mobile number to start shopping",
      nameLabel: "Your Name",
      phoneLabel: "Mobile Number",
      loginBtn: "Login 🚀",
      shopTitle: "Barishal Super Shop",
      offer: "Special Offer: Get exciting discounts and fast home delivery on any order!",
      profile: "Profile",
      logout: "Logout",
      close: "Close"
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#18101B]">
      {!isLoggedIn && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-orange-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#D94E28]">{t[language].welcome}</h2>
              <p className="text-sm text-gray-600 mt-1">{t[language].subtitle}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t[language].nameLabel}</label>
                <input 
                  type="text" 
                  required
                  placeholder={language === 'bn' ? "যেমন: রাহিম আহমেদ" : "e.g. Rahim Ahmed"} 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D94E28]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t[language].phoneLabel}</label>
                <input 
                  type="tel" 
                  required
                  placeholder="01712345678" 
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D94E28]"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#D94E28] hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
              >
                {t[language].loginBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 text-center shadow-md flex items-center justify-center space-x-2">
        <span className="animate-bounce">📢</span>
        <p className="text-sm font-semibold">{t[language].offer}</p>
      </div>

      <header className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-xl font-bold text-[#D94E28]">{t[language].shopTitle}</h1>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="px-3 py-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full border border-gray-300 transition-all"
          >
            {language === 'bn' ? 'English 🇬🇧' : 'বাংলা 🇧🇩'}
          </button>

          {isLoggedIn && (
            <button 
              onClick={() => setShowProfile(true)}
              className="flex items-center space-x-1.5 bg-orange-100 text-[#D94E28] px-3 py-1.5 rounded-full font-semibold text-xs shadow-sm hover:bg-orange-200 transition-all"
            >
              <span>👤</span>
              <span>{userName.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </header>

      {showProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 text-[#D94E28] rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
              {userName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{userName}</h3>
              <p className="text-sm text-gray-500">{userPhone}</p>
            </div>
            <div className="pt-2 space-y-2">
              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl transition-all text-sm"
              >
                {t[language].logout}
              </button>
              <button 
                onClick={() => setShowProfile(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-all text-sm"
              >
                {t[language].close}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="p-4">
        {/* শপের অন্যান্য কন্টেন্ট */}
      </main>
    </div>
  );
            }
