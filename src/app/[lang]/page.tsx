import { Suspense } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedPlaces from '@/components/sections/FeaturedPlaces';
import VibePointBanner from '@/components/ui/VibePointBanner';
import { Calendar, QrCode, Compass, Zap } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang).home;

  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      {/* Vibe Point Banner (appears when ?vibe_point= is in URL) */}
      <Suspense fallback={null}>
        <VibePointBanner />
      </Suspense>

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <section id="how-it-works" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-14">
          <span className="text-sunset-orange font-sans text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
            {dict.howItWorksBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ceramic-white mb-4">
            {dict.howItWorksTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard
            step={1}
            icon={<QrCode className="w-6 h-6 text-sunset-orange" />}
            title={dict.step1Title}
            description={dict.step1Desc}
          />
          <StepCard
            step={2}
            icon={<Compass className="w-6 h-6 text-sunset-gold" />}
            title={dict.step2Title}
            description={dict.step2Desc}
          />
          <StepCard
            step={3}
            icon={<Zap className="w-6 h-6 text-sunset-rose" />}
            title={dict.step3Title}
            description={dict.step3Desc}
          />
        </div>
      </section>

      {/* Featured Places */}
      <FeaturedPlaces />

      {/* Events CTA */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] bg-sunset-orange/10" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] bg-sunset-gold/8" />

          <div className="relative z-10">
            <Calendar className="w-8 h-8 text-sunset-orange mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ceramic-white mb-3">
              {dict.eventsTitle}
            </h2>
            <p className="text-white/40 font-sans max-w-md mx-auto text-sm mb-8">
              {dict.eventsDesc}
            </p>
            <a
              href={`/${lang}/events`}
              className="inline-flex items-center gap-2 px-8 py-4 sunset-gradient text-white font-sans font-bold rounded-full shadow-lg text-sm tracking-wide hover:shadow-xl transition-shadow"
            >
              {dict.eventsCta}
              <span className="text-base">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="sunset-text text-xl font-display font-bold mb-2">
            Taormina Vibe
          </h3>
          <div className="flex justify-center gap-6 mb-6">
            <Link href={`/${lang}/about`} className="text-white/40 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider">
              {dict.footerTeam}
            </Link>
            <a href="#how-it-works" className="text-white/40 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider">
              {dict.footerHowItWorks}
            </a>
            <a href={`/${lang}/events`} className="text-white/40 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider">
              {dict.footerEvents}
            </a>
          </div>
          <p className="text-white/25 text-xs font-sans mb-6">
            {dict.footerDesc}
          </p>
          <p className="text-white/20 text-xs font-sans">
            &copy; {new Date().getFullYear()} Taormina Vibe. {dict.footerRights}
          </p>
        </div>
      </footer>
    </main>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6 sm:p-8 text-center relative group">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full sunset-gradient flex items-center justify-center text-white text-xs font-bold">
        {step}
      </div>
      <div className="p-3 bg-white/5 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-display font-bold text-ceramic-white mb-2">{title}</h3>
      <p className="text-white/40 text-sm font-sans leading-relaxed">{description}</p>
    </div>
  );
}
