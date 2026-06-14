'use client'

import { useState } from 'react'
import Img from './Img'

export default function Hero({ onGallery }: { onGallery: () => void }) {
  const [tab, setTab] = useState<'artworks' | 'collections' | 'spaces'>('artworks')
  const [q, setQ] = useState('')

  const placeholders = {
    artworks: 'Search 50,000+ artworks…',
    collections: 'Browse curated collections…',
    spaces: 'Find art for your space…',
  }

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Art that belongs<br />in your world.</h1>
        <p className="hero-sub">
          Discover 50,000+ contemporary paintings curated by AI — made for homes,<br />
          offices, and spaces of intention.
        </p>
        <div className="hero-tabs">
          {(['artworks', 'collections', 'spaces'] as const).map(t => (
            <button key={t} className={`hero-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'artworks' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}
              {t === 'collections' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"/></svg>}
              {t === 'spaces' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <form className="hero-search" onSubmit={e => { e.preventDefault(); onGallery() }}>
          <div className="hero-search-inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="hero-search-input" placeholder={placeholders[tab]} value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <button type="submit" className="hero-search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </form>
        <div className="hero-tags">
          <span className="hero-tags-label">Popular:</span>
          {['Abstract', 'Landscape', 'Botanical', 'Portrait', 'Geometric'].map(t => (
            <button key={t} className="hero-tag" onClick={() => { setQ(t); onGallery() }}>{t}</button>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-art-card">
          <Img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80" alt="Featured artwork" />
          <div className="hero-art-credit">
            <img className="hero-art-avatar loaded" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80" alt="Artist" />
            <div>
              <div className="hero-art-name">Elena Marcov</div>
              <div className="hero-art-style">Abstract Expressionism</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
