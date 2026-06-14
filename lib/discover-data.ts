import { FEED_ARTWORKS, GALLERY_IMGS } from './data'
export type { ArtItem } from './data'

export type DiscoverCategory = 'spaces' | 'collections' | 'styles' | 'mediums' | 'subjects'

export type DiscoverItem = {
  slug: string
  title: string
  description: string
  count: string
  heroImg: string
  related: Array<{ title: string; slug: string; category: DiscoverCategory }>
}

const ALL_ARTWORKS = [...FEED_ARTWORKS, ...GALLERY_IMGS.slice(8)]

export const DISCOVER_DATA: Record<DiscoverCategory, DiscoverItem[]> = {
  spaces: [
    {
      slug: 'living-room',
      title: 'Living Room',
      description: 'Statement paintings that anchor your main space. Curated for warmth, conversation, and lasting presence.',
      count: '2,400+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
      related: [
        { title: 'Bedroom', slug: 'bedroom', category: 'spaces' },
        { title: 'Dining Room', slug: 'dining-room', category: 'spaces' },
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
        { title: 'Luxury Living', slug: 'luxury-living', category: 'collections' },
      ],
    },
    {
      slug: 'bedroom',
      title: 'Bedroom',
      description: 'Calm, restful paintings for personal sanctuaries. Art that helps you unwind and breathe.',
      count: '1,800+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&q=80',
      related: [
        { title: 'Living Room', slug: 'living-room', category: 'spaces' },
        { title: 'Spa Interior', slug: 'spa-interior', category: 'spaces' },
        { title: 'Minimalist', slug: 'minimalist', category: 'styles' },
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
      ],
    },
    {
      slug: 'home-office',
      title: 'Home Office',
      description: 'Paintings that sharpen focus and inspire creative thinking. Purposeful art for purposeful work.',
      count: '980+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400&q=80',
      related: [
        { title: 'Law Office', slug: 'law-office', category: 'spaces' },
        { title: 'Executive Office', slug: 'executive-office', category: 'spaces' },
        { title: 'Geometric', slug: 'geometric', category: 'styles' },
        { title: 'Earth Tones', slug: 'earth-tones', category: 'collections' },
      ],
    },
    {
      slug: 'law-office',
      title: 'Law Office',
      description: 'Authoritative, considered artworks for professional environments. Art that commands respect.',
      count: '640+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      related: [
        { title: 'Executive Office', slug: 'executive-office', category: 'spaces' },
        { title: 'Home Office', slug: 'home-office', category: 'spaces' },
        { title: 'Executive Office', slug: 'executive-office', category: 'collections' },
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
      ],
    },
    {
      slug: 'executive-office',
      title: 'Executive Office',
      description: 'Art for leadership spaces and boardrooms. Calm authority through considered curation.',
      count: '820+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
      related: [
        { title: 'Law Office', slug: 'law-office', category: 'spaces' },
        { title: 'Hotel Lobby', slug: 'hotel-lobby', category: 'spaces' },
        { title: 'Contemporary', slug: 'contemporary', category: 'styles' },
        { title: 'Executive Office', slug: 'executive-office', category: 'collections' },
      ],
    },
    {
      slug: 'hotel-lobby',
      title: 'Hotel Lobby',
      description: 'Grand, welcoming statements that define a property\'s character from the very first moment.',
      count: '560+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80',
      related: [
        { title: 'Restaurant', slug: 'restaurant', category: 'spaces' },
        { title: 'Reception', slug: 'reception', category: 'spaces' },
        { title: 'Luxury Living', slug: 'luxury-living', category: 'collections' },
        { title: 'Architecture', slug: 'architecture', category: 'subjects' },
      ],
    },
    {
      slug: 'dining-room',
      title: 'Dining Room',
      description: 'Conversation-starting paintings for shared meals and memorable gatherings.',
      count: '1,200+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
      related: [
        { title: 'Living Room', slug: 'living-room', category: 'spaces' },
        { title: 'Kitchen', slug: 'kitchen', category: 'spaces' },
        { title: 'Still Life', slug: 'still-life', category: 'subjects' },
        { title: 'Earth Tones', slug: 'earth-tones', category: 'collections' },
      ],
    },
    {
      slug: 'restaurant',
      title: 'Restaurant',
      description: 'Atmosphere-defining paintings for dining experiences. Art that elevates every meal.',
      count: '720+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80',
      related: [
        { title: 'Hotel Lobby', slug: 'hotel-lobby', category: 'spaces' },
        { title: 'Café', slug: 'cafe', category: 'spaces' },
        { title: 'Floral', slug: 'floral', category: 'subjects' },
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
      ],
    },
  ],

  collections: [
    {
      slug: 'luxury-living',
      title: 'Luxury Living',
      description: 'Elevated paintings for premium residential interiors. Curated for scale, palette, and lasting presence.',
      count: '340+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1400&q=80',
      related: [
        { title: 'Executive Office', slug: 'executive-office', category: 'collections' },
        { title: 'Earth Tones', slug: 'earth-tones', category: 'collections' },
        { title: 'Living Room', slug: 'living-room', category: 'spaces' },
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
      ],
    },
    {
      slug: 'executive-office',
      title: 'Executive Office',
      description: 'Authoritative, calm, and considered artworks for leadership spaces and boardrooms.',
      count: '280+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      related: [
        { title: 'Luxury Living', slug: 'luxury-living', category: 'collections' },
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
        { title: 'Law Office', slug: 'law-office', category: 'spaces' },
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
      ],
    },
    {
      slug: 'earth-tones',
      title: 'Earth Tones',
      description: 'Warm terracottas, deep siennas, and quiet ochres — grounded paintings for organic interiors.',
      count: '420+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80',
      related: [
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
        { title: 'Weekend Retreat', slug: 'weekend-retreat', category: 'collections' },
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
      ],
    },
    {
      slug: 'warm-neutrals',
      title: 'Warm Neutrals',
      description: 'Soft linens, warm whites, and quiet creams. Paintings for interiors built on restraint.',
      count: '310+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d75f?w=1400&q=80',
      related: [
        { title: 'Earth Tones', slug: 'earth-tones', category: 'collections' },
        { title: 'Minimal Collection', slug: 'minimal-collection', category: 'collections' },
        { title: 'Bedroom', slug: 'bedroom', category: 'spaces' },
        { title: 'Watercolor', slug: 'watercolor', category: 'mediums' },
      ],
    },
    {
      slug: 'weekend-retreat',
      title: 'Weekend Retreat',
      description: 'Art for holiday homes, cabins, and spaces of slow living. Unhurried, natural, grounded.',
      count: '190+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80',
      related: [
        { title: 'Earth Tones', slug: 'earth-tones', category: 'collections' },
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
        { title: 'Nature', slug: 'nature', category: 'subjects' },
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
      ],
    },
    {
      slug: 'minimal-collection',
      title: 'Minimal Collection',
      description: 'A distillation of form and intention. Paintings where every mark is deliberate.',
      count: '240+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1400&q=80',
      related: [
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
        { title: 'Minimalist', slug: 'minimalist', category: 'styles' },
        { title: 'Home Office', slug: 'home-office', category: 'spaces' },
        { title: 'Acrylic', slug: 'acrylic', category: 'mediums' },
      ],
    },
  ],

  styles: [
    {
      slug: 'abstract',
      title: 'Abstract',
      description: '2,438 curated paintings exploring shape, texture and contemporary expression.',
      count: '2,438 paintings',
      heroImg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80',
      related: [
        { title: 'Minimalist', slug: 'minimalist', category: 'styles' },
        { title: 'Contemporary', slug: 'contemporary', category: 'styles' },
        { title: 'Geometric', slug: 'geometric', category: 'styles' },
        { title: 'Luxury Living', slug: 'luxury-living', category: 'collections' },
      ],
    },
    {
      slug: 'minimalist',
      title: 'Minimalist',
      description: 'Paintings of quiet power. Form distilled to its essence — where space is as important as mark.',
      count: '1,820 paintings',
      heroImg: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1400&q=80',
      related: [
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
        { title: 'Scandinavian', slug: 'scandinavian', category: 'styles' },
        { title: 'Geometric', slug: 'geometric', category: 'styles' },
        { title: 'Minimal Collection', slug: 'minimal-collection', category: 'collections' },
      ],
    },
    {
      slug: 'contemporary',
      title: 'Contemporary',
      description: 'Art of the present moment. Diverse, evolving, and in dialogue with today\'s world.',
      count: '3,640 paintings',
      heroImg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=80',
      related: [
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
        { title: 'Minimalist', slug: 'minimalist', category: 'styles' },
        { title: 'Mixed Media', slug: 'mixed-media', category: 'mediums' },
        { title: 'Living Room', slug: 'living-room', category: 'spaces' },
      ],
    },
    {
      slug: 'impressionism',
      title: 'Impressionism',
      description: 'Light, atmosphere, and fleeting moments captured with expressive brushwork.',
      count: '1,640 paintings',
      heroImg: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400&q=80',
      related: [
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
        { title: 'Nature', slug: 'nature', category: 'subjects' },
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
      ],
    },
    {
      slug: 'geometric',
      title: 'Geometric',
      description: 'Pattern, precision, and the beauty of mathematical form in paint and print.',
      count: '980 paintings',
      heroImg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80',
      related: [
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
        { title: 'Minimalist', slug: 'minimalist', category: 'styles' },
        { title: 'Home Office', slug: 'home-office', category: 'spaces' },
        { title: 'Acrylic', slug: 'acrylic', category: 'mediums' },
      ],
    },
    {
      slug: 'scandinavian',
      title: 'Scandinavian',
      description: 'Nordic calm. Paintings that carry the cool light and quiet beauty of Scandinavian interiors.',
      count: '760 paintings',
      heroImg: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d75f?w=1400&q=80',
      related: [
        { title: 'Minimalist', slug: 'minimalist', category: 'styles' },
        { title: 'Bedroom', slug: 'bedroom', category: 'spaces' },
        { title: 'Warm Neutrals', slug: 'warm-neutrals', category: 'collections' },
        { title: 'Watercolor', slug: 'watercolor', category: 'mediums' },
      ],
    },
  ],

  mediums: [
    {
      slug: 'oil-painting',
      title: 'Oil Painting',
      description: 'The oldest and richest tradition in painting. Depth, luminosity, and unmatched surface texture.',
      count: '5,400+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&q=80',
      related: [
        { title: 'Acrylic', slug: 'acrylic', category: 'mediums' },
        { title: 'Watercolor', slug: 'watercolor', category: 'mediums' },
        { title: 'Impressionism', slug: 'impressionism', category: 'styles' },
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
      ],
    },
    {
      slug: 'watercolor',
      title: 'Watercolor',
      description: 'Transparency, flow, and the beautiful unpredictability of pigment meeting water.',
      count: '3,100+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400&q=80',
      related: [
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
        { title: 'Acrylic', slug: 'acrylic', category: 'mediums' },
        { title: 'Floral', slug: 'floral', category: 'subjects' },
        { title: 'Impressionism', slug: 'impressionism', category: 'styles' },
      ],
    },
    {
      slug: 'acrylic',
      title: 'Acrylic',
      description: 'Versatile, vivid, and fast-drying. A medium that spans abstraction to hyperrealism.',
      count: '4,200+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=80',
      related: [
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
        { title: 'Mixed Media', slug: 'mixed-media', category: 'mediums' },
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
        { title: 'Contemporary', slug: 'contemporary', category: 'styles' },
      ],
    },
    {
      slug: 'mixed-media',
      title: 'Mixed Media',
      description: 'Art that defies categorisation. Layered, textured, and endlessly inventive.',
      count: '2,400+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1400&q=80',
      related: [
        { title: 'Acrylic', slug: 'acrylic', category: 'mediums' },
        { title: 'Abstract', slug: 'abstract', category: 'styles' },
        { title: 'Contemporary', slug: 'contemporary', category: 'styles' },
        { title: 'Earth Tones', slug: 'earth-tones', category: 'collections' },
      ],
    },
  ],

  subjects: [
    {
      slug: 'landscape',
      title: 'Landscape',
      description: 'Horizon, depth, and the expansiveness of the natural world distilled onto canvas.',
      count: '6,200+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
      related: [
        { title: 'Nature', slug: 'nature', category: 'subjects' },
        { title: 'Architecture', slug: 'architecture', category: 'subjects' },
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
        { title: 'Weekend Retreat', slug: 'weekend-retreat', category: 'collections' },
      ],
    },
    {
      slug: 'architecture',
      title: 'Architecture',
      description: 'Structure, geometry, and built space rendered as art. Cities, monuments, interiors.',
      count: '3,400+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1514565131-fce0801e6785?w=1400&q=80',
      related: [
        { title: 'Cityscape', slug: 'cityscape', category: 'subjects' },
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
        { title: 'Geometric', slug: 'geometric', category: 'styles' },
        { title: 'Executive Office', slug: 'executive-office', category: 'spaces' },
      ],
    },
    {
      slug: 'floral',
      title: 'Floral',
      description: 'Blooms, botanicals, and the extraordinary beauty of the natural world in flower.',
      count: '2,800+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1487530811015-780d05b1e5f4?w=1400&q=80',
      related: [
        { title: 'Nature', slug: 'nature', category: 'subjects' },
        { title: 'Still Life', slug: 'still-life', category: 'subjects' },
        { title: 'Watercolor', slug: 'watercolor', category: 'mediums' },
        { title: 'Dining Room', slug: 'dining-room', category: 'spaces' },
      ],
    },
    {
      slug: 'nature',
      title: 'Nature',
      description: 'Art rooted in the living world — forests, seasons, water, sky, and the quiet of wilderness.',
      count: '4,100+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80',
      related: [
        { title: 'Landscape', slug: 'landscape', category: 'subjects' },
        { title: 'Floral', slug: 'floral', category: 'subjects' },
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
        { title: 'Weekend Retreat', slug: 'weekend-retreat', category: 'collections' },
      ],
    },
    {
      slug: 'portrait',
      title: 'Portrait',
      description: 'The human form, face, and presence. Art that looks back at you.',
      count: '2,200+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=80',
      related: [
        { title: 'Nature', slug: 'nature', category: 'subjects' },
        { title: 'Architecture', slug: 'architecture', category: 'subjects' },
        { title: 'Contemporary', slug: 'contemporary', category: 'styles' },
        { title: 'Bedroom', slug: 'bedroom', category: 'spaces' },
      ],
    },
    {
      slug: 'still-life',
      title: 'Still Life',
      description: 'Objects rendered with intention. The poetry of the everyday made permanent.',
      count: '1,400+ paintings',
      heroImg: 'https://images.unsplash.com/photo-1490750967868-88df5691cc56?w=1400&q=80',
      related: [
        { title: 'Floral', slug: 'floral', category: 'subjects' },
        { title: 'Portrait', slug: 'portrait', category: 'subjects' },
        { title: 'Oil Painting', slug: 'oil-painting', category: 'mediums' },
        { title: 'Dining Room', slug: 'dining-room', category: 'spaces' },
      ],
    },
  ],
}

export function getDiscoverItem(category: DiscoverCategory, slug: string): DiscoverItem | null {
  return DISCOVER_DATA[category]?.find(item => item.slug === slug) ?? null
}

export function getRelatedItems(related: DiscoverItem['related']): Array<DiscoverItem & { category: DiscoverCategory }> {
  return related
    .map(r => {
      const item = getDiscoverItem(r.category, r.slug)
      return item ? { ...item, category: r.category } : null
    })
    .filter(Boolean) as Array<DiscoverItem & { category: DiscoverCategory }>
}

export const DISCOVER_ARTWORKS = [...FEED_ARTWORKS, ...GALLERY_IMGS]

export const CATEGORY_LABELS: Record<DiscoverCategory, string> = {
  spaces: 'Spaces',
  collections: 'Collections',
  styles: 'Styles',
  mediums: 'Mediums',
  subjects: 'Subjects',
}
