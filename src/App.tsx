import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PlatformRatesSection } from './components/PlatformRatesSection';
import { CreatorGuideSection } from './components/CreatorGuideSection';
import { BusinessGuideSection } from './components/BusinessGuideSection';
import { SecuritySection } from './components/SecuritySection';
import { AIInstructorSection } from './components/AIInstructorSection';
import { AppShowcaseSection } from './components/AppShowcaseSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { PWALaunchModal } from './components/PWALaunchModal';
import { InstagramSwitchModal } from './components/InstagramSwitchModal';
import { FeedbackReportModal } from './components/FeedbackReportModal';
import { AnimatedCampaignsBackground } from './components/AnimatedCampaignsBackground';
import { UserRole, FeedbackType } from './types';
import { APP_CONFIG } from './config/constants';
import { Sparkles, Smartphone, ExternalLink, ShieldCheck, MessageSquare, Bug, ArrowRight } from 'lucide-react';

export default function App() {
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isInstagramSwitchModalOpen, setIsInstagramSwitchModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackInitialType, setFeedbackInitialType] = useState<FeedbackType>('Bug / Error Report');
  const [activeRole, setActiveRole] = useState<UserRole>('creator');

  const handleOpenFeedbackModal = (typeInput?: unknown) => {
    let resolvedType: FeedbackType = 'Bug / Error Report';
    if (typeof typeInput === 'string') {
      if (typeInput === 'bug' || typeInput === 'Bug / Error Report') {
        resolvedType = 'Bug / Error Report';
      } else if (typeInput === 'feature' || typeInput === 'Feature Suggestion') {
        resolvedType = 'Feature Suggestion';
      } else if (typeInput === 'escrow' || typeInput === 'Escrow & Payout Issue') {
        resolvedType = 'Escrow & Payout Issue';
      } else if (typeInput === 'help' || typeInput === 'Campaign & Verification Problem') {
        resolvedType = 'Campaign & Verification Problem';
      } else {
        resolvedType = 'General Feedback';
      }
    }
    setFeedbackInitialType(resolvedType);
    setIsFeedbackModalOpen(true);
  };

  const handleOpenPWA = () => {
    setIsPWAModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Animated 3D Story Campaigns Background */}
      <AnimatedCampaignsBackground />

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-rose-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-rose-300 focus:outline-none transition-all"
      >
        Skip to main content
      </a>

      {/* Relative Content Container with Glass Backdrop */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          onOpenPWAModal={handleOpenPWA}
          onOpenInstagramSwitchModal={() => setIsInstagramSwitchModalOpen(true)}
          onOpenFeedbackModal={() => handleOpenFeedbackModal('Bug / Error Report')}
        />

        {/* Main Content Landmark */}
        <main id="main-content" role="main" className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onOpenPWAModal={handleOpenPWA}
            onOpenInstagramSwitchModal={() => setIsInstagramSwitchModalOpen(true)}
            onOpenFeedbackModal={() => handleOpenFeedbackModal('General Feedback')}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
          />

          {/* 1. Currency & Fixed Pay-Per-Reach Rates by City Section */}
          <PlatformRatesSection
            onOpenPWAModal={handleOpenPWA}
          />

          {/* 2. Creator Guide: How to Use the App */}
          <CreatorGuideSection
            onOpenPWAModal={handleOpenPWA}
            onOpenInstagramSwitchModal={() => setIsInstagramSwitchModalOpen(true)}
          />

          {/* 3. Business Guide: How to Use the App & Escrow */}
          <BusinessGuideSection
            onOpenPWAModal={handleOpenPWA}
          />

          {/* 4. Security & Fraud Protection */}
          <SecuritySection />

          {/* 5. Interactive AI Voice & Vision Instructor */}
          <AIInstructorSection />

          {/* 6. Three Core Roles & Architecture Overview */}
          <AppShowcaseSection
            onOpenPWAModal={handleOpenPWA}
          />

          {/* 7. Why Pay-Per-Reach Outperforms Traditional Ads */}
          <ComparisonSection />

          {/* Bottom Fast Action & App Launch Banner */}
          <section className="py-16 bg-gradient-to-r from-rose-950/40 via-purple-950/50 to-indigo-950/40 border-y border-slate-800/80 relative overflow-hidden backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-amber-300 mb-4 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Platform App • {APP_CONFIG.displayDomain}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                Ready to Launch or Monetize Your Stories?
              </h2>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Experience the automated pay-per-reach influencer marketing platform with guaranteed escrow protection and transparent 24h Instagram Insights verification.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Open {APP_CONFIG.displayDomain}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={handleOpenPWA}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:text-white shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>PWA Installation Guide</span>
                </button>

                <button
                  onClick={() => handleOpenFeedbackModal('General Feedback')}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Submit Feedback & Problem Report</span>
                </button>
              </div>
            </div>
          </section>

          {/* 8. Comprehensive FAQ Section with Support */}
          <FAQSection
            onOpenInstagramSwitchModal={() => setIsInstagramSwitchModalOpen(true)}
            onOpenFeedbackModal={() => handleOpenFeedbackModal('Bug / Error Report')}
          />
        </main>

        {/* Footer */}
        <Footer
          onOpenPWAModal={handleOpenPWA}
          onOpenInstagramSwitchModal={() => setIsInstagramSwitchModalOpen(true)}
          onOpenFeedbackModal={() => handleOpenFeedbackModal('General Feedback')}
        />
      </div>

      {/* Unified User Feedback & Error/Problem Reporting Modal */}
      <FeedbackReportModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        initialType={feedbackInitialType}
      />

      {/* PWA Portal Launch & Install Modal */}
      <PWALaunchModal
        isOpen={isPWAModalOpen}
        onClose={() => setIsPWAModalOpen(false)}
      />

      {/* Instagram 30-Second Creator Account Switch Modal */}
      <InstagramSwitchModal
        isOpen={isInstagramSwitchModalOpen}
        onClose={() => setIsInstagramSwitchModalOpen(false)}
      />

      {/* Floating Feedback & Problem Reporting Badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => handleOpenFeedbackModal('Bug / Error Report')}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 border border-slate-700 hover:border-cyan-500/60 text-slate-200 hover:text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer text-xs font-semibold group"
          title="Report a problem, bug or give feedback"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span>Feedback & Error Report</span>
        </button>
      </div>

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}
