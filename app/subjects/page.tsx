import type { Metadata } from 'next'
import CategoryIndexPage from '@/components/CategoryIndexPage'

export const metadata: Metadata = {
  title: 'Browse by Subject — Paintora',
  description: 'Browse paintings by subject — Landscape, Architecture, Floral, Portrait, Still Life, and Nature.',
}

const SUBJECT_IMAGES: Record<string, string> = {
  'landscape':     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop',
  'architecture':  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fit=crop',
  'floral':        'https://images.unsplash.com/photo-1490750967868-88df5691cc09?w=800&q=80&fit=crop',
  'portrait':      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&fit=crop',
  'still-life':    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&fit=crop',
  'nature':        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop',
}

export default function Page() {
  return (
    <CategoryIndexPage
      category="subjects"
      title="Browse by subject."
      subtitle="Landscapes, portraits, florals and more — find paintings that tell the story you want to live with."
      images={SUBJECT_IMAGES}
      basePath="/subjects"
    />
  )
}
