// src/lib/data/events.ts
// Mock event data — simulates a daily events API
// In production, this would fetch from a real CMS/API

export interface TaorminaEvent {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  time: string;
  date: string;
  category: 'concert' | 'market' | 'party' | 'culture' | 'food';
  emoji: string;
  description: string;
  isPremium: boolean;
  ticketUrl?: string;
}

// Simulates fetching today's events
export async function getTodayEvents(): Promise<TaorminaEvent[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const today = new Date().toISOString().split('T')[0];

  return [
    {
      id: 'evt-1',
      title: 'Concerto al Teatro Greco',
      subtitle: 'Orchestra Sinfonica Siciliana',
      location: 'Teatro Antico di Taormina',
      time: '21:00',
      date: today,
      category: 'concert',
      emoji: '🎶',
      description: 'Una serata magica con le grandi opere della musica classica italiana, sotto le stelle del teatro più bello del mondo.',
      isPremium: true,
      ticketUrl: '#',
    },
    {
      id: 'evt-2',
      title: 'Sunset DJ Set',
      subtitle: 'feat. Marco Ferrazza',
      location: 'La Plage Resort',
      time: '18:30',
      date: today,
      category: 'party',
      emoji: '🎧',
      description: 'Aperitivo e selezione musicale con vista su Isola Bella. Ingresso con consumazione.',
      isPremium: false,
    },
    {
      id: 'evt-3',
      title: 'Mercato dei Sapori Siciliani',
      subtitle: 'Produttori locali dell\'Etna',
      location: 'Villa Comunale',
      time: '09:00 - 14:00',
      date: today,
      category: 'market',
      emoji: '🧺',
      description: 'Pistacchio di Bronte, miele dell\'Etna, formaggi ragusani e olio extra vergine. Degustazioni gratuite.',
      isPremium: false,
    },
    {
      id: 'evt-4',
      title: 'Taormina Film Fest - Proiezione',
      subtitle: 'Cinema sotto le stelle',
      location: 'Palazzo dei Congressi',
      time: '20:30',
      date: today,
      category: 'culture',
      emoji: '🎬',
      description: 'Proiezione speciale con regista e cast. Aperitivo nel giardino prima dello spettacolo.',
      isPremium: true,
      ticketUrl: '#',
    },
    {
      id: 'evt-5',
      title: 'Cooking Class: Pasta alla Norma',
      subtitle: 'Chef Giuseppe Ferrara',
      location: 'Ristorante Vicolo Stretto',
      time: '16:00',
      date: today,
      category: 'food',
      emoji: '👨‍🍳',
      description: 'Impara a preparare il piatto simbolo della cucina siciliana con ingredienti a km 0.',
      isPremium: true,
      ticketUrl: '#',
    },
    {
      id: 'evt-6',
      title: 'Tour storico di Taormina',
      subtitle: 'Alla scoperta dei tesori nascosti',
      location: 'Piazza IX Aprile',
      time: '10:30',
      date: today,
      category: 'culture',
      emoji: '🏛️',
      description: 'Una passeggiata guidata tra i vicoli storici, le chiese antiche e i palazzi nobiliari di Taormina.',
      isPremium: false,
    },
    {
      id: 'evt-7',
      title: 'Degustazione Vini dell\'Etna',
      subtitle: 'Masterclass con Sommelier',
      location: 'Enoteca Regionale',
      time: '19:00',
      date: today,
      category: 'food',
      emoji: '🍷',
      description: 'Esplora i vulcani nel bicchiere. Assaggio di 4 etichette selezionate con abbinamenti gastronomici.',
      isPremium: true,
      ticketUrl: '#',
    },
  ];
}
