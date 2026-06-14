'use client'

import { useState, useEffect, useRef } from 'react'
import { FEED_ARTWORKS, STYLES, SPACES } from '@/lib/data'

function getSearchResults(q: string) {
  if (!q.trim()) return { artworks: [], styles: [], spaces: [] }
  const lq = q.toLowerCase()
  return {
    artworks: FEED_ARTWORKS.filter(a => a.name.toLowerCase().includes(lq) || a.style.toLowerCase().includes(lq)).slice(0, 4),
    styles: STYLES.filter(s => s.name.toLowerCase().includes(lq)).slice(0, 3),
    spaces: SPACES.filter(s => s.name.toLowerCase().includes(lq)).slice(0, 2),
  }
}

function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return <>{text.slice(0, idx)}<mark>{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</>
}

export default function Nav({ onLogin, onSignup, onGallery, onStylesPage, isLoggedIn, userEmail, onLogout }: {
  onLogin: () => void
  onSignup: () => void
  onGallery: () => void
  onStylesPage: () => void
  isLoggedIn: boolean
  userEmail?: string
  onLogout: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20)
      setSearchVisible(window.scrollY > 80)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const results = getSearchResults(searchQ)
  const hasResults = searchQ.trim().length > 0
  const anyResults = hasResults && (results.artworks.length > 0 || results.styles.length > 0 || results.spaces.length > 0)

  return (
    <>
      <nav style={{ borderBottom: scrolled ? '1px solid rgba(15,15,20,0.08)' : 'none', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.04)' : 'none' }}>
        <div className="nav-inner">
          <a href="#" className="logo" aria-label="Paintora">
            <svg width="130" height="34" viewBox="0 0 130 34" fill="none">
              <text x="0" y="26" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="24" fill="#0F0F14" letterSpacing="-0.8">Paintora</text>
            </svg>
          </a>

          {/* Desktop search */}
          <div ref={searchRef} className={`nav-search-wrap${searchVisible ? ' visible' : ''}`}>
            <div className="nav-search-form" onClick={() => setSearchOpen(true)}>
              <span className="nav-search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input
                className="nav-search-input"
                placeholder="Search artworks, styles, spaces…"
                value={searchQ}
                onChange={e => { setSearchQ(e.target.value); setSearchOpen(true) }}
                onFocus={() => setSearchOpen(true)}
              />
              <button className={`nav-search-clear${searchQ ? ' visible' : ''}`} onClick={() => { setSearchQ(''); setSearchOpen(false) }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className={`nav-search-dropdown${searchOpen ? ' open' : ''}${anyResults ? ' has-results' : ''}`}>
              <div className="search-default-pane">
                <div className="search-section-label">Trending searches</div>
                <div className="search-pills-row">
                  {['Abstract art', 'Minimalist prints', 'Botanical illustration', 'Landscape painting', 'Portrait art'].map(p => (
                    <button key={p} className="search-pill" onClick={() => setSearchQ(p)}>{p}</button>
                  ))}
                </div>
                <div className="search-section-label">Browse by style</div>
                <div className="search-cat-row">
                  {[{ icon: '🎨', label: 'Abstract' }, { icon: '🌿', label: 'Botanical' }, { icon: '🏙️', label: 'Urban' }, { icon: '🌅', label: 'Landscape' }, { icon: '👤', label: 'Portrait' }, { icon: '⬡', label: 'Geometric' }].map(c => (
                    <button key={c.label} className="search-cat-item" onClick={() => setSearchQ(c.label)}>
                      <span className="search-cat-icon">{c.icon}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-results-pane">
                {anyResults ? (
                  <>
                    {results.artworks.length > 0 && (
                      <div className="search-result-group">
                        <div className="search-result-group-title">Artworks</div>
                        {results.artworks.map(a => (
                          <div key={a.id} className="search-result-row">
                            <img className="search-result-img" src={a.img} alt={a.name} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
                            <div className="search-result-info">
                              <div className="search-result-name">{highlight(a.name, searchQ)}</div>
                              <div className="search-result-sub">{a.style}</div>
                            </div>
                            <span className="search-result-badge badge-art">Art</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {results.styles.length > 0 && (
                      <div className="search-result-group">
                        <div className="search-result-group-title">Styles</div>
                        {results.styles.map(s => (
                          <div key={s.name} className="search-result-row">
                            <div className="search-result-icon" style={{ background: '#f0f0f0' }}>🎨</div>
                            <div className="search-result-info">
                              <div className="search-result-name">{highlight(s.name, searchQ)}</div>
                              <div className="search-result-sub">{s.tag}</div>
                            </div>
                            <span className="search-result-badge badge-col">Style</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {results.spaces.length > 0 && (
                      <div className="search-result-group">
                        <div className="search-result-group-title">Spaces</div>
                        {results.spaces.map(s => (
                          <div key={s.name} className="search-result-row">
                            <div className="search-result-icon" style={{ background: '#EDFAF5' }}>🏠</div>
                            <div className="search-result-info">
                              <div className="search-result-name">{highlight(s.name, searchQ)}</div>
                              <div className="search-result-sub">{s.desc}</div>
                            </div>
                            <span className="search-result-badge badge-space">Space</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="search-empty-state">
                    <p>🔍</p>
                    <p>No results for &ldquo;{searchQ}&rdquo;</p>
                    <p>Try a different style or artwork name</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ul className="nav-links">
            <li><button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 600, color: 'var(--ink-light)' }} onClick={onGallery}>Gallery</button></li>
            <li><button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 600, color: 'var(--ink-light)' }} onClick={onStylesPage}>Styles</button></li>
            <li><a href="#spaces">Spaces</a></li>
            <li><a href="#membership">Membership</a></li>
          </ul>

          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setProfileOpen(o => !o)} style={{ width: 36, height: 36, borderRadius: '50%', background: '#0F0F14', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 700 }}>{userEmail ? userEmail[0].toUpperCase() : 'U'}</button>
              {profileOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: 200, background: '#fff', border: '1px solid rgba(15,15,20,0.08)', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.12)', padding: '6px 0', zIndex: 200 }}>
                  {userEmail && <div style={{ padding: '10px 18px 8px', fontSize: 12, color: '#888', fontFamily: 'var(--sans)', borderBottom: '1px solid rgba(15,15,20,0.06)', marginBottom: 4, wordBreak: 'break-all' }}>{userEmail}</div>}
                  {['Profile', 'Saved', 'Downloads', 'Settings'].map(item => (
                    <button key={item} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f7f7f7')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >{item}</button>
                  ))}
                  <div style={{ height: 1, background: 'rgba(15,15,20,0.08)', margin: '4px 0' }} />
                  <button onClick={onLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, color: '#E53E3E', fontWeight: 600 }}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="nav-login" onClick={onLogin}>Log in</button>
              <button className="nav-cta" onClick={onSignup} style={{ background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Get started</button>
            </>
          )}

          <button className={`nav-hamburger${mobileOpen ? ' open' : ''}`} aria-label="Menu" onClick={() => setMobileOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" color="#aaa"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Search…" />
        </div>
        {['Gallery', 'Styles', 'Spaces', 'Membership', 'About'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="mobile-nav-link" onClick={() => {
            setMobileOpen(false)
            if (l === 'Gallery') onGallery()
            if (l === 'Styles') onStylesPage()
          }}>{l}</a>
        ))}
        {isLoggedIn
          ? <button className="mobile-nav-cta" style={{ cursor: 'pointer', border: 'none', fontFamily: 'var(--sans)' }} onClick={onLogout}>Sign out</button>
          : <a href="#" className="mobile-nav-cta" onClick={e => { e.preventDefault(); setMobileOpen(false); onSignup() }}>Get started — Free</a>
        }
      </div>
    </>
  )
}
