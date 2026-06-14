import BrowsePage from '@/components/BrowsePage'

export const metadata = {
  title: 'Trending Paintings — Paintora',
  description: 'Discover the most popular paintings right now. Curated by views, saves, and editorial picks.',
}

const TRENDING_DATA = {
  slug: 'trending',
  title: 'Trending',
  description: 'The most loved paintings right now — curated by views, saves, and editorial picks.',
  count: '4,800+',
  popularSearches: ['Abstract', 'Large Format', 'Minimalist', 'Oil on Canvas', 'Warm Tones', 'Botanical'],
}

export default function Page() {
  return <BrowsePage data={TRENDING_DATA} category="styles" />
}
