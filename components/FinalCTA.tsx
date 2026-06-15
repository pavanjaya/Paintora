'use client'

import Link from 'next/link'

const FLOATERS = [
  { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80', top: '10%', left: '2%',   right: undefined, width: 120, rotate: '-7deg' },
  { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80', top: '55%', left: '6%',   right: undefined, width: 100, rotate: '5deg'  },
  { src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80',    top: '25%', left: '19%',  right: undefined, width: 90,  rotate: '-3deg' },
  { src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80', top: '8%',  left: undefined, right: '2%',  width: 115, rotate: '8deg'  },
  { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', top: '55%', left: undefined, right: '5%',  width: 105, rotate: '-5deg' },
  { src: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400&q=80', top: '24%', left: undefined, right: '18%', width: 88,  rotate: '4deg'  },
]

export default function FinalCTA({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="fcta-outer">
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="fcta-floater"
          style={{ top: f.top, left: f.left, right: f.right, width: f.width, transform: `rotate(${f.rotate})` }}
        >
          <img src={f.src} alt="" loading="lazy" decoding="async" onLoad={e => (e.target as HTMLImageElement).style.opacity = '1'} style={{ opacity: 0, transition: 'opacity 0.4s' }} />
        </div>
      ))}

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
