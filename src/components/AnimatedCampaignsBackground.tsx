import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, ShieldCheck, Play, Pause, Sparkles, Flame, Radio } from 'lucide-react';

export interface BackgroundStoryCard {
  id: string;
  creatorHandle: string;
  creatorAvatar: string;
  businessName: string;
  city: string;
  ratePerView: number;
  ratePerReach?: number;
  views: number;
  reach?: number;
  image: string;
  tagMention: string;
  linkText: string;
  promoCode?: string;
  hoursAgo: string;
}

export const BACKGROUND_STORIES: BackgroundStoryCard[] = [
  {
    id: 'story-1',
    creatorHandle: 'liis_tallinn_life',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    businessName: 'Nordic Crust Bakery',
    city: 'Tallinn, Estonia',
    ratePerView: 0.03,
    views: 1520,
    image: '/src/assets/images/story_nordic_bakery_1790680066870.jpg',
    tagMention: '@nordiccrust_tln',
    linkText: 'nordiccrust.ee/summer',
    promoCode: 'CRUST10',
    hoursAgo: '22h live',
  },
  {
    id: 'story-2',
    creatorHandle: 'markus_eats_ee',
    creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    businessName: 'Telliskivi Roastery',
    city: 'Tallinn, Estonia',
    ratePerView: 0.03,
    views: 860,
    image: '/src/assets/images/story_matcha_roastery_1790680079563.jpg',
    tagMention: '@telliskiviroast',
    linkText: 'telliskivi.coffee/vip',
    hoursAgo: '23h live',
  },
  {
    id: 'story-3',
    creatorHandle: 'emma_helsinki_fit',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    businessName: 'Kallio Pulse Studio',
    city: 'Helsinki, Finland',
    ratePerView: 0.05,
    views: 1840,
    image: '/src/assets/images/story_reformer_pilates_1790680091430.jpg',
    tagMention: '@kalliopulse',
    linkText: 'kalliopulse.fi/pass',
    promoCode: 'PILATESFREE',
    hoursAgo: '21h live',
  },
  {
    id: 'story-4',
    creatorHandle: 'astrid_nordic_style',
    creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    businessName: 'Södermalm Linen Atelier',
    city: 'Stockholm, Sweden',
    ratePerView: 0.06,
    views: 2150,
    image: '/src/assets/images/story_boutique_fashion_1790680103659.jpg',
    tagMention: '@soder_atelier',
    linkText: 'soderatelier.se/capsule',
    promoCode: 'NORDIC20',
    hoursAgo: '19h live',
  },
  {
    id: 'story-5',
    creatorHandle: 'victor_nightlife',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    businessName: 'Botanical Velvet Lounge',
    city: 'Riga, Latvia',
    ratePerView: 0.03,
    views: 1290,
    image: '/src/assets/images/story_artisan_cocktail_1790680113642.jpg',
    tagMention: '@botanicalvelvet',
    linkText: 'botanicalvelvet.lv/guestlist',
    hoursAgo: '20h live',
  },
];

export const AnimatedCampaignsBackground: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stream1 = [...BACKGROUND_STORIES, ...BACKGROUND_STORIES];
  const stream2 = [
    BACKGROUND_STORIES[2],
    BACKGROUND_STORIES[4],
    BACKGROUND_STORIES[0],
    BACKGROUND_STORIES[3],
    BACKGROUND_STORIES[1],
    BACKGROUND_STORIES[2],
    BACKGROUND_STORIES[4],
    BACKGROUND_STORIES[0],
  ];
  const stream3 = [
    BACKGROUND_STORIES[3],
    BACKGROUND_STORIES[1],
    BACKGROUND_STORIES[4],
    BACKGROUND_STORIES[0],
    BACKGROUND_STORIES[2],
    BACKGROUND_STORIES[3],
    BACKGROUND_STORIES[1],
    BACKGROUND_STORIES[4],
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Deep Obsidian Canvas */}
      <div className="absolute inset-0 bg-[#070a10]" />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.12), rgba(99, 102, 241, 0.08), transparent 70%)`,
        }}
      />

      {/* Multi-tier Atmospheric Glow Cones */}
      <div className="absolute -top-40 left-1/4 w-[900px] h-[750px] bg-gradient-to-br from-rose-600/25 via-purple-600/18 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 -right-20 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-600/20 via-cyan-600/15 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-2/3 -left-20 w-[750px] h-[750px] bg-gradient-to-tr from-purple-600/20 via-rose-600/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/3 w-[950px] h-[650px] bg-gradient-to-t from-pink-600/18 via-amber-600/15 to-transparent rounded-full blur-3xl" />

      {/* Floating Sparkle Nodes */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        <div className="absolute top-1/4 left-1/6 w-3 h-3 rounded-full bg-rose-400 blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-3/5 right-1/4 w-3 h-3 rounded-full bg-cyan-400 blur-[1px] animate-ping" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-amber-400 blur-[1px] animate-ping" style={{ animationDuration: '5s', animationDelay: '3s' }} />
      </div>

      {/* Precision Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" 
      />

      {/* 3D Angled Moving Streams Across the Full Viewport */}
      <div 
        className="absolute inset-0 flex justify-between gap-6 sm:gap-10 lg:gap-14 px-2 sm:px-8 lg:px-14 opacity-60 transition-opacity duration-700"
        style={{
          perspective: '1400px',
          transform: 'rotate(-4deg) scale(1.1) translateY(-40px)',
          transformOrigin: 'center center',
        }}
      >
        {/* Stream Column 1: Drifting Upwards (Left Edge) */}
        <div className="w-52 sm:w-60 lg:w-64 flex flex-col gap-8">
          <div
            className={`flex flex-col gap-8 ${
              isPlaying ? 'animate-stream-up' : ''
            }`}
            style={{ willChange: 'transform' }}
          >
            {stream1.map((story, idx) => {
              const payout = (story.views * story.ratePerView).toFixed(2);
              return (
                <div
                  key={`col1-${story.id}-${idx}`}
                  className="relative w-full h-[410px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl shadow-rose-950/40"
                >
                  <img
                    src={story.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/90 pointer-events-none" />

                  <div className="relative z-10 p-4 pt-4">
                    <div className="flex gap-1 mb-2.5">
                      <div className="h-0.5 flex-1 bg-white rounded-full"></div>
                      <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={story.creatorAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-rose-500 shadow-md"
                        />
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">
                            @{story.creatorHandle}
                          </p>
                          <p className="text-[10px] text-slate-300 font-medium">
                            {story.city}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-rose-300 border border-white/20">
                        €{story.ratePerView}/reach
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 px-4 space-y-2 mt-12">
                    <div className="inline-block px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 shadow-lg">
                      <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span>🏷️</span>
                        <span>{story.tagMention}</span>
                      </p>
                    </div>
                    <div className="block px-3 py-1 rounded-full bg-white text-slate-950 text-[10px] font-extrabold shadow-md truncate max-w-[190px]">
                      🔗 {story.linkText}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="p-3 rounded-2xl bg-slate-950/95 border border-emerald-500/50 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-mono">{story.views.toLocaleString()} reach</span>
                        </div>
                        <span className="text-emerald-300 font-mono font-extrabold">
                          €{payout} EUR
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full w-[90%]"></div>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5">
                        <span className="font-medium">{story.businessName}</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stream Column 2: Drifting Downwards (Center-Left) */}
        <div className="hidden md:flex w-52 sm:w-60 lg:w-64 flex-col gap-8">
          <div
            className={`flex flex-col gap-8 ${
              isPlaying ? 'animate-stream-down' : ''
            }`}
            style={{ willChange: 'transform' }}
          >
            {stream2.map((story, idx) => {
              const payout = (story.views * story.ratePerView).toFixed(2);
              return (
                <div
                  key={`col2-${story.id}-${idx}`}
                  className="relative w-full h-[410px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl shadow-indigo-950/40"
                >
                  <img
                    src={story.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/90 pointer-events-none" />

                  <div className="relative z-10 p-4 pt-4">
                    <div className="flex gap-1 mb-2.5">
                      <div className="h-0.5 flex-1 bg-white rounded-full"></div>
                      <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={story.creatorAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500 shadow-md"
                        />
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">
                            @{story.creatorHandle}
                          </p>
                          <p className="text-[10px] text-slate-300 font-medium">
                            {story.city}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-indigo-300 border border-white/20">
                        €{story.ratePerView}/reach
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 px-4 space-y-2 mt-12">
                    <div className="inline-block px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 shadow-lg">
                      <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span>✨</span>
                        <span>{story.tagMention}</span>
                      </p>
                    </div>
                    <div className="block px-3 py-1 rounded-full bg-white text-slate-950 text-[10px] font-extrabold shadow-md truncate max-w-[190px]">
                      🔗 {story.linkText}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="p-3 rounded-2xl bg-slate-950/95 border border-cyan-500/50 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-cyan-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-mono">{story.views.toLocaleString()} reach</span>
                        </div>
                        <span className="text-cyan-300 font-mono font-extrabold">
                          €{payout} EUR
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full w-[85%]"></div>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5">
                        <span className="font-medium">{story.businessName}</span>
                        <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stream Column 3: Drifting Upwards (Center-Right) */}
        <div className="hidden lg:flex w-52 sm:w-60 lg:w-64 flex-col gap-8">
          <div
            className={`flex flex-col gap-8 ${
              isPlaying ? 'animate-stream-up-slow' : ''
            }`}
            style={{ willChange: 'transform' }}
          >
            {stream3.map((story, idx) => {
              const payout = (story.views * story.ratePerView).toFixed(2);
              return (
                <div
                  key={`col3-${story.id}-${idx}`}
                  className="relative w-full h-[410px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl shadow-purple-950/40"
                >
                  <img
                    src={story.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/90 pointer-events-none" />

                  <div className="relative z-10 p-4 pt-4">
                    <div className="flex gap-1 mb-2.5">
                      <div className="h-0.5 flex-1 bg-white rounded-full"></div>
                      <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={story.creatorAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500 shadow-md"
                        />
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">
                            @{story.creatorHandle}
                          </p>
                          <p className="text-[10px] text-slate-300 font-medium">
                            {story.city}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-purple-300 border border-white/20">
                        €{story.ratePerView}/reach
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 px-4 space-y-2 mt-12">
                    <div className="inline-block px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 shadow-lg">
                      <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span>📍</span>
                        <span>{story.tagMention}</span>
                      </p>
                    </div>
                    <div className="block px-3 py-1 rounded-full bg-white text-slate-950 text-[10px] font-extrabold shadow-md truncate max-w-[190px]">
                      🔗 {story.linkText}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="p-3 rounded-2xl bg-slate-950/95 border border-purple-500/50 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-mono">{story.views.toLocaleString()} reach</span>
                        </div>
                        <span className="text-purple-300 font-mono font-extrabold">
                          €{payout} EUR
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-400 to-indigo-400 h-full rounded-full w-[88%]"></div>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5">
                        <span className="font-medium">{story.businessName}</span>
                        <span className="text-purple-400 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stream Column 4: Drifting Downwards (Right Edge) */}
        <div className="hidden xl:flex w-52 sm:w-60 lg:w-64 flex-col gap-8">
          <div
            className={`flex flex-col gap-8 ${
              isPlaying ? 'animate-stream-down' : ''
            }`}
            style={{ willChange: 'transform' }}
          >
            {stream1.slice().reverse().map((story, idx) => {
              const payout = (story.views * story.ratePerView).toFixed(2);
              return (
                <div
                  key={`col4-${story.id}-${idx}`}
                  className="relative w-full h-[410px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl shadow-amber-950/40"
                >
                  <img
                    src={story.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/90 pointer-events-none" />

                  <div className="relative z-10 p-4 pt-4">
                    <div className="flex gap-1 mb-2.5">
                      <div className="h-0.5 flex-1 bg-white rounded-full"></div>
                      <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={story.creatorAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-amber-500 shadow-md"
                        />
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">
                            @{story.creatorHandle}
                          </p>
                          <p className="text-[10px] text-slate-300 font-medium">
                            {story.city}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-white/20">
                        €{story.ratePerView}/reach
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 px-4 space-y-2 mt-12">
                    <div className="inline-block px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 shadow-lg">
                      <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span>🏷️</span>
                        <span>{story.tagMention}</span>
                      </p>
                    </div>
                    <div className="block px-3 py-1 rounded-full bg-white text-slate-950 text-[10px] font-extrabold shadow-md truncate max-w-[190px]">
                      🔗 {story.linkText}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="p-3 rounded-2xl bg-slate-950/95 border border-amber-500/50 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-mono">{story.views.toLocaleString()} reach</span>
                        </div>
                        <span className="text-amber-300 font-mono font-extrabold">
                          €{payout} EUR
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-400 to-rose-400 h-full rounded-full w-[92%]"></div>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5">
                        <span className="font-medium">{story.businessName}</span>
                        <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5" /> Settled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Balanced Scrim: Ensures text is crystal clear while stories remain visible throughout entire page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070a10]/60 via-[#070a10]/75 to-[#070a10]/90 pointer-events-none" />

      {/* Floating Ambient Motion Control Pill */}
      <div className="absolute top-24 right-6 z-30 pointer-events-auto hidden xl:block">
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-rose-500/50 backdrop-blur-md transition-all shadow-xl cursor-pointer"
          title={isPlaying ? 'Pause Background Motion' : 'Resume Background Motion'}
        >
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px]">Ambient Motion</span>
              <Pause className="w-3 h-3 text-slate-400" />
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <span className="text-[11px]">Motion Paused</span>
              <Play className="w-3 h-3 text-emerald-400" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
