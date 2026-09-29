export type ListingType = 'ecommerce' | 'classified';

export type CategoryId =
  | 'all'
  | 'electronics'
  | 'fashion'
  | 'grocery'
  | 'mobile'
  | 'used_items'
  | 'vehicles';

export type BarishalArea =
  | 'সব এলাকা'
  | 'সদর রোড'
  | 'নথুল্লাবাদ'
  | 'রূপাতলী'
  | 'চৌমাথা'
  | 'বগুড়া রোড'
  | 'আমতলা মোড়'
  | 'কাশীপুর'
  | 'বন্দর (লঞ্চঘাট)'
  | 'বাকেরগঞ্জ'
  | 'বাবুগঞ্জ'
  | 'উজিরপুর';

export interface ProductItem {
  id: string;
  title: string;
  listingType: ListingType;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  condition: 'নতুন' | 'ব্যবহৃত (নতুনের মতো)' | 'ব্যবহৃত';
  negotiable?: boolean;
  area: Exclude<BarishalArea, 'সব এলাকা'>;
  image: string;
  gallery: string[];
  description: string;
  specs: { label: string; value: string }[];
  seller: {
    name: string;
    phone: string;
    verified: boolean;
    memberSince: string;
    shopBadge?: string;
  };
  postedAt: string;
  inStock: boolean;
  isUserPosted?: boolean;
  soldOut?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export interface OrderRecord {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentPhone?: string;
  transactionId?: string;
  customerName: string;
  customerPhone: string;
  customerArea: string;
  customerAddress: string;
  status: 'অর্ডার গৃহীত' | 'প্যাকিং চলছে' | 'ডেলিভারির পথে' | 'সম্পন্ন';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  sellerName: string;
  sellerPhone: string;
  sellerArea: string;
  listingType: ListingType;
  messages: ChatMessage[];
  unreadCount: number;
}
