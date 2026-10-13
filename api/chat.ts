import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SCOPESWELL_SYSTEM_INSTRUCTION = `You are the ScopeSwell Conversational AI Concierge — an engaging, knowledgeable, and proactive expert on ScopeSwell (web app at https://scopeswell.com, documentation hub at https://scopeswell.space).

YOUR CONVERSATIONAL STYLE & PERSONALITY:
- Be warm, intelligent, engaging, and genuinely conversational.
- Don't just dump raw facts: explain concepts with clear numbers, real-life examples, and simple breakdowns.
- Format responses cleanly with Markdown: use bold text, clean bullet points, and brief calculation examples when appropriate.
- ALWAYS end your response with an engaging, friendly follow-up question that invites the user to continue the dialogue (e.g., asking if they are a creator or a business, what city they are in, or what their typical Story reach is).
- AT THE VERY END OF YOUR RESPONSE, on a new line, always provide 2 to 3 concise suggested follow-up questions formatted EXACTLY like this:
[SUGGESTIONS: "Question 1?", "Question 2?", "Question 3?"]

COMPREHENSIVE SCOPESWELL KNOWLEDGE BASE:

1. WHAT IS SCOPESWELL:
- Automated Pay-Per-Reach Instagram Story marketplace connecting verified creators with businesses, DTC brands, and local venues.
- Web Application: https://scopeswell.com
- Documentation & Info Hub: https://scopeswell.space.

2. PAY-PER-REACH VS. RAW IMPRESSIONS:
- Impressions and views count repeated loops from the same user and bots.
- Unique Reach (Accounts Reached in official Instagram Story Insights) counts distinct real human profiles.
- Brands pay ONLY for verified unique humans. Duplicate loops are 100% free.

3. 1:1 EURO CURRENCY PARITY:
- 1 Platform Credit = €1.00 EUR fixed parity. No crypto, no volatility, no hidden fees.
- Minimum Creator Payout Threshold: €20.00 EUR sent directly to bank account via SEPA/IBAN, Revolut, or digital wallet.

4. CREATOR PAYOUT RATES BY CITY:
- Tallinn & Baltics: €0.03 per verified reach (~€30 per 1,000 reach).
- Helsinki & Nordics: €0.05 per verified reach (~€50 per 1,000 reach).
- Stockholm & Western EU: €0.06 – €0.08 per reach (~€60–€80 per 1,000 reach).
- Berlin / Central EU: €0.05 per reach.

5. BUSINESS ESCROW & AUTOMATED REFUND GUARANTEE:
- Campaign budget is locked in automated escrow.
- Creator is paid strictly for verified unique reach achieved.
- Unspent reach budget is IMMEDIATELY and AUTOMATICALLY refunded back into the business wallet.

6. 5-STEP CREATOR PROCESS:
- 1: Switch to free Instagram Creator/Professional account (Settings > Account > Switch to professional account).
- 2: Accept campaign on scopeswell.com.
- 3: Post approved 24h Story with brand @tag or link sticker.
- 4: After 24h, capture screenshot of Instagram Insights showing "Accounts Reached".
- 5: Upload screenshot. Automated audit verifies metrics and releases EUR payout.`;

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
      "How do creator payouts work in my city?",
      "How does the escrow refund guarantee protect brands?",
      "What are the 5 steps to post and verify a Story?"
    ];
  }

  return { reply: cleanReply, suggestions: suggestions.slice(0, 3) };
}

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

  if (turns.length > 0 && turns[0].role === 'model') {
    turns.shift();
  }

  if (turns.length > 0 && turns[turns.length - 1].role === 'user') {
    turns[turns.length - 1].parts[0].text += `\n\n${newMessage}`;
  } else {
    turns.push({ role: 'user', parts: [{ text: newMessage }] });
  }

  return turns;
}

function getDynamicFallback(query: string): { reply: string; suggestions: string[] } {
  const q = query.toLowerCase();

  if (q.includes('rate') || q.includes('earn') || q.includes('how much') || q.includes('payout') || q.includes('money') || q.includes('tallinn') || q.includes('helsinki')) {
    return {
      reply: `### Fixed Pay-Per-Reach Rates & Creator Earnings

On ScopeSwell, creators earn guaranteed payments based on **verified unique accounts reached** from official 24-hour Instagram Story Insights:

* **Tallinn & Baltics**: **€0.03** per verified reach (*e.g., 1,500 reach = €45.00 EUR*)
* **Helsinki & Nordics**: **€0.05** per verified reach (*e.g., 1,500 reach = €75.00 EUR*)
* **Stockholm & Western EU**: **€0.06 – €0.08** per verified reach (*e.g., 1,500 reach = €90.00 – €120.00 EUR*)
* **Berlin & Central EU**: **€0.05** per verified reach

**Currency Rules**:
* **1 Platform Credit = €1.00 EUR** fixed parity.
* Minimum payout threshold is **€20.00 EUR** via SEPA bank transfer (IBAN), Revolut, or digital wallet.

How many unique accounts do your Instagram Stories typically reach?`,
      suggestions: [
        "Calculate my earnings for 2,500 reach",
        "How do I withdraw once I reach €20?",
        "How does automated escrow protect businesses?"
      ]
    };
  }

  if (q.includes('withdraw') || q.includes('bank') || q.includes('iban') || q.includes('wallet')) {
    return {
      reply: `### Creator Withdrawals & Banking on ScopeSwell

* **Minimum Payout**: **€20.00 EUR** (20 Credits) directly to SEPA bank transfer (IBAN) or Revolut.
* **1:1 Parity**: 1 Credit equals exactly €1.00 EUR with zero hidden exchange fees.
* **Speed**: Processed within 24–48 hours after your 24h Insights screenshot is verified.

Would you like to know how to connect your Instagram Creator profile?`,
      suggestions: [
        "How do I connect my Instagram Creator profile?",
        "What are the rates in Helsinki and Stockholm?",
        "How does automated escrow protect brand budgets?"
      ]
    };
  }

  return {
    reply: `### Hello! Welcome to ScopeSwell

I am your ScopeSwell Concierge. ScopeSwell is the automated **Pay-Per-Reach Instagram Story marketplace** (web app at **https://scopeswell.com**, guides at **https://scopeswell.space**).

* **For Creators**: Monetize your 24-hour Stories at **€0.03 to €0.08 per verified reach** with direct EUR payouts (minimum €20).
* **For Businesses**: Budgets are held in automated escrow, and you only pay for actual unique human eyeballs—any unspent budget is **refunded immediately**.

To give you the most relevant breakdown: are you exploring ScopeSwell as a **creator**, a **business owner**, or just curious?`,
    suggestions: [
      "I'm a Creator — how much can I make?",
      "I'm a Business — how does escrow protect my budget?",
      "What are the rates in Tallinn, Helsinki & Stockholm?"
    ]
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message, history } = req.body || {};
    const trimmed = (message || '').trim();

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
              temperature: 0.65,
              maxOutputTokens: 900,
            },
          });

          const rawText = response.text?.trim();
          if (rawText) {
            const parsed = parseResponseAndSuggestions(rawText);
            res.status(200).json({
              reply: parsed.reply,
              suggestions: parsed.suggestions,
              source: model,
            });
            return;
          }
        } catch {
          // fallback to next model
        }
      }
    }

    const fallback = getDynamicFallback(trimmed);
    res.status(200).json({
      reply: fallback.reply,
      suggestions: fallback.suggestions,
      source: 'knowledge-engine',
    });
  } catch {
    const fallback = getDynamicFallback('');
    res.status(200).json({
      reply: fallback.reply,
      suggestions: fallback.suggestions,
      source: 'knowledge-engine',
    });
  }
}
