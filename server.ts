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

// Highly engaging, conversational ScopeSwell knowledge base
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
- The automated Pay-Per-Reach Instagram Story marketplace connecting verified Instagram creators with businesses, DTC brands, and local venues.
- Web Application: https://scopeswell.com (where users sign up, manage campaigns, and withdraw funds).
- Documentation & Info Hub: https://scopeswell.space.

2. PAY-PER-REACH VS. RAW IMPRESSIONS:
- Impressions and views count the same user re-watching a story 5 times or bot loops.
- Unique Reach (Accounts Reached in official Instagram Story Insights) counts distinct real human profiles.
- Brands pay ONLY for verified unique humans who viewed the Story. Duplicate loops are 100% free.

3. 1:1 EURO CURRENCY PARITY:
- Platform Currency: Platform Credits.
- Fixed 1:1 Parity: 1 Credit = €1.00 EUR. No crypto tokens, no speculative swings, no hidden fees.
- Minimum Creator Payout Threshold: €20.00 EUR directly to bank account via SEPA/IBAN, Revolut, or digital wallet.

4. CREATOR PAYOUT RATES BY CITY:
- Creator Earnings = Verified Unique Accounts Reached × City Tier Rate.
- Rates:
  * Tallinn & Baltic tier: €0.03 per verified unique reach (1,000 reach = €30; 2,500 reach = €75).
  * Helsinki & Nordic tier: €0.05 per verified unique reach (1,000 reach = €50; 2,500 reach = €125).
  * Stockholm & Western EU tier: €0.06 – €0.08 per reach (1,000 reach = €60–€80; 2,500 reach = €150–€200).
  * Berlin / Central EU: €0.05 per reach.

5. BUSINESS ESCROW & AUTOMATED REFUND GUARANTEE:
- When a business funds a campaign, the budget is held in automated escrow.
- The creator is paid strictly for actual verified unique reach achieved up to the target cap.
- If a campaign achieves less reach than budgeted (e.g., budgeted €100 for 2,000 reach, but story reaches 1,400):
  * Creator earns €70.00 EUR for the 1,400 verified reach.
  * The remaining €30.00 EUR is IMMEDIATELY and AUTOMATICALLY refunded back into the business wallet.
- Zero ad budget waste.

6. 5-STEP CREATOR PROCESS:
- Step 1: Free 30-Second Creator Account — Switch free Instagram account to Professional/Creator to enable Insights (Settings > Account type > Switch to professional account).
- Step 2: Accept Campaign — Browse active brand campaigns on scopeswell.com and accept.
- Step 3: Post 24h Story — Post approved Story with brand @tag, swipe-up link sticker, or promo code. Keep live for full 24 hours.
- Step 4: Insights Proof Screenshot — After 24h, capture screenshot of Instagram Story Insights showing "Accounts Reached" (in Instagram Archive > Stories).
- Step 5: Instant EUR Payout — Upload screenshot. Automated audit confirms metrics and releases funds from escrow to creator wallet.

7. EARLY PARTNER PERKS:
- 0% platform transaction fees during launch.
- Priority campaign matching in the algorithm.
- Exclusive founder badge on profile.

8. MULTILINGUAL SUPPORT:
- Detect the user's language (English, Spanish, German, French, Italian, Estonian, Finnish, Swedish, etc.) and reply fluently in that language, including localized suggestions.`;

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
      "How do creator payouts work in my city?",
      "How does the escrow refund guarantee protect brands?",
      "What are the 5 steps to post and verify a Story?"
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

// Rich multi-turn fallback knowledge engine
function getDynamicFallback(query: string, history: any[] = []): { reply: string; suggestions: string[] } {
  const q = query.toLowerCase();

  if (q.includes('rate') || q.includes('earn') || q.includes('how much') || q.includes('payout') || q.includes('money') || q.includes('tallinn') || q.includes('helsinki') || q.includes('stockholm') || q.includes('berlin')) {
    return {
      reply: `### Fixed Pay-Per-Reach Rates & Creator Earnings

On ScopeSwell, creators earn guaranteed payments based on **verified unique accounts reached** from official 24-hour Instagram Story Insights:

* **Tallinn & Baltics**: **€0.03** per verified reach (*e.g., 1,500 reach = €45.00 EUR*)
* **Helsinki & Nordics**: **€0.05** per verified reach (*e.g., 1,500 reach = €75.00 EUR*)
* **Stockholm & Western EU**: **€0.06 – €0.08** per verified reach (*e.g., 1,500 reach = €90.00 – €120.00 EUR*)
* **Berlin & Central EU**: **€0.05** per verified reach

**Currency Rules**:
* **1 Platform Credit = €1.00 EUR** fixed 1:1 parity.
* Minimum payout threshold is **€20.00 EUR** sent directly via SEPA bank transfer (IBAN), Revolut, or digital wallet.

How many unique accounts do your Instagram Stories typically reach, or would you like me to calculate your estimated monthly earnings?`,
      suggestions: [
        "Calculate my earnings for 2,500 reach",
        "How do I withdraw once I reach €20?",
        "How does automated escrow protect businesses?"
      ]
    };
  }

  if (q.includes('withdraw') || q.includes('bank') || q.includes('iban') || q.includes('wallet') || q.includes('revolut') || q.includes('threshold') || q.includes('minimum')) {
    return {
      reply: `### Creator Withdrawals & Banking on ScopeSwell

Withdrawing your earnings is fast and straightforward:

* **Minimum Payout**: Once your wallet reaches **€20.00 EUR** (20 Credits), you can request a withdrawal at any time.
* **Payout Methods**:
  * Direct SEPA Bank Transfer (IBAN) across the European Union.
  * Revolut direct transfer.
  * Supported digital wallets.
* **Processing Speed**: Payouts are processed within 24 to 48 hours following the 24h Story Insights proof audit.
* **No Hidden Fees**: We enforce 1:1 Euro parity—€1.00 earned equals €1.00 received in your account.

Are you already signed up on **scopeswell.com**, or would you like to know how to connect your Instagram profile?`,
      suggestions: [
        "How do I connect my Instagram Creator profile?",
        "What are the rates in Helsinki and Stockholm?",
        "How does automated escrow protect brand budgets?"
      ]
    };
  }

  if (q.includes('escrow') || q.includes('refund') || q.includes('protect') || q.includes('business') || q.includes('brand') || q.includes('safe') || q.includes('risk')) {
    return {
      reply: `### How Automated Escrow & 100% Refunds Work

ScopeSwell eliminates the risk of influencer marketing through smart escrow:

1. **Pre-Funded Escrow**: When a brand launches a Story sponsorship, the campaign budget is locked safely in automated escrow.
2. **Pay Strictly for Real Humans**: The creator is paid solely for actual verified unique accounts reached.
3. **Instant Automated Refund**: If a Story achieves less reach than the budget cap, all remaining unspent funds are **immediately refunded** back into the business wallet.

**Real Example**:
* You budget **€100.00** for an estimated 2,000 reach target in Helsinki.
* The creator's Story reaches **1,400 verified unique accounts** (€70.00 + €10.50 fee = €80.50).
* **€19.50 EUR is refunded instantly** back to your business wallet upon 24-hour audit!

Are you considering running a campaign for your business or local venue?`,
      suggestions: [
        "What is the minimum budget to test a campaign?",
        "How is reach verified without sharing passwords?",
        "Why is reach better than raw view loops?"
      ]
    };
  }

  if (q.includes('step') || q.includes('proof') || q.includes('guide') || q.includes('how to') || q.includes('post') || q.includes('insights') || q.includes('screenshot')) {
    return {
      reply: `### The 5-Step Creator Story Process

Posting and earning on ScopeSwell is straightforward and 100% password-safe:

1. **Switch to Professional Account (30 seconds)**: In Instagram, go to *Settings > Account type > Switch to Professional/Creator Account*. This enables the official Insights tab.
2. **Accept a Campaign**: Browse active sponsored Story opportunities on **scopeswell.com** matching your niche.
3. **Publish the 24h Story**: Post the approved Story with the brand tag (\`@brand\`), link sticker, or promo code. Keep it live for the full 24 hours.
4. **Capture Insights Screenshot**: Once 24h expires, open Instagram *Archive > Stories > View Insights* and take a screenshot showing **"Accounts Reached"**.
5. **Instant EUR Payout**: Upload the screenshot to ScopeSwell. Automated audit verifies unique reach and instantly releases funds into your balance.

Do you currently have a Creator or Business account enabled on Instagram?`,
      suggestions: [
        "Do I need a minimum follower count to join?",
        "Can I see what an Insights proof screenshot looks like?",
        "What happens if my Story gets deleted early?"
      ]
    };
  }

  return {
    reply: `### Hello! Welcome to ScopeSwell

I am your ScopeSwell Concierge. ScopeSwell is the automated **Pay-Per-Reach Instagram Story marketplace** (web app at **https://scopeswell.com**, guides at **https://scopeswell.space**).

Here is the concept in a nutshell:
* **For Creators**: Monetize your everyday 24-hour Stories at **€0.03 to €0.08 per verified unique reach** with direct EUR bank payouts (minimum €20).
* **For Businesses**: Zero wasted budget. Funds are secured in automated escrow, and you only pay for actual unique human eyeballs—any unspent budget is **refunded immediately**.

To give you the most relevant breakdown: are you exploring ScopeSwell as a **creator**, a **business owner**, or just curious about how Pay-Per-Reach works?`,
    suggestions: [
      "I'm a Creator — how much can I make?",
      "I'm a Business — how does escrow protect my budget?",
      "What are the rates in Tallinn, Helsinki & Stockholm?"
    ]
  };
}

// Main Chat Endpoint with multi-turn conversation and suggestions
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
              temperature: 0.65,
              maxOutputTokens: 900,
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
