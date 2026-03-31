'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Navigation } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllPlaces, type Place } from '@/lib/data/places';
import { getVibePoint } from '@/lib/data/vibe-points';

interface NearbyOffersProps {
  currentPlace: Place;
  lang: string;
}

/**
 * Haversine distance in meters between two lat/lng points
 */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

// Approximate coordinates for known vibe points
const vibePointCoordinates: Record<string, { lat: number; lng: number }> = {
  belvedere: { lat: 37.8518, lng: 15.2867 },
  'teatro-antico': { lat: 37.8524, lng: 15.2922 },
  'isola-bella': { lat: 37.8502, lng: 15.3011 },
  'corso-umberto': { lat: 37.8519, lng: 15.2878 },
  'porta-messina': { lat: 37.8527, lng: 15.2896 },
};

export default function NearbyOffers({
  currentPlace,
  lang,
}: NearbyOffersProps) {
  const searchParams = useSearchParams();
  const vibePointId = searchParams.get('vibe_point');

  const nearbyPlaces = useMemo(() => {
    const allPlaces = getAllPlaces().filter((p) => p.id !== currentPlace.id);

    // Use vibe_point location if available, otherwise use current place coordinates
    let refLat = currentPlace.coordinates.lat;
    let refLng = currentPlace.coordinates.lng;

    if (vibePointId && vibePointCoordinates[vibePointId]) {
      const vpCoords = vibePointCoordinates[vibePointId];
      refLat = vpCoords.lat;
      refLng = vpCoords.lng;
    }

    // Also check if vibe_point has specific nearbyPlaces
    const vibePoint = vibePointId ? getVibePoint(vibePointId) : null;

    return allPlaces
      .map((place) => ({
        ...place,
        distance: haversineDistance(
          refLat,
          refLng,
          place.coordinates.lat,
          place.coordinates.lng
        ),
        isVibeRecommended: vibePoint
          ? vibePoint.nearbyPlaces.includes(place.slug)
          : false,
      }))
      .sort((a, b) => {
        // Vibe-recommended places first, then by distance
        if (a.isVibeRecommended && !b.isVibeRecommended) return -1;
        if (!a.isVibeRecommended && b.isVibeRecommended) return 1;
        return a.distance - b.distance;
      })
      .slice(0, 3);
  }, [currentPlace, vibePointId]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-4 h-4 text-sunset-orange" />
        <span className="text-sunset-orange font-sans text-xs font-bold tracking-[0.2em] uppercase">
          Offerte Vicine
        </span>
        {vibePointId && (
          <span className="ml-auto text-white/30 text-[10px] font-sans">
            📍 dal tuo sticker
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {nearbyPlaces.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
          >
            <Link
              href={`/${lang}/place/${place.slug}`}
              className="glass-card p-4 flex items-center gap-4 group"
            >
              {/* Emoji avatar */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {place.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-sm text-ceramic-white truncate group-hover:text-sunset-orange transition-colors">
                    {place.title}
                  </h4>
                  {place.isVibeRecommended && (
                    <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full bg-sunset-gold/20 text-sunset-gold text-[9px] font-bold">
                      VIBE ✨
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-white/40 text-xs font-sans">
                    <MapPin className="w-3 h-3" />
                    {formatDistance(place.distance)}
                  </span>
                  <span className="flex items-center gap-1 text-sunset-gold text-xs font-sans">
                    <Star className="w-3 h-3 fill-sunset-gold" />
                    {place.rating}
                  </span>
                  <span className="text-white/30 text-xs font-sans">
                    {place.priceLevel}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="flex-shrink-0 w-4 h-4 text-white/20 group-hover:text-sunset-orange group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Walking encouragement */}
      <p className="text-white/20 text-[10px] font-sans text-center mt-4 italic">
        🚶 Tutti raggiungibili a piedi dal centro di Taormina
      </p>
    </motion.section>
  );
}
