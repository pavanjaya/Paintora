export default function FinalCTA({ onSignup, onGallery }: { onSignup: () => void; onGallery: () => void }) {
  return (
    <div className="licensing-outer">
      <div className="licensing-label">Start for free</div>
      <h2 className="licensing-title">Art for every space,<br />at every scale.</h2>
      <p className="licensing-sub">
        Whether you&apos;re styling a home office or designing a hotel lobby, Paintora helps you discover curated paintings for thoughtful interiors.
      </p>
      <button className="btn-dark" onClick={onGallery} style={{ fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none' }}>
        Start discovering
      </button>
    </div>
  )
}
