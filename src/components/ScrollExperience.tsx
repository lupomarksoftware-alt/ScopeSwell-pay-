import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export const ScrollExperience: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          setIsVisible(window.scrollY > 280);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular parameters for floating progress ring
  const circleRadius = 18;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* 1. Stunning Neon Laser Scroll Progress Line at top of viewport */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #f43f5e 0%, #ec4899 35%, #f59e0b 70%, #6366f1 100%)',
          boxShadow: '0 0 14px rgba(244, 63, 94, 0.9), 0 0 4px rgba(245, 158, 11, 0.8)',
        }}
        aria-hidden="true"
      />

      {/* 2. Floating Tactile Back to Top HUD with Circular Progress Gauge */}
      <div
        className={`fixed bottom-20 right-6 z-40 transition-all duration-300 transform ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group relative w-11 h-11 rounded-full bg-[#0c101a]/95 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/70 text-slate-300 hover:text-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
          title={`Scroll to top (${Math.round(scrollProgress)}% viewed)`}
          aria-label="Scroll back to top"
        >
          {/* Animated SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
            <circle
              cx="20"
              cy="20"
              r={circleRadius}
              className="text-slate-800/80"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r={circleRadius}
              className="text-rose-500 transition-all duration-75"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="url(#scrollGradient)"
              fill="transparent"
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Arrow Icon */}
          <ArrowUp className="w-4 h-4 text-slate-300 group-hover:text-rose-400 group-hover:-translate-y-0.5 transition-transform duration-200" />

          {/* Micro Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono font-semibold text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            Top • {Math.round(scrollProgress)}%
          </span>
        </button>
      </div>
    </>
  );
};
