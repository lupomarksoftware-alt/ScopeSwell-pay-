import React from 'react';
import { Sparkles, Instagram, Store, ShieldCheck, Mail, Smartphone, Globe, ExternalLink, ArrowUp, Bug, MessageSquare } from 'lucide-react';
import { MAIN_EMAIL } from '../utils/notifications';
import { APP_CONFIG } from '../config/constants';

interface FooterProps {
  onOpenPWAModal: () => void;
  onOpenInstagramSwitchModal: () => void;
  onOpenFeedbackModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPWAModal,
  onOpenInstagramSwitchModal,
  onOpenFeedbackModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a10]/60 border-t border-slate-900/80 text-slate-400 text-xs py-14 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-black font-['Space_Grotesk'] text-base shadow-md">
                S
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight font-['Space_Grotesk']">
                  ScopeSwell <span className="text-rose-400">Platform</span>
                </span>
                <p className="text-[11px] text-slate-500">Official App Documentation & Portal</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Connecting verified local creators with businesses. 100% transparent pay-per-reach model backed by automated escrow and verified 24h Instagram Story Accounts Reached on <strong className="text-white">scopeswell.com</strong>.
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Launch scopeswell.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenFeedbackModal}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Bug className="w-3.5 h-3.5 text-rose-400" />
                <span>Report Issue</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">App Documentation</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#rates" className="hover:text-white transition-colors">
                  Currency & Fixed City Rates
                </a>
              </li>
              <li>
                <a href="#creator-guide" className="hover:text-white transition-colors">
                  Creator Guide & Workflow
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenInstagramSwitchModal}
                  className="text-left hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Instagram Professional Account (30s)
                </button>
              </li>
              <li>
                <a href="#business-guide" className="hover:text-white transition-colors">
                  Business Guide & Automated Escrow
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">
                  Security & Proof Audit Engine
                </a>
              </li>
              <li>
                <a href="#pwa-showcase" className="hover:text-white transition-colors">
                  Interactive Platform Emulator
                </a>
              </li>
            </ul>
          </div>

          {/* City Rates Quick Reference */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fixed City Rates</h4>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li className="flex justify-between">
                <span>Tallinn (Baltic Standard):</span>
                <span className="text-emerald-400 font-bold">€0.03 / reach</span>
              </li>
              <li className="flex justify-between">
                <span>Riga / Vilnius:</span>
                <span className="text-emerald-400 font-bold">€0.03 / reach</span>
              </li>
              <li className="flex justify-between">
                <span>Helsinki / Berlin:</span>
                <span className="text-emerald-400 font-bold">€0.05 / reach</span>
              </li>
              <li className="flex justify-between">
                <span>Stockholm / London / Paris:</span>
                <span className="text-emerald-400 font-bold">€0.06 / reach</span>
              </li>
              <li className="flex justify-between">
                <span>New York / Los Angeles:</span>
                <span className="text-emerald-400 font-bold">€0.07 / reach</span>
              </li>
              <li className="text-[10px] text-slate-500 pt-1">
                * Flat 15% platform service fee handles escrow & audit
              </li>
            </ul>
          </div>

          {/* Feedback & Support Desk */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Feedback Desk</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Encountered a bug or have questions regarding your account or campaigns?
            </p>
            <button
              onClick={onOpenFeedbackModal}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 hover:text-white font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Feedback & Bugs</span>
            </button>
            <a
              href={`mailto:${MAIN_EMAIL}`}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white font-medium text-[11px] break-all pt-1"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-500" />
              <span>{MAIN_EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} ScopeSwell. Official Web App live on scopeswell.com.</p>
          <div className="flex items-center gap-4">
            <a href="#rates" className="hover:text-slate-400">Rate Policy</a>
            <a href="#security" className="hover:text-slate-400">Escrow Terms</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
