import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  ChevronUp,
  Sparkles,
  ArrowRight,
  X,
  Smartphone,
  Eye
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface Milestone {
  id: string;
  label: string;
  anchor: string;
}

const MILESTONES: Milestone[] = [
  { id: 'rates', label: '1:1 Currency & City Rates', anchor: '#rates' },
  { id: 'simulator', label: 'Story & Escrow Simulator', anchor: '#simulator' },
  { id: 'creator-guide', label: '5-Step Story Guide', anchor: '#creator-guide' },
  { id: 'business-guide', label: 'Escrow Refund Protection', anchor: '#business-guide' },
  { id: 'ai-chat', label: 'ScopeSwell AI Chat Assistant', anchor: '#ai-chat' },
];

export const PlatformKnowledgeTracker: React.FC = () => {
  const [visitedMilestones, setVisitedMilestones] = useState<Set<string>>(new Set(['rates']));
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.5;

      MILESTONES.forEach((m) => {
        const el = document.querySelector(m.anchor);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPos >= top - 200) {
            setVisitedMilestones((prev) => {
              if (prev.has(m.id)) return prev;
              const next = new Set(prev);
              next.add(m.id);
              return next;
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercent = Math.round((visitedMilestones.size / MILESTONES.length) * 100);

  useEffect(() => {
    if (progressPercent === 100 && !hasCelebrated) {
      setHasCelebrated(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f43f5e', '#10b981', '#f59e0b', '#6366f1'],
        });
      } catch (_) {}
    }
  }, [progressPercent, hasCelebrated]);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Platform Knowledge Mastery Tracker"
      className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm transition-all"
    >
      <div className="rounded-2xl border border-slate-700/80 bg-[#0c101a]/95 backdrop-blur-xl shadow-2xl p-3.5 sm:p-4 text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-sm">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Knowledge Mastery</span>
                <span className="text-rose-400 font-mono text-[11px] font-extrabold">{progressPercent}%</span>
              </div>
              <div className="text-[10px] text-slate-400">
                {progressPercent === 100 ? 'All concepts mastered!' : 'Explore to unlock full badge'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isExpanded ? 'Collapse' : 'View checklist'}
            >
              <ChevronUp className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2.5">
          <div
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Expanded Checklist */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs animate-in fade-in">
            {MILESTONES.map((m) => {
              const isDone = visitedMilestones.has(m.id);
              return (
                <a
                  key={m.id}
                  href={m.anchor}
                  className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors group"
                >
                  <span className={`text-[11px] ${isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                    {m.label}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-slate-700 shrink-0" />
                  )}
                </a>
              );
            })}

            {progressPercent === 100 && (
              <div className="mt-3 pt-2 border-t border-slate-800">
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Launch App on {APP_CONFIG.appDisplayDomain}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
