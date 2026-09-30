import React, { useEffect } from 'react';
import { X, Instagram, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface InstagramSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstagramSwitchModal: React.FC<InstagramSwitchModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Open Instagram & Go to Profile',
      desc: 'Launch the Instagram app and tap your profile avatar in the bottom right corner.',
    },
    {
      num: 2,
      title: 'Tap the Menu (☰)',
      desc: 'Tap the hamburger icon (☰) in the top right corner of your profile.',
    },
    {
      num: 3,
      title: 'Settings and privacy → Account type and tools',
      desc: 'Scroll down to the "For professionals" section and tap "Account type and tools".',
    },
    {
      num: 4,
      title: 'Switch to Professional Account',
      desc: 'Tap "Switch to professional account" and select Creator (or Business).',
    },
    {
      num: 5,
      title: 'Pick a Category & Tap Done',
      desc: 'Select what fits you best (e.g., Digital Creator, Blogger, Fitness, Food) and confirm. You are done!',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>30-Second Quick Setup</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] mt-0.5">
              Switch Instagram to Creator Account
            </h2>
          </div>
        </div>

        {/* Why it matters */}
        <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200 mb-6 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong>Why is this required?</strong> Personal accounts hide Story reach analytics. Switching to a free Creator account unlocks official <strong>Instagram Insights</strong>, allowing you to screenshot your verified Accounts Reached count and get paid instantly.
          </div>
        </div>

        {/* Step-by-Step checklist */}
        <div className="space-y-3 mb-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                {step.num}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{step.title}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:from-rose-400 hover:to-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Got it, I'm Ready to Connect!</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
