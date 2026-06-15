'use client'

import Link from 'next/link'

const FLOATERS = [
  { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', top: '6%',  left: '1%',   right: undefined, width: 180, rotate: '-7deg'  },
  { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', top: '50%', left: '4%',   right: undefined, width: 150, rotate: '6deg'   },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', top: '18%', left: '17%',  right: undefined, width: 120, rotate: '-3deg'  },
  { src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',    top: '4%',  left: undefined, right: '1%',  width: 170, rotate: '8deg'   },
  { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', top: '52%', left: undefined, right: '4%',  width: 155, rotate: '-6deg'  },
  { src: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=600&q=80', top: '20%', left: undefined, right: '17%', width: 115, rotate: '4deg'   },
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
