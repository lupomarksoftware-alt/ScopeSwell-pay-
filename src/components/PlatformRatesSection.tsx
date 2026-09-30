import React, { useState } from 'react';
import { OFFICIAL_CITY_RATES } from '../data/initialData';
import { CityRateInfo, CityRateKey } from '../types';
import { Calculator, Euro, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, TrendingUp, HelpCircle, Layers, Coins, Smartphone, ExternalLink, Users } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface PlatformRatesSectionProps {
  onOpenPWAModal: () => void;
}

export const PlatformRatesSection: React.FC<PlatformRatesSectionProps> = ({
  onOpenPWAModal,
}) => {
  const [selectedCityKey, setSelectedCityKey] = useState<CityRateKey>('tallinn');
  const [reachInput, setReachInput] = useState<number>(1500);

  const selectedCity: CityRateInfo =
    OFFICIAL_CITY_RATES.find((c) => c.id === selectedCityKey) || OFFICIAL_CITY_RATES[0];

  const ratePerReach = selectedCity.ratePerReach || selectedCity.ratePerView || 0.03;

  // Official Math Breakdown
  // Creator Payout = Accounts Reached * City Rate
  const creatorPayout = Number((reachInput * ratePerReach).toFixed(2));
  // Platform Fee = Creator Payout * 15%
  const platformFee = Number((creatorPayout * (selectedCity.serviceFeePercent / 100)).toFixed(2));
  // Total Business Cost = Creator Payout + Platform Fee
  const totalBusinessCost = Number((creatorPayout + platformFee).toFixed(2));

  // Escrow example calculation
  const estimatedMaxReach = Math.round(reachInput * 1.25);
  const maxEscrowLocked = Number((estimatedMaxReach * ratePerReach * 1.15).toFixed(2));
  const surplusRefund = Number(Math.max(0, maxEscrowLocked - totalBusinessCost).toFixed(2));

  return (
    <section id="rates" className="py-16 md:py-24 bg-slate-950/30 border-t border-slate-900/80 relative overflow-hidden backdrop-blur-[1px]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-300 mb-3 shadow-sm">
            <Coins className="w-3.5 h-3.5" />
            <span>1 Platform Credit = €1.00 EUR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Currency & Fixed Pay-Per-Reach Rates
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            No guessing games or inflated influencer packages. Rates are transparently fixed per <strong className="text-white">1 verified unique account reached</strong> from official Instagram Story Insights.
          </p>
        </div>

        {/* Currency & Credit Foundation Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-base mb-3 border border-amber-500/30">
                €1
              </div>
              <h3 className="text-base font-bold text-white">1 Credit = €1.00 EUR</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Simple 1:1 parity with the Euro. Business wallets hold Credits to fund campaigns and lock automated escrow securely.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-semibold text-emerald-400">
              ✓ Direct EUR Wallet Payouts
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-base mb-3 border border-rose-500/30">
                100%
              </div>
              <h3 className="text-base font-bold text-white">Fair for Creators</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                You get paid directly for the actual unique accounts your Story reaches. 100% of your earned rate is deposited upon 24h Insights verification.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-semibold text-rose-300">
              ✓ Instant Wallet Balance Release
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-base mb-3 border border-purple-500/30">
                15%
              </div>
              <h3 className="text-base font-bold text-white">Risk-Free for Businesses</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Protected by automated escrow. You only pay for verified unique accounts reached—never duplicate loops or bot traffic. Flat 15% platform matchmaking fee handles audit & escrow.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-semibold text-purple-300">
              ✓ Automatic Surplus Escrow Refund
            </div>
          </div>
        </div>

        {/* Fixed City Rates Table */}
        <div className="mb-14 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 bg-slate-850 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">Official Fixed Pay-Per-Reach Rate Card</h3>
              <p className="text-xs text-slate-400">Calculated per 1 verified unique account reached based on audience city</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono self-start sm:self-auto">
              Live on scopeswell.com
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">City / Market</th>
                  <th className="py-3.5 px-4">Rate Per 1 Verified Reach</th>
                  <th className="py-3.5 px-4">Rate Per 100 Accounts Reached</th>
                  <th className="py-3.5 px-4">Platform Service Fee</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Quick Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {OFFICIAL_CITY_RATES.map((city) => (
                  <tr
                    key={city.id}
                    onClick={() => setSelectedCityKey(city.id)}
                    className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                      selectedCityKey === city.id ? 'bg-rose-500/10' : ''
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{city.cityName}</span>
                        {city.badge && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-amber-300 font-normal">
                            {city.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">{city.country}</span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                      €{(city.ratePerReach || city.ratePerView || 0.03).toFixed(2)} / reach
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      €{(city.ratePer100Reach || city.ratePer100Views || 3.00).toFixed(2)} / 100 accounts
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800/60 text-purple-300 font-mono text-xs">
                        {city.serviceFeePercent}%
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCityKey(city.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedCityKey === city.id
                            ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {selectedCityKey === city.id ? 'Active Simulator' : 'Test Math'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Interactive Math Breakdown Simulator */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/30 p-6 sm:p-10 shadow-2xl shadow-rose-950/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Pay-Per-Reach Math Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
                How the Math Works (Live Example)
              </h3>
            </div>

            {/* City selector pills */}
            <div className="flex flex-wrap gap-1.5">
              {OFFICIAL_CITY_RATES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityKey(city.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCityKey === city.id
                      ? 'bg-rose-500 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {city.cityName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-8">
            {/* Left Column: Sliders & Variables */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="reach-slider-rates" className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Verified Instagram Accounts Reached:</span>
                  </label>
                  <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 font-mono font-bold text-emerald-400 text-sm sm:text-base">
                    {reachInput.toLocaleString()} accounts
                  </span>
                </div>
                <input
                  id="reach-slider-rates"
                  type="range"
                  min={200}
                  max={5000}
                  step={50}
                  value={reachInput}
                  aria-label="Verified Instagram Accounts Reached"
                  onChange={(e) => setReachInput(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>200 reach (Starter)</span>
                  <span>1,500 reach (Example)</span>
                  <span>5,000 reach (Power)</span>
                </div>
              </div>

              {/* Step-by-step math card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
                <p className="font-bold text-slate-300">Exact Transaction Math Step-by-Step:</p>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 text-slate-200">
                  <span>1. Verified Unique Accounts Reached:</span>
                  <span className="font-mono font-bold text-white">{reachInput.toLocaleString()} unique accounts</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 text-slate-200">
                  <span>2. City Rate ({selectedCity.cityName}):</span>
                  <span className="font-mono font-bold text-emerald-400">€{ratePerReach.toFixed(2)} / reach</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                  <span>3. Creator Payout ({reachInput.toLocaleString()} × €{ratePerReach.toFixed(2)}):</span>
                  <span className="font-mono font-black text-emerald-300 text-sm">€{creatorPayout.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200">
                  <span>4. ScopeSwell Platform Fee (15%):</span>
                  <span className="font-mono font-bold text-purple-300">€{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 text-white font-bold border border-slate-700">
                  <span>5. Total Business Cost:</span>
                  <span className="font-mono text-base text-amber-300">€{totalBusinessCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Escrow Hold & Settlement Simulator */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Automated Escrow & Settlement Card
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  100% Protected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[11px] text-slate-400">Creator Receives</p>
                  <p className="text-2xl font-black text-emerald-400 font-mono mt-1">€{creatorPayout.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Paid into wallet balance</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[11px] text-slate-400">Total Charged to Brand</p>
                  <p className="text-2xl font-black text-amber-300 font-mono mt-1">€{totalBusinessCost.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Incl. 15% platform audit fee</p>
                </div>
              </div>

              {/* Escrow Surplus Refund Simulation */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-800/40 text-xs space-y-2">
                <p className="font-bold text-purple-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Escrow Surplus Refund Guarantee</span>
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  If <strong>€{maxEscrowLocked.toFixed(2)}</strong> was locked in escrow for estimated reach, but final verified Accounts Reached delivered <strong>€{totalBusinessCost.toFixed(2)}</strong> in cost:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-purple-700/50 flex items-center justify-between font-mono font-bold text-xs">
                  <span className="text-emerald-400">Instant Refund to Business Wallet:</span>
                  <span className="text-emerald-300 text-sm">€{surplusRefund.toFixed(2)} EUR</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Launch Creator App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-600/60 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Business App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
