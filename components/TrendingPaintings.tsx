import Link from 'next/link'
import Img from './Img'
import { FEED_ARTWORKS, type ArtItem } from '@/lib/data'

export default function TrendingPaintings({ onPreview, onGallery }: {
  onPreview: (idx: number, list: ArtItem[]) => void
  onGallery: () => void
}) {
  const paintings = FEED_ARTWORKS.slice(0, 8)

  return (
    <section id="trending">
      <div className="section-head">
        <div>
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Trending paintings.</h2>
        </div>
        <Link href="/trending" className="view-all" style={{ background: 'none', border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', textDecoration: 'none' }}>View all</Link>
      </div>
      <div className="feed-grid">
        {paintings.map((a, i) => (
          <Link key={a.id} href={`/paintings/${a.id}`} className="artwork-card" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="artwork-img-wrap">
              <Img src={a.img} alt={a.name} />
              <div className="artwork-overlay">
                <div className="artwork-overlay-top">
                  <button className="artwork-save-btn" onClick={e => { e.preventDefault(); e.stopPropagation() }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
                <div className="artwork-overlay-bottom">
                  <div className="artwork-overlay-info">
                    <span className="artwork-overlay-name">{a.name}</span>
                    <span className="artwork-overlay-style">{a.style}</span>
                  </div>
                  <span className="artwork-view-btn">View</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
