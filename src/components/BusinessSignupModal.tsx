import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Store, CheckCircle2, Sparkles, MapPin, Mail, Phone, Globe, Building2, Target, ArrowRight, Shield, ShoppingBag, Smartphone, Tag, Link, Send, Gift, FileText, Zap } from 'lucide-react';
import { BrandCategory, BusinessRegistration, AdFormatType } from '../types';
import { saveBusiness } from '../utils/storage';
import { MAIN_EMAIL, getBusinessMailtoUrl, sendBusinessRegistrationEmail } from '../utils/notifications';

interface BusinessSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
  onBusinessAdded: (business: BusinessRegistration) => void;
}

const BRAND_CATEGORIES: BrandCategory[] = [
  'E-Commerce & DTC Brands',
  'Mobile Apps & Tech Tools',
  'Streetwear & Apparel Drops',
  'Coffee Shop & Cafe',
  'Restaurant & Dining',
  'Gym & Fitness Studio',
  'Bakery & Dessert',
  'Beauty, Wellness & Skincare',
  'Music, Festivals & Events',
  'Local Professional Service',
];

const AD_FORMAT_OPTIONS: AdFormatType[] = [
  'Link Sticker (Website URL)',
  'App Store / Play Store Link',
  'Exclusive Promo Code',
  'Location Tag & Venue Check-in',
];

export const BusinessSignupModal: React.FC<BusinessSignupModalProps> = ({
  isOpen,
  onClose,
  initialCity = '',
  onBusinessAdded,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteOrInstagram, setWebsiteOrInstagram] = useState('');
  const [brandCategory, setBrandCategory] = useState<BrandCategory>('E-Commerce & DTC Brands');
  const [brandType, setBrandType] = useState<'dtc' | 'app' | 'local' | 'event'>('dtc');
  const [isGlobalOrNational, setIsGlobalOrNational] = useState(true);
  const [preferredAdFormats, setPreferredAdFormats] = useState<AdFormatType[]>([
    'Link Sticker (Website URL)',
    'Exclusive Promo Code',
  ]);
  const [city, setCity] = useState(initialCity || 'Austin, TX');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('$400 - $800 / month');
  const [promotionGoal, setPromotionGoal] = useState('');

  const [submittedBusiness, setSubmittedBusiness] = useState<BusinessRegistration | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialCity) {
      setCity(initialCity);
    }
  }, [initialCity]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        resetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleAdFormat = (fmt: AdFormatType) => {
    if (preferredAdFormats.includes(fmt)) {
      if (preferredAdFormats.length > 1) {
        setPreferredAdFormats(preferredAdFormats.filter((f) => f !== fmt));
      }
    } else {
      setPreferredAdFormats([...preferredAdFormats, fmt]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!businessName.trim()) {
      setErrorMsg('Please enter your brand/business name.');
      return;
    }
    if (!contactName.trim()) {
      setErrorMsg('Please enter the contact person name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid business email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const targetViews =
        monthlyBudget === '$150 - $400 / month'
          ? 6000
          : monthlyBudget === '$400 - $800 / month'
          ? 12500
          : monthlyBudget === '$800 - $1,500 / month'
          ? 25000
          : 50000;

      const newBiz = saveBusiness({
        businessName: businessName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone.trim() || '(Unlisted)',
        websiteOrInstagram: websiteOrInstagram.trim() || 'Website/App link pending',
        brandCategory,
        category: brandCategory,
        brandType,
        isGlobalOrNational,
        preferredAdFormats,
        city: isGlobalOrNational ? (city.trim() || 'Nationwide') : (city.trim() || 'Austin, TX'),
        neighborhood: neighborhood.trim() || (isGlobalOrNational ? 'Nationwide / Online' : 'Local Area'),
        address: address.trim() || undefined,
        monthlyBudget,
        targetStoryViews: targetViews,
        promotionGoal: promotionGoal.trim() || 'Drive link clicks, sales, and verified story reach.',
      });

      onBusinessAdded(newBiz);
      setSubmittedBusiness(newBiz);

      // Asynchronously dispatch pilot proposal to the central inbox (lupomarksoftware@gmail.com)
      sendBusinessRegistrationEmail(newBiz).catch((err) => {
        console.warn('Background pilot dispatch warning:', err);
      });

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9333ea', '#6366f1', '#ec4899', '#10b981'],
        });
      } catch (err) {
        console.log('Confetti error', err);
      }
    } catch (err) {
      setErrorMsg('Could not submit pilot request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedBusiness(null);
    onClose();
  };

  return (
    <div
      onClick={resetAndClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl my-auto rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/40 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header - Always pinned */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                Advertiser & Brand Registration
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk'] leading-tight">
                Launch a Pay-Per-View Story Pilot
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-7">
          {submittedBusiness ? (
            /* SUCCESS STATE */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <Gift className="w-8 h-8" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Founding Partner #73 / 100 Locked In!</span>
                </div>
                <h4 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  Pioneer Spot Reserved for {submittedBusiness.businessName}!
                </h4>
                <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                  We're creating your custom <strong className="text-purple-300">9:16 Instagram Story Template Kit</strong> and setting up your creator matching matrix.
                </p>
              </div>

              {/* Pioneer Perks Package Unlocked */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/40 text-left space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/60">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <span>Unlocked Pioneer Perks ($500+ Value):</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300">
                    CLAIMED
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Free Story Template Kit:</strong> Branded Canva/Figma 9:16 layouts</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>+500 Bonus Story Views:</strong> Credited to your first pilot</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>$0 Matchmaking Fee:</strong> 100% goes directly to creator views</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>VIP Priority Matching:</strong> First-access creator pairings</span>
                  </div>
                </div>
              </div>

              {/* Campaign Summary Receipt */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Campaign Reach Scope:</span>
                  <span className="font-semibold text-white">
                    {submittedBusiness.isGlobalOrNational ? '🌐 Nationwide / Online' : `📍 ${submittedBusiness.city}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Target Verified Views:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    ~{submittedBusiness.targetStoryViews.toLocaleString()} views (+500 Bonus Views)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Selected Ad Formats:</span>
                  <span className="font-medium text-purple-300">
                    {submittedBusiness.preferredAdFormats.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Cost-Per-View Guarantee:</span>
                  <span className="font-semibold text-white">Pay strictly for 24h verified views</span>
                </div>
              </div>

              {/* Central Notification Confirmation & Direct Brief Link */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    Pilot Brief & Template Request Sent To:
                  </span>
                  <span className="text-purple-300 font-mono font-bold text-[11px]">{MAIN_EMAIL}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Our campaign team at <strong className="text-slate-300">{MAIN_EMAIL}</strong> will deliver your custom Story Template Kit and creator match roster to <strong className="text-purple-300">{submittedBusiness.email}</strong>.
                </p>
                <a
                  href={getBusinessMailtoUrl(submittedBusiness)}
                  className="w-full py-2.5 px-3 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 border border-purple-700/60 text-xs font-semibold text-purple-200 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-purple-400" />
                  <span>Send Direct Campaign Assets / Logo to {MAIN_EMAIL}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-colors cursor-pointer shadow-lg shadow-purple-900/40"
              >
                Close & Return to ScopeSwell Pay
              </button>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Pioneer 100 Offer Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-indigo-950/60 to-purple-950/70 border border-purple-500/40 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-2 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-300 font-['Space_Grotesk'] uppercase tracking-wider">
                        🎁 First 100 Businesses Offer
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 animate-pulse">
                        28 SPOTS LEFT
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      Get a Free Custom 9:16 Story Template Kit + 500 Bonus Views
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Register your pilot today to receive our branded Canva/Figma Story Template Kit, tested link-sticker hook copies, 500 free bonus story views, and 0% platform match fees.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Key Perk Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-purple-900/60 text-[10px] font-semibold text-purple-200">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Free Story Kit</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>+500 Bonus Views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>$0 Platform Fee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Store className="w-3 h-3 text-pink-400 shrink-0" />
                  <span>24h Fast-Track</span>
                </div>
              </div>
            </div>

            {/* Scope / Distribution Target */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Brand / Campaign Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsGlobalOrNational(true);
                    setBrandType('dtc');
                  }}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    isGlobalOrNational
                      ? 'bg-purple-600/30 border-purple-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Nationwide / Online</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-normal">
                    E-Commerce DTC, Mobile Apps, Software, Digital Drops
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsGlobalOrNational(false);
                    setBrandType('local');
                  }}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    !isGlobalOrNational
                      ? 'bg-purple-600/30 border-purple-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Local / Physical Spot</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-normal">
                    Cafes, Restaurants, Boutiques, Gyms, Venues
                  </p>
                </button>
              </div>
            </div>

            {/* Business & Contact Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Brand or Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. HydraPulse, FocusFlow, Velvet Roasters"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Lin (Founder/Marketing)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            {/* Email & Phone / Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  placeholder="sarah@yourbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Website / App Store / IG Link
                </label>
                <input
                  type="text"
                  placeholder="yourbrand.com or @yourbrand"
                  value={websiteOrInstagram}
                  onChange={(e) => setWebsiteOrInstagram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={brandCategory}
                onChange={(e) => setBrandCategory(e.target.value as BrandCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {BRAND_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Ad Formats */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Target Ad Formats to Test:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AD_FORMAT_OPTIONS.map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => toggleAdFormat(fmt)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer flex items-center justify-between ${
                      preferredAdFormats.includes(fmt)
                        ? 'bg-purple-600/30 border-purple-500 text-white'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate pr-1">{fmt}</span>
                    {preferredAdFormats.includes(fmt) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location details (if local or geo-targeted) */}
            {!isGlobalOrNational && (
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Target City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Austin, TX"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Neighborhood / Radius
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="South Congress / Downtown"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* Pilot Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Pilot Test Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  '$150 - $400 / month',
                  '$400 - $800 / month',
                  '$800 - $1,500 / month',
                  '$1,500+ / month',
                ].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setMonthlyBudget(b)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      monthlyBudget === b
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {b.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Objective */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                What are you promoting? (Offer / Link / Perk)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 25% link sticker discount for our electrolyte stickpacks, or free 30-day Pro trial for our new calendar app."
                value={promotionGoal}
                onChange={(e) => setPromotionGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Template Kit & Pioneer Perks Active Box */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-purple-200">
                <span className="font-bold text-amber-300">Pioneer Partner Perk Included:</span> Your custom 9:16 Instagram Story Template Kit (Canva + Figma) + 500 Bonus Story Views will be attached automatically upon registration.
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Gift className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Securing Pioneer Spot...' : 'Claim Pioneer Spot & Free Story Template Kit (28 Left)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel & Close</span>
                </button>
              </div>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};
