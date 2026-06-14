'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
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

const DISCOVER_ITEMS = [
  { label: 'Spaces',      desc: 'Browse by room or environment',    href: '/discover/spaces/living-room' },
  { label: 'Collections', desc: 'Curated editorial selections',      href: '/discover/collections/luxury-living' },
  { label: 'Styles',      desc: 'Abstract, Minimalist, Realism…',   href: '/discover/styles/abstract' },
  { label: 'Mediums',     desc: 'Oil, Watercolor, Acrylic…',        href: '/discover/mediums/oil-painting' },
  { label: 'Subjects',    desc: 'Landscape, Portrait, Floral…',     href: '/discover/subjects/landscape' },
]

export default function Nav({ onLogin, onSignup, onGallery, onStylesPage, isLoggedIn, userEmail, onLogout }: {
  onLogin: () => void
  onSignup: () => void
  onGallery: () => void
  onStylesPage: () => void
  isLoggedIn: boolean
  userEmail?: string
  onLogout: () => void
}) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [discoverOpen, setDiscoverOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const discoverRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (discoverRef.current && !discoverRef.current.contains(e.target as Node)) setDiscoverOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const results = getSearchResults(searchQ)
  const anyResults = searchQ.trim().length > 0 && (results.artworks.length > 0 || results.styles.length > 0 || results.spaces.length > 0)

  const handleDiscover = (href: string) => {
    setDiscoverOpen(false)
    router.push(href)
  }

  return (
    <>
      <nav style={{ borderBottom: scrolled ? '1px solid rgba(15,15,20,0.08)' : 'none', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.04)' : 'none' }}>
        <div className="nav-inner">

          {/* LEFT: Logo */}
          <a href="/" className="logo" aria-label="Paintora">
            <img src="/logo.svg" alt="Paintora" style={{ height: 28, width: 'auto', display: 'block', opacity: 1 }} />
          </a>

          {/* CENTER: Discover + Search */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>

            {/* Discover dropdown */}
            <div ref={discoverRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDiscoverOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: discoverOpen ? 'var(--bg-soft)' : 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)',
                  padding: '8px 14px', borderRadius: 24,
                  transition: 'background 0.15s',
                } as React.CSSProperties}
              >
                Discover
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: discoverOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {discoverOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
                  minWidth: 260, background: '#fff', border: '1px solid var(--border)',
                  borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                  padding: '8px 0', zIndex: 200,
                }}>
                  {DISCOVER_ITEMS.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={e => { e.preventDefault(); handleDiscover(item.href) }}
                      style={{
                        display: 'flex', flexDirection: 'column', gap: 2,
                        width: '100%', textAlign: 'left', padding: '10px 18px',
                        background: 'none', textDecoration: 'none',
                        fontFamily: 'var(--sans)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f7f7f7')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{item.label}</span>
                      <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{item.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Search pill */}
            <div ref={searchRef} style={{ position: 'relative', width: 280 }}>
              <div
                className="nav-search-form"
                style={{ height: 40 }}
                onClick={() => setSearchOpen(true)}
              >
                <span className="nav-search-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </span>
                <input
                  className="nav-search-input"
                  style={{ fontSize: 13 }}
                  placeholder="Search by space, style, collection…"
                  value={searchQ}
                  onChange={e => { setSearchQ(e.target.value); setSearchOpen(true) }}
                  onFocus={() => setSearchOpen(true)}
                />
                {searchQ && (
                  <button className="nav-search-clear visible" onClick={() => { setSearchQ(''); setSearchOpen(false) }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                )}
              </div>

              <div className={`nav-search-dropdown${searchOpen ? ' open' : ''}${anyResults ? ' has-results' : ''}`}>
                <div className="search-default-pane">
                  <div className="search-section-label">Suggestions</div>
                  <div className="search-pills-row">
                    {['Living Room', 'Law Office', 'Abstract', 'Hotel Lobby', 'Minimalist'].map(p => (
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
          </div>

          {/* RIGHT: Saved · Log In · Start Free */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {isLoggedIn ? (
              <>
                <button title="Saved" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', display: 'flex', alignItems: 'center', padding: 6 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setProfileOpen(o => !o)} style={{ width: 36, height: 36, borderRadius: '50%', background: '#0F0F14', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 700 }}>
                    {userEmail ? userEmail[0].toUpperCase() : 'U'}
                  </button>
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
              </>
            ) : (
              <>
                <button title="Saved" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-light)', display: 'flex', alignItems: 'center', padding: 6 }} onClick={onLogin}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
                <button className="nav-login" onClick={onLogin}>Log In</button>
                <button className="nav-cta" onClick={onSignup} style={{ background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Start Free</button>
              </>
            )}

            <button className={`nav-hamburger${mobileOpen ? ' open' : ''}`} aria-label="Menu" onClick={() => setMobileOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" color="#aaa"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Search by space, style, collection…" />
        </div>
        {DISCOVER_ITEMS.map(item => (
          <a key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            {item.label}
          </a>
        ))}
        {isLoggedIn
          ? <button className="mobile-nav-cta" style={{ cursor: 'pointer', border: 'none', fontFamily: 'var(--sans)' }} onClick={onLogout}>Sign out</button>
          : <a href="#" className="mobile-nav-cta" onClick={e => { e.preventDefault(); setMobileOpen(false); onSignup() }}>Start Free</a>
        }
      </div>
    </>
  )
}
