import { BarishalArea, CategoryId, ChatThread, OrderRecord, ProductItem } from '../types';

export const IMG_HERO_BANNER = '/src/assets/images/hero_barishal_banner_1790659457003.jpg';
export const IMG_SMARTPHONE = '/src/assets/images/product_smartphone_pro_1790659470175.jpg';
export const IMG_FASHION = '/src/assets/images/product_bengali_fashion_1790659481751.jpg';
export const IMG_GROCERY = '/src/assets/images/product_barishal_grocery_1790659493068.jpg';
export const IMG_MOTORBIKE = '/src/assets/images/product_used_motorbike_1790659503965.jpg';

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  const formatted = typeof num === 'number' ? num.toLocaleString('en-IN') : String(num);
  return formatted.replace(/\d/g, (d) => BENGALI_DIGITS[parseInt(d, 10)]);
}

export function formatTaka(amount: number): string {
  return `৳${toBengaliNumber(amount)}`;
}

export const BARISHAL_AREAS: BarishalArea[] = [
  'সব এলাকা',
  'সদর রোড',
  'নথুল্লাবাদ',
  'রূপাতলী',
  'চৌমাথা',
  'বগুড়া রোড',
  'আমতলা মোড়',
  'কাশীপুর',
  'বন্দর (লঞ্চঘাট)',
  'বাকেরগঞ্জ',
  'বাবুগঞ্জ',
  'উজিরপুর',
];

export const CATEGORIES: {
  id: CategoryId;
  nameBn: string;
  subBn: string;
}[] = [
  { id: 'all', nameBn: 'সব ক্যাটাগরি', subBn: 'সকল পণ্য ও বিজ্ঞাপন' },
  { id: 'electronics', nameBn: 'ইলেকট্রনিক্স', subBn: 'টিভি, ফ্যান ও গ্যাজেট' },
  { id: 'fashion', nameBn: 'ফ্যাশন ও পোশাক', subBn: 'শাড়ি, পাঞ্জাবি ও জুতা' },
  { id: 'grocery', nameBn: 'গ্রোসারি ও বাজার', subBn: 'চাল, তেল ও স্থানীয় পণ্য' },
  { id: 'mobile', nameBn: 'মোবাইল ফোন', subBn: 'নতুন ও ব্যবহৃত স্মার্টফোন' },
  { id: 'used_items', nameBn: 'ব্যবহৃত পণ্য', subBn: 'ফার্নিচার, ল্যাপটপ ও অন্যান্য' },
  { id: 'vehicles', nameBn: 'বাইক ও যানবাহন', subBn: 'মোটরবাইক ও সাইকেল' },
];

export const PROMO_BANNERS = [
  {
    id: 'banner-1',
    kicker: 'বরিশাল সুপার শপ · মেগা ডিল',
    title: 'নতুন কেনাকাটা ও পুরাতন পণ্য বিক্রির বিশ্বস্ত ঠিকানা',
    subtitle: 'বরিশাল সদর, নথুল্লাবাদ ও রূপাতলীতে মাত্র ২ ঘণ্টায় হোম ডেলিভারি। ক্যাশ অন ডেলিভারি, বিকাশ ও নগদে পেমেন্ট সুবিধা।',
    ctaText: 'এখনই শপিং করুন',
    targetCategory: 'all' as CategoryId,
    image: IMG_HERO_BANNER,
    highlightStat: '২৫% পর্যন্ত ছাড় · ফ্রি ডেলিভারি ৳২,০০০+ অর্ডারে',
  },
  {
    id: 'banner-2',
    kicker: 'বরিশালের ঐতিহ্যবাহী বাজার · গ্রোসারি অফার',
    title: 'খাঁটি সরিষার তেল, সুগন্ধি চাল ও তাজা পণ্যের সমাহার',
    subtitle: 'সরাসরি বরিশালের স্থানীয় কৃষক ও উৎপাদকদের কাছ থেকে সংগৃহীত শতভাগ খাঁটি ও মানসম্মত নিত্যপ্রয়োজনীয় বাজার।',
    ctaText: 'গ্রোসারি দেখুন',
    targetCategory: 'grocery' as CategoryId,
    image: IMG_GROCERY,
    highlightStat: '১০০% খাঁটি পণ্যের নিশ্চয়তা · সরাসরি হোম ডেলিভারি',
  },
  {
    id: 'banner-3',
    kicker: 'ক্লাসিফাইড মার্কেটপ্লেস · বিক্রয় জোন',
    title: 'আপনার ব্যবহৃত মোবাইল, বাইক বা ফার্নিচার বিক্রি করুন সহজেই',
    subtitle: 'বরিশালের যেকোনো থানা বা এলাকা থেকে বিনামূল্যে বিজ্ঞাপন দিন এবং সরাসরি ক্রেতার সাথে চ্যাট বা ফোনে কথা বলুন।',
    ctaText: 'ব্যবহৃত পণ্য দেখুন',
    targetCategory: 'used_items' as CategoryId,
    image: IMG_MOTORBIKE,
    highlightStat: 'বিনামূল্যে বিজ্ঞাপন · সরাসরি ক্রেতা-বিক্রেতা চ্যাট',
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'স্যামসাং গ্যালাক্সি এ৫৫ ৫জি (৮/১২৮ জিবি) — অফিশিয়াল ওয়ারেন্টি',
    listingType: 'ecommerce',
    category: 'mobile',
    categoryLabel: 'মোবাইল ফোন',
    price: 42500,
    originalPrice: 48000,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 86,
    condition: 'নতুন',
    area: 'সদর রোড',
    image: IMG_SMARTPHONE,
    gallery: [IMG_SMARTPHONE, IMG_HERO_BANNER],
    description:
      'সম্পূর্ণ নতুন অফিশিয়াল স্যামসাং গ্যালাক্সি এ৫৫ ৫জি স্মার্টফোন। সুপার অ্যামোলেড ১২০ হার্জ ডিসপ্লে, ৫০ মেগাপিক্সেল ওআইএস ক্যামেরা এবং ৫০০০ এমএএইচ দীর্ঘস্থায়ী ব্যাটারি। বরিশাল সদর রোড শোরুম থেকে ১ বছরের অফিশিয়াল ওয়ারেন্টিসহ ডেলিভারি।',
    specs: [
      { label: 'র‍্যাম / রম', value: '৮ জিবি / ১২৮ জিবি' },
      { label: 'ডিসপ্লে', value: '৬.৬ ইঞ্চি সুপার অ্যামোলেড ১২০Hz' },
      { label: 'ওয়ারেন্টি', value: '১ বছর অফিশিয়াল সার্ভিস ওয়ারেন্টি' },
      { label: 'ডেলিভারি', value: 'বরিশাল সদরে আজই ডেলিভারি' },
    ],
    seller: {
      name: 'বরিশাল টেলিকম অ্যান্ড গ্যাজেটস',
      phone: '01711-223344',
      verified: true,
      memberSince: '২০২২',
      shopBadge: 'অফিশিয়াল সুপার শপ স্টোর',
    },
    postedAt: 'আজ সকাল ১০:৩০',
    inStock: true,
  },
  {
    id: 'prod-2',
    title: 'ঐতিহ্যবাহী হ্যান্ডলুম ঢাকাই জামদানি শাড়ি ও প্রিমিয়াম সুতি পাঞ্জাবি কম্বো',
    listingType: 'ecommerce',
    category: 'fashion',
    categoryLabel: 'ফ্যাশন ও পোশাক',
    price: 3850,
    originalPrice: 4600,
    discountPercent: 16,
    rating: 4.8,
    reviewCount: 64,
    condition: 'নতুন',
    area: 'বগুড়া রোড',
    image: IMG_FASHION,
    gallery: [IMG_FASHION, IMG_HERO_BANNER],
    description:
      'উৎসব ও বিশেষ আয়োজনের জন্য নিখুঁত বুননের হ্যান্ডলুম জামদানি শাড়ি এবং ম্যাচিং প্রিমিয়াম এমব্রয়ডারি সুতি পাঞ্জাবি সেট। আরামদায়ক ফেব্রিক এবং পাকা রঙের নিশ্চয়তা।',
    specs: [
      { label: 'ফেব্রিক', value: '১০০% পিওর কটন ও সিল্ক ব্লেন্ড' },
      { label: 'পাঞ্জাবি সাইজ', value: '৪০, ৪২, ৪৪ (রেগুলার ফিট)' },
      { label: 'শাড়ির দৈর্ঘ্য', value: '১২ হাত (ব্লাউজ পিসসহ)' },
      { label: 'রিটার্ন পলিসি', value: '৩ দিনের সহজ এক্সচেঞ্জ সুবিধা' },
    ],
    seller: {
      name: 'কীর্তনখোলা ফ্যাশন হাউস',
      phone: '01819-556677',
      verified: true,
      memberSince: '২০২১',
      shopBadge: 'অফিশিয়াল সুপার শপ স্টোর',
    },
    postedAt: 'আজ দুপুর ১২:১৫',
    inStock: true,
  },
  {
    id: 'prod-3',
    title: 'বরিশালের খাঁটি ঘানি ভাঙা সরিষার তেল (২ লিটার) ও কাটারিভোগ চাল (৫ কেজি) প্যাক',
    listingType: 'ecommerce',
    category: 'grocery',
    categoryLabel: 'গ্রোসারি ও বাজার',
    price: 1180,
    originalPrice: 1400,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 142,
    condition: 'নতুন',
    area: 'চৌমাথা',
    image: IMG_GROCERY,
    gallery: [IMG_GROCERY, IMG_HERO_BANNER],
    description:
      'বরিশালের স্থানীয় তেলকল থেকে সংগৃহীত ১০০% খাঁটি কাঠের ঘানি ভাঙা সরিষার তেল (২ লিটার) এবং সুগন্ধি দিনাজপুরী কাটারিভোগ চাল (৫ কেজি) একসাথে সাশ্রয়ী ফ্যামিলি কম্বো প্যাকে। কোনো প্রকার ভেজাল বা কেমিক্যাল মুক্ত।',
    specs: [
      { label: 'প্যাকেজ ওজন', value: '৫ কেজি চাল + ২ লিটার সরিষার তেল' },
      { label: 'উৎপাদন তারিখ', value: 'চলতি মাস (সম্পূর্ণ তাজা স্টক)' },
      { label: 'মান নিয়ন্ত্রণ', value: 'বিএসটিআই অনুমোদিত ও ল্যাব পরীক্ষিত' },
      { label: 'ডেলিভারি সময়', value: 'বরিশাল সিটিতে ২ ঘণ্টায় ডেলিভারি' },
    ],
    seller: {
      name: 'বরিশাল অর্গানিক ভান্ডার',
      phone: '01755-889900',
      verified: true,
      memberSince: '২০২০',
      shopBadge: 'অফিশিয়াল সুপার শপ স্টোর',
    },
    postedAt: 'গতকাল',
    inStock: true,
  },
  {
    id: 'prod-4',
    title: 'ইয়ামাহা এফজেডএস ভি৩ (Yamaha FZS V3 Deluxe) ১৫০ সিসি — বরিশাল মেট্রো ল',
    listingType: 'classified',
    category: 'vehicles',
    categoryLabel: 'বাইক ও যানবাহন',
    price: 195000,
    rating: 4.7,
    reviewCount: 12,
    condition: 'ব্যবহৃত (নতুনের মতো)',
    negotiable: true,
    area: 'নথুল্লাবাদ',
    image: IMG_MOTORBIKE,
    gallery: [IMG_MOTORBIKE],
    description:
      'এক হাতে চালানো খুবই যত্নে রাখা ইয়ামাহা এফজেডএস ভি৩ ডিলাক্স এডিশন। বরিশাল বিআরটিএ ১০ বছরের কাগজ করা আছে, প্রথম মালিক, যেকোনো সময় নাম পরিবর্তন সম্ভব। মাত্র ১১,৫০০ কি.মি. চলেছে। কোনো অ্যাক্সিডেন্ট হিস্ট্রি নেই। নথুল্লাবাদ বাস টার্মিনাল সংলগ্ন বাসায় এসে সরাসরি দেখে চালাতে পারবেন।',
    specs: [
      { label: 'মডেল ইয়ার', value: '২০২৩ (রেজিস্ট্রেশন ২০২৩)' },
      { label: 'মাইলেজ / চলা', value: '১১,৫০০ কিলোমিটার' },
      { label: 'কাগজপত্র', value: 'বরিশাল মেট্রো, ১০ বছরের ট্যাক্স টোকেন' },
      { label: 'দাম', value: 'আলোচনা সাপেক্ষে (সামান্য কমানো যাবে)' },
    ],
    seller: {
      name: 'মোঃ তানভীর হোসেন',
      phone: '01912-345678',
      verified: true,
      memberSince: '২০২৩',
    },
    postedAt: '৩ ঘণ্টা আগে',
    inStock: true,
  },
  {
    id: 'prod-5',
    title: 'আইফোন ১৩ (১২৮ জিবি) ওয়্যারলেস এয়ারবাডসসহ — ব্যাটারি হেলথ ৮৯%',
    listingType: 'classified',
    category: 'used_items',
    categoryLabel: 'ব্যবহৃত পণ্য',
    price: 54000,
    rating: 4.8,
    reviewCount: 9,
    condition: 'ব্যবহৃত (নতুনের মতো)',
    negotiable: true,
    area: 'রূপাতলী',
    image: IMG_SMARTPHONE,
    gallery: [IMG_SMARTPHONE],
    description:
      'বক্স, অরিজিনাল ক্যাবল এবং একটি প্রিমিয়াম ওয়্যারলেস এয়ারবাডসসহ আইফোন ১৩ (১২৮ জিবি) বিক্রি করা হবে। ফোনে কোনো দাগ বা ডেন্ট নেই, কখনো খোলা বা সার্ভিসিং করানো হয়নি। ব্যাটারি হেলথ ৮৯% অরিজিনাল। রূপাতলী হাউজিং এলাকায় এসে যতক্ষণ খুশি চেক করে নিতে পারবেন।',
    specs: [
      { label: 'স্টোরেজ', value: '১২৮ জিবি (সিঙ্গাপুর ভ্যারিয়েন্ট)' },
      { label: 'ব্যাটারি হেলথ', value: '৮৯% (অরিজিনাল)' },
      { label: 'সাথে থাকছে', value: 'বক্স, ক্যাবল ও ওয়্যারলেস এয়ারবাডস' },
      { label: 'লোকেশন', value: 'রূপাতলী হাউজিং, বরিশাল' },
    ],
    seller: {
      name: 'রাশেদুল ইসলাম হৃদয়',
      phone: '01688-901234',
      verified: true,
      memberSince: '২০২৪',
    },
    postedAt: '৫ ঘণ্টা আগে',
    inStock: true,
  },
  {
    id: 'prod-6',
    title: 'স্মার্ট হোম ও রান্নাঘরের কম্বো অ্যাপ্লায়েন্স ও প্রিমিয়াম গ্যাজেট প্যাক',
    listingType: 'ecommerce',
    category: 'electronics',
    categoryLabel: 'ইলেকট্রনিক্স',
    price: 6450,
    originalPrice: 7800,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 53,
    condition: 'নতুন',
    area: 'আমতলা মোড়',
    image: IMG_HERO_BANNER,
    gallery: [IMG_HERO_BANNER, IMG_SMARTPHONE],
    description:
      'আধুনিক ঘরের জন্য এনার্জি সেভিং স্মার্ট ইলেকট্রনিক্স ও কিচেন হোম অ্যাপ্লায়েন্স সেট। কম বিদ্যুৎ খরচে সর্বোচ্চ পারফরম্যান্স এবং ২ বছরের বিক্রয়োত্তর সেবা। বরিশাল আমতলা মোড় ডিপো থেকে দ্রুত ডেলিভারি।',
    specs: [
      { label: 'ক্যাটাগরি', value: 'হোম ও কিচেন ইলেকট্রনিক্স' },
      { label: 'ওয়ারেন্টি', value: '২ বছরের রিপ্লেসমেন্ট ও সার্ভিস' },
      { label: 'পাওয়ার সেভিং', value: 'ইনভার্টার গ্রেড এনার্জি সেভার' },
      { label: 'পেমেন্ট', value: 'ক্যাশ অন ডেলিভারি / বিকাশ / নগদ' },
    ],
    seller: {
      name: 'বরিশাল ইলেকট্রনিক্স মার্ট',
      phone: '01715-667788',
      verified: true,
      memberSince: '২০২১',
      shopBadge: 'অফিশিয়াল সুপার শপ স্টোর',
    },
    postedAt: 'গতকাল',
    inStock: true,
  },
  {
    id: 'prod-7',
    title: 'সেগুন কাঠের ডাইনিং টেবিল (৬ চেয়ারসহ) — বাসা পরিবর্তনের কারণে বিক্রি',
    listingType: 'classified',
    category: 'used_items',
    categoryLabel: 'ব্যবহৃত পণ্য',
    price: 22500,
    rating: 4.6,
    reviewCount: 7,
    condition: 'ব্যবহৃত',
    negotiable: true,
    area: 'কাশীপুর',
    image: IMG_HERO_BANNER,
    gallery: [IMG_HERO_BANNER],
    description:
      'খাঁটি চিটাগাং সেগুন কাঠের তৈরি ৬ চেয়ারের ডাইনিং টেবিল সেট। মাত্র দেড় বছর ব্যবহার করা হয়েছে, বার্নিশ এখনো নতুনের মতো উজ্জ্বল। ঢাকায় বদলিজনিত কারণে জরুরি ভিত্তিতে বিক্রি করা হবে। কাশীপুর বাজার সংলগ্ন বাসা থেকে দেখে নিতে পারবেন।',
    specs: [
      { label: 'কাঠের ধরন', value: 'চিটাগাং সেগুন কাঠ ও ১০ মিলি গ্লাস টপ' },
      { label: 'ব্যবহারকাল', value: '১ বছর ৬ মাস' },
      { label: 'চেয়ার সংখ্যা', value: '৬টি কুশনযুক্ত চেয়ার' },
      { label: 'এলাকা', value: 'কাশীপুর, বরিশাল সদর' },
    ],
    seller: {
      name: 'মাহমুদা আক্তার',
      phone: '01733-445566',
      verified: true,
      memberSince: '২০২৩',
    },
    postedAt: '১ দিন আগে',
    inStock: true,
  },
  {
    id: 'prod-8',
    title: 'হিরো হাঙ্ক ১৫০ সিসি ডাবল ডিস্ক — দারুণ কন্ডিশন (বাকেরগঞ্জ)',
    listingType: 'classified',
    category: 'vehicles',
    categoryLabel: 'বাইক ও যানবাহন',
    price: 98000,
    rating: 4.5,
    reviewCount: 11,
    condition: 'ব্যবহৃত',
    negotiable: true,
    area: 'বাকেরগঞ্জ',
    image: IMG_MOTORBIKE,
    gallery: [IMG_MOTORBIKE],
    description:
      'ইঞ্জিন আনটাচড হিরো হাঙ্ক ১৫০ সিসি ডাবল ডিস্ক বাইক। দুইটি টায়ারই নতুন লাগানো হয়েছে। প্রতি লিটারে ৪২+ কি.মি. মাইলেজ পাওয়া যায়। বাকেরগঞ্জ বাসস্ট্যান্ডে এসে সরাসরি বাইক দেখে দামাদামি করতে পারবেন।',
    specs: [
      { label: 'ইঞ্জিন', value: '১৫০ সিসি, ডাবল ডিস্ক ব্রেক' },
      { label: 'মাইলেজ', value: '৪২-৪৫ কি.মি. প্রতি লিটার' },
      { label: 'কাগজপত্র', value: 'সব আপ-টু-ডেট আছে' },
      { label: 'এলাকা', value: 'বাকেরগঞ্জ সদর, বরিশাল' },
    ],
    seller: {
      name: 'জাহিদুল হাসান শাওন',
      phone: '01844-112233',
      verified: false,
      memberSince: '২০২৪',
    },
    postedAt: '২ দিন আগে',
    inStock: true,
  },
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: 'chat-1',
    productId: 'prod-4',
    productTitle: 'ইয়ামাহা এফজেডএস ভি৩ (Yamaha FZS V3 Deluxe) ১৫০ সিসি',
    productImage: IMG_MOTORBIKE,
    productPrice: 195000,
    sellerName: 'মোঃ তানভীর হোসেন',
    sellerPhone: '01912-345678',
    sellerArea: 'নথুল্লাবাদ',
    listingType: 'classified',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        sender: 'buyer',
        text: 'আসসালামু আলাইকুম ভাই, বাইকটি কি এখনো বিক্রি আছে?',
        timestamp: 'সকাল ১১:১০',
      },
      {
        id: 'm-2',
        sender: 'seller',
        text: 'ওয়া আলাইকুম আসসালাম। জি ভাই, বাইকটি এখনো আছে। নথুল্লাবাদ এসে সরাসরি দেখে যেতে পারেন।',
        timestamp: 'সকাল ১১:১২',
      },
    ],
  },
  {
    id: 'chat-2',
    productId: 'prod-3',
    productTitle: 'বরিশালের খাঁটি ঘানি ভাঙা সরিষার তেল ও কাটারিভোগ চাল প্যাক',
    productImage: IMG_GROCERY,
    productPrice: 1180,
    sellerName: 'বরিশাল অর্গানিক ভান্ডার',
    sellerPhone: '01755-889900',
    sellerArea: 'চৌমাথা',
    listingType: 'ecommerce',
    unreadCount: 0,
    messages: [
      {
        id: 'm-201',
        sender: 'buyer',
        text: 'আজকে অর্ডার করলে সদর রোডে কখন ডেলিভারি পাবো?',
        timestamp: 'গতকাল বিকাল ৪:২০',
      },
      {
        id: 'm-202',
        sender: 'seller',
        text: 'সদর রোডে অর্ডার করার ২ ঘণ্টার মধ্যেই আমাদের নিজস্ব ডেলিভারি ম্যান পৌঁছে দেবে ইনশাআল্লাহ।',
        timestamp: 'গতকাল বিকাল ৪:২২',
      },
    ],
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'BSS-9042',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
      },
    ],
    subtotal: 1180,
    deliveryFee: 60,
    total: 1240,
    paymentMethod: 'bkash',
    paymentPhone: '01711-987654',
    transactionId: 'BK982X71LP',
    customerName: 'আরিফুল ইসলাম',
    customerPhone: '01711-987654',
    customerArea: 'সদর রোড',
    customerAddress: 'বাড়ি ১২, বিবির পুকুর পাড় সংলগ্ন, সদর রোড, বরিশাল',
    status: 'ডেলিভারির পথে',
    createdAt: 'আজ দুপুর ১:২০',
  },
];
