import React from 'react';
import { ShoppingBag, PlusCircle } from 'lucide-react';
import { toBengaliNumber } from '../data/mockData';
import { PWAInstallButton } from './PWAInstallButton';

export type ActiveTab = 'home' | 'chat' | 'profile';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  listingModeFilter: 'all' | 'ecommerce' | 'classified';
  setListingModeFilter: (mode: 'all' | 'ecommerce' | 'classified') => void;
  cartCount: number;
  unreadChatCount: number;
  onOpenCart: () => void;
  onOpenPostAd: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  listingModeFilter,
  setListingModeFilter,
  cartCount,
  unreadChatCount,
  onOpenCart,
  onOpenPostAd,
}) => {
  const handleModeClick = (mode: 'all' | 'ecommerce' | 'classified') => {
    setActiveTab('home');
    setListingModeFilter(mode);
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 lg:px-8 flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <button
        type="button"
        onClick={() => handleModeClick('all')}
        className="text-lg lg:text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94E28] rounded"
      >
        বরিশাল সুপার শপ
      </button>

      {/* Zone 2: 4-5 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
        <button
          type="button"
          onClick={() => handleModeClick('all')}
          className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
            activeTab === 'home' && listingModeFilter === 'all'
              ? 'text-stone-900 border-[#D94E28] font-semibold'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          সব পণ্য
        </button>
        <button
          type="button"
          onClick={() => handleModeClick('ecommerce')}
          className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
            activeTab === 'home' && listingModeFilter === 'ecommerce'
              ? 'text-stone-900 border-[#D94E28] font-semibold'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          অফিশিয়াল শপ
        </button>
        <button
          type="button"
          onClick={() => handleModeClick('classified')}
          className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
            activeTab === 'home' && listingModeFilter === 'classified'
              ? 'text-stone-900 border-[#D94E28] font-semibold'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          ক্লাসিফাইড বিজ্ঞাপন
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
            activeTab === 'chat'
              ? 'text-stone-900 border-[#D94E28] font-semibold'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          বিক্রেতা চ্যাট {unreadChatCount > 0 ? `(${toBengaliNumber(unreadChatCount)})` : ''}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'text-stone-900 border-[#D94E28] font-semibold'
              : 'border-transparent hover:text-stone-900'
          }`}
        >
          আমার প্রোফাইল
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2">
        <PWAInstallButton />

        <button
          type="button"
          onClick={onOpenPostAd}
          className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[#D94E28] rounded-lg hover:bg-[#c0411f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>বিজ্ঞাপন দিন</span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label="শপিং কার্ট দেখুন"
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#D94E28]" />
          <span>কার্ট</span>
          <span className="tabular-nums font-bold text-[#D94E28]">
            ({toBengaliNumber(cartCount)})
          </span>
        </button>
      </div>
    </header>
  );
};
