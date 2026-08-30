import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Instagram, CheckCircle2, Sparkles, DollarSign, MapPin, Mail, Phone, Copy, Check, ArrowRight, Share2, Shield, Link, Smartphone, ShoppingBag, Tag, Store, Send } from 'lucide-react';
import { CreatorNiche, CreatorRegistration, PayoutMethod, AdFormatType } from '../types';
import { saveCreator } from '../utils/storage';
import { MAIN_EMAIL, getCreatorMailtoUrl, sendCreatorRegistrationEmail } from '../utils/notifications';

interface CreatorSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
  onCreatorAdded: (creator: CreatorRegistration) => void;
}

const ALL_NICHES: { label: CreatorNiche; emoji: string }[] = [
  { label: 'Coffee Shop & Cafe', emoji: '📦' },
  { label: 'Restaurant & Dining', emoji: '📱' },
  { label: 'Gym & Fitness Studio', emoji: '👟' },
  { label: 'Bakery & Dessert', emoji: '🍕' },
  { label: 'Beauty Salon, Spa & Skincare', emoji: '🧘' },
  { label: 'Boutique & Local Retail', emoji: '✨' },
  { label: 'Music, Festivals & Events', emoji: '🎟️' },
  { label: 'Bars, Pubs & Nightlife', emoji: '🎮' },
  { label: 'Local Services & Experiences', emoji: '🌆' },
];

const AD_FORMATS: { label: AdFormatType; desc: string }[] = [
  { label: 'Menu / Booking Link Sticker', desc: 'Direct link to online stores & products' },
  { label: 'Event Ticket Link', desc: 'Download link for iOS & Android apps' },
  { label: 'In-Store Promo Code', desc: 'Special discount code for your followers' },
  { label: 'Location Tag & Venue Check-in', desc: 'Tag local spot or physical store' },
];

export const CreatorSignupModal: React.FC<CreatorSignupModalProps> = ({
  isOpen,
  onClose,
  initialCity = '',
  onCreatorAdded,
}) => {
  const [fullName, setFullName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [city, setCity] = useState(initialCity || 'Austin, TX');
  const [neighborhood, setNeighborhood] = useState('');
  const [avgViews, setAvgViews] = useState<number>(550);
  const [selectedNiches, setSelectedNiches] = useState<CreatorNiche[]>([
    'Coffee Shop & Cafe',
    'Restaurant & Dining',
  ]);
  const [preferredAdFormats, setPreferredAdFormats] = useState<AdFormatType[]>([
    'Menu / Booking Link Sticker',
    'Event Ticket Link',
    'In-Store Promo Code',
  ]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod>('Venmo');
  const [payoutHandle, setPayoutHandle] = useState('');
  const [referralSource, setReferralSource] = useState('Friend / Social Media');

  const [submittedCreator, setSubmittedCreator] = useState<CreatorRegistration | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
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

  const toggleNiche = (niche: CreatorNiche) => {
    if (selectedNiches.includes(niche)) {
      if (selectedNiches.length > 1) {
        setSelectedNiches(selectedNiches.filter((n) => n !== niche));
      }
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  };

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

    if (!fullName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const cleanHandle = instagramHandle.trim().replace(/^@+/, '');
    if (!cleanHandle) {
      setErrorMsg('Please enter your Instagram handle.');
      return;
    }

    if (!city.trim()) {
      setErrorMsg('Please enter your city.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address to receive campaign invites.');
      return;
    }

    setIsSubmitting(true);

    try {
      const viewsRange =
        avgViews < 300
          ? '100 - 300 views'
          : avgViews < 700
          ? '300 - 700 views'
          : avgViews < 1500
          ? '700 - 1,500 views'
          : '1,500+ views';

      const newCreator = saveCreator({
        fullName: fullName.trim(),
        instagramHandle: cleanHandle,
        city: city.trim(),
        neighborhood: neighborhood.trim() || 'Downtown / Local Area',
        avgViewsRange: viewsRange,
        estimatedAvgViews: avgViews,
        niches: selectedNiches,
        preferredAdFormats,
        email: email.trim(),
        phone: phone.trim() || undefined,
        payoutMethod,
        payoutHandle: payoutHandle.trim() || `@${cleanHandle}`,
        referralSource,
      });

      onCreatorAdded(newCreator);
      setSubmittedCreator(newCreator);

      // Asynchronously dispatch registration to the central inbox (lupomarksoftware@gmail.com)
      sendCreatorRegistrationEmail(newCreator).catch((err) => {
        console.warn('Background notification dispatch warning:', err);
      });

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fbbf24', '#a855f7', '#10b981'],
        });
      } catch (err) {
        console.log('Confetti triggered', err);
      }
    } catch (err) {
      setErrorMsg('Something went wrong saving your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReferral = () => {
    if (!submittedCreator) return;
    const refLink = `${window.location.origin}?ref=${submittedCreator.instagramHandle}`;
    navigator.clipboard.writeText(refLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const resetAndClose = () => {
    setSubmittedCreator(null);
    onClose();
  };

  return (
    <div
      onClick={resetAndClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl my-auto rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl shadow-rose-950/40 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Header - Pinned */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                Creator Early Access
              </span>
              <h2 id="creator-modal-title" className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk'] leading-tight">
                Get Paid for Story Views
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close dialog"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1">
          {submittedCreator ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
                  You're in the Launch Queue! 🎉
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                  Welcome aboard, <strong className="text-white">@{submittedCreator.instagramHandle}</strong>. You are{' '}
                  <span className="text-rose-400 font-bold font-mono">#{submittedCreator.queueNumber}</span> in line for brand & app campaign invites in {submittedCreator.city}.
                </p>
              </div>

              {/* Ticket Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 shadow-inner">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Creator Pass:</span>
                  <span className="text-emerald-400 font-mono font-bold">ACTIVE REGISTRATION</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Location:</span>
                    <p className="font-semibold text-white">{submittedCreator.neighborhood}, {submittedCreator.city}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Est. Payout / Story:</span>
                    <p className="font-semibold text-emerald-400 font-mono">
                      ~${((submittedCreator.estimatedAvgViews / 100) * 6.5).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="text-xs pt-1">
                  <span className="text-slate-400">Preferred Payout:</span>
                  <p className="font-semibold text-slate-200">
                    {submittedCreator.payoutMethod} ({submittedCreator.payoutHandle || `@${submittedCreator.instagramHandle}`})
                  </p>
                </div>
              </div>

              {/* Direct Mail Notification Confirmation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    Central Intake Notification:
                  </span>
                  <span className="text-rose-300 font-mono font-bold text-[11px]">{MAIN_EMAIL}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Your creator details have been queued for matching. You can also send your media kit or questions directly to our managing desk.
                </p>
                <a
                  href={getCreatorMailtoUrl(submittedCreator)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-rose-500/40 text-xs font-semibold text-rose-300 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-rose-400" />
                  <span>Email Management Desk ({MAIN_EMAIL})</span>
                </a>
              </div>

              {/* Referral Boost */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-left space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Bump your queue position!</span>
                </div>
                <p className="text-xs text-slate-300">
                  Share your link with friends. When 3 friends sign up, you get fast-tracked for the first batch of brand invites.
                </p>

                <div className="flex gap-2 pt-1">
                  <input
                    readOnly
                    aria-label="Your referral link"
                    value={`${window.location.origin}?ref=${submittedCreator.instagramHandle}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-mono truncate"
                  />
                  <button
                    onClick={handleCopyReferral}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 text-xs text-slate-300 text-left space-y-1.5 border border-slate-700/60">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <span>What happens next:</span>
                </p>
                <p>1. We match your profile with local restaurants, gyms, salons, and boutiques looking for authentic story shoutouts.</p>
                <p>2. You receive an invite with the offer details, link sticker/code, and payout rate per 100 views.</p>
                <p>3. You decide whether to post — 100% voluntary, no spam.</p>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-200 font-medium" role="alert">
                  {errorMsg}
                </div>
              )}

              {/* Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="creator-full-name" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="creator-full-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label htmlFor="creator-instagram-handle" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Instagram Handle <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm" aria-hidden="true">@</span>
                    <input
                      id="creator-instagram-handle"
                      type="text"
                      required
                      placeholder="your_handle"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value.replace(/^@+/, ''))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* City & Neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="creator-city" className="block text-xs font-bold text-slate-300 mb-1.5">
                    City & State / Country <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="creator-city"
                    type="text"
                    required
                    placeholder="e.g. Austin, TX"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label htmlFor="creator-neighborhood" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Neighborhood / Area
                  </label>
                  <input
                    id="creator-neighborhood"
                    type="text"
                    placeholder="e.g. South Congress / East Side"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Typical Story Views Slider */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="creator-typical-views-slider" className="font-bold text-slate-300">Average Story Views:</label>
                  <span className="font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    ~{avgViews} views (est. ${((avgViews / 100) * 6.5).toFixed(2)} / story)
                  </span>
                </div>
                <input
                  id="creator-typical-views-slider"
                  type="range"
                  min={50}
                  max={2500}
                  step={25}
                  value={avgViews}
                  aria-label="Average Story Views"
                  aria-valuemin={50}
                  aria-valuemax={2500}
                  aria-valuenow={avgViews}
                  aria-valuetext={`Approximately ${avgViews} views`}
                  onChange={(e) => setAvgViews(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>50 views (micro)</span>
                  <span>1,000 views</span>
                  <span>2,500+ views</span>
                </div>
              </div>

              {/* Preferred Ad Formats */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  What ad formats are you open to posting? (Pick at least 1)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AD_FORMATS.map((fmt) => {
                    const isSelected = preferredAdFormats.includes(fmt.label);
                    return (
                      <button
                        type="button"
                        key={fmt.label}
                        onClick={() => toggleAdFormat(fmt.label)}
                        className={`min-h-[44px] p-2.5 rounded-xl text-xs text-left transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500/20 border-rose-500 text-white font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="truncate pr-1">{fmt.label.split(' ')[0]}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-400 font-normal truncate">{fmt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Niches / Favorite Interests */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  What topics/products do you naturally talk about? (Pick at least 1)
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_NICHES.map((n) => {
                    const isSelected = selectedNiches.includes(n.label);
                    return (
                      <button
                        type="button"
                        key={n.label}
                        onClick={() => toggleNiche(n.label)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span>{n.emoji}</span>
                        <span>{n.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="creator-email-input" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Email (for campaign invites) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="creator-email-input"
                    type="email"
                    required
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label htmlFor="creator-phone-input" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Phone / SMS (optional for urgent alerts)
                  </label>
                  <input
                    id="creator-phone-input"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Payout Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="creator-payout-method-select" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Preferred Payout Method
                  </label>
                  <select
                    id="creator-payout-method-select"
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value as PayoutMethod)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white cursor-pointer"
                  >
                    <option value="Venmo">Venmo</option>
                    <option value="Cash App">Cash App</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Apple Cash">Apple Cash</option>
                    <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="creator-payout-handle-input" className="block text-xs font-bold text-slate-300 mb-1.5">
                    Payout Username / Handle
                  </label>
                  <input
                    id="creator-payout-handle-input"
                    type="text"
                    placeholder="@your-payment-handle"
                    value={payoutHandle}
                    onChange={(e) => setPayoutHandle(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Privacy / Terms notice */}
              <p className="text-[11px] text-slate-400">
                🔒 We will never post on your behalf or ask for your password. By signing up, you agree to receive brand & sponsorship match notifications.
              </p>

              {/* Submit CTA & Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-xl shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Join the Creator Launch List'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="w-full py-3 sm:py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
