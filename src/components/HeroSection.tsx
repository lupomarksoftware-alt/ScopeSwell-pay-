import React, { useState } from 'react';
import { Instagram, Store, ArrowRight, CheckCircle2, Sparkles, MapPin, DollarSign, Eye, Users, ShieldCheck, Zap, ShoppingBag, Smartphone, Ticket, Sparkle, Tag, Gift } from 'lucide-react';
import { UserRole } from '../types';

interface HeroSectionProps {
  onOpenCreatorModal: () => void;
  onOpenBusinessModal: () => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCreatorModal,
  onOpenBusinessModal,
  activeRole,
  setActiveRole,
}) => {
  const [demoViews, setDemoViews] = useState<number>(550);
  const [selectedAdType, setSelectedAdType] = useState<'dtc' | 'app' | 'fashion' | 'local'>('dtc');

  const adTypeSamples = {
    dtc: {
      brand: 'HydraPulse Electrolytes',
      type: 'DTC E-Commerce',
      rate: 4.8,
      tagline: 'Share link sticker for 25% off clean hydration',
      badge: 'Link Sticker',
      icon: ShoppingBag,
      color: 'from-cyan-500 to-blue-500',
      sampleStoryText: 'Tap to get 25% off my favorite clean hydration! 💧',
      link: 'hydrapulse.co/25off',
      perk: '$30 + Free Sample Pack'
    },
    app: {
      brand: 'FocusFlow AI Calendar',
      type: 'Mobile App / Tech',
      rate: 5.5,
      tagline: 'Share App Store link for 30-day Pro access',
      badge: 'App Store Link',
      icon: Smartphone,
      color: 'from-purple-500 to-indigo-500',
      sampleStoryText: 'Download FocusFlow (Free 30-Day Pro Link) 📱',
      link: 'apps.apple.com/focusflow',
      perk: '$35 + Lifetime Pro Pass'
    },
    fashion: {
      brand: 'Aura Dept Streetwear',
      type: 'Apparel Drop',
      rate: 4.5,
      tagline: 'Share limited hoodie drop with promo code',
      badge: 'Promo Code',
      icon: Tag,
      color: 'from-amber-500 to-rose-500',
      sampleStoryText: 'New archive drop is live! Use code AURAFRIEND ✨',
      link: 'auradept.com / AURAFRIEND',
      perk: '$28 + Free Hoodie'
    },
    local: {
      brand: 'Velvet Moon Roasters',
      type: 'Local Spot / Cafe',
      rate: 4.2,
      tagline: 'Share South Congress 2-for-1 breakfast matcha',
      badge: 'Location Tag',
      icon: Store,
      color: 'from-emerald-500 to-teal-500',
      sampleStoryText: '2-for-1 treat at @velvetmoon_atx! Mention my story 💕',
      link: '@velvetmoon_atx (Austin, TX)',
      perk: '$25 + Free Specialty Latte'
    }
  };

  const currentSample = adTypeSamples[selectedAdType];

  // Calculated payouts based on the active format rate
  const estimatedPerStory = ((demoViews / 100) * currentSample.rate).toFixed(2);
  const estimatedMonthly = ((demoViews / 100) * currentSample.rate * 3).toFixed(2);

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-rose-600/15 via-purple-600/15 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Role Toggle Selector */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Audience Type Selector"
            className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md"
          >
            <button
              id="role-tab-creator"
              role="tab"
              aria-selected={activeRole === 'creator'}
              aria-controls="role-panel-content"
              onClick={() => setActiveRole('creator')}
              className={`flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'creator'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              <span>I'm an Instagram User</span>
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
              className={`flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'business'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>I'm a Brand, App or Business</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-black/30 rounded font-semibold">
                Advertise
              </span>
            </button>
          </div>
        </div>

        <div
          id="role-panel-content"
          role="tabpanel"
          aria-labelledby={activeRole === 'creator' ? 'role-tab-creator' : 'role-tab-business'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Main Copy Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Live Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 mb-5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white">
                {activeRole === 'creator' ? 'Get paid cash per 100 verified story views' : 'Pay strictly for verified views — all ad formats'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-rose-300 font-medium">DTC, Apps, Drops & Local</span>
            </div>

            {activeRole === 'creator' ? (
              <>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-['Space_Grotesk']">
                  Get paid cash to share{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">
                    brands, apps & spots
                  </span>{' '}
                  on your Instagram Story.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  No follower minimums or agency contracts needed. If your real friends and classmates watch your stories,
                  e-commerce brands, mobile apps, streetwear drops, and neighborhood favorites want to pay you per verified view.
                </p>
              </>
            ) : (
              <>
                {/* Special Pioneer 100 Offer Badge */}
                <div className="mb-4 inline-flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-xs shadow-lg backdrop-blur-sm">
                  <span className="px-2.5 py-0.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-[11px] flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    <span>FIRST 100 BRANDS</span>
                  </span>
                  <span className="text-purple-200 font-semibold">
                    Free Story Template & Ad Kit + 500 Bonus Views
                  </span>
                  <span className="text-emerald-400 font-mono font-bold text-[11px] hidden sm:inline">
                    (28 Spots Left)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-['Space_Grotesk']">
                  Authentic story advertising for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300">
                    brands, apps & local spots.
                  </span>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Stop burning budgets on cold ads or expensive mega-influencers. Mobilize hundreds of everyday Instagram users to post link stickers, app downloads, promo codes, and location tags to their trusted circles.
                </p>
              </>
            )}

            {/* Supported Ad Types Quick Pills */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                <span>DTC & E-Commerce</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Mobile Apps & Tech</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Fashion & Drops</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-400" />
                <span>Local Spots & Cafes</span>
              </span>
            </div>

            {/* Quick Benefits Matrix */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              {activeRole === 'creator' ? (
                <>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">No follower minimums</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Venmo / PayPal / Bank</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Zero passwords requested</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Pay only per verified view</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Users className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Real peer-to-peer trust</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Track link & code sales</span>
                  </div>
                </>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {activeRole === 'creator' ? (
                <>
                  <button
                    onClick={onOpenCreatorModal}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Join the Creator Waitlist</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <a
                    href="#calculator"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Calculate Story Earnings</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    onClick={onOpenBusinessModal}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Gift className="w-5 h-5 text-amber-300" />
                    <span>Claim Pioneer Spot & Free Template Kit</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <a
                    href="#campaigns"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Browse Sample Stories</span>
                  </a>
                </>
              )}
            </div>

            {/* Social proof line */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Creator avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Creator avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Creator avatar"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Creator avatar"
                />
              </div>
              <p>
                <strong className="text-white font-semibold">1,420+ everyday users</strong> &{' '}
                <strong className="text-white font-semibold">94 brands, apps & spots</strong> registered
              </p>
            </div>
          </div>

          {/* Interactive Hero Widget Column */}
          <div className="lg:col-span-5">
            {activeRole === 'creator' ? (
              /* Creator Interactive Preview Card */
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-rose-500/30 p-6 sm:p-7 shadow-2xl shadow-rose-950/40 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">Live Story Payout Simulator</h2>
                      <p className="text-[11px] text-slate-400">Paid per 100 verified story views</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Demo
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {/* Ad Format Selector Tabs */}
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 mb-2">Select an Ad Format to Test:</p>
                    <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                      {(['dtc', 'app', 'fashion', 'local'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedAdType(type)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                            selectedAdType === type
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {type === 'dtc' ? 'DTC Brand' : type === 'app' ? 'App Link' : type === 'fashion' ? 'Promo Code' : 'Local Spot'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hero-demo-views-slider" className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Your average Story Views:</span>
                      <span className="text-rose-400 font-bold font-mono">{demoViews} views</span>
                    </label>
                    <input
                      id="hero-demo-views-slider"
                      type="range"
                      min={100}
                      max={2000}
                      step={50}
                      value={demoViews}
                      aria-label="Average Story Views Simulator"
                      onChange={(e) => setDemoViews(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>100 views</span>
                      <span>1,000 views</span>
                      <span>2,000 views</span>
                    </div>
                  </div>

                  {/* Calculated Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                      <p className="text-[11px] text-slate-400">1 Story Payout</p>
                      <p className="text-2xl font-black text-white font-['Space_Grotesk'] text-emerald-400">
                        ${estimatedPerStory}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Paid upon 24h verification</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-950/40 to-slate-800/60 border border-rose-500/30">
                      <p className="text-[11px] text-rose-300">3 Stories / Month</p>
                      <p className="text-2xl font-black text-white font-['Space_Grotesk'] text-amber-300">
                        ${estimatedMonthly}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">+ Brand perks & products</p>
                    </div>
                  </div>

                  {/* Live Sample Invite Notification */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{currentSample.brand}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-rose-300 border border-slate-700">
                          {currentSample.badge}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 font-mono">
                        ${estimatedPerStory} est.
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{currentSample.tagline}</p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-700/70">
                      <span>Perk: {currentSample.perk}</span>
                      <span className="text-amber-300 font-medium">Instant Invite Ready</span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenCreatorModal}
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Claim Your Creator Spot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Business Interactive Preview Card */
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-purple-500/30 p-6 sm:p-7 shadow-2xl shadow-purple-950/40 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">Multi-Format Campaign Simulator</h2>
                      <p className="text-[11px] text-slate-400">DTC brands, mobile apps & local businesses</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Sponsor Pilot
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold">Example Pilot Campaign</span>
                      <span className="text-purple-300 font-mono font-bold">$500 Pilot Budget</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <p className="text-[10px] text-slate-400">Creators Mobilized</p>
                        <p className="text-lg font-extrabold text-white">15 - 25 Accounts</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <p className="text-[10px] text-slate-400">Verified Views</p>
                        <p className="text-lg font-extrabold text-emerald-400">8,500+ Real Views</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Link stickers, App Store links, promo codes or location tags</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Zero bot inflation: real friends viewing authentic stories</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Pay only for verified 24h views — unused budget refunded</span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenBusinessModal}
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Brand / App Pilot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
