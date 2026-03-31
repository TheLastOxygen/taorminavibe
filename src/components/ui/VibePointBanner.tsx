'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Music, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useVibePoint } from '@/hooks/useVibePoint';

export default function VibePointBanner() {
  const { vibePointData, isActive } = useVibePoint();
  const [dismissed, setDismissed] = useState(false);

  if (!isActive || !vibePointData || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md"
      >
        <div className="relative overflow-hidden rounded-2xl border border-sunset-orange/20 bg-midnight-sea/95 backdrop-blur-xl shadow-2xl">
          {/* Decorative glow */}
          <div className="absolute top-0 left-0 right-0 h-px sunset-gradient" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] bg-sunset-orange/10" />

          {/* Close button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
            aria-label="Chiudi"
          >
            <X className="w-3.5 h-3.5 text-white/40" />
          </button>

          <div className="relative p-5 pr-10">
            {/* Location header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-sunset-orange/15">
                <MapPin className="w-4 h-4 text-sunset-orange" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{vibePointData.emoji}</span>
                  <h3 className="text-sm font-display font-bold text-ceramic-white">
                    {vibePointData.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Personalized message */}
            <p className="text-sm text-white/70 font-sans leading-relaxed mb-4">
              {vibePointData.message}
            </p>

            {/* Soundtrack */}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 mb-3">
              <Music className="w-3.5 h-3.5 text-sunset-gold flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/30 font-sans uppercase tracking-wider">
                  La tua colonna sonora
                </p>
                <p className="text-xs text-sunset-gold font-sans font-medium truncate">
                  {vibePointData.soundtrack}
                </p>
              </div>
              {vibePointData.spotifyUrl && (
                <a
                  href={vibePointData.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-sunset-orange font-sans font-bold hover:underline flex-shrink-0"
                >
                  Play ▶
                </a>
              )}
            </div>

            {/* Tip */}
            <div className="flex items-start gap-2">
              <Sparkles className="w-3 h-3 text-sunset-peach mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/50 font-sans italic leading-relaxed">
                {vibePointData.tip}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
