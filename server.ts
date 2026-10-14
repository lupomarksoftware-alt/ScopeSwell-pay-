import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI with server-side API key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Concise, smart, high-signal ScopeSwell system instruction
const SCOPESWELL_SYSTEM_INSTRUCTION = `You are the ScopeSwell Smart Assistant — the official, razor-sharp platform expert for ScopeSwell (web app at https://scopeswell.com, documentation hub at https://scopeswell.space).

STRICT BREVITY & RESPONSE RULES (CRITICAL):
- BE SHORT & SMART: Maximum 2 to 4 crisp sentences total (or 2 to 3 compact bullet points with exact numbers). Never write essays or filler paragraphs.
- ANSWER IMMEDIATELY: State the exact rate, formula, or rule in the very first sentence. No generic intro greetings.
- SMART PRECISION: Provide a quick mathematical example with numbers (e.g., "1,500 reach in Helsinki earns €75.00 EUR").
- END WITH 1 SHORT QUESTION: Ask 1 friendly, brief follow-up question.
- SUGGESTIONS TAG: On a new line at the very end, provide 2 to 3 concise suggested questions:
[SUGGESTIONS: "Question 1?", "Question 2?"]

ESSENTIAL SCOPESWELL FACTS:
1. Pay-Per-Reach: Brands pay ONLY for verified unique human accounts reached via official 24h Instagram Story Insights (duplicate loop views are free).
2. Fixed Rates: Tallinn/Baltics = €0.03/reach (€30/1,000 reach); Helsinki/Nordics = €0.05/reach (€50/1,000 reach); Stockholm/Western EU = €0.06–€0.08/reach (€60–€80/1,000 reach); Berlin = €0.05/reach.
3. Currency: 1 Credit = €1.00 EUR fixed 1:1 parity. Minimum creator payout: €20.00 EUR (SEPA/IBAN, Revolut, digital wallet).
4. Automated Escrow: Business budgets are locked in escrow. Creators are paid strictly for verified reach; all unused budget is refunded immediately and automatically.
5. 5 Steps: (1) Free 30s switch to Instagram Creator account, (2) Accept campaign on scopeswell.com, (3) Post 24h Story with brand tag, (4) Screenshot Story Insights "Accounts Reached", (5) Instant EUR escrow payout upon verification.
6. Multilingual: Reply fluently in the user's detected language with the same short, smart conciseness.`;

// Parse suggestions tag [SUGGESTIONS: "A", "B"] from output
function parseResponseAndSuggestions(text: string): { reply: string; suggestions: string[] } {
  const match = text.match(/\[SUGGESTIONS:\s*(\[[^\]]+\]|"[^"]+"(?:,\s*"[^"]+")+|'[^']+'(?:,\s*'[^']+')+)\]/i);
  let suggestions: string[] = [];
  let cleanReply = text;

  if (match) {
    cleanReply = text.replace(match[0], '').trim();
    const rawSuggestions = match[1];
    try {
      if (rawSuggestions.startsWith('[')) {
        suggestions = JSON.parse(rawSuggestions);
      } else {
        const extracted = rawSuggestions.match(/"([^"]+)"|'([^']+)'/g);
        if (extracted) {
          suggestions = extracted.map(s => s.replace(/^["']|["']$/g, '').trim());
        }
      }
    } catch {
      suggestions = [];
    }
  }

  if (suggestions.length === 0) {
    suggestions = [
      "What are the rates in my city?",
      "How does escrow protect brand budgets?",
      "How do I withdraw my earnings?"
    ];
  }

  return { reply: cleanReply, suggestions: suggestions.slice(0, 3) };
}

// Build valid multi-turn contents with strictly alternating user and model turns
function buildValidContents(history: any[], newMessage: string) {
  const turns: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

  if (Array.isArray(history)) {
    for (const item of history.slice(-8)) {
      const text = (item.content || item.text || '').trim();
      if (!text) continue;
      const role: 'user' | 'model' = item.role === 'assistant' || item.role === 'model' ? 'model' : 'user';

      if (turns.length > 0 && turns[turns.length - 1].role === role) {
        turns[turns.length - 1].parts[0].text += `\n\n${text}`;
      } else {
        turns.push({ role, parts: [{ text: text.slice(0, 1500) }] });
      }
    }
  }

  // Ensure first turn is user
  if (turns.length > 0 && turns[0].role === 'model') {
    turns.shift();
  }

  // Append new user message (combine if last was user to preserve alternation)
  if (turns.length > 0 && turns[turns.length - 1].role === 'user') {
    turns[turns.length - 1].parts[0].text += `\n\n${newMessage}`;
  } else {
    turns.push({ role: 'user', parts: [{ text: newMessage }] });
  }

  return turns;
}

// Short, smart, punchy fallback knowledge engine
function getDynamicFallback(query: string, history: any[] = []): { reply: string; suggestions: string[] } {
  const q = query.toLowerCase();

  if (q.includes('rate') || q.includes('earn') || q.includes('how much') || q.includes('payout') || q.includes('money') || q.includes('tallinn') || q.includes('helsinki') || q.includes('stockholm') || q.includes('berlin')) {
    return {
      reply: `**Fixed Creator Rates per Verified Unique Reach:**\n* **Tallinn**: €0.03/reach (1,000 reach = **€30.00**)\n* **Helsinki**: €0.05/reach (1,000 reach = **€50.00**)\n* **Stockholm**: €0.06–€0.08/reach (1,000 reach = **€60–€80**)\n\nPayouts are in real EUR with a **€20.00 minimum**. How many accounts do your Stories usually reach?`,
      suggestions: [
        "Calculate for 2,500 reach",
        "How do I withdraw once I reach €20?",
        "How does automated escrow protect brands?"
      ]
    };
  }

  if (q.includes('withdraw') || q.includes('bank') || q.includes('iban') || q.includes('wallet') || q.includes('revolut') || q.includes('threshold') || q.includes('minimum')) {
    return {
      reply: `**Creator Withdrawals on ScopeSwell:**\n* **Minimum**: **€20.00 EUR** (20 Credits).\n* **Methods**: Direct SEPA bank transfer (IBAN), Revolut, or digital wallet.\n* **Parity**: Strict 1:1 Euro parity (€1.00 = 1 Credit) with zero exchange cuts.\n\nReady to link your account on **scopeswell.com**?`,
      suggestions: [
        "How do I connect my Instagram Creator profile?",
        "What are the rates in Helsinki and Stockholm?",
        "How does automated escrow protect brand budgets?"
      ]
    };
  }

  if (q.includes('escrow') || q.includes('refund') || q.includes('protect') || q.includes('business') || q.includes('brand') || q.includes('safe') || q.includes('risk')) {
    return {
      reply: `**Automated Escrow & 100% Refunds:**\n* Brands pre-fund campaigns in escrow and pay **strictly for verified reach**.\n* If you budget €100 for 2,000 reach and achieve 1,400 (€70 creator pay), the remaining **€30 is refunded instantly** to your wallet.\n\nWould you like to test an estimate for your business?`,
      suggestions: [
        "What is the minimum budget to test a campaign?",
        "How is reach verified without passwords?",
        "Why is reach better than raw view loops?"
      ]
    };
  }

  if (q.includes('step') || q.includes('proof') || q.includes('guide') || q.includes('how to') || q.includes('post') || q.includes('insights') || q.includes('screenshot')) {
    return {
      reply: `**5-Step Story Posting Process:**\n1. Switch Instagram to Creator/Professional mode (free in 30s).\n2. Accept a brand campaign on **scopeswell.com**.\n3. Post the 24h Story with brand @tag or link sticker.\n4. Screenshot official Insights showing "Accounts Reached" after 24 hours.\n5. Upload screenshot for automated audit and instant EUR release.\n\nDo you already have a Creator account active on Instagram?`,
      suggestions: [
        "Do I need a minimum follower count to join?",
        "Can I see what an Insights proof screenshot looks like?",
        "What happens if my Story gets deleted early?"
      ]
    };
  }

  return {
    reply: `**Welcome to ScopeSwell!**\n* **Creators**: Earn **€0.03 to €0.08 per verified reach** with direct EUR bank payouts (minimum €20).\n* **Businesses**: Pre-funded escrow guarantees you only pay for actual eyeballs—unspent budget is **refunded automatically**.\n\nAre you looking to join as a **creator** or launch a campaign as a **business**?`,
    suggestions: [
      "I'm a Creator — calculate my earnings",
      "I'm a Business — how does escrow protect my budget?",
      "What are the rates in Tallinn, Helsinki & Stockholm?"
    ]
  };
}

// Main Chat Endpoint with short, smart, fast execution
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message string is required' });
      return;
    }

    const trimmed = message.trim();
    if (!trimmed) {
      res.status(400).json({ error: 'Message cannot be empty' });
      return;
    }

    if (apiKey) {
      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
      const contents = buildValidContents(history, trimmed);

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: SCOPESWELL_SYSTEM_INSTRUCTION,
              temperature: 0.6,
              maxOutputTokens: 320, // Strict brevity instruction
            },
          });

          const rawText = response.text?.trim();
          if (rawText) {
            const parsed = parseResponseAndSuggestions(rawText);
            res.json({
              reply: parsed.reply,
              suggestions: parsed.suggestions,
              source: model,
            });
            return;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${model} notice:`, modelErr?.status || modelErr?.message);
        }
      }
    }

    const fallback = getDynamicFallback(trimmed, history);
    res.json({
      reply: fallback.reply,
      suggestions: fallback.suggestions,
      source: 'knowledge-engine',
    });
  } catch (err: any) {
    const fallback = getDynamicFallback(req.body?.message || '');
    res.status(200).json({
      reply: fallback.reply,
      suggestions: fallback.suggestions,
      source: 'knowledge-engine',
    });
  }
});

// Backwards-compatible endpoint for existing callers
app.post('/api/instructor/ask', async (req, res) => {
  const query = req.body?.question || req.body?.message || '';
  const fallback = getDynamicFallback(query);
  res.json({
    answer: fallback.reply,
    detectedLanguage: 'en',
    audioBase64: null,
  });
});

// Start server with Vite middleware in dev
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
