import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { EarningsCalculator } from './components/EarningsCalculator';
import { ComparisonSection } from './components/ComparisonSection';
import { SampleCampaigns } from './components/SampleCampaigns';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { CreatorSignupModal } from './components/CreatorSignupModal';
import { BusinessSignupModal } from './components/BusinessSignupModal';
import { BusinessRegistration, CreatorRegistration, UserRole } from './types';
import { getStoredBusinesses, getStoredCreators } from './utils/storage';
import { Instagram, Store, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [creators, setCreators] = useState<CreatorRegistration[]>([]);
  const [businesses, setBusinesses] = useState<BusinessRegistration[]>([]);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [prefilledCity, setPrefilledCity] = useState('');
  const [activeRole, setActiveRole] = useState<UserRole>('creator');

  // Load initial registrations from storage
  useEffect(() => {
    setCreators(getStoredCreators());
    setBusinesses(getStoredBusinesses());
  }, []);

  const handleOpenCreatorModal = (city = '') => {
    setPrefilledCity(city);
    setIsCreatorModalOpen(true);
  };

  const handleOpenBusinessModal = (city = '') => {
    setPrefilledCity(city);
    setIsBusinessModalOpen(true);
  };

  const handleCreatorAdded = (newCreator: CreatorRegistration) => {
    setCreators((prev) => [newCreator, ...prev.filter((c) => c.id !== newCreator.id)]);
  };

  const handleBusinessAdded = (newBiz: BusinessRegistration) => {
    setBusinesses((prev) => [newBiz, ...prev.filter((b) => b.id !== newBiz.id)]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenCreatorModal={() => handleOpenCreatorModal()}
        onOpenBusinessModal={() => handleOpenBusinessModal()}
        creatorCount={creators.length}
        businessCount={businesses.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          onOpenCreatorModal={() => handleOpenCreatorModal()}
          onOpenBusinessModal={() => handleOpenBusinessModal()}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
        />

        <HowItWorks
          onOpenCreatorModal={() => handleOpenCreatorModal()}
          onOpenBusinessModal={() => handleOpenBusinessModal()}
        />

        <EarningsCalculator
          onOpenCreatorModal={() => handleOpenCreatorModal()}
          onOpenBusinessModal={() => handleOpenBusinessModal()}
        />

        <SampleCampaigns
          onOpenCreatorModal={() => handleOpenCreatorModal()}
          onOpenBusinessModal={() => handleOpenBusinessModal()}
        />

        <ComparisonSection />

        {/* Bottom Fast Registration Strip */}
        <section className="py-14 bg-gradient-to-r from-rose-950/40 via-purple-950/50 to-indigo-950/40 border-y border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilot Registration Open</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Ready to Turn Stories into Cash or Customers?
            </h2>
            <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Join thousands of everyday creators and local business owners shaping the next era of authentic neighborhood advertising.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenCreatorModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-xl shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Join as Instagram Creator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenBusinessModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Register Business for Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCreatorModal={() => handleOpenCreatorModal()}
        onOpenBusinessModal={() => handleOpenBusinessModal()}
      />

      {/* Modals */}
      <CreatorSignupModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        initialCity={prefilledCity}
        onCreatorAdded={handleCreatorAdded}
      />

      <BusinessSignupModal
        isOpen={isBusinessModalOpen}
        onClose={() => setIsBusinessModalOpen(false)}
        initialCity={prefilledCity}
        onBusinessAdded={handleBusinessAdded}
      />

      {/* Smooth Cookie Consent */}
      <CookieConsent />
    </div>
  );
}
