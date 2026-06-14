'use client'

import Link from 'next/link'
import { FEED_ARTWORKS } from '@/lib/data'

const COLLAGE = FEED_ARTWORKS.slice(0, 6)

export default function FinalCTA({ onSignup, onGallery }: { onSignup: () => void; onGallery: () => void }) {
  return (
    <div className="fcta-outer">
      {/* Painting collage grid */}
      <div className="fcta-collage" aria-hidden="true">
        {COLLAGE.map((art, i) => (
          <div key={art.id} className={`fcta-col-img fcta-col-img-${i}`}>
            <img src={art.img} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
        <div className="fcta-overlay" />
      </div>

      {/* Content on top */}
      <div className="fcta-content">
        <div className="fcta-eyebrow">Free to explore</div>
        <h2 className="fcta-title">Art for every space,<br />at every scale.</h2>
        <p className="fcta-sub">
          Discover thousands of curated paintings for homes, offices, and hospitality spaces.
        </p>
        <div className="fcta-actions">
          <button className="fcta-btn-primary" onClick={onSignup}>Start for free</button>
          <button className="fcta-btn-ghost" onClick={onGallery}>Browse paintings</button>
        </div>
      </div>
    </div>
  )
}
