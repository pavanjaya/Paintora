import { FEED_ARTWORKS, GALLERY_IMGS } from './data'
export type { ArtItem } from './data'

export type BrowseCategory = 'spaces' | 'styles' | 'mediums' | 'subjects'

export type ColorPaletteData = {
  slug: string
  title: string
  description: string
  count: string
  hex: string[]
}

export type RelatedLink = { label: string; href: string }

export type BrowsePageData = {
  slug: string
  title: string
  description: string
  count: string
  relatedLinks: RelatedLink[]
}

export const BROWSE_DATA: Record<BrowseCategory, BrowsePageData[]> = {
  spaces: [
    {
      slug: 'living-room',
      title: 'Living Room',
      description: 'Statement paintings that anchor your main space.',
      count: '2,400+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Impressionism', href: '/styles/impressionism' },
      ],
    },
    {
      slug: 'office',
      title: 'Office',
      description: 'Curated artwork for modern workspaces.',
      count: '2,456',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Architecture', href: '/subjects/architecture' },
        { label: 'Portrait', href: '/subjects/portrait' },
      ],
    },
    {
      slug: 'bedroom',
      title: 'Bedroom',
      description: 'Calm, restful paintings for personal sanctuaries.',
      count: '1,800+',
      relatedLinks: [
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Still Life', href: '/subjects/still-life' },
      ],
    },
    {
      slug: 'dining-room',
      title: 'Dining Room',
      description: 'Conversation-starting art for shared meals.',
      count: '940+',
      relatedLinks: [
        { label: 'Still Life', href: '/subjects/still-life' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Nature', href: '/subjects/nature' },
      ],
    },
    {
      slug: 'hotel',
      title: 'Hotel',
      description: 'Sophisticated artwork for hospitality interiors.',
      count: '1,200+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Architecture', href: '/subjects/architecture' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Portrait', href: '/subjects/portrait' },
      ],
    },
    {
      slug: 'cafe',
      title: 'Café',
      description: 'Warm, inviting art for coffee shops and bistros.',
      count: '620+',
      relatedLinks: [
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Still Life', href: '/subjects/still-life' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Oil Painting', href: '/mediums/oil' },
      ],
    },
    {
      slug: 'retail',
      title: 'Retail',
      description: 'Distinctive paintings that enhance the shopping experience.',
      count: '480+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Architecture', href: '/subjects/architecture' },
        { label: 'Portrait', href: '/subjects/portrait' },
      ],
    },
    {
      slug: 'spa',
      title: 'Spa',
      description: 'Serene, mindful artwork for wellness spaces.',
      count: '560+',
      relatedLinks: [
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Still Life', href: '/subjects/still-life' },
      ],
    },
  ],
  styles: [
    {
      slug: 'abstract',
      title: 'Abstract',
      description: 'Expressive, emotion-driven paintings that transcend literal representation.',
      count: '3,200+',
      relatedLinks: [
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Portrait', href: '/subjects/portrait' },
      ],
    },
    {
      slug: 'minimalist',
      title: 'Minimalist',
      description: 'Restrained compositions that speak through form and negative space.',
      count: '1,800+',
      relatedLinks: [
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Still Life', href: '/subjects/still-life' },
      ],
    },
    {
      slug: 'contemporary',
      title: 'Contemporary',
      description: 'Modern paintings reflecting today\'s artistic conversation.',
      count: '2,600+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
    {
      slug: 'impressionism',
      title: 'Impressionism',
      description: 'Light-filled paintings that capture fleeting moments and atmosphere.',
      count: '1,400+',
      relatedLinks: [
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Still Life', href: '/subjects/still-life' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
      ],
    },
    {
      slug: 'geometric',
      title: 'Geometric',
      description: 'Precise, pattern-driven compositions with mathematical beauty.',
      count: '980+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Minimalist', href: '/styles/minimalist' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Retail', href: '/spaces/retail' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
    {
      slug: 'landscape',
      title: 'Landscape',
      description: 'Horizon, depth, and the natural world rendered in paint.',
      count: '2,100+',
      relatedLinks: [
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Architecture', href: '/subjects/architecture' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
  ],
  mediums: [
    {
      slug: 'oil',
      title: 'Oil Painting',
      description: 'Rich, luminous works with deep color and lasting texture.',
      count: '4,100+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Still Life', href: '/subjects/still-life' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Living Room', href: '/spaces/living-room' },
      ],
    },
    {
      slug: 'watercolor',
      title: 'Watercolor',
      description: 'Translucent, fluid paintings with a light, ethereal quality.',
      count: '1,600+',
      relatedLinks: [
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Still Life', href: '/subjects/still-life' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Spa', href: '/spaces/spa' },
      ],
    },
    {
      slug: 'acrylic',
      title: 'Acrylic',
      description: 'Versatile, vibrant paintings with bold color and fast drying.',
      count: '2,800+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Office', href: '/spaces/office' },
      ],
    },
    {
      slug: 'mixed-media',
      title: 'Mixed Media',
      description: 'Layered, experimental works combining multiple materials.',
      count: '920+',
      relatedLinks: [
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Architecture', href: '/subjects/architecture' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
  ],
  subjects: [
    {
      slug: 'landscape',
      title: 'Landscape',
      description: 'The natural world — horizons, forests, skies, and water.',
      count: '3,400+',
      relatedLinks: [
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Architecture', href: '/subjects/architecture' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
    {
      slug: 'architecture',
      title: 'Architecture',
      description: 'Buildings, cities, and the built environment.',
      count: '1,100+',
      relatedLinks: [
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Geometric', href: '/styles/geometric' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
    {
      slug: 'floral',
      title: 'Floral',
      description: 'Flowers and botanical subjects in every style and scale.',
      count: '2,200+',
      relatedLinks: [
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Still Life', href: '/subjects/still-life' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Spa', href: '/spaces/spa' },
      ],
    },
    {
      slug: 'portrait',
      title: 'Portrait',
      description: 'The human face and figure — from realism to abstraction.',
      count: '1,800+',
      relatedLinks: [
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Hotel', href: '/spaces/hotel' },
      ],
    },
    {
      slug: 'still-life',
      title: 'Still Life',
      description: 'Objects, arrangements, and the quiet beauty of everyday things.',
      count: '1,300+',
      relatedLinks: [
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Nature', href: '/subjects/nature' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Dining Room', href: '/spaces/dining-room' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
      ],
    },
    {
      slug: 'nature',
      title: 'Nature',
      description: 'Animals, plants, and the broader natural world.',
      count: '2,600+',
      relatedLinks: [
        { label: 'Watercolor', href: '/mediums/watercolor' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Floral', href: '/subjects/floral' },
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Spa', href: '/spaces/spa' },
      ],
    },
  ],
}

export const ALL_ARTWORKS = [...FEED_ARTWORKS, ...GALLERY_IMGS]

export function getBrowsePage(category: BrowseCategory, slug: string): BrowsePageData | null {
  return BROWSE_DATA[category]?.find(p => p.slug === slug) ?? null
}

export function getColorPalettePage(slug: string): BrowsePageData | null {
  const palette = COLOR_PALETTES.find(p => p.slug === slug)
  if (!palette) return null
  return {
    slug: palette.slug,
    title: palette.title,
    description: palette.description,
    count: palette.count,
    relatedLinks: COLOR_PALETTES.filter(p => p.slug !== slug).slice(0, 5).map(p => ({
      label: p.title,
      href: `/color-palettes/${p.slug}`,
    })),
  }
}

export const CATEGORY_LABELS: Record<BrowseCategory, string> = {
  spaces: 'Spaces',
  styles: 'Styles',
  mediums: 'Mediums',
  subjects: 'Subjects',
}

export const COLOR_PALETTES: ColorPaletteData[] = [
  { slug: 'warm-tones',   title: 'Warm Tones',    description: 'Reds, oranges, and golden hues that bring energy and warmth to any space.',  count: '1,200+', hex: ['#C0392B','#E67E22','#F1C40F','#A0522D'] },
  { slug: 'cool-blues',   title: 'Cool Blues',    description: 'Calming blues and teals perfect for bedrooms, offices, and meditation spaces.', count: '980+',   hex: ['#1A5276','#2980B9','#76D7C4','#AED6F1'] },
  { slug: 'earth-tones',  title: 'Earth Tones',   description: 'Grounded neutrals — sand, clay, and olive — for organic, natural interiors.',  count: '1,050+', hex: ['#6B4226','#C4A35A','#8B9D77','#D4C5A9'] },
  { slug: 'moody-darks',  title: 'Moody Darks',   description: 'Deep, dramatic palettes with blacks, navy, and forest green for bold spaces.',  count: '760+',   hex: ['#1C2833','#1B2631','#154360','#186A3B'] },
  { slug: 'soft-pastels', title: 'Soft Pastels',  description: 'Delicate pinks, lilacs, and mints that feel light and airy.',                  count: '890+',   hex: ['#F9AFCA','#D7BDE2','#A9DFBF','#AED6F1'] },
  { slug: 'monochrome',   title: 'Monochrome',    description: 'Black, white, and grey paintings with strong graphic presence.',                count: '640+',   hex: ['#1A1A1A','#555555','#AAAAAA','#F0F0F0'] },
]

export const DISCOVER_NAV_ITEMS = [
  { label: 'Spaces',   desc: 'Browse by room or environment',   href: '/spaces' },
  { label: 'Styles',   desc: 'Abstract, Minimalist, Realism…',  href: '/styles' },
  { label: 'Mediums',  desc: 'Oil, Watercolor, Acrylic…',       href: '/mediums' },
  { label: 'Subjects', desc: 'Landscape, Portrait, Floral…',    href: '/subjects' },
]
