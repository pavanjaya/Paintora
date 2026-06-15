import type { Metadata } from 'next'
import PaintingDetail from '@/components/PaintingDetail'
import { createClient } from '@supabase/supabase-js'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase
      .from('artworks')
      .select('title, style:styles(name), medium:mediums(name), dimensions')
      .eq('id', id)
      .single()
    if (data) {
      const title = (data as any).title
      const style = (data as any).style?.name ?? 'Art'
      const medium = (data as any).medium?.name ?? ''
      const dim = (data as any).dimensions ?? ''
      return {
        title: `${title} — ${style} | Paintora`,
        description: `${title} · ${medium} · ${dim}`.replace(/ · +$/, '').replace(/ ·$/, ''),
      }
    }
  } catch {}
  return { title: 'Painting | Paintora' }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <PaintingDetail id={id} />
}
