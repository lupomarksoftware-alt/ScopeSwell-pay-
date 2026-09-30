import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Volume2,
  VolumeX,
  AlertCircle,
  Headphones,
  Radio,
  Sparkles
} from 'lucide-react';

export type SupportedLanguage = 'en' | 'es' | 'de' | 'fr' | 'it' | 'et' | 'fi' | 'sv';

interface QuickCallerPrompt {
  id: string;
  label: string;
  icon: string;
  query: string;
}

const CALLER_PROMPTS: QuickCallerPrompt[] = [
  {
    id: 'payouts',
    label: "Creator Payout Rates",
    icon: "💶",
    query: "How much do creators earn per verified account reached on ScopeSwell?"
  },
  {
    id: 'escrow',
    label: "Automated Escrow & Refunds",
    icon: "🛡️",
    query: "How does automated escrow protect business budgets and guarantee refunds?"
  },
  {
    id: 'reach',
    label: "Why Pay-Per-Reach?",
    icon: "🎯",
    query: "Why is Pay-Per-Reach superior to raw views or impressions?"
  },
  {
    id: 'process',
    label: "5-Step Story Guide",
    icon: "📸",
    query: "What is the step-by-step process for creators to post Stories and submit reach proof?"
  },
  {
    id: 'credits',
    label: "Platform Credits (1 Cr = €1)",
    icon: "🪙",
    query: "How does the Platform Credit system work with Euro currency parity?"
  },
  {
    id: 'partners',
    label: "Early Partner Benefits",
    icon: "⭐",
    query: "Why should creators and businesses register early as Early Partners?"
  }
];

// Detect language automatically from user text/speech
function autoDetectLanguage(text: string): SupportedLanguage {
  const t = text.toLowerCase();
  if (
    t.includes('hola') || t.includes('cuánto') || t.includes('cuanto') || t.includes('cómo') || t.includes('como') ||
    t.includes('ganan') || t.includes('creador') || t.includes('pago') || t.includes('alcance') || t.includes('depósito') ||
    t.includes('garantía') || t.includes('reembolso') || t.includes('historias') || t.includes('por qué') || t.includes('gracias')
  ) {
    return 'es';
  }
  if (
    t.includes('hallo') || t.includes('guten') || t.includes('wieviel') || t.includes('wie viel') || t.includes('verdienen') ||
    t.includes('reichweite') || t.includes('treuhand') || t.includes('erstattung') || t.includes('warum') || t.includes('danke')
  ) {
    return 'de';
  }
  if (
    t.includes('bonjour') || t.includes('salut') || t.includes('combien') || t.includes('gagnent') || t.includes('créateur') ||
    t.includes('portée') || t.includes('séquestre') || t.includes('remboursement') || t.includes('pourquoi') || t.includes('merci')
  ) {
    return 'fr';
  }
  if (
    t.includes('ciao') || t.includes('buongiorno') || t.includes('quanto') || t.includes('guadagn') || t.includes('copertura') ||
    t.includes('deposito') || t.includes('rimborso') || t.includes('perché') || t.includes('grazie')
  ) {
    return 'it';
  }
  if (
    t.includes('tere') || t.includes('kui palju') || t.includes('teenivad') || t.includes('ulatus') || t.includes('deponeer') ||
    t.includes('tagastus') || t.includes('miks') || t.includes('aitäh')
  ) {
    return 'et';
  }
  if (
    t.includes('hei') || t.includes('paljonko') || t.includes('tienaavat') || t.includes('tavoittavuus') || t.includes('sulkutil') ||
    t.includes('palautus') || t.includes('miksi') || t.includes('kiitos')
  ) {
    return 'fi';
  }
  if (
    t.includes('hej') || t.includes('hur mycket') || t.includes('tjänar') || t.includes('räckvidd') || t.includes('deposition') ||
    t.includes('återbetalning') || t.includes('varför') || t.includes('tack')
  ) {
    return 'sv';
  }
  return 'en';
}

const LANGUAGE_SPEECH_CODES: Record<SupportedLanguage, string> = {
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
  et: 'et-EE',
  fi: 'fi-FI',
  sv: 'sv-SE'
};

// Web Audio telephone sound effects (realistic ringback, pickup, hangup)
function playTelephoneAudio(type: 'ringing' | 'pickup' | 'hangup') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (type === 'ringing') {
      // Dual tone ringback: 400Hz + 450Hz (European standard phone ring)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(400, ctx.currentTime);
      osc2.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);

      osc1.connect(gain);
      osc2.connect(gain);
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.9);
      osc2.stop(ctx.currentTime + 0.9);
    } else if (type === 'pickup') {
      // Crisp telephone pickup click
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      // Disconnect click & busy tone
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (_) {}
}

export const AIInstructorSection: React.FC = () => {
  const [isDialing, setIsDialing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [callDurationSeconds, setCallDurationSeconds] = useState(0);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('en');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isCallActiveRef = useRef(isCallActive);
  const isSpeakingRef = useRef(isSpeaking);
  const isListeningRef = useRef(isListening);
  const isMutedRef = useRef(isMuted);
  const speakerEnabledRef = useRef(speakerEnabled);
  const detectedLangRef = useRef<SupportedLanguage>(detectedLang);
  const speechTimeoutRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const dialingTimeoutRef = useRef<any>(null);

  useEffect(() => {
    isCallActiveRef.current = isCallActive;
  }, [isCallActive]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    speakerEnabledRef.current = speakerEnabled;
  }, [speakerEnabled]);

  useEffect(() => {
    detectedLangRef.current = detectedLang;
  }, [detectedLang]);

  // Load voices reliably
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) setAvailableVoices(v);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Call timer
  useEffect(() => {
    if (isCallActive) {
      setCallDurationSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setCallDurationSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setCallDurationSeconds(0);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isCallActive]);

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Stop active speech / audio safely
  const stopAllAudio = () => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (_) {}
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      } catch (_) {}
    }
    setIsSpeaking(false);
  };

  // High-reliability Browser Speech Engine with Auto-Detected Male Voice
  const playBrowserSpeech = (text: string, langCode: SupportedLanguage) => {
    if (!speakerEnabledRef.current) {
      setIsSpeaking(false);
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }

        const clean = text.replace(/[*#_`]/g, '').trim();
        if (!clean) {
          setIsSpeaking(false);
          return;
        }

        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 0.98;
        utterance.pitch = 0.94;
        utterance.volume = 1.0;
        utterance.lang = LANGUAGE_SPEECH_CODES[langCode] || 'en-US';

        const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
        const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(langCode));

        const maleVoice =
          langVoices.find((v) => {
            const name = v.name.toLowerCase();
            return (
              name.includes('male') ||
              name.includes('guy') ||
              name.includes('ryan') ||
              name.includes('stefan') ||
              name.includes('jorge') ||
              name.includes('diego') ||
              name.includes('thomas') ||
              name.includes('luca') ||
              name.includes('daniel') ||
              name.includes('david') ||
              name.includes('alex') ||
              name.includes('natural')
            );
          }) ||
          langVoices[0] ||
          voices.find((v) => v.lang.toLowerCase().startsWith('en') && v.name.toLowerCase().includes('male')) ||
          voices[0];

        if (maleVoice) {
          utterance.voice = maleVoice;
        }

        // Prevent Chrome V8 garbage collection bug
        (window as any)._scopeSwellUtterance = utterance;

        utterance.onstart = () => {
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          (window as any)._scopeSwellUtterance = null;
          if (isCallActiveRef.current && !isMutedRef.current) {
            startMicrophoneListening();
          }
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
          (window as any)._scopeSwellUtterance = null;
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        setIsSpeaking(false);
      }
    } else {
      setIsSpeaking(false);
    }
  };

  // Play audio response
  const playHumanVoice = (text: string, audioBase64?: string | null, langCode: SupportedLanguage = detectedLangRef.current) => {
    stopAllAudio();

    if (!speakerEnabledRef.current) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    if (audioBase64) {
      try {
        const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
        currentAudioRef.current = audio;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          if (isCallActiveRef.current && !isMutedRef.current) {
            startMicrophoneListening();
          }
        };
        audio.onerror = () => {
          playBrowserSpeech(text, langCode);
        };

        audio.play().catch(() => {
          playBrowserSpeech(text, langCode);
        });
        return;
      } catch (_) {}
    }

    playBrowserSpeech(text, langCode);
  };

  // Start microphone listening
  const startMicrophoneListening = async () => {
    setMicNotice(null);
    if (isMutedRef.current) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        if (!mediaStreamRef.current) {
          mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
      } catch (err: any) {
        console.warn('Microphone permission notice:', err);
        setMicNotice('Microphone is restricted inside this preview frame. Tap any topic or "Hold to Speak" to talk directly!');
      }
    }

    if (recognitionRef.current && !isListeningRef.current) {
      try {
        recognitionRef.current.lang = LANGUAGE_SPEECH_CODES[detectedLangRef.current] || 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {}
    }
  };

  // Stop microphone listening
  const stopMicrophoneListening = () => {
    if (recognitionRef.current && isListeningRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              const finalQuery = transcript.trim();
              if (finalQuery.length > 2) {
                stopMicrophoneListening();
                handleLiveVoiceAsk(finalQuery);
                return;
              }
            } else {
              interimTranscript += transcript;
            }
          }

          if (interimTranscript.trim().length > 3) {
            // Natural interruption: if advisor is speaking, interrupt immediately!
            if (isSpeakingRef.current) {
              stopAllAudio();
            }

            if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
            speechTimeoutRef.current = setTimeout(() => {
              if (interimTranscript.trim().length > 3) {
                stopMicrophoneListening();
                handleLiveVoiceAsk(interimTranscript.trim());
              }
            }, 1200);
          }
        };

        recognition.onerror = (e: any) => {
          if (e.error === 'not-allowed') {
            setMicNotice('Microphone blocked. Tap questions below to speak directly over the line.');
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          if (isCallActiveRef.current && !isSpeakingRef.current && !isMutedRef.current) {
            try {
              recognition.start();
            } catch (_) {}
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      stopAllAudio();
      stopMicrophoneListening();
      if (dialingTimeoutRef.current) clearTimeout(dialingTimeoutRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start Call Handler with Realistic Ringing
  const handleStartCall = () => {
    setIsDialing(true);
    setMicNotice(null);
    stopAllAudio();
    playTelephoneAudio('ringing');

    // Ringing sequence: 1.1s realistic ring before pickup
    dialingTimeoutRef.current = setTimeout(async () => {
      setIsDialing(false);
      setIsCallActive(true);
      playTelephoneAudio('pickup');

      const welcomeGreeting = "ScopeSwell on the line, hello! What can I help you with today?";

      try {
        const res = await fetch('/api/instructor/speak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: welcomeGreeting }),
        });
        const data = await res.json();
        playHumanVoice(welcomeGreeting, data?.audioBase64, 'en');
      } catch (_) {
        playHumanVoice(welcomeGreeting, null, 'en');
      }

      startMicrophoneListening();
    }, 1100);
  };

  // End Call Handler
  const handleEndCall = () => {
    if (dialingTimeoutRef.current) clearTimeout(dialingTimeoutRef.current);
    playTelephoneAudio('hangup');
    setIsDialing(false);
    setIsCallActive(false);
    setIsSpeaking(false);
    setIsListening(false);
    setIsThinking(false);
    stopMicrophoneListening();
    stopAllAudio();
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Live voice ask with Smart Automatic Language Detection
  const handleLiveVoiceAsk = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    // Barge-in: interrupt advisor instantly
    stopAllAudio();
    stopMicrophoneListening();
    setIsThinking(true);

    const clientDetected = autoDetectLanguage(q);
    setDetectedLang(clientDetected);
    detectedLangRef.current = clientDetected;

    try {
      const res = await fetch('/api/instructor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      const answer = data?.answer || "ScopeSwell connects businesses with verified Instagram creators via pay-per-reach and escrow protection.";
      const audioBase64 = data?.audioBase64 || null;
      const lang = (data?.detectedLanguage as SupportedLanguage) || clientDetected || 'en';

      setDetectedLang(lang);
      detectedLangRef.current = lang;

      if (recognitionRef.current) {
        recognitionRef.current.lang = LANGUAGE_SPEECH_CODES[lang] || 'en-US';
      }

      setIsThinking(false);
      playHumanVoice(answer, audioBase64, lang);
    } catch (err) {
      setIsThinking(false);
      playHumanVoice("ScopeSwell connects businesses with verified Instagram creators via pay-per-reach and escrow protection.", null, clientDetected);
    }
  };

  // Push to talk / Tap to speak
  const handleTapToSpeak = () => {
    if (isSpeaking) {
      stopAllAudio();
    }
    if (isListening) {
      stopMicrophoneListening();
    } else {
      startMicrophoneListening();
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopMicrophoneListening();
    } else {
      if (!isSpeaking) {
        startMicrophoneListening();
      }
    }
  };

  // Toggle Speaker
  const handleToggleSpeaker = () => {
    const nextSpeaker = !speakerEnabled;
    setSpeakerEnabled(nextSpeaker);
    if (!nextSpeaker) {
      stopAllAudio();
    }
  };

  return (
    <section id="ai-instructor" className="py-16 md:py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] bg-gradient-to-tr from-cyan-600/10 via-rose-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3 shadow-sm backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>ScopeSwell Live Audio Call</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Talk with ScopeSwell Assistant
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Live interactive two-way telephone call. Automatically detects your language and replies in a natural male voice.
          </p>
        </div>

        {/* Mic notice if restricted in iframe */}
        {micNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/95 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{micNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => window.open(window.location.href, '_blank')}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-sm"
            >
              Open Full Window
            </button>
          </div>
        )}

        {/* ========================================================== */}
        {/* PURE LIVE VOICE CALL INTERFACE (NO TEXT CHAT / SUBTITLES)   */}
        {/* ========================================================== */}
        <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
          {/* Subtle Ambient Radial Lighting */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              isSpeaking
                ? 'bg-radial from-rose-500/15 via-transparent to-transparent opacity-100'
                : isListening
                ? 'bg-radial from-cyan-500/15 via-transparent to-transparent opacity-100'
                : isDialing
                ? 'bg-radial from-amber-500/15 via-transparent to-transparent opacity-100'
                : isCallActive
                ? 'bg-radial from-emerald-500/10 via-transparent to-transparent opacity-100'
                : 'opacity-0'
            }`}
          />

          {!isCallActive && !isDialing ? (
            /* ---------------- STANDBY CALL SCREEN ---------------- */
            <div className="flex flex-col items-center justify-center text-center py-6 space-y-6 relative z-10 my-auto">
              {/* Caller Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1 shadow-2xl shadow-cyan-500/25">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Headphones className="w-10 h-10 text-cyan-300" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shadow">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
                  ScopeSwell Platform Advisor
                </h3>
                <p className="text-xs sm:text-sm text-cyan-300 font-semibold mt-1">
                  Live Voice Call • Auto-Detects Any Language
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                  Start a real audio call. Speak in English, Spanish, German, French, Estonian, Finnish, Italian, or Swedish—the advisor detects and responds automatically.
                </p>
              </div>

              {/* Start Call CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartCall}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-emerald-500/30 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Start Voice Call</span>
                </button>
              </div>
            </div>
          ) : isDialing ? (
            /* ---------------- DIALING / RINGING SCREEN ---------------- */
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 relative z-10 my-auto">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-cyan-500 p-1 animate-pulse shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Headphones className="w-10 h-10 text-amber-300" />
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping pointer-events-none" />
              </div>

              <div className="space-y-1.5">
                <p className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Calling ScopeSwell...
                </p>
                <p className="text-xs text-amber-300 animate-pulse font-medium">
                  📞 Ringing line...
                </p>
              </div>

              <button
                type="button"
                onClick={handleEndCall}
                className="px-6 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel Call
              </button>
            </div>
          ) : (
            /* ---------------- LIVE ACTIVE TWO-WAY PHONE CALL (PURE AUDIO) ---------------- */
            <div className="flex flex-col items-center justify-between flex-1 relative z-10 space-y-5 my-auto">
              {/* Call Top Header */}
              <div className="w-full flex items-center justify-between py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-white tracking-wider">CONNECTED</span>
                  <span className="text-slate-500">•</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatCallTime(callDurationSeconds)}</span>
                </div>

                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Live Call</span>
                </div>
              </div>

              {/* Central Caller Visualization & Sound Waves */}
              <div className="flex flex-col items-center justify-center my-auto space-y-4">
                {/* Caller Pulse Avatar */}
                <div className="relative">
                  {/* Outer Ripple Rings */}
                  <div
                    className={`absolute -inset-4 rounded-full transition-all duration-700 pointer-events-none ${
                      isSpeaking
                        ? 'bg-rose-500/20 scale-125 animate-ping'
                        : isListening
                        ? 'bg-cyan-500/20 scale-115 animate-pulse'
                        : isThinking
                        ? 'bg-amber-500/20 scale-110 animate-pulse'
                        : 'opacity-0'
                    }`}
                  />
                  <div
                    className={`absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none ${
                      isSpeaking
                        ? 'bg-gradient-to-tr from-rose-500/30 to-amber-500/30 animate-pulse'
                        : isListening
                        ? 'bg-gradient-to-tr from-cyan-500/30 to-emerald-500/30 animate-pulse'
                        : 'opacity-0'
                    }`}
                  />

                  {/* Main Call Avatar */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-white">
                      <Headphones className="w-10 h-10 text-cyan-300 drop-shadow" />
                    </div>
                  </div>
                </div>

                {/* Animated 12-Bar Live Voice Waveform */}
                <div className="flex items-center justify-center gap-1.5 h-9 px-4 py-1 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner">
                  {[24, 40, 16, 32, 48, 20, 36, 44, 28, 48, 16, 32].map((height, i) => {
                    const isBarActive = isSpeaking || isListening;
                    return (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isSpeaking
                            ? 'bg-gradient-to-t from-rose-500 to-amber-400'
                            : isListening
                            ? 'bg-gradient-to-t from-cyan-400 to-emerald-400'
                            : 'bg-slate-700 h-2'
                        }`}
                        style={{
                          height: isBarActive ? `${Math.max(6, height * (isSpeaking ? 0.9 : 0.6))}px` : '4px',
                          animation: isBarActive ? `pulse 0.7s infinite alternate ease-in-out ${i * 0.08}s` : 'none',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Pure Spoken Status */}
                <div className="text-center space-y-1">
                  <p className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk']">
                    {isSpeaking
                      ? 'Speaking...'
                      : isThinking
                      ? 'Connecting...'
                      : isListening
                      ? 'Listening to you... (Speak now)'
                      : isMuted
                      ? 'Microphone Muted'
                      : 'Call Connected'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isSpeaking
                      ? 'Advisor speaking over line'
                      : isListening
                      ? 'Speak naturally or tap a caller question below'
                      : 'Live telephone call in progress'}
                  </p>
                </div>
              </div>

              {/* Touch-Tone Caller Topic Keys (Speed dial common questions verbally) */}
              <div className="w-full space-y-2 pt-2 border-t border-slate-900/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Speed-Dial Questions (Spoken Over Line):</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleTapToSpeak}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isListening
                        ? 'bg-emerald-500 text-slate-950 animate-pulse'
                        : 'bg-slate-900 text-cyan-300 border border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Mic className="w-3 h-3" />
                    <span>{isListening ? 'Mic Active' : 'Tap to Speak'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CALLER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => handleLiveVoiceAsk(prompt.query)}
                      className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group flex items-center gap-2"
                    >
                      <span className="text-base shrink-0">{prompt.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                          {prompt.label}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Controls Bar (Mute, End Call, Speaker) */}
              <div className="w-full pt-4 flex items-center justify-center gap-4 border-t border-slate-800/80">
                {/* Mute Button */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
                    isMuted
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* End Call Button */}
                <button
                  type="button"
                  onClick={handleEndCall}
                  className="px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-xl shadow-rose-600/30 cursor-pointer"
                >
                  <PhoneOff className="w-5 h-5" />
                  <span>End Call</span>
                </button>

                {/* Speaker Button */}
                <button
                  type="button"
                  onClick={handleToggleSpeaker}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
                    !speakerEnabled
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={speakerEnabled ? 'Mute speaker' : 'Enable speaker'}
                >
                  {speakerEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
