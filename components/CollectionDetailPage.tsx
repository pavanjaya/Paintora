'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { fetchArtworks } from '@/lib/artworks'
import type { ArtItem } from '@/lib/browse-data'
import Img from '@/components/Img'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const PAGE_SIZE = 16
const FREE_LIMIT = 12

export type CollectionData = {
  slug: string
  emoji: string
  title: string
  description: string
  about: string
  count: number
  tag: string
}

export default function CollectionDetailPage({ data }: { data: CollectionData }) {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: data.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [data.title])
  const [artworks, setArtworks] = useState<ArtItem[] | undefined>(undefined)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: s }) => {
      const u = s.session?.user ?? null
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

  useEffect(() => { fetchArtworks().then(setArtworks) }, [])

  const toggleSave = useCallback(async (id: string) => {
    if (!user) { setAuthMode('login'); setAuthOpen(true); return }
    const isSaved = saved.has(id)
    setSaved(prev => { const n = new Set(prev); isSaved ? n.delete(id) : n.add(id); return n })
    if (isSaved) {
      await supabase.from('saves').delete().eq('user_id', (user as any).id).eq('artwork_id', id)
    } else {
      await supabase.from('saves').upsert({ user_id: (user as any).id, artwork_id: id })
    }
  }, [user, saved])

  const isLoading = artworks === undefined
  const list = artworks ?? []
  const gated = !user && list.length > FREE_LIMIT
  const visible = gated ? list.slice(0, FREE_LIMIT) : list.slice(0, visibleCount)
  const hasMore = !gated && visibleCount < list.length

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
            <div className="collection-detail-tag">{data.tag}</div>
            <h1 className="browse-title">{data.title}</h1>
            <p className="browse-desc">{data.description}</p>
            {data.about && <p className="collection-detail-about">{data.about}</p>}
            <div className="collection-detail-meta">
              <span className="browse-count">{data.count} paintings</span>
              <button className="collection-share-btn" onClick={handleShare} title="Share collection">
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Link copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    Share
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="browse-grid-section">
          <div className="feed-grid">
            {isLoading
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
            }
          </div>

          {gated && (
            <div className="browse-login-gate">
              <div className="browse-gate-blur" />
              <div className="browse-gate-content">
                <div className="browse-gate-lock">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 className="browse-gate-title">Log in to see more</h3>
                <p className="browse-gate-sub">Explore the full collection — {list.length}+ curated contemporary works.</p>
                <div className="browse-gate-actions">
                  <button className="browse-gate-cta-primary" onClick={() => { setAuthMode('signup'); setAuthOpen(true) }}>Create free account</button>
                  <button className="browse-gate-cta-secondary" onClick={() => { setAuthMode('login'); setAuthOpen(true) }}>Log in</button>
                </div>
              </div>
            </div>
          )}

          {hasMore && (
            <div className="browse-load-more">
              <button className="btn-outline" onClick={() => setVisibleCount(v => v + PAGE_SIZE)}>
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
