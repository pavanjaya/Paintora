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
        <button className="view-all" onClick={onGallery} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all</button>
      </div>
      <div className="feed-grid">
        {paintings.map((a, i) => (
          <div key={a.id} className="artwork-card" onClick={() => onPreview(i, paintings)}>
            <div className="artwork-img-wrap">
              <Img src={a.img} alt={a.name} />
              <div className="artwork-overlay">
                <div className="artwork-overlay-top">
                  <button className="artwork-action" onClick={e => e.stopPropagation()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>
                </div>
                <div className="artwork-overlay-bottom">
                  <div className="artwork-overlay-info">
                    <span className="artwork-overlay-name">{a.name}</span>
                    <span className="artwork-overlay-style">{a.style}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
