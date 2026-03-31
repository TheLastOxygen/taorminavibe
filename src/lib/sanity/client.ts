// src/lib/sanity/client.ts
// In a real project, you would use @sanity/client
export const client = {
  fetch: async (query: string, params: any) => {
    // Mocking a Sanity response for a place
    if (params.slug === 'bam-bar') {
      return {
        title: { it: "Bam Bar", en: "Bam Bar" },
        description: { 
          it: "La granita più famosa di Taormina...", 
          en: "The most famous granita in Taormina..." 
        },
        category: "Luxury Breakfast",
        googlePlaceId: "ChIJ...",
        isPremium: true,
        affiliateLinks: { bookingUrl: "#" }
      };
    }
    return null;
  }
};

export const getPlaceBySlug = async (slug: string, lang: string) => {
  // Simulate fetching with ISR revalidation timing
  const data = await client.fetch('*[_type == "place" && slug.current == $slug][0]', { slug });
  if (!data) return null;
  
  return {
    ...data,
    title: data.title[lang] || data.title['en'],
    description: data.description[lang] || data.description['en'],
  };
};
