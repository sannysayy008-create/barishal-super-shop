import React, { useState } from 'react';
import { X, Upload, CheckCircle2 } from 'lucide-react';
import { BarishalArea, CategoryId, ListingType, ProductItem } from '../types';
import {
  BARISHAL_AREAS,
  CATEGORIES,
  IMG_FASHION,
  IMG_GROCERY,
  IMG_HERO_BANNER,
  IMG_MOTORBIKE,
  IMG_SMARTPHONE,
} from '../data/mockData';
import { SafeImage } from './SafeImage';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: ProductItem) => void;
}

const PRESET_PHOTOS = [
  { label: 'স্মার্টফোন ও গ্যাজেট', url: IMG_SMARTPHONE },
  { label: 'মোটরবাইক ও যানবাহন', url: IMG_MOTORBIKE },
  { label: 'পোশাক ও ফ্যাশন', url: IMG_FASHION },
  { label: 'গ্রোসারি ও খাঁটি বাজার', url: IMG_GROCERY },
  { label: 'ইলেকট্রনিক্স ও ফার্নিচার', url: IMG_HERO_BANNER },
];

export const PostAdModal: React.FC<PostAdModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<ListingType>('classified');
  const [category, setCategory] = useState<Exclude<CategoryId, 'all'>>('used_items');
  const [condition, setCondition] = useState<'নতুন' | 'ব্যবহৃত (নতুনের মতো)' | 'ব্যবহৃত'>('ব্যবহৃত (নতুনের মতো)');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [area, setArea] = useState<Exclude<BarishalArea, 'সব এলাকা'>>('সদর রোড');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('আরিফুল ইসলাম');
  const [sellerPhone, setSellerPhone] = useState('01711-987654');
  const [photoUrl, setPhotoUrl] = useState(IMG_SMARTPHONE);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || Number(price) <= 0 || !sellerPhone.trim()) {
      setErrorMsg('অনুগ্রহ করে পণ্যের নাম, সঠিক মূল্য এবং মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    const catObj = CATEGORIES.find((c) => c.id === category);

    const newItem: ProductItem = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      listingType,
      category,
      categoryLabel: catObj ? catObj.nameBn : 'ব্যবহৃত পণ্য',
      price: Number(price),
      rating: 5.0,
      reviewCount: 1,
      condition: listingType === 'ecommerce' ? 'নতুন' : condition,
      negotiable: listingType === 'classified' ? negotiable : false,
      area,
      image: photoUrl,
      gallery: [photoUrl],
      description:
        description.trim() ||
        `${area}, বরিশাল থেকে এই পণ্যটি বিক্রির জন্য পোস্ট করা হয়েছে। আগ্রহী ক্রেতাগণ সরাসরি কল বা চ্যাটে যোগাযোগ করুন।`,
      specs: [
        { label: 'কন্ডিশন', value: listingType === 'ecommerce' ? 'নতুন' : condition },
        { label: 'এলাকা / থানা', value: `${area}, বরিশাল` },
        { label: 'দাম', value: negotiable ? 'আলোচনা সাপেক্ষে' : 'ফিক্সড প্রাইস' },
      ],
      seller: {
        name: sellerName.trim() || 'বরিশাল বিক্রেতা',
        phone: sellerPhone.trim(),
        verified: true,
        memberSince: '২০২৫',
      },
      postedAt: 'এইমাত্র',
      inStock: true,
      isUserPosted: true,
    };

    onAddProduct(newItem);
    setTitle('');
    setPrice('');
    setDescription('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-ad-title"
    >
      <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 id="post-ad-title" className="text-lg font-bold text-stone-900">
              নতুন বিজ্ঞাপন দিন (Post Ad)
            </h2>
            <p className="text-xs text-stone-500">
              বরিশাল সুপার শপে আপনার ব্যবহৃত বা নতুন পণ্যের বিজ্ঞাপন বিনামূল্যে প্রকাশ করুন
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Listing Mode Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              বিজ্ঞাপনের ধরন নির্বাচন করুন
            </label>
            <div className="grid grid-cols-2 gap-2.5 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setListingType('classified')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  listingType === 'classified'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ক্লাসিফাইড বিজ্ঞাপন (বিক্রয় স্টাইল)
              </button>
              <button
                type="button"
                onClick={() => setListingType('ecommerce')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  listingType === 'ecommerce'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                দোকানের পণ্য (দারাজ স্টাইল শপ)
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              পণ্যের শিরোনাম / নাম *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: স্যামসাং এ৫৪ ব্যবহৃত ফোন / সেগুন কাঠের আলমারি"
              className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#D94E28]"
            />
          </div>

          {/* Category, Area in Barishal, Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">ক্যাটাগরি *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Exclude<CategoryId, 'all'>)}
                className="w-full h-11 px-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-[#D94E28]"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">
                বরিশালের এলাকা / থানা *
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as Exclude<BarishalArea, 'সব এলাকা'>)}
                className="w-full h-11 px-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-[#D94E28]"
              >
                {BARISHAL_AREAS.filter((a) => a !== 'সব এলাকা').map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">পণ্যের অবস্থা</label>
              <select
                value={condition}
                onChange={(e) =>
                  setCondition(
                    e.target.value as 'নতুন' | 'ব্যবহৃত (নতুনের মতো)' | 'ব্যবহৃত'
                  )
                }
                className="w-full h-11 px-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-[#D94E28]"
              >
                <option value="ব্যবহৃত (নতুনের মতো)">ব্যবহৃত (নতুনের মতো)</option>
                <option value="ব্যবহৃত">ব্যবহৃত</option>
                <option value="নতুন">নতুন</option>
              </select>
            </div>
          </div>

          {/* Price & Negotiable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">মূল্য (টাকা ৳) *</label>
              <input
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="যেমন: ১২৫০০"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-sm text-stone-900 tabular-nums focus:outline-none focus:border-[#D94E28]"
              />
            </div>

            <label className="flex items-center gap-2.5 h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
                className="w-4 h-4 accent-[#D94E28] rounded"
              />
              <span className="text-xs font-medium text-stone-700">
                দাম আলোচনা সাপেক্ষে (Negotiable)
              </span>
            </label>
          </div>

          {/* Photo Upload + Preset Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              পণ্যের ছবি আপলোড করুন অথবা নমুনা ছবি বেছে নিন
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-28 h-20 rounded-xl overflow-hidden border border-stone-300 bg-stone-100 shrink-0">
                <SafeImage src={photoUrl} alt="পণ্যের প্রিভিউ" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2 w-full">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-800 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#D94E28]" />
                  <span>ফোন/কম্পিউটার থেকে ছবি নিন</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex flex-wrap gap-1.5">
                  {PRESET_PHOTOS.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPhotoUrl(preset.url)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                        photoUrl === preset.url
                          ? 'border-[#D94E28] bg-[#D94E28]/10 text-[#D94E28]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="পণ্যটি কতদিন ব্যবহার হয়েছে, কোনো সমস্যা আছে কি না এবং বরিশালের কোথায় এসে দেখা যাবে তা লিখুন..."
              className="w-full p-3.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#D94E28]"
            />
          </div>

          {/* Seller Name & Contact Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200/80">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">আপনার নাম *</label>
              <input
                type="text"
                required
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#D94E28]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">
                যোগাযোগের মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                placeholder="017XX-XXXXXX"
                className="w-full h-11 px-3.5 rounded-xl border border-stone-300 text-sm text-stone-900 tabular-nums focus:outline-none focus:border-[#D94E28]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              বাতিল করুন
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>বিজ্ঞাপন প্রকাশ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
