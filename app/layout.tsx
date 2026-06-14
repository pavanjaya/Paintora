import type { Metadata } from 'next'
import './globals.css'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Paintora — Contemporary AI-Curated Paintings',
  description: 'Curated contemporary paintings for modern homes, offices, and spaces of intention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><PageTransition>{children}</PageTransition></body>
    </html>
  )
}