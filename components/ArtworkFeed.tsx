import Link from 'next/link'
import Img from './Img'
import { FEED_ARTWORKS, type ArtItem } from '@/lib/data'

export default function ArtworkFeed({ onPreview, onLogin }: {
  onPreview: (idx: number, list: ArtItem[]) => void
  onLogin: () => void
}) {
  return (
    <section id="artworks">
      <div className="section-head">
        <div>
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>A curated visual silence.</h2>
        </div>
        <Link href="/browse" className="view-all" style={{ background: 'none', border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', textDecoration: 'none' }}>View all</Link>
      </div>
      <div className="feed-grid">
        {FEED_ARTWORKS.map((a, i) => (
          <div key={a.id} className="artwork-card" onClick={() => onPreview(i, FEED_ARTWORKS)}>
            <div className="artwork-img-wrap">
              <Img src={a.img} alt={a.name} />
            </div>
            <div className="artwork-overlay">
              <div className="artwork-overlay-top">
                <button className="artwork-action" title="Save" onClick={e => { e.stopPropagation(); onLogin() }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
                <button className="artwork-action" title="Like" onClick={e => { e.stopPropagation(); onLogin() }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              <div className="artwork-overlay-bottom">
                <div className="artwork-overlay-info">
                  <span className="artwork-overlay-name">{a.name}</span>
                  <span className="artwork-overlay-style">{a.style}</span>
                </div>
                <button className="artwork-overlay-dl" onClick={e => { e.stopPropagation(); onLogin() }}>Free DL</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
