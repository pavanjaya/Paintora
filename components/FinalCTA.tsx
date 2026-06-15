'use client'

import Link from 'next/link'

const STRIP = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
  'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80',
]

const TRACK = [...STRIP, ...STRIP]

export default function FinalCTA({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="fcta-outer">
      {/* Scrolling filmstrip */}
      <div className="fcta-strip-wrap">
        <div className="fcta-strip">
          {TRACK.map((src, i) => (
            <div key={i} className="fcta-strip-img">
              <img src={src} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="fcta-content">
        <div className="fcta-eyebrow">Free to explore</div>
        <h2 className="fcta-title">Art for every space,<br />at every scale.</h2>
        <p className="fcta-sub">
          Discover thousands of curated paintings for homes, offices, and hospitality spaces.
        </p>
        <div className="fcta-actions">
          <button className="fcta-btn-primary" onClick={onSignup}>Start for free</button>
          <Link href="/discover" className="fcta-btn-ghost" style={{ textDecoration: 'none' }}>Browse paintings</Link>
        </div>
      </div>
    </div>
  )
}
