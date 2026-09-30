import React from 'react';
import { ShieldCheck, Lock, Cpu, FileText, CheckCircle2, AlertTriangle, Eye, ArrowRight } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Server-Side Authorization & Balance Protection',
      subtitle: 'Tamper-Proof Escrow Engine',
      color: 'from-emerald-500 to-teal-500',
      description:
        'All wallet credit balances, transaction settlements, and escrow holds are authorized server-side. State cannot be altered, forged, or spoofed via browser developer tools or client-side tampering.',
      checks: [
        'Isolated server-authoritative balance calculations',
        'Cryptographically signed transaction payloads',
        'Zero client-side credit manipulations permitted',
      ],
    },
    {
      icon: Cpu,
      title: 'Human + AI Multi-Layer Proof Audit',
      subtitle: 'Metadata & Timestamp Validation',
      color: 'from-purple-500 to-indigo-500',
      description:
        'Proof screenshots submitted by creators undergo rigorous automated and human validation. Systems check image metadata integrity, timestamp conformity within 24–48 hours, and metric consistency against baseline account reach.',
      checks: [
        'Automated OCR & metadata integrity validation',
        'Strict 24h to 48h posting window enforcement',
        'Outlier & sudden bot surge anomaly detection',
      ],
    },
    {
      icon: FileText,
      title: 'Immutable Transaction Ledger & Audit Trail',
      subtitle: 'Complete Financial Accountability',
      color: 'from-amber-500 to-orange-500',
      description:
        'Every financial event—from wallet top-ups, escrow locks, creator payout releases, to surplus refunds—is permanently logged in an immutable transaction history accessible to both businesses and creators.',
      checks: [
        'Permanent logging for every Credit deposit and withdrawal',
        'Timestamped escrow locks tied directly to active campaign IDs',
        'Transparent proof-of-work link and screenshot archive',
      ],
    },
  ];

  return (
    <section id="security" className="py-16 md:py-24 bg-[#080c14]/30 border-t border-slate-900/80 relative overflow-hidden backdrop-blur-[1px]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-300 mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bank-Grade Escrow Security</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Security & Fraud Protection Architecture
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            How ScopeSwell safeguards brand budgets, audits genuine Instagram Story Accounts Reached, and ensures creators receive guaranteed payouts.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      Pillar 0{idx + 1}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 font-['Space_Grotesk']">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  {pillar.checks.map((chk, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Traditional Problem</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Flat upfront fees & screenshot tampering risk in old influencer deals
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Traditional agencies ask brands to wire thousands upfront with zero reach guarantees. Unverified creators often post for 2 hours and delete, or spoof viewer metrics.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
              <div className="inline-flex items-center gap-1.5 text-emerald-300 text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>The ScopeSwell Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium leading-relaxed">
                With ScopeSwell, funds are held in automated escrow and paid out <strong className="text-white">strictly after 24-hour verification</strong>. If a creator fails to post or submits invalid proof, your escrow credits are released 100% back to your balance automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
