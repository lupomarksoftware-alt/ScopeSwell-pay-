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

// Accurate, concise advisor knowledge base for live phone call interaction
const SCOPESWELL_SYSTEM_INSTRUCTION = `You are the ScopeSwell Platform Advisor speaking on a live telephone call.
Never refer to yourself as an AI, bot, virtual agent, or language model, and do not use personal names like Alex. Speak naturally as a helpful team advisor on the phone with a warm, pleasant, conversational male tone.

HOW YOU SPEAK ON THIS CALL:
- Exactly 1 or 2 natural spoken sentences. Keep it short, conversational, and direct like a real telephone conversation.
- Never use markdown formatting, asterisks, bullet points, or lists.
- Speak with a pleasant, upbeat, friendly male tone. Start naturally like "Hey there!", "Great question!", "Totally!", or "With ScopeSwell...".

KEY FACTS TO SHARE:
- ScopeSwell (scopeswell.com) connects local businesses and everyday Instagram creators through 24-hour Story sponsorships.
- Paid Per Reach: Businesses pay strictly for real, verified unique accounts reached—never duplicate loops or bot impressions.
- Creator Payouts: Creators earn fixed rates from €0.03 to €0.08 per verified unique reach (e.g. 1,000 unique reach earns €40), paid directly in EUR into their bank or wallet with a €20 minimum payout.
- Business Escrow: Pre-funded Credits (1 Credit = €1.00 EUR) are locked in automated escrow; unused reach budget is refunded automatically.
- Story Proof: After 24 hours, creators take a quick screenshot of their Instagram Story Insights showing "Accounts Reached" and submit it for automated audit.
- Early Partners: Registering early unlocks priority matching, zero platform fee perks, and founder benefits.`;

// Helper: Generate natural, warm male human voice audio using gemini-3.8-flash-lite-tts
async function generateHumanVoice(text: string): Promise<string | null> {
  if (!apiKey) return null;
  try {
    const cleanText = text.replace(/[*#_`]/g, '').trim();
    if (!cleanText) return null;

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                // Natural warm male phone call advisor style
                style: 'Warm, pleasant, conversational male voice speaking with an engaging tune, friendly natural cadence, and clear telephone voice quality',
              },
            },
          ],
        },
      ] as any,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (err: any) {
    console.warn('Human voice TTS notice (graceful fallback):', err?.message || err);
    return null;
  }
}

// Comprehensive multi-lingual platform responses for live voice call
const MULTILINGUAL_ANSWERS: Record<string, Record<string, string>> = {
  en: {
    welcome: "Hey there! Thanks for calling ScopeSwell. What would you like to know about our Pay-Per-Reach marketplace?",
    switched: "Language switched to English. How can I help you?",
    payouts: "Creators earn fixed rates between €0.03 and €0.08 per verified unique account reached. For example, 1,000 verified reach earns €40.00, paid directly in EUR into your bank or wallet.",
    escrow: "Businesses lock campaign budgets safely in automated escrow. You only pay for real verified reach, and any unspent budget is refunded straight back to your wallet instantly.",
    reach: "Pay-Per-Reach ensures brands pay strictly for unique human accounts reached on Instagram Story Insights. Raw views include duplicate replays, whereas unique reach guarantees 100% verified eyeballs.",
    process: "It is a simple 5-step process: connect your Instagram Creator account, apply to a brand campaign, post the 24-hour Story, and upload your 24h Insights screenshot showing Accounts Reached.",
    credits: "ScopeSwell operates with strict 1:1 Euro parity where 1 Platform Credit equals exactly €1.00 EUR. Businesses deposit Credits to fund campaigns, and creators withdraw directly in EUR without hidden fees.",
    partners: "Early Creator Partners receive priority campaign matching, zero platform fee promotions, and future loyalty rewards as ScopeSwell expands.",
    default: "ScopeSwell is the automated pay-per-reach Instagram Story marketplace with guaranteed escrow protection and automated refunds on scopeswell.com."
  },
  es: {
    welcome: "¡Hola! Gracias por llamar a ScopeSwell. ¿Qué te gustaría saber sobre nuestra plataforma de Pago Por Alcance?",
    switched: "Cambiado a español. ¿En qué puedo ayudarte?",
    payouts: "Los creadores ganan tarifas fijas de entre 0,03 € y 0,08 € por cuenta única verificada alcanzada. Por ejemplo, 1.000 de alcance generan 40,00 €, pagados directamente en euros.",
    escrow: "Las empresas bloquean su presupuesto en un depósito en garantía automatizado. Solo pagas por el alcance verificado, y cualquier presupuesto no utilizado se te reembolsa de inmediato.",
    reach: "El Pago Por Alcance asegura que solo pagues por cuentas humanas únicas en Instagram Insights. A diferencia de las reproducciones repetidas, garantiza visibilidad real.",
    process: "Son 5 pasos sencillos: conecta tu cuenta de creador, postúlate a una campaña, publica la historia de 24 horas y sube la captura de pantalla de Insights con las Cuentas Alcanzadas.",
    credits: "ScopeSwell opera con paridad 1 a 1 con el euro: 1 Crédito equivale exactamente a 1,00 € EUR, sin comisiones ocultas de cambio.",
    partners: "Los socios tempranos obtienen asignación prioritaria en campañas, cero comisiones de servicio y beneficios exclusivos de fundadores.",
    default: "ScopeSwell es la plataforma automatizada de historias de Instagram con pago por alcance y protección de depósito en garantía."
  },
  de: {
    welcome: "Hallo! Willkommen beim ScopeSwell Support. Was möchten Sie über unseren Pay-Per-Reach-Marktplatz wissen?",
    switched: "Auf Deutsch umgeschaltet. Wie kann ich Ihnen helfen?",
    payouts: "Creator verdienen feste Raten zwischen 0,03 € und 0,08 € pro verifizierter erreichter Person. Bei 1.000 verifizierten Accounts erhalten Sie 40,00 € direkt in Euro ausgezahlt.",
    escrow: "Unternehmen sind durch automatisiertes Treuhand-Escrow geschützt. Sie zahlen nur für tatsächlich erreichte Konten; ungenutztes Budget wird sofort auf Ihr Wallet erstattet.",
    reach: "Pay-Per-Reach garantiert, dass Sie nur für echte, einzigartige Konten zahlen. Keine doppelten Views oder Bot-Wiederholungen.",
    process: "In 5 einfachen Schritten: Creator-Profil verbinden, Kampagne auswählen, 24h-Story posten und den Insights-Screenshot mit erreichten Konten hochladen.",
    credits: "1 Plattform-Credit entspricht genau 1,00 € EUR. Sie können sicher einzahlen und Creator können ihr Guthaben direkt per Banküberweisung abheben.",
    partners: "Frühzeitige Partner erhalten bevorzugte Kampagnen-Zuteilung, Befreiung von Plattformgebühren und exklusive Treue-Prämien.",
    default: "ScopeSwell ist die führende Plattform für verifizierte Instagram Story-Reichweite mit sicherem Treuhandschutz."
  },
  fr: {
    welcome: "Bonjour ! Merci d'appeler ScopeSwell. Que souhaitez-vous savoir sur nos campagnes rémunérées à la portée réelle ?",
    switched: "Passé en français. Comment puis-je vous aider ?",
    payouts: "Les créateurs gagnent des tarifs fixes entre 0,03 € et 0,08 € par compte unique vérifié touché. Par exemple, 1 000 de portée rapportent 40,00 € en direct.",
    escrow: "Les marques bénéficient d'un séquestre automatique. Vous ne payez que pour les personnes réellement touchées, et tout excédent est remboursé instantanément.",
    reach: "Le Pay-Per-Reach garantit que les marques ne paient que pour des personnes uniques vérifiées dans Instagram Insights, sans payer pour des doublons.",
    process: "C'est très simple en 5 étapes : connectez votre compte créateur, postulez, publiez la Story 24h, et téléchargez la capture d'écran Insights montrant les Comptes Touchés.",
    credits: "ScopeSwell applique une parité stricte : 1 Crédit plateforme égale exactement 1,00 € EUR, sans frais de conversion cachés.",
    partners: "Les premiers partenaires inscrits bénéficient d'une sélection prioritaire et de frais de service offerts.",
    default: "ScopeSwell est la plateforme automatisée de sponsoring d'Instagram Stories avec garantie de séquestre et remboursement."
  },
  it: {
    welcome: "Ciao! Grazie per aver chiamato ScopeSwell. Cosa vorresti sapere sulla nostra piattaforma Pay-Per-Reach?",
    switched: "Passato all'italiano. Come posso aiutarti?",
    payouts: "I creator guadagnano tariffe fisse tra 0,03 € e 0,08 € per ogni account unico verificato raggiunto. Ad esempio, 1.000 di copertura fruttano 40,00 € in euro.",
    escrow: "Le aziende sono protette da un deposito fiduciario automatico. Paghi solo per la copertura reale e il budget non utilizzato viene rimborsato subito.",
    reach: "Il Pay-Per-Reach garantisce che i brand paghino solo per persone reali verificate da Instagram Insights, senza pagare visualizzazioni duplicate.",
    process: "In 5 semplici passi: collega il profilo creator, candidati, pubblica la Storia da 24 ore e carica lo screenshot degli Insights con gli Account Raggiunti.",
    credits: "1 Credito ScopeSwell equivale esattamente a 1,00 € EUR, con prelievi diretti sul conto bancario.",
    partners: "I primi partner registrati ricevono priorità nelle campagne e zero commissioni di piattaforma.",
    default: "ScopeSwell è la piattaforma per sponsorizzazioni Instagram Stories basata su copertura verificata e rimborso automatico."
  },
  et: {
    welcome: "Tere! Aitäh, et helistasite ScopeSwelli. Mida soovite teada meie ulatusepõhise turuplatsi kohta?",
    switched: "Ümber lülitatud eesti keelele. Kuidas saan teid aidata?",
    payouts: "Loojad teenivad fikseeritud tasu 0,03 € kuni 0,08 € iga kinnitatud unikaalse vaataja pealt. Näiteks 1000 konto ulatuse eest makstakse 40,00 € otse teie kontole.",
    escrow: "Ettevõtete eelarve on kaitstud automaatse deponeerimisega. Maksate ainult tegeliku ulatuse eest ning kasutamata summa tagastatakse koheselt.",
    reach: "Pay-Per-Reach tagab, et maksate ainult unikaalsete inimeste eest Instagram Insights statistikas, välistades kordusvaatamised.",
    process: "Vaid 5 sammu: ühenda looja konto, kandideeri kampaaniasse, postita 24h Story ja laadi üles Insights ekraanipilt Accounts Reached numbriga.",
    credits: "ScopeSwellis kehtib 1:1 pariteet: 1 krediit võrdub täpselt 1,00 € EUR ilma varjatud lisatasudeta.",
    partners: "Varajased partnerid saavad kampaaniates eelisjärjekorra ja nullprotsendilise teenustasu soodustuse.",
    default: "ScopeSwell on automatiseeritud Instagram Story turuplats fikseeritud ulatuse tasude ja turvalise deponeerimisega."
  },
  fi: {
    welcome: "Hei! Kiitos soitostasi ScopeSwellille. Mitä haluaisit tietää tavoittavuuteen perustuvasta alustastamme?",
    switched: "Vaihdettu suomeksi. Miten voin auttaa?",
    payouts: "Sisällöntuottajat tienaavat 0,03 € - 0,08 € jokaisesta vahvistetusta tavoitetusta tilistä. Esimerkiksi 1 000 tavoittavuus tuottaa 40,00 € suoraan euroina.",
    escrow: "Yritysten budjetti suojataan automaattisella sulkutilillä. Maksat vain toteutuneesta tavoittavuudesta, ja käyttämätön osuus palautetaan heti.",
    reach: "Pay-Per-Reach varmistaa, että maksat vain aidoista tavoitetuista tileistä Instagram Insightsin perusteella, ei toistuvista katselukerroista.",
    process: "Helpot 5 vaihetta: yhdistä tili, hae kampanjaan, julkaise 24h Tarina ja lataa Insights-kuvakaappaus tavoitetuista tileistä.",
    credits: "1 krediitti on tasan 1,00 € EUR. Nostot maksetaan suoraan pankkitilille ilman piilokuluja.",
    partners: "Varhaiset kumppanit saavat etusijan kampanjoissa sekä vapautuksen alustamaksuista.",
    default: "ScopeSwell yhdistää yritykset ja vaikuttajat luotettavilla tavoittavuusmaksuilla ja takuulla."
  },
  sv: {
    welcome: "Hej! Tack för att du ringer ScopeSwell. Vad vill du veta om vår plattform för räckviddsbaserad marknadsföring?",
    switched: "Bytt till svenska. Hur kan jag hjälpa dig?",
    payouts: "Kreatörer tjänar fasta priser mellan 0,03 € och 0,08 € per verifierat nått konto. 1 000 nådda konton ger exempelvis 40,00 € direkt i euro.",
    escrow: "Företag skyddas med automatisk deposition. Du betalar bara för faktisk räckvidd och oanvänd budget återbetalas omedelbart.",
    reach: "Pay-Per-Reach säkerställer att du bara betalar för unika konton från Instagram Insights, aldrig för dubblettvisningar.",
    process: "Bara 5 enkla steg: anslut konto, ansök till kampanj, publicera 24h Story och ladda upp Insights-skärmdump med nådda konton.",
    credits: "1 kredit motsvarar exakt 1,00 € EUR utan dolda växlingsavgifter.",
    partners: "Tidiga partners får prioriterad matchning och noll procent i plattformsavgift.",
    default: "ScopeSwell är den automatiserade sponsringsplattformen för Instagram Stories med depositionsgaranti."
  }
};

function detectLanguageFromText(text: string): string {
  const t = text.toLowerCase();

  // Spanish
  if (
    t.includes('hola') || t.includes('cuánto') || t.includes('cuanto') || t.includes('cómo') || t.includes('como') ||
    t.includes('ganan') || t.includes('creador') || t.includes('pago') || t.includes('alcance') || t.includes('depósito') ||
    t.includes('deposito') || t.includes('garantía') || t.includes('reembolso') || t.includes('historias') || t.includes('por qué') ||
    t.includes('gracias') || t.includes('buenas') || t.includes('ayuda') || t.includes('cuenta') || t.includes('quiero') ||
    t.includes('dinero') || t.includes('funciona') || t.includes('precio')
  ) {
    return 'es';
  }

  // German
  if (
    t.includes('hallo') || t.includes('guten') || t.includes('wieviel') || t.includes('wie viel') || t.includes('verdienen') ||
    t.includes('reichweite') || t.includes('treuhand') || t.includes('erstattung') || t.includes('warum') || t.includes('anleitung') ||
    t.includes('kosten') || t.includes('hilfe') || t.includes('funktion') || t.includes('auszahlung') || t.includes('danke')
  ) {
    return 'de';
  }

  // French
  if (
    t.includes('bonjour') || t.includes('salut') || t.includes('combien') || t.includes('gagnent') || t.includes('créateur') ||
    t.includes('portée') || t.includes('portee') || t.includes('séquestre') || t.includes('sequestre') || t.includes('remboursement') ||
    t.includes('pourquoi') || t.includes('merci') || t.includes('comment') || t.includes('argent') || t.includes('fonctionne')
  ) {
    return 'fr';
  }

  // Italian
  if (
    t.includes('ciao') || t.includes('buongiorno') || t.includes('quanto') || t.includes('guadagn') || t.includes('copertura') ||
    t.includes('deposito') || t.includes('fiduciario') || t.includes('rimborso') || t.includes('perché') || t.includes('perche') ||
    t.includes('grazie') || t.includes('come funziona') || t.includes('storie')
  ) {
    return 'it';
  }

  // Estonian
  if (
    t.includes('tere') || t.includes('kui palju') || t.includes('teenivad') || t.includes('ulatus') || t.includes('deponeer') ||
    t.includes('tagastus') || t.includes('miks') || t.includes('kuidas') || t.includes('aitäh') || t.includes('loojad')
  ) {
    return 'et';
  }

  // Finnish
  if (
    t.includes('hei') || t.includes('paljonko') || t.includes('tienaavat') || t.includes('tavoittavuus') || t.includes('sulkutil') ||
    t.includes('palautus') || t.includes('miksi') || t.includes('miten') || t.includes('kiitos') || t.includes('tekijät')
  ) {
    return 'fi';
  }

  // Swedish
  if (
    t.includes('hej') || t.includes('hur mycket') || t.includes('tjänar') || t.includes('räckvidd') || t.includes('deposition') ||
    t.includes('återbetalning') || t.includes('varför') || t.includes('tack') || t.includes('kreatör')
  ) {
    return 'sv';
  }

  return 'en';
}

function getMultiLingualAnswer(query: string, lang = 'en'): string {
  const detected = lang === 'en' ? detectLanguageFromText(query) : lang;
  const langKey = MULTILINGUAL_ANSWERS[detected] ? detected : 'en';
  const dict = MULTILINGUAL_ANSWERS[langKey];
  const q = query.toLowerCase();

  if (q.includes('rate') || q.includes('earn') || q.includes('payout') || q.includes('much') || q.includes('gana') || q.includes('tarifa') || q.includes('verdien') || q.includes('tienaa') || q.includes('teen') || q.includes('tjäna')) {
    return dict.payouts;
  }
  if (q.includes('escrow') || q.includes('refund') || q.includes('protect') || q.includes('reembolso') || q.includes('depósito') || q.includes('treuhand') || q.includes('séquestre') || q.includes('tagastus') || q.includes('sulkutil')) {
    return dict.escrow;
  }
  if (q.includes('why') && (q.includes('reach') || q.includes('view') || q.includes('por qué') || q.includes('warum') || q.includes('pourquoi') || q.includes('miksi') || q.includes('miks') || q.includes('varför'))) {
    return dict.reach;
  }
  if (q.includes('step') || q.includes('post') || q.includes('story') || q.includes('paso') || q.includes('schritt') || q.includes('étape') || q.includes('passo') || q.includes('vaihe') || q.includes('samm') || q.includes('steg')) {
    return dict.process;
  }
  if (q.includes('credit') || q.includes('currency') || q.includes('euro') || q.includes('crédito') || q.includes('krediit') || q.includes('kreditt')) {
    return dict.credits;
  }
  if (q.includes('early') || q.includes('partner') || q.includes('perk') || q.includes('socio') || q.includes('kumppani')) {
    return dict.partners;
  }

  return dict.default;
}

let geminiQuotaExhaustedUntil = 0;

// API Endpoint: Synthesize human voice for any text
app.post('/api/instructor/speak', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text string is required' });
      return;
    }

    if (Date.now() < geminiQuotaExhaustedUntil || !apiKey) {
      res.json({ audioBase64: null });
      return;
    }

    const audioBase64 = await generateHumanVoice(text);
    res.json({ audioBase64 });
  } catch (error: any) {
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('resource_exhausted')) {
      geminiQuotaExhaustedUntil = Date.now() + 60000;
    }
    res.status(200).json({ audioBase64: null });
  }
});

// API Endpoint: Q&A with automatic language detection and male voice synthesis
app.post('/api/instructor/ask', async (req, res) => {
  try {
    const { question, language } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Question string is required' });
      return;
    }

    const detectedLang = language || detectLanguageFromText(question);
    const naturalAnswer = getMultiLingualAnswer(question, detectedLang);

    // If quota is exhausted or no key, return high-speed conversational answer instantly
    if (Date.now() < geminiQuotaExhaustedUntil || !apiKey) {
      res.json({
        answer: naturalAnswer,
        detectedLanguage: detectedLang,
        audioBase64: null,
      });
      return;
    }

    // Try Gemini if available
    try {
      const langPrompt = detectedLang !== 'en' ? ` Reply strictly in the language: ${detectedLang}.` : '';
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: `${question.trim().slice(0, 300)}.${langPrompt}` }] }],
        config: {
          systemInstruction: SCOPESWELL_SYSTEM_INSTRUCTION,
          temperature: 0.65,
          maxOutputTokens: 160,
        },
      });

      const generatedAnswer = response.text?.trim() || naturalAnswer;
      const audioBase64 = await generateHumanVoice(generatedAnswer);

      res.json({
        answer: generatedAnswer,
        detectedLanguage: detectedLang,
        audioBase64,
      });
    } catch (geminiErr: any) {
      if (geminiErr?.status === 429 || geminiErr?.message?.includes('quota') || geminiErr?.message?.includes('resource_exhausted')) {
        geminiQuotaExhaustedUntil = Date.now() + 60000; // back off 60s
      }
      res.json({
        answer: naturalAnswer,
        detectedLanguage: detectedLang,
        audioBase64: null,
      });
    }
  } catch (error: any) {
    const detectedLang = detectLanguageFromText(req.body?.question || '');
    const fallbackAnswer = getMultiLingualAnswer(req.body?.question || '', detectedLang);
    res.status(200).json({
      answer: fallbackAnswer,
      detectedLanguage: detectedLang,
      audioBase64: null,
    });
  }
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
