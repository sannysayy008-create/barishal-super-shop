import React from 'react';
import { Home, MessageSquare, PlusCircle, ShoppingCart, User } from 'lucide-react';
import { ActiveTab } from './Header';
import { toBengaliNumber } from '../data/mockData';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  unreadChatCount: number;
  onOpenCart: () => void;
  onOpenPostAd: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  unreadChatCount,
  onOpenCart,
  onOpenPostAd,
}) => {
  return (
    <nav
      aria-label="প্রধান নিচের নেভিগেশন বার"
      className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-2"
    >
      <div className="max-w-3xl mx-auto grid grid-cols-5 items-center h-full">
        {/* 1. হোম (Home) */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#D94E28] font-semibold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">হোম</span>
        </button>

        {/* 2. চ্যাট (Seller/Buyer Chat) */}
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`relative min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'chat' ? 'text-[#D94E28] font-semibold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {unreadChatCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 text-[10px] font-bold text-[#D94E28] tabular-nums">
                {toBengaliNumber(unreadChatCount)}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">চ্যাট</span>
        </button>

        {/* 3. Prominent "বিজ্ঞাপন দিন" (Post Ad - Bikroy Style) */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenPostAd}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span>বিজ্ঞাপন দিন</span>
          </button>
        </div>

        {/* 4. কার্ট (Cart) */}
        <button
          type="button"
          onClick={onOpenCart}
          className="relative min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className=" -top-1.5 -right-3 absolute text-[10px] font-bold text-[#D94E28] tabular-nums">
                ({toBengaliNumber(cartCount)})
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">কার্ট</span>
        </button>

        {/* 5. প্রোফাইল (User Dashboard & Profile) */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-[#D94E28] font-semibold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">প্রোফাইল</span>
        </button>
      </div>
    </nav>
  );
};
