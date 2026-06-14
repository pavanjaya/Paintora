import type { Metadata } from 'next'
import PaintingDetail from '@/components/PaintingDetail'
import { FEED_ARTWORKS, GALLERY_IMGS } from '@/lib/data'

type Props = { params: Promise<{ id: string }> }

const ALL = [...FEED_ARTWORKS, ...GALLERY_IMGS]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const art = ALL.find(a => String(a.id) === id)
  if (!art) return { title: 'Painting | Paintora' }
  return {
    title: `${art.name} — ${art.style} | Paintora`,
    description: `${art.name} · ${art.medium ?? ''} · ${art.dim ?? ''}`,
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <PaintingDetail id={id} />
}
