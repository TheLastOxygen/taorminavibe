'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  if (!pathname) return null;
  
  const currentLocale = pathname.split('/')[1] || 'it';
  
  const getPathForLocale = (locale: string) => {
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = locale;
    } else {
      return `/${locale}`;
    }
    return segments.join('/');
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-lg">
      <Link
        href={getPathForLocale('it')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
          currentLocale === 'it' 
            ? 'bg-sunset-orange text-white' 
            : 'text-white/50 hover:text-white'
        }`}
      >
        IT
      </Link>
      <Link
        href={getPathForLocale('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
          currentLocale === 'en' 
            ? 'bg-sunset-orange text-white' 
            : 'text-white/50 hover:text-white'
        }`}
      >
        EN
      </Link>
    </div>
  );
}
