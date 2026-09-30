import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 bg-orange-600 text-white shadow-md z-30 px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">বরিশাল সুপার শপ</h1>
      
      {/* কার্ট বাটন */}
      <button
        onClick={onOpenCart}
        className="relative bg-white text-orange-600 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 text-sm shadow hover:bg-orange-50 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span>কার্ট</span>
        {cartCount > 0 && (
          <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
