import React, { useState } from 'react';
import {
  Instagram,
  UserCheck,
  Search,
  Camera,
  UploadCloud,
  Wallet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  Clock,
  Link,
  ChevronRight,
  HelpCircle,
  FileCheck,
  ExternalLink,
  Users
} from 'lucide-react';
import { SAMPLE_PWA_CAMPAIGNS } from '../data/initialData';
import { APP_CONFIG } from '../config/constants';

interface CreatorGuideSectionProps {
  onOpenPWAModal: () => void;
  onOpenInstagramSwitchModal: () => void;
}

export const CreatorGuideSection: React.FC<CreatorGuideSectionProps> = ({
  onOpenPWAModal,
  onOpenInstagramSwitchModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [demoStoryLink, setDemoStoryLink] = useState('https://instagram.com/stories/liis_tallinn/345912');
  const [demoReachCount, setDemoReachCount] = useState<number>(1500);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'Sign In & Connect Your Profile',
      badge: 'Step 1',
      icon: UserCheck,
      color: 'from-rose-500 to-pink-500',
      description:
        'Log into ScopeSwell at scopeswell.com with your Google account and choose the "Creator" role. Enter your Instagram handle (e.g., @yourname). Our system automatically verifies your public metrics (followers, engagement rate, and estimated Story reach).',
      details: [
        'Zero passwords ever requested (100% public handle scan)',
        'Automatic estimated reach capacity calculation',
        'Direct EUR wallet created instantly upon sign in',
      ],
    },
    {
      step: 2,
      title: 'Browse & Apply to Campaigns',
      badge: 'Step 2',
      icon: Search,
      color: 'from-amber-500 to-orange-500',
      description:
        'Go to the Marketplace tab in the PWA. Filter available campaigns by your city (e.g., Tallinn, Riga, Helsinki) and favorite categories (Food, Cafes, Fitness, Beauty). Review brand tags, sticker links, and guidelines, then tap Apply with an optional short pitch.',
      details: [
        'Filter by category, city reach rate, and required ad format',
        'Review exact @mention and sticker link requirements',
        'Submit a 1-click pitch describing your creative idea',
      ],
    },
    {
      step: 3,
      title: 'Publish Your 24-Hour Story',
      badge: 'Step 3',
      icon: Camera,
      color: 'from-purple-500 to-pink-500',
      description:
        'Once the business accepts your application, your campaign status shifts to "Active / Accepted". Create and post your authentic Instagram Story following the campaign rules (include the required @brand mention and sticker link). Keep the Story live for the full 24 hours.',
      details: [
        'Guaranteed escrow locked by business before you post',
        'Include required @mention tag & link sticker',
        'Must remain live for full 24-hour cycle',
      ],
    },
    {
      step: 4,
      title: 'Submit Proof of Accounts Reached',
      badge: 'Step 4',
      icon: UploadCloud,
      color: 'from-blue-500 to-cyan-500',
      description:
        'When your Story reaches 24 hours (or from your Story Archive), open your Story on Instagram and swipe UP to reveal your Story Insights / Viewers page. Take a clear screenshot showing the thumbnail, Accounts Reached count, and timestamp. Upload this screenshot and your Story link in the app.',
      details: [
        'Swipe UP on Instagram Story Insights',
        'Clear screenshot showing "Accounts Reached" & timestamp',
        'Paste public Story link & submit in 1 click',
      ],
    },
    {
      step: 5,
      title: 'Get Paid Instantly into Your Wallet',
      badge: 'Step 5',
      icon: Wallet,
      color: 'from-emerald-500 to-teal-500',
      description:
        'The ScopeSwell Admin audits the authenticity of your screenshot and timestamp. Once approved, your exact earnings (Verified Accounts Reached × City Rate, e.g. 1,500 × €0.03 = €45.00) are instantly deposited into your Wallet Balance in EUR / Credits.',
      details: [
        'Admin audits screenshot authenticity & timestamp',
        'Instant deposit into your available balance',
        'Withdraw directly in EUR with 0 hidden deductions',
      ],
    },
  ];

  const currentStepData = steps[activeStep - 1];

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <section id="creator-guide" className="py-16 md:py-24 bg-[#0b0f17]/30 border-t border-slate-900/80 relative backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-xs font-semibold text-rose-300 mb-3 shadow-sm">
            <Instagram className="w-3.5 h-3.5" />
            <span>Official Creator Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Creator Guide: How to Use the App
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            A simple, 5-step transparent workflow. Post authentic Stories for local spots, submit your 24h Insights screenshot, and get paid per verified unique account reached on <strong className="text-white">scopeswell.com</strong>.
          </p>
        </div>

        {/* PREREQUISITE BANNER: SWITCH TO PROFESSIONAL INSTAGRAM */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-indigo-950/70 border border-rose-500/40 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-500/25">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Mandatory Prerequisite
                </span>
                <span className="text-xs text-amber-300 font-semibold">Takes 30 Seconds</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Switch Your Instagram to a Professional / Creator Account
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                To submit verified proof of Story reach, your Instagram account must be set to <strong>Creator</strong> or <strong>Business mode</strong>. This unlocks official <strong>Instagram Insights</strong> so you can screenshot your unique Accounts Reached.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenInstagramSwitchModal}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <span>View 30-Sec Step Guide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5-STEP WORKFLOW INTERACTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Select Step to Explore:
            </p>
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStep(s.step);
                    setDemoSubmitted(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all border cursor-pointer flex items-center gap-3.5 ${
                    isActive
                      ? 'bg-slate-900 border-rose-500/50 shadow-lg shadow-rose-950/20 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900/90 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md'
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
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-rose-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-black shadow-md">
                    {currentStepData.step}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      {currentStepData.badge} of 5
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk']">
                      {currentStepData.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                  Verified PPR
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-300 mb-2">Key Highlights for this step:</p>
                {currentStepData.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* STEP 4 INTERACTIVE PROOF SUBMIT SIMULATOR */}
              {activeStep === 4 && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4" />
                      Interactive Proof Submission Demo
                    </span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                      Step 4 Live Test
                    </span>
                  </div>

                  {!demoSubmitted ? (
                    <form onSubmit={handleTestSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Public Instagram Story Link:</label>
                        <input
                          type="text"
                          value={demoStoryLink}
                          onChange={(e) => setDemoStoryLink(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 mb-1">Accounts Reached (Insights):</label>
                          <input
                            type="number"
                            value={demoReachCount}
                            onChange={(e) => setDemoReachCount(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Est. Payout (Tallinn €0.03/reach):</label>
                          <div className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-xs flex items-center">
                            €{(demoReachCount * 0.03).toFixed(2)} EUR
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/70 text-center text-slate-400 text-xs">
                        📸 [Sample Story Insights Screenshot Uploaded • Accounts Reached: {demoReachCount.toLocaleString()}]
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Simulate Submit Proof for Verification</span>
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 text-center animate-in fade-in">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-white text-sm">Proof Submitted Successfully!</p>
                      <p className="text-slate-300">
                        Admin queue #4029. Verification in progress: <strong>€{(demoReachCount * 0.03).toFixed(2)} EUR</strong> for {demoReachCount.toLocaleString()} verified accounts reached will be deposited to your wallet.
                      </p>
                      <button
                        onClick={() => setDemoSubmitted(false)}
                        className="mt-2 text-xs text-emerald-400 underline font-semibold cursor-pointer"
                      >
                        Reset Demo
                      </button>
                    </div>
                  )}
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
                      onClick={() => {
                        setActiveStep(num);
                        setDemoSubmitted(false);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeStep === num ? 'bg-rose-500 w-6' : 'bg-slate-700'
                      }`}
                      aria-label={`Go to step ${num}`}
                    />
                  ))}
                </div>

                {activeStep < 5 ? (
                  <button
                    onClick={() => {
                      setActiveStep((prev) => prev + 1);
                      setDemoSubmitted(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-xs font-bold text-white shadow-md hover:from-rose-400 hover:to-amber-400 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Next Step →</span>
                  </button>
                ) : (
                  <a
                    href={APP_CONFIG.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-xs font-bold text-white shadow-md hover:from-rose-400 hover:to-amber-400 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Launch Creator App</span>
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
