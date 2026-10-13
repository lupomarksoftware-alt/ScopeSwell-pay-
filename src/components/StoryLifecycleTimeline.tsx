import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  Smartphone,
  Eye,
  Camera,
  Coins,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  BarChart3
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface TimelineStep {
  timeLabel: string;
  stageName: string;
  title: string;
  description: string;
  creatorAction: string;
  businessAction: string;
  systemAction: string;
  badge: string;
  icon: React.ReactNode;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    timeLabel: '00:00:00',
    stageName: 'Stage 1',
    title: 'Campaign Deposit & Automated Escrow Lock',
    description: 'The business sets their Pay-Per-Reach rate (e.g. €0.03/reach in Tallinn) and caps total budget. 1 Credit = €1.00 EUR.',
    creatorAction: 'Browses curated local brand offers on scopeswell.com matching their audience niche.',
    businessAction: 'Pre-funds campaign budget securely into automated escrow with zero retainer waste.',
    systemAction: 'ScopeSwell locks funds in escrow smart contract and notifies matched creator accounts.',
    badge: 'Escrow Locked',
    icon: <Lock className="w-5 h-5 text-purple-400" />,
  },
  {
    timeLabel: '00:05:00',
    stageName: 'Stage 2',
    title: 'Creator Acceptance & Story Production',
    description: 'Creator accepts the campaign. They receive official 9:16 brand creative assets, link sticker URLs, and promo tags.',
    creatorAction: 'Reviews guidelines, prepares their authentic 24-hour Instagram Story, and adds link stickers.',
    businessAction: 'Monitors real-time acceptance status directly on their business dashboard.',
    systemAction: 'Generates tracked attribution stickers and registers 24-hour verification window.',
    badge: 'Story Ready',
    icon: <Camera className="w-5 h-5 text-amber-400" />,
  },
  {
    timeLabel: '00:06:00',
    stageName: 'Stage 3',
    title: 'Story Goes Live on Instagram (24H Clock Starts)',
    description: 'Creator posts the story publicly on their Instagram Profile. The 24-hour active lifespan officially begins.',
    creatorAction: 'Shares story to their authentic followers with active link stickers and business mention.',
    businessAction: 'Receives instant notification that the campaign is officially broadcast live.',
    systemAction: 'Initiates 24-hour tracking timer and confirms story presence via Instagram API.',
    badge: 'Broadcast Live',
    icon: <Smartphone className="w-5 h-5 text-rose-400" />,
  },
  {
    timeLabel: '12:00:00',
    stageName: 'Stage 4',
    title: 'Midday Reach Surge & Sticker Tap Conversions',
    description: 'Real peer followers view the story, tap the link sticker, and redeem exclusive promo codes throughout the day.',
    creatorAction: 'Interacts with follower DMs, polls, and comments naturally as trust builds.',
    businessAction: 'Experiences incoming referral traffic and direct promo code checkouts.',
    systemAction: 'Simulates reach distribution curves and validates organic peer impressions.',
    badge: 'Peer Engagement',
    icon: <Eye className="w-5 h-5 text-cyan-400" />,
  },
  {
    timeLabel: '23:59:00',
    stageName: 'Stage 5',
    title: '24-Hour Expiration & Story Insights Generation',
    description: 'The story completes its full 24-hour public broadcast. Instagram automatically generates official Story Insights.',
    creatorAction: 'Navigates to Instagram Story Archive and takes a clean screenshot of Accounts Reached.',
    businessAction: 'Awaits automated audit confirmation for final reach count.',
    systemAction: 'Prepares the audit verification pipeline and calculates final escrow allocation.',
    badge: 'Insights Captured',
    icon: <BarChart3 className="w-5 h-5 text-indigo-400" />,
  },
  {
    timeLabel: '24:00:00',
    stageName: 'Stage 6',
    title: 'AI Proof Verification & Instant EUR Settlement',
    description: 'Creator uploads the Insights screenshot. Proof is audited in seconds. Escrow pays creator and auto-refunds unused budget.',
    creatorAction: 'Receives instant EUR wallet credit at the fixed rate per verified unique account reached.',
    businessAction: 'Receives transparent proof audit card; unspent escrow credits returned immediately.',
    systemAction: 'Releases creator funds, executes escrow refund, and logs cryptographic audit record.',
    badge: 'Payout Settled',
    icon: <Coins className="w-5 h-5 text-emerald-400" />,
  },
];

export const StoryLifecycleTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = TIMELINE_STEPS[activeStepIndex];

  const handleSelectStep = (idx: number) => {
    soundManager.playPop();
    setActiveStepIndex(idx);
  };

  return (
    <section id="campaign-lifecycle" className="py-20 bg-[#070b13] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-purple-600/10 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-semibold text-purple-300 mb-4 shadow-sm backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>The 24-Hour Lifecycle of an Instagram Story Campaign</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            How Every Story Campaign{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
              Flows from Escrow to Payout
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Click through each milestone to see exactly what happens between business deposit, 24-hour Instagram story broadcast, reach auditing, and final payout.
          </p>
        </div>

        {/* Milestone Stepper Bar */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {TIMELINE_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.timeLabel}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-800 border-rose-500/80 shadow-lg ring-1 ring-rose-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                      {step.timeLabel}
                    </span>
                    <div className={isActive ? 'text-rose-400' : 'text-slate-500'}>
                      {step.icon}
                    </div>
                  </div>
                  <p className={`text-xs font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title.split('&')[0].trim()}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {step.badge}
                  </span>

                  {/* Active bottom accent line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                  {activeStep.timeLabel}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {activeStep.stageName}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeStep.badge}</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeStep.title}
              </h3>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {activeStep.description}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => handleSelectStep(Math.max(0, activeStepIndex - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 cursor-pointer"
              >
                ← Previous Stage
              </button>
              <button
                disabled={activeStepIndex === TIMELINE_STEPS.length - 1}
                onClick={() => handleSelectStep(Math.min(TIMELINE_STEPS.length - 1, activeStepIndex + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:pointer-events-none text-white cursor-pointer"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* 3 Participant Perspectives in This Stage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-2 text-rose-400 font-bold text-xs">
                <span className="text-base">📸</span>
                <span>Creator Perspective:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.creatorAction}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-xs">
                <span className="text-base">🏢</span>
                <span>Business & Escrow Perspective:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.businessAction}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
                <span className="text-base">⚙️</span>
                <span>ScopeSwell Engine:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.systemAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
