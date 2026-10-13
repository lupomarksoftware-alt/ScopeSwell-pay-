import React, { useState, useEffect } from 'react';
import { Sparkles, Radio, X, ChevronUp, ChevronDown, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface LiveEvent {
  id: string;
  avatar: string;
  user: string;
  action: string;
  campaign: string;
  city: string;
  metric: string;
  timeAgo: string;
  type: 'story_published' | 'escrow_locked' | 'payout_settled';
}

const LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'evt-1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    user: 'liis_tallinn_life',
    action: 'published 24h Story with Link Sticker',
    campaign: 'Telliskivi Roastery',
    city: 'Tallinn',
    metric: '480 reach (+€14.40)',
    timeAgo: 'Just now',
    type: 'story_published',
  },
  {
    id: 'evt-2',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    user: 'emma_helsinki_fit',
    action: '24h Story Insights verified',
    campaign: 'Kallio Pulse Studio',
    city: 'Helsinki',
    metric: '€84.00 EUR paid via SEPA',
    timeAgo: '2m ago',
    type: 'payout_settled',
  },
  {
    id: 'evt-3',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80',
    user: 'astrid_nordic_style',
    action: 'Story Campaign accepted',
    campaign: 'Södermalm Linen Atelier',
    city: 'Stockholm',
    metric: '€150.00 Escrow locked',
    timeAgo: '4m ago',
    type: 'escrow_locked',
  },
  {
    id: 'evt-4',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    user: 'victor_nightlife',
    action: 'published Story with Promo Sticker',
    campaign: 'Botanical Velvet Lounge',
    city: 'Riga',
    metric: '720 reach (+€21.60)',
    timeAgo: '6m ago',
    type: 'story_published',
  },
];

export const LiveStoryPublishingTicker: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const event = LIVE_EVENTS[currentEventIndex];

  return (
    <aside
      aria-label="Live Story Activity"
      className="fixed bottom-4 left-4 z-40 max-w-[340px] sm:max-w-[380px] w-full"
    >
      <div className="rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-900 border-b border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-rose-400" />
              <span>Live Story Network</span>
            </span>
            <span className="text-[10px] text-slate-400">· {event.city}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Close Ticker"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isMinimized && (
          <div className="p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shrink-0">
                <img
                  src={event.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-black"
                />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">
                  <span className="text-rose-300">@{event.user}</span>{' '}
                  <span className="text-slate-400 font-normal">{event.action}</span>
                </p>
                <p className="text-[11px] text-slate-300 truncate font-medium">
                  {event.campaign}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-emerald-400 block">
                {event.metric}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {event.timeAgo}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
