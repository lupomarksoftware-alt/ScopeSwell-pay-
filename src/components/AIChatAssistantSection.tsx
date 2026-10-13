import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Coins,
  Camera,
  TrendingUp,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  MessageCircle,
  Building,
  UserCheck,
  HelpCircle,
  Flame
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface QuickTopic {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'rates',
    label: 'Creator Payout Rates',
    icon: <Coins className="w-3.5 h-3.5 text-amber-400" />,
    prompt: 'What are the exact creator payout rates per reach in Tallinn, Helsinki, and Stockholm?',
  },
  {
    id: 'escrow',
    label: 'Escrow & 100% Refunds',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
    prompt: 'How does automated escrow protect business budgets and guarantee instant refunds if reach is lower than expected?',
  },
  {
    id: 'reach-vs-views',
    label: 'Pay-Per-Reach vs Views',
    icon: <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />,
    prompt: 'Why is Pay-Per-Reach superior to raw views or impressions for both businesses and creators?',
  },
  {
    id: 'guide',
    label: '5-Step Story Guide',
    icon: <Camera className="w-3.5 h-3.5 text-rose-400" />,
    prompt: 'What is the step-by-step process for creators to post sponsored Stories and submit Instagram Insights proof?',
  },
  {
    id: 'credits',
    label: '1:1 Euro Credit Parity',
    icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
    prompt: 'How does the Platform Credit system work with €1.00 EUR parity and what is the minimum payout?',
  },
  {
    id: 'early-partners',
    label: 'Early Partner Perks',
    icon: <Bot className="w-3.5 h-3.5 text-pink-400" />,
    prompt: 'What special benefits, zero fees, and priority matching do Early Partners receive on ScopeSwell?',
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: `👋 **Hello! Welcome to the ScopeSwell Live Concierge.**

I am your active guide to ScopeSwell's automated Pay-Per-Reach marketplace. Whether you are an everyday Instagram creator wanting guaranteed payouts, or a business seeking risk-free audience reach, I'm here to answer questions, calculate earnings, and walk you through the platform.

How can I help you today? You can pick a path below or ask me anything directly!`,
    timestamp: 'Just now',
    suggestions: [
      "I'm a Creator — how much can I earn from my Stories?",
      "I'm a Business — how does automated escrow refund me?",
      "How do you verify reach from 24h Instagram Insights?"
    ]
  },
];

// Helper to render basic markdown formatting cleanly
function renderFormattedContent(text: string) {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-base font-bold text-white mt-3 mb-1 font-['Space_Grotesk'] flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-rose-500" />
              {trimmed.replace('### ', '')}
            </h4>
          );
        }

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const itemText = trimmed.replace(/^[\*\-]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 ml-1 text-slate-300">
              <span className="text-rose-400 font-bold text-base leading-none select-none">•</span>
              <div>{parseInlineMarkdown(itemText)}</div>
            </div>
          );
        }

        if (/^\d+\.\s+/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 ml-1 text-slate-300">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <div>{parseInlineMarkdown(numMatch[2])}</div>
              </div>
            );
          }
        }

        return <p key={idx}>{parseInlineMarkdown(trimmed)}</p>;
      })}
    </div>
  );
}

function parseInlineMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 font-mono text-xs text-amber-300 font-semibold"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export const AIChatAssistantSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [activePersona, setActivePersona] = useState<'all' | 'creator' | 'business'>('all');

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: 'Now',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const historyPayload = newMessages.slice(-8).map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "ScopeSwell is the automated Pay-Per-Reach marketplace with 1:1 EUR parity at scopeswell.com.";
      const returnedSuggestions = Array.isArray(data.suggestions) && data.suggestions.length > 0
        ? data.suggestions
        : [
            "How do I withdraw my earnings?",
            "What happens if my reach is lower than expected?",
            "Can I see an example of an Insights proof screenshot?"
          ];

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: 'Now',
        suggestions: returnedSuggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackReply: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content: `### ScopeSwell Key Information

* **Rates**: Fixed **€0.03 – €0.08** per verified unique account reached across European cities.
* **Escrow**: Pre-funded budgets are locked in automated escrow; unused reach budget is **immediately refunded**.
* **Currency**: Strict 1:1 Euro parity (**1 Credit = €1.00 EUR**) with direct bank/IBAN payouts (minimum €20).
* **Story Proof**: Captured from official 24-hour Instagram Story Insights ("Accounts Reached").

Would you like to calculate your potential story earnings or learn how to launch a campaign?`,
        timestamp: 'Now',
        suggestions: [
          "Calculate earnings for 2,500 reach",
          "How does escrow protect brand budgets?",
          "How do I sign up on scopeswell.com?"
        ]
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputQuery('');
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 100);
  };

  const handleSelectPersona = (persona: 'creator' | 'business') => {
    setActivePersona(persona);
    if (persona === 'creator') {
      handleSendMessage("I am an Instagram creator. How does ScopeSwell work for me, what are the payout rates, and how do I get started?");
    } else {
      handleSendMessage("I am a business owner. How does ScopeSwell work for brands, how does escrow protect my budget, and how do I launch a campaign?");
    }
  };

  return (
    <section
      id="ai-chat"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#0b0f17] via-[#0e1320] to-[#070a10] border-t border-slate-800/80"
    >
      <div id="ai-instructor" className="sr-only" aria-hidden="true" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Interactive Platform Concierge</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-300 font-mono text-[11px]">Conversational Mode</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Chat Live with the ScopeSwell Assistant
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Have a continuous, intelligent conversation. Ask about city rates, calculate story earnings,
            understand automated escrow refunds, or plan your next campaign.
          </p>

          {/* Persona quick switch buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleSelectPersona('creator')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>I'm a Creator — Calculate Earnings</span>
            </button>
            <button
              onClick={() => handleSelectPersona('business')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              <span>I'm a Business — Escrow & Campaigns</span>
            </button>
          </div>
        </div>

        {/* Quick Topic Chips */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-rose-400" />
              Quick Starters
            </span>
            <span className="text-slate-500 text-[11px] font-normal hidden sm:inline">Tap to ask instantly</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSendMessage(topic.prompt)}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-left transition-all group flex flex-col justify-between gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="p-1.5 rounded-lg bg-slate-800/80 group-hover:bg-slate-700/80 transition-colors">
                    {topic.icon}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-2 leading-tight">
                  {topic.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Box Container */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c101a]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[650px] sm:h-[720px]">
          {/* Chat Window Top Bar */}
          <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c101a]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">ScopeSwell Concierge</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    Multi-Turn Conversation
                  </span>
                </div>
                <p className="text-xs text-slate-400">Remembers context • Answers with live platform math</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </span>
              <button
                onClick={handleClearChat}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={chatScrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
          >
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                      isUser
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm'
                        : 'bg-gradient-to-br from-rose-500 to-amber-500 shadow-sm'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`group relative max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3.5 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white rounded-tr-none'
                        : 'bg-slate-900/90 border border-slate-800/80 text-slate-100 rounded-tl-none backdrop-blur-md'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div>
                        {renderFormattedContent(message.content)}

                        {/* Interactive Clickable Follow-Up Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-slate-800/70">
                            <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>Suggested Follow-Ups (Tap to ask):</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {message.suggestions.map((sug, sIdx) => (
                                <button
                                  key={sIdx}
                                  onClick={() => handleSendMessage(sug)}
                                  disabled={isLoading}
                                  className="text-left px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 hover:border-rose-500/50 text-xs text-rose-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 group/sug disabled:opacity-50"
                                >
                                  <span>{sug}</span>
                                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover/sug:text-rose-400 group-hover/sug:translate-x-0.5 transition-all shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Copy button & metadata */}
                        <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
                          <span className="text-[10px] font-mono">ScopeSwell Knowledge</span>
                          <button
                            onClick={() => handleCopyMessage(message.id, message.content)}
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-800 cursor-pointer"
                            title="Copy response to clipboard"
                          >
                            {copiedMessageId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-[11px] text-emerald-400 font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[11px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Thinking / Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800/80 px-4 py-3.5 text-slate-300 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Thinking and calculating response...</span>
                </div>
              </div>
            )}

          </div>

          {/* Input Bar */}
          <div className="p-3.5 sm:p-4 bg-slate-900/90 border-t border-slate-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question or continue the conversation..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all pr-10"
                />
                {inputQuery && (
                  <button
                    type="button"
                    onClick={() => setInputQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-md shadow-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Multi-turn conversational assistant with live memory</span>
              </span>
              <a
                href={APP_CONFIG.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 font-semibold"
              >
                <span>Launch App ({APP_CONFIG.appDisplayDomain})</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
