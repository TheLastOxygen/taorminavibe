import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Star, MapPin } from 'lucide-react';
import { getPlaceBySlug, getAllPlaces } from '@/lib/data/places';
import ImageGallery from '@/components/detail/ImageGallery';
import VibeCheck from '@/components/detail/VibeCheck';
import AffiliateButton from '@/components/detail/AffiliateButton';
import NearbyOffers from '@/components/detail/NearbyOffers';

// ISR: revalidate every hour
export const revalidate = 3600;

// Pre-generate all known slugs at build time
export async function generateStaticParams() {
  return getAllPlaces().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) return { title: 'Not Found' };

  return {
    title: `${place.title} — ${place.subtitle}`,
    description: place.vibeCheck.substring(0, 160),
    openGraph: {
      title: `${place.title} | Taormina Vibe`,
      description: place.vibeCheck.substring(0, 160),
      type: 'article',
    },
  };
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) notFound();

  const categoryLabels: Record<string, string> = {
    eat: '🍝 Eat',
    party: '🥂 Party',
    explore: '🏛️ Explore',
    chill: '🌊 Chill',
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 px-4 py-3 bg-sea-deep/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Esplora</span>
          </Link>
          <span className="sunset-text font-display font-bold text-sm">
            Taormina Vibe
          </span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Image Gallery */}
        <div className="mt-4">
          <ImageGallery
            images={place.images}
            title={place.title}
            emoji={place.emoji}
          />
        </div>

        {/* Title & Meta */}
        <div className="mt-6">
          {/* Category & Premium badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sunset-orange font-sans text-xs font-bold tracking-[0.15em] uppercase">
              {categoryLabels[place.category] ?? place.category}
            </span>
            {place.isPremium && (
              <span className="px-2 py-0.5 rounded-full bg-sunset-orange/15 text-sunset-orange text-[10px] font-bold tracking-wider uppercase border border-sunset-orange/20">
                Premium
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-display font-bold sunset-text mb-1">
            {place.title}
          </h1>
          <p className="text-white/50 font-sans text-sm sm:text-base mb-4">
            {place.subtitle}
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-sunset-gold fill-sunset-gold" />
              <span className="text-sunset-gold font-sans font-bold text-sm">
                {place.rating}
              </span>
            </div>
            <span className="text-white/30 font-sans text-sm font-medium">
              {place.priceLevel}
            </span>
            {place.openingHours && (
              <div className="flex items-center gap-1.5 text-white/40">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-sans text-xs">{place.openingHours}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-white/30">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-sans text-xs">Taormina, Sicilia</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/60 font-sans text-sm leading-relaxed mb-8">
            {place.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {place.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[11px] font-sans font-medium tracking-wide rounded-full bg-white/5 text-white/50 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Vibe Check */}
        <div className="mb-8">
          <VibeCheck vibeCheck={place.vibeCheck} category={categoryLabels[place.category] ?? place.category} />
        </div>

        {/* Affiliate CTA */}
        <div className="mb-10">
          <AffiliateButton placeId={place.id} />
        </div>

        {/* Nearby Offers */}
        <Suspense fallback={null}>
          <NearbyOffers currentPlace={place} lang={lang} />
        </Suspense>
      </div>
    </main>
  );
}
