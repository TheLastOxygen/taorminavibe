'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 midnight-gradient" />
      <div className="absolute inset-0 hero-glow" />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] float-animation pulse-glow"
        style={{ background: 'rgba(242, 107, 58, 0.08)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] float-animation pulse-glow"
        style={{ background: 'rgba(245, 166, 35, 0.06)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-[200px] h-[200px] rounded-full blur-[60px] float-animation"
        style={{ background: 'rgba(232, 68, 109, 0.05)', animationDelay: '4s' }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 text-center max-w-3xl mx-auto"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <MapPin className="w-3.5 h-3.5 text-sunset-orange" />
          <span className="text-xs font-sans font-medium tracking-widest uppercase text-white/60">
            Sicilia, Italia
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-6"
        >
          <span className="text-ceramic-white">Senti il</span>
          <br />
          <span className="sunset-text">ritmo di</span>
          <br />
          <span className="text-ceramic-white">Taormina</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/50 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed font-sans"
        >
          Scansiona. Scopri. Vivi.
          <br />
          La guida digitale che vibra con te.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#discover"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 sunset-gradient text-white font-sans font-bold rounded-full shadow-lg text-sm tracking-wide"
          >
            Esplora la Guida
          </motion.a>
          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/15 text-white/80 font-sans font-semibold rounded-full text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            Come Funziona
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-sans tracking-widest uppercase">Scorri</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
