import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CollectionDetailPage from '@/components/CollectionDetailPage'
import type { CollectionData } from '@/components/CollectionDetailPage'

const COLLECTIONS: Record<string, CollectionData> = {
  'echoes-of-the-earth': {
    slug: 'echoes-of-the-earth',
    emoji: '🌿',
    title: 'Echoes of the Earth',
    description: 'Natural landscapes, organic textures, and earthy palettes.',
    about: 'A celebration of the natural world — from sweeping landscapes to intimate details of bark, stone, and soil. Each painting in this collection carries the quiet power of nature rendered in paint.',
    count: 28,
    tag: 'Nature',
  },
  'spaces-that-feel-like-home': {
    slug: 'spaces-that-feel-like-home',
    emoji: '🏡',
    title: 'Spaces That Feel Like Home',
    description: 'Warm, inviting artwork for contemporary interiors.',
    about: 'Art that makes a room feel lived-in and loved. These paintings bring softness, warmth, and a sense of belonging — perfect for living rooms, entryways, and anywhere you want to feel at ease.',
    count: 24,
    tag: 'Interior',
  },
  'harmony-positive-living': {
    slug: 'harmony-positive-living',
    emoji: '🧭',
    title: 'Art for Harmony & Positive Living',
    description: 'A Vastu-inspired selection that brings balance and energy to your space.',
    about: 'Rooted in the principles of Vastu Shastra, this collection features artwork chosen for its positive energy, balanced composition, and uplifting mood — bringing harmony to every corner of your home.',
    count: 22,
    tag: 'Vastu',
  },
  'quiet-luxury': {
    slug: 'quiet-luxury',
    emoji: '✨',
    title: 'The Quiet Luxury Collection',
    description: 'Elegant, understated paintings for timeless interiors.',
    about: 'Luxury that whispers rather than shouts. These works are refined, restrained, and deeply considered — art that rewards a second look and ages beautifully alongside thoughtfully designed interiors.',
    count: 20,
    tag: 'Luxury',
  },
  'beyond-the-horizon': {
    slug: 'beyond-the-horizon',
    emoji: '🌊',
    title: 'Beyond the Horizon',
    description: 'Oceans, skies, serenity, and expansive landscapes.',
    about: 'Space to breathe. This collection draws together paintings of vast skies, open water, and sweeping horizons — art that opens up a room and invites the eye to wander and rest.',
    count: 26,
    tag: 'Landscape',
  },
  'modern-forms': {
    slug: 'modern-forms',
    emoji: '🎨',
    title: 'Modern Forms & Gentle Lines',
    description: 'Contemporary and geometric expressions for modern spaces.',
    about: 'Clean, considered, and quietly bold. These paintings play with shape, line, and structure in ways that feel both rigorous and expressive — ideal for modern and minimalist interiors.',
    count: 30,
    tag: 'Modern',
  },
  'calm-corners': {
    slug: 'calm-corners',
    emoji: '🤍',
    title: 'Calm Corners & Peaceful Walls',
    description: 'Minimal and meditative artwork for quiet spaces.',
    about: 'For the walls that hold your quietest moments. Soft, meditative, and unhurried — these paintings are chosen for their ability to bring stillness into a room without saying a word.',
    count: 25,
    tag: 'Minimal',
  },
  'curated-by-paintora': {
    slug: 'curated-by-paintora',
    emoji: '⭐',
    title: 'Curated by Paintora',
    description: 'Our handpicked selection of the most exceptional paintings.',
    about: "The best of what we carry — handpicked by our editorial team for quality, originality, and lasting appeal. If you're not sure where to start, start here.",
    count: 32,
    tag: 'Curated',
  },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const col = COLLECTIONS[slug]
  if (!col) return { title: 'Paintora' }
  return {
    title: `${col.title} — Collection | Paintora`,
    description: col.description,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const col = COLLECTIONS[slug]
  if (!col) notFound()
  return <CollectionDetailPage data={col} />
}
