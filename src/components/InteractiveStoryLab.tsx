import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  RotateCcw,
  Eye,
  Users,
  Coins,
  Smartphone,
  Flame,
  Check
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    metricsVisual?: {
      labelA: string;
      valueA: string;
      labelB: string;
      valueB: string;
    };
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "A creator's Story gets 8,000 Views, but only 1,500 Unique Accounts Reached. What should the brand pay for?",
    subtitle: "Challenge 1: Reach vs. Repeated Loop Impressions",
    options: [
      {
        id: 'views',
        text: "Pay for all 8,000 Views (€240) — because the story was re-watched multiple times.",
        isCorrect: false,
        explanation: "❌ Traditional ad traps! 8,000 views often means the same small circle re-watching a story 5 times or bots looping it. You paid for duplicate noise without reaching any new customers.",
      },
      {
        id: 'reach',
        text: "Pay strictly for the 1,500 Unique Human Accounts Reached (€75 in Helsinki).",
        isCorrect: true,
        explanation: "✅ Exact ScopeSwell principle! You only pay for verified individual humans who saw the brand message. ScopeSwell prevents wasting money on replay loops.",
        metricsVisual: {
          labelA: "Raw Impressions",
          valueA: "8,000 (Duplicate Loops)",
          labelB: "ScopeSwell Verified Reach",
          valueB: "1,500 Unique Humans",
        },
      },
      {
        id: 'flat',
        text: "Pay an upfront flat €300 package fee with no verification required.",
        isCorrect: false,
        explanation: "❌ The old influencer agency model! Upfront flat fees provide zero accountability and zero refunds if the story underperforms.",
      },
    ],
  },
  {
    id: 2,
    question: "A business locks €100 in Escrow for 2,000 reach target, but the Story reaches 1,400. What happens to the money?",
    subtitle: "Challenge 2: The Automated Escrow Guarantee",
    options: [
      {
        id: 'creator_keeps',
        text: "The creator keeps the entire €100 because the Story was posted live for 24 hours.",
        isCorrect: false,
        explanation: "❌ Never on ScopeSwell! On traditional platforms the brand loses the budget. On ScopeSwell, payment is tied strictly to verified performance.",
      },
      {
        id: 'instant_refund',
        text: "Creator receives €70 for the 1,400 verified reach, and €30 is INSTANTLY refunded to the brand's wallet.",
        isCorrect: true,
        explanation: "✅ 100% Escrow Protection! The smart escrow unlocks exactly what was earned and returns all unused budget back into the business wallet immediately upon 24-hour audit.",
        metricsVisual: {
          labelA: "Creator Paid for Results",
          valueA: "€70.00 EUR (1,400 Reach)",
          labelB: "Automated Instant Refund",
          valueB: "€30.00 EUR (Returned to Wallet)",
        },
      },
      {
        id: 'credits_expire',
        text: "The remaining €30 expires as a penalty fee.",
        isCorrect: false,
        explanation: "❌ False! ScopeSwell credits hold permanent 1:1 Euro parity (€1 = 1 Credit) and never expire. Unused funds are refunded directly.",
      },
    ],
  },
  {
    id: 3,
    question: "How does a creator prove their reach to unlock their EUR payout after 24 hours?",
    subtitle: "Challenge 3: Zero-Password Instagram Insights Proof",
    options: [
      {
        id: 'password',
        text: "By giving their Instagram login password to the business or platform.",
        isCorrect: false,
        explanation: "❌ Never share passwords! ScopeSwell NEVER asks for Instagram passwords or private account access. Your account remains 100% secure.",
      },
      {
        id: 'screenshot',
        text: "Upload a screenshot of official 24h Instagram Story Insights showing 'Accounts Reached'.",
        isCorrect: true,
        explanation: "✅ Simple & Secure! Creators switch to a free Professional account, grab the Insights screenshot from their 24h Story Archive, and upload it for automated proof audit and instant EUR release.",
        metricsVisual: {
          labelA: "Creator Privacy",
          valueA: "100% Password Safe",
          labelB: "Proof Source",
          valueB: "Official 24h Story Insights",
        },
      },
      {
        id: 'views_guess',
        text: "By guessing the follower count and multiplying by 10%.",
        isCorrect: false,
        explanation: "❌ Follower count is meaningless today due to shadowbans and bot followers. Only official Story Insights reveal authentic reach.",
      },
    ],
  },
];

export const InteractiveStoryLab: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOption = currentQ.options.find((opt) => opt.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optId);
    setHasAnswered(true);

    const chosen = currentQ.options.find((opt) => opt.id === optId);
    if (chosen?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      setQuizCompleted(true);
      // Trigger rewarding confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#f59e0b', '#10b981'],
        });
      } catch (_) {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#070a10] via-[#0d121f] to-[#070a10] border-t border-slate-800/80">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-rose-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Interactive Reach Lab • 60-Second Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Test Your Reach IQ: Can You Spot the Difference?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover why Pay-Per-Reach and automated escrow are replacing traditional view loops and vanity metrics.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c101a]/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
          {!quizCompleted ? (
            <div>
              {/* Progress bar and counter */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
                <span className="font-mono font-semibold text-rose-300">
                  {currentQ.subtitle}
                </span>
                <span className="font-mono">
                  Question <strong className="text-white">{currentQuestionIndex + 1}</strong> of {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar visual */}
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 leading-snug font-['Space_Grotesk']">
                {currentQ.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardStyle = "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200";

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      cardStyle = "bg-emerald-950/60 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-950/40";
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = "bg-rose-950/60 border-rose-500/60 text-rose-200 shadow-md shadow-rose-950/40";
                    } else {
                      cardStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={hasAnswered}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${cardStyle}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {hasAnswered ? (
                          opt.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-slate-700" />
                          )
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400">
                            {opt.id === 'views' || opt.id === 'creator_keeps' || opt.id === 'password' ? 'A' : opt.id === 'reach' || opt.id === 'instant_refund' || opt.id === 'screenshot' ? 'B' : 'C'}
                          </div>
                        )}
                      </div>
                      <span className="text-sm sm:text-base font-medium leading-relaxed">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Reveal Explanation Card */}
              {hasAnswered && selectedOption && (
                <div
                  className={`p-5 rounded-xl border mb-6 transition-all animate-in fade-in ${
                    selectedOption.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-100'
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-100'
                  }`}
                >
                  <div className="font-bold text-sm mb-1.5 flex items-center gap-2">
                    {selectedOption.isCorrect ? (
                      <span className="text-emerald-400">Spot on! Verified concept</span>
                    ) : (
                      <span className="text-rose-400">Not quite — here is why</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    {selectedOption.explanation}
                  </p>

                  {/* Metrics comparison highlight if available */}
                  {selectedOption.metricsVisual && (
                    <div className="mt-3.5 grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                        <div className="text-[11px] text-slate-400">{selectedOption.metricsVisual.labelA}</div>
                        <div className="text-xs sm:text-sm font-bold text-amber-300 font-mono mt-0.5">
                          {selectedOption.metricsVisual.valueA}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                        <div className="text-[11px] text-emerald-300">{selectedOption.metricsVisual.labelB}</div>
                        <div className="text-xs sm:text-sm font-bold text-emerald-200 font-mono mt-0.5">
                          {selectedOption.metricsVisual.valueB}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Next button */}
              {hasAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Challenge' : 'Complete Challenge & View Score'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-rose-500/20">
                <Trophy className="w-8 h-8" />
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                Challenge Completed
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-['Space_Grotesk']">
                Your Score: {score} / {QUIZ_QUESTIONS.length} Correct
              </h3>

              <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto">
                {score === 3
                  ? '🌟 Perfect Score! You have fully mastered ScopeSwell’s Pay-Per-Reach and escrow protection model.'
                  : 'Great job! You now understand why 24h Insights reach and automated escrow prevent ad waste.'}
              </p>

              <div className="mt-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="font-bold text-white mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  What You Just Learned:
                </div>
                <div className="text-slate-300 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Unique Reach</strong> beats repeated loop views every time.</span>
                </div>
                <div className="text-slate-300 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Escrow</strong> automatically refunds any unreached budget back to the brand.</span>
                </div>
                <div className="text-slate-300 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>1 Credit = €1.00 EUR</strong> with zero crypto and zero password requirements.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>

                <a
                  href={APP_CONFIG.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white text-xs font-extrabold shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Launch Official App ({APP_CONFIG.appDisplayDomain})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
