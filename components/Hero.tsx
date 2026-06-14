'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Img from './Img'

const SUGGESTIONS = [
  { label: 'Living Room', href: '/spaces/living-room' },
  { label: 'Law Office',  href: '/spaces/office' },
  { label: 'Abstract',    href: '/styles/abstract' },
  { label: 'Hotel Lobby', href: '/spaces/hotel' },
  { label: 'Minimalist',  href: '/styles/minimalist' },
]

export default function Hero({ onGallery }: { onGallery: () => void }) {
  const router = useRouter()
  const [q, setQ] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Find the perfect painting<br />for every space.</h1>
        <p className="hero-sub">
          Curated contemporary paintings for homes, offices, hospitality, and thoughtfully designed interiors.
        </p>
        <form className="hero-search" onSubmit={handleSearch}>
          <div className="hero-search-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="hero-search-input" placeholder="Search by space, style, collection or subject..." value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <button type="submit" className="hero-search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </form>
        <div className="hero-tags">
          <span className="hero-tags-label">Popular:</span>
          {SUGGESTIONS.map(s => (
            <Link key={s.label} className="hero-tag" href={s.href}>{s.label}</Link>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-art-card">
          <Img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80" alt="Featured artwork" />
          <div className="hero-art-credit">
            <div className="hero-art-thumb">
              <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=64&q=80" alt="" className="loaded" loading="lazy" decoding="async" />
            </div>
            <div>
              <div className="hero-art-name">Abstract No. 7</div>
              <div className="hero-art-style">Featured Artwork</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
