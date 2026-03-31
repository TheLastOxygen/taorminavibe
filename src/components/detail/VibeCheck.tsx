'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface VibeCheckProps {
  vibeCheck: string;
  category: string;
}

export default function VibeCheck({ vibeCheck, category }: VibeCheckProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative"
    >
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-sunset-gold" />
        <span className="text-sunset-gold font-sans text-xs font-bold tracking-[0.2em] uppercase">
          Vibe Check
        </span>
      </div>

      {/* Glass card with the AI blurb */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] bg-sunset-gold/8 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full blur-[50px] bg-sunset-orange/6 pointer-events-none" />

        {/* Category context tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/50 text-[10px] font-sans font-semibold tracking-wider uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sunset-gold animate-pulse" />
          {category}
        </div>

        {/* The atmosphere description */}
        <p className="text-white/70 font-sans text-sm sm:text-base leading-relaxed relative z-10">
          {vibeCheck}
        </p>

        {/* Italic AI credit */}
        <p className="text-white/20 text-[10px] font-sans mt-4 italic">
          ✨ Generato dall&apos;AI di Taormina Vibe
        </p>
      </div>
    </motion.section>
  );
}
