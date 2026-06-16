import { FEED_ARTWORKS, GALLERY_IMGS } from './data'
export type { ArtItem } from './data'

export type BrowseCategory = 'spaces' | 'styles' | 'mediums' | 'subjects'

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
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Floral', href: '/subjects/floral' },
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
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Oil Painting', href: '/mediums/oil' },
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
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Office', href: '/spaces/office' },
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
        { label: 'Oil Painting', href: '/mediums/oil' },
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Office', href: '/spaces/office' },
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
        { label: 'Living Room', href: '/spaces/living-room' },
        { label: 'Office', href: '/spaces/office' },
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
        { label: 'Living Room', href: '/spaces/living-room' },
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
        { label: 'Acrylic', href: '/mediums/acrylic' },
        { label: 'Office', href: '/spaces/office' },
        { label: 'Retail', href: '/spaces/retail' },
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
        { label: 'Living Room', href: '/spaces/living-room' },
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
        { label: 'Landscape', href: '/subjects/landscape' },
        { label: 'Portrait', href: '/subjects/portrait' },
        { label: 'Still Life', href: '/subjects/still-life' },
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
        { label: 'Impressionism', href: '/styles/impressionism' },
        { label: 'Nature', href: '/subjects/nature' },
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
        { label: 'Living Room', href: '/spaces/living-room' },
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
        { label: 'Office', href: '/spaces/office' },
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
        { label: 'Living Room', href: '/spaces/living-room' },
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
        { label: 'Acrylic', href: '/mediums/acrylic' },
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
        { label: 'Bedroom', href: '/spaces/bedroom' },
        { label: 'Nature', href: '/subjects/nature' },
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
        { label: 'Contemporary', href: '/styles/contemporary' },
        { label: 'Abstract', href: '/styles/abstract' },
        { label: 'Mixed Media', href: '/mediums/mixed-media' },
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
        { label: 'Dining Room', href: '/spaces/dining-room' },
        { label: 'Floral', href: '/subjects/floral' },
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
        { label: 'Spa', href: '/spaces/spa' },
      ],
    },
  ],
}

export const ALL_ARTWORKS = [...FEED_ARTWORKS, ...GALLERY_IMGS]

export function getBrowsePage(category: BrowseCategory, slug: string): BrowsePageData | null {
  return BROWSE_DATA[category]?.find(p => p.slug === slug) ?? null
}

export const CATEGORY_LABELS: Record<BrowseCategory, string> = {
  spaces: 'Spaces',
  styles: 'Styles',
  mediums: 'Mediums',
  subjects: 'Subjects',
}

export const DISCOVER_NAV_ITEMS = [
  { label: 'Spaces',   desc: 'Browse by room or environment',   href: '/spaces' },
  { label: 'Styles',   desc: 'Abstract, Minimalist, Realism…',  href: '/styles' },
  { label: 'Mediums',  desc: 'Oil, Watercolor, Acrylic…',       href: '/mediums' },
  { label: 'Subjects', desc: 'Landscape, Portrait, Floral…',    href: '/subjects' },
]
