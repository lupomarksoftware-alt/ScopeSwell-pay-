import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, Shield } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'scopeswell_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already accepted or customized cookies
    const storedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!storedConsent) {
      // Delay showing slightly for a smooth, unobtrusive entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({ analytics: true, functional: true, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({ analytics: false, functional: true, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md"
        >
          <div className="relative p-4 sm:p-5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 shadow-2xl shadow-black/60 text-slate-300">
            {/* Top row */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5 shadow-sm">
                <Cookie className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <h4 className="text-xs font-bold text-white font-['Space_Grotesk'] tracking-wide">
                  Cookie & Privacy Preferences
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  We use cookies to secure creator payouts, optimize story matching, and analyze traffic anonymously.
                </p>

                {showPreferences && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-1.5 text-[11px]"
                  >
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span>Essential & Security:</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                        Required
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Performance & Insights:</span>
                      <span className="text-[10px] text-slate-400">Optional</span>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-1">
                  <button
                    onClick={handleAcceptAll}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-rose-950/40 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept All</span>
                  </button>

                  <button
                    onClick={handleAcceptEssential}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Essential Only
                  </button>

                  <button
                    onClick={() => setShowPreferences(!showPreferences)}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline transition-colors cursor-pointer py-1 px-1"
                  >
                    {showPreferences ? 'Hide details' : 'Manage'}
                  </button>
                </div>
              </div>

              {/* Close Icon button */}
              <button
                onClick={handleAcceptEssential}
                aria-label="Dismiss cookie notice"
                className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
