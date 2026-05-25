// src/app/[lang]/events/page.tsx
// ISR-powered events page — revalidates every 12 hours (43200 seconds)
import { getTodayEvents, type TaorminaEvent } from '@/lib/data/events';
import { Metadata } from 'next';
import EventsList from './EventsList';
import { getDictionary } from '@/lib/dictionaries';

export const revalidate = 43200; // 12 hours ISR

export const metadata: Metadata = {
  title: 'Eventi Oggi',
  description: 'Scopri gli eventi di oggi a Taormina: concerti, mercati, degustazioni e molto altro.',
};

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const events = await getTodayEvents();
  const dict = getDictionary(lang).events;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative px-4 sm:px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sunset-orange font-sans text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
            {dict.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-ceramic-white mb-4">
            {dict.title}
          </h1>
          <p className="text-white/40 font-sans max-w-md mx-auto text-sm sm:text-base">
            {dict.subtitle}
          </p>

          {/* Last update indicator */}
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-sea-foam animate-pulse" />
            <span className="text-[10px] text-white/30 font-sans tracking-wide uppercase">
              {dict.isr}
            </span>
          </div>
        </div>
      </section>

      {/* Events list */}
      <EventsList events={events} />

      {/* Back to home */}
      <div className="text-center py-12 px-4">
        <a
          href={`/${lang}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 font-sans text-sm hover:bg-white/10 hover:text-white/80 transition-all"
        >
          {dict.back}
        </a>
      </div>
    </main>
  );
}
