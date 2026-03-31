#!/usr/bin/env npx tsx
/**
 * ═══════════════════════════════════════════════════════════
 * Taormina Vibe — Google Places Photo Fetcher
 * ═══════════════════════════════════════════════════════════
 *
 * Downloads place photos from Google Places API and saves them
 * to /public/images/places/ for build-time static serving.
 *
 * Usage:
 *   npm run fetch-photos
 *
 * Prerequisites:
 *   1. Set GOOGLE_PLACES_API_KEY in .env.local
 *   2. Enable "Places API" in Google Cloud Console
 *
 * Cost estimate: ~$0.02 per run (10 places × 3 photos = 30 requests)
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Configuration ────────────────────────────────────────
const MAX_PHOTOS_PER_PLACE = 3;
const PHOTO_MAX_WIDTH = 1200; // px — good quality without being huge
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'places');

// ─── Place registry (slug → Google Place ID) ─────────────
// To find a Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
const PLACES: { slug: string; placeId: string }[] = [
  { slug: 'bam-bar', placeId: 'ChIJE9uLzkUMFxMRiCOb9hx53Qo' },
  { slug: 'ristorante-vicolo-stretto', placeId: 'ChIJP1qRxkQMFxMRuIa38AVF4Lk' },
  { slug: 'la-plage-resort', placeId: 'ChIJsea8t0oMFxMRxxNdL1yMCbU' },
  { slug: 'teatro-antico', placeId: 'ChIJK5ByaEUMFxMR7CtFMz1te2Q' },
  { slug: 'morgana-lounge-bar', placeId: 'ChIJBYX5-0UMFxMRWewfQqo99Xk' },
  { slug: 'isola-bella', placeId: 'ChIJY6ONNksMFxMRkm-R5BSXDXE' },
  { slug: 'otto-geleng', placeId: 'ChIJo_s4oEQMFxMRJyqMVNCe7KY' },
  { slug: 'belvedere-piazza-ix-aprile', placeId: 'ChIJu2rWTEUMFxMRCyIVSqU2eyQ' },
];

// ─── API Helpers ──────────────────────────────────────────

function getApiKey(): string {
  // Try to load from .env.local manually (no dotenv dependency needed)
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GOOGLE_PLACES_API_KEY=(.+)/);
    if (match && match[1] && match[1] !== 'YOUR_KEY_HERE') {
      return match[1].trim();
    }
  }
  // Also check environment variable
  if (process.env.GOOGLE_PLACES_API_KEY) {
    return process.env.GOOGLE_PLACES_API_KEY;
  }
  throw new Error(
    '❌ GOOGLE_PLACES_API_KEY not found!\n' +
      '   1. Open .env.local\n' +
      '   2. Replace YOUR_KEY_HERE with your Google API key\n' +
      '   3. Get a key at: https://console.cloud.google.com'
  );
}

interface PlaceDetailsResponse {
  result: {
    name: string;
    photos?: {
      photo_reference: string;
      width: number;
      height: number;
    }[];
  };
  status: string;
}

/**
 * Fetch place details from Google Places API
 * Returns photo references for the place
 */
async function fetchPlaceDetails(
  placeId: string,
  apiKey: string
): Promise<string[]> {
  const url = new URL(
    'https://maps.googleapis.com/maps/api/place/details/json'
  );
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'name,photos');
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  const data = (await response.json()) as PlaceDetailsResponse;

  if (data.status !== 'OK') {
    throw new Error(`Google API error: ${data.status} for place ${placeId}`);
  }

  const photos = data.result.photos ?? [];
  return photos
    .slice(0, MAX_PHOTOS_PER_PLACE)
    .map((p) => p.photo_reference);
}

/**
 * Download a single photo from Google Places Photo API
 * Returns the image as a Buffer
 */
async function downloadPhoto(
  photoReference: string,
  apiKey: string
): Promise<Buffer> {
  const url = new URL(
    'https://maps.googleapis.com/maps/api/place/photo'
  );
  url.searchParams.set('maxwidth', PHOTO_MAX_WIDTH.toString());
  url.searchParams.set('photo_reference', photoReference);
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString(), { redirect: 'follow' });

  if (!response.ok) {
    throw new Error(`Failed to download photo: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ─── Main Pipeline ────────────────────────────────────────

async function main() {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  🌅 Taormina Vibe — Photo Fetcher         ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');

  // Step 1: Check API key
  let apiKey: string;
  try {
    apiKey = getApiKey();
    console.log('✅ API key found');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }

  // Step 2: Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created ${OUTPUT_DIR}`);
  }

  // Step 3: Process each place
  let totalDownloaded = 0;
  let totalErrors = 0;

  for (const place of PLACES) {
    console.log('');
    console.log(`📍 ${place.slug} (${place.placeId})`);

    try {
      // Fetch photo references
      const photoRefs = await fetchPlaceDetails(place.placeId, apiKey);
      console.log(`   Found ${photoRefs.length} photos`);

      // Download each photo
      for (let i = 0; i < photoRefs.length; i++) {
        const suffix = i === 0 ? '' : `-${i + 1}`;
        const filename = `${place.slug}${suffix}.jpg`;
        const filepath = path.join(OUTPUT_DIR, filename);

        // Skip if file already exists (incremental updates)
        if (fs.existsSync(filepath)) {
          console.log(`   ⏭️  ${filename} (already exists, skipping)`);
          continue;
        }

        try {
          console.log(`   ⬇️  Downloading ${filename}...`);
          const imageBuffer = await downloadPhoto(photoRefs[i], apiKey);
          fs.writeFileSync(filepath, imageBuffer);
          const sizeMb = (imageBuffer.length / 1024 / 1024).toFixed(2);
          console.log(`   ✅ ${filename} (${sizeMb} MB)`);
          totalDownloaded++;
        } catch (err) {
          console.error(`   ❌ Failed: ${filename} — ${(err as Error).message}`);
          totalErrors++;
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    } catch (err) {
      console.error(`   ❌ Error: ${(err as Error).message}`);
      totalErrors++;
    }
  }

  // Summary
  console.log('');
  console.log('════════════════════════════════════════════');
  console.log(`🏁 Done! Downloaded: ${totalDownloaded} | Errors: ${totalErrors}`);
  console.log(`📂 Photos saved to: ${OUTPUT_DIR}`);
  console.log('════════════════════════════════════════════');
  console.log('');
}

main().catch(console.error);
