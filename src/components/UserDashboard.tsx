import React, { useState } from 'react';
import {
  Package,
  Megaphone,
  PlusCircle,
  Trash2,
  CheckCircle,
  MapPin,
  Phone,
  Truck,
} from 'lucide-react';
import { OrderRecord, ProductItem } from '../types';
import { formatTaka, toBengaliNumber } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface UserDashboardProps {
  orders: OrderRecord[];
  userAds: ProductItem[];
  onOpenPostAd: () => void;
  onToggleSoldAd: (productId: string) => void;
  onDeleteAd: (productId: string) => void;
  onAdvanceOrderStatus: (orderId: string) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  orders,
  userAds,
  onOpenPostAd,
  onToggleSoldAd,
  onDeleteAd,
  onAdvanceOrderStatus,
  onSelectProduct,
}) => {
  const [section, setSection] = useState<'orders' | 'ads'>('orders');

  return (
    <div className="space-y-6">
      {/* User Summary Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-medium text-stone-500">
            বরিশাল সুপার শপ ভেরিফায়েড সদস্য
          </div>
          <h2 className="text-xl font-bold text-stone-900">আরিফুল ইসলাম</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span className="tabular-nums">01711-987654</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>বিবির পুকুর পাড়, সদর রোড, বরিশাল</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPostAd}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন বিজ্ঞাপন দিন</span>
        </button>
      </div>

      {/* Interactive Filter Tabs for Orders vs My Posted Ads */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setSection('orders')}
          className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            section === 'orders'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4 text-[#D94E28]" />
          <span>আমার অর্ডারসমূহ ({toBengaliNumber(orders.length)})</span>
        </button>

        <button
          type="button"
          onClick={() => setSection('ads')}
          className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            section === 'ads'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Megaphone className="w-4 h-4 text-teal-700" />
          <span>আমার পোস্ট করা বিজ্ঞাপন ({toBengaliNumber(userAds.length)})</span>
        </button>
      </div>

      {/* Section 1: Active Orders */}
      {section === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-2">
              <Package className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="text-base font-semibold text-stone-800">কোনো সক্রিয় অর্ডার নেই</h3>
              <p className="text-xs text-stone-500">
                আপনি কোনো পণ্য অর্ডার করলে তার লাইভ ট্র্যাকিং এখানে দেখতে পাবেন।
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <div className="text-sm font-bold text-stone-900">
                      অর্ডার #{order.id}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      সময়: {order.createdAt} · পেমেন্ট:{' '}
                      {order.paymentMethod === 'cod'
                        ? 'ক্যাশ অন ডেলিভারি (COD)'
                        : order.paymentMethod === 'bkash'
                        ? `বিকাশ (${order.transactionId})`
                        : `নগদ (${order.transactionId})`}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-teal-700 flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span>অবস্থা: {order.status}</span>
                    </span>
                    {order.status !== 'সম্পন্ন' && (
                      <button
                        type="button"
                        onClick={() => onAdvanceOrderStatus(order.id)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-medium text-stone-700 cursor-pointer"
                      >
                        পরবর্তী ধাপ দেখুন
                      </button>
                    )}
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-2.5">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                          <SafeImage
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-stone-900 truncate">
                            {item.product.title}
                          </div>
                          <div className="text-stone-500">
                            পরিমাণ: {toBengaliNumber(item.quantity)}টি · ডেলিভারি: {order.customerArea}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums shrink-0">
                        {formatTaka(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">ডেলিভারি ঠিকানা: {order.customerAddress}</span>
                  <span className="text-sm font-bold text-[#D94E28] tabular-nums">
                    মোট: {formatTaka(order.total)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Section 2: User's Posted Classified Ads */}
      {section === 'ads' && (
        <div className="space-y-4">
          {userAds.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-3">
              <Megaphone className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="text-base font-semibold text-stone-800">
                আপনি এখনো কোনো বিজ্ঞাপন পোস্ট করেননি
              </h3>
              <button
                type="button"
                onClick={onOpenPostAd}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#D94E28] text-white text-xs font-semibold cursor-pointer"
              >
                প্রথম বিজ্ঞাপন দিন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex gap-4 justify-between"
                >
                  <div className="flex gap-3.5 min-w-0">
                    <div
                      onClick={() => onSelectProduct(ad)}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer"
                    >
                      <SafeImage
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(ad)}
                        className="text-sm font-bold text-stone-900 line-clamp-1 text-left hover:text-[#D94E28] cursor-pointer"
                      >
                        {ad.title}
                      </button>
                      <div className="text-xs text-stone-500">
                        {ad.area}, বরিশাল · {ad.condition}
                      </div>
                      <div className="text-sm font-bold text-[#D94E28] tabular-nums">
                        {formatTaka(ad.price)}{' '}
                        {ad.soldOut && (
                          <span className="text-xs font-semibold text-teal-700 ml-1">
                            · (বিক্রি হয়ে গেছে)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleSoldAd(ad.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-teal-700" />
                      <span>{ad.soldOut ? 'আবার চালু করুন' : 'বিক্রি সম্পন্ন'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteAd(ad.id)}
                      className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-[11px] font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>মুছুন</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
