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

const SCOPESWELL_SYSTEM_INSTRUCTION = `You are the ScopeSwell AI Assistant — the official, intelligent, and authoritative platform expert for ScopeSwell (https://scopeswell.com, with educational hub at https://scopeswell.space).

YOUR PERSONALITY & COMMUNICATION STYLE:
- Expert, direct, smart, and helpful.
- Provide crisp, well-structured answers using clean Markdown (bullet points, bold highlights, concise numbers, and step-by-step guides).
- Avoid fluff, filler intros, or generic disclaimers. Get straight to the answer with actionable precision.
- Respond in the exact language the user used (English, Spanish, German, French, Italian, Estonian, Finnish, Swedish, etc.).

COMPREHENSIVE SCOPESWELL KNOWLEDGE BASE:

1. CORE MISSION & VALUE PROPOSITION:
- ScopeSwell is the automated Pay-Per-Reach Instagram Story marketplace connecting verified Instagram creators with businesses, e-commerce brands, and local venues.
- Key Innovation: Pay-Per-Reach eliminates influencer fraud and inflated pricing. Brands pay ONLY for real, unique human eyeballs verified through official Instagram Insights.
- Web Application: Hosted at https://scopeswell.com for creator and brand dashboards.
- Marketing & Docs Hub: Hosted at https://scopeswell.space.

2. PAY-PER-REACH VS. RAW VIEWS & IMPRESSIONS:
- Impressions / Views count repeated loops from the same person and bot activity.
- Reach ("Accounts Reached" in Instagram Insights) measures distinct, unique individual accounts that viewed the Story.
- On ScopeSwell, payment is tied 100% to verified unique Reach. Duplicate loops are never billed.

3. CURRENCY & 1:1 EURO PARITY:
- Platform Currency: Platform Credits.
- Fixed 1:1 Parity: 1 Credit = €1.00 EUR. No crypto volatility, no hidden exchange fees.
- Businesses pre-fund campaigns in Credits (€1 = 1 Credit).
- Creators earn Credits and withdraw directly in real EUR to SEPA/IBAN bank accounts, Revolut, or digital wallets.
- Minimum Creator Payout Threshold: €20.00 EUR.

4. CREATOR PAYOUT RATES & EARNINGS FORMULA:
- Formula: Creator Earnings = Verified Unique Accounts Reached × City Tier Rate.
- City & Regional Rates:
  * Tallinn & Baltic Tier: €0.03 per verified reach (~€30.00 per 1,000 unique reach).
  * Helsinki & Nordic Tier: €0.05 per verified reach (~€50.00 per 1,000 unique reach).
  * Stockholm & Western EU Tier: €0.06 to €0.08 per verified reach (~€60.00 - €80.00 per 1,000 unique reach).
- Example: A creator in Helsinki reaching 2,500 unique accounts earns €125.00 EUR for a single 24-hour Story.

5. BUSINESS ESCROW & AUTOMATED REFUND GUARANTEE:
- Pre-funded campaign budgets are locked securely in automated smart escrow.
- If a business deposits €100 for an estimated 2,000 reach target, and the creator achieves 1,400 verified unique reach:
  * The creator is paid €70.00 EUR.
  * The remaining unused €30.00 EUR is IMMEDIATELY and AUTOMATICALLY refunded back to the business wallet.
- Zero budget risk for businesses. You never pay for unreached audience.

6. 5-STEP CREATOR PROCESS:
- Step 1: 30-Second Professional Account Setup — Creator switches free Instagram account to Professional/Creator (Settings > Account type > Switch to professional account) to enable Insights access.
- Step 2: Accept Campaign — Browse active campaigns on scopeswell.com matching your niche and accept.
- Step 3: Post 24-Hour Story — Post the approved Story with brand @tag, swipe-up link sticker, or promo code. Story must stay live for the full 24 hours.
- Step 4: Insights Proof Capture — After 24h, take a screenshot of Instagram Story Insights showing "Accounts Reached" (available in Instagram Archive > Stories).
- Step 5: Automated Audit & Instant Escrow Release — Upload the screenshot. Automated verification confirms unique reach and releases EUR funds into creator wallet.

7. EARLY PARTNER PROGRAM:
- Early Creators & Businesses who register now receive:
  * 0% platform transaction fees during launch.
  * Priority campaign matching algorithm placement.
  * Lifetime Early Partner status badge.`;

const FALLBACK_TOPICS: Array<{
  keywords: string[];
  answer: string;
}> = [
  {
    keywords: ['rate', 'earn', 'how much', 'payout', 'money', 'cuanto', 'ganan', 'wieviel', 'verdienen', 'combien', 'quanto', 'kui palju', 'paljonko', 'hur mycket'],
    answer: `### Creator Payout Rates on ScopeSwell

Creators earn fixed payments based on **verified unique accounts reached** via official Instagram Insights:

* **Tallinn & Baltics**: **€0.03** per verified reach (~**€30.00** per 1,000 reach)
* **Helsinki & Nordics**: **€0.05** per verified reach (~**€50.00** per 1,000 reach)
* **Stockholm & Western EU**: **€0.06 – €0.08** per verified reach (~**€60 – €80** per 1,000 reach)

**Earnings Formula**: \`Total Payout = Unique Accounts Reached × City Tier Rate\`

* **Currency**: 1 Platform Credit = **€1.00 EUR** fixed.
* **Minimum Payout**: **€20.00 EUR** directly to SEPA bank account, Revolut, or digital wallet.`
  },
  {
    keywords: ['escrow', 'refund', 'guarantee', 'safe', 'protect', 'reembolso', 'garantía', 'depósito', 'treuhand', 'erstattung', 'séquestre', 'remboursement', 'deposito', 'rimborso', 'sulkutil', 'palautus', 'tagastus', 'deponeer'],
    answer: `### Automated Escrow & 100% Refund Guarantee

ScopeSwell protects brand budgets with automated escrow:

1. **Pre-Funded Budget**: When a business launches a campaign, the budget is locked safely in automated smart escrow.
2. **Pay Strictly for Results**: The creator is paid solely for verified unique accounts reached at the agreed city rate.
3. **Instant Automated Refund**: If a campaign achieves less reach than the budget cap, all remaining unspent funds are **immediately refunded** back to the business wallet.

**Example**: You budget €100 for 2,000 reach. If the Story reaches 1,500 unique accounts, the creator receives €75, and **€25 is refunded instantly** to your wallet.`
  },
  {
    keywords: ['reach', 'view', 'impression', 'why', 'difference', 'por qué', 'alcance', 'vistas', 'warum', 'reichweite', 'pourquoi', 'portée', 'perché', 'copertura', 'miks', 'ulatus', 'miksi', 'tavoittavuus'],
    answer: `### Why Pay-Per-Reach Beats Raw Views & Impressions

* **Raw Views / Impressions Flaw**: A single user re-watching a story 5 times generates 5 impressions. Bots, auto-clickers, and loop spam inflate views without adding new potential customers.
* **Unique Accounts Reached (ScopeSwell Standard)**: Measures distinct, real human accounts who saw the Story, verified directly from Instagram Story Insights.
* **The Benefit**: Brands pay exclusively for genuine audience attention. Zero wasted spend on replay loops.`
  },
  {
    keywords: ['step', 'how to', 'process', 'post', 'proof', 'guide', 'paso', 'cómo', 'schritt', 'anleitung', 'étape', 'comment', 'passo', 'come', 'samm', 'kuidas', 'vaihe', 'miten', 'steg', 'hur'],
    answer: `### 5-Step Creator Process on ScopeSwell

1. **Enable Creator Mode (30s)**: Switch your free Instagram account to Professional/Creator (*Settings > Account > Switch to Professional Account*) to unlock Insights.
2. **Accept Campaign**: Log into **scopeswell.com** and accept a sponsored Story campaign matching your niche.
3. **Post 24h Story**: Publish the approved Story with brand @tag, link sticker, or promo code. Keep it live for the full 24 hours.
4. **Capture Insights Screenshot**: Once the 24 hours expire, open Instagram Archive > Story Insights and capture a screenshot showing **"Accounts Reached"**.
5. **Automated Audit & Instant EUR Payout**: Upload proof to ScopeSwell. Automated audit verifies unique reach and releases EUR funds into your balance.`
  },
  {
    keywords: ['credit', 'euro', 'currency', 'eur', 'payout threshold', 'withdraw', 'iban', 'sepa', 'crédito', 'krediit', 'kredit'],
    answer: `### Platform Credits & EUR Currency Parity

* **1:1 Strict Parity**: **1 Platform Credit = €1.00 EUR**.
* **Transparent Pricing**: No crypto tokens, no speculative price swings, no hidden foreign exchange cuts.
* **Withdrawals**: Creators can withdraw accumulated balance at any time once reaching the **€20.00 EUR minimum threshold**.
* **Supported Methods**: SEPA bank transfer (IBAN), Revolut, and direct digital wallets.`
  }
];

function getSmartFallbackAnswer(query: string): string {
  const q = query.toLowerCase();
  for (const item of FALLBACK_TOPICS) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return item.answer;
    }
  }

  return `### ScopeSwell Platform Overview

ScopeSwell is the automated **Pay-Per-Reach Instagram Story marketplace** (app on **scopeswell.com**, guides on **scopeswell.space**).

* **How It Works**: Brands sponsor 24-hour Instagram Stories and pay strictly for **verified unique accounts reached** (€0.03 to €0.08 per reach).
* **Guaranteed Escrow**: Business budgets are secured in escrow; unused reach budget is automatically refunded.
* **1:1 Parity**: 1 Credit = **€1.00 EUR**, with direct bank/IBAN payouts (minimum €20).
* **Verification**: Transparent proof via 24h Instagram Story Insights screenshots.

Ask me about creator payout rates, automated escrow refunds, or the 5-step posting guide!`;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
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

    if (!apiKey) {
      res.status(200).json({
        reply: getSmartFallbackAnswer(trimmed),
        source: 'knowledge-engine',
      });
      return;
    }

    try {
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.text && typeof item.text === 'string') {
            contents.push({
              role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
              parts: [{ text: item.text.slice(0, 1000) }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: trimmed }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SCOPESWELL_SYSTEM_INSTRUCTION,
          temperature: 0.5,
          maxOutputTokens: 800,
        },
      });

      const reply = response.text?.trim() || getSmartFallbackAnswer(trimmed);
      res.status(200).json({ reply, source: 'gemini-3.8-flash' });
    } catch {
      res.status(200).json({
        reply: getSmartFallbackAnswer(trimmed),
        source: 'knowledge-engine',
      });
    }
  } catch {
    res.status(200).json({
      reply: getSmartFallbackAnswer(''),
      source: 'knowledge-engine',
    });
  }
}
