import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/PageTransition'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Paintora — Contemporary Paintings for Every Space', template: '%s | Paintora' },
  description: 'Discover and buy curated contemporary paintings for homes, offices, hospitality, and thoughtfully designed interiors.',
  keywords: ['paintings', 'contemporary art', 'buy art online', 'interior art', 'curated paintings', 'wall art India'],
  authors: [{ name: 'Paintora' }],
  metadataBase: new URL('https://paintora.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Paintora',
    title: 'Paintora — Contemporary Paintings for Every Space',
    description: 'Discover and buy curated contemporary paintings for homes, offices, and thoughtfully designed interiors.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Paintora' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paintora — Contemporary Paintings for Every Space',
    description: 'Discover and buy curated contemporary paintings for every space.',
    images: ['/og-image.png'],
  },
  themeColor: '#191947',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={jakarta.variable}><PageTransition>{children}</PageTransition></body>
    </html>
  )
}