import type { Metadata } from 'next'
import CategoryIndexPage from '@/components/CategoryIndexPage'

export const metadata: Metadata = {
  title: 'Browse by Style — Paintora',
  description: 'Explore paintings by artistic style — Abstract, Minimalist, Contemporary, Impressionism, Geometric, and Landscape.',
}

const STYLE_IMAGES: Record<string, string> = {
  'abstract':      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80&fit=crop',
  'minimalist':    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop',
  'contemporary':  'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80&fit=crop',
  'impressionism': 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80&fit=crop',
  'geometric':     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
  'landscape':     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop',
}

export default function Page() {
  return (
    <CategoryIndexPage
      category="styles"
      title="Browse by style."
      subtitle="From bold abstract to quiet minimalism — find the aesthetic that speaks to your space."
      images={STYLE_IMAGES}
      basePath="/styles"
    />
  )
}
