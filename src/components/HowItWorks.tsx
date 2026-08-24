import React, { useState } from 'react';
import { UserCheck, Bell, Camera, DollarSign, Target, Users, BarChart3, ShieldCheck, Sparkles, Check, ArrowRight, Eye, Link, Smartphone, ShoppingBag, Store, Tag } from 'lucide-react';
import { SAMPLE_CAMPAIGNS } from '../data/initialData';

interface HowItWorksProps {
  onOpenCreatorModal: () => void;
  onOpenBusinessModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenCreatorModal,
  onOpenBusinessModal,
}) => {
  const [activeTab, setActiveTab] = useState<'creator' | 'business'>('creator');
  const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(0);
  const currentCampaign = SAMPLE_CAMPAIGNS[selectedCampaignIndex];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-950/60 border-y border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-rose-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Fair & Direct</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            How ScopeSwell Pay Works
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            No complex contracts, no follower vanity minimums. Direct-to-Consumer brands, mobile apps, drops, and local spots pay everyday Instagram users based strictly on verified story views.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 flex justify-center">
            <div
              role="tablist"
              aria-label="Workflow audience selector"
              className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800"
            >
              <button
                id="tab-creator-workflow"
                role="tab"
                aria-selected={activeTab === 'creator'}
                aria-controls="panel-creator-workflow"
                onClick={() => setActiveTab('creator')}
                className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'creator'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                For Everyday Instagram Users (Earn)
              </button>
              <button
                id="tab-business-workflow"
                role="tab"
                aria-selected={activeTab === 'business'}
                aria-controls="panel-business-workflow"
                onClick={() => setActiveTab('business')}
                className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'business'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                For Brands, Apps & Businesses (Advertise)
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Workflow Grid + Interactive Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Steps Column */}
          <div
            id={activeTab === 'creator' ? 'panel-creator-workflow' : 'panel-business-workflow'}
            role="tabpanel"
            aria-labelledby={activeTab === 'creator' ? 'tab-creator-workflow' : 'tab-business-workflow'}
            className="lg:col-span-7 space-y-4"
          >
            {activeTab === 'creator' ? (
              <>
                {/* Creator Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-rose-500/30">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Pick your favorite niches & ad formats</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Select what you love: DTC brands, mobile apps, streetwear, gaming, fitness, food, or local spots. Choose your preferred formats (link stickers, app buttons, promo codes). We never ask for your password.
                    </p>
                  </div>
                </div>

                {/* Creator Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-amber-500/30">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Receive direct campaign match invites</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      When a brand or app matches your profile, you get an SMS/email invite with the offer details, payout rate per 100 views, custom link sticker, and any free product perks.
                    </p>
                  </div>
                </div>

                {/* Creator Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-pink-500/30">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Post an authentic 15-second Story</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Share an honest photo, video, or screenshot featuring the product, app, or venue with their custom link sticker or promo code so your friends can check it out.
                    </p>
                  </div>
                </div>

                {/* Creator Step 4 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-emerald-500/30">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Submit 24h view screenshot & get paid</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Once 24 hours elapse, upload a quick screenshot of your Instagram Story Insights view count. Money is instantly sent to your Venmo, Cash App, PayPal, or bank account.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenCreatorModal}
                    className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Register as a Creator for Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Business Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-purple-500/30">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Choose your ad format & campaign objective</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Promote an e-commerce store (link sticker), iOS/Android app (App Store link), drop (exclusive promo code), or local venue (location tag).
                    </p>
                  </div>
                </div>

                {/* Business Step 2 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-indigo-500/30">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Targeted everyday creators get matched</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      ScopeSwell Pay matches your product or app with active everyday users whose audience demographics and personal interests match your ideal buyers.
                    </p>
                  </div>
                </div>

                {/* Business Step 3 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-pink-500/30">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Authentic recommendation stories go live</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Creators post genuine recommendation stories featuring your product, app link, or promo code. Their close friends and followers see authentic peer endorsements.
                    </p>
                  </div>
                </div>

                {/* Business Step 4 */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center shrink-0 text-sm border border-emerald-500/30">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Pay only for verified 24h story views</span>
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      No wasted ad spend on fake bot impressions. You pay strictly for verified 24-hour views delivered, with complete conversion and click analytics.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenBusinessModal}
                    className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Register Brand / App Pilot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Interactive Phone Simulator Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Campaign Selectors */}
            <div className="w-full max-w-sm mb-4">
              <p className="text-xs font-semibold text-slate-400 mb-2 text-center">
                Interactive Story Demo • Tap to switch ad type:
              </p>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
                {SAMPLE_CAMPAIGNS.slice(0, 3).map((camp, idx) => (
                  <button
                    key={camp.id}
                    onClick={() => setSelectedCampaignIndex(idx)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] truncate transition-colors cursor-pointer ${
                      selectedCampaignIndex === idx
                        ? 'bg-slate-700 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {camp.businessName.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Bezel */}
            <div className="relative w-[280px] sm:w-[310px] h-[570px] rounded-[42px] bg-slate-950 p-3 shadow-2xl border-[6px] border-slate-800 shadow-rose-950/20 flex flex-col justify-between overflow-hidden">
              {/* Dynamic Notch / Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-30" />

              {/* Story Content Area */}
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-900 flex flex-col justify-between">
                {/* Background Story Image */}
                <img
                  src={currentCampaign.storyImage}
                  alt={currentCampaign.businessName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none" />

                {/* Top Story Bar: Progress Bars + Profile Header */}
                <div className="relative z-10 p-3.5 pt-7">
                  <div className="flex gap-1 mb-2.5">
                    <div className="h-0.5 flex-1 bg-white rounded-full"></div>
                    <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full ring-2 ring-rose-500 overflow-hidden bg-slate-800">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white">maya_story</span>
                          <span className="text-[10px] text-white/70">3h</span>
                        </div>
                        <p className="text-[10px] text-rose-300 font-medium">🏷️ {currentCampaign.adFormat}</p>
                      </div>
                    </div>
                    <span className="text-xs text-white/80 font-bold">•••</span>
                  </div>
                </div>

                {/* Interactive Stickers / Tags on the Story */}
                <div className="relative z-10 px-4 space-y-2">
                  <div className="inline-block p-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-left shadow-lg">
                    <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      <span>✨</span>
                      <span>{currentCampaign.offerHeadline}</span>
                    </p>
                  </div>

                  {currentCampaign.linkUrl && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-900 text-[11px] font-bold shadow-md">
                      <Link className="w-3 h-3 text-blue-600" />
                      <span>{currentCampaign.linkUrl}</span>
                    </div>
                  )}

                  {currentCampaign.promoCode && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold shadow-md">
                      <Tag className="w-3 h-3" />
                      <span>CODE: {currentCampaign.promoCode}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Story Footer: Live Verified Views & Payout HUD */}
                <div className="relative z-10 p-3.5 space-y-2">
                  <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 backdrop-blur-md">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{currentCampaign.verifiedViews} Verified Views</span>
                      </div>
                      <div className="text-emerald-300 font-mono">
                        ${currentCampaign.avgCreatorEarned.toFixed(2)}
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full w-[85%]"></div>
                    </div>
                    <p className="text-[9px] text-slate-400 text-center mt-1">
                      Verified by ScopeSwell Pay • Payout sent upon 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
