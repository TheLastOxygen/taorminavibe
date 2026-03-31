'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
  emoji: string;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function ImageGallery({
  images,
  title,
  emoji,
}: ImageGalleryProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipe = swipePower(info.offset.x, info.velocity.x);
      if (swipe < -swipeConfidenceThreshold) {
        paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1);
      }
    },
    [paginate]
  );

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-midnight-sea">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/90 via-transparent to-midnight-sea/40 z-10 pointer-events-none" />

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Emoji fallback with styled background */}
          <div className="absolute inset-0 bg-gradient-to-br from-midnight-sea via-midnight-sea/80 to-sunset-orange/10 flex items-center justify-center">
            <span className="text-8xl sm:text-9xl opacity-30 select-none">
              {emoji}
            </span>
          </div>

          {/* Actual image (lazy loaded) */}
          <img
            src={images[imageIndex]}
            alt={`${title} - foto ${imageIndex + 1}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Hide broken image, show emoji fallback
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-black/50 hover:text-white transition-all"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-black/50 hover:text-white transition-all"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === imageIndex
                  ? 'bg-sunset-orange w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Vai all'immagine ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white/70 text-xs font-sans font-medium">
        {imageIndex + 1} / {images.length}
      </div>
    </div>
  );
}
