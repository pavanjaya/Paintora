import type { Metadata } from 'next'
import CategoryIndexPage from '@/components/CategoryIndexPage'

export const metadata: Metadata = {
  title: 'Browse by Medium — Paintora',
  description: 'Browse paintings by medium — Oil, Watercolor, Acrylic, and Mixed Media.',
}

const MEDIUM_IMAGES: Record<string, string> = {
  'oil':         'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80&fit=crop',
  'watercolor':  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80&fit=crop',
  'acrylic':     'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80&fit=crop',
  'mixed-media': 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80&fit=crop',
}

export default function Page() {
  return (
    <CategoryIndexPage
      category="mediums"
      title="Browse by medium."
      subtitle="Each medium has its own voice — discover the texture, technique, and feel that resonates with you."
      images={MEDIUM_IMAGES}
      basePath="/mediums"
    />
  )
}
