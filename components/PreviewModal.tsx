'use client'

import { useEffect } from 'react'
import { type ArtItem } from '@/lib/data'

export default function PreviewModal({ open, artwork, onClose, onPrev, onNext }: {
  open: boolean
  artwork: ArtItem | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose, onPrev, onNext])

  if (!artwork) return null

  return (
    <div className={`preview-modal${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="preview-panel">
        <div className="preview-image-wrap">
          <button className="preview-arrow preview-arrow-prev" onClick={onPrev}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <img key={artwork.id} src={artwork.img} alt={artwork.name} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
          <button className="preview-arrow preview-arrow-next" onClick={onNext}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div className="preview-details">
          <button className="preview-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div className="preview-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            {artwork.style}
          </div>
          <h2 className="preview-title">{artwork.name}</h2>
          <p className="preview-style">Original artwork · AI-curated</p>
          <div className="preview-meta">
            {[
              { label: 'Dimensions', value: artwork.dim || '24 × 36 in' },
              { label: 'Medium', value: artwork.medium || 'Digital Print' },
              { label: 'Style', value: artwork.style },
              { label: 'License', value: 'Free personal use' },
            ].map(m => (
              <div key={m.label} className="preview-meta-item">
                <div className="preview-meta-label">{m.label}</div>
                <div className="preview-meta-value">{m.value}</div>
              </div>
            ))}
          </div>
          <div className="preview-actions">
            <button className="preview-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Free Download
            </button>
            <button className="preview-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Save to collection
            </button>
          </div>
          <div className="preview-tags-label">Tags</div>
          <div className="preview-tags">
            {[artwork.style, 'Contemporary', 'Wall Art', 'Home Decor'].map(tag => (
              <span key={tag} className="preview-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
