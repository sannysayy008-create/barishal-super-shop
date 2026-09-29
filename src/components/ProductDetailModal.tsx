import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  ShoppingCart,
  ShoppingBag,
  MapPin,
  Star,
  Check,
  Copy,
  ShieldCheck,
  Minus,
  Plus,
} from 'lucide-react';
import { ProductItem } from '../types';
import { formatTaka, toBengaliNumber } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onBuyNow: (product: ProductItem, quantity: number) => void;
  onStartChat: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onStartChat,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showPhoneBox, setShowPhoneBox] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const images = product.gallery?.length ? product.gallery : [product.image];
  const activeImage = images[selectedImageIdx] || product.image;

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(product.seller.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="px-5 py-3.5 border-b border-stone-200/80 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>
              {product.listingType === 'ecommerce'
                ? 'অফিশিয়াল সুপার শপ পণ্য'
                : 'ক্লাসিফাইড বিজ্ঞাপন (বিক্রয় জোন)'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.area}, বরিশাল</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/70">
              <SafeImage
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-16 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImageIdx === idx
                        ? 'border-[#D94E28]'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeImage
                      src={imgUrl}
                      alt={`${product.title} ছবি ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Details Box */}
            <div className="pt-3 border-t border-stone-200/80 space-y-2">
              <div className="text-xs text-stone-500 font-medium">বিক্রেতার তথ্য</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                    <span>{product.seller.name}</span>
                    {product.seller.verified && (
                      <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    <span>সদস্য: {product.seller.memberSince} থেকে</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>এলাকা: {product.area}, বরিশাল</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onStartChat(product)}
                  className="text-xs font-semibold text-[#D94E28] hover:underline whitespace-nowrap cursor-pointer"
                >
                  মেসেজ পাঠান
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase / Classified Action Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Quiet Metadata Line (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-medium text-stone-700">কন্ডিশন: {product.condition}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="tabular-nums">{toBengaliNumber(product.rating)}</span>
                  <span className="text-stone-400">({toBengaliNumber(product.reviewCount)})</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{product.area}</span>
                </span>
              </div>

              <h2
                id="pdp-title"
                className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug"
              >
                {product.title}
              </h2>

              {/* Price Block */}
              <div className="py-3 border-y border-stone-200/80 flex items-baseline flex-wrap gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#D94E28] tabular-nums">
                  {formatTaka(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      {formatTaka(product.originalPrice)}
                    </span>
                    <span className="text-xs font-semibold text-teal-700">
                      -{toBengaliNumber(product.discountPercent || 10)}% ছাড়
                    </span>
                  </>
                )}
                {product.negotiable && (
                  <span className="text-xs text-stone-500 font-medium">
                    · দাম আলোচনা সাপেক্ষে
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-stone-700">বিস্তারিত বিবরণ</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications List */}
              {product.specs && product.specs.length > 0 && (
                <div className="space-y-2 pt-1">
                  <h3 className="text-xs font-semibold text-stone-700">পণ্যের বৈশিষ্ট্য</h3>
                  <div className="divide-y divide-stone-200/70 border-y border-stone-200/70">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="py-2 flex items-center justify-between text-xs">
                        <span className="text-stone-500">{spec.label}</span>
                        <span className="font-medium text-stone-900 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Controls Based on E-commerce vs Classifieds */}
            {product.listingType === 'ecommerce' ? (
              <div className="pt-4 border-t border-stone-200/80 space-y-3">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-600">পরিমাণ নির্বাচন করুন:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="পরিমাণ কমান"
                      className="w-9 h-9 flex items-center justify-center bg-stone-50 hover:bg-stone-100 text-stone-700 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold tabular-nums">
                      {toBengaliNumber(quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="পরিমাণ বাড়ান"
                      className="w-9 h-9 flex items-center justify-center bg-stone-50 hover:bg-stone-100 text-stone-700 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Daraz Style: Add to Cart & Buy Now + Chat */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl border border-stone-900 text-stone-900 hover:bg-stone-100 font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {addedToast ? (
                      <>
                        <Check className="w-4 h-4 text-teal-700" />
                        <span>কার্টে যুক্ত হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>কার্টে যোগ করুন</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onBuyNow(product, quantity)}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>এখনই কিনুন</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onStartChat(product)}
                  className="w-full min-h-[40px] py-2 text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>এই পণ্য নিয়ে বিক্রেতার সাথে চ্যাট করুন</span>
                </button>
              </div>
            ) : (
              /* Bikroy Style: Call Seller & Chat with Seller */
              <div className="pt-4 border-t border-stone-200/80 space-y-3">
                {showPhoneBox && (
                  <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-500">বিক্রেতার মোবাইল নম্বর</div>
                      <div className="text-base font-bold text-stone-900 tabular-nums mt-0.5">
                        {product.seller.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50 inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPhone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal-700" />
                            <span>কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>নম্বর কপি</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`tel:${product.seller.phone}`}
                        className="px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 inline-flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>ডায়াল</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPhoneBox((prev) => !prev)}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl border border-stone-900 text-stone-900 hover:bg-stone-100 font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-teal-700" />
                    <span>{showPhoneBox ? product.seller.phone : 'বিক্রেতাকে কল করুন'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartChat(product)}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>বিক্রেতার সাথে চ্যাট</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-500 text-center">
                  নিরাপত্তা টিপস: পণ্য সরাসরি দেখে ও যাচাই করে বরিশালে নিরাপদ স্থানে লেনদেন সম্পন্ন করুন।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
