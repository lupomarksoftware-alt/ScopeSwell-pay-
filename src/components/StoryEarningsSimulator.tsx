import React, { useState } from 'react';
import {
  Smartphone,
  Coins,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  DollarSign,
  Euro,
  ArrowRight,
  ExternalLink,
  Users,
  Building,
  UserCheck,
  Layers,
  Flame,
  Clock,
  Instagram
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface CityPreset {
  id: string;
  name: string;
  country: string;
  ratePerReach: number;
  popularNiche: string;
}

const CITIES: CityPreset[] = [
  { id: 'tallinn', name: 'Tallinn', country: 'Estonia', ratePerReach: 0.03, popularNiche: 'Tech & Local Dining' },
  { id: 'helsinki', name: 'Helsinki', country: 'Finland', ratePerReach: 0.05, popularNiche: 'Lifestyle & Design' },
  { id: 'stockholm', name: 'Stockholm', country: 'Sweden', ratePerReach: 0.06, popularNiche: 'Fashion & E-Commerce' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', ratePerReach: 0.05, popularNiche: 'Culture & DTC Brands' },
  { id: 'riga', name: 'Riga', country: 'Latvia', ratePerReach: 0.03, popularNiche: 'Cafes & Hospitality' },
  { id: 'vilnius', name: 'Vilnius', country: 'Lithuania', ratePerReach: 0.03, popularNiche: 'Wellness & Fitness' },
];

export const StoryEarningsSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'creator' | 'business'>('creator');
  const [selectedCityId, setSelectedCityId] = useState<string>('helsinki');
  const [reachValue, setReachValue] = useState<number>(2500);
  const [storiesPerMonth, setStoriesPerMonth] = useState<number>(4);
  const [showInsightsView, setShowInsightsView] = useState<boolean>(false);

  // Business simulation state:
  const [businessBudget, setBusinessBudget] = useState<number>(150);

  const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[1];

  // Creator Math
  const singleStoryPayout = Number((reachValue * city.ratePerReach).toFixed(2));
  const monthlyCreatorEarnings = Number((singleStoryPayout * storiesPerMonth).toFixed(2));
  const simulatedImpressions = Math.round(reachValue * 1.85); // Impressions include repeat loops
  const freeReplayLoops = simulatedImpressions - reachValue;

  // Business Math
  const targetReachCap = Math.round(businessBudget / (city.ratePerReach * 1.15));
  const actualSimulatedReach = Math.min(reachValue, targetReachCap);
  const creatorCost = Number((actualSimulatedReach * city.ratePerReach).toFixed(2));
  const platformFee = Number((creatorCost * 0.15).toFixed(2));
  const totalSpent = Number((creatorCost + platformFee).toFixed(2));
  const instantRefund = Number(Math.max(0, businessBudget - totalSpent).toFixed(2));

  return (
    <section id="simulator" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#0e1320] via-[#090d16] to-[#070a10] border-t border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 backdrop-blur-md">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Simulator • Real-Time Math</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Live Story & Escrow Simulator
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag the reach slider, choose your city, and test how ScopeSwell computes exact Euro payouts
            and automated escrow refunds in real time.
          </p>

          {/* Creator vs Business Toggle */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'creator'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Creator Earnings Mode</span>
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Business Escrow Mode</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel (Left, 7 columns) */}
          <div className="lg:col-span-7 bg-[#0c101a]/95 border border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {/* City Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                1. Select City Market
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCityId(c.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedCityId === c.id
                        ? 'bg-rose-500/15 border-rose-500/60 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-xs font-bold">{c.name}</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                      €{c.ratePerReach.toFixed(2)} / reach
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reach Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  2. Story Verified Accounts Reached
                </label>
                <span className="text-base font-extrabold text-white font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                  {reachValue.toLocaleString()} unique accounts
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="250"
                value={reachValue}
                onChange={(e) => setReachValue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>500 reach (Micro)</span>
                <span>5,000 reach</span>
                <span>15,000+ reach (Authority)</span>
              </div>
            </div>

            {/* Mode-Specific Controls */}
            {activeTab === 'creator' ? (
              /* Stories per month slider */
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    3. Sponsored Stories Per Month
                  </label>
                  <span className="text-sm font-extrabold text-amber-300 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                    {storiesPerMonth} {storiesPerMonth === 1 ? 'story' : 'stories'} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={storiesPerMonth}
                  onChange={(e) => setStoriesPerMonth(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>1 Story (Casual)</span>
                  <span>4 Stories (1/week)</span>
                  <span>12 Stories (Active Partner)</span>
                </div>
              </div>
            ) : (
              /* Business Budget Slider */
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    3. Campaign Budget Locked in Escrow
                  </label>
                  <span className="text-base font-extrabold text-emerald-300 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                    €{businessBudget.toFixed(2)} EUR
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={businessBudget}
                  onChange={(e) => setBusinessBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>€50.00 (Test Trial)</span>
                  <span>€200.00 (Local Launch)</span>
                  <span>€500.00 (Major Push)</span>
                </div>
              </div>
            )}

            {/* Calculations Output Card */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">
                    {activeTab === 'creator' ? 'Per Single 24h Story' : 'Target Reach Capacity'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                    {activeTab === 'creator' ? `€${singleStoryPayout.toFixed(2)}` : `${targetReachCap.toLocaleString()}`}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    {activeTab === 'creator' ? 'Direct EUR Balance' : 'Max Guaranteed Eyeballs'}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">
                    {activeTab === 'creator' ? 'Monthly Potential' : 'Creator Payout Released'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-1">
                    {activeTab === 'creator' ? `€${monthlyCreatorEarnings.toFixed(2)}` : `€${creatorCost.toFixed(2)}`}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {activeTab === 'creator' ? `${storiesPerMonth} Stories/Month` : `${actualSimulatedReach.toLocaleString()} verified reach`}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">
                    {activeTab === 'creator' ? 'Duplicate Replay Views' : 'Automated Instant Refund'}
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-black font-mono mt-1 ${
                      activeTab === 'creator' ? 'text-cyan-300' : 'text-emerald-400'
                    }`}
                  >
                    {activeTab === 'creator' ? `+${freeReplayLoops.toLocaleString()}` : `€${instantRefund.toFixed(2)}`}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {activeTab === 'creator' ? '100% Free Bonus Reach' : 'Returned to Business Wallet'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action below controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1 Platform Credit = €1.00 EUR fixed parity</span>
              </span>
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 font-bold inline-flex items-center gap-1"
              >
                <span>Open Dashboard ({APP_CONFIG.appDisplayDomain})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Smartphone Mockup (Right, 5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Frame */}
            <div className="w-[300px] sm:w-[320px] rounded-[40px] border-4 border-slate-700 bg-black p-3 shadow-2xl relative shadow-rose-950/20">
              {/* Dynamic Island / Speaker notch */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-black rounded-full" />
              </div>

              {/* Screen Content */}
              <div className="rounded-[30px] overflow-hidden bg-slate-950 relative h-[480px] flex flex-col justify-between border border-slate-800">
                {!showInsightsView ? (
                  /* Mode A: Live 24h Instagram Story View */
                  <div className="flex-1 flex flex-col justify-between p-4 relative bg-gradient-to-br from-rose-950/60 via-purple-950/40 to-slate-950">
                    {/* Story top timeline bar */}
                    <div>
                      <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-2">
                        <div className="w-3/4 bg-white h-full" />
                      </div>

                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                              SS
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-none">
                              @creator.{city.id}
                            </div>
                            <div className="text-[10px] text-white/70 flex items-center gap-1 mt-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              <span>23h 48m left</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-emerald-300 border border-white/10">
                          Sponsored
                        </span>
                      </div>
                    </div>

                    {/* Story Center Sticker */}
                    <div className="text-center my-auto">
                      <div className="inline-block p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 shadow-xl max-w-[220px]">
                        <div className="text-xs font-bold text-white mb-1">
                          🔥 Local Spotlight: {city.name}
                        </div>
                        <div className="p-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-extrabold shadow-md mb-2">
                          Use Code: SCOPE20 (-20%)
                        </div>
                        <span className="text-[10px] text-slate-300 block">
                          Swipe up or tap link sticker to visit
                        </span>
                      </div>
                    </div>

                    {/* Story Footer Live Counter */}
                    <div className="bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400">Live Story Reach:</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          {reachValue.toLocaleString()} Unique Accounts
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-300 font-semibold font-mono">
                        Earned: €{singleStoryPayout.toFixed(2)} EUR
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mode B: Official 24h Insights Screenshot Simulation */
                  <div className="flex-1 p-4 bg-[#0a0a0c] text-white flex flex-col justify-between text-xs">
                    <div>
                      <div className="text-center font-bold text-sm mb-3 pb-2 border-b border-slate-800">
                        Instagram Story Insights
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                            Accounts Reached (Verified)
                          </div>
                          <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                            {reachValue.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            ✓ Unique human accounts billed by ScopeSwell
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                            Impressions (Total Views)
                          </div>
                          <div className="text-lg font-bold text-white font-mono mt-0.5">
                            {simulatedImpressions.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-cyan-300 mt-1">
                            Includes {freeReplayLoops.toLocaleString()} replay loops (Free!)
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-[11px] font-semibold">
                          ✓ ScopeSwell OCR Audit Passed: Payout Released
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-[10px] text-slate-500 pb-1">
                      Simulated 24-hour verification screen
                    </div>
                  </div>
                )}
              </div>

              {/* View Toggle Button */}
              <div className="mt-3 text-center">
                <button
                  onClick={() => setShowInsightsView(!showInsightsView)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-rose-400" />
                  <span>{showInsightsView ? 'Show Live Story' : 'Inspect 24h Insights Proof'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
