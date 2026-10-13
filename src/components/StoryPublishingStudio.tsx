import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Users,
  Coins,
  Heart,
  Flame,
  Volume2,
  VolumeX,
  FastForward,
  Camera,
  Layers,
  Check,
  Copy,
  Info,
  Scan,
  Zap,
  Award,
  Sliders,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Palette,
  Edit3
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { APP_CONFIG } from '../config/constants';

interface StoryCampaign {
  id: string;
  businessName: string;
  city: string;
  category: string;
  creatorHandle: string;
  creatorName: string;
  creatorAvatar: string;
  image: string;
  ratePerReach: number;
  defaultReach: number;
  budgetCap: number;
  tagMention: string;
  linkText: string;
  promoCode: string;
  pollQuestion: string;
  pollOptionA: string;
  pollOptionB: string;
  sliderEmoji: string;
  sliderQuestion: string;
  locationName: string;
  accentColor: string;
}

const CAMPAIGNS: StoryCampaign[] = [
  {
    id: 'telliskivi-roastery',
    businessName: 'Telliskivi Roastery',
    city: 'Tallinn, Estonia',
    category: 'Artisan Coffee & Matcha',
    creatorHandle: 'markus_eats_ee',
    creatorName: 'Markus Kallas',
    creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    image: '/src/assets/images/story_matcha_roastery_1790680079563.jpg',
    ratePerReach: 0.03,
    defaultReach: 1450,
    budgetCap: 60.00,
    tagMention: '@telliskiviroast',
    linkText: 'telliskivi.coffee/vip',
    promoCode: 'ROAST15',
    pollQuestion: 'Matcha Tonic or Single-Origin Espresso?',
    pollOptionA: 'Matcha Tonic 🍵',
    pollOptionB: 'Espresso ☕',
    sliderEmoji: '☕',
    sliderQuestion: 'Rate our new single-origin roast:',
    locationName: 'Telliskivi Loomelinnak, Tallinn',
    accentColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'nordic-crust',
    businessName: 'Nordic Crust Bakery',
    city: 'Tallinn, Estonia',
    category: 'Organic Sourdough Bakery',
    creatorHandle: 'liis_tallinn_life',
    creatorName: 'Liis Tamm',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    image: '/src/assets/images/story_nordic_bakery_1790680066870.jpg',
    ratePerReach: 0.03,
    defaultReach: 1820,
    budgetCap: 75.00,
    tagMention: '@nordiccrust_tln',
    linkText: 'nordiccrust.ee/summer',
    promoCode: 'CRUST10',
    pollQuestion: 'Cardamom Bun or Warm Sourdough?',
    pollOptionA: 'Cardamom 🥐',
    pollOptionB: 'Sourdough 🥖',
    sliderEmoji: '🥐',
    sliderQuestion: 'How fresh is this morning bake?',
    locationName: 'Kalamaja, Tallinn',
    accentColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'kallio-pulse',
    businessName: 'Kallio Pulse Studio',
    city: 'Helsinki, Finland',
    category: 'Reformer Pilates & Wellness',
    creatorHandle: 'emma_helsinki_fit',
    creatorName: 'Emma Virtanen',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    image: '/src/assets/images/story_reformer_pilates_1790680091430.jpg',
    ratePerReach: 0.05,
    defaultReach: 1680,
    budgetCap: 110.00,
    tagMention: '@kalliopulse',
    linkText: 'kalliopulse.fi/first-class',
    promoCode: 'PULSE50',
    pollQuestion: 'Morning Core or Sunset Reformer?',
    pollOptionA: 'Morning ☀️',
    pollOptionB: 'Sunset 🌅',
    sliderEmoji: '🔥',
    sliderQuestion: 'Intensity level for tomorrow:',
    locationName: 'Kallio, Helsinki',
    accentColor: 'from-rose-500 to-pink-600',
  },
  {
    id: 'sodermalm-atelier',
    businessName: 'Södermalm Linen Atelier',
    city: 'Stockholm, Sweden',
    category: 'Sustainable Apparel & Drops',
    creatorHandle: 'astrid_nordic_style',
    creatorName: 'Astrid Lindqvist',
    creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    image: '/src/assets/images/story_boutique_fashion_1790680103659.jpg',
    ratePerReach: 0.06,
    defaultReach: 2100,
    budgetCap: 150.00,
    tagMention: '@soder_atelier',
    linkText: 'soderatelier.se/capsule',
    promoCode: 'NORDIC20',
    pollQuestion: 'Linen Overshirt in Sage or Sand?',
    pollOptionA: 'Sage Green 🌿',
    pollOptionB: 'Sand Beige 🌾',
    sliderEmoji: '😍',
    sliderQuestion: 'Vibe check for autumn drop:',
    locationName: 'Södermalm, Stockholm',
    accentColor: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'botanical-velvet',
    businessName: 'Botanical Velvet Lounge',
    city: 'Riga, Latvia',
    category: 'Artisan Mixology & Music',
    creatorHandle: 'victor_nightlife',
    creatorName: 'Victor Berzins',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    image: '/src/assets/images/story_artisan_cocktail_1790680113642.jpg',
    ratePerReach: 0.03,
    defaultReach: 1350,
    budgetCap: 50.00,
    tagMention: '@botanicalvelvet',
    linkText: 'botanicalvelvet.lv/guestlist',
    promoCode: 'VELVET24',
    pollQuestion: 'Smoked Herbal or Citrus Botanical?',
    pollOptionA: 'Smoked Herbal 🍸',
    pollOptionB: 'Citrus Zest 🍋',
    sliderEmoji: '🍸',
    sliderQuestion: 'Friday evening cocktail mood:',
    locationName: 'Old Town, Riga',
    accentColor: 'from-cyan-500 to-blue-600',
  },
];

type StickerType = 'link' | 'promo' | 'poll' | 'slider' | 'location';
type StoryStage = 'setup' | 'publishing' | 'live' | 'completed';

interface FloatingReaction {
  id: number;
  emoji: string;
  xOffset: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export const StoryPublishingStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(0);
  const [activeSticker, setActiveSticker] = useState<StickerType>('slider');
  const [stage, setStage] = useState<StoryStage>('setup');
  const [simulatedReach, setSimulatedReach] = useState(0);
  const [simulatedHours, setSimulatedHours] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  // Interactive Custom Story State
  const [customHandle, setCustomHandle] = useState('alex_creator_eu');
  const [customBrand, setCustomBrand] = useState('Velvet Roast Co.');
  const [customLink, setCustomLink] = useState('velvetroast.com/deal');
  const [customPromo, setCustomPromo] = useState('SCOPE25');
  const [customReachTarget, setCustomReachTarget] = useState(1750);
  const [customImageIndex, setCustomImageIndex] = useState(0);

  // Boosters
  const [boostPeakHour, setBoostPeakHour] = useState(true);
  const [boostLinkClicks, setBoostLinkClicks] = useState(true);

  // Emoji slider state
  const [sliderValue, setSliderValue] = useState(65);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Scanner state
  const [isScanningProof, setIsScanningProof] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Gamification achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first_broadcast', title: 'First Broadcast', description: 'Publish a 24h Instagram story', icon: '🚀', unlocked: false },
    { id: 'hype_master', title: 'Hype Master', description: 'Slide the emoji slider to 90%+', icon: '🔥', unlocked: false },
    { id: 'escrow_settler', title: 'Escrow Settler', description: 'Unlock a verified EUR payout', icon: '💸', unlocked: false },
    { id: 'scanner_pro', title: 'OCR Proof Detective', description: 'Run the AI Insights scan', icon: '🕵️', unlocked: false },
    { id: 'reaction_storm', title: 'Reaction Storm', description: 'Trigger 6+ live reaction pops', icon: '⚡', unlocked: false },
  ]);
  const [latestBadge, setLatestBadge] = useState<Achievement | null>(null);

  const [pollVotes, setPollVotes] = useState<{ a: number; b: number; selected: 'a' | 'b' | null }>({
    a: 68,
    b: 32,
    selected: null,
  });
  const [copiedPromo, setCopiedPromo] = useState(false);
  const [linkClickedCount, setLinkClickedCount] = useState(38);
  const [reactionCounter, setReactionCounter] = useState(0);

  const presetCampaign = CAMPAIGNS[selectedCampaignIndex];

  // Resolve active campaign based on preset vs custom
  const campaign: StoryCampaign = activeTab === 'presets' ? presetCampaign : {
    id: 'custom-story',
    businessName: customBrand || 'Brand Campaign',
    city: 'Tallinn, Estonia',
    category: 'Custom Brand Campaign',
    creatorHandle: customHandle.replace('@', '') || 'creator_handle',
    creatorName: 'Custom Creator',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    image: CAMPAIGNS[customImageIndex % CAMPAIGNS.length].image,
    ratePerReach: 0.03,
    defaultReach: customReachTarget,
    budgetCap: Number(((customReachTarget * 0.03) * 1.25).toFixed(2)),
    tagMention: `@${(customBrand || 'brand').toLowerCase().replace(/\s+/g, '')}`,
    linkText: customLink || 'myshop.com/vip',
    promoCode: customPromo || 'SAVE20',
    pollQuestion: 'Which offer do you prefer?',
    pollOptionA: 'Specialty Deal 🔥',
    pollOptionB: 'VIP Pass ✨',
    sliderEmoji: '🔥',
    sliderQuestion: 'Rate your hype for this story:',
    locationName: 'Tallinn, Estonia',
    accentColor: 'from-rose-500 to-amber-500',
  };

  const boosterMultiplier = (boostPeakHour ? 1.2 : 1.0) * (boostLinkClicks ? 1.15 : 1.0);
  const targetReach = Math.round(campaign.defaultReach * boosterMultiplier);
  const earnedEUR = (simulatedReach * campaign.ratePerReach).toFixed(2);
  const unspentEscrow = Math.max(0, campaign.budgetCap - Number(earnedEUR)).toFixed(2);

  const timerRef = useRef<number | null>(null);

  // Unlock achievement helper
  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target && !target.unlocked) {
        soundManager.playAchievement();
        setLatestBadge(target);
        setTimeout(() => setLatestBadge(null), 4000);
        return prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
      }
      return prev;
    });
  };

  // Sound toggle
  const handleToggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
  };

  // Switch preset campaign
  const handleSelectCampaign = (index: number) => {
    if (stage === 'publishing') return;
    setSelectedCampaignIndex(index);
    setStage('setup');
    setSimulatedReach(0);
    setSimulatedHours(0);
    setProgressPercent(0);
    setPollVotes({ a: 68, b: 32, selected: null });
    setCopiedPromo(false);
    setIsScanningProof(false);
    setScanStep(0);
  };

  // Tap navigation: previous / next story
  const handleNextStory = () => {
    soundManager.playPop();
    const nextIdx = (selectedCampaignIndex + 1) % CAMPAIGNS.length;
    handleSelectCampaign(nextIdx);
  };

  const handlePrevStory = () => {
    soundManager.playPop();
    const prevIdx = (selectedCampaignIndex - 1 + CAMPAIGNS.length) % CAMPAIGNS.length;
    handleSelectCampaign(prevIdx);
  };

  // Publish action
  const handlePublish = () => {
    soundManager.playShutter();
    setStage('publishing');

    setTimeout(() => {
      setStage('live');
      soundManager.playSuccess();
      unlockAchievement('first_broadcast');
    }, 450);
  };

  // Live simulation loop
  useEffect(() => {
    if (stage !== 'live' || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          handleCompleteStory();
          return 100;
        }
        return prev + 1.2;
      });

      setSimulatedHours((prev) => {
        const next = prev + 0.3;
        return next > 24 ? 24 : Number(next.toFixed(1));
      });

      setSimulatedReach((prev) => {
        const remaining = targetReach - prev;
        if (remaining <= 0) return targetReach;
        const jump = Math.max(12, Math.floor(remaining * 0.05) + Math.floor(Math.random() * 30));
        return Math.min(targetReach, prev + jump);
      });
    }, 140);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, isPaused, targetReach]);

  // Complete story
  const handleCompleteStory = () => {
    setStage('completed');
    setProgressPercent(100);
    setSimulatedReach(targetReach);
    setSimulatedHours(24);
    soundManager.playCoins();
    unlockAchievement('escrow_settler');

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#6366f1'],
    });
  };

  // Fast forward
  const handleFastForward = () => {
    soundManager.playSuccess();
    handleCompleteStory();
  };

  // Reset
  const handleReset = () => {
    setStage('setup');
    setSimulatedReach(0);
    setSimulatedHours(0);
    setProgressPercent(0);
    setReactions([]);
    setIsScanningProof(false);
    setScanStep(0);
  };

  // Reaction spawner
  const handleAddReaction = (emoji: string) => {
    soundManager.playPop();
    const id = Date.now() + Math.random();
    const xOffset = Math.floor(Math.random() * 90) - 45;
    setReactions((prev) => [...prev.slice(-12), { id, emoji, xOffset }]);

    setReactionCounter((prev) => {
      const next = prev + 1;
      if (next >= 6) {
        unlockAchievement('reaction_storm');
      }
      return next;
    });

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2200);
  };

  // Draggable Emoji Slider handler
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    soundManager.playSliderTick();

    if (val >= 90) {
      handleAddReaction(campaign.sliderEmoji || '🔥');
      unlockAchievement('hype_master');
    }
  };

  // Run OCR Proof Scan
  const handleRunProofScan = () => {
    soundManager.playLaserScan();
    setIsScanningProof(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 800);
    setTimeout(() => {
      setScanStep(3);
      soundManager.playCoins();
      unlockAchievement('scanner_pro');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }, 1800);
  };

  // Poll vote
  const handlePollVote = (option: 'a' | 'b') => {
    if (pollVotes.selected) return;
    soundManager.playPop();
    setPollVotes({
      a: option === 'a' ? 78 : 22,
      b: option === 'b' ? 78 : 22,
      selected: option,
    });
  };

  // Promo copy
  const handleCopyPromo = () => {
    soundManager.playPop();
    navigator.clipboard?.writeText(campaign.promoCode);
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2200);
  };

  return (
    <section id="campaign-studio" className="py-20 bg-[#080d16] border-y border-slate-800/80 relative overflow-hidden">
      {/* Dynamic ambient stage lighting matched to active campaign */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[580px] bg-gradient-to-tr from-rose-500/18 via-purple-600/18 to-amber-500/12 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Achievement Unlocked Floating Toast */}
      {latestBadge && (
        <div className="fixed top-20 right-6 z-50 animate-bounce duration-500">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-2xl flex items-center gap-3 border border-white/30 backdrop-blur-md">
            <span className="text-2xl">{latestBadge.icon}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Achievement Unlocked!</p>
              <p className="text-xs font-black">{latestBadge.title}</p>
              <p className="text-[10px] text-white/80">{latestBadge.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-xs font-semibold text-rose-300 mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Interactive 24H Instagram Story Studio & Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Publish, Tap, & Monetize{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">
              Live Instagram Stories
            </span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience the full Pay-Per-Reach lifecycle. Pick a real campaign or design your own, drag the emoji slider, tap stickers, send live reactions, and scan real 24h Insights proof.
          </p>

          {/* Sound & Audio Toggle Strip */}
          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'Story Audio: ON (Chimes & Shutter)' : 'Story Audio: OFF (Click to unmute)'}</span>
            </button>
            <span className="text-xs text-slate-500">·</span>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
              <Coins className="w-3.5 h-3.5" />
              <span>1 Credit = €1.00 EUR Parity</span>
            </div>
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left, 5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Mode Switcher: Preset Brand vs Custom Creator Studio */}
            <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Featured Campaigns</span>
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'custom'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>🎨 Build Custom Story</span>
              </button>
            </div>

            {/* TAB 1: Preset Brand Campaigns */}
            {activeTab === 'presets' ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[11px] font-mono">
                      1
                    </span>
                    <span>Select Brand Campaign</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">5 Nordic/Baltic Demos</span>
                </div>

                <div className="space-y-1.5">
                  {CAMPAIGNS.map((c, idx) => {
                    const isSelected = selectedCampaignIndex === idx;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleSelectCampaign(idx)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800 border-rose-500/60 shadow-md ring-1 ring-rose-500/30'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={c.creatorAvatar}
                            alt=""
                            className={`w-8 h-8 rounded-full object-cover shrink-0 ring-2 ${
                              isSelected ? 'ring-rose-500' : 'ring-slate-700'
                            }`}
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-white truncate">{c.businessName}</p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {c.city} · <span className="text-rose-300">@{c.creatorHandle}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            €{c.ratePerReach.toFixed(2)}/reach
                          </span>
                          <p className="text-[9px] text-slate-400 font-mono">€{c.budgetCap} Escrow</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* TAB 2: Build Custom Story */
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-xl backdrop-blur-md space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4 text-purple-400" />
                    <span>Customize Your Story</span>
                  </span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold font-mono">
                    Custom Mode
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold mb-1 block">Your Creator Handle:</label>
                    <input
                      type="text"
                      value={customHandle}
                      onChange={(e) => setCustomHandle(e.target.value)}
                      placeholder="@your_handle"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold mb-1 block">Brand/Product Name:</label>
                    <input
                      type="text"
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      placeholder="My Store"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-semibold mb-1 block">Select Background Visual:</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {CAMPAIGNS.map((c, i) => (
                      <button
                        key={`custom-bg-${c.id}`}
                        onClick={() => setCustomImageIndex(i)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          customImageIndex === i ? 'border-purple-500 scale-105' : 'border-slate-800 opacity-60'
                        }`}
                      >
                        <img src={c.image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-400">Target Verified Reach:</span>
                    <span className="text-emerald-400 font-mono font-bold">{customReachTarget.toLocaleString()} accounts</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={customReachTarget}
                    onChange={(e) => setCustomReachTarget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Choose Interactive Sticker (Enhanced with Emoji Slider) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[11px] font-mono">
                    2
                  </span>
                  <span>Choose Interactive Sticker</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Tappable Instagram Elements</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveSticker('slider')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeSticker === 'slider'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1">
                    <span>🔥</span>
                    <span>Emoji Slider</span>
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5 truncate">Draggable hype</p>
                </button>

                <button
                  onClick={() => setActiveSticker('link')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeSticker === 'link'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1">
                    <span>🔗</span>
                    <span>Link Sticker</span>
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5 truncate">{campaign.linkText}</p>
                </button>

                <button
                  onClick={() => setActiveSticker('promo')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeSticker === 'promo'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1">
                    <span>🎟️</span>
                    <span>Promo Code</span>
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5 truncate">{campaign.promoCode}</p>
                </button>

                <button
                  onClick={() => setActiveSticker('poll')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeSticker === 'poll'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1">
                    <span>📊</span>
                    <span>Story Poll</span>
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5 truncate">Two choices</p>
                </button>

                <button
                  onClick={() => setActiveSticker('location')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer col-span-2 ${
                    activeSticker === 'location'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold flex items-center gap-1">
                    <span>📍</span>
                    <span>Location Geo-Tag ({campaign.locationName.split(',')[0]})</span>
                  </p>
                  <p className="text-[9px] text-slate-400 mt-0.5 truncate">Verified check-in badge</p>
                </button>
              </div>
            </div>

            {/* Step 3: Performance Multipliers / Boosters */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Story Reach Boosters</span>
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setBoostPeakHour(!boostPeakHour)}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                    boostPeakHour ? 'bg-amber-950/40 border-amber-500 text-amber-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>🌙 Prime Time (19:00)</span>
                    <span className="text-[10px] text-emerald-400">+20% Reach</span>
                  </div>
                </button>

                <button
                  onClick={() => setBoostLinkClicks(!boostLinkClicks)}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                    boostLinkClicks ? 'bg-amber-950/40 border-amber-500 text-amber-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>⚡ Sticker Link Tap</span>
                    <span className="text-[10px] text-emerald-400">+15% Boost</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Publish Action & Simulation Engine */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[11px] font-mono">
                    3
                  </span>
                  <span>Publish Action & Simulation</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Escrow Ready</span>
                </span>
              </div>

              {stage === 'setup' && (
                <button
                  onClick={handlePublish}
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-xl shadow-rose-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Camera className="w-5 h-5" />
                  <span>Publish to 24h Instagram Story</span>
                  <Sparkles className="w-4 h-4 ml-1" />
                </button>
              )}

              {stage === 'live' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>24h Story Live ({simulatedHours}h elapsed)</span>
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{progressPercent.toFixed(0)}%</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{isPaused ? 'Resume Story' : 'Pause'}</span>
                    </button>
                    <button
                      onClick={handleFastForward}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Fast-Forward 24H</span>
                    </button>
                  </div>
                </div>
              )}

              {stage === 'completed' && (
                <div className="space-y-2.5 text-center">
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>24h Story Completed • Verified Unique Reach!</span>
                  </div>

                  {/* OCR Proof Scan Trigger */}
                  <button
                    onClick={handleRunProofScan}
                    disabled={isScanningProof}
                    className="w-full py-3 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Scan className="w-4 h-4" />
                    <span>{isScanningProof ? 'Auditing Insights Proof...' : '🕵️ Run AI OCR Proof Scanner'}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Publish Another Test Campaign</span>
                  </button>
                </div>
              )}

              {/* Achievements Micro-Badge Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Interactive Badges:</span>
                </span>
                <div className="flex gap-1.5">
                  {achievements.map((ach) => (
                    <span
                      key={ach.id}
                      title={`${ach.title}: ${ach.description}`}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-transform ${
                        ach.unlocked
                          ? 'bg-amber-500/30 border border-amber-400/80 scale-110 shadow-sm'
                          : 'bg-slate-800/40 border border-slate-700/50 opacity-40 grayscale'
                      }`}
                    >
                      {ach.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Phone Simulation (Right, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Story Navigation Controls above Phone */}
            <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[370px] mb-2 px-2 text-xs font-semibold text-slate-400">
              <button
                onClick={handlePrevStory}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Story</span>
              </button>
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 font-mono text-slate-300">
                Tap sides to navigate
              </span>
              <button
                onClick={handleNextStory}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <span>Next Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Phone Chassis with 3D feel */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[9/18.5] rounded-[48px] p-3 sm:p-3.5 bg-slate-950 border-[6px] sm:border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_60px_rgba(244,63,94,0.18)] select-none">
              {/* Shutter flash overlay */}
              {stage === 'publishing' && (
                <div className="absolute inset-0 bg-white z-50 animate-shutter-flash pointer-events-none" />
              )}

              {/* Laser Scan Beam for OCR Verification */}
              {isScanningProof && scanStep < 3 && (
                <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-400 shadow-[0_0_15px_#22d3ee] z-40 animate-laser-scan pointer-events-none" />
              )}

              {/* Speaker & camera dynamic island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              </div>

              {/* Story Screen Interior */}
              <div
                className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col justify-between"
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                {/* Background Story Photo */}
                <img
                  src={campaign.image}
                  alt={campaign.businessName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100"
                />

                {/* Ambient Scrims */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none" />

                {/* Left/Right Click Areas to Navigate Stories (Instagram style) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevStory();
                  }}
                  className="absolute top-16 bottom-20 left-0 w-1/4 z-20 cursor-w-resize"
                  title="Previous Story"
                />
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextStory();
                  }}
                  className="absolute top-16 bottom-20 right-0 w-1/4 z-20 cursor-e-resize"
                  title="Next Story"
                />

                {/* Floating Reaction Emojis Rising on Interaction */}
                <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                  {reactions.map((r) => (
                    <div
                      key={r.id}
                      className="absolute bottom-16 left-1/2 text-3xl animate-reaction-rise"
                      style={
                        {
                          '--reaction-x': `${r.xOffset}px`,
                        } as React.CSSProperties
                      }
                    >
                      {r.emoji}
                    </div>
                  ))}
                </div>

                {/* Top Section: Progress Bars & Creator Header */}
                <div className="relative z-20 pt-4 px-3 sm:px-4 pointer-events-none">
                  {/* Instagram Story Segmented Progress Bar */}
                  <div className="flex gap-1 mb-3">
                    <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-100 rounded-full"
                        style={{
                          width: stage === 'setup' ? '0%' : `${progressPercent}%`,
                        }}
                      />
                    </div>
                    <div className="h-1 flex-1 bg-white/20 rounded-full" />
                    <div className="h-1 flex-1 bg-white/20 rounded-full" />
                  </div>

                  {/* Creator Bar with Animated Instagram Story Ring */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-story-ring">
                        <img
                          src={campaign.creatorAvatar}
                          alt={campaign.creatorName}
                          className="w-8 h-8 rounded-full object-cover border-2 border-black"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white leading-tight">
                            @{campaign.creatorHandle}
                          </span>
                          <span className="w-3 h-3 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center font-bold">
                            ✓
                          </span>
                        </div>
                        <p className="text-[10px] text-white/70">
                          {stage === 'live' ? `${simulatedHours}h ago` : '24h Live'} · {campaign.city.split(',')[0]}
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-rose-300 border border-white/20 font-mono">
                      €{campaign.ratePerReach}/reach
                    </span>
                  </div>
                </div>

                {/* Middle Section: Interactive Stickers */}
                <div className="relative z-30 px-4 my-auto space-y-3 pointer-events-auto">
                  {/* Brand Tag Mention Sticker */}
                  <div className="inline-block px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/25 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="text-rose-400">@</span>
                      <span>{campaign.tagMention.replace('@', '')}</span>
                    </p>
                  </div>

                  {/* Sticker 1: DRAGGABLE EMOJI SLIDER (Instagram's Most Famous Sticker) */}
                  {activeSticker === 'slider' && (
                    <div className="w-full max-w-[270px] p-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl space-y-2">
                      <p className="text-xs font-extrabold text-center text-white">
                        {campaign.sliderQuestion}
                      </p>
                      <div className="relative py-2 px-1">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={sliderValue}
                          onChange={handleSliderChange}
                          aria-label="Instagram Story Emoji Slider"
                          className="w-full h-3 bg-gradient-to-r from-slate-700 via-rose-500 to-amber-400 rounded-lg appearance-none cursor-pointer accent-transparent"
                        />
                        {/* Dynamic Floating Emoji on Thumb */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-transform"
                          style={{
                            left: `calc(${sliderValue}% - 14px)`,
                            transform: `scale(${1 + sliderValue * 0.007})`,
                          }}
                        >
                          <span className="text-2xl filter drop-shadow">{campaign.sliderEmoji}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-mono font-semibold">
                        <span>Drag slider</span>
                        <span className="text-amber-300 font-bold">{sliderValue}% Hype</span>
                      </div>
                    </div>
                  )}

                  {/* Sticker 2: LINK STICKER */}
                  {activeSticker === 'link' && (
                    <div
                      onClick={() => {
                        soundManager.playPop();
                        setLinkClickedCount((p) => p + 1);
                        handleAddReaction('🔗');
                      }}
                      className="block w-full max-w-[240px] px-4 py-2.5 rounded-full bg-white text-slate-950 shadow-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black truncate">{campaign.linkText}</span>
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                          ↗
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-600 font-semibold text-left">
                        Tap sticker to visit ({linkClickedCount} visits)
                      </p>
                    </div>
                  )}

                  {/* Sticker 3: PROMO CODE */}
                  {activeSticker === 'promo' && (
                    <div
                      onClick={handleCopyPromo}
                      className="w-full max-w-[240px] p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                        Exclusive Story Discount
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-base font-black tracking-widest font-mono">
                          {campaign.promoCode}
                        </span>
                        <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full font-bold">
                          {copiedPromo ? 'COPIED!' : 'TAP TO COPY'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Sticker 4: INTERACTIVE POLL */}
                  {activeSticker === 'poll' && (
                    <div className="w-full max-w-[260px] p-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl">
                      <p className="text-xs font-extrabold text-center mb-2.5">{campaign.pollQuestion}</p>
                      <div className="space-y-1.5">
                        <button
                          onClick={() => handlePollVote('a')}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            pollVotes.selected === 'a'
                              ? 'bg-rose-500 border-rose-400 text-white'
                              : 'bg-white/10 border-white/20 hover:bg-white/20'
                          }`}
                        >
                          <span>{campaign.pollOptionA}</span>
                          {pollVotes.selected && <span className="font-mono">{pollVotes.a}%</span>}
                        </button>
                        <button
                          onClick={() => handlePollVote('b')}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            pollVotes.selected === 'b'
                              ? 'bg-rose-500 border-rose-400 text-white'
                              : 'bg-white/10 border-white/20 hover:bg-white/20'
                          }`}
                        >
                          <span>{campaign.pollOptionB}</span>
                          {pollVotes.selected && <span className="font-mono">{pollVotes.b}%</span>}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sticker 5: LOCATION TAG */}
                  {activeSticker === 'location' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white shadow-lg text-xs font-bold">
                      <span>📍</span>
                      <span>{campaign.locationName}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Section: Real-Time Verification HUD */}
                <div className="relative z-30 p-3 pb-4 pointer-events-auto">
                  {stage === 'completed' ? (
                    /* Final 24h Insights Proof Modal */
                    <div className="p-3.5 rounded-2xl bg-slate-950/95 border-2 border-emerald-500/80 backdrop-blur-md shadow-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Instagram Story Insights</span>
                        </span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                          {isScanningProof ? (scanStep === 3 ? 'OCR Verified ✓' : 'Auditing...') : 'Verified'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-left pt-1">
                        <div className={`p-1.5 rounded-lg bg-slate-900 border ${scanStep >= 1 ? 'border-cyan-500 shadow-sm shadow-cyan-500/30' : 'border-slate-800'}`}>
                          <p className="text-[9px] text-slate-400">Accounts Reached</p>
                          <p className="text-sm font-extrabold text-emerald-400 font-mono">
                            {targetReach.toLocaleString()}
                          </p>
                        </div>
                        <div className={`p-1.5 rounded-lg bg-slate-900 border ${scanStep >= 2 ? 'border-emerald-500 shadow-sm shadow-emerald-500/30' : 'border-slate-800'}`}>
                          <p className="text-[9px] text-slate-400">Creator Payout</p>
                          <p className="text-sm font-extrabold text-emerald-300 font-mono">
                            €{earnedEUR} EUR
                          </p>
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-300 text-center font-medium">
                        ✨ €{unspentEscrow} unspent escrow refunded to business.
                      </p>
                    </div>
                  ) : (
                    /* Live Running Reach HUD */
                    <div className="p-3 rounded-2xl bg-slate-950/90 border border-rose-500/40 backdrop-blur-md shadow-2xl">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-mono">
                            {simulatedReach.toLocaleString()} Accounts Reached
                          </span>
                        </div>
                        <span className="text-amber-300 font-mono font-bold">
                          €{earnedEUR} EUR
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 pt-1 border-t border-slate-800">
                        <span>{campaign.businessName}</span>
                        <span className="text-emerald-400 font-mono font-bold">
                          €{campaign.ratePerReach}/reach
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Reaction Bar under the phone */}
            <div className="mt-4 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
              <span className="text-xs font-bold text-slate-400 px-2">Tap Reaction:</span>
              <button
                onClick={() => handleAddReaction('❤️')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-base cursor-pointer transform hover:scale-115 active:scale-90 transition-all"
                title="Send Heart"
              >
                ❤️
              </button>
              <button
                onClick={() => handleAddReaction('🔥')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-base cursor-pointer transform hover:scale-115 active:scale-90 transition-all"
                title="Send Fire"
              >
                🔥
              </button>
              <button
                onClick={() => handleAddReaction('👏')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-base cursor-pointer transform hover:scale-115 active:scale-90 transition-all"
                title="Send Clap"
              >
                👏
              </button>
              <button
                onClick={() => handleAddReaction('😍')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-base cursor-pointer transform hover:scale-115 active:scale-90 transition-all"
                title="Send Love"
              >
                😍
              </button>
              <button
                onClick={() => handleAddReaction('☕')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-base cursor-pointer transform hover:scale-115 active:scale-90 transition-all"
                title="Send Coffee"
              >
                ☕
              </button>
              <button
                onClick={() => handleAddReaction('⚡')}
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 flex items-center justify-center text-base cursor-pointer transform hover:scale-115 active:scale-90 transition-all text-white font-bold"
                title="Reaction Storm"
              >
                ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
