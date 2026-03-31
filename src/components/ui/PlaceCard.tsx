'use client';

import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Place } from '@/lib/data/places';

interface PlaceCardProps {
  place: Place;
  index: number;
  lang?: string;
}

export default function PlaceCard({ place, index, lang = 'it' }: PlaceCardProps) {
  return (
    <Link href={`/${lang}/place/${place.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -6 }}
        className="glass-card group relative overflow-hidden cursor-pointer"
      >
        {/* Image with gradient overlay */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/80 via-transparent to-midnight-sea/30 z-10" />
          {/* Emoji fallback */}
          <div className="absolute inset-0 bg-midnight-sea flex items-center justify-center">
            <span className="text-6xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
              {place.emoji}
            </span>
          </div>
          {/* Real image (lazy loaded) */}
          <img
            src={place.imageUrl}
            alt={place.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          {/* Premium badge */}
          {place.isPremium && (
            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-sunset-orange/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">
              Premium
            </div>
          )}

          {/* Price level */}
          <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-xs font-medium">
            {place.priceLevel}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-ceramic-white group-hover:text-sunset-orange transition-colors duration-300">
                {place.title}
              </h3>
              <p className="text-sm text-white/40 font-sans mt-0.5">{place.subtitle}</p>
            </div>

            {/* Arrow icon */}
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-5 h-5 text-sunset-orange" />
            </motion.div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 text-sunset-gold fill-sunset-gold" />
            <span className="text-sm font-sans font-semibold text-sunset-gold">{place.rating}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-sans font-medium tracking-wide rounded-full bg-white/5 text-white/50 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
