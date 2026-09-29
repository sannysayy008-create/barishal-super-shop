import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { BarishalArea, CartItem, OrderRecord, PaymentMethod } from '../types';
import { BARISHAL_AREAS, formatTaka, toBengaliNumber } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [customerName, setCustomerName] = useState('আরিফুল ইসলাম');
  const [customerPhone, setCustomerPhone] = useState('01711-987654');
  const [customerArea, setCustomerArea] = useState<Exclude<BarishalArea, 'সব এলাকা'>>('সদর রোড');
  const [customerAddress, setCustomerAddress] = useState('বিবির পুকুর পাড় সংলগ্ন, সদর রোড, বরিশাল');
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 60;
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: OrderRecord = {
      id: `BSS-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentPhone: paymentMethod !== 'cod' ? paymentPhone || customerPhone : undefined,
      transactionId:
        paymentMethod !== 'cod'
          ? transactionId || `TRX${Math.floor(100000 + Math.random() * 900000)}`
          : undefined,
      customerName,
      customerPhone,
      customerArea,
      customerAddress,
      status: 'অর্ডার গৃহীত',
      createdAt: 'এইমাত্র',
    };

    setLastOrder(newOrder);
    onPlaceOrder(newOrder);
    setStep('success');
  };

  const handleCloseReset = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="bg-white w-full max-w-lg h-full flex flex-col justify-between border-l border-stone-200 shadow-xl">
        {/* Top Bar */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 id="cart-drawer-title" className="text-lg font-bold text-stone-900">
              {step === 'cart' && 'আপনার শপিং কার্ট'}
              {step === 'checkout' && 'ডেলিভারি ও পেমেন্ট নিশ্চিতকরণ'}
              {step === 'success' && 'অর্ডার সম্পন্ন হয়েছে'}
            </h2>
            <p className="text-xs text-stone-500">
              বরিশাল সুপার শপ · ৳২,০০০+ অর্ডারে বরিশাল সিটিতে ফ্রি ডেলিভারি
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseReset}
            aria-label="বন্ধ করুন"
            className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-semibold text-stone-800">
                    আপনার কার্টে এখনো কোনো পণ্য নেই
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    পছন্দের ইলেকট্রনিক্স, ফ্যাশন বা গ্রোসারি পণ্য কার্টে যোগ করে অর্ডার করুন।
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3.5 p-3 rounded-xl border border-stone-200/90 bg-white"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <SafeImage
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900 line-clamp-1">
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {item.product.area} · একক মূল্য {formatTaka(item.product.price)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-bold text-[#D94E28] tabular-nums">
                            {formatTaka(item.product.price * item.quantity)}
                          </span>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="w-7 h-7 flex items-center justify-center bg-stone-50 hover:bg-stone-100 text-stone-700 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-semibold tabular-nums">
                                {toBengaliNumber(item.quantity)}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="w-7 h-7 flex items-center justify-center bg-stone-50 hover:bg-stone-100 text-stone-700 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              aria-label="পণ্য মুছুন"
                              className="w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-5">
              {/* Delivery Address Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-stone-700">
                  ১. ডেলিভারির ঠিকানা (বরিশাল)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">গ্রাহকের নাম *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-600 mb-1">বরিশালের থানা / এলাকা *</label>
                  <select
                    value={customerArea}
                    onChange={(e) =>
                      setCustomerArea(e.target.value as Exclude<BarishalArea, 'সব এলাকা'>)
                    }
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm bg-white"
                  >
                    {BARISHAL_AREAS.filter((a) => a !== 'সব এলাকা').map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-600 mb-1">বিস্তারিত বাসা/রোড নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm"
                  />
                </div>
              </div>

              {/* Payment Method Selector: COD, bKash, Nagad */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <h3 className="text-xs font-semibold text-stone-700">
                  ২. পেমেন্ট মাধ্যম নির্বাচন করুন
                </h3>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#D94E28] bg-[#D94E28]/5 ring-1 ring-[#D94E28]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900">ক্যাশ অন ডেলিভারি</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">পণ্য হাতে পেয়ে টাকা</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50/50 ring-1 ring-pink-600'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-pink-700">বিকাশ (bKash)</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">মার্চেন্ট পেমেন্ট</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50/50 ring-1 ring-orange-600'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-orange-700">নগদ (Nagad)</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">তাৎক্ষণিক পেমেন্ট</div>
                  </button>
                </div>

                {paymentMethod !== 'cod' && (
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <div className="text-xs text-stone-600">
                      আমাদের {paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} মার্চেন্ট নম্বর{' '}
                      <span className="font-bold text-stone-900 tabular-nums">01711-009988</span>-এ{' '}
                      <span className="font-bold text-[#D94E28]">{formatTaka(total)}</span> পেমেন্ট করে নিচের তথ্য দিন:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="tel"
                        required
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder={`${paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বর (01XXXXXXXXX)`}
                        className="w-full h-9 px-3 rounded-lg border border-stone-300 bg-white text-xs tabular-nums"
                      />
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="ট্রানজেকশন আইডি (TrxID)"
                        className="w-full h-9 px-3 rounded-lg border border-stone-300 bg-white text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}

          {step === 'success' && lastOrder && (
            <div className="py-6 space-y-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-900">
                  ধন্যবাদ! আপনার অর্ডার নিশ্চিত হয়েছে
                </h3>
                <p className="text-xs text-stone-500">
                  অর্ডার নম্বর: <span className="font-bold text-stone-800">#{lastOrder.id}</span> · অবস্থা: {lastOrder.status}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">গ্রাহক:</span>
                  <span className="font-semibold text-stone-900">{lastOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">ডেলিভারি এলাকা:</span>
                  <span className="font-semibold text-stone-900">
                    {lastOrder.customerArea}, বরিশাল
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">পেমেন্ট মাধ্যম:</span>
                  <span className="font-semibold text-stone-900">
                    {lastOrder.paymentMethod === 'cod'
                      ? 'ক্যাশ অন ডেলিভারি (COD)'
                      : lastOrder.paymentMethod === 'bkash'
                      ? 'বিকাশ পেমেন্ট'
                      : 'নগদ পেমেন্ট'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm">
                  <span className="font-semibold text-stone-800">মোট পরিশোধযোগ্য:</span>
                  <span className="font-bold text-[#D94E28] tabular-nums">
                    {formatTaka(lastOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Action */}
        {step !== 'success' && cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/70 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>পণ্যের মূল্য (সাবটোটাল):</span>
                <span className="tabular-nums font-medium">{formatTaka(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>বরিশাল ডেলিভারি চার্জ:</span>
                <span className="tabular-nums font-medium">
                  {deliveryFee === 0 ? 'ফ্রি ডেলিভারি' : formatTaka(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>সর্বমোট:</span>
                <span className="text-[#D94E28] tabular-nums">{formatTaka(total)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full min-h-[46px] rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>চেকআউট ও পেমেন্টে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="min-h-[46px] rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 cursor-pointer"
                >
                  কার্টে ফিরে যান
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="min-h-[46px] rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white font-semibold text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>অর্ডার নিশ্চিত করুন</span>
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'success' && (
          <div className="p-5 border-t border-stone-200">
            <button
              type="button"
              onClick={handleCloseReset}
              className="w-full min-h-[46px] rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm cursor-pointer"
            >
              কেনাকাটা চালিয়ে যান
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
