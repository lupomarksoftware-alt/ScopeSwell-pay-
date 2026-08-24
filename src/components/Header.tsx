import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, Instagram, Store, ShieldCheck, Mail } from 'lucide-react';
import { MAIN_EMAIL } from '../utils/notifications';

interface HeaderProps {
  onOpenCreatorModal: () => void;
  onOpenBusinessModal: () => void;
  creatorCount: number;
  businessCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreatorModal,
  onOpenBusinessModal,
  creatorCount,
  businessCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-rose-950/60 via-purple-950/50 to-indigo-950/60 border-b border-rose-500/20 px-4 py-1.5 text-xs text-center text-rose-200/90 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-white">Pilot Launch Beta:</span>
        <span>
          <strong className="text-rose-300">{creatorCount}</strong> creators &{' '}
          <strong className="text-purple-300">{businessCount}</strong> brands & local spots registered.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-white text-lg tracking-tight font-['Space_Grotesk']">S</span>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-[9px] font-bold text-slate-950 px-1 py-0.2 rounded-full border border-slate-900">
                PAY
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                  ScopeSwell <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Pay</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Instagram Story Marketplace for All Ad Types</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#calculator" className="hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Earnings Calculator
            </a>
            <a href="#campaigns" className="hover:text-white transition-colors">
              Sample Stories
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Why It Works
            </a>
            <a href="#faqs" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href={`mailto:${MAIN_EMAIL}`}
              className="text-slate-400 hover:text-rose-300 transition-colors flex items-center gap-1"
              title={`Direct intake desk: ${MAIN_EMAIL}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBusinessModal}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/80 border border-purple-700/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Store className="w-3.5 h-3.5 text-purple-400" />
              <span>For Businesses</span>
            </button>

            <button
              onClick={onOpenCreatorModal}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 transition-all flex items-center gap-1.5 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Get Paid to Post</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCreatorModal}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0f1422] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreatorModal();
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center gap-1.5 shadow-md"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>I'm a Creator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBusinessModal();
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-purple-200 bg-purple-900/60 border border-purple-700/60 flex items-center justify-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5" />
              <span>I'm a Business</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-800 text-sm">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              How It Works
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200 flex items-center justify-between"
            >
              <span>Earnings Calculator</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Interactive</span>
            </a>
            <a
              href="#campaigns"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Sample Stories
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Why It Works
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Frequently Asked Questions
            </a>
            <a
              href={`mailto:${MAIN_EMAIL}`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 text-rose-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Contact Desk ({MAIN_EMAIL})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
