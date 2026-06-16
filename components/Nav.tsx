'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
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
  { label: 'Spaces',         desc: 'Browse by room or environment',  href: '/spaces' },
  { label: 'Styles',         desc: 'Abstract, Minimalist, Realism…', href: '/styles' },
  { label: 'Mediums',        desc: 'Oil, Watercolor, Acrylic…',      href: '/mediums' },
  { label: 'Subjects',       desc: 'Landscape, Portrait, Floral…',   href: '/subjects' },
  { label: 'Color Palettes', desc: 'Warm tones, Cool blues, Earthy…', href: '/color-palettes' },
]

type NavProps = {
  onLogin: () => void
  onSignup: () => void
  onStylesPage: () => void
  isLoggedIn: boolean
  userEmail?: string
  onLogout: () => void
  isPro?: boolean
}

function NavInner({ onLogin, onSignup, onStylesPage, isLoggedIn, userEmail, onLogout, isPro }: NavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [scrolled, setScrolled] = useState(false)
  const [discoverOpen, setDiscoverOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState(() =>
    typeof window !== 'undefined' && window.location.pathname === '/search'
      ? new URLSearchParams(window.location.search).get('q') ?? ''
      : ''
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchQ, setMobileSearchQ] = useState('')
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const discoverRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pathname === '/search') {
      setSearchQ(searchParams.get('q') ?? '')
    } else {
      setSearchQ('')
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY > 80) setMobileOpen(false)
    }
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
        <div className="nav-inner" style={{ position: 'relative' }}>

          {/* LEFT: Logo */}
          <a href="/" className="logo" aria-label="Paintora">
            <img src="/logo.svg" alt="Paintora" style={{ height: 28, width: 'auto', display: 'block', opacity: 1 }} />
          </a>

          {/* CENTER: Search bar — absolutely centered in nav */}
          <div ref={searchRef} className="nav-search-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 460 }}>
            <form
              className="nav-search-form"
              onClick={() => setSearchOpen(true)}
              onSubmit={e => { e.preventDefault(); if (searchQ.trim()) { setSearchOpen(false); router.push(`/search?q=${encodeURIComponent(searchQ.trim())}`) } }}
            >
              <span className="nav-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input
                className="nav-search-input"
                placeholder="Search artworks, collections, spaces…"
                value={searchQ}
                onChange={e => { setSearchQ(e.target.value); setSearchOpen(true) }}
                onFocus={() => setSearchOpen(true)}
              />
              {searchQ && (
                <button type="button" className="nav-search-clear visible" onClick={() => { setSearchQ(''); setSearchOpen(false) }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              )}
            </form>

              <div className={`nav-search-dropdown${searchOpen ? ' open' : ''}${anyResults ? ' has-results' : ''}`}>
                <div className="search-default-pane">
                  <div className="search-section-label">Trending</div>
                  {[
                    { label: 'Abstract paintings for living room', href: '/styles/abstract' },
                    { label: 'Minimalist art for office',          href: '/spaces/office' },
                    { label: 'Landscape watercolor paintings',     href: '/subjects/landscape' },
                    { label: 'Portrait oil paintings',             href: '/subjects/portrait' },
                    { label: 'Botanical prints for bedroom',       href: '/subjects/floral' },
                  ].map(t => (
                    <button key={t.label} className="search-trending-row" onClick={() => { setSearchOpen(false); router.push(t.href) }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="search-trending-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <span>{t.label}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="search-trending-arrow"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  ))}
                  <div className="search-browse-row">
                    <span className="search-browse-label">Spaces:</span>
                    {[
                      { label: 'Living Room', href: '/spaces/living-room' },
                      { label: 'Office',      href: '/spaces/office' },
                      { label: 'Hotel',       href: '/spaces/hotel' },
                      { label: 'Bedroom',     href: '/spaces/bedroom' },
                    ].map(s => (
                      <button key={s.label} className="search-browse-chip" onClick={() => { setSearchOpen(false); router.push(s.href) }}>{s.label}</button>
                    ))}
                  </div>
                  <div className="search-browse-row">
                    <span className="search-browse-label">Styles:</span>
                    {[
                      { label: 'Abstract',   href: '/styles/abstract' },
                      { label: 'Minimalist', href: '/styles/minimalist' },
                      { label: 'Geometric',  href: '/styles/geometric' },
                      { label: 'Landscape',  href: '/subjects/landscape' },
                    ].map(s => (
                      <button key={s.label} className="search-browse-chip" onClick={() => { setSearchOpen(false); router.push(s.href) }}>{s.label}</button>
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
                            <div key={a.id} className="search-result-row" style={{ cursor: 'pointer' }} onClick={() => { setSearchOpen(false); router.push(`/search?q=${encodeURIComponent(a.name)}`) }}>
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
                            <div key={s.name} className="search-result-row" style={{ cursor: 'pointer' }} onClick={() => { setSearchOpen(false); router.push(`/styles/${s.name.toLowerCase().replace(/\s+/g, '-')}`) }}>
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
                            <div key={s.name} className="search-result-row" style={{ cursor: 'pointer' }} onClick={() => { setSearchOpen(false); router.push(`/spaces/${s.name.toLowerCase().replace(/\s+/g, '-')}`) }}>
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

          {/* RIGHT: Discover + auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, marginLeft: 'auto' }}>

            {/* Discover dropdown */}
            <div ref={discoverRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setProfileOpen(false); setDiscoverOpen(o => !o) }}
                className="nav-text-btn"
              >
                Discover
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: discoverOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {discoverOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
                  minWidth: 240, background: '#fff', border: '1px solid var(--border)',
                  borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                  padding: '8px 0', zIndex: 200,
                }}>
                  {DISCOVER_ITEMS.map(item => (
                    <a key={item.label} href={item.href}
                      onClick={e => { e.preventDefault(); handleDiscover(item.href) }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 18px', background: 'none', textDecoration: 'none', fontFamily: 'var(--sans)' }}
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

            <div className="nav-divider" style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 6px', flexShrink: 0 }} />

            {isLoggedIn ? (
              <>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <button onClick={() => { setDiscoverOpen(false); setProfileOpen(o => !o) }} style={{ width: 34, height: 34, borderRadius: '50%', background: '#f0f0f3', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#191947', fontSize: 13, fontWeight: 700 }}>
                      {userEmail ? userEmail[0].toUpperCase() : 'U'}
                    </button>
                    {isPro && <span style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', background: '#B87800', color: '#fff', fontSize: 8, fontWeight: 800, borderRadius: 3, padding: '1px 4px', lineHeight: 1.5, fontFamily: 'var(--sans)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>PRO</span>}
                  </div>
                  {profileOpen && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: 200, background: '#fff', border: '1px solid rgba(15,15,20,0.08)', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.12)', padding: '6px 0', zIndex: 200 }}>
                      {userEmail && <div style={{ padding: '10px 18px 8px', fontSize: 12, color: '#888', fontFamily: 'var(--sans)', borderBottom: '1px solid rgba(15,15,20,0.06)', marginBottom: 4, wordBreak: 'break-all' }}>{userEmail}{isPro && <span style={{ marginLeft: 6, background: '#FFF8EC', color: '#B87800', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '1px 5px' }}>Pro</span>}</div>}
                      {[['Profile', '/profile'], ['Saved', '/saved'], ['Downloads', '/downloads'], ['Settings', '/settings']].map(([label, href]) => (
                        <a key={label} href={href} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', fontWeight: 500, textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f7f7f7')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                        >{label}</a>
                      ))}
                      <div style={{ height: 1, background: 'rgba(15,15,20,0.08)', margin: '4px 0' }} />
                      <button onClick={onLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, color: '#E53E3E', fontWeight: 600 }}>Sign out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="nav-login" onClick={onLogin}>Log in</button>
                <div style={{ width: 6 }} />
                <button className="nav-cta" onClick={onSignup}>Sign up</button>
              </>
            )}

            {/* Mobile search icon — shown only on mobile */}
            <button className="nav-mobile-search-icon" aria-label="Search" onClick={() => { setMobileSearchOpen(true); setMobileOpen(false); setTimeout(() => mobileSearchInputRef.current?.focus(), 50) }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>

            <button className={`nav-hamburger${mobileOpen ? ' open' : ''}`} aria-label="Menu" onClick={() => setMobileOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>

        </div>

        {/* Mobile search overlay */}
        {mobileSearchOpen && (
          <div className="mobile-search-overlay">
            <form
              className="mobile-search-overlay-form"
              onSubmit={e => {
                e.preventDefault()
                const q = mobileSearchQ.trim()
                if (q) { setMobileSearchOpen(false); setMobileSearchQ(''); router.push(`/search?q=${encodeURIComponent(q)}`) }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--ink-muted)', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                ref={mobileSearchInputRef}
                className="mobile-search-overlay-input"
                placeholder="Search paintings, styles, spaces…"
                value={mobileSearchQ}
                onChange={e => setMobileSearchQ(e.target.value)}
                autoComplete="off"
              />
              {mobileSearchQ && (
                <button type="button" onClick={() => setMobileSearchQ('')} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              )}
            </form>
            <button
              className="mobile-search-overlay-cancel"
              onClick={() => { setMobileSearchOpen(false); setMobileSearchQ('') }}
            >
              Cancel
            </button>
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`}>
        <form className="mobile-search-bar" onSubmit={e => { e.preventDefault(); const v = (e.currentTarget.querySelector('input') as HTMLInputElement).value.trim(); if (v) { setMobileOpen(false); router.push(`/search?q=${encodeURIComponent(v)}`) } }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" color="#aaa"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Search by space, style, collection…" />
        </form>
        {DISCOVER_ITEMS.map(item => (
          <a key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            {item.label}
          </a>
        ))}
        {isLoggedIn ? (
          <>
            {userEmail && <div style={{ padding: '4px 0 12px', fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--sans)' }}>{userEmail}</div>}
            {[['Profile', '/profile'], ['Saved', '/saved'], ['Downloads', '/downloads'], ['Settings', '/settings']].map(([label, href]) => (
              <a key={label} href={href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>{label}</a>
            ))}
            <button className="mobile-nav-cta" style={{ cursor: 'pointer', border: 'none', fontFamily: 'var(--sans)', background: 'none', color: '#E53E3E', fontWeight: 700, textAlign: 'left', padding: '14px 0', fontSize: 16, width: '100%' }} onClick={() => { setMobileOpen(false); onLogout() }}>Sign out</button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            <button type="button" className="mobile-nav-cta" style={{ cursor: 'pointer', border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', background: 'none', color: 'var(--ink)' }} onClick={() => { setMobileOpen(false); onLogin() }}>Log in</button>
            <button type="button" className="mobile-nav-cta" style={{ cursor: 'pointer', border: 'none', fontFamily: 'var(--sans)' }} onClick={() => { setMobileOpen(false); onSignup() }}>Sign up free</button>
          </div>
        )}
      </div>
    </>
  )
}

export default function Nav(props: NavProps) {
  return (
    <Suspense fallback={null}>
      <NavInner {...props} />
    </Suspense>
  )
}
