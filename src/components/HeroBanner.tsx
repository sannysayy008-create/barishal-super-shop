import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, PlusCircle } from 'lucide-react';
import { PROMO_BANNERS } from '../data/mockData';
import { CategoryId } from '../types';
import { SafeImage } from './SafeImage';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenPostAd: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenPostAd,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentBanner = PROMO_BANNERS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROMO_BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === PROMO_BANNERS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px] lg:min-h-[340px]">
        {/* Text Content Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10 bg-gradient-to-r from-stone-950 via-stone-900/95 to-stone-900/80 text-white">
          <div className="space-y-3">
            <div className="text-xs font-medium text-amber-300/90 tracking-wide">
              {currentBanner.kicker}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white max-w-xl">
              {currentBanner.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-lg leading-relaxed">
              {currentBanner.subtitle}
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectCategory(currentBanner.targetCategory)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{currentBanner.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenPostAd}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>ফ্রি বিজ্ঞাপন দিন</span>
              </button>
            </div>

            <div className="text-xs text-stone-300 font-medium">
              {currentBanner.highlightStat}
            </div>
          </div>
        </div>

        {/* Image Showcase Column */}
        <div className="lg:col-span-5 relative min-h-[200px] lg:min-h-full overflow-hidden">
          <SafeImage
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-stone-900/60 lg:to-transparent" />

          {/* Slider Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="পূর্ববর্তী ব্যানার"
              className="w-10 h-10 rounded-lg bg-stone-900/75 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {PROMO_BANNERS.map((b, idx) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`ব্যানার ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex ? 'w-6 bg-[#D94E28]' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              aria-label="পরবর্তী ব্যানার"
              className="w-10 h-10 rounded-lg bg-stone-900/75 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
