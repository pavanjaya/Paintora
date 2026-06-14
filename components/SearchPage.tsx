'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ALL_ARTWORKS } from '@/lib/browse-data'
import type { ArtItem } from '@/lib/browse-data'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const PAGE_SIZE = 16

const STYLE_OPTIONS   = ['Abstract', 'Minimalist', 'Contemporary', 'Impressionism', 'Geometric', 'Landscape']
const MEDIUM_OPTIONS  = ['Oil', 'Watercolor', 'Acrylic', 'Mixed Media']
const SUBJECT_OPTIONS = ['Landscape', 'Portrait', 'Floral', 'Still Life', 'Nature', 'Architecture']
const SORT_OPTIONS    = ['Trending', 'Newest', "Editor's Picks", 'Price: Low to High', 'Price: High to Low']

type FilterState = { style: string; medium: string; subject: string; sort: string }
type ActiveDropdown = 'style' | 'medium' | 'subject' | 'sort' | null

export default function SearchPage({ query }: { query: string }) {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filters, setFilters] = useState<FilterState>({ style: '', medium: '', subject: '', sort: 'Trending' })
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [query])

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
      if (!(e.target as Element).closest('.browse-filter-dropdown-wrap')) setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleSave = useCallback((id: number) => {
    if (!user) { setAuthMode('login'); setAuthOpen(true); return }
    setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }, [user])

  const artworks: ArtItem[] = ALL_ARTWORKS
  const visible = artworks.slice(0, visibleCount)
  const hasMore = visibleCount < artworks.length

  const setFilter = (key: keyof FilterState, val: string) => {
    setFilters(f => ({ ...f, [key]: f[key] === val ? '' : val }))
    setActiveDropdown(null)
    setVisibleCount(PAGE_SIZE)
  }

  const resetFilters = () => {
    setFilters({ style: '', medium: '', subject: '', sort: 'Trending' })
    setVisibleCount(PAGE_SIZE)
  }

  const hasActiveFilters = filters.style || filters.medium || filters.subject

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onGallery={() => {}}
        onStylesPage={() => {}}
        isLoggedIn={!!user}
        userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      <main className="browse-main">
        <div className="browse-header">
          <div className="browse-header-inner">
            <div className="browse-breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span>Search</span>
            </div>
            <h1 className="browse-title">
              {query ? `"${query}"` : 'All Paintings'}
            </h1>
            <span className="browse-count">{artworks.length}+ paintings</span>
          </div>
        </div>

        {/* Filter bar */}
        <div ref={filterBarRef} className={`browse-filter-bar${sticky ? ' sticky' : ''}`}>
          <div className="browse-filter-inner">
            <div className="browse-filter-dropdown-wrap">
              <button
                className={`browse-filter-btn${activeDropdown === 'sort' ? ' active' : ''}`}
                onClick={() => setActiveDropdown(v => v === 'sort' ? null : 'sort')}
              >
                {filters.sort} <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </button>
              {activeDropdown === 'sort' && (
                <div className="browse-dropdown">
                  {SORT_OPTIONS.map(o => (
                    <button key={o} className={`browse-dropdown-item${filters.sort === o ? ' selected' : ''}`} onClick={() => setFilter('sort', o)}>{o}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="browse-filter-divider" />

            <div className="browse-filter-dropdown-wrap">
              <button className={`browse-filter-btn${filters.style ? ' has-value' : ''}${activeDropdown === 'style' ? ' active' : ''}`} onClick={() => setActiveDropdown(v => v === 'style' ? null : 'style')}>
                {filters.style || 'Style'} <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </button>
              {activeDropdown === 'style' && (
                <div className="browse-dropdown">
                  {STYLE_OPTIONS.map(o => <button key={o} className={`browse-dropdown-item${filters.style === o ? ' selected' : ''}`} onClick={() => setFilter('style', o)}>{o}</button>)}
                </div>
              )}
            </div>

            <div className="browse-filter-dropdown-wrap">
              <button className={`browse-filter-btn${filters.medium ? ' has-value' : ''}${activeDropdown === 'medium' ? ' active' : ''}`} onClick={() => setActiveDropdown(v => v === 'medium' ? null : 'medium')}>
                {filters.medium || 'Medium'} <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </button>
              {activeDropdown === 'medium' && (
                <div className="browse-dropdown">
                  {MEDIUM_OPTIONS.map(o => <button key={o} className={`browse-dropdown-item${filters.medium === o ? ' selected' : ''}`} onClick={() => setFilter('medium', o)}>{o}</button>)}
                </div>
              )}
            </div>

            <div className="browse-filter-dropdown-wrap">
              <button className={`browse-filter-btn${filters.subject ? ' has-value' : ''}${activeDropdown === 'subject' ? ' active' : ''}`} onClick={() => setActiveDropdown(v => v === 'subject' ? null : 'subject')}>
                {filters.subject || 'Subject'} <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </button>
              {activeDropdown === 'subject' && (
                <div className="browse-dropdown">
                  {SUBJECT_OPTIONS.map(o => <button key={o} className={`browse-dropdown-item${filters.subject === o ? ' selected' : ''}`} onClick={() => setFilter('subject', o)}>{o}</button>)}
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button className="browse-filter-reset" onClick={resetFilters}>Clear filters</button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="browse-grid-section">
          <div className="feed-grid">
            {visible.map((art, i) => (
              <div key={`${art.id}-${i}`} className="artwork-card" onClick={() => router.push(`/paintings/${art.id}`)}>
                <div className="artwork-img-wrap">
                  <img
                    src={art.img}
                    alt={art.name}
                    ref={el => { if (el?.complete) el.classList.add('loaded') }}
                    onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')}
                  />
                  <div className="artwork-overlay">
                    <div className="artwork-overlay-top">
                      <button
                        className={`artwork-save-btn${saved.has(art.id) ? ' saved' : ''}`}
                        onClick={e => { e.stopPropagation(); toggleSave(art.id) }}
                        title={saved.has(art.id) ? 'Unsave' : 'Save'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={saved.has(art.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="artwork-overlay-bottom">
                      <div className="artwork-overlay-info">
                        <span className="artwork-overlay-name">{art.name}</span>
                        <span className="artwork-overlay-style">{art.style}</span>
                      </div>
                      <button className="artwork-view-btn" onClick={e => { e.stopPropagation(); router.push(`/paintings/${art.id}`) }}>View</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
