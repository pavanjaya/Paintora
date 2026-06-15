'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { DiscoverCategory, DiscoverItem } from '@/lib/discover-data'
import { getRelatedItems, DISCOVER_ARTWORKS, CATEGORY_LABELS } from '@/lib/discover-data'
import Nav from '@/components/Nav'
import Img from '@/components/Img'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const SORT_OPTIONS = ['Trending', 'Newest', "Editor's Picks", 'Alphabetical']
const FILTER_OPTIONS = {
  Style: ['Abstract', 'Minimalist', 'Contemporary', 'Impressionism', 'Geometric', 'Scandinavian'],
  Medium: ['Oil Painting', 'Watercolor', 'Acrylic', 'Mixed Media', 'Ink', 'Charcoal'],
  Subject: ['Landscape', 'Floral', 'Portrait', 'Nature', 'Architecture', 'Still Life'],
  Space: ['Living Room', 'Bedroom', 'Home Office', 'Law Office', 'Hotel Lobby', 'Restaurant'],
}

const PAGE_SIZE = 8

export default function DiscoverPage({
  item,
  category,
  slug,
}: {
  item: DiscoverItem
  category: DiscoverCategory
  slug: string
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [sort, setSort] = useState('Trending')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filterSticky, setFilterSticky] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const el = filterRef.current
    if (!el) return
    const top = el.offsetTop
    const handler = () => setFilterSticky(window.scrollY > top - 68)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openFilter && !(e.target as Element).closest('.discover-filter-dropdown-wrap')) {
        setOpenFilter(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openFilter])

  const catLabel = CATEGORY_LABELS[category]
  const relatedItems = getRelatedItems(item.related)

  const toggleFilter = (key: string, val: string) => {
    setActiveFilters(prev => {
      const next = { ...prev }
      if (next[key] === val) delete next[key]
      else next[key] = val
      return next
    })
  }

  const hasFilters = Object.keys(activeFilters).length > 0

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onStylesPage={() => router.push('/')}
        isLoggedIn={!!user}
        userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      {/* ── HERO BANNER ── */}
      <div className="discover-hero">
        <img src={item.heroImg} alt={item.title} className="discover-hero-bg" onLoad={e => (e.target as HTMLImageElement).classList.add('loaded')} />
        <div className="discover-hero-overlay" />
        <div className="discover-hero-content">
          {/* Breadcrumb */}
          <div className="discover-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>Discover</span>
            <span>/</span>
            <span>{catLabel}</span>
            <span>/</span>
            <span>{item.title}</span>
          </div>
          <h1 className="discover-hero-title">{item.title}</h1>
          <p className="discover-hero-desc">{item.description}</p>
          <div className="discover-hero-count">{item.count}</div>
          {/* Related quick nav */}
          <div className="discover-hero-related">
            {item.related.map(r => (
              <a key={r.slug} href={`/discover/${r.category}/${r.slug}`} className="discover-hero-pill">
                {r.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div ref={filterRef} className={`discover-filter-bar${filterSticky ? ' sticky' : ''}`}>
        <div className="discover-filter-inner">
          {/* Sort */}
          <div className="discover-filter-dropdown-wrap">
            <button className="discover-filter-btn" onClick={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}>
              Sort: {sort}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {openFilter === 'sort' && (
              <div className="discover-dropdown">
                {SORT_OPTIONS.map(o => (
                  <button key={o} className={`discover-dropdown-item${sort === o ? ' active' : ''}`} onClick={() => { setSort(o); setOpenFilter(null) }}>{o}</button>
                ))}
              </div>
            )}
          </div>

          <div className="discover-filter-divider" />

          {/* Filters */}
          {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
            <div key={key} className="discover-filter-dropdown-wrap">
              <button
                className={`discover-filter-btn${activeFilters[key] ? ' active' : ''}`}
                onClick={() => setOpenFilter(openFilter === key ? null : key)}
              >
                {activeFilters[key] ?? key}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {openFilter === key && (
                <div className="discover-dropdown">
                  {options.map(o => (
                    <button
                      key={o}
                      className={`discover-dropdown-item${activeFilters[key] === o ? ' active' : ''}`}
                      onClick={() => { toggleFilter(key, o); setOpenFilter(null) }}
                    >{o}</button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {hasFilters && (
            <button className="discover-filter-reset" onClick={() => setActiveFilters({})}>Reset</button>
          )}
        </div>
      </div>

      {/* ── PAINTING GRID ── */}
      <div style={{ padding: '3rem 1.5rem 4rem', maxWidth: 1280, margin: '0 auto' }}>
        <div className="feed-grid">
          {DISCOVER_ARTWORKS.slice(0, visibleCount).map((a, i) => (
            <div key={a.id ?? i} className="artwork-card">
              <div className="artwork-img-wrap">
                <Img src={a.img} alt={a.name} />
                <div className="artwork-overlay">
                  <div className="artwork-overlay-top">
                    <button className="artwork-action" onClick={e => { e.stopPropagation(); if (!user) { setAuthMode('login'); setAuthOpen(true) } }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </button>
                  </div>
                  <div className="artwork-overlay-bottom">
                    <div className="artwork-overlay-info">
                      <span className="artwork-overlay-name">{a.name}</span>
                      <span className="artwork-overlay-style">{a.style}</span>
                    </div>
                    <button className="artwork-overlay-dl">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < DISCOVER_ARTWORKS.length && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
              style={{ fontFamily: 'var(--sans)', cursor: 'pointer', background: 'none', border: '1.5px solid var(--border)', borderRadius: 24, padding: '12px 36px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Load More Paintings
            </button>
          </div>
        )}
      </div>

      {/* ── CONTINUE EXPLORING ── */}
      <div style={{ background: 'var(--bg-soft)', padding: '4rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-head" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Continue exploring.</h2>
            </div>
          </div>
          <div className="collections-grid">
            {relatedItems.map((r, i) => (
              <a key={i} href={`/discover/${r.category}/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div className="collection-card">
                  <Img src={r.heroImg} alt={r.title} />
                  <div className="col-overlay">
                    <div>
                      <div className="col-title">{r.title}</div>
                      <div className="col-name">{CATEGORY_LABELS[r.category]}</div>
                    </div>
                    <div className="col-footer">
                      <span className="col-count">{r.count}</span>
                      <span className="col-arrow">→</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
        onSuccess={() => setAuthOpen(false)}
      />
    </>
  )
}
