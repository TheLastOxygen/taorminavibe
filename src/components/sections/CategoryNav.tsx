'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, type PlaceCategory } from '@/lib/data/places';

interface CategoryNavProps {
  onCategoryChange: (category: PlaceCategory | 'all') => void;
  activeCategory: PlaceCategory | 'all';
}

export default function CategoryNav({ onCategoryChange, activeCategory }: CategoryNavProps) {
  const allCategories = [
    { id: 'all' as const, label: 'Tutti', emoji: '✨' },
    ...categories,
  ];

  return (
    <div className="w-full overflow-x-auto hide-scrollbar py-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex gap-3 justify-start sm:justify-center px-4 sm:px-0 min-w-max sm:min-w-0"
      >
        {allCategories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`category-pill relative ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 sunset-gradient rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
