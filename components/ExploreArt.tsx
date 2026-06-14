import { STYLES } from '@/lib/data'

const MEDIUMS = [
  { name: 'Oil Painting', tag: '5,400+ works' },
  { name: 'Acrylic', tag: '4,200+ works' },
  { name: 'Watercolor', tag: '3,100+ works' },
  { name: 'Mixed Media', tag: '2,400+ works' },
  { name: 'Ink', tag: '1,800+ works' },
  { name: 'Charcoal', tag: '1,200+ works' },
  { name: 'Digital Painting', tag: '2,900+ works' },
  { name: 'Gouache', tag: '980+ works' },
]

const SUBJECTS = [
  { name: 'Landscape', tag: '6,200+ works' },
  { name: 'Architecture', tag: '3,400+ works' },
  { name: 'Floral', tag: '2,800+ works' },
  { name: 'Nature', tag: '4,100+ works' },
  { name: 'Portrait', tag: '2,200+ works' },
  { name: 'Spiritual', tag: '1,600+ works' },
  { name: 'Cityscape', tag: '2,900+ works' },
  { name: 'Still Life', tag: '1,400+ works' },
]

export default function ExploreArt({ onGallery, onStylesPage }: { onGallery: () => void; onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Explore art.</h2>
          </div>
          <button className="view-all" onClick={onStylesPage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all styles</button>
        </div>
        <div className="styles-scroll">
          {STYLES.map((s, i) => (
            <div key={i} className="style-card" onClick={onStylesPage}>
              <div className="style-card-info">
                <div className="style-name">{s.name}</div>
                <span className="style-tag">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
