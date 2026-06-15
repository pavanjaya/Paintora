'use client'

import Link from 'next/link'

export default function FinalCTA({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="fcta-outer">
      <img
        src="/paintings/painting-2.jpg"
        alt=""
        className="fcta-bg"
        loading="lazy"
        decoding="async"
      />
      <div className="fcta-overlay" />
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
