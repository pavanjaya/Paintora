'use client'

import { useState } from 'react'
import { STYLES_PAGE_DATA } from '@/lib/data'

const CloseBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} style={{ background: 'none', border: '1.5px solid var(--border)', borderRadius: 100, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
    Close
  </button>
)

export default function StylesPage({ open, onClose, onLogin }: {
  open: boolean
  onClose: () => void
  onLogin: () => void
}) {
  const [activeStyle, setActiveStyle] = useState<number | null>(null)
  const style = activeStyle !== null ? STYLES_PAGE_DATA[activeStyle] : null

  return (
    <div className={`styles-page${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Styles">
      <div className="styles-page-nav">
        <div className="styles-page-nav-left">
          {activeStyle !== null && (
            <button className="styles-page-back" onClick={() => setActiveStyle(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
              All Styles
            </button>
          )}
          <span className="styles-page-title">{activeStyle !== null ? style!.name : 'Art Styles'}</span>
          {activeStyle !== null && <span className="styles-page-count">{style!.artworks.length * 10}+ artworks</span>}
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      <div className="spc-body">
        {activeStyle === null ? (
          <>
            <div className="spc-overview-header">
              <h1 className="spc-overview-title">Explore art styles</h1>
              <p className="spc-overview-sub">From bold abstract expressionism to delicate botanical realism — find the style that speaks to your space.</p>
            </div>
            <div className="spc-photo-grid">
              {STYLES_PAGE_DATA.map((s, i) => (
                <div key={i} className="spc-photo-card" onClick={() => setActiveStyle(i)}>
                  <img src={s.img} alt={s.name} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
                  <div className="spc-photo-overlay">
                    <div>
                      <div className="spc-photo-name">{s.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{s.tag}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="cat-page-header">
              <div className="cat-header-row1">
                <button className="cat-back-btn" onClick={() => setActiveStyle(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
                  Styles
                </button>
              </div>
              <div className="cat-header-title-row">
                <h1 className="cat-header-h1">{style!.name}</h1>
              </div>
            </div>
            <div style={{ padding: '1.5rem 2rem 3rem' }}>
              <div className="cat-grid">
                {[0, 1, 2].map(ci => (
                  <div key={ci} className="cat-col">
                    {style!.artworks.filter((_, j) => j % 3 === ci).map(a => (
                      <div key={a.id} className="cat-card">
                        <img src={a.img} alt={a.name} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
                        <div className="cat-card-info">
                          <span className="cat-card-name">{a.name}</span>
                          <span className="cat-card-tag">{a.style}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="cat-gate">
                <div className="cat-gate-blur" />
                <div className="cat-gate-inner">
                  <div className="cat-gate-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <h3 className="cat-gate-title">Unlock all {style!.name} artworks</h3>
                  <p className="cat-gate-sub">Sign up free to see the complete collection and download high-resolution files.</p>
                  <div className="cat-gate-actions">
                    <button className="cat-gate-btn-primary" onClick={onLogin}>Sign up free</button>
                    <button className="cat-gate-btn-ghost" onClick={onLogin}>Log in</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
