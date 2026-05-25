export const dictionaries = {
  it: {
    hero: {
      badge: 'Sicilia, Italia',
      title1: 'Senti il',
      title2: 'ritmo',
      title3: 'di',
      title4: 'Taormina',
      subtitle1: 'Scansiona. Scopri. Vivi.',
      subtitle2: 'La guida digitale che vibra con te.',
      cta1: 'Esplora la Guida',
      cta2: 'Come Funziona',
      scroll: 'Scorri',
    },
    home: {
      howItWorksBadge: 'Come Funziona',
      howItWorksTitle: 'Tre passi per vivere Taormina',
      step1Title: 'Scansiona',
      step1Desc: 'Trova gli sticker con il QR code nei punti panoramici, ristoranti e locali di Taormina.',
      step2Title: 'Scopri',
      step2Desc: 'Ottieni consigli personalizzati, colonne sonore e i locali più vicini al tuo punto.',
      step3Title: 'Vivi',
      step3Desc: 'Vivi Taormina come un locale. Offerte esclusive e esperienze uniche solo per te.',
      eventsTitle: 'Eventi di Oggi',
      eventsDesc: 'Concerti al Teatro Greco, DJ set al tramonto, mercati locali. Aggiornamento automatico ogni 12 ore.',
      eventsCta: 'Scopri gli Eventi',
      footerTeam: 'Il Team',
      footerHowItWorks: 'Come Funziona',
      footerEvents: 'Eventi',
      footerDesc: 'La guida digitale che vibra con te',
      footerRights: 'Tutti i diritti riservati.'
    },
    featured: {
      badge: 'Scopri',
      title: 'I posti che amerai',
      subtitle: 'Selezionati per te. Ogni luogo racconta una storia unica di Taormina.',
      empty: 'Nessun posto trovato in questa categoria. Presto ne arriveranno di nuovi! 🌟'
    },
    events: {
      badge: 'Oggi a Taormina',
      title: 'Eventi del Giorno',
      subtitle: 'Aggiornati automaticamente ogni 12 ore. Non perderti nulla.',
      isr: 'Auto-aggiornamento ISR attivo',
      back: '← Torna alla Home'
    }
  },
  en: {
    hero: {
      badge: 'Sicily, Italy',
      title1: 'Feel the',
      title2: 'rhythm',
      title3: 'of',
      title4: 'Taormina',
      subtitle1: 'Scan. Discover. Live.',
      subtitle2: 'The digital guide that vibes with you.',
      cta1: 'Explore the Guide',
      cta2: 'How It Works',
      scroll: 'Scroll',
    },
    home: {
      howItWorksBadge: 'How It Works',
      howItWorksTitle: 'Three steps to live Taormina',
      step1Title: 'Scan',
      step1Desc: 'Find stickers with the QR code in panoramic spots, restaurants and clubs in Taormina.',
      step2Title: 'Discover',
      step2Desc: 'Get personalized recommendations, soundtracks and places nearest to your location.',
      step3Title: 'Live',
      step3Desc: 'Live Taormina like a local. Exclusive offers and unique experiences just for you.',
      eventsTitle: 'Today\'s Events',
      eventsDesc: 'Concerts at the Greek Theatre, sunset DJ sets, local markets. Automatically updated every 12 hours.',
      eventsCta: 'Discover Events',
      footerTeam: 'The Team',
      footerHowItWorks: 'How It Works',
      footerEvents: 'Events',
      footerDesc: 'The digital guide that vibes with you',
      footerRights: 'All rights reserved.'
    },
    featured: {
      badge: 'Discover',
      title: 'Places you will love',
      subtitle: 'Selected for you. Every place tells a unique story of Taormina.',
      empty: 'No places found in this category. New ones coming soon! 🌟'
    },
    events: {
      badge: 'Today in Taormina',
      title: 'Events of the Day',
      subtitle: 'Automatically updated every 12 hours. Do not miss anything.',
      isr: 'ISR auto-update active',
      back: '← Back to Home'
    }
  }
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: string) => {
  return dictionaries[locale as Locale] || dictionaries['it'];
};
