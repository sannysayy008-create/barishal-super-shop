import React, { useState } from 'react';
import { Send, Phone, MapPin, MessageSquare } from 'lucide-react';
import { ChatThread } from '../types';
import { formatTaka } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface ChatViewProps {
  threads: ChatThread[];
  activeThreadId: string;
  onSelectThread: (id: string) => void;
  onSendMessage: (threadId: string, text: string) => void;
}

const QUICK_REPLIES = [
  'পণ্যটি কি এখনো পাওয়া যাবে?',
  'সর্বশেষ দাম কত রাখবেন ভাই?',
  'বরিশাল সদর রোডে এসে কি দেখা যাবে?',
  'পণ্যটির কন্ডিশন কেমন আছে?',
];

export const ChatView: React.FC<ChatViewProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
      {/* Left Column: Conversation List */}
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col">
        <div className="p-4 border-b border-stone-200/80">
          <h2 className="text-base font-bold text-stone-900">ক্রেতা ও বিক্রেতা চ্যাট</h2>
          <p className="text-xs text-stone-500">সরাসরি দামাদামি ও ডেলিভারি বিষয়ে কথা বলুন</p>
        </div>

        <div className="divide-y divide-stone-100 overflow-y-auto flex-1">
          {threads.map((thread) => {
            const lastMsg = thread.messages[thread.messages.length - 1];
            const isSelected = activeThread?.id === thread.id;

            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => onSelectThread(thread.id)}
                className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#D94E28]/8' : 'hover:bg-stone-50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <SafeImage
                    src={thread.productImage}
                    alt={thread.productTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {thread.sellerName}
                    </span>
                    <span className="text-[10px] text-stone-400 shrink-0">
                      {lastMsg?.timestamp}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#D94E28] truncate mt-0.5">
                    {thread.productTitle}
                  </div>
                  <p className="text-xs text-stone-500 truncate mt-0.5">
                    {lastMsg?.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      {activeThread ? (
        <div className="md:col-span-8 flex flex-col justify-between bg-[#F9F9F8]">
          {/* Chat Header with Product & Seller Context */}
          <div className="p-4 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                <SafeImage
                  src={activeThread.productImage}
                  alt={activeThread.productTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-stone-900 truncate">
                  {activeThread.sellerName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {activeThread.sellerArea}, বরিশাল
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#D94E28] tabular-nums">
                    {formatTaka(activeThread.productPrice)}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${activeThread.sellerPhone}`}
              className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold inline-flex items-center gap-1.5 shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span className="tabular-nums">{activeThread.sellerPhone}</span>
            </a>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[360px]">
            {activeThread.messages.map((msg) => {
              const isBuyer = msg.sender === 'buyer';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isBuyer
                        ? 'bg-[#D94E28] text-white rounded-br-xs'
                        : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {isBuyer ? 'আপনি' : activeThread.sellerName} · {msg.timestamp}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Replies & Input Box */}
          <div className="p-3.5 bg-white border-t border-stone-200 space-y-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {QUICK_REPLIES.map((qr, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSendMessage(activeThread.id, qr)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  {qr}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="বিক্রেতাকে আপনার বার্তা লিখুন..."
                className="flex-1 h-11 px-4 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#D94E28]"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>পাঠান</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="md:col-span-8 flex flex-col items-center justify-center p-8 text-center text-stone-500">
          <MessageSquare className="w-8 h-8 mb-2 text-stone-400" />
          <p className="text-sm">কথোপকথন দেখতে বাম পাশ থেকে একটি চ্যাট নির্বাচন করুন</p>
        </div>
      )}
    </div>
  );
};
