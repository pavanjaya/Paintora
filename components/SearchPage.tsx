'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { searchArtworks } from '@/lib/artworks'
import { ALL_ARTWORKS } from '@/lib/browse-data'
import type { ArtItem } from '@/lib/browse-data'
import Img from '@/components/Img'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const PAGE_SIZE = 16
const FREE_LIMIT = 12


export default function SearchPage({ query }: { query: string }) {
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [dbArtworks, setDbArtworks] = useState<ArtItem[] | undefined>(undefined)

  useEffect(() => {
    setDbArtworks(undefined)
    searchArtworks(query).then(setDbArtworks)
  }, [query])
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

  // Clean query for display: remove "paintings", "painting", "for" so title reads naturally
  const displayQuery = query
    .replace(/\bpaintings?\b/gi, '')
    .replace(/\bfor\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  const isLoading = dbArtworks === undefined
  const artworks: ArtItem[] = dbArtworks ?? []
  const gated = !user && artworks.length > FREE_LIMIT
  const visible = gated ? artworks.slice(0, FREE_LIMIT) : artworks.slice(0, visibleCount)
  const hasMore = !gated && visibleCount < artworks.length
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
            <h1 className="browse-title">{displayQuery ? `${displayQuery} Paintings` : 'All Paintings'}</h1>
            {displayQuery && <p className="browse-desc">Browse curated paintings matching &ldquo;{displayQuery}&rdquo;.</p>}
            <span className="browse-count">{artworks.length} paintings</span>
          </div>
        </div>

        <div className="browse-grid-section">
          {isLoading && (
            <div className="feed-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text short" />
                </div>
              ))}
            </div>
          )}
          {!isLoading && artworks.length === 0 && (
            <div className="browse-empty-state">
              <p className="browse-empty-icon">🎨</p>
              <h2 className="browse-empty-title">No paintings found for &ldquo;{displayQuery}&rdquo;</h2>
              <p className="browse-empty-sub">Try a different style, space, or artist name.</p>
              <Link href="/" className="browse-empty-cta">Browse all paintings</Link>
            </div>
          )}
          {!isLoading && (
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
          )}

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
