import React, { useState } from 'react';
import { CREATOR_FAQS, BUSINESS_FAQS } from '../data/initialData';
import { ChevronDown, HelpCircle, Sparkles, Mail, Send, ArrowRight } from 'lucide-react';
import { MAIN_EMAIL } from '../utils/notifications';

export const FAQSection: React.FC = () => {
  const [activeFaqTab, setActiveFaqTab] = useState<'creator' | 'business'>('creator');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentFaqs = activeFaqTab === 'creator' ? CREATOR_FAQS : BUSINESS_FAQS;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-rose-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Got Questions? We've Got Answers
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Everything you need to know about how campaigns, view verification, and payouts work.
          </p>

          {/* Toggle Tab */}
          <div className="mt-6 flex justify-center">
            <div
              role="tablist"
              aria-label="FAQ Category Selector"
              className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800"
            >
              <button
                id="faq-tab-creator"
                role="tab"
                aria-selected={activeFaqTab === 'creator'}
                aria-controls="faq-accordion-panel"
                onClick={() => {
                  setActiveFaqTab('creator');
                  setOpenIndex(0);
                }}
                className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFaqTab === 'creator'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Creator FAQs
              </button>
              <button
                id="faq-tab-business"
                role="tab"
                aria-selected={activeFaqTab === 'business'}
                aria-controls="faq-accordion-panel"
                onClick={() => {
                  setActiveFaqTab('business');
                  setOpenIndex(0);
                }}
                className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFaqTab === 'business'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Business FAQs
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div
          id="faq-accordion-panel"
          role="tabpanel"
          aria-labelledby={activeFaqTab === 'creator' ? 'faq-tab-creator' : 'faq-tab-business'}
          className="space-y-3"
        >
          {currentFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-btn-${activeFaqTab}-${index}`;
            const panelId = `faq-panel-${activeFaqTab}-${index}`;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Help Desk Callout */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Support & Inquiries</span>
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Still have questions or need custom campaign terms?
            </h3>
            <p className="text-xs text-slate-300">
              Reach our managing inbox directly at <strong className="text-white font-mono">{MAIN_EMAIL}</strong>. We review creator profiles and advertiser proposals daily.
            </p>
          </div>

          <a
            href={`mailto:${MAIN_EMAIL}?subject=${encodeURIComponent('[ScopeSwell Pay] Question / Partnership Inquiry')}`}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
          >
            <Send className="w-3.5 h-3.5 text-rose-400" />
            <span>Email {MAIN_EMAIL}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
