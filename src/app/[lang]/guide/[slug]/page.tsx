// src/app/[lang]/guide/[slug]/page.tsx
import { getPlaceBySlug } from '@/lib/sanity/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// ISR configuration: Revalidate every 1 hour (3600s)
export const revalidate = 3600;

// Pre-generate the most popular slugs at build time
export async function generateStaticParams() {
  return [
    { slug: 'bam-bar' },
    { slug: 'teatro-antico' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const place = await getPlaceBySlug(slug, lang);

  if (!place) return { title: 'Not Found' };

  return {
    title: place.title,
    description: place.description.substring(0, 160),
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const place = await getPlaceBySlug(slug, lang);

  if (!place) notFound();

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center">
      <div className="w-full max-w-2xl glass-card p-8">
        <span className="text-sunset-orange uppercase tracking-widest text-xs font-bold mb-2 block">
          {place.category}
        </span>
        <h1 className="text-4xl font-display font-bold sunset-text mb-6">
          {place.title}
        </h1>
        <p className="text-white/70 leading-relaxed mb-8 font-sans">
          {place.description}
        </p>

        {place.isPremium && (
          <div className="p-4 bg-sunset-orange/10 border border-sunset-orange/20 rounded-xl text-sunset-orange text-sm mb-8 italic font-sans">
            ⭐ Exclusive Premium Partner
          </div>
        )}

        <div className="flex gap-4">
          <a
            href={place.affiliateLinks.bookingUrl}
            className="flex-1 py-4 sunset-gradient text-white text-center font-sans font-bold rounded-2xl hover:opacity-90 transition-opacity"
          >
            Visita il Sito
          </a>
        </div>
      </div>
    </main>
  );
}
