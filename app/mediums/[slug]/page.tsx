import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBrowsePage } from '@/lib/browse-data'
import BrowsePage from '@/components/BrowsePage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getBrowsePage('mediums', slug)
  if (!data) return { title: 'Paintora' }
  return {
    title: `${data.title} — Browse by Medium | Paintora`,
    description: data.description,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const data = getBrowsePage('mediums', slug)
  if (!data) notFound()
  return <BrowsePage data={data} category="mediums" />
}
