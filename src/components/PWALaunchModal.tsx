import React, { useState, useEffect } from 'react';
import { X, Smartphone, Globe, Download, Sparkles, ExternalLink, ShieldCheck, Check, ArrowRight, Copy } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface PWALaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export const PWALaunchModal: React.FC<PWALaunchModalProps> = ({
  isOpen,
  onClose,
  defaultDomain = APP_CONFIG.appUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [platformTab, setPlatformTab] = useState<'ios' | 'android' | 'web'>('web');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultDomain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-rose-500/15 via-purple-500/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official PWA Web Application</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] mt-0.5">
              Launch ScopeSwell Platform
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          ScopeSwell is engineered as a modern Progressive Web App (PWA). It works seamlessly on any iPhone, Android, or desktop browser at <strong className="text-white">scopeswell.com</strong> with zero app store downloads required.
        </p>

        {/* Domain Access Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold flex items-center gap-1.5 text-slate-300">
              <Globe className="w-4 h-4 text-cyan-400" />
              Production App Domain:
            </span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-mono">PWA Enabled</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-mono text-white select-all truncate">
              {defaultDomain}
            </div>
            <button
              onClick={handleCopy}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700 shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <a
              href={defaultDomain}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md shadow-rose-500/25 shrink-0"
            >
              <span>Launch</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Installation Instructions Tabs */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            How to Install on Your Device in 10 Seconds
          </h3>

          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-4 text-xs font-semibold">
            <button
              onClick={() => setPlatformTab('web')}
              className={`py-2 px-2 rounded-lg transition-all cursor-pointer ${
                platformTab === 'web' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Desktop Web
            </button>
            <button
              onClick={() => setPlatformTab('ios')}
              className={`py-2 px-2 rounded-lg transition-all cursor-pointer ${
                platformTab === 'ios' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              iOS (iPhone / iPad)
            </button>
            <button
              onClick={() => setPlatformTab('android')}
              className={`py-2 px-2 rounded-lg transition-all cursor-pointer ${
                platformTab === 'android' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Android (Chrome)
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-3">
            {platformTab === 'web' && (
              <div className="space-y-2 text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>
                  <p>Click <strong className="text-white">"Launch"</strong> to open <strong className="text-white">scopeswell.com</strong> directly in your browser.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>
                  <p>In Chrome or Edge, click the <strong>Install App</strong> icon in the address bar for a standalone native desktop window.</p>
                </div>
              </div>
            )}

            {platformTab === 'ios' && (
              <div className="space-y-2 text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>
                  <p>Open <strong className="text-white">{defaultDomain}</strong> in Safari on your iPhone.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>
                  <p>Tap the <strong>Share</strong> button (box with upward arrow) at the bottom toolbar.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">3</span>
                  <p>Scroll down and tap <strong>"Add to Home Screen"</strong>. The ScopeSwell icon will now appear like a native app!</p>
                </div>
              </div>
            )}

            {platformTab === 'android' && (
              <div className="space-y-2 text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>
                  <p>Open <strong className="text-white">{defaultDomain}</strong> in Google Chrome on your Android device.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>
                  <p>Tap the banner <strong>"Add ScopeSwell to Home screen"</strong> or the 3-dots menu → <strong>Install app</strong>.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected & End-to-End Encrypted</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
