import React, { useState } from 'react';
import {
  Store,
  Wallet,
  PlusCircle,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Coins,
  DollarSign,
  ChevronRight,
  Building,
  Target,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { WALLET_TOPUP_PACKAGES } from '../data/initialData';
import { APP_CONFIG } from '../config/constants';

interface BusinessGuideSectionProps {
  onOpenPWAModal: () => void;
}

export const BusinessGuideSection: React.FC<BusinessGuideSectionProps> = ({
  onOpenPWAModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [simulatedEscrowLocked, setSimulatedEscrowLocked] = useState<number>(60.00);
  const [simulatedActualReach, setSimulatedActualReach] = useState<number>(1333);
  const cityRate = 0.03; // e.g. Tallinn

  const creatorCost = Number((simulatedActualReach * cityRate).toFixed(2));
  const fee = Number((creatorCost * 0.15).toFixed(2));
  const totalSettled = Number((creatorCost + fee).toFixed(2));
  const surplusRefund = Number(Math.max(0, simulatedEscrowLocked - totalSettled).toFixed(2));

  const steps = [
    {
      step: 1,
      title: 'Create Your Business Account',
      badge: 'Step 1',
      icon: Building,
      color: 'from-purple-500 to-indigo-500',
      description:
        'Log in with Google at scopeswell.com and select the "Business / Brand" role. Set your Company Name, City (e.g., Tallinn), Category, and official Website or social link.',
      details: [
        'Quick Google sign-in with instant business profile creation',
        'Set primary target city (e.g., Tallinn, Riga, Helsinki, London)',
        'Zero setup fees or monthly subscription lock-ins',
      ],
    },
    {
      step: 2,
      title: 'Add Credits to Your Wallet',
      badge: 'Step 2',
      icon: Coins,
      color: 'from-amber-500 to-yellow-500',
      description:
        'Click "Add Credits" on your dashboard. Choose a top-up package (e.g., €50, €100, €250, €500). Complete the secure checkout. 1 Platform Credit is strictly equal to €1.00 EUR.',
      details: [
        '1 Platform Credit = €1.00 EUR fixed exchange rate',
        'Choose packages from €50 starter to €500+ scale',
        'Credits remain safely stored in your account indefinitely',
      ],
    },
    {
      step: 3,
      title: 'Create & Publish Your Campaign',
      badge: 'Step 3',
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      description:
        'Fill in your Campaign Title, Description, Target City & Audience (e.g., Tallinn, Food & Lifestyle), Required @mention tag (e.g., @myrestaurant), Landing page / Promo link, and key talking points for creators. Once published, local creators can immediately view and apply.',
      details: [
        'Specify required Instagram @mention tag & link sticker',
        'Set creative guidelines & story talking points',
        'Instantly visible in the verified local creator Marketplace',
      ],
    },
    {
      step: 4,
      title: 'Review Applicants & Automated Escrow Guarantee',
      badge: 'Step 4',
      icon: Users,
      color: 'from-indigo-500 to-blue-500',
      description:
        'When creators apply, review their Creator Dossier: follower count, engagement rate, % local audience in your city, and estimated story reach. When you click Accept Creator, the platform automatically locks the maximum estimated reach budget in escrow from your credit balance.',
      details: [
        'Dossier shows % of local city audience & engagement',
        'Automatic escrow hold locks maximum estimated reach budget safely',
        'Creators post with total confidence that funds are secured',
      ],
    },
    {
      step: 5,
      title: 'Review Proof & Automated Settlement (+ Surplus Refund)',
      badge: 'Step 5',
      icon: RefreshCw,
      color: 'from-emerald-500 to-teal-500',
      description:
        'When the creator posts and submits their 24-hour Story Insights screenshot, our audit system verifies the unique Accounts Reached. Payment is settled automatically: exact creator earnings are released, and any unused locked escrow credits are automatically refunded straight back to your wallet balance!',
      details: [
        'Exact creator earnings (Accounts Reached × City Rate) released',
        'Surplus locked credits refunded instantly to your wallet',
        'Example: If €60 was locked in escrow, and final verified reach cost was €40, €20 is instantly returned to you!',
      ],
    },
  ];

  const currentStepData = steps[activeStep - 1];

  return (
    <section id="business-guide" className="py-16 md:py-24 bg-slate-950/30 border-t border-slate-900/80 relative overflow-hidden backdrop-blur-[1px]">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-3 shadow-sm">
            <Store className="w-3.5 h-3.5" />
            <span>Official Brand & Business Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Business Guide: How to Use the App
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Zero upfront risk. Automated escrow locks campaign funds safely and automatically refunds any unused credits back to your wallet upon reach settlement.
          </p>
        </div>

        {/* 5-STEP WORKFLOW INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          {/* Steps Nav */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Business Campaign Steps:
            </p>
            {steps.map((s) => {
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border cursor-pointer flex items-center gap-3.5 ${
                    isActive
                      ? 'bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-950/20 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900/90 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {s.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{s.badge} • Tap to view</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Step Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/90 border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md">
                    {currentStepData.step}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      {currentStepData.badge} of 5
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk']">
                      {currentStepData.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 text-xs font-mono border border-purple-800/40">
                  Escrow Protected
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Step Key Highlights */}
              <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-300 mb-2">Key Business Advantages:</p>
                {currentStepData.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* STEP 2 TOP-UP PACKAGES SHOWCASE */}
              {activeStep === 2 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-300">Standard Wallet Top-Up Packages (1 Credit = €1.00 EUR):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {WALLET_TOPUP_PACKAGES.map((pkg) => (
                      <div
                        key={pkg.credits}
                        className={`p-3 rounded-xl border text-center ${
                          pkg.popular
                            ? 'bg-purple-950/40 border-purple-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <p className="text-lg font-black font-mono">€{pkg.eur}</p>
                        <p className="text-[11px] text-purple-300 font-semibold">{pkg.credits} Credits</p>
                        <span className="text-[9px] text-slate-400 block mt-1">{pkg.bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 INTERACTIVE SETTLEMENT & SURPLUS REFUND CALCULATOR */}
              {activeStep === 5 && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4" />
                      Live Escrow Settlement & Refund Simulator
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      Step 5 Demonstration
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-slate-400">
                        <span>Locked in Escrow at Creator Acceptance:</span>
                        <span className="font-mono font-bold text-white">€{simulatedEscrowLocked.toFixed(2)} EUR</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={150}
                        step={5}
                        value={simulatedEscrowLocked}
                        aria-label="Escrow locked amount"
                        onChange={(e) => setSimulatedEscrowLocked(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 text-slate-400">
                        <span>Final Verified 24h Accounts Reached:</span>
                        <span className="font-mono font-bold text-emerald-400">{simulatedActualReach.toLocaleString()} accounts reached</span>
                      </div>
                      <input
                        type="range"
                        min={300}
                        max={3000}
                        step={50}
                        value={simulatedActualReach}
                        aria-label="Final verified story accounts reached"
                        onChange={(e) => setSimulatedActualReach(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    {/* Settlement Breakdown Box */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Creator Payout ({simulatedActualReach} × €0.03):</span>
                        <span className="font-bold text-white">€{creatorCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Platform Fee (15%):</span>
                        <span>€{fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-amber-300 pt-1 border-t border-slate-800 font-bold">
                        <span>Total Actual Cost Settled:</span>
                        <span>€{totalSettled.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400 pt-1 border-t border-slate-800 font-bold text-sm bg-emerald-950/30 p-2 rounded-lg">
                        <span>Surplus Refund to Your Wallet:</span>
                        <span>€{surplusRefund.toFixed(2)} EUR</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  ← Previous Step
                </button>

                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setActiveStep(num)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeStep === num ? 'bg-purple-500 w-6' : 'bg-slate-700'
                      }`}
                      aria-label={`Go to step ${num}`}
                    />
                  ))}
                </div>

                {activeStep < 5 ? (
                  <button
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Next Step →</span>
                  </button>
                ) : (
                  <a
                    href={APP_CONFIG.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Launch Business App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
