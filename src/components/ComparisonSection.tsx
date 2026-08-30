import React, { useState } from 'react';
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Users,
  Target,
  ShoppingBag,
  Globe,
  ArrowRight,
  MousePointerClick,
  DollarSign,
  Award,
  Flame,
  BarChart3,
  Bot,
  HeartHandshake
} from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const [testBudget, setTestBudget] = useState<number>(500);

  // Math for comparison with $testBudget
  // ScopeSwell: ~$4.80 / 100 views => (500 / 4.8) * 100 = ~10,400 verified views
  // CTR: 4.8% => ~500 clicks
  // Meta/Instagram Ads: CPM $32 => (500 / 32) * 1000 = ~15,625 impressions
  // CTR: 0.6% => ~94 clicks, ~20% bot/accidental clicks
  // Macro Influencer: $500 flat fee => 1 post, generic promo, zero view guarantee

  const scopeSwellViews = Math.round((testBudget / 4.8) * 100);
  const scopeSwellClicks = Math.round(scopeSwellViews * 0.048);
  const scopeSwellCreators = Math.max(3, Math.round(scopeSwellViews / 580));

  const metaImpressions = Math.round((testBudget / 32) * 1000);
  const metaClicks = Math.round(metaImpressions * 0.006);

  return (
    <section id="comparison" className="py-16 md:py-24 bg-slate-950/80 border-t border-slate-900 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-rose-300 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why This Beats Traditional Ads</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Why Everyday Story Ads Outperform Basic Ads
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Basic algorithmic ads are ignored by 90% of users. ScopeSwell Pay taps into the single most influential driver of buying behavior on earth: <span className="text-white font-semibold underline decoration-rose-500 decoration-2">recommendations from personal friends</span>.
          </p>
        </div>

        {/* Dynamic ROI Side-by-Side Simulator */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                Live Side-by-Side Budget Comparison
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                See What You Get for ${testBudget}
              </h3>
            </div>

            {/* Budget Presets */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Budget:</span>
              {[250, 500, 1000, 2500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTestBudget(amt)}
                  className={`px-4 py-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    testBudget === amt
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* ScopeSwell Pay Result */}
            <div className="rounded-2xl bg-slate-800/60 border-2 border-emerald-500/40 p-6 relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="absolute -top-1 -right-1 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-[11px] font-black uppercase rounded-bl-xl shadow-md">
                High Conversion & Trust
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">ScopeSwell Pay Story Network</h4>
                    <p className="text-xs text-emerald-400 font-medium">Verified friend recommendations</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-[11px] text-slate-400">High-Intent Link Clicks</p>
                    <p className="text-2xl font-black text-emerald-300 font-mono">~{scopeSwellClicks.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-400/90 mt-0.5">4.8% avg peer sticker CTR</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-[11px] text-slate-400">Verified Human Views</p>
                    <p className="text-2xl font-black text-white font-mono">{scopeSwellViews.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">100% verified 24h story eyes</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong className="text-white">{scopeSwellCreators} distinct micro-creators</strong> post genuine peer stories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong className="text-white">92% Trust Rating</strong> (Friends trust friend recommendations over brands)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong className="text-white">Zero Bot Traffic:</strong> View counts verified directly from Instagram Insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong className="text-white">Pay-Per-View Guarantee:</strong> Unused impressions refunded automatically</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                ⚡ Result: <strong>~5.3x more real customer clicks</strong> and lasting word-of-mouth social proof.
              </div>
            </div>

            {/* Basic Algorithmic Ads Result */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between opacity-90">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
                    ✕
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-300">Basic Meta / Social Ads</h4>
                    <p className="text-xs text-slate-400">Programmatic feed & story banners</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-[11px] text-slate-400">Estimated Ad Clicks</p>
                    <p className="text-2xl font-black text-slate-400 font-mono">~{metaClicks.toLocaleString()}</p>
                    <p className="text-[10px] text-rose-400/80 mt-0.5">0.6% cold programmatic CTR</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-[11px] text-slate-400">Impressions</p>
                    <p className="text-2xl font-black text-slate-300 font-mono">{metaImpressions.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">High banner blindness / fast swipe</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-400 mb-4">
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                    <span><strong className="text-slate-300">90%+ Ad Blindness:</strong> Users instinctively skip sponsored banner tags</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                    <span><strong className="text-slate-300">34% Trust Rating:</strong> Perceived as commercial cold selling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                    <span><strong className="text-slate-300">15% - 25% Bot/Accidental Clicks:</strong> Accidental thumbs and scrapers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                    <span><strong className="text-slate-300">Unforgiving Bidding Wars:</strong> Rising CPMs during peak e-commerce seasons</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-medium">
                ⚠️ Result: Expensive upfront spend with high bounce rates and zero personal peer advocacy.
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Head-to-Head Matrix */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[720px] rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-800/80 p-5 text-sm font-bold text-slate-200 border-b border-slate-700">
              <div className="col-span-4 text-slate-400">Core Performance Factor</div>
              <div className="col-span-3 text-center text-rose-400 flex items-center justify-center gap-1.5 font-extrabold">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                ScopeSwell Pay
              </div>
              <div className="col-span-2.5 text-center text-slate-400">Basic Social Ads</div>
              <div className="col-span-2.5 text-center text-slate-400">Macro-Influencers</div>
            </div>

            {/* Row 1: Consumer Trust */}
            <div className="grid grid-cols-12 p-5 items-center border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors text-sm">
              <div className="col-span-4">
                <p className="font-bold text-white">Audience Trust & Receptivity</p>
                <p className="text-xs text-slate-400">How believable and authentic the post feels</p>
              </div>
              <div className="col-span-3 text-center bg-rose-500/10 rounded-xl py-2 px-1 border border-rose-500/20">
                <span className="font-bold text-rose-300 text-xs sm:text-sm">92% Trust (Personal Friends)</span>
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                34% (Commercial corporate ad)
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                48% (Paid endorsement fatigue)
              </div>
            </div>

            {/* Row 2: Average Click-Through Rate */}
            <div className="grid grid-cols-12 p-5 items-center border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors text-sm">
              <div className="col-span-4">
                <p className="font-bold text-white">Sticker / Link Click-Through Rate</p>
                <p className="text-xs text-slate-400">Percentage of viewers who tap and visit</p>
              </div>
              <div className="col-span-3 text-center bg-rose-500/10 rounded-xl py-2 px-1 border border-rose-500/20">
                <span className="font-bold text-emerald-300 text-xs sm:text-sm">3.5% - 7.5% CTR (High Intent)</span>
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                0.4% - 0.9% (Low Intent)
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                0.8% - 1.4% ("Link in bio" friction)
              </div>
            </div>

            {/* Row 3: Pricing & Risk Model */}
            <div className="grid grid-cols-12 p-5 items-center border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors text-sm">
              <div className="col-span-4">
                <p className="font-bold text-white">Pricing Model & Financial Risk</p>
                <p className="text-xs text-slate-400">How you are billed and performance protected</p>
              </div>
              <div className="col-span-3 text-center bg-rose-500/10 rounded-xl py-2 px-1 border border-rose-500/20">
                <span className="font-bold text-emerald-300 text-xs sm:text-sm">Pay Strictly Verified Views</span>
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                Billed on CPM impressions regardless of real attention
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                High flat fees ($1,000 - $10,000+ upfront risk)
              </div>
            </div>

            {/* Row 4: Bot & Fraud Protection */}
            <div className="grid grid-cols-12 p-5 items-center border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors text-sm">
              <div className="col-span-4">
                <p className="font-bold text-white">Bot & Fraud Resistance</p>
                <p className="text-xs text-slate-400">Protection against click farms & fake followers</p>
              </div>
              <div className="col-span-3 text-center bg-rose-500/10 rounded-xl py-2 px-1 border border-rose-500/20">
                <span className="font-bold text-cyan-300 text-xs sm:text-sm">100% Real Insights Proof</span>
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                Susceptible to web bots & accidental mobile clicks
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                High bot followers on large vanity accounts
              </div>
            </div>

            {/* Row 5: Word-of-Mouth Longevity */}
            <div className="grid grid-cols-12 p-5 items-center hover:bg-slate-800/30 transition-colors text-sm">
              <div className="col-span-4">
                <p className="font-bold text-white">Organic Word-of-Mouth Ripple</p>
                <p className="text-xs text-slate-400">Direct messages, replies & friend inquiries</p>
              </div>
              <div className="col-span-3 text-center bg-rose-500/10 rounded-xl py-2 px-1 border border-rose-500/20">
                <span className="font-bold text-purple-300 text-xs sm:text-sm">High ("Where did you get that?")</span>
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                Zero (Nobody DMs a corporate sponsor)
              </div>
              <div className="col-span-2.5 text-center text-slate-400 text-xs">
                Generic spam comments in comment section
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the ScopeSwell Advantage */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Authentic Social Proof</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Friends don't scroll past friends. When everyday people recommend a local venue or service, their circles pay attention and take action.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">100% Fair Pay-Per-View</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Advertisers only pay for verified human eyes ($4.20 - $5.80 / 100 views). Creators get honest cash for every single friend who watches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <MousePointerClick className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">5x Higher Click Rates</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Location tags and menu link stickers turn curiosity into instant visits, bookings, and in-store checkouts with zero friction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Bot Waste</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike programmatic networks plagued by automated crawlers, every view is verified via native 24h Instagram Story Insights screenshots.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
