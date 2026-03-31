'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getPartnerConfig } from '@/lib/data/partners';

interface AffiliateButtonProps {
  placeId: string;
}

export default function AffiliateButton({ placeId }: AffiliateButtonProps) {
  const partner = getPartnerConfig(placeId);
  const hasPartner = partner.affiliateUrl !== '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <a
        href={partner.affiliateUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`
          group flex items-center justify-center gap-3 w-full py-4 sm:py-5 px-8
          rounded-2xl font-sans font-bold text-sm sm:text-base tracking-wide
          transition-all duration-300
          ${
            hasPartner
              ? 'sunset-gradient text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-white/10 text-white/70 border border-white/10 hover:bg-white/15 hover:text-white'
          }
        `}
      >
        <span className="text-lg">{partner.ctaEmoji}</span>
        <span>{partner.ctaLabel}</span>
        <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
      </a>

      {/* Affiliate disclosure (legally required in many markets) */}
      {hasPartner && (
        <p className="text-white/15 text-[9px] font-sans text-center mt-2 tracking-wide">
          Link affiliato • Potremmo ricevere una commissione
        </p>
      )}
    </motion.div>
  );
}
