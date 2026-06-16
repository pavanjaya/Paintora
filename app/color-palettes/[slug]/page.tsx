import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getColorPalettePage } from '@/lib/browse-data'
import BrowsePage from '@/components/BrowsePage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getColorPalettePage(slug)
  if (!data) return { title: 'Paintora' }
  return {
    title: `${data.title} Paintings — Browse by Color | Paintora`,
    description: data.description,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const data = getColorPalettePage(slug)
  if (!data) notFound()
  return <BrowsePage data={data} category="color-palettes" />
}
