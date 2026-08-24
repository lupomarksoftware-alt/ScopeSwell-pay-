import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Store, CheckCircle2, Sparkles, MapPin, Mail, Phone, Globe, Building2, Target, ArrowRight, Shield, ShoppingBag, Smartphone, Tag, Link, Send } from 'lucide-react';
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
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  Pilot Request Received for {submittedBusiness.businessName}!
                </h4>
                <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                  We're setting up your story ad campaign matching matrix. You will receive custom creator profile recommendations within 24 hours.
                </p>
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
                    ~{submittedBusiness.targetStoryViews.toLocaleString()} views
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
                    Pilot Proposal Dispatched To:
                  </span>
                  <span className="text-purple-300 font-mono font-bold text-[11px]">{MAIN_EMAIL}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Our campaign desk at <strong className="text-slate-300">{MAIN_EMAIL}</strong> will review your target audience and match relevant creators.
                </p>
                <a
                  href={getBusinessMailtoUrl(submittedBusiness)}
                  className="w-full py-2.5 px-3 rounded-xl bg-purple-950/70 hover:bg-purple-900/80 border border-purple-700/60 text-xs font-semibold text-purple-200 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-purple-400" />
                  <span>Send Campaign Assets / Brief to {MAIN_EMAIL}</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200">
                💡 <strong>Next step:</strong> Our brand concierge will follow up at <strong>{submittedBusiness.email}</strong> with your tailored creator roster & link sticker plan.
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
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

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Store className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering Pilot...' : 'Submit Advertiser Pilot Request'}</span>
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
