'use client'

import Link from 'next/link'

const FLOATERS = [
  { src: '/paintings/painting-3.png',  style: { top: '8%',  left: '2%',  width: 160, rotate: '-6deg'  } },
  { src: '/paintings/painting-1.png',  style: { top: '55%', left: '5%',  width: 130, rotate: '5deg'   } },
  { src: '/paintings/painting-2.jpg',  style: { top: '20%', left: '18%', width: 110, rotate: '-3deg'  } },
  { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80', style: { top: '5%',  right: '3%',  width: 150, rotate: '7deg'   } },
  { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80', style: { top: '52%', right: '6%',  width: 140, rotate: '-5deg'  } },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', style: { top: '22%', right: '19%', width: 100, rotate: '4deg'   } },
]

export default function FinalCTA({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="fcta-outer">
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="fcta-floater"
          style={{
            top: f.style.top,
            left: 'left' in f.style ? f.style.left : undefined,
            right: 'right' in f.style ? f.style.right : undefined,
            width: f.style.width,
            transform: `rotate(${f.style.rotate})`,
          }}
        >
          <img src={f.src} alt="" loading="lazy" decoding="async" />
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
