import Img from './Img'
import { COLLECTIONS } from '@/lib/data'

const FEATURED = [
  {
    title: 'Luxury Living',
    name: '340+ paintings',
    img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80&fit=crop',
  },
  {
    title: 'Executive Office',
    name: '280+ paintings',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
  },
  {
    title: 'Earth Tones',
    name: '420+ paintings',
    img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80&fit=crop',
  },
  {
    title: 'Scandinavian Calm',
    name: '190+ paintings',
    img: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d75f?w=900&q=80&fit=crop',
  },
  {
    title: 'Bold Abstracts',
    name: '510+ paintings',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&fit=crop',
  },
  {
    title: 'Nature & Botanical',
    name: '360+ paintings',
    img: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=900&q=80&fit=crop',
  },
]

export default function FeaturedCollections({ onGallery }: { onGallery: () => void }) {
  return (
    <section id="collections">
      <div className="section-head">
        <div>
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Featured collections.</h2>
        </div>
        <button className="view-all" onClick={onGallery} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all</button>
      </div>
      <div className="collections-grid">
        {FEATURED.map((c, i) => (
          <div key={i} className="collection-card" onClick={onGallery}>
            <Img src={c.img} alt={c.title} />
            <div className="col-overlay">
              <div>
                <div className="col-title">{c.title}</div>
                <div className="col-name">{c.name}</div>
              </div>
              <div className="col-footer">
                <span className="col-count">Explore</span>
                <span className="col-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
