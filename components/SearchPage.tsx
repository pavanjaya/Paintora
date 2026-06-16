'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { fetchArtworks } from '@/lib/artworks'
import { ALL_ARTWORKS } from '@/lib/browse-data'
import type { ArtItem } from '@/lib/browse-data'
import Img from '@/components/Img'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const PAGE_SIZE = 16
const FREE_LIMIT = 12

const ORIENTATION_OPTIONS = ['Any', 'Horizontal', 'Vertical', 'Square']
const COLOR_OPTIONS = [
  { label: 'Red',    value: 'red',    hex: '#E53935' },
  { label: 'Orange', value: 'orange', hex: '#FB8C00' },
  { label: 'Yellow', value: 'yellow', hex: '#FDD835' },
  { label: 'Green',  value: 'green',  hex: '#43A047' },
  { label: 'Cyan',   value: 'cyan',   hex: '#26C6DA' },
  { label: 'Blue',   value: 'blue',   hex: '#1E40FF' },
  { label: 'Purple', value: 'purple', hex: '#8E24AA' },
  { label: 'Pink',   value: 'pink',   hex: '#F48FB1' },
  { label: 'White',  value: 'white',  hex: '#FFFFFF' },
  { label: 'Gray',   value: 'gray',   hex: '#9E9E9E' },
  { label: 'Black',  value: 'black',  hex: '#1A1A1A' },
  { label: 'Brown',  value: 'brown',  hex: '#8D6E63' },
]

type FilterState = { orientation: string; color: string; blackAndWhite: boolean }
type ActiveDropdown = 'filters' | null

// Related searches shown as chips below the title
const RELATED: Record<string, string[]> = {
  'pour painting':    ['Fluid Art', 'Acrylic', 'Abstract', 'Colorful', 'Texture'],
  'acrylic abstract': ['Bold Colors', 'Abstract', 'Contemporary', 'Geometric', 'Textured'],
  'oil on canvas':    ['Realism', 'Impressionism', 'Portrait', 'Landscape', 'Still Life'],
  'minimalist':       ['Line Art', 'Monochrome', 'Geometric', 'Scandinavian', 'White Space'],
  'landscape':        ['Mountain', 'Ocean', 'Forest', 'Countryside', 'Sky'],
  'floral':           ['Roses', 'Botanical', 'Wildflowers', 'Peonies', 'Abstract Floral'],
}

function getRelated(q: string): string[] {
  const key = q.toLowerCase()
  for (const [k, v] of Object.entries(RELATED)) {
    if (key.includes(k) || k.includes(key)) return v
  }
  return ['Abstract', 'Minimalist', 'Landscape', 'Floral', 'Contemporary']
}

export default function SearchPage({ query }: { query: string }) {
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filters, setFilters] = useState<FilterState>({ orientation: 'Any', color: '', blackAndWhite: false })
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)
  const [dbArtworks, setDbArtworks] = useState<ArtItem[]>(ALL_ARTWORKS)

  useEffect(() => { fetchArtworks().then(setDbArtworks) }, [])
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [query])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) {
        const { data: rows } = await supabase.from('saves').select('artwork_id').eq('user_id', u.id)
        if (rows) setSaved(new Set(rows.map((r: { artwork_id: string }) => r.artwork_id)))
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, s) => {
      const u = s?.user ?? null
      setUser(u)
      if (u) {
        const { data: rows } = await supabase.from('saves').select('artwork_id').eq('user_id', u.id)
        if (rows) setSaved(new Set(rows.map((r: { artwork_id: string }) => r.artwork_id)))
      } else {
        setSaved(new Set())
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const bar = filterBarRef.current
    if (!bar) return
    const threshold = bar.offsetTop
    const onScroll = () => setSticky(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.browse-filter-bar')) setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleSave = useCallback(async (id: string) => {
    if (!user) { setAuthMode('login'); setAuthOpen(true); return }
    const isSaved = saved.has(id)
    setSaved(prev => { const n = new Set(prev); isSaved ? n.delete(id) : n.add(id); return n })
    if (isSaved) {
      await supabase.from('saves').delete().eq('user_id', user.id!).eq('artwork_id', id)
    } else {
      await supabase.from('saves').upsert({ user_id: user.id!, artwork_id: id })
    }
  }, [user, saved])

  const artworks: ArtItem[] = query.trim()
    ? dbArtworks.filter(a => {
        const q = query.toLowerCase()
        return a.name.toLowerCase().includes(q) || a.style.toLowerCase().includes(q) || (a.medium ?? '').toLowerCase().includes(q)
      })
    : dbArtworks

  const gated = !user && artworks.length > FREE_LIMIT
  const visible = gated ? artworks.slice(0, FREE_LIMIT) : artworks.slice(0, visibleCount)
  const hasMore = !gated && visibleCount < artworks.length
  const hasActiveFilters = (filters.orientation && filters.orientation !== 'Any') || filters.color || filters.blackAndWhite
  const relatedSearches = getRelated(query)

  const resetFilters = () => setFilters({ orientation: 'Any', color: '', blackAndWhite: false })

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onStylesPage={() => {}}
        isLoggedIn={!!user}
        userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      <main className="browse-main">
        <div className="browse-header">
          <div className="browse-header-inner">
            <h1 className="browse-title">{query ? `${query} Paintings` : 'All Paintings'}</h1>
            {query && <p className="browse-desc">Browse curated paintings matching &ldquo;{query}&rdquo;.</p>}
            <span className="browse-count">{artworks.length} paintings</span>
          </div>
        </div>

        <div ref={filterBarRef} className={`browse-filter-bar${sticky ? ' sticky' : ''}`}>
          <div className="browse-filter-inner">
            <div className="browse-tags-scroll">
              {relatedSearches.map(q => (
                <Link key={q} href={`/search?q=${encodeURIComponent(q)}`} className={`browse-popular-tag${query === q ? ' active' : ''}`}>
                  {q}
                </Link>
              ))}
            </div>
            <div className="browse-filter-right">
              <button
                className={`browse-filter-toggle${activeDropdown === 'filters' ? ' active' : ''}`}
                onClick={() => setActiveDropdown(v => v === 'filters' ? null : 'filters')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                Filters
                {hasActiveFilters && (
                  <span className="browse-filter-badge">
                    {[filters.orientation !== 'Any' ? filters.orientation : '', filters.color, filters.blackAndWhite ? 'bw' : ''].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {activeDropdown === 'filters' && (
            <div className="browse-filter-panel">
              <div className="browse-filter-panel-group">
                <div className="browse-filter-panel-label">Orientation</div>
                <div className="browse-filter-orientation-grid">
                  {ORIENTATION_OPTIONS.map(o => (
                    <button
                      key={o}
                      className={`browse-filter-orient-btn${filters.orientation === o ? ' active' : ''}`}
                      onClick={() => setFilters(f => ({ ...f, orientation: o }))}
                    >
                      {o !== 'Any' && <span className={`browse-orient-icon browse-orient-icon--${o.toLowerCase()}`} />}
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="browse-filter-panel-group">
                <div className="browse-filter-panel-label">Color</div>
                <div className="browse-filter-color-checks">
                  <label className="browse-filter-check-row">
                    <span>Black and white</span>
                    <input type="checkbox" checked={filters.blackAndWhite} onChange={e => setFilters(f => ({ ...f, blackAndWhite: e.target.checked }))} />
                  </label>
                </div>
                <div className="browse-filter-color-swatches">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c.value}
                      title={c.label}
                      className={`browse-filter-swatch${filters.color === c.value ? ' active' : ''}`}
                      style={{ background: c.hex, border: c.value === 'white' ? '1.5px solid #e0e0e0' : 'none' }}
                      onClick={() => setFilters(f => ({ ...f, color: f.color === c.value ? '' : c.value }))}
                    />
                  ))}
                </div>
              </div>
              <div className="browse-filter-panel-footer">
                <button className="browse-filter-clear" onClick={resetFilters}>Clear all</button>
                <button className="browse-filter-apply" onClick={() => setActiveDropdown(null)}>Apply</button>
              </div>
            </div>
          )}
        </div>

        <div className="browse-grid-section">
          {artworks.length === 0 && (
            <div className="browse-empty-state">
              <p className="browse-empty-icon">🎨</p>
              <h2 className="browse-empty-title">No paintings found for &ldquo;{query}&rdquo;</h2>
              <p className="browse-empty-sub">Try a different style, space, or artist name.</p>
              <Link href="/" className="browse-empty-cta">Browse all paintings</Link>
            </div>
          )}
          <div className="feed-grid">
            {visible.map((art, i) => (
              <Link key={`${i}-${art.img}`} href={`/paintings/${art.id}`} className="artwork-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="artwork-img-wrap">
                  <Img src={art.img} alt={art.name} />
                  <div className="artwork-overlay">
                    <div className="artwork-overlay-top">
                      <button
                        className={`artwork-save-btn${saved.has(art.id) ? ' saved' : ''}`}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); toggleSave(art.id) }}
                        title={saved.has(art.id) ? 'Unsave' : 'Save'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={saved.has(art.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="artwork-overlay-bottom">
                      <div className="artwork-overlay-info">
                        <span className="artwork-overlay-name">{art.name}</span>
                        <span className="artwork-overlay-style">{art.style}</span>
                      </div>
                      <span className="artwork-view-btn">View</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {gated && (
            <div className="browse-login-gate">
              <div className="browse-gate-blur" />
              <div className="browse-gate-content">
                <div className="browse-gate-lock">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 className="browse-gate-title">Log in to see more</h3>
                <p className="browse-gate-sub">Explore the full collection — {artworks.length}+ curated contemporary works.</p>
                <div className="browse-gate-actions">
                  <button className="browse-gate-cta-primary" onClick={() => { setAuthMode('signup'); setAuthOpen(true) }}>Create free account</button>
                  <button className="browse-gate-cta-secondary" onClick={() => { setAuthMode('login'); setAuthOpen(true) }}>Log in</button>
                </div>
              </div>
            </div>
          )}

          {hasMore && (
            <div className="browse-load-more">
              <button className="btn-outline" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
                Load more paintings
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
        onSuccess={() => {}}
      />
    </>
  )
}
