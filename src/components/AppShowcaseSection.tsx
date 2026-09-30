import React, { useState } from 'react';
import {
  Users,
  Store,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Smartphone,
  Eye,
  Wallet,
  Lock,
  FileCheck,
  UploadCloud,
  Check,
  Zap,
  Globe
} from 'lucide-react';
import { UserRole } from '../types';
import { APP_CONFIG } from '../config/constants';

interface AppShowcaseSectionProps {
  onOpenPWAModal: () => void;
  onOpenFeedbackModal?: (type?: any) => void;
}

export const AppShowcaseSection: React.FC<AppShowcaseSectionProps> = ({
  onOpenPWAModal,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');

  return (
    <section id="architecture" className="py-16 md:py-24 bg-slate-950/30 border-t border-slate-900/80 relative backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-amber-300 mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Platform Core Architecture & Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Three Dedicated Roles. One Seamless Platform.
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            ScopeSwell unites <strong className="text-rose-400">Creators</strong>, <strong className="text-purple-400">Businesses</strong>, and <strong className="text-emerald-400">Platform Admins</strong> into a streamlined pay-per-reach engine on <strong className="text-white">scopeswell.com</strong>.
          </p>

          {/* Role Selector Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <button
                onClick={() => setSelectedRole('creator')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'creator'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>1. Creator Role</span>
              </button>

              <button
                onClick={() => setSelectedRole('business')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'business'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>2. Business Role</span>
              </button>

              <button
                onClick={() => setSelectedRole('admin')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>3. Admin Role</span>
              </button>
            </div>
          </div>
        </div>

        {/* ROLE ARCHITECTURE DISPLAY CARD */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950/95 border-2 border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {selectedRole === 'creator' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Creator Experience</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Monetize Real Instagram Engagement</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    No follower minimums. Get paid directly for verified 24h Accounts Reached generated.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-right">
                  <span className="text-[11px] text-slate-400">Fixed Baltic Payout Rate</span>
                  <p className="text-xl font-black text-rose-300 font-mono">€0.03 / reach</p>
                </div>
              </div>

              {/* Creator Key Workflow Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-white">Google Sign-In & Profile</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sign in with Google on <strong className="text-slate-200">scopeswell.com</strong> and connect your Instagram handle (@handle) to verify public metrics.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-white">Browse & 1-Click Apply</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filter open campaigns by city and category. Apply with one click and get matched with relevant local brands.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-white">Post & Upload Proof</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Publish your 24h Story with required mention and link. Upload your Story Insights screenshot to receive instant verified payout in EUR.
                  </p>
                </div>
              </div>

              {/* Requirements & Guarantees */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">
                    Prerequisite: Free Instagram Creator/Business account required for Insights screenshot verification.
                  </span>
                </div>
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold transition-all flex items-center gap-1.5 shadow whitespace-nowrap cursor-pointer"
                >
                  <span>Open Creator App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {selectedRole === 'business' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Business / Brand Experience</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Zero Risk Pay-Per-Reach Marketing</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Never pay upfront flat fees for uncertain results. Funds locked in escrow and unused reach credits refunded automatically.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-right">
                  <span className="text-[11px] text-slate-400">Platform Credits</span>
                  <p className="text-xl font-black text-purple-300 font-mono">1 Credit = €1.00</p>
                </div>
              </div>

              {/* Business Key Workflow Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-white">Top Up Wallet Credits</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deposit credits securely to fund campaigns. 1 Credit = €1.00 EUR held in your secure business balance.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-white">Publish Campaign & Tag</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Set target city, required mention tag (@yourbrand), destination promo link, and guidelines for local creators.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-white">Escrow Lock & Auto-Refund</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Accept creators with automated escrow lock. Only exact verified reach costs are released; all unused credits return to your balance.
                  </p>
                </div>
              </div>

              {/* Business Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-purple-400 shrink-0" />
                  <span className="text-slate-300">
                    Automated Escrow Protection: Funds are never released without verified 24h Insights proof.
                  </span>
                </div>
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all flex items-center gap-1.5 shadow whitespace-nowrap cursor-pointer"
                >
                  <span>Open Business Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {selectedRole === 'admin' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Admin Verification Desk</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Central Audit & Payout Settlement</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Human + verification pipeline ensuring 100% genuine reach, valid timestamps, and automated ledger settlement.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                  <span className="text-[11px] text-slate-400">Security Standard</span>
                  <p className="text-xl font-black text-emerald-300 font-mono">100% Server-Side</p>
                </div>
              </div>

              {/* Admin Key Workflow Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-white">Proof Audit & Inspection</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Admins review uploaded Instagram Story Insights screenshots, validating timestamps, reach metrics, and link stickers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-white">Approve / Reject Proof</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Verify genuine reach counts or flag suspicious submissions for secondary review before releasing funds.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-white">Release Payout & Settle Escrow</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Upon approval, exact earnings (Accounts Reached × Rate) are instantly deposited to the creator wallet, and surplus credits are refunded to the business.
                  </p>
                </div>
              </div>

              {/* Admin Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">
                    Immutable Transaction Ledger: All escrow holds, payouts, and surplus refunds are logged permanently.
                  </span>
                </div>
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all flex items-center gap-1.5 shadow whitespace-nowrap cursor-pointer"
                >
                  <span>Open Platform App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Bottom Launch & PWA Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              Access the live platform app directly on <strong className="text-white">{APP_CONFIG.displayDomain}</strong>.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenPWAModal}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all cursor-pointer text-center"
              >
                PWA Installation Guide
              </button>
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/25 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Launch {APP_CONFIG.displayDomain}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
