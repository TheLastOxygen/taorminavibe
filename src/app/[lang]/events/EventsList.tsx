'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Ticket, ArrowUpRight } from 'lucide-react';
import type { TaorminaEvent } from '@/lib/data/events';

const categoryColors: Record<string, string> = {
  concert: 'bg-sunset-orange/15 text-sunset-orange border-sunset-orange/20',
  market: 'bg-sea-foam/15 text-sea-foam border-sea-foam/20',
  party: 'bg-sunset-rose/15 text-sunset-rose border-sunset-rose/20',
  culture: 'bg-sunset-gold/15 text-sunset-gold border-sunset-gold/20',
  food: 'bg-sunset-peach/15 text-sunset-peach border-sunset-peach/20',
};

export default function EventsList({ events }: { events: TaorminaEvent[] }) {
  const [displayEvents, setDisplayEvents] = useState<TaorminaEvent[]>(events);

  useEffect(() => {
    setDisplayEvents([...events].sort(() => Math.random() - 0.5));
  }, [events]);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <div className="space-y-4">
        {displayEvents.map((event, index) => (
          <motion.article
            key={event.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="glass-card p-5 sm:p-6 group"
          >
            <div className="flex items-start gap-4">
              {/* Emoji */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {event.emoji}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Category badge */}
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold tracking-wider uppercase border mb-2 ${categoryColors[event.category] || ''}`}
                >
                  {event.category}
                </span>

                <h3 className="text-base sm:text-lg font-display font-bold text-ceramic-white group-hover:text-sunset-orange transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/40 font-sans mb-3">
                  {event.subtitle}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/50 font-sans">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/50 font-sans">{event.location}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/35 font-sans leading-relaxed">
                  {event.description}
                </p>

                {/* Ticket CTA */}
                {event.ticketUrl && (
                  <motion.a
                    href={event.ticketUrl}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full sunset-gradient text-white text-xs font-sans font-bold tracking-wide"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    Prenota
                    <ArrowUpRight className="w-3 h-3" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
