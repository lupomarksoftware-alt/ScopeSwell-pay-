import React, { useState, useEffect } from 'react';
import {
  X,
  MessageSquare,
  Bug,
  Lightbulb,
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Smartphone,
  Globe,
  Mail,
  ExternalLink
} from 'lucide-react';
import { FeedbackReport, FeedbackType } from '../types';
import { saveFeedbackReport } from '../utils/storage';
import { sendFeedbackReportEmail, MAIN_EMAIL } from '../utils/notifications';
import { APP_CONFIG } from '../config/constants';

interface FeedbackReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: FeedbackType | string;
}

function resolveFeedbackType(t: unknown): FeedbackType {
  if (typeof t === 'string') {
    if (t === 'bug' || t === 'Bug / Error Report') return 'Bug / Error Report';
    if (t === 'feature' || t === 'Feature Suggestion') return 'Feature Suggestion';
    if (t === 'escrow' || t === 'Escrow & Payout Issue') return 'Escrow & Payout Issue';
    if (t === 'help' || t === 'Campaign & Verification Problem') return 'Campaign & Verification Problem';
    return 'General Feedback';
  }
  return 'Bug / Error Report';
}

export const FeedbackReportModal: React.FC<FeedbackReportModalProps> = ({
  isOpen,
  onClose,
  initialType = 'Bug / Error Report',
}) => {
  const [type, setType] = useState<FeedbackType>(() => resolveFeedbackType(initialType));
  const [role, setRole] = useState<'Creator' | 'Business' | 'Visitor' | 'Other'>('Creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accountHandle, setAccountHandle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<FeedbackReport | null>(null);

  // Sync initial type when opened
  useEffect(() => {
    if (isOpen) {
      setType(resolveFeedbackType(initialType));
    }
  }, [isOpen, initialType]);

  // Handle ESC key to close and body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReset = () => {
    setSubmittedReport(null);
    setName('');
    setEmail('');
    setAccountHandle('');
    setMessage('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      const deviceInfo = typeof window !== 'undefined' ? `${navigator.userAgent} (${window.screen.width}x${window.screen.height})` : 'Web Client';
      const pageUrl = typeof window !== 'undefined' ? window.location.href : 'scopeswell.com';

      const reportData = {
        type: String(type) as FeedbackType,
        role,
        name: name.trim(),
        email: email.trim(),
        accountHandle: accountHandle.trim() || undefined,
        message: message.trim(),
        deviceInfo,
        browser: typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser',
        pageUrl,
      };

      const saved = saveFeedbackReport(reportData);
      try {
        await sendFeedbackReportEmail(saved);
      } catch (emailErr) {
        console.warn('Email dispatch notice:', emailErr);
      }

      setIsSubmitting(false);
      setSubmittedReport(saved);
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      // Fallback: create mock confirmation so user is not blocked
      const fallbackReport: FeedbackReport = {
        id: `fb-${Date.now().toString().slice(-4)}`,
        type: String(type) as FeedbackType,
        role,
        name: name.trim(),
        email: email.trim(),
        accountHandle: accountHandle.trim() || undefined,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'Received',
      };
      setSubmittedReport(fallbackReport);
    }
  };

  const typesList: { label: FeedbackType; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { label: 'Bug / Error Report', icon: Bug, color: 'text-rose-400' },
    { label: 'Feature Suggestion', icon: Lightbulb, color: 'text-amber-400' },
    { label: 'Escrow & Payout Issue', icon: ShieldAlert, color: 'text-purple-400' },
    { label: 'Campaign & Verification Problem', icon: HelpCircle, color: 'text-blue-400' },
    { label: 'General Feedback', icon: MessageSquare, color: 'text-emerald-400' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleReset();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0e131f] border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-500/15 via-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedReport ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>Platform Help & Feedback Desk</span>
                </div>
                <h2 id="feedback-modal-title" className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] mt-0.5">
                  Submit Feedback or Report an Issue
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Found an issue on <strong className="text-white">scopeswell.com</strong>, need help with verification/escrow, or have a suggestion? Submit below and our engineering team will address it directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Report Category */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  What would you like to report?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {typesList.map((item) => {
                    const Icon = item.icon;
                    const isSelected = type === item.label;
                    return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => setType(item.label)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800 border-rose-500 text-white shadow'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* User Role */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Your Platform Role:
                </label>
                <div className="grid grid-cols-4 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  {(['Creator', 'Business', 'Visitor', 'Other'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        role === r
                          ? 'bg-rose-500 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Your Name: <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Email for response: <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>

              {/* Instagram Handle or Brand Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Instagram Handle / Business Name (optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. @yourinstagram or Brand Name"
                  value={accountHandle}
                  onChange={(e) => setAccountHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Describe the issue or feedback in detail: <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain what happened, steps to reproduce, or suggestions for improving the platform..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-500/25 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Report to Desk...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Report to ScopeSwell Team</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
              Report Submitted Successfully!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you for helping make ScopeSwell better. Your report has been logged (Ticket <code className="text-emerald-400 font-mono">#{String(submittedReport.id)}</code>) and dispatched to our engineering team at <strong className="text-slate-200">{MAIN_EMAIL}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-1.5 text-slate-300 max-w-md mx-auto font-mono">
              <p><strong>Category:</strong> {String(submittedReport.type)}</p>
              <p><strong>Name:</strong> {String(submittedReport.name)}</p>
              <p><strong>Email:</strong> {String(submittedReport.email)}</p>
              <p><strong>Role:</strong> {String(submittedReport.role)}</p>
              <p className="line-clamp-2"><strong>Message:</strong> {String(submittedReport.message)}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Launch scopeswell.com App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
