import React, { useState } from 'react';
import { SAMPLE_CAMPAIGNS } from '../data/initialData';
import { Eye, DollarSign, MapPin, Tag, ArrowRight, Sparkles, CheckCircle2, Store, Instagram, Link, Smartphone, ShoppingBag, Globe, Filter } from 'lucide-react';
import { SampleCampaign, AdFormatType } from '../types';

interface SampleCampaignsProps {
  onOpenCreatorModal: () => void;
  onOpenBusinessModal: () => void;
}

export const SampleCampaigns: React.FC<SampleCampaignsProps> = ({
  onOpenCreatorModal,
  onOpenBusinessModal,
}) => {
  const [activeCampaign, setActiveCampaign] = useState<SampleCampaign | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'DTC & E-Commerce', 'Mobile Apps & Tech', 'Streetwear & Apparel', 'Local Spots & Cafes'];

  const filteredCampaigns = SAMPLE_CAMPAIGNS.filter((camp) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'DTC & E-Commerce') return camp.category.includes('DTC') || camp.category.includes('Beauty') || camp.adFormat === 'Link Sticker (Website URL)';
    if (selectedFilter === 'Mobile Apps & Tech') return camp.category.includes('Apps') || camp.category.includes('Tech') || camp.adFormat === 'App Store / Play Store Link';
    if (selectedFilter === 'Streetwear & Apparel') return camp.category.includes('Streetwear') || camp.adFormat === 'Exclusive Promo Code';
    if (selectedFilter === 'Local Spots & Cafes') return camp.category.includes('Cafe') || camp.category.includes('Bakery') || camp.category.includes('Gym') || camp.adFormat === 'Location Tag & Venue Check-in';
    return true;
  });

  const getFormatBadgeIcon = (format: AdFormatType) => {
    switch (format) {
      case 'Link Sticker (Website URL)':
        return <Link className="w-3 h-3 text-cyan-400" />;
      case 'App Store / Play Store Link':
        return <Smartphone className="w-3 h-3 text-purple-400" />;
      case 'Exclusive Promo Code':
        return <Tag className="w-3 h-3 text-amber-400" />;
      case 'Location Tag & Venue Check-in':
        return <MapPin className="w-3 h-3 text-emerald-400" />;
      default:
        return <Tag className="w-3 h-3 text-rose-400" />;
    }
  };

  return (
    <section id="campaigns" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-pink-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Format Campaigns</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Explore Active Story Ad Formats
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            From direct website link stickers and App Store installs to exclusive discount codes and neighborhood venue tags.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedFilter === cat
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-rose-950/20 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={camp.storyImage}
                    alt={camp.businessName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-slate-200 border border-white/10 flex items-center gap-1.5">
                    {getFormatBadgeIcon(camp.adFormat)}
                    <span>{camp.adFormat.split(' ')[0]}</span>
                  </span>

                  {/* Verified Payout Badge */}
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md">
                    {camp.verifiedBadge}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-lg font-bold text-white leading-snug">{camp.businessName}</p>
                    <p className="text-xs text-rose-300 flex items-center gap-1 mt-0.5">
                      {camp.isGlobalOrNational ? (
                        <>
                          <Globe className="w-3 h-3 text-cyan-400" />
                          <span>Nationwide / Global Campaign</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{camp.neighborhood || 'Downtown'}, {camp.city}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  {/* Ad Format Badge */}
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                    <span className="text-slate-400 font-medium">Format:</span>
                    <span className="text-slate-200 font-semibold flex items-center gap-1">
                      {camp.adFormat}
                    </span>
                  </div>

                  {/* Offer Description */}
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <p className="text-xs font-semibold text-slate-300 flex items-start gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{camp.offerHeadline}</span>
                    </p>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <p className="text-[10px] text-slate-400">Rate / 100 Views</p>
                      <p className="text-sm font-bold text-white font-mono">${camp.creatorPayoutPer100Views.toFixed(2)}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <p className="text-[10px] text-slate-400">Avg Creator Payout</p>
                      <p className="text-sm font-bold text-emerald-400 font-mono">${camp.avgCreatorEarned.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Sample Story Tag / Link */}
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span className="text-slate-400">Tagged: <span className="text-rose-300 font-mono">{camp.tagHandle}</span></span>
                    {camp.linkUrl && (
                      <span className="text-cyan-400 font-mono text-[11px] truncate max-w-[130px]">{camp.linkUrl}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-5 pt-0 border-t border-slate-800/80 mt-2">
                <button
                  onClick={() => setActiveCampaign(camp)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-3"
                >
                  <span>Preview Campaign Brief & Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Launch Callout */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-rose-950/50 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Want to run a story campaign for your brand or app?
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              We handle creator matching, link stickers, and 24h view verification so you only pay for real verified impressions.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenBusinessModal}
              className="w-full md:w-auto px-5 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              <Store className="w-4 h-4" />
              <span>Launch Brand / App Pilot</span>
            </button>
            <button
              onClick={onOpenCreatorModal}
              className="w-full md:w-auto px-5 py-3 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Join as Creator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Brief Modal */}
      {activeCampaign && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Campaign Brief Preview</span>
                <h4 className="text-xl font-bold text-white">{activeCampaign.businessName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{activeCampaign.adFormat}</p>
              </div>
              <button
                onClick={() => setActiveCampaign(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <p className="text-xs text-slate-400">Offer to share with your audience:</p>
                <p className="text-sm font-bold text-white mt-1">{activeCampaign.offerHeadline}</p>
              </div>

              {activeCampaign.linkUrl && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs flex items-center justify-between">
                  <span className="text-cyan-300 font-semibold">Story Link Sticker URL:</span>
                  <span className="text-cyan-200 font-mono font-bold">{activeCampaign.linkUrl}</span>
                </div>
              )}

              {activeCampaign.promoCode && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs flex items-center justify-between">
                  <span className="text-amber-300 font-semibold">Discount Promo Code:</span>
                  <span className="text-amber-200 font-mono font-bold">{activeCampaign.promoCode}</span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <p className="text-xs text-slate-400 font-semibold">Creator Deliverables & Rules:</p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Post 1 authentic photo/video story showing the product, app, or venue</li>
                  <li>Tag <span className="text-rose-300 font-mono">{activeCampaign.tagHandle}</span> and attach the designated link sticker or promo code</li>
                  <li>Leave story live for the full 24 hours</li>
                  <li>Upload a screenshot of your Story Insights views to trigger instant payout</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-semibold">Estimated Creator Cash Payout:</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">${activeCampaign.avgCreatorEarned.toFixed(2)} directly to your account</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveCampaign(null);
                  onOpenCreatorModal();
                }}
                className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-md cursor-pointer"
              >
                Sign Up to Receive Invites Like This
              </button>
              <button
                onClick={() => setActiveCampaign(null)}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
