import Img from './Img'
import { COLLECTIONS } from '@/lib/data'

export default function Collections({ onGallery }: { onGallery: () => void }) {
  return (
    <section id="collections">
      <div className="section-head">
        <div>
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Most popular paintings</h2>
        </div>
        <button className="view-all" onClick={onGallery} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all</button>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map((c, i) => (
          <div key={i} className="collection-card" onClick={onGallery}>
            <Img src={c.img} alt={c.title} />
            <div className="col-overlay">
              <div>
                <div className="col-title">{c.title}</div>
                <div className="col-name">{c.name}</div>
              </div>
              <div className="col-footer">
                <span className="col-count">{c.count}</span>
                <span className="col-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
