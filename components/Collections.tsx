import Link from 'next/link'
import Img from './Img'
import { COLLECTIONS } from '@/lib/data'

export default function Collections() {
  return (
    <section id="collections">
      <div className="section-head">
        <div>
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Most popular paintings</h2>
        </div>
        <Link href="/browse" className="view-all" style={{ background: 'none', border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', textDecoration: 'none' }}>View all</Link>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map((c, i) => (
          <Link key={i} href="/browse" className="collection-card" style={{ textDecoration: 'none' }}>
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
          </Link>
        ))}
      </div>
    </section>
  )
}
