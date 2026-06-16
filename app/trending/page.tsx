import type { Metadata } from 'next'
import BrowsePage from '@/components/BrowsePage'
import type { BrowsePageData } from '@/lib/browse-data'

export const metadata: Metadata = {
  title: 'Trending Paintings — Paintora',
  description: 'Explore the most popular paintings on Paintora right now.',
}

const TRENDING_DATA: BrowsePageData = {
  title: 'Trending',
  description: 'The most popular paintings on Paintora right now.',
  count: '12,400+',
  popularSearches: ['Abstract', 'Minimalist', 'Landscape', 'Portrait', 'Floral', 'Geometric'],
}

export default function Page() {
  return <BrowsePage data={TRENDING_DATA} category="spaces" />
}
