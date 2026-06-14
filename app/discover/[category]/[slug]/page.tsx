import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDiscoverItem, CATEGORY_LABELS, type DiscoverCategory } from '@/lib/discover-data'
import DiscoverPage from '@/components/DiscoverPage'

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const item = getDiscoverItem(category as DiscoverCategory, slug)
  if (!item) return { title: 'Paintora' }
  const cat = CATEGORY_LABELS[category as DiscoverCategory] ?? category
  return {
    title: `${item.title} Paintings — Discover ${cat} | Paintora`,
    description: item.description,
    openGraph: {
      title: `${item.title} — Paintora`,
      description: item.description,
      images: [item.heroImg],
    },
  }
}

export default async function Page({ params }: Props) {
  const { category, slug } = await params
  const item = getDiscoverItem(category as DiscoverCategory, slug)
  if (!item) notFound()
  return <DiscoverPage item={item} category={category as DiscoverCategory} slug={slug} />
}
