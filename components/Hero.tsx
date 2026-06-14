'use client'

import { useState } from 'react'
import Img from './Img'

const SUGGESTIONS = ['Living Room', 'Law Office', 'Abstract', 'Hotel Lobby', 'Minimalist']

export default function Hero({ onGallery }: { onGallery: () => void }) {
  const [q, setQ] = useState('')

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Find the perfect painting<br />for every space.</h1>
        <p className="hero-sub">
          Curated contemporary paintings for homes, offices, hospitality, and thoughtfully designed interiors.
        </p>
        <form className="hero-search" onSubmit={e => { e.preventDefault(); onGallery() }}>
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
            <button key={s} className="hero-tag" onClick={() => onGallery()}>{s}</button>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn-dark" onClick={onGallery} style={{ fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none', fontSize: 14 }}>
            Start Discovering
          </button>
          <button onClick={onGallery} style={{ marginLeft: '1rem', fontFamily: 'var(--sans)', cursor: 'pointer', background: 'none', border: '1.5px solid var(--border)', borderRadius: 24, padding: '10px 22px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'border-color 0.2s' }}>
            Explore Collections
          </button>
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
