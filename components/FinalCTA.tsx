export default function FinalCTA({ onSignup, onGallery }: { onSignup: () => void; onGallery: () => void }) {
  return (
    <div className="licensing-outer">
      <div className="licensing-label">Start for free</div>
      <h2 className="licensing-title">Art for every space,<br />at every scale.</h2>
      <p className="licensing-sub">
        Whether you&apos;re styling a home office or designing a hotel lobby, Paintora helps you discover curated paintings for thoughtful interiors.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-dark" onClick={onGallery} style={{ fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none' }}>
          Start Discovering
        </button>
        <button onClick={onGallery} style={{ fontFamily: 'var(--sans)', cursor: 'pointer', background: 'none', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 24, padding: '12px 28px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'border-color 0.2s' }}>
          Browse Collections
        </button>
      </div>
    </div>
  )
}
