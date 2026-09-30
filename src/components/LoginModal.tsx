import React, { useState } from 'react';

interface LoginModalProps {
  onSuccess: (userData: { name: string; phone: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('অনুগ্রহ করে নাম এবং ফোন নম্বর দিন');
      return;
    }

    const userData = { name, phone };
    
    // ব্রাউজারে এককালীন তথ্য সেভ রাখা
    localStorage.setItem('user_profile', JSON.stringify(userData));
    
    onSuccess(userData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-xl font-bold text-center text-green-700 mb-2">স্বাগতম!</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          চালিয়ে যাওয়ার জন্য অনুগ্রহ করে আপনার নাম ও ফোন নম্বর দিন
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="০১XXXXXXXXX"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
};
