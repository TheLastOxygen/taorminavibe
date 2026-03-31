'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useEffect } from 'react';
import { getVibePoint, type VibePoint } from '@/lib/data/vibe-points';

interface UseVibePointResult {
  vibePointId: string | null;
  vibePointData: VibePoint | null;
  isActive: boolean;
}

/**
 * Hook that reads the ?vibe_point= parameter from the URL
 * and returns contextual data for the scanned QR sticker location.
 *
 * Usage:
 *   const { vibePointId, vibePointData, isActive } = useVibePoint();
 */
export function useVibePoint(): UseVibePointResult {
  const searchParams = useSearchParams();
  const vibePointId = searchParams.get('vibe_point');

  const vibePointData = useMemo(() => {
    if (!vibePointId) return null;
    return getVibePoint(vibePointId);
  }, [vibePointId]);

  // Track scan event (ready for analytics integration)
  useEffect(() => {
    if (vibePointId && vibePointData) {
      console.log(
        `[Taormina Vibe] 📍 Scan detected: "${vibePointData.name}" (id: ${vibePointId})`
      );

      // Future: send analytics event
      // analytics.track('vibe_point_scanned', {
      //   point_id: vibePointId,
      //   point_name: vibePointData.name,
      //   timestamp: new Date().toISOString(),
      // });
    }
  }, [vibePointId, vibePointData]);

  return {
    vibePointId,
    vibePointData,
    isActive: vibePointData !== null,
  };
}
