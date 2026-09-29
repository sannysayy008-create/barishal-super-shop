import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  X,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Zap,
  ExternalLink,
  QrCode,
} from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

const SHARED_APP_URL =
  'https://ais-pre-ogc6tpzqmrmril2q7yoazg-288647113499.asia-southeast1.run.app';

/**
 * Synchronous download trigger (no setTimeout) so the browser never drops the user gesture.
 */
export function triggerImmediateDownload(): boolean {
  try {
    const a = document.createElement('a');
    a.href = '/Barishal-Super-Shop.html';
    a.setAttribute('download', 'Barishal-Super-Shop-App.html');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch {
    return false;
  }
}

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [downloadedSuccess, setDownloadedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleOneClickDownload = async () => {
    // 1. If native browser PWA install prompt is ready, trigger it immediately
    if (isInstallable) {
      const accepted = await install();
      if (accepted) return;
    }
    // 2. Trigger synchronous file download right on the click gesture
    triggerImmediateDownload();
    setDownloadedSuccess(true);
    setShowShortcutModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(SHARED_APP_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'বরিশাল সুপার শপ (Barishal Super Shop)',
          text: 'বরিশালের সেরা অনলাইন শপিং ও ক্লাসিফাইড অ্যাপ:',
          url: SHARED_APP_URL,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOneClickDownload}
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
      >
        <Download className="w-3.5 h-3.5" />
        <span>অ্যাপ ডাউনলোড</span>
      </button>

      {showShortcutModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcut-download-title"
        >
          <div className="bg-white w-full max-w-md rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xl my-auto">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#D94E28] text-white flex items-center justify-center font-bold text-xl shrink-0">
                  ব
                </div>
                <div>
                  <h3 id="shortcut-download-title" className="text-base font-bold text-stone-900">
                    বরিশাল সুপার শপ — সরাসরি ইনস্টল ও ডাউনলোড
                  </h3>
                  <p className="text-xs text-stone-500">
                    প্রিভিউ বক্সের বাইরে সরাসরি ফোনে নামানোর উপায়
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcutModal(false)}
                aria-label="বন্ধ করুন"
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Primary explanation why preview iframe blocks direct APK/PWA install & 1-click solution */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/90 space-y-3">
              <div className="text-xs font-bold text-amber-950 leading-relaxed">
                ⚠️ জরুরি নির্দেশনা: আপনি এখন স্টুডিও প্রিভিউ বক্সের ভেতরে আছেন, তাই ব্রাউজার সরাসরি ইনস্টল ব্লক করে রাখে।
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                অ্যাপটি ফোনে ইনস্টল করতে নিচের <strong>লাল বাটনে চাপ দিয়ে সরাসরি ব্রাউজারে অ্যাপটি ওপেন করুন</strong>—সেখানে সাথে সাথে <strong>Install App</strong> অপশন চলে আসবে!
              </p>

              <a
                href={SHARED_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#D94E28] hover:bg-[#c0411f] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>১. সরাসরি ব্রাউজারে অ্যাপ খুলুন ও ইনস্টল করুন</span>
              </a>
            </div>

            {/* Direct Anchor Download Button (Native HTML <a> with download attribute) */}
            <div className="p-3.5 rounded-xl bg-teal-50/90 border border-teal-200 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-950">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                <span>২. শর্টকাট অ্যাপ ফাইল ডাউনলোড (HTML Launcher):</span>
              </div>

              <a
                href="/Barishal-Super-Shop.html"
                download="Barishal-Super-Shop-App.html"
                onClick={() => setDownloadedSuccess(true)}
                className="w-full min-h-[42px] px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>
                  {downloadedSuccess
                    ? 'আবার অ্যাপ ফাইল ডাউনলোড করুন (৩ KB)'
                    : 'সরাসরি অ্যাপ ফাইল ডাউনলোড করুন'}
                </span>
              </a>
            </div>

            {/* Direct Link Box for Customer Copy/Share */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#D94E28]" />
                <span>কাস্টমারদের জন্য সরাসরি অ্যাপ লিংক:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={SHARED_APP_URL}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="flex-1 h-9 px-2.5 rounded-lg border border-stone-300 bg-white text-[11px] text-stone-700 font-mono select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="h-9 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি করুন</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                এই লিংকটি কপি করে ফোনের <strong>Chrome</strong> ব্রাউজারে পেস্ট করলেই যেকোনো কাস্টমার অ্যাপটি ব্যবহার ও ফোনে <strong>Add to Home screen / Install app</strong> করতে পারবেন।
              </p>
            </div>

            {/* Share & Close Footer */}
            <div className="flex items-center justify-between gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleShareApp}
                className="flex-1 min-h-[40px] px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>লিংক শেয়ার করুন</span>
              </button>

              <button
                type="button"
                onClick={() => setShowShortcutModal(false)}
                className="min-h-[40px] px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const QuickAppDownloadBanner: React.FC = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (isInstalled || dismissed) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(SHARED_APP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-stone-900 text-white px-4 py-2.5 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-[#D94E28] text-white font-bold text-sm flex items-center justify-center shrink-0">
            ব
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white truncate">
            ফোনে অ্যাপটি নামাতে &ldquo;সরাসরি ব্রাউজারে খুলুন&rdquo; বাটনে চাপুন:
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isInstallable ? (
            <button
              type="button"
              onClick={install}
              className="min-h-[34px] px-3.5 py-1.5 rounded-lg bg-[#D94E28] hover:bg-[#c0411f] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>১-ক্লিকে ইনস্টল করুন</span>
            </button>
          ) : (
            <a
              href={SHARED_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[34px] px-3.5 py-1.5 rounded-lg bg-[#D94E28] hover:bg-[#c0411f] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>সরাসরি ব্রাউজারে খুলুন ও নামান</span>
            </a>
          )}

          <a
            href="/Barishal-Super-Shop.html"
            download="Barishal-Super-Shop-App.html"
            className="hidden sm:inline-flex min-h-[34px] px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>শর্টকাট ফাইল</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[34px] px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'লিংক কপি হয়েছে' : 'লিংক কপি'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="ব্যানার বন্ধ করুন"
            className="w-7 h-7 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg">
      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
      <span>অফলাইন মোড — সংরক্ষিত ডাটা দেখানো হচ্ছে</span>
    </div>
  );
};
