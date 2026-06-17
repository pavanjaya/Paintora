'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { fetchArtworks } from '@/lib/artworks'
import { ALL_ARTWORKS, type BrowsePageData, type BrowseCategory, CATEGORY_LABELS } from '@/lib/browse-data'
import type { ArtItem } from '@/lib/browse-data'
import Img from '@/components/Img'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const PAGE_SIZE = 16
const FREE_LIMIT = 12

const ORIENTATION_OPTIONS = ['Any', 'Horizontal', 'Vertical', 'Square']
const SORT_OPTIONS   = ['Trending', 'Newest', "Editor's Picks", 'Price: Low to High', 'Price: High to Low']

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

type FilterState = {
  orientation: string
  color: string
  blackAndWhite: boolean
  sort: string
}

type ActiveDropdown = 'filters' | null

export default function BrowsePage({
  data,
  category,
}: {
  data: BrowsePageData
  category: BrowseCategory
}) {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [dbArtworks, setDbArtworks] = useState<ArtItem[] | undefined>(undefined)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filters, setFilters] = useState<FilterState>({ orientation: 'Any', color: '', blackAndWhite: false, sort: 'Trending' })
  const [pending, setPending] = useState<FilterState>({ orientation: 'Any', color: '', blackAndWhite: false, sort: 'Trending' })
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)

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

  useEffect(() => { fetchArtworks().then(setDbArtworks) }, [])

  const toggleSave = useCallback(async (id: string) => {
    if (!user) { setAuthMode('login'); setAuthOpen(true); return }
    const isSaved = saved.has(id)
    setSaved(prev => { const n = new Set(prev); isSaved ? n.delete(id) : n.add(id); return n })
    if (isSaved) {
      await supabase.from('saves').delete().eq('user_id', (user as { id?: string }).id!).eq('artwork_id', id)
    } else {
      await supabase.from('saves').upsert({ user_id: (user as { id?: string }).id!, artwork_id: id })
    }
  }, [user, saved])

  const isLoading = dbArtworks === undefined
  const artworks: ArtItem[] = dbArtworks ?? []
  const filtered = filters.orientation && filters.orientation !== 'Any'
    ? artworks.filter(a => a.orientation === filters.orientation)
    : artworks
  const gated = !user && filtered.length > FREE_LIMIT
  const visibleArtworks = gated ? filtered.slice(0, FREE_LIMIT) : filtered.slice(0, visibleCount)
  const visible = visibleArtworks
  const hasMore = !gated && visibleCount < filtered.length

  const setFilter = (key: keyof FilterState, val: string) => {
    setFilters(f => ({ ...f, [key]: f[key] === val ? '' : val }))
    setActiveDropdown(null)
    setVisibleCount(PAGE_SIZE)
  }

  const resetFilters = () => {
    const empty = { orientation: 'Any', color: '', blackAndWhite: false, sort: 'Trending' }
    setFilters(empty)
    setPending(empty)
    setVisibleCount(PAGE_SIZE)
  }

  const applyFilters = () => {
    setFilters(pending)
    setVisibleCount(PAGE_SIZE)
    setActiveDropdown(null)
  }

  const openFilters = () => {
    setPending(filters) // sync panel to current applied state
    setActiveDropdown(v => v === 'filters' ? null : 'filters')
  }

  const hasActiveFilters = (filters.orientation && filters.orientation !== 'Any') || filters.color || filters.blackAndWhite

  const gridContent = isLoading
    ? Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text short" />
        </div>
      ))
    : visible.map((art, i) => (
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
      ))

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
        {/* Page header */}
        <div className="browse-header">
          <div className="browse-header-inner">
            <h1 className="browse-title">{data.title} Paintings</h1>
            <p className="browse-desc">{data.description}</p>
            <span className="browse-count">{data.count} paintings</span>
          </div>
        </div>

        {/* Combined popular tags + filter bar */}
        <div ref={filterBarRef} className={`browse-filter-bar${sticky ? ' sticky' : ''}`}>
          <div className="browse-filter-inner">
            <div className="browse-tags-scroll">
              {data.relatedLinks.map(l => (
                <Link key={l.href} href={l.href} className="browse-popular-tag">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="browse-filter-right">
              <button
                className={`browse-filter-toggle${activeDropdown === 'filters' ? ' active' : ''}`}
                onClick={openFilters}
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
                      className={`browse-filter-orient-btn${pending.orientation === o ? ' active' : ''}`}
                      onClick={() => setPending(f => ({ ...f, orientation: o }))}
                    >
                      {o === 'Any'
                        ? <span className="browse-orient-icon browse-orient-icon--any"><span /><span /><span /><span /></span>
                        : <span className={`browse-orient-icon browse-orient-icon--${o.toLowerCase()}`} />
                      }
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="browse-filter-panel-footer">
                <button className="browse-filter-clear" onClick={resetFilters}>Clear all</button>
                <button className="browse-filter-apply" onClick={applyFilters}>Apply</button>
              </div>
            </div>
          )}
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="browse-active-filters">
            {filters.orientation !== 'Any' && (
              <span className="browse-active-chip">
                {filters.orientation}
                <button onClick={() => setFilters(f => ({ ...f, orientation: 'Any' }))}>×</button>
              </span>
            )}
            {filters.color && (() => {
              const c = COLOR_OPTIONS.find(c => c.value === filters.color)
              return (
                <span className="browse-active-chip">
                  <span className="browse-active-chip-dot" style={{ background: c?.hex, border: filters.color === 'white' ? '1px solid #e0e0e0' : 'none' }} />
                  {c?.label}
                  <button onClick={() => setFilters(f => ({ ...f, color: '' }))}>×</button>
                </span>
              )
            })()}
            {filters.blackAndWhite && (
              <span className="browse-active-chip">
                Black & white
                <button onClick={() => setFilters(f => ({ ...f, blackAndWhite: false }))}>×</button>
              </span>
            )}
            <button className="browse-active-clear" onClick={resetFilters}>Clear all</button>
          </div>
        )}

        {/* Painting grid */}
        <div className="browse-grid-section">
          <div className="feed-grid">
            {gridContent}
          </div>

          {gated && (
            <div className="browse-login-gate">
              <div className="browse-gate-blur" />
              <div className="browse-gate-content">
                <div className="browse-gate-lock">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 className="browse-gate-title">Log in to see more</h3>
                <p className="browse-gate-sub">Explore the full collection — {artworks.length}+ curated contemporary works, high-resolution downloads, and more.</p>
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
