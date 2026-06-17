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
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => { setCopied(false); setShareOpen(false) }, 2000)
  }, [])

  const shareLinks = [
    {
      label: 'Pinterest',
      href: () => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(data.title)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: () => `https://wa.me/?text=${encodeURIComponent(data.title + ' — ' + window.location.href)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      ),
    },
    {
      label: 'Facebook',
      href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      ),
    },
    {
      label: 'X (Twitter)',
      href: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(window.location.href)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
    },
  ]
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
              <div className="collection-share-wrap" ref={shareRef}>
                <button className="collection-share-btn" onClick={() => setShareOpen(o => !o)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Share
                </button>
                {shareOpen && (
                  <div className="collection-share-dropdown">
                    {shareLinks.map(s => (
                      <a key={s.label} href={s.href()} target="_blank" rel="noopener noreferrer" className="collection-share-option" onClick={() => setShareOpen(false)}>
                        {s.icon}
                        <span>{s.label}</span>
                      </a>
                    ))}
                    <button className="collection-share-option" onClick={copyLink}>
                      {copied
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      }
                      <span>{copied ? 'Copied!' : 'Copy link'}</span>
                    </button>
                  </div>
                )}
              </div>
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
