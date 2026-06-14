import { FEED_ARTWORKS, GALLERY_IMGS } from './data'
export type { ArtItem } from './data'

export type BrowseCategory = 'spaces' | 'styles' | 'mediums' | 'subjects'

export type BrowsePageData = {
  slug: string
  title: string
  description: string
  count: string
  popularSearches: string[]
}

export const BROWSE_DATA: Record<BrowseCategory, BrowsePageData[]> = {
  spaces: [
    {
      slug: 'living-room',
      title: 'Living Room',
      description: 'Statement paintings that anchor your main space.',
      count: '2,400+',
      popularSearches: ['Large Abstract', 'Warm Tones', 'Landscape', 'Minimalist', 'Oversized Canvas'],
    },
    {
      slug: 'office',
      title: 'Office',
      description: 'Curated artwork for modern workspaces.',
      count: '2,456',
      popularSearches: ['Law Office', 'Architect Office', 'Corporate Office', 'Executive Office', 'Home Office'],
    },
    {
      slug: 'bedroom',
      title: 'Bedroom',
      description: 'Calm, restful paintings for personal sanctuaries.',
      count: '1,800+',
      popularSearches: ['Soft Tones', 'Floral', 'Abstract', 'Minimalist', 'Nature'],
    },
    {
      slug: 'dining-room',
      title: 'Dining Room',
      description: 'Conversation-starting art for shared meals.',
      count: '940+',
      popularSearches: ['Still Life', 'Botanical', 'Warm Colors', 'Contemporary', 'Large Format'],
    },
    {
      slug: 'hotel',
      title: 'Hotel',
      description: 'Sophisticated artwork for hospitality interiors.',
      count: '1,200+',
      popularSearches: ['Lobby Art', 'Suite Decor', 'Luxury', 'Minimalist', 'Abstract'],
    },
    {
      slug: 'cafe',
      title: 'Café',
      description: 'Warm, inviting art for coffee shops and bistros.',
      count: '620+',
      popularSearches: ['Botanical', 'Still Life', 'Urban', 'Watercolor', 'Small Format'],
    },
    {
      slug: 'retail',
      title: 'Retail',
      description: 'Distinctive paintings that enhance the shopping experience.',
      count: '480+',
      popularSearches: ['Bold Colors', 'Geometric', 'Contemporary', 'Large Scale', 'Abstract'],
    },
    {
      slug: 'spa',
      title: 'Spa',
      description: 'Serene, mindful artwork for wellness spaces.',
      count: '560+',
      popularSearches: ['Nature', 'Soft Abstract', 'Zen', 'Watercolor', 'Floral'],
    },
  ],
  styles: [
    {
      slug: 'abstract',
      title: 'Abstract',
      description: 'Expressive, emotion-driven paintings that transcend literal representation.',
      count: '3,200+',
      popularSearches: ['Abstract Expressionism', 'Color Field', 'Gestural', 'Fluid Art', 'Minimalist Abstract'],
    },
    {
      slug: 'minimalist',
      title: 'Minimalist',
      description: 'Restrained compositions that speak through form and negative space.',
      count: '1,800+',
      popularSearches: ['Monochrome', 'Line Art', 'Geometric Minimal', 'Scandinavian', 'White Space'],
    },
    {
      slug: 'contemporary',
      title: 'Contemporary',
      description: 'Modern paintings reflecting today\'s artistic conversation.',
      count: '2,600+',
      popularSearches: ['Neo-Expressionism', 'Street Art', 'Digital Mixed', 'Conceptual', 'New Realism'],
    },
    {
      slug: 'impressionism',
      title: 'Impressionism',
      description: 'Light-filled paintings that capture fleeting moments and atmosphere.',
      count: '1,400+',
      popularSearches: ['Plein Air', 'Post-Impressionist', 'Soft Brush', 'Garden Scene', 'Water Scene'],
    },
    {
      slug: 'geometric',
      title: 'Geometric',
      description: 'Precise, pattern-driven compositions with mathematical beauty.',
      count: '980+',
      popularSearches: ['Hard Edge', 'Op Art', 'Tessellation', 'Grid Work', 'Color Blocks'],
    },
    {
      slug: 'landscape',
      title: 'Landscape',
      description: 'Horizon, depth, and the natural world rendered in paint.',
      count: '2,100+',
      popularSearches: ['Mountain', 'Ocean', 'Forest', 'Desert', 'Countryside'],
    },
  ],
  mediums: [
    {
      slug: 'oil',
      title: 'Oil Painting',
      description: 'Rich, luminous works with deep color and lasting texture.',
      count: '4,100+',
      popularSearches: ['Oil on Canvas', 'Oil on Board', 'Thick Impasto', 'Alla Prima', 'Glazing Technique'],
    },
    {
      slug: 'watercolor',
      title: 'Watercolor',
      description: 'Translucent, fluid paintings with a light, ethereal quality.',
      count: '1,600+',
      popularSearches: ['Botanical', 'Landscape', 'Portrait', 'Abstract Watercolor', 'Loose Style'],
    },
    {
      slug: 'acrylic',
      title: 'Acrylic',
      description: 'Versatile, vibrant paintings with bold color and fast drying.',
      count: '2,800+',
      popularSearches: ['Pour Painting', 'Acrylic Abstract', 'Mixed Media', 'Flat Acrylic', 'Textured'],
    },
    {
      slug: 'mixed-media',
      title: 'Mixed Media',
      description: 'Layered, experimental works combining multiple materials.',
      count: '920+',
      popularSearches: ['Collage', 'Encaustic', 'Ink and Paint', 'Texture Work', 'Found Objects'],
    },
  ],
  subjects: [
    {
      slug: 'landscape',
      title: 'Landscape',
      description: 'The natural world — horizons, forests, skies, and water.',
      count: '3,400+',
      popularSearches: ['Mountain', 'Ocean', 'Forest', 'Desert Landscape', 'Rolling Hills'],
    },
    {
      slug: 'architecture',
      title: 'Architecture',
      description: 'Buildings, cities, and the built environment.',
      count: '1,100+',
      popularSearches: ['City Skyline', 'Interior', 'Bridge', 'Ruins', 'Modern Building'],
    },
    {
      slug: 'floral',
      title: 'Floral',
      description: 'Flowers and botanical subjects in every style and scale.',
      count: '2,200+',
      popularSearches: ['Roses', 'Wildflowers', 'Botanical Print', 'Peonies', 'Abstract Floral'],
    },
    {
      slug: 'portrait',
      title: 'Portrait',
      description: 'The human face and figure — from realism to abstraction.',
      count: '1,800+',
      popularSearches: ['Figure Study', 'Contemporary Portrait', 'Abstract Face', 'Silhouette', 'Bust Study'],
    },
    {
      slug: 'still-life',
      title: 'Still Life',
      description: 'Objects, arrangements, and the quiet beauty of everyday things.',
      count: '1,300+',
      popularSearches: ['Fruit', 'Vessels', 'Books', 'Food', 'Flowers in Vase'],
    },
    {
      slug: 'nature',
      title: 'Nature',
      description: 'Animals, plants, and the broader natural world.',
      count: '2,600+',
      popularSearches: ['Birds', 'Trees', 'Ocean Life', 'Wildlife', 'Forest Floor'],
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

// Nav Discover items for dropdown + mobile drawer
export const DISCOVER_NAV_ITEMS = [
  { label: 'Spaces',   desc: 'Browse by room or environment',   href: '/spaces/office' },
  { label: 'Styles',   desc: 'Abstract, Minimalist, Realism…',  href: '/styles/abstract' },
  { label: 'Mediums',  desc: 'Oil, Watercolor, Acrylic…',       href: '/mediums/oil' },
  { label: 'Subjects', desc: 'Landscape, Portrait, Floral…',    href: '/subjects/landscape' },
]
