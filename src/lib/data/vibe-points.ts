// src/lib/data/vibe-points.ts
// Registry of QR code vibe points around Taormina
// Each sticker has a unique ID that maps to contextual data

export interface VibePoint {
  id: string;
  name: string;
  emoji: string;
  message: string;
  soundtrack: string;
  spotifyUrl?: string;
  nearbyPlaces: string[]; // place slugs
  tip: string;
}

export const vibePoints: Record<string, VibePoint> = {
  belvedere: {
    id: 'belvedere',
    name: 'Belvedere - Piazza IX Aprile',
    emoji: '🌅',
    message: 'Sei al Belvedere. Ecco la colonna sonora e i locali più vicini per il tuo aperitivo.',
    soundtrack: 'Sicilian Sunset Lounge Mix',
    spotifyUrl: 'https://open.spotify.com/playlist/example',
    nearbyPlaces: ['morgana-lounge-bar', 'bam-bar', 'ristorante-vicolo-stretto'],
    tip: 'Il tramonto da qui è alle 19:30. Prenota un tavolo al Morgana per il miglior aperitivo!',
  },
  'teatro-antico': {
    id: 'teatro-antico',
    name: 'Teatro Antico',
    emoji: '🏛️',
    message: 'Sei al Teatro Antico. Scopri gli eventi di stasera e la storia di questo luogo magico.',
    soundtrack: 'Mediterranean Classical',
    nearbyPlaces: ['otto-geleng', 'ristorante-vicolo-stretto'],
    tip: 'I concerti estivi iniziano alle 21:00. Arriva presto per prendere i posti migliori!',
  },
  'isola-bella': {
    id: 'isola-bella',
    name: 'Isola Bella',
    emoji: '🏝️',
    message: 'Sei a Isola Bella. Tuffati nelle acque cristalline e scopri dove mangiare dopo il bagno.',
    soundtrack: 'Deep Blue Chill',
    nearbyPlaces: ['la-plage-resort', 'bam-bar'],
    tip: 'Noleggia maschera e pinne qui vicino — i fondali sono incredibili!',
  },
  'corso-umberto': {
    id: 'corso-umberto',
    name: 'Corso Umberto',
    emoji: '🛍️',
    message: 'Sei sul Corso Umberto, il cuore dello shopping. Scopri i negozi locali e dove fare una pausa.',
    soundtrack: 'Italian Dolce Vita',
    nearbyPlaces: ['bam-bar', 'morgana-lounge-bar'],
    tip: 'Non perderti la ceramica artigianale di Caltagirone nei negozi del corso!',
  },
  'porta-messina': {
    id: 'porta-messina',
    name: 'Porta Messina',
    emoji: '🚪',
    message: 'Benvenuto a Taormina! Sei appena entrato dalla Porta Messina. La tua avventura inizia qui.',
    soundtrack: 'Welcome to Sicily',
    nearbyPlaces: ['bam-bar', 'teatro-antico', 'belvedere-piazza-ix-aprile'],
    tip: 'Segui il Corso Umberto verso la Piazza IX Aprile per il panorama migliore!',
  },
};

export function getVibePoint(id: string): VibePoint | null {
  return vibePoints[id] || null;
}

export function getAllVibePointIds(): string[] {
  return Object.keys(vibePoints);
}
