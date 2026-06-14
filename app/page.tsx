'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const VALID_PASSWORD = 'Test1234567890'

// ── DATA ──────────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  { title: 'Abstract Visions', name: 'Curated Series', count: '142 works', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80' },
  { title: 'Serene Landscapes', name: 'Nature & Peace', count: '98 works', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { title: 'Urban Geometry', name: 'City & Structure', count: '76 works', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80' },
  { title: 'Botanica', name: 'Flora Collection', count: '89 works', img: 'https://images.unsplash.com/photo-1487530811015-780d05b1e5f4?w=400&q=80' },
  { title: 'Portrait Studies', name: 'Human Form', count: '65 works', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80' },
  { title: 'Color Fields', name: 'Chromatic Works', count: '111 works', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
]

const SPACES = [
  { name: 'Living Room', desc: 'Statement pieces that anchor your main space', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { name: 'Bedroom', desc: 'Calming art for restful, personal sanctuaries', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80' },
  { name: 'Home Office', desc: 'Inspiring works for focused, creative work', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80' },
  { name: 'Dining Room', desc: 'Conversation-starting art for shared meals', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80' },
]

const STYLES = [
  { name: 'Abstract Expressionism', tag: 'Emotion & Movement', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&q=80' },
  { name: 'Minimalism', tag: 'Form & Negative Space', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&q=80' },
  { name: 'Impressionism', tag: 'Light & Atmosphere', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80' },
  { name: 'Botanical Realism', tag: 'Nature & Detail', img: 'https://images.unsplash.com/photo-1487530811015-780d05b1e5f4?w=300&q=80' },
  { name: 'Geometric', tag: 'Pattern & Precision', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80' },
  { name: 'Portraiture', tag: 'Character & Expression', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80' },
  { name: 'Landscape', tag: 'Horizon & Depth', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80' },
  { name: 'Surrealism', tag: 'Dreams & Fantasy', img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&q=80' },
]

const FEED_ARTWORKS = [
  { id: 1, name: 'Cerulean Dream', style: 'Abstract', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80', dim: '24 × 36 in', medium: 'Oil on Canvas' },
  { id: 2, name: 'Golden Hour', style: 'Impressionism', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80', dim: '18 × 24 in', medium: 'Acrylic' },
  { id: 3, name: 'Urban Tide', style: 'Minimalism', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80', dim: '20 × 28 in', medium: 'Mixed Media' },
  { id: 4, name: 'Verdant Study', style: 'Botanical', img: 'https://images.unsplash.com/photo-1487530811015-780d05b1e5f4?w=400&q=80', dim: '16 × 20 in', medium: 'Watercolor' },
  { id: 5, name: 'Dusk Geometry', style: 'Geometric', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', dim: '24 × 24 in', medium: 'Digital Print' },
  { id: 6, name: 'Coastal Light', style: 'Landscape', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', dim: '30 × 40 in', medium: 'Oil on Canvas' },
  { id: 7, name: 'Portrait #7', style: 'Portraiture', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', dim: '18 × 24 in', medium: 'Charcoal' },
  { id: 8, name: 'Chromatic Field', style: 'Color Field', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80', dim: '36 × 48 in', medium: 'Acrylic on Canvas' },
]

const GALLERY_IMGS = [
  { id: 1, name: 'Cerulean Dream', style: 'Abstract', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80', h: '280px', dim: '24×36 in', medium: 'Oil on Canvas' },
  { id: 2, name: 'Golden Hour', style: 'Impressionism', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80', h: '360px', dim: '18×24 in', medium: 'Acrylic' },
  { id: 3, name: 'Urban Tide', style: 'Minimalism', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=80', h: '220px', dim: '20×28 in', medium: 'Mixed Media' },
  { id: 4, name: 'Verdant Study', style: 'Botanical', img: 'https://images.unsplash.com/photo-1487530811015-780d05b1e5f4?w=400&q=80', h: '300px', dim: '16×20 in', medium: 'Watercolor' },
  { id: 5, name: 'Dusk Geometry', style: 'Geometric', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', h: '240px', dim: '24×24 in', medium: 'Digital' },
  { id: 6, name: 'Coastal Light', style: 'Landscape', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', h: '320px', dim: '30×40 in', medium: 'Oil on Canvas' },
  { id: 7, name: 'Portrait #7', style: 'Portraiture', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', h: '260px', dim: '18×24 in', medium: 'Charcoal' },
  { id: 8, name: 'Chromatic Field', style: 'Color Field', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80', h: '380px', dim: '36×48 in', medium: 'Acrylic' },
  { id: 9, name: 'Night Study', style: 'Abstract', img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=80', h: '290px', dim: '20×30 in', medium: 'Oil on Canvas' },
  { id: 10, name: 'City Rhythms', style: 'Urban', img: 'https://images.unsplash.com/photo-1514565131-fce0801e6785?w=400&q=80', h: '200px', dim: '18×18 in', medium: 'Acrylic' },
  { id: 11, name: 'Forest Path', style: 'Landscape', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80', h: '340px', dim: '24×36 in', medium: 'Oil on Canvas' },
  { id: 12, name: 'Still Life', style: 'Realism', img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc56?w=400&q=80', h: '260px', dim: '14×18 in', medium: 'Watercolor' },
]

const INSITU = [
  { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', label: 'Living Room', title: 'Contemporary Arrangement' },
  { img: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80', label: 'Dining Space', title: 'Statement Wall Gallery' },
  { img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', label: 'Home Office', title: 'Creative Workspace' },
  { img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', label: 'Bedroom', title: 'Serene Sanctuary' },
]

const TESTIMONIALS = [
  { quote: 'Paintora transformed my living room into a gallery. The curation is exquisite — every piece feels intentional.', name: 'EMMA R.', title: 'Interior Designer, New York' },
  { quote: 'I found art I never would have discovered on my own. The AI curation is remarkably aligned with my personal taste.', name: 'JAMES K.', title: 'Architect, London' },
  { quote: 'The quality and accessibility make this platform exceptional. My clients love the curated selections.', name: 'SOFIA M.', title: 'Art Consultant, Paris' },
]

const STYLES_PAGE_DATA = STYLES.map((s, i) => ({
  ...s,
  artworks: Array.from({ length: 9 }, (_, j) => ({
    id: i * 9 + j,
    name: `${s.name} ${j + 1}`,
    style: s.name,
    img: GALLERY_IMGS[(i * 9 + j) % GALLERY_IMGS.length].img,
  }))
}))

const SPACE_OVERVIEW = [
  ...SPACES,
  { name: 'Hallway', desc: 'Welcoming art for first impressions', img: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80' },
  { name: 'Kitchen', desc: 'Fresh art for daily living spaces', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { name: 'Bathroom', desc: 'Spa-like art for private retreats', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
  { name: 'Kids Room', desc: 'Playful and imaginative pieces', img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80' },
  { name: 'Library', desc: 'Literary and contemplative works', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80' },
  { name: 'Entryway', desc: 'Bold art that sets the tone', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { name: 'Staircase', desc: 'Vertical arrangements for stairwells', img: 'https://images.unsplash.com/photo-1569218276984-81e56fbe13a5?w=600&q=80' },
  { name: 'Outdoor', desc: 'Weather-resistant art for patios', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { name: 'Office Lobby', desc: 'Professional art for first impressions', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { name: 'Conference Room', desc: 'Art that inspires collaboration', img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80' },
  { name: 'Reception', desc: 'Welcoming art for professional spaces', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80' },
  { name: 'Restaurant', desc: 'Ambience-setting art for dining', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80' },
]

// ── HELPERS ────────────────────────────────────────────────────────────────────

function Img({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLImageElement>(null)
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      onLoad={() => ref.current?.classList.add('loaded')}
    />
  )
}

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

// ── LOADER ────────────────────────────────────────────────────────────────────

function Loader({ done }: { done: boolean }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 1800
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)
      if (p >= 100) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (done) setTimeout(() => setHidden(true), 600)
  }, [done])

  if (hidden) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.5s ease', opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'all',
    }}>
      <svg width="140" height="36" viewBox="0 0 140 36" fill="none">
        <text x="0" y="28" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="26" fill="#0F0F14" letterSpacing="-1">Paintora</text>
      </svg>
      <div style={{ marginTop: '2.5rem', width: '180px', height: '3px', borderRadius: '2px', background: '#F0F0F0', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#0F0F14', borderRadius: '2px', width: `${progress}%`, transition: 'width 0.1s linear' }} />
      </div>
      <p style={{ marginTop: '1.25rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#9898A6', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Loading gallery…</p>
    </div>
  )
}

// ── NAV ────────────────────────────────────────────────────────────────────────

function Nav({ onLogin, onSignup, onGallery, onStylesPage, isLoggedIn, onLogout }: {
  onLogin: () => void; onSignup: () => void; onGallery: () => void; onStylesPage: () => void;
  isLoggedIn: boolean; onLogout: () => void;
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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
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
              <button onClick={() => setProfileOpen(o => !o)} style={{ width: 36, height: 36, borderRadius: '50%', background: '#0F0F14', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 700 }}>P</button>
              {profileOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: 180, background: '#fff', border: '1px solid rgba(15,15,20,0.08)', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.12)', padding: '6px 0', zIndex: 200 }}>
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

// ── HERO ───────────────────────────────────────────────────────────────────────

function Hero({ onGallery }: { onGallery: () => void }) {
  const [tab, setTab] = useState<'artworks' | 'collections' | 'spaces'>('artworks')
  const [q, setQ] = useState('')

  const placeholders: Record<string, string> = {
    artworks: 'Search 50,000+ artworks…',
    collections: 'Browse curated collections…',
    spaces: 'Find art for your space…',
  }

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Art that belongs<br />in your world.</h1>
        <p className="hero-sub">
          Discover 50,000+ contemporary paintings curated by AI — made for homes,<br />
          offices, and spaces of intention.
        </p>
        <div className="hero-tabs">
          {(['artworks', 'collections', 'spaces'] as const).map(t => (
            <button key={t} className={`hero-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'artworks' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>}
              {t === 'collections' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"/></svg>}
              {t === 'spaces' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <form className="hero-search" onSubmit={e => { e.preventDefault(); onGallery() }}>
          <div className="hero-search-inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="hero-search-input" placeholder={placeholders[tab]} value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <button type="submit" className="hero-search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </form>
        <div className="hero-tags">
          <span className="hero-tags-label">Popular:</span>
          {['Abstract', 'Landscape', 'Botanical', 'Portrait', 'Geometric'].map(t => (
            <button key={t} className="hero-tag" onClick={() => { setQ(t); onGallery() }}>{t}</button>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-art-card">
          <Img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80" alt="Featured artwork" />
          <div className="hero-art-credit">
            <img className="hero-art-avatar loaded" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80" alt="Artist" />
            <div>
              <div className="hero-art-name">Elena Marcov</div>
              <div className="hero-art-style">Abstract Expressionism</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── MARQUEE ────────────────────────────────────────────────────────────────────

function Marquee() {
  const items = ['Contemporary Art', '·', 'AI Curated', '·', '50,000+ Works', '·', 'Free High-Resolution Downloads', '·', 'Licensed for Commercial Use', '·', 'New Artworks Weekly', '·']
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className={item === '·' ? 'dot' : ''}>{item}</span>
        ))}
      </div>
    </div>
  )
}

// ── COLLECTIONS ────────────────────────────────────────────────────────────────

function Collections({ onGallery }: { onGallery: () => void }) {
  return (
    <section id="collections">
      <div className="section-head">
        <div>
          <div className="section-label">Collections</div>
          <h2 className="section-title">Curated series<br />for every taste</h2>
        </div>
        <button className="view-all" onClick={onGallery} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all collections</button>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map((c, i) => (
          <div key={i} className="collection-card" onClick={onGallery}>
            <Img src={c.img} alt={c.title} />
            <div className="col-overlay">
              <div>
                <div className="col-title">{c.title}</div>
                <div className="col-name">{c.name}</div>
              </div>
              <div className="col-footer">
                <span className="col-count">{c.count}</span>
                <span className="col-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── SPACES ─────────────────────────────────────────────────────────────────────

function Spaces({ onSpacePage }: { onSpacePage: () => void }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const moods = ['Calm & Serene', 'Bold & Dramatic', 'Warm & Cozy', 'Modern & Minimal', 'Eclectic', 'Nature-Inspired']

  return (
    <div className="spaces-outer" id="spaces">
      <div className="spaces-inner">
        <div className="section-head">
          <div>
            <div className="section-label" style={{ color: 'var(--sage)', background: 'var(--sage-light)' }}>Spaces</div>
            <h2 className="section-title">Art for every<br />room in your home</h2>
          </div>
          <button className="view-all" onClick={onSpacePage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Explore all spaces</button>
        </div>
        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <div key={i} className="space-card" onClick={onSpacePage}>
              <Img src={s.img} alt={s.name} />
              <div className="space-overlay">
                <div className="space-name">{s.name}</div>
                <div className="space-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mood-row">
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 8 }}>Mood:</span>
          {moods.map(m => (
            <button key={m} className={`mood-tag${activeTag === m ? ' active' : ''}`} onClick={() => setActiveTag(activeTag === m ? null : m)}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── STYLES SECTION ─────────────────────────────────────────────────────────────

function StylesSection({ onStylesPage }: { onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <div className="section-label" style={{ color: 'var(--amber)', background: 'var(--amber-light)' }}>Art Styles</div>
            <h2 className="section-title">Explore by<br />artistic movement</h2>
          </div>
          <button className="view-all" onClick={onStylesPage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>All styles</button>
        </div>
        <div className="styles-scroll">
          {STYLES.map((s, i) => (
            <div key={i} className="style-card" onClick={onStylesPage}>
              <div className="style-card-info">
                <div className="style-name">{s.name}</div>
                <span className="style-tag">{s.tag}</span>
              </div>
              <Img src={s.img} alt={s.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ARTWORK FEED ───────────────────────────────────────────────────────────────

function ArtworkFeed({ onPreview, onGallery, onLogin }: {
  onPreview: (idx: number, list: typeof FEED_ARTWORKS) => void;
  onGallery: () => void;
  onLogin: () => void;
}) {
  return (
    <section id="artworks">
      <div className="section-head">
        <div>
          <div className="section-label">New Arrivals</div>
          <h2 className="section-title">Fresh artworks<br />this week</h2>
        </div>
        <button className="view-all" onClick={onGallery} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>See all artworks</button>
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

// ── IN SITU ────────────────────────────────────────────────────────────────────

function InSitu() {
  return (
    <div className="insitu-outer">
      <div className="insitu-inner">
        <div style={{ maxWidth: 560 }}>
          <div className="section-label" style={{ color: 'var(--sky)', background: 'var(--sky-light)' }}>In Situ</div>
          <h2 className="insitu-title">See it in<br />your space first.</h2>
          <p className="insitu-sub">
            Every artwork is visualized in real home environments — so you can see exactly how it
            will feel before you commit.
          </p>
        </div>
        <div className="insitu-grid">
          {INSITU.map((item, i) => (
            <div key={i} className="insitu-img-wrap">
              <Img src={item.img} alt={item.title} />
              <div className="insitu-caption">
                <p>{item.label}</p>
                <strong>{item.title}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label" style={{ margin: '0 auto 1.25rem' }}>Testimonials</div>
        <h2 className="section-title">Loved by collectors<br />and designers</h2>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-icon">&ldquo;</div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-title">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── MEMBERSHIP ─────────────────────────────────────────────────────────────────

function Membership({ onSignup }: { onSignup: () => void }) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  const plans = [
    {
      name: 'Explorer', monthly: 0, yearly: 0,
      desc: 'Start discovering art with our free tier. Perfect for casual browsers.',
      features: [
        { text: 'Browse 10,000 artworks', on: true },
        { text: 'Standard resolution downloads', on: true },
        { text: '5 saves per month', on: true },
        { text: 'AI art recommendations', on: false },
        { text: 'Unlimited downloads', on: false },
        { text: 'Commercial licensing', on: false },
      ],
      cta: 'Start free', featured: false,
    },
    {
      name: 'Collector', monthly: 12, yearly: 9,
      desc: 'For art enthusiasts who want unlimited access to our full catalog.',
      features: [
        { text: 'Full catalog of 50,000+ works', on: true },
        { text: 'High-resolution downloads', on: true },
        { text: 'Unlimited saves', on: true },
        { text: 'AI art recommendations', on: true },
        { text: 'Unlimited downloads', on: true },
        { text: 'Commercial licensing', on: false },
      ],
      cta: 'Start free trial', featured: true, badge: 'Most Popular',
    },
    {
      name: 'Studio', monthly: 39, yearly: 29,
      desc: 'For designers, agencies, and studios needing commercial rights.',
      features: [
        { text: 'Everything in Collector', on: true },
        { text: 'Commercial use license', on: true },
        { text: 'Extended license options', on: true },
        { text: 'Team collaboration', on: true },
        { text: 'Priority support', on: true },
        { text: 'Custom collections', on: true },
      ],
      cta: 'Start free trial', featured: false,
    },
  ]

  return (
    <div className="membership-outer" id="membership">
      <div className="mem-inner">
        <div className="mem-top">
          <span className="mem-eyebrow">Membership</span>
          <h2 className="mem-heading">Start free.<br />Scale as you grow.</h2>
          <p className="mem-sub">No credit card required. Upgrade or downgrade at any time.</p>
          <div className="mem-proof">
            <div className="mem-proof-avatars">
              {[1, 2, 3, 4].map(n => (
                <img key={n} className="mem-avatar loaded" src={`https://i.pravatar.cc/56?img=${n * 11}`} alt="Member" style={{ marginLeft: n > 1 ? -8 : 0 }} />
              ))}
            </div>
            <p className="mem-proof-text"><strong>12,400+</strong> collectors worldwide</p>
          </div>
        </div>

        <div className="mem-toggle-wrap">
          <button className={`mem-toggle${billing === 'monthly' ? ' active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
          <button className={`mem-toggle${billing === 'yearly' ? ' active' : ''}`} onClick={() => setBilling('yearly')}>
            Yearly <span className="mem-toggle-badge">Save 25%</span>
          </button>
        </div>

        <div className="mem-plans">
          {plans.map((p, i) => (
            <div key={i} className={`mem-plan${p.featured ? ' mem-plan-featured' : ''}`}>
              {p.badge && <div className="mem-plan-badge">{p.badge}</div>}
              <div className="mem-plan-top">
                <div className="mem-plan-name" style={p.featured ? { color: 'rgba(255,255,255,0.6)' } : {}}>{p.name}</div>
                <div className="mem-plan-price-row">
                  <span className="mem-plan-price" style={p.featured ? { color: '#fff' } : {}}>${billing === 'yearly' ? p.yearly : p.monthly}</span>
                  <div>
                    <span className="mem-plan-period" style={p.featured ? { color: 'rgba(255,255,255,0.5)' } : {}}>/mo</span>
                    {billing === 'yearly' && p.monthly > 0 && <div className="mem-plan-original">${p.monthly}/mo</div>}
                  </div>
                </div>
                <p className="mem-plan-desc" style={p.featured ? { color: 'rgba(255,255,255,0.65)' } : {}}>{p.desc}</p>
                {p.featured
                  ? <button className="mem-plan-cta-solid" onClick={onSignup}>{p.cta}</button>
                  : <button className="mem-plan-cta-ghost" onClick={onSignup}>{p.cta}</button>
                }
              </div>
              <div className="mem-plan-divider" style={p.featured ? { background: 'rgba(255,255,255,0.15)' } : {}} />
              <ul className="mem-plan-features">
                {p.features.map((f, j) => (
                  <li key={j} className={`mem-feature${!f.on ? ' mem-feature-off' : ''}`}>
                    {f.on
                      ? <span className="mem-check" style={{ color: p.featured ? '#22C55E' : 'var(--sage)' }}>✓</span>
                      : <span className="mem-check mem-check-off" style={p.featured ? { color: 'rgba(255,255,255,0.3)' } : {}}>–</span>
                    }
                    <span style={p.featured ? { color: f.on ? '#fff' : 'rgba(255,255,255,0.4)' } : {}}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mem-trust">
          {[{ icon: '🔒', text: 'Cancel anytime' }, { icon: '💳', text: 'No credit card required' }, { icon: '⭐', text: '4.9/5 rating' }, { icon: '🎨', text: '50,000+ artworks' }].map((item, i) => (
            <div key={i} className="mem-trust-item">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── LICENSING ──────────────────────────────────────────────────────────────────

function Licensing({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="licensing-outer">
      <div className="licensing-label">Licensing</div>
      <h2 className="licensing-title">Use it anywhere.<br />License it properly.</h2>
      <p className="licensing-sub">
        Every artwork on Paintora comes with a clear, straightforward license. From personal
        projects to commercial campaigns — we have you covered.
      </p>
      <button className="btn-dark" onClick={onSignup} style={{ fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none' }}>Explore licensing options</button>
    </div>
  )
}

// ── FOOTER ─────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand-row">
          <div>
            <div className="footer-brand">
              <svg width="130" height="34" viewBox="0 0 130 34" fill="none">
                <text x="0" y="26" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="24" fill="#0F0F14" letterSpacing="-0.8">Paintora</text>
              </svg>
            </div>
            <p className="footer-tagline">Contemporary AI-curated paintings for modern homes, offices, and spaces of intention.</p>
          </div>
          <div className="footer-nav-cols">
            {[
              { title: 'Explore', links: ['Gallery', 'Collections', 'Styles', 'Artists', 'In Situ'] },
              { title: 'Spaces', links: ['Living Room', 'Bedroom', 'Home Office', 'Dining Room', 'All Spaces'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Licensing', 'Cookie Policy', 'GDPR'] },
            ].map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-make">© 2024 Paintora. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
            <div className="footer-social">
              {['𝕏', 'in', '📷', '𝔽'].map((icon, i) => (
                <a key={i} href="#" aria-label="Social">{icon}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── AUTH MODAL ─────────────────────────────────────────────────────────────────

function AuthModal({ mode, open, onClose, onSwitch, onSuccess }: {
  mode: 'login' | 'signup'; open: boolean;
  onClose: () => void; onSwitch: () => void; onSuccess: () => void;
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'login') {
      if (password === VALID_PASSWORD) { onSuccess(); onClose() }
      else setError('Incorrect password. Try: Test1234567890')
    } else {
      onSuccess(); onClose()
    }
  }

  return (
    <div className={`auth-modal${open ? ' open' : ''}`} role="dialog">
      <div className="auth-backdrop" onClick={onClose} />
      <div className="auth-panel">
        <button className="auth-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="auth-left">
          <div className="auth-logo">
            <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
              <text x="0" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="20" fill="#0F0F14" letterSpacing="-0.5">Paintora</text>
            </svg>
          </div>
          <h2 className="auth-heading">{mode === 'login' ? 'Welcome back.' : 'Join Paintora.'}</h2>
          <form onSubmit={handle}>
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label">Full name</label>
                <input className="auth-input" type="text" placeholder="Your name" />
              </div>
            )}
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <input className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-pw-wrap">
                <input className="auth-input" type={showPw ? 'text' : 'password'} placeholder="Your password" value={password} onChange={e => { setPassword(e.target.value); setError('') }} />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>
                  {showPw
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            {error && <p style={{ fontSize: 12, color: '#E53E3E', marginBottom: '1rem' }}>{error}</p>}
            {mode === 'login' && <a href="#" className="auth-forgot" onClick={e => e.preventDefault()}>Forgot your password?</a>}
            <button type="submit" className="auth-btn">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
          </form>
          <div className="auth-divider">or</div>
          <button className="auth-google">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>
          <p className="auth-switch">
            {mode === 'login'
              ? <>Don&apos;t have an account? <a href="#" onClick={e => { e.preventDefault(); onSwitch() }}>Sign up free</a></>
              : <>Already have an account? <a href="#" onClick={e => { e.preventDefault(); onSwitch() }}>Sign in</a></>
            }
          </p>
          <p className="auth-terms">By continuing, you agree to Paintora&apos;s <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
        <div className="auth-right">
          <div className="auth-right-inner">
            <div className="auth-artwork-stack">
              <div className="auth-art auth-art-1" />
              <div className="auth-art auth-art-2" />
              <div className="auth-art auth-art-3" />
            </div>
            <div className="auth-right-title">50,000+ artworks<br />waiting for you.</div>
            <p className="auth-right-sub">Join 12,400+ collectors discovering the world&apos;s best contemporary art.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── GALLERY PAGE ───────────────────────────────────────────────────────────────

type ArtItem = { id: number; name: string; style: string; img: string; dim?: string; medium?: string; h?: string }

function GalleryPage({ open, onClose, onPreview, onLogin }: {
  open: boolean; onClose: () => void;
  onPreview: (idx: number, list: ArtItem[]) => void;
  onLogin: () => void;
}) {
  const [tab, setTab] = useState('All')
  const tabs = [{ label: 'All', count: 50000 }, { label: 'Abstract', count: 12400 }, { label: 'Landscape', count: 8200 }, { label: 'Portrait', count: 5600 }, { label: 'Botanical', count: 4800 }]
  const col1 = GALLERY_IMGS.filter((_, i) => i % 3 === 0)
  const col2 = GALLERY_IMGS.filter((_, i) => i % 3 === 1)
  const col3 = GALLERY_IMGS.filter((_, i) => i % 3 === 2)

  return (
    <div className={`gallery-page${open ? ' open' : ''}`}>
      <div className="gallery-topbar">
        <div className="gallery-title-row">
          <h1 className="gallery-title">Gallery</h1>
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: '1.5px solid var(--border)', borderRadius: 100, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Close
          </button>
        </div>
        <div className="gallery-type-tabs">
          {tabs.map(t => (
            <button key={t.label} className={`gallery-type-tab${tab === t.label ? ' active' : ''}`} onClick={() => setTab(t.label)}>
              {t.label} <span className="tab-count">{t.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="gallery-filter-bar">
        <div className="gallery-filter-left">
          {['Style', 'Medium', 'Color', 'Size', 'Price', 'Orientation'].map(f => (
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
          <button className="gallery-settings-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      </div>
      <div className="gallery-body">
        <div className="gallery-masonry">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} style={{ display: 'inline-block', width: '100%', verticalAlign: 'top' }}>
              {col.map(item => {
                const globalIdx = GALLERY_IMGS.indexOf(item)
                return (
                  <div key={item.id} className="gallery-item" onClick={() => onPreview(globalIdx, GALLERY_IMGS)}>
                    <img src={item.img} alt={item.name} style={{ height: item.h }} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
                    <div className="gallery-item-overlay">
                      <div className="gallery-item-top">
                        <button className="gallery-item-action" title="Save" onClick={e => { e.stopPropagation(); onLogin() }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        </button>
                        <button className="gallery-item-action" title="Like" onClick={e => { e.stopPropagation(); onLogin() }}>
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

// ── STYLES PAGE ────────────────────────────────────────────────────────────────

function StylesPageOverlay({ open, onClose, onLogin }: {
  open: boolean; onClose: () => void; onLogin: () => void;
}) {
  const [activeStyle, setActiveStyle] = useState<number | null>(null)
  const style = activeStyle !== null ? STYLES_PAGE_DATA[activeStyle] : null

  return (
    <div className={`styles-page${open ? ' open' : ''}`}>
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
        <button onClick={onClose} style={{ background: 'none', border: '1.5px solid var(--border)', borderRadius: 100, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          Close
        </button>
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

// ── SPACE PAGE ─────────────────────────────────────────────────────────────────

function SpacePage({ open, onClose, onLogin }: {
  open: boolean; onClose: () => void; onLogin: () => void;
}) {
  const [activeSpace, setActiveSpace] = useState<number | null>(null)
  const space = activeSpace !== null ? SPACE_OVERVIEW[activeSpace] : null
  const artworks = GALLERY_IMGS.slice(0, 9)

  return (
    <div className={`styles-page${open ? ' open' : ''}`} style={{ zIndex: 3500 }}>
      <div className="styles-page-nav">
        <div className="styles-page-nav-left">
          {activeSpace !== null && (
            <button className="styles-page-back" onClick={() => setActiveSpace(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
              All Spaces
            </button>
          )}
          <span className="styles-page-title">{activeSpace !== null ? space!.name : 'Spaces'}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: '1.5px solid var(--border)', borderRadius: 100, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          Close
        </button>
      </div>
      <div className="spc-body">
        {activeSpace === null ? (
          <>
            <div className="spc-overview-header">
              <h1 className="spc-overview-title">Find art for your space</h1>
              <p className="spc-overview-sub">Whether you&apos;re decorating a bedroom, living room, or home office — we&apos;ve curated the perfect art for every room.</p>
            </div>
            <div className="spc-photo-grid">
              {SPACE_OVERVIEW.map((s, i) => (
                <div key={i} className="spc-photo-card" onClick={() => setActiveSpace(i)}>
                  <img src={s.img} alt={s.name} onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
                  <div className="spc-photo-overlay">
                    <div>
                      <div className="spc-photo-name">{s.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{s.desc}</div>
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
                <button className="cat-back-btn" onClick={() => setActiveSpace(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
                  Spaces
                </button>
              </div>
              <div className="cat-header-title-row">
                <h1 className="cat-header-h1">Art for your {space!.name}</h1>
              </div>
            </div>
            <div style={{ padding: '1.5rem 2rem 3rem' }}>
              <div className="cat-grid">
                {[0, 1, 2].map(ci => (
                  <div key={ci} className="cat-col">
                    {artworks.filter((_, j) => j % 3 === ci).map(a => (
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
                  <h3 className="cat-gate-title">Unlock all {space!.name} artworks</h3>
                  <p className="cat-gate-sub">Sign up free to browse the full collection for your space.</p>
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

// ── PREVIEW MODAL ──────────────────────────────────────────────────────────────

function PreviewModal({ open, artwork, onClose, onPrev, onNext }: {
  open: boolean; artwork: ArtItem | null;
  onClose: () => void; onPrev: () => void; onNext: () => void;
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

// ── ROOT ───────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authOpen, setAuthOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [stylesPageOpen, setStylesPageOpen] = useState(false)
  const [spacePageOpen, setSpacePageOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIdx, setPreviewIdx] = useState(0)
  const [previewList, setPreviewList] = useState<ArtItem[]>(FEED_ARTWORKS)

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const openLogin = useCallback(() => { setAuthMode('login'); setAuthOpen(true) }, [])
  const openSignup = useCallback(() => { setAuthMode('signup'); setAuthOpen(true) }, [])

  const openPreview = useCallback((idx: number, list: ArtItem[]) => {
    setPreviewList(list); setPreviewIdx(idx); setPreviewOpen(true)
  }, [])

  const prevArt = useCallback(() => setPreviewIdx(i => (i - 1 + previewList.length) % previewList.length), [previewList.length])
  const nextArt = useCallback(() => setPreviewIdx(i => (i + 1) % previewList.length), [previewList.length])

  return (
    <>
      <Loader done={loaderDone} />
      <Nav
        onLogin={openLogin}
        onSignup={openSignup}
        onGallery={() => setGalleryOpen(true)}
        onStylesPage={() => setStylesPageOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
      />
      <main>
        <Hero onGallery={() => setGalleryOpen(true)} />
        <Marquee />
        <Collections onGallery={() => setGalleryOpen(true)} />
        <Spaces onSpacePage={() => setSpacePageOpen(true)} />
        <StylesSection onStylesPage={() => setStylesPageOpen(true)} />
        <ArtworkFeed onPreview={openPreview} onGallery={() => setGalleryOpen(true)} onLogin={openLogin} />
        <InSitu />
        <Testimonials />
        <Membership onSignup={openSignup} />
        <Licensing onSignup={openSignup} />
      </main>
      <Footer />

      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
        onSuccess={() => setIsLoggedIn(true)}
      />
      <GalleryPage
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onPreview={openPreview}
        onLogin={openLogin}
      />
      <StylesPageOverlay
        open={stylesPageOpen}
        onClose={() => setStylesPageOpen(false)}
        onLogin={openLogin}
      />
      <SpacePage
        open={spacePageOpen}
        onClose={() => setSpacePageOpen(false)}
        onLogin={openLogin}
      />
      <PreviewModal
        open={previewOpen}
        artwork={previewList[previewIdx] || null}
        onClose={() => setPreviewOpen(false)}
        onPrev={prevArt}
        onNext={nextArt}
      />
    </>
  )
}
