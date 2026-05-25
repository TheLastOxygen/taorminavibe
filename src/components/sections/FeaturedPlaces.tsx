'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import CategoryNav from './CategoryNav';
import PlaceCard from '@/components/ui/PlaceCard';
import { places, type PlaceCategory } from '@/lib/data/places';
import { getDictionary } from '@/lib/dictionaries';

export default function FeaturedPlaces() {
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('all');
  const params = useParams();
  const lang = (params.lang as string) || 'it';
  const dict = getDictionary(lang).featured;

  const filteredPlaces =
    activeCategory === 'all'
      ? places
      : places.filter((p) => p.category === activeCategory);

  return (
    <section id="discover" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-sunset-orange font-sans text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
          {dict.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ceramic-white mb-4">
          {dict.title}
        </h2>
        <p className="text-white/40 font-sans max-w-md mx-auto text-sm sm:text-base">
          {dict.subtitle}
        </p>
      </motion.div>

      {/* Category navigation */}
      <div className="mb-10">
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Place cards grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredPlaces.map((place, index) => (
            <PlaceCard key={place.id} place={place} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredPlaces.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-white/30 font-sans">
            {dict.empty}
          </p>
        </motion.div>
      )}
    </section>
  );
}
