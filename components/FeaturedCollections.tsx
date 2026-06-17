import Link from 'next/link'
import Img from './Img'

const FEATURED = [
  { title: 'Echoes of the Earth',         href: '/collections/echoes-of-the-earth',       count: '28 paintings', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80&fit=crop' },
  { title: 'Spaces That Feel Like Home',  href: '/collections/spaces-that-feel-like-home', count: '24 paintings', img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80&fit=crop' },
  { title: 'The Quiet Luxury Collection', href: '/collections/quiet-luxury',               count: '20 paintings', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d75f?w=900&q=80&fit=crop' },
  { title: 'Beyond the Horizon',          href: '/collections/beyond-the-horizon',         count: '26 paintings', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&fit=crop' },
  { title: 'Modern Forms & Gentle Lines', href: '/collections/modern-forms',               count: '30 paintings', img: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=900&q=80&fit=crop' },
  { title: 'Curated by Paintora',         href: '/collections/curated-by-paintora',        count: '32 paintings', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop' },
]

export default function FeaturedCollections() {
  return (
    <section id="collections">
      <div className="section-head">
        <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Curated collections.</h2>
        <Link href="/collections" className="view-all">View all</Link>
      </div>
      <div className="collections-grid">
        {FEATURED.map((c, i) => (
          <Link key={i} href={c.href} className="collection-card" style={{ textDecoration: 'none' }}>
            <Img src={c.img} alt={c.title} />
            <div className="col-overlay">
              <div>
                <div className="col-title">{c.title}</div>
                <div className="col-name">{c.count}</div>
              </div>
              <div className="col-footer">
                <span className="col-arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
