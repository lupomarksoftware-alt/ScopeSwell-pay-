import React, { useState } from 'react';
import {
  Instagram,
  Store,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Eye,
  Users,
  Smartphone,
  ExternalLink,
  Coins,
  DollarSign,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  MessageSquare,
  Play
} from 'lucide-react';
import { UserRole } from '../types';
import { OFFICIAL_CITY_RATES } from '../data/initialData';
import { BACKGROUND_STORIES } from './AnimatedCampaignsBackground';
import { APP_CONFIG } from '../config/constants';

interface HeroSectionProps {
  onOpenPWAModal: () => void;
  onOpenInstagramSwitchModal: () => void;
  onOpenFeedbackModal: () => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPWAModal,
  onOpenInstagramSwitchModal,
  onOpenFeedbackModal,
  activeRole,
  setActiveRole,
}) => {
  const [quickCityIndex, setQuickCityIndex] = useState(0);
  const [quickReach, setQuickReach] = useState(1500);

  const city = OFFICIAL_CITY_RATES[quickCityIndex] || OFFICIAL_CITY_RATES[0];
  const ratePerReach = city.ratePerReach || city.ratePerView || 0.03;
  const creatorEarned = (quickReach * ratePerReach).toFixed(2);
  const totalCost = (quickReach * ratePerReach * 1.15).toFixed(2);

  // Duplicate for seamless infinite horizontal ribbon
  const marqueeStories = [...BACKGROUND_STORIES, ...BACKGROUND_STORIES];

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-tr from-rose-600/20 via-purple-600/20 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-12 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Role Toggle Selector */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Platform Perspective Switcher"
            className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md"
          >
            <button
              id="role-tab-creator"
              role="tab"
              aria-selected={activeRole === 'creator'}
              aria-controls="role-panel-content"
              onClick={() => setActiveRole('creator')}
              className={`flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'creator'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Creator Experience</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-black/30 rounded font-semibold">
                Get Paid
              </span>
            </button>

            <button
              id="role-tab-business"
              role="tab"
              aria-selected={activeRole === 'business'}
              aria-controls="role-panel-content"
              onClick={() => setActiveRole('business')}
              className={`flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'business'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Business / Brand Experience</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-black/30 rounded font-semibold">
                Escrow Protected
              </span>
            </button>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div
          id="role-panel-content"
          role="tabpanel"
          aria-labelledby={activeRole === 'creator' ? 'role-tab-creator' : 'role-tab-business'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Copy Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 mb-5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white">Official App Platform:</span>
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-mono font-bold underline"
              >
                {APP_CONFIG.displayDomain}
              </a>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="hidden sm:inline text-emerald-300 font-mono font-bold">1 Credit = €1.00 EUR</span>
            </div>

            {activeRole === 'creator' ? (
              <>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-['Space_Grotesk']">
                  Turn your Instagram Story reach into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">
                    guaranteed cash payouts.
                  </span>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Welcome to ScopeSwell. Sign in on <strong className="text-white">scopeswell.com</strong> with Google, post 24-hour Stories for local spots & brands, upload a screenshot of your Story Insights, and get paid per verified unique account reached directly into your wallet.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-['Space_Grotesk']">
                  Pay strictly for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300">
                    verified 24h Accounts Reached
                  </span>{' '}
                  from trusted local creators.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Stop burning marketing budget on unverified flat influencer fees. ScopeSwell automatically locks campaign budget in escrow, mobilizes verified creators on <strong className="text-white">scopeswell.com</strong>, and refunds unused escrow credits straight back to your wallet based on verified reach.
                </p>
              </>
            )}

            {/* Quick 3 Value Pillars */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Automated Escrow</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Funds locked securely before work begins</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Real Accounts Reached</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Proof verified via 24h Instagram Insights</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>Surplus Auto-Refund</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Unused escrow returned immediately</p>
              </div>
            </div>

            {/* Actions CTA strip */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-rose-500/30 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Smartphone className="w-5 h-5" />
                <span>Launch App (scopeswell.com)</span>
                <ExternalLink className="w-4 h-4 ml-0.5" />
              </a>

              <button
                onClick={onOpenPWAModal}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>PWA Installation Guide</span>
              </button>
            </div>

            {/* Prerequisite trigger note */}
            {activeRole === 'creator' && (
              <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <span>⚠️ Personal Instagram?</span>
                <button
                  onClick={onOpenInstagramSwitchModal}
                  className="text-rose-300 hover:text-rose-200 underline font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Switch to Creator Account in 30 Seconds</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive Live Rates Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900/95 border-2 border-rose-500/30 p-6 sm:p-7 shadow-2xl shadow-rose-950/40 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold">
                    €
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Live Pay-Per-Reach Simulator</h2>
                    <p className="text-[11px] text-slate-400">1 Credit = €1.00 EUR (Fixed City Rates)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {/* City selector tabs */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 mb-1.5 block">
                    Choose Target City / Market:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    {OFFICIAL_CITY_RATES.slice(0, 3).map((c, idx) => (
                      <button
                        key={c.id}
                        onClick={() => setQuickCityIndex(idx)}
                        className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer truncate ${
                          quickCityIndex === idx
                            ? 'bg-rose-500 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {c.cityName.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Verified Accounts Reached:</span>
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">{quickReach.toLocaleString()} accounts</span>
                  </div>
                  <input
                    type="range"
                    min={300}
                    max={3000}
                    step={100}
                    value={quickReach}
                    aria-label="Quick verified story reach slider"
                    onChange={(e) => setQuickReach(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                {/* Calculated Results */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <p className="text-[11px] text-slate-400">Creator Earnings</p>
                    <p className="text-2xl font-black text-emerald-400 font-mono mt-0.5">€{creatorEarned}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">€{ratePerReach.toFixed(2)}/reach rate</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <p className="text-[11px] text-slate-400">Business Total</p>
                    <p className="text-2xl font-black text-amber-300 font-mono mt-0.5">€{totalCost}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Incl. 15% platform fee</p>
                  </div>
                </div>

                {/* Escrow Guarantee Notice */}
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-200 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Protected by ScopeSwell Escrow:</span>
                  </p>
                  <p className="text-slate-300">
                    Funds released strictly after 24h Insights verification. Unused credits refunded straight back to business wallet.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href="#rates"
                    className="text-xs font-bold text-rose-400 hover:text-rose-300"
                  >
                    View All City Rates →
                  </a>
                  <a
                    href={APP_CONFIG.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1"
                  >
                    <span>Open App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE ANIMATED STORY REELS MARQUEE STRIP (DIRECT FOREGROUND VISUAL) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Live Verified Story Campaigns Running Across Northern Europe & Baltics
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline-block font-mono">
              24h Accounts Reached
            </span>
          </div>

          {/* Smooth Horizontal Scrolling Stream */}
          <div className="relative overflow-hidden w-full py-2">
            <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
              {marqueeStories.map((story, idx) => {
                const rate = story.ratePerView || 0.03;
                const reach = story.views || 1000;
                const payout = (reach * rate).toFixed(2);
                return (
                  <div
                    key={`hero-card-${story.id}-${idx}`}
                    className="relative w-48 sm:w-56 h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-xl group shrink-0"
                  >
                    <img
                      src={story.image}
                      alt={story.businessName}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90 pointer-events-none" />

                    {/* Top Header */}
                    <div className="relative z-10 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={story.creatorAvatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-rose-500"
                        />
                        <span className="text-[10px] font-bold text-white truncate max-w-[90px]">
                          @{story.creatorHandle}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 text-emerald-300 border border-white/10">
                        €{rate}/reach
                      </span>
                    </div>

                    {/* Story Stickers */}
                    <div className="relative z-10 px-3 space-y-1.5 mt-8">
                      <div className="inline-block px-2 py-0.5 rounded-lg bg-black/80 text-[10px] font-bold text-white border border-white/20">
                        🏷️ {story.tagMention}
                      </div>
                      <div className="block px-2 py-0.5 rounded-full bg-white text-slate-950 text-[9px] font-bold truncate max-w-[150px]">
                        🔗 {story.linkText}
                      </div>
                    </div>

                    {/* Bottom HUD */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 p-2 rounded-xl bg-slate-950/95 border border-emerald-500/40">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-emerald-400 font-mono">{reach.toLocaleString()} reach</span>
                        <span className="text-emerald-300 font-mono">€{payout} EUR</span>
                      </div>
                      <p className="text-[9px] text-slate-400 truncate mt-0.5">{story.businessName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
