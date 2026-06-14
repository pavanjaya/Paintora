import type { Metadata } from 'next'
import './globals.css'
import PageTransition from '@/components/PageTransition'
import ProgressBar from '@/components/ProgressBar'

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
      <body><ProgressBar /><PageTransition>{children}</PageTransition></body>
    </html>
  )
}