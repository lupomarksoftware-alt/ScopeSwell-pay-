import React, { useState } from 'react';
import { MASTER_FAQS } from '../data/initialData';
import { HelpCircle, ChevronDown, Search, Mail, MessageSquare, ShieldCheck, Sparkles, Bug } from 'lucide-react';
import { MAIN_EMAIL } from '../utils/notifications';

interface FAQSectionProps {
  onOpenInstagramSwitchModal: () => void;
  onOpenFeedbackModal: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenInstagramSwitchModal,
  onOpenFeedbackModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ['All', 'General', 'Creators', 'Businesses', 'Currency & Rates', 'Security'];

  const filteredFaqs = MASTER_FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faqs" className="py-16 md:py-24 bg-[#0a0e17]/30 border-t border-slate-900/80 relative backdrop-blur-[1px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-rose-300 mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Support & Documentation Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Everything you need to know about Pay-Per-Reach rates, Story Insights verification, escrow protection, and wallet payouts on <strong className="text-white">scopeswell.com</strong>.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-lg mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. personal account, escrow, Tallinn rate)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors shadow-lg"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-rose-300 shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p>{faq.a}</p>
                    {faq.q.includes('personal Instagram') && (
                      <button
                        onClick={onOpenInstagramSwitchModal}
                        className="mt-3 text-xs text-rose-400 hover:text-rose-300 underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open 30-Second Instagram Switch Guide →</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">
              No questions found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Direct Help Desk Box */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Found a problem, bug, or have feedback?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1">
              Help us refine the platform! You can report bugs, request features, or flag verification errors with our dedicated submission portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenFeedbackModal}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bug className="w-4 h-4" />
              <span>Submit Feedback or Report Bug</span>
            </button>

            <a
              href={`mailto:${MAIN_EMAIL}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Direct Email ({MAIN_EMAIL})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
