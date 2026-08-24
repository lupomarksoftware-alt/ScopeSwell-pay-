import React, { useState } from 'react';
import { Instagram, Store, ShieldCheck, Heart, Sparkles, Mail, Check, Copy, ArrowUpRight } from 'lucide-react';
import { MAIN_EMAIL } from '../utils/notifications';

interface FooterProps {
  onOpenCreatorModal: () => void;
  onOpenBusinessModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCreatorModal,
  onOpenBusinessModal,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MAIN_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold font-['Space_Grotesk'] text-base shadow-md">
                S
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                ScopeSwell <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Pay</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering direct-to-consumer brands, mobile apps, drops, and local spots to sponsor authentic Instagram stories with verified pay-per-view delivery.
            </p>
          </div>

          {/* For Creators */}
          <div className="md:col-span-2 space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">For Creators</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenCreatorModal}
                  className="hover:text-white transition-colors cursor-pointer text-left inline-block py-1.5 sm:py-0"
                >
                  Join Creator Waitlist
                </button>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors inline-block py-1.5 sm:py-0">
                  Earnings Calculator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors inline-block py-1.5 sm:py-0">
                  How 24h Payouts Work
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-white transition-colors inline-block py-1.5 sm:py-0">
                  Browse Ad Formats
                </a>
              </li>
            </ul>
          </div>

          {/* For Brands & Advertisers */}
          <div className="md:col-span-2 space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">For Advertisers</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenBusinessModal}
                  className="hover:text-white transition-colors cursor-pointer text-left inline-block py-1.5 sm:py-0"
                >
                  Register Brand / App Pilot
                </button>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors inline-block py-1.5 sm:py-0">
                  Campaign ROI Estimator
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors inline-block py-1.5 sm:py-0">
                  Compare vs Influencers
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-white transition-colors inline-block py-1.5 sm:py-0">
                  Launch Cities & Reach
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Main Email */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Direct Contact & Intake</p>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                <span className="font-semibold text-white">Central Operations Inbox:</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                <a
                  href={`mailto:${MAIN_EMAIL}`}
                  className="font-mono text-rose-300 hover:text-white transition-colors truncate"
                  title="Send email directly"
                >
                  {MAIN_EMAIL}
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email to clipboard"
                  className="p-2 sm:p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                All creator applications, pilot requests, and direct questions are answered within 24 hours at this address.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} ScopeSwell Pay. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Intake Contact: <a href={`mailto:${MAIN_EMAIL}`} className="text-slate-400 hover:text-white underline">{MAIN_EMAIL}</a> • Independent platform.
          </p>
        </div>
      </div>
    </footer>
  );
};
