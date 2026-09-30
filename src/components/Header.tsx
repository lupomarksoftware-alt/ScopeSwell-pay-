import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, Instagram, Store, ShieldCheck, Mail, Smartphone, Globe, Coins, MessageSquare, Bug, Bot, Radio } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface HeaderProps {
  onOpenPWAModal: () => void;
  onOpenInstagramSwitchModal: () => void;
  onOpenFeedbackModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPWAModal,
  onOpenInstagramSwitchModal,
  onOpenFeedbackModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-rose-950/60 via-purple-950/50 to-indigo-950/60 border-b border-rose-500/20 px-4 py-1.5 text-xs text-center text-rose-200/90 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Live Platform Documentation & App Gateway:</span>
        <a
          href={APP_CONFIG.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 hover:text-amber-200 underline font-bold"
        >
          {APP_CONFIG.appDisplayDomain}
        </a>
        <span className="text-slate-400 hidden sm:inline">•</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-300 font-mono font-semibold">
          <Coins className="w-3 h-3" />
          1 Credit = €1.00 EUR
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-white text-lg tracking-tight font-['Space_Grotesk']">S</span>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-[8px] font-bold text-slate-950 px-1 py-0.2 rounded-full border border-slate-900">
                APP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                  ScopeSwell
                </span>
                <span className="px-1.5 py-0.2 rounded bg-rose-500/20 border border-rose-500/40 text-[10px] font-bold text-rose-300">
                  PLATFORM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Pay-Per-Reach Instagram Sponsorships</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-4 2xl:gap-5 text-sm font-medium text-slate-300 shrink-0">
            <a href="#rates" className="hover:text-white transition-colors whitespace-nowrap">
              Rates
            </a>
            <a href="#creator-guide" className="hover:text-white transition-colors whitespace-nowrap">
              Creator Guide
            </a>
            <a href="#business-guide" className="hover:text-white transition-colors whitespace-nowrap">
              Business Guide
            </a>
            <a href="#security" className="hover:text-white transition-colors whitespace-nowrap">
              Security
            </a>
            <a href="#ai-instructor" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 whitespace-nowrap">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="font-bold">ScopeSwell Assistant</span>
            </a>
            <a href="#pwa-showcase" className="hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Roles</span>
            </a>
            <a href="#faqs" className="hover:text-white transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-3">
            {/* Feedback & Bug Reporting Button */}
            <button
              onClick={onOpenFeedbackModal}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Report a bug, error, or submit platform feedback"
            >
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              <span>Feedback</span>
            </button>

            {/* Launch App on .com */}
            <a
              href={APP_CONFIG.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 transition-all flex items-center gap-1.5 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Launch App (scopeswell.com)</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={APP_CONFIG.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden px-3 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 flex items-center gap-1"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Open App</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="xl:hidden border-b border-slate-800 bg-[#0f1422] px-4 pt-3 pb-6 space-y-3"
        >
          <div className="grid grid-cols-2 gap-2 pb-2">
            <a
              href={APP_CONFIG.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center gap-1.5 shadow-md"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Launch App</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFeedbackModal();
              }}
              className="w-full py-3 px-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              <span>Feedback & Bugs</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2 pt-2 border-t border-slate-800 text-sm">
            <a
              href="#ai-instructor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-bold flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Live ScopeSwell Assistant (Voice & Chat)</span>
              </span>
              <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded font-mono">Talk</span>
            </a>
            <a
              href="#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-800/80 text-slate-200 flex items-center justify-between"
            >
              <span>Currency & Payment Rates</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">1 Cr = €1</span>
            </a>
            <a
              href="#creator-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Creator Guide (5 Steps)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstagramSwitchModal();
              }}
              className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-800/80 text-rose-300 text-xs font-semibold flex items-center gap-2"
            >
              <span>📸 Switch to Instagram Creator (30s)</span>
            </button>
            <a
              href="#business-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Business Guide & Escrow
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Security & Proof Audit
            </a>
            <a
              href="#pwa-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              Core Architecture & Roles
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-800/80 text-slate-200"
            >
              FAQ & Support
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
