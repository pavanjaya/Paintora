import { STYLES } from '@/lib/data'

const MEDIUMS = [
  { name: 'Oil Painting', tag: '5,400+ works' },
  { name: 'Acrylic', tag: '4,200+ works' },
  { name: 'Watercolor', tag: '3,100+ works' },
  { name: 'Mixed Media', tag: '2,400+ works' },
  { name: 'Ink', tag: '1,800+ works' },
  { name: 'Charcoal', tag: '1,200+ works' },
  { name: 'Digital Painting', tag: '2,900+ works' },
]

const SUBJECTS = [
  { name: 'Landscape', tag: '6,200+ works' },
  { name: 'Architecture', tag: '3,400+ works' },
  { name: 'Floral', tag: '2,800+ works' },
  { name: 'Nature', tag: '4,100+ works' },
  { name: 'Portrait', tag: '2,200+ works' },
  { name: 'Animals', tag: '1,600+ works' },
  { name: 'Cityscape', tag: '2,900+ works' },
]

function ArtCol({ title, items, onExplore }: { title: string; items: { name: string; tag: string }[]; onExplore: () => void }) {
  return (
    <div>
      <h3 style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} className="style-card" onClick={onExplore} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="style-card-info" style={{ flex: 1 }}>
              <div className="style-name">{item.name}</div>
              <span className="style-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all" onClick={onExplore} style={{ marginTop: '1rem', background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>
        Explore more
      </button>
    </div>
  )
}

export default function ExploreArt({ onGallery, onStylesPage }: { onGallery: () => void; onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Explore art.</h2>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 6 }}>Discover paintings through artistic language, medium, and subject.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '1.5rem' }}>
          <ArtCol title="Styles" items={STYLES.slice(0, 7).map(s => ({ name: s.name, tag: s.tag }))} onExplore={onStylesPage} />
          <ArtCol title="Mediums" items={MEDIUMS} onExplore={onGallery} />
          <ArtCol title="Subjects" items={SUBJECTS} onExplore={onGallery} />
        </div>
      </div>
    </div>
  )
}
