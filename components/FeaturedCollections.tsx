import Link from 'next/link'
import Img from './Img'

const FEATURED = [
  { title: 'Luxury Living',      slug: 'living-room', base: 'spaces', count: '340+ paintings', img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80&fit=crop' },
  { title: 'Executive Office',   slug: 'office',      base: 'spaces', count: '280+ paintings', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop' },
  { title: 'Earth Tones',        slug: 'abstract',    base: 'styles', count: '420+ paintings', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80&fit=crop' },
  { title: 'Scandinavian Calm',  slug: 'minimalist',  base: 'styles', count: '190+ paintings', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d75f?w=900&q=80&fit=crop' },
  { title: 'Bold Abstracts',     slug: 'abstract',    base: 'styles', count: '510+ paintings', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&fit=crop' },
  { title: 'Nature & Botanical', slug: 'floral',      base: 'subjects', count: '360+ paintings', img: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=900&q=80&fit=crop' },
]

export default function FeaturedCollections() {
  return (
    <section id="collections">
      <div className="section-head">
        <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Featured collections.</h2>
        <Link href="/collections" className="view-all">View all</Link>
      </div>
      <div className="collections-grid">
        {FEATURED.map((c, i) => (
          <Link key={i} href={`/${c.base}/${c.slug}`} className="collection-card" style={{ textDecoration: 'none' }}>
            <Img src={c.img} alt={c.title} />
            <div className="col-overlay">
              <div>
                <div className="col-title">{c.title}</div>
                <div className="col-name">{c.count}</div>
              </div>
              <div className="col-footer">
                <span className="col-count">Explore</span>
                <span className="col-arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
