// src/lib/data/partners.ts
// Central affiliate marketing configuration
// Map each monetized place to its partner link for easy revenue management

export type AffiliatePlatform =
  | 'getyourguide'
  | 'booking'
  | 'tripadvisor'
  | 'viator'
  | 'direct';

export interface PartnerConfig {
  placeId: string;
  platform: AffiliatePlatform;
  affiliateUrl: string;
  ctaLabel: string;
  ctaEmoji: string;
  commission: string; // e.g. "8%" — for internal tracking
}

/**
 * Centralized partner registry.
 * To add a new partner: add an entry keyed by place ID.
 * To update a link: change only the affiliateUrl.
 */
export const partners: Record<string, PartnerConfig> = {
  '1': {
    placeId: '1',
    platform: 'tripadvisor',
    affiliateUrl:
      'https://www.tripadvisor.com/Restaurant_Review-Bam_Bar-Taormina?ref=taorminavibe',
    ctaLabel: 'Vedi su TripAdvisor',
    ctaEmoji: '⭐',
    commission: '5%',
  },
  '2': {
    placeId: '2',
    platform: 'booking',
    affiliateUrl:
      'https://www.booking.com/restaurant/vicolo-stretto?aid=taorminavibe',
    ctaLabel: 'Prenota il Tavolo',
    ctaEmoji: '🍽️',
    commission: '6%',
  },
  '3': {
    placeId: '3',
    platform: 'booking',
    affiliateUrl:
      'https://www.booking.com/hotel/la-plage-resort?aid=taorminavibe',
    ctaLabel: 'Prenota Ora',
    ctaEmoji: '🏖️',
    commission: '8%',
  },
  '4': {
    placeId: '4',
    platform: 'getyourguide',
    affiliateUrl:
      'https://www.getyourguide.com/taormina/teatro-antico-tickets?partner_id=taorminavibe',
    ctaLabel: 'Acquista Biglietti',
    ctaEmoji: '🎟️',
    commission: '10%',
  },
  '5': {
    placeId: '5',
    platform: 'direct',
    affiliateUrl: 'https://www.morganabar.it/reservations?ref=taorminavibe',
    ctaLabel: 'Prenota il Tavolo',
    ctaEmoji: '🍸',
    commission: '7%',
  },
  '7': {
    placeId: '7',
    platform: 'booking',
    affiliateUrl:
      'https://www.booking.com/hotel/grand-hotel-timeo?aid=taorminavibe',
    ctaLabel: 'Prenota l\'Esperienza',
    ctaEmoji: '⭐',
    commission: '10%',
  },
};

// Default CTA for places without a partner deal
export const defaultPartner: Omit<PartnerConfig, 'placeId'> = {
  platform: 'direct',
  affiliateUrl: '#',
  ctaLabel: 'Scopri di Più',
  ctaEmoji: '🔍',
  commission: '0%',
};

/**
 * Get the affiliate config for a place.
 * Falls back to defaultPartner if no deal exists.
 */
export function getPartnerConfig(placeId: string): PartnerConfig {
  return (
    partners[placeId] ?? {
      ...defaultPartner,
      placeId,
    }
  );
}
