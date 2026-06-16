import type { Metadata } from 'next'
import BrowsePage from '@/components/BrowsePage'
import type { BrowsePageData } from '@/lib/browse-data'

export const metadata: Metadata = {
  title: 'Trending Paintings — Paintora',
  description: 'Explore the most popular paintings on Paintora right now.',
}

const TRENDING_DATA: BrowsePageData = {
  slug: 'trending',
  title: 'Trending',
  description: 'The most popular paintings on Paintora right now.',
  count: '12,400+',
  relatedLinks: [
    { label: 'Abstract', href: '/styles/abstract' },
    { label: 'Minimalist', href: '/styles/minimalist' },
    { label: 'Landscape', href: '/subjects/landscape' },
    { label: 'Floral', href: '/subjects/floral' },
    { label: 'Geometric', href: '/styles/geometric' },
  ],
}

export default function Page() {
  return <BrowsePage data={TRENDING_DATA} category="spaces" />
}
