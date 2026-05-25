// src/lib/data/places.ts
// Curated place data — ready to be swapped with a real CMS/API

export type PlaceCategory = 'eat' | 'party' | 'explore' | 'chill';

export interface Place {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  vibeCheck: string; // AI-generated atmosphere paragraph
  category: PlaceCategory;
  emoji: string;
  imageUrl: string;
  images: string[]; // gallery images (lazy-loaded)
  rating: number;
  priceLevel: string;
  tags: string[];
  isPremium: boolean;
  coordinates: { lat: number; lng: number };
  openingHours?: string;
  googlePlaceId?: string;
}

export const categories: { id: PlaceCategory; label: string; emoji: string }[] = [
  { id: 'eat', label: 'Eat', emoji: '🍝' },
  { id: 'party', label: 'Party', emoji: '🥂' },
  { id: 'explore', label: 'Explore', emoji: '🏛️' },
  { id: 'chill', label: 'Chill', emoji: '🌊' },
];

export const places: Place[] = [
  {
    id: '1',
    slug: 'bam-bar',
    title: 'Bam Bar',
    subtitle: 'La granita più famosa della Sicilia',
    description:
      "Un'istituzione di Taormina dal 1950. Granite artigianali con brioches calde, vista sul mare Ionio.",
    vibeCheck:
      'Immagina la scena: mattina presto, luce dorata sul mare, il profumo di brioche calde nell\'aria. Ti siedi al bancone del Bam Bar, ordini una granita alla mandorla e il mondo rallenta. È la colazione perfetta prima di esplorare Taormina — autentica, iconica, indimenticabile. 🍧✨',
    category: 'eat',
    emoji: '🍧',
    imageUrl: '/images/places/bam-bar.jpg',
    images: ['/images/places/bam-bar.jpg'],
    rating: 4.8,
    priceLevel: '€€',
    tags: ['Colazione', 'Granita', 'Storico'],
    isPremium: true,
    coordinates: { lat: 37.8516, lng: 15.2883 },
    openingHours: '07:00 – 01:00',
    googlePlaceId: 'ChIJE9uLzkUMFxMRiCOb9hx53Qo',
  },
  {
    id: '2',
    slug: 'ristorante-vicolo-stretto',
    title: 'Vicolo Stretto',
    subtitle: 'Fine dining con vista Etna',
    description:
      "Cucina siciliana contemporanea in un vicolo romantico. Degustazione di vini dell'Etna e piatti creativi dello chef.",
    vibeCheck:
      "Un vicolo stretto illuminato da candele, i profumi della cucina siciliana che si mescolano alla brezza serale. Ogni piatto è un racconto, ogni calice di Etna Rosso un viaggio. Perfetto per una cena romantica dove perdersi nel tempo. 🍷🌙",
    category: 'eat',
    emoji: '🍷',
    imageUrl: '/images/places/vicolo-stretto.jpg',
    images: ['/images/places/vicolo-stretto.jpg'],
    rating: 4.7,
    priceLevel: '€€€',
    tags: ['Fine Dining', 'Vino', 'Romantico'],
    isPremium: true,
    coordinates: { lat: 37.8523, lng: 15.2876 },
    openingHours: '12:00 – 23:00',
    googlePlaceId: 'ChIJP1qRxkQMFxMRuIa38AVF4Lk',
  },
  {
    id: '3',
    slug: 'la-plage-resort',
    title: 'La Plage Resort',
    subtitle: 'Beach club esclusivo sotto Isola Bella',
    description:
      "Lettini a bordo mare, cocktail tropicali e DJ set al tramonto. L'esperienza balneare definitiva.",
    vibeCheck:
      'Piedi nella sabbia, cocktail in mano, la silhouette di Isola Bella davanti a te. La Plage è quel posto dove il tempo si misura in tramonti e la playlist è sempre perfetta. Vibe only. 🌅🏖️',
    category: 'chill',
    emoji: '🏖️',
    imageUrl: '/images/places/la-plage.jpg',
    images: ['/images/places/la-plage.jpg'],
    rating: 4.6,
    priceLevel: '€€€',
    tags: ['Beach', 'Cocktail', 'Tramonto'],
    isPremium: true,
    coordinates: { lat: 37.8513, lng: 15.3003 },
    openingHours: '09:00 – 01:00',
    googlePlaceId: 'ChIJsea8t0oMFxMRxxNdL1yMCbU',
  },
  {
    id: '4',
    slug: 'teatro-antico',
    title: 'Teatro Antico',
    subtitle: 'II secolo a.C. — Vista sull\'Etna',
    description:
      'Il teatro greco-romano più bello del mondo. Concerti estivi, panorama mozzafiato su Etna e baia di Naxos.',
    vibeCheck:
      "Sali i gradini di pietra vecchi di 2000 anni e all'improvviso si apre uno dei panorami più iconici del Mediterraneo: l'Etna che fuma sullo sfondo, il mare turchese sotto di te. Di sera, con un concerto dal vivo, è pura magia. 🏛️🔥",
    category: 'explore',
    emoji: '🏛️',
    imageUrl: '/images/places/teatro-antico.jpg',
    images: ['/images/places/teatro-antico.jpg'],
    rating: 4.9,
    priceLevel: '€',
    tags: ['Storia', 'Panorama', 'Concerti'],
    isPremium: false,
    coordinates: { lat: 37.8524, lng: 15.2922 },
    openingHours: '09:00 – 19:00',
    googlePlaceId: 'ChIJK5ByaEUMFxMR7CtFMz1te2Q',
  },
  {
    id: '5',
    slug: 'morgana-lounge-bar',
    title: 'Morgana Lounge Bar',
    subtitle: 'Il cocktail bar più instagrammabile',
    description:
      "Design barocco-pop, mixology d'autore e DJ set internazionali. Il punto di ritrovo della Taormina notturna.",
    vibeCheck:
      "Entri e sembra di essere nel set di un film di Ferragnez. Specchi dorati, velluto rosso, cocktail che sembrano opere d'arte. Morgana è il posto dove la notte di Taormina prende vita — dress code: fabulous. 🍸💫",
    category: 'party',
    emoji: '🍸',
    imageUrl: '/images/places/morgana.jpg',
    images: ['/images/places/morgana.jpg'],
    rating: 4.5,
    priceLevel: '€€€',
    tags: ['Cocktail', 'DJ Set', 'Nightlife'],
    isPremium: true,
    coordinates: { lat: 37.8521, lng: 15.2869 },
    openingHours: '18:00 – 03:00',
    googlePlaceId: 'ChIJBYX5-0UMFxMRWewfQqo99Xk',
  },
  {
    id: '6',
    slug: 'isola-bella',
    title: 'Isola Bella',
    subtitle: 'La perla del Mediterraneo',
    description:
      'Riserva naturale con acque cristalline. Raggiungibile con la funivia o a piedi, snorkeling tra i fondali.',
    vibeCheck:
      "Scendi la scalinata e ti trovi davanti un pezzo di Maldive nel Mediterraneo. Acque trasparenti, ciottoli bianchi, l'isolotto collegato alla riva da una lingua di sabbia. Porta maschera e pinne — il mondo sottomarino qui è assurdo. 🐠💎",
    category: 'chill',
    emoji: '🐠',
    imageUrl: '/images/places/isola-bella.jpg',
    images: ['/images/places/isola-bella.jpg'],
    rating: 4.9,
    priceLevel: '€',
    tags: ['Natura', 'Snorkeling', 'Panorama'],
    isPremium: false,
    coordinates: { lat: 37.8502, lng: 15.3011 },
    googlePlaceId: 'ChIJY6ONNksMFxMRkm-R5BSXDXE',
  },
  {
    id: '7',
    slug: 'otto-geleng',
    title: 'Otto Geleng',
    subtitle: 'Stellato Michelin al Grand Hotel Timeo',
    description:
      'Alta cucina siciliana con vista panoramica. Menu degustazione che racconta la Sicilia attraverso i sapori.',
    vibeCheck:
      "Cena con stelle Michelin e stelle in cielo. Dal terrazzo del Grand Hotel Timeo, l'Etna sembra a un braccio di distanza. Ogni portata è un capolavoro di sapori siciliani rivisitati. L'esperienza gastronomica top di Taormina, punto. ⭐🌋",
    category: 'eat',
    emoji: '⭐',
    imageUrl: '/images/places/otto-geleng.jpg',
    images: ['/images/places/otto-geleng.jpg'],
    rating: 4.9,
    priceLevel: '€€€€',
    tags: ['Michelin', 'Vista', 'Esperienza'],
    isPremium: true,
    coordinates: { lat: 37.8531, lng: 15.2914 },
    openingHours: '19:30 – 23:00',
    googlePlaceId: 'ChIJo_s4oEQMFxMRJyqMVNCe7KY',
  },
  {
    id: '8',
    slug: 'belvedere-piazza-ix-aprile',
    title: 'Belvedere - Piazza IX Aprile',
    subtitle: 'La terrazza panoramica di Taormina',
    description:
      'Il cuore pulsante di Taormina. Aperitivo con vista sulla baia, performers dal vivo e atmosfera magica al tramonto.',
    vibeCheck:
      'La piazza dove tutto succede. Artisti di strada, aperitivi al tramonto, la baia di Naxos che si tinge di arancio. Siediti sui gradini, metti le cuffie, e lasciati assorbire dalla vibe. È gratis ed è il miglior spettacolo di Taormina. 🌅🎭',
    category: 'explore',
    emoji: '🌅',
    imageUrl: '/images/places/belvedere.jpg',
    images: ['/images/places/belvedere.jpg'],
    rating: 4.8,
    priceLevel: 'Free',
    tags: ['Panorama', 'Tramonto', 'Piazza'],
    isPremium: false,
    coordinates: { lat: 37.8518, lng: 15.2867 },
    googlePlaceId: 'ChIJu2rWTEUMFxMRCyIVSqU2eyQ',
  },
  {
    id: '9',
    slug: 'villa-zuccaro',
    title: 'Villa Zuccaro',
    subtitle: 'Pizzeria d\'eccellenza',
    description:
      'Celebre pizzeria situata in una location storica con un meraviglioso giardino interno.',
    vibeCheck:
      'L\'odore della legna e della pizza appena sfornata si mescola all\'aria della sera. Nel giardino di Villa Zuccaro, tra alberi secolari e luci soffuse, l\'atmosfera è magica. 🍕🌿',
    category: 'eat',
    emoji: '🍕',
    imageUrl: '/images/places/villa-zuccaro.jpg',
    images: ['/images/places/villa-zuccaro.jpg'],
    rating: 4.5,
    priceLevel: '€€',
    tags: ['Pizza', 'Cena', 'Giardino'],
    isPremium: false,
    coordinates: { lat: 37.8515, lng: 15.2870 },
    googlePlaceId: 'ChIJpUE8XaQRFBMRWI0o-QUOWaM',
  },
  {
    id: '10',
    slug: 'osteria-villa-zuccaro',
    title: 'Osteria Villa Zuccaro',
    subtitle: 'Autentica cucina siciliana',
    description:
      'Piatti della tradizione locale serviti in un ambiente caldo e accogliente nel cuore di Taormina.',
    vibeCheck:
      'Un\'immersione nei sapori più veri della Sicilia. Tra un calice di vino locale e un piatto di pasta fresca, l\'Osteria regala un\'esperienza autentica e conviviale. 🍝🍷',
    category: 'eat',
    emoji: '🍝',
    imageUrl: '/images/places/osteria-villa-zuccaro.jpg',
    images: ['/images/places/osteria-villa-zuccaro.jpg'],
    rating: 4.6,
    priceLevel: '€€',
    tags: ['Tradizione', 'Pasta', 'Vino'],
    isPremium: false,
    coordinates: { lat: 37.8516, lng: 15.2872 },
    googlePlaceId: 'ChIJkZpImOgRFBMRYC2ktQfRH6Q',
  },
];

export function getPlacesByCategory(category: PlaceCategory): Place[] {
  return places.filter((p) => p.category === category);
}

export function getFeaturedPlaces(): Place[] {
  return places.filter((p) => p.isPremium).slice(0, 4);
}

export function getAllPlaces(): Place[] {
  return places;
}

export function getPlaceBySlug(slug: string): Place | null {
  return places.find((p) => p.slug === slug) ?? null;
}

export function getPlaceById(id: string): Place | null {
  return places.find((p) => p.id === id) ?? null;
}
