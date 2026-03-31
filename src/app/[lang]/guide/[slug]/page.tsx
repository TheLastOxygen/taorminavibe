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

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const { lang, slug } = params;
  const place = await getPlaceBySlug(slug, lang);
  
  if (!place) return { title: 'Not Found' };
  
  return {
    title: place.title,
    description: place.description.substring(0, 160),
  };
}

export default async function GuidePage({ params }: { params: { lang: string; slug: string } }) {
  const { lang, slug } = params;
  const place = await getPlaceBySlug(slug, lang);

  if (!place) notFound();

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
        <span className="text-gold uppercase tracking-tighter text-sm font-bold mb-2 block">
          {place.category}
        </span>
        <h1 className="text-4xl font-display font-medium gold-gradient bg-clip-text text-transparent mb-6">
          {place.title}
        </h1>
        <p className="text-white/70 leading-relaxed mb-8">
          {place.description}
        </p>
        
        {place.isPremium && (
          <div className="p-4 bg-gold/10 border border-gold/20 rounded-xl text-gold text-sm mb-8 italic">
            Exclusive Premium Partner Showcase
          </div>
        )}
        
        <div className="flex gap-4">
          <a
            href={place.affiliateLinks.bookingUrl}
            className="flex-1 py-4 bg-gold text-black text-center font-bold rounded-2xl hover:bg-gold-muted transition-colors"
          >
            Visit Website
          </a>
        </div>
      </div>
    </main>
  );
}
