// src/lib/automation/content-pipeline.ts
// Content automation pipeline for Taormina Vibe
// Fetches raw data → Transforms via LLM → Produces branded content

/**
 * ═══════════════════════════════════════════════════════════
 * STEP 1: RAW DATA FETCHING
 * Simulates fetching from Google Places API or a local feed.
 * In production, replace with real API calls.
 * ═══════════════════════════════════════════════════════════
 */

export interface RawPlaceData {
  name: string;
  address: string;
  phone?: string;
  openingHours: string[];
  rating: number;
  totalReviews: number;
  reviews: { text: string; rating: number; author: string }[];
  categories: string[];
  priceLevel: number; // 1-4
  photoUrls: string[];
  latitude: number;
  longitude: number;
}

/**
 * Fetch raw data from Google Places API (mock implementation).
 *
 * 🔑 PRODUCTION: Replace with real Google Places API call:
 *
 * ```ts
 * const response = await fetch(
 *   `https://maps.googleapis.com/maps/api/place/details/json?` +
 *   `place_id=${googlePlaceId}&` +
 *   `fields=name,formatted_address,opening_hours,rating,reviews,photos,geometry&` +
 *   `key=${process.env.GOOGLE_PLACES_API_KEY}`
 * );
 * ```
 */
export async function fetchPlaceData(
  googlePlaceId: string
): Promise<RawPlaceData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Mock data — in production this comes from Google Places API
  const mockData: Record<string, RawPlaceData> = {
    ChIJBamBarTaormina: {
      name: 'Bam Bar',
      address: 'Via di Giovanni, 45, 98039 Taormina ME',
      phone: '+39 0942 24355',
      openingHours: [
        'Mon: 7:00 AM – 1:00 AM',
        'Tue: 7:00 AM – 1:00 AM',
        'Wed: 7:00 AM – 1:00 AM',
        'Thu: 7:00 AM – 1:00 AM',
        'Fri: 7:00 AM – 2:00 AM',
        'Sat: 7:00 AM – 2:00 AM',
        'Sun: 7:00 AM – 1:00 AM',
      ],
      rating: 4.8,
      totalReviews: 3421,
      reviews: [
        {
          text: 'Best granita in Sicily! Amazing brioche.',
          rating: 5,
          author: 'Marco R.',
        },
        {
          text: 'Great location, a bit crowded but worth it.',
          rating: 4,
          author: 'Sarah L.',
        },
        {
          text: 'The almond granita is heavenly. A must-visit.',
          rating: 5,
          author: 'Giovanni P.',
        },
      ],
      categories: ['Cafe', 'Bakery', 'Ice Cream'],
      priceLevel: 2,
      photoUrls: [
        'https://example.com/bam-bar-1.jpg',
        'https://example.com/bam-bar-2.jpg',
      ],
      latitude: 37.8516,
      longitude: 15.2883,
    },
    ChIJTeatroAntico: {
      name: 'Ancient Theatre of Taormina',
      address: 'Via del Teatro Greco, 1, 98039 Taormina ME',
      phone: '+39 0942 23220',
      openingHours: ['Daily: 9:00 AM – 7:00 PM (Summer until 11 PM)'],
      rating: 4.9,
      totalReviews: 12583,
      reviews: [
        {
          text: 'Breathtaking views of Etna. One of the most beautiful theatres.',
          rating: 5,
          author: 'Anna K.',
        },
        {
          text: 'Incredible atmosphere, especially during concerts.',
          rating: 5,
          author: 'Paul M.',
        },
      ],
      categories: ['Historical Landmark', 'Theatre', 'Tourist Attraction'],
      priceLevel: 1,
      photoUrls: ['https://example.com/teatro-1.jpg'],
      latitude: 37.8524,
      longitude: 15.2922,
    },
  };

  const data = mockData[googlePlaceId];
  if (!data) {
    throw new Error(`No data found for place ID: ${googlePlaceId}`);
  }
  return data;
}

/**
 * ═══════════════════════════════════════════════════════════
 * STEP 2: AI CONTENT GENERATION
 * Transforms raw place data into Taormina Vibe branded content
 * using the Gemini API.
 * ═══════════════════════════════════════════════════════════
 */

export interface VibeContent {
  title: string;
  subtitle: string;
  description: string;
  vibeCheck: string;
  tags: string[];
}

/**
 * THE TAORMINA VIBE SYSTEM PROMPT
 * This prompt defines the brand's tone of voice for all AI-generated content.
 */
const TAORMINA_VIBE_SYSTEM_PROMPT = `
Sei il copywriter ufficiale di "Taormina Vibe", la guida digitale premium per i giovani che visitano Taormina, Sicilia.

IL TUO TONO DI VOCE:
- Giovanile ma sofisticato (pensa a un travel influencer colto)
- Esclusivo ma accessibile (non snob, ma fa sentire il lettore speciale)
- Fresco e diretto (niente formalità, sì alle emoji giuste)
- Emotivo e sensoriale (fai vivere l'esperienza con le parole)
- Italiano con spruzzate di English slang quando serve

REGOLE:
1. Scrivi in italiano
2. Usa massimo 2-3 emoji a fine paragrafo, mai in mezzo
3. Evita cliché turistici ("gioiello nascosto", "tappa obbligata")
4. Parla al "tu" diretto
5. Crea FOMO positiva — fai venire voglia di andarci ADESSO
6. Ogni frase deve aggiungere valore, niente riempitivi

FORMATO OUTPUT (JSON):
{
  "title": "Nome del posto",
  "subtitle": "Frase breve e accattivante (max 8 parole)",
  "description": "Descrizione 2-3 frasi. Pratica e informativa ma con stile.",
  "vibeCheck": "Paragrafo immersivo 3-4 frasi. Fai vivere l'atmosfera al lettore come se fosse lì. Chiudi con emoji.",
  "tags": ["Tag1", "Tag2", "Tag3"] // max 4, in italiano
}
`;

/**
 * Generate branded content from raw place data.
 *
 * 🔑 PRODUCTION: Uncomment the real Gemini API call below.
 *
 * Required env var: GEMINI_API_KEY
 *
 * ```ts
 * const response = await fetch(
 *   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
 *   {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       system_instruction: { parts: [{ text: TAORMINA_VIBE_SYSTEM_PROMPT }] },
 *       contents: [{
 *         parts: [{
 *           text: `Riscrivi questi dati secondo il tono di Taormina Vibe:\n\n${JSON.stringify(rawData, null, 2)}`
 *         }]
 *       }],
 *       generationConfig: {
 *         responseMimeType: 'application/json',
 *         temperature: 0.8,
 *       }
 *     }),
 *   }
 * );
 * const result = await response.json();
 * return JSON.parse(result.candidates[0].content.parts[0].text);
 * ```
 */
export async function generateVibeContent(
  rawData: RawPlaceData
): Promise<VibeContent> {
  // Mock: simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Log the prompt that would be sent (for debugging)
  console.log('[Content Pipeline] 🤖 System Prompt:', TAORMINA_VIBE_SYSTEM_PROMPT);
  console.log('[Content Pipeline] 📝 Input data:', JSON.stringify(rawData, null, 2));

  // Mock AI output — in production, this comes from Gemini
  return {
    title: rawData.name,
    subtitle: `Il meglio di ${rawData.categories[0]?.toLowerCase() ?? 'Taormina'}`,
    description: `${rawData.name}, ${rawData.address}. Valutazione ${rawData.rating}/5 con oltre ${rawData.totalReviews} recensioni.`,
    vibeCheck: `Immagina: arrivi a ${rawData.name} e capisci subito che è diverso. L'energia è quella giusta, la gente sorride, e tutto sembra al posto giusto. È uno di quei posti che non dimentichi facilmente. ✨`,
    tags: rawData.categories.slice(0, 4),
  };
}

/**
 * ═══════════════════════════════════════════════════════════
 * STEP 3: ORCHESTRATION
 * Full pipeline: Fetch → Transform → Output
 * ═══════════════════════════════════════════════════════════
 */

export interface PipelineResult {
  googlePlaceId: string;
  rawData: RawPlaceData;
  vibeContent: VibeContent;
  processedAt: string;
}

/**
 * Run the full content pipeline for one or more places.
 *
 * Usage:
 * ```ts
 * import { runContentPipeline } from '@/lib/automation/content-pipeline';
 *
 * const results = await runContentPipeline([
 *   'ChIJBamBarTaormina',
 *   'ChIJTeatroAntico',
 * ]);
 *
 * results.forEach(r => {
 *   console.log(r.vibeContent.title, '→', r.vibeContent.vibeCheck);
 * });
 * ```
 */
export async function runContentPipeline(
  googlePlaceIds: string[]
): Promise<PipelineResult[]> {
  console.log(
    `[Content Pipeline] 🚀 Starting pipeline for ${googlePlaceIds.length} places...`
  );

  const results: PipelineResult[] = [];

  for (const placeId of googlePlaceIds) {
    try {
      console.log(`[Content Pipeline] 📍 Fetching: ${placeId}`);
      const rawData = await fetchPlaceData(placeId);

      console.log(`[Content Pipeline] 🤖 Generating vibe content for: ${rawData.name}`);
      const vibeContent = await generateVibeContent(rawData);

      results.push({
        googlePlaceId: placeId,
        rawData,
        vibeContent,
        processedAt: new Date().toISOString(),
      });

      console.log(`[Content Pipeline] ✅ Done: ${rawData.name}`);
    } catch (error) {
      console.error(`[Content Pipeline] ❌ Error for ${placeId}:`, error);
    }
  }

  console.log(
    `[Content Pipeline] 🏁 Pipeline complete. Processed ${results.length}/${googlePlaceIds.length} places.`
  );

  return results;
}

/**
 * ═══════════════════════════════════════════════════════════
 * HOW TO PLUG IN REAL APIs
 * ═══════════════════════════════════════════════════════════
 *
 * 1. GOOGLE PLACES API:
 *    - Get API key: https://console.cloud.google.com
 *    - Enable "Places API (New)" in your project
 *    - Set env var: GOOGLE_PLACES_API_KEY=your_key
 *    - Replace fetchPlaceData() mock with real fetch call
 *
 * 2. GEMINI API:
 *    - Get API key: https://aistudio.google.com/apikey
 *    - Set env var: GEMINI_API_KEY=your_key
 *    - Replace generateVibeContent() mock with real fetch call
 *    - Use gemini-2.0-flash for speed + low cost
 *    - Use responseMimeType: 'application/json' for structured output
 *
 * 3. SCHEDULING:
 *    - Run as a cron job (e.g., Vercel Cron, GitHub Actions)
 *    - Schedule: daily at 6:00 AM to update content
 *    - Save results to CMS (Sanity) or JSON file
 *
 * 4. RSS FEED INTEGRATION:
 *    - For local events, parse RSS feeds from local news sites
 *    - Use a library like 'rss-parser' to fetch and parse
 *    - Feed parsed data into generateVibeContent()
 */
