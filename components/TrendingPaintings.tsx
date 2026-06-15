'use client'

import Link from 'next/link'
import Img from './Img'
import { FEED_ARTWORKS, type ArtItem } from '@/lib/data'

export default function TrendingPaintings({ artworks, onPreview, onGallery, savedIds, onToggleSave }: {
  artworks?: ArtItem[]
  onPreview: (idx: number, list: ArtItem[]) => void
  onGallery: () => void
  savedIds?: Set<string>
  onToggleSave?: (id: string) => void
}) {
  const paintings = (artworks ?? FEED_ARTWORKS).slice(0, 8)
  const isLoading = !artworks

  return (
    <section id="trending">
      <div className="section-head">
        <div>
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Trending paintings.</h2>
        </div>
        <Link href="/trending" className="view-all" style={{ background: 'none', border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', textDecoration: 'none' }}>View all</Link>
      </div>
      <div className="feed-grid">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text short" />
              </div>
            ))
          : paintings.map((a) => (
              <Link key={a.id} href={`/paintings/${a.id}`} className="artwork-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="artwork-img-wrap">
                  <Img src={a.img} alt={a.name} />
                  <div className="artwork-overlay">
                    <div className="artwork-overlay-top">
                      <button
                        className={`artwork-save-btn${savedIds?.has(a.id) ? ' saved' : ''}`}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleSave?.(a.id) }}
                        aria-label={savedIds?.has(a.id) ? 'Unsave artwork' : 'Save artwork'}
                        title={savedIds?.has(a.id) ? 'Unsave' : 'Save'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds?.has(a.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
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
            ))
        }
      </div>
    </section>
  )
}
