'use client'

import Link from 'next/link'

const COLLAGE = [
  'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
  'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
  'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
  'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
  'https://images.pexels.com/photos/1070536/pexels-photo-1070536.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
  'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
]

export default function FinalCTA({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="fcta-outer">
      {/* Painting collage grid */}
      <div className="fcta-collage" aria-hidden="true">
        {COLLAGE.map((src, i) => (
          <div key={i} className={`fcta-col-img fcta-col-img-${i}`}>
            <img src={src} alt="" loading="lazy" decoding="async" />
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
          <Link href="/trending" className="fcta-btn-ghost" style={{ textDecoration: 'none' }}>Browse paintings</Link>
        </div>
      </div>
    </div>
  )
}
