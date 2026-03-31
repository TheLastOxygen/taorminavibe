'use client';

import { motion } from 'framer-motion';
import { Compass, MapPin, Star, Utensils } from 'lucide-react';

export default function LandingPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center"
        >
          <span className="text-gold font-display tracking-widest text-sm uppercase mb-4 block">
            Welcome to Taormina
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-medium gold-gradient bg-clip-text text-transparent mb-6">
            Taormina Vibe
          </h1>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-10">
            The exclusive digital guide for the ultimate Sicilian experience. 
            Luxury dining, hidden beaches, and curated memories.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gold text-black font-semibold rounded-full shadow-premium"
          >
            Explore the Guide
          </motion.button>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]" />
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Utensils className="w-6 h-6 text-gold" />}
            title="Fine Dining"
            description="Curated selection of the best restaurants in town."
          />
          <FeatureCard 
            icon={<MapPin className="w-6 h-6 text-gold" />}
            title="Hidden Gems"
            description="Discover locations known only to the locals."
          />
          <FeatureCard 
            icon={<Star className="w-6 h-6 text-gold" />}
            title="Premium B2B"
            description="Exclusive services and selected partners."
          />
          <FeatureCard 
            icon={<Compass className="w-6 h-6 text-gold" />}
            title="Instant Guide"
            description="Scan the QR code and start your journey."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-white/10 text-center text-white/40 text-sm">
        &copy; {new Date().getFullYear()} Taormina Vibe - The Gold Guide.
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-8 flex flex-col items-start gap-4"
    >
      <div className="p-3 bg-white/5 rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-display text-white">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
