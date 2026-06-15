'use client'

import { useState } from 'react'
import { GALLERY_IMGS, type ArtItem } from '@/lib/data'

const TABS = [
  { label: 'All',       style: null },
  { label: 'Abstract',  style: 'Abstract' },
  { label: 'Landscape', style: 'Landscape' },
  { label: 'Portrait',  style: 'Portraiture' },
  { label: 'Botanical', style: 'Botanical' },
]

const FILTERS = ['Style', 'Medium', 'Color', 'Size', 'Price', 'Orientation']

export default function GalleryPage({ open, onClose, onPreview, onLogin, artworks }: {
  open: boolean
  onClose: () => void
  onPreview: (idx: number, list: ArtItem[]) => void
  onLogin: () => void
  artworks?: ArtItem[]
}) {
  const [tab, setTab] = useState('All')
  const allImgs = artworks ?? GALLERY_IMGS

  const filtered = tab === 'All'
    ? allImgs
    : allImgs.filter(a => a.style.toLowerCase().includes(tab.toLowerCase()))

  const col1 = filtered.filter((_, i) => i % 3 === 0)
  const col2 = filtered.filter((_, i) => i % 3 === 1)
  const col3 = filtered.filter((_, i) => i % 3 === 2)

  return (
    <div className={`gallery-page${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Gallery">
      <div className="gallery-topbar">
        <div className="gallery-title-row">
          <h1 className="gallery-title">Gallery</h1>
          <button onClick={onClose} aria-label="Close gallery" style={{ marginLeft: 'auto', background: 'none', border: '1.5px solid var(--border)', borderRadius: 100, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Close
          </button>
        </div>
        <div className="gallery-type-tabs">
          {TABS.map(t => (
            <button key={t.label} className={`gallery-type-tab${tab === t.label ? ' active' : ''}`} onClick={() => setTab(t.label)}>
              {t.label}
              {t.label === 'All' && <span className="tab-count">{allImgs.length.toLocaleString()}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-filter-bar">
        <div className="gallery-filter-left">
          {FILTERS.map(f => (
            <button key={f} className="gallery-filter-btn">
              {f}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          ))}
        </div>
        <div className="gallery-filter-right">
          <button className="gallery-sort-select">
            Sort: Popular
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button className="gallery-settings-btn" aria-label="Grid settings">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      </div>

      <div className="gallery-body">
        {filtered.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, gap: 12, color: '#9898A6' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 4-4 4 4 4-4 4 4"/><path d="M3 15h18"/></svg>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>No {tab} artworks yet</p>
          </div>
        ) : (
          <div className="gallery-masonry">
            {[col1, col2, col3].map((col, ci) => (
              <div key={ci} style={{ display: 'inline-block', width: '100%', verticalAlign: 'top' }}>
                {col.map(item => {
                  const globalIdx = filtered.indexOf(item)
                  return (
                    <div key={item.id} className="gallery-item" onClick={() => onPreview(globalIdx, filtered)}>
                      <img src={item.img} alt={item.name} style={{ height: item.h }} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
                      <div className="gallery-item-overlay">
                        <div className="gallery-item-top">
                          <button className="gallery-item-action" aria-label="Save artwork" title="Save" onClick={e => { e.stopPropagation(); onLogin() }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                          </button>
                          <button className="gallery-item-action" aria-label="Like artwork" title="Like" onClick={e => { e.stopPropagation(); onLogin() }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          </button>
                        </div>
                        <div className="gallery-item-bottom">
                          <div className="gallery-item-info">
                            <div className="gallery-item-name">{item.name}</div>
                            <div className="gallery-item-style">{item.style}</div>
                          </div>
                          <button className="gallery-item-download" onClick={e => { e.stopPropagation(); onLogin() }}>Free DL</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
        <div className="gallery-gate">
          <h3>Unlock the full gallery</h3>
          <p>Sign up free to access all 50,000+ artworks, save your favorites, and download in high resolution.</p>
          <div className="gallery-gate-actions">
            <button className="gallery-gate-primary" onClick={onLogin}>Sign up free</button>
            <button className="gallery-gate-ghost" onClick={onLogin}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  )
}
