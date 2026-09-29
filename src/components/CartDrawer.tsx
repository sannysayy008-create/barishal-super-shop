import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem, OrderRecord } from '../types';
import { formatTaka } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onPlaceOrder: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onPlaceOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryCharge = items.length > 0 ? 60 : 0;
  const totalAmount = subtotal + deliveryCharge;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('অনুগ্রহ করে নাম, ফোন নম্বর এবং ঠিকানা সঠিকভাবে দিন।');
      return;
    }

    setIsSubmitting(true);

    const newOrder: OrderRecord = {
      id: `ORD-${Date.now()}`,
      customerName,
      phone,
      address,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // মূল অর্ডার ফাংশন কল করা
    onPlaceOrder(newOrder);

    // ফর্ম রিসেট ও ড্রয়ার বন্ধ করা
    setTimeout(() => {
      setIsSubmitting(false);
      setCustomerName('');
      setPhone('');
      setAddress('');
      onClose();
      alert('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-stone-800">আপনার কার্ট</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-stone-500 font-medium">কার্ট খালি রয়েছে</p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 p-2 border rounded-xl bg-stone-50"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-amber-600 font-bold text-xs mt-0.5">
                        {formatTaka(item.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-0.5 hover:bg-stone-100 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-0.5 hover:bg-stone-100 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-3 pt-4 border-t">
                <h3 className="font-bold text-stone-800 text-sm">ডেলিভারি তথ্য</h3>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full text-xs p-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="০১৭XXXXXXXX"
                    className="w-full text-xs p-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    পূর্ণাঙ্গ ঠিকানা
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="রোড নম্বর, এলাকা, বরিশাল"
                    className="w-full text-xs p-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                {/* Pricing Summary */}
                <div className="bg-stone-100 p-3 rounded-xl space-y-1.5 text-xs text-stone-600 mt-4">
                  <div className="flex justify-between">
                    <span>পণ্যের দাম:</span>
                    <span>{formatTaka(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>{formatTaka(deliveryCharge)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-800 text-sm pt-1 border-t">
                    <span>সর্বমোট:</span>
                    <span className="text-amber-600">{formatTaka(totalAmount)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 text-sm"
                >
                  {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
                  
