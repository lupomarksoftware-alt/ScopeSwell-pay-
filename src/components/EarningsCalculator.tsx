import React, { useState } from 'react';
import {
  Sparkles,
  DollarSign,
  Users,
  Eye,
  TrendingUp,
  ArrowRight,
  Instagram,
  Store,
  Check,
  Coffee,
  Utensils,
  ShoppingBag,
  Smartphone,
  Tag,
  MousePointerClick,
  Download,
  Info,
  Scale,
  ShieldCheck,
  Zap,
  Flame,
  Award
} from 'lucide-react';
import { UserRole } from '../types';

interface EarningsCalculatorProps {
  onOpenCreatorModal: () => void;
  onOpenBusinessModal: () => void;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({
  onOpenCreatorModal,
  onOpenBusinessModal,
}) => {
  const [calculatorMode, setCalculatorMode] = useState<UserRole>('creator');

  // Creator state
  const [storyViews, setStoryViews] = useState<number>(550);
  const [storiesPerMonth, setStoriesPerMonth] = useState<number>(3);
  const [creatorFormat, setCreatorFormat] = useState<'dtc' | 'app' | 'drop' | 'local'>('dtc');

  // Calibrated fair rate based on format:
  // DTC Link: $4.80/100, App Link: $5.50/100, Drop Promo: $4.50/100, Local Venue: $4.20/100
  const formatRates = {
    dtc: { name: 'DTC Link Sticker', rate: 4.8, perk: 'Free $35+ Product Sample Packs' },
    app: { name: 'App Store / Play Link', rate: 5.5, perk: 'Free Lifetime Pro Subscriptions' },
    drop: { name: 'Promo Code & Apparel', rate: 4.5, perk: 'Free Limited Capsule Merch' },
    local: { name: 'Local Spot & Cafe Tag', rate: 4.2, perk: 'Free Specialty Meals & Drinks' },
  };

  const currentRate = formatRates[creatorFormat].rate;
  const currentPerk = formatRates[creatorFormat].perk;

  const perStoryEarnings = (storyViews / 100) * currentRate;
  const monthlyEarnings = perStoryEarnings * storiesPerMonth;
  const yearlyEarnings = monthlyEarnings * 12;

  // Advertiser state
  const [businessBudget, setBusinessBudget] = useState<number>(500);
  const [advertiserType, setAdvertiserType] = useState<'dtc' | 'app' | 'drop' | 'local'>('dtc');

  const adTypeRates = {
    dtc: { rate: 4.8, ctr: 0.048, label: 'E-Commerce Link Sticker', cpm: '$48 CPM (Peer Trust)' },
    app: { rate: 5.5, ctr: 0.035, label: 'Mobile App Installs', cpm: '$55 CPM (Peer Trust)' },
    drop: { rate: 4.5, ctr: 0.032, label: 'Exclusive Promo Drops', cpm: '$45 CPM (Peer Trust)' },
    local: { rate: 4.2, ctr: 0.042, label: 'Neighborhood Venue Tag', cpm: '$42 CPM (Local Trust)' },
  };

  const selectedRateObj = adTypeRates[advertiserType];
  const estTotalImpressions = Math.round((businessBudget / selectedRateObj.rate) * 100);
  const avgCreatorViews = 550;
  const estCreatorsCount = Math.max(3, Math.round(estTotalImpressions / avgCreatorViews));

  // Dynamic impact metrics
  const getImpactMetrics = () => {
    switch (advertiserType) {
      case 'dtc':
        return {
          title: 'Est. Direct Link Taps',
          count: Math.round(estTotalImpressions * selectedRateObj.ctr),
          subtext: 'High-intent product link taps via Instagram Story Link Stickers (4.8% avg CTR vs 0.6% on Meta Ads)',
          metaEquivClicks: Math.round(((businessBudget / 32) * 1000) * 0.006)
        };
      case 'app':
        return {
          title: 'Est. App Store Installs',
          count: Math.round(estTotalImpressions * selectedRateObj.ctr),
          subtext: 'Direct App Store downloads driven by authentic friend-to-friend story shares (3.5% avg conversion)',
          metaEquivClicks: Math.round(((businessBudget / 32) * 1000) * 0.006)
        };
      case 'drop':
        return {
          title: 'Est. Promo Code Purchases',
          count: Math.round(estTotalImpressions * selectedRateObj.ctr),
          subtext: 'Direct checkout orders using unique creator discount codes during capsule drops',
          metaEquivClicks: Math.round(((businessBudget / 32) * 1000) * 0.006)
        };
      case 'local':
        return {
          title: 'Est. Local Customer Visits',
          count: Math.round(estTotalImpressions * selectedRateObj.ctr),
          subtext: 'Hyper-targeted foot traffic and customer check-ins within a 3-mile radius',
          metaEquivClicks: Math.round(((businessBudget / 32) * 1000) * 0.006)
        };
    }
  };

  const currentImpact = getImpactMetrics();

  return (
    <section id="calculator" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 mb-3 shadow-sm">
            <Scale className="w-3.5 h-3.5" />
            <span>Fair-Pay Economics & ROI Modeler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            {calculatorMode === 'creator' ? 'Estimate Your Story Earnings & Free Perks' : 'Model Your Campaign Reach & Conversions'}
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Calibrated at a fair rate of <span className="text-white font-bold">$4.20 – $5.50 per 100 verified views</span>. Creators get paid honest pocket cash for zero upfront work; brands get 5x higher CTR than programmatic social ads.
          </p>

          {/* Toggle Button */}
          <div className="mt-6 flex justify-center">
            <div
              role="tablist"
              aria-label="Calculator Mode Selector"
              className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-lg"
            >
              <button
                id="calc-tab-creator"
                role="tab"
                aria-selected={calculatorMode === 'creator'}
                aria-controls="calc-panel-creator"
                onClick={() => setCalculatorMode('creator')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  calculatorMode === 'creator'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>Creator Earnings Calculator</span>
              </button>
              <button
                id="calc-tab-business"
                role="tab"
                aria-selected={calculatorMode === 'business'}
                aria-controls="calc-panel-business"
                onClick={() => setCalculatorMode('business')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  calculatorMode === 'business'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" aria-hidden="true" />
                <span>Advertiser ROI Calculator</span>
              </button>
            </div>
          </div>
        </div>

        {calculatorMode === 'creator' ? (
          /* CREATOR CALCULATOR */
          <div
            id="calc-panel-creator"
            role="tabpanel"
            aria-labelledby="calc-tab-creator"
            className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-rose-500/20 p-6 sm:p-10 shadow-2xl shadow-rose-950/30 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-7">
                {/* Format Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    Select the sponsor types you'd love to share:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'dtc', label: 'DTC Products', rate: '$4.80/100' },
                      { id: 'app', label: 'Mobile Apps', rate: '$5.50/100' },
                      { id: 'drop', label: 'Streetwear', rate: '$4.50/100' },
                      { id: 'local', label: 'Local Spots', rate: '$4.20/100' },
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => setCreatorFormat(fmt.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer border ${
                          creatorFormat === fmt.id
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm'
                            : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{fmt.label}</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-normal">{fmt.rate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 1: Typical Views */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="creator-story-views-slider" className="text-sm font-bold text-slate-200">
                      Average Views on your Instagram Stories:
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-mono font-bold text-base border border-rose-500/30">
                      {storyViews} views
                    </span>
                  </div>
                  <input
                    id="creator-story-views-slider"
                    type="range"
                    min={50}
                    max={3000}
                    step={25}
                    value={storyViews}
                    aria-label="Average Views on your Instagram Stories"
                    aria-valuemin={50}
                    aria-valuemax={3000}
                    aria-valuenow={storyViews}
                    aria-valuetext={`${storyViews} views`}
                    onChange={(e) => setStoryViews(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>50 views (friends only)</span>
                    <span>1,500 views</span>
                    <span>3,000+ views</span>
                  </div>
                </div>

                {/* Slider 2: Stories per month */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="creator-stories-month-slider" className="text-sm font-bold text-slate-200">
                      Sponsored Stories you'd post per month:
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold text-base border border-amber-500/30">
                      {storiesPerMonth} {storiesPerMonth === 1 ? 'story' : 'stories'} / mo
                    </span>
                  </div>
                  <input
                    id="creator-stories-month-slider"
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={storiesPerMonth}
                    aria-label="Sponsored Stories you'd post per month"
                    aria-valuemin={1}
                    aria-valuemax={8}
                    aria-valuenow={storiesPerMonth}
                    aria-valuetext={`${storiesPerMonth} stories per month`}
                    onChange={(e) => setStoriesPerMonth(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>1 story / month</span>
                    <span>4 stories / month</span>
                    <span>8 stories / month</span>
                  </div>
                </div>

                {/* Rate transparency pill */}
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Guaranteed Rate ({formatRates[creatorFormat].name}):</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">
                    ${currentRate.toFixed(2)} per 100 verified views
                  </span>
                </div>
              </div>

              {/* Earnings Result Card */}
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-950 p-6 border border-slate-700 shadow-xl flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Estimated Cash Take-Home</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">
                      ${monthlyEarnings.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    ≈ ${perStoryEarnings.toFixed(2)} per 15s post • ${(yearlyEarnings).toFixed(2)} / year
                  </p>
                </div>

                {/* Why it's fair & interesting */}
                <div className="space-y-2.5 pt-2 border-t border-slate-700/60 text-xs">
                  <p className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Included Free Perks & Products:</span>
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-[11px] flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{currentPerk}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300 space-y-1">
                    <p className="font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>100% Risk-Free For You:</span>
                    </p>
                    <p className="text-slate-300 text-[10px]">
                      No contracts, no exclusivity. You choose which campaigns to accept. Instant payout via Venmo/Cash App after 24h.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenCreatorModal}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Join Creator Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* BUSINESS / ADVERTISER CALCULATOR */
          <div
            id="calc-panel-business"
            role="tabpanel"
            aria-labelledby="calc-tab-business"
            className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-purple-500/20 p-6 sm:p-10 shadow-2xl shadow-purple-950/30 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-7">
                {/* Select advertiser objective */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    What type of product/service are you promoting?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'dtc', label: 'E-Commerce / DTC', icon: ShoppingBag },
                      { id: 'app', label: 'Mobile App / Tech', icon: Smartphone },
                      { id: 'drop', label: 'Fashion / Drop', icon: Tag },
                      { id: 'local', label: 'Local Spot / Cafe', icon: Store },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setAdvertiserType(item.id as any)}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
                            advertiserType === item.id
                              ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                          <span className="text-[10px] text-center leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slider 1: Pilot Budget */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="business-budget-slider" className="text-sm font-bold text-slate-200">
                      Campaign Pilot Budget:
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono font-bold text-base border border-purple-500/30">
                      ${businessBudget}
                    </span>
                  </div>
                  <input
                    id="business-budget-slider"
                    type="range"
                    min={150}
                    max={3000}
                    step={50}
                    value={businessBudget}
                    aria-label="Campaign Pilot Budget in USD"
                    aria-valuemin={150}
                    aria-valuemax={3000}
                    aria-valuenow={businessBudget}
                    aria-valuetext={`$${businessBudget} dollars`}
                    onChange={(e) => setBusinessBudget(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                    <span>$150 (starter pilot)</span>
                    <span>$1,500</span>
                    <span>$3,000+ (nationwide scale)</span>
                  </div>
                </div>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      Authentic Creators
                    </p>
                    <p className="text-2xl font-black text-white font-mono mt-1">{estCreatorsCount} accounts</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Matched to your exact niche</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Human Views
                    </p>
                    <p className="text-2xl font-black text-emerald-400 font-mono mt-1">
                      {estTotalImpressions.toLocaleString()} views
                    </p>
                    <p className="text-[10px] text-emerald-400/80 mt-0.5">${selectedRateObj.rate.toFixed(2)}/100 verified views</p>
                  </div>
                </div>
              </div>

              {/* Business Impact Card */}
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-950 p-6 border border-purple-500/30 shadow-xl flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-400">{currentImpact.title}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200">
                      ~{currentImpact.count.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">vs ~{currentImpact.metaEquivClicks} on Meta</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {currentImpact.subtext}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>100% Waste-Free:</strong> Pay strictly for verified 24h views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>5x Higher CTR:</strong> Direct Link Stickers, App buttons & codes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Zero Risk:</strong> Unspent impressions credited back automatically</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBusinessModal}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Launch Advertiser Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
