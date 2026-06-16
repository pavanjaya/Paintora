'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { fetchArtworkById, fetchArtworks } from '@/lib/artworks'
import { FEED_ARTWORKS, GALLERY_IMGS } from '@/lib/data'
import type { ArtItem } from '@/lib/data'
import Img from '@/components/Img'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import UpgradeModal from '@/components/UpgradeModal'

const DEFAULT_PRICE = '₹18,000'

export default function PaintingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [variant, setVariant] = useState<'vertical' | 'horizontal' | 'square' | 'space'>('vertical')
  const [art, setArt] = useState<ArtItem | null>(null)
  const [artLoading, setArtLoading] = useState(true)
  const [allArtworks, setAllArtworks] = useState<ArtItem[]>([...FEED_ARTWORKS, ...GALLERY_IMGS])

  const checkPro = async (userId: string) => {
    const { data } = await supabase.from('subscriptions').select('status, current_period_end').eq('user_id', userId).single()
    if (data?.status === 'active' && new Date(data.current_period_end) > new Date()) setIsPro(true)
  }

  const checkSaved = async (userId: string, artId: string) => {
    const { data } = await supabase.from('saves').select('id').eq('user_id', userId).eq('artwork_id', artId).maybeSingle()
    setSaved(!!data)
  }

  useEffect(() => {
    fetchArtworkById(id).then(a => {
      setArt(a)
      setArtLoading(false)
    })
    fetchArtworks().then(setAllArtworks)
  }, [id])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) { checkPro(u.id); checkSaved(u.id, id) }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null
      setUser(u)
      if (u) { checkPro(u.id); checkSaved(u.id, id) }
      else setSaved(false)
    })
    return () => subscription.unsubscribe()
  }, [id])

  const related = art ? allArtworks.filter(a => a.style === art.style && a.id !== id).slice(0, 8) : []
  const similar = art ? allArtworks.filter(a => a.id !== id && a.style !== art.style).slice(0, 8) : []

  if (artLoading) {
    return (
      <>
        <Nav onLogin={() => {}} onSignup={() => {}} onStylesPage={() => {}} isLoggedIn={false} onLogout={() => {}} />
        <main className="painting-detail-main">
          {/* breadcrumb skeleton */}
          <div className="painting-breadcrumb">
            <div className="skeleton" style={{ width: 32, height: 12, borderRadius: 4 }} />
            <span style={{ color: 'var(--border)' }}>›</span>
            <div className="skeleton" style={{ width: 60, height: 12, borderRadius: 4 }} />
            <span style={{ color: 'var(--border)' }}>›</span>
            <div className="skeleton" style={{ width: 120, height: 12, borderRadius: 4 }} />
          </div>
          {/* two-column grid skeleton */}
          <div className="painting-detail-grid">
            {/* image col */}
            <div className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 16, width: '100%' }} />
            {/* info col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
              <div className="skeleton" style={{ height: 13, width: '40%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 38, width: '85%', borderRadius: 6 }} />
              <div className="skeleton" style={{ height: 16, width: '60%', borderRadius: 4 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div className="skeleton" style={{ height: 10, width: '50%', borderRadius: 3 }} />
                    <div className="skeleton" style={{ height: 14, width: '70%', borderRadius: 3 }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <div className="skeleton" style={{ height: 48, flex: 1, borderRadius: 10 }} />
                <div className="skeleton" style={{ height: 48, flex: 1, borderRadius: 10 }} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!art) {
    return (
      <>
        <Nav onLogin={() => {}} onSignup={() => {}} onStylesPage={() => {}} isLoggedIn={false} onLogout={() => {}} />
        <main style={{ paddingTop: 68, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 28 }}>Painting not found</h1>
          <button className="btn-dark" onClick={() => router.push('/')} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Back to Home</button>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
       
        onStylesPage={() => {}}
        isLoggedIn={!!user}
        userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
        isPro={isPro}
      />

      <main className="painting-detail-main">
        {/* Breadcrumb */}
        <div className="painting-breadcrumb" role="navigation" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">›</span>
          <a href="/trending">Paintings</a>
          <span aria-hidden="true">›</span>
          <span>{art.name}</span>
        </div>

        {/* Main content */}
        <div className="painting-detail-grid">
          {/* Image + Variant Tabs */}
          <div className="painting-detail-img-col">
            <div className="painting-variant-tabs">
              {(['vertical', 'horizontal', 'square', 'space'] as const).map(v => (
                <button
                  key={v}
                  className={`painting-variant-tab${variant === v ? ' active' : ''}`}
                  onClick={() => setVariant(v)}
                >
                  {v === 'vertical' ? 'Vertical' : v === 'horizontal' ? 'Horizontal' : v === 'square' ? 'Square' : 'With Space'}
                </button>
              ))}
            </div>
            <div className={`painting-detail-img-wrap variant-${variant}`}>
              <img
                src={art.img}
                alt={art.name}
                className={imgLoaded ? 'loaded' : ''}
                loading="eager"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="painting-detail-info">
            <h1 className="painting-detail-title">{art.name}</h1>
            <p className="painting-detail-collection">{art.style} · Paintora Collection</p>

            {/* Metadata grid */}
            <div className="painting-detail-meta-grid">
              <div className="painting-meta-cell">
                <span className="painting-meta-cell-label">Resolution</span>
                <span className="painting-meta-cell-value">3000 × 4000px</span>
              </div>
              <div className="painting-meta-cell">
                <span className="painting-meta-cell-label">Format</span>
                <span className="painting-meta-cell-value">JPG / PNG</span>
              </div>
              <div className="painting-meta-cell">
                <span className="painting-meta-cell-label">License</span>
                <span className="painting-meta-cell-value">Commercial</span>
              </div>
              <div className="painting-meta-cell">
                <span className="painting-meta-cell-label">Style</span>
                <span className="painting-meta-cell-value">{art.style}</span>
              </div>
              {art.medium && (
                <div className="painting-meta-cell">
                  <span className="painting-meta-cell-label">Medium</span>
                  <span className="painting-meta-cell-value">{art.medium}</span>
                </div>
              )}
              {art.dim && (
                <div className="painting-meta-cell">
                  <span className="painting-meta-cell-label">Size</span>
                  <span className="painting-meta-cell-value">{art.dim}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="painting-detail-actions">
              <div className="painting-download-wrap">
                <div className="painting-download-row">
                  <button
                    className="painting-download-btn"
                    onClick={() => {
                      if (!user) { setAuthMode('login'); setAuthOpen(true); return }
                      setDownloadOpen(o => !o)
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 'auto' }}><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <button
                    className={`painting-save-btn-large${saved ? ' saved' : ''}`}
                    onClick={async () => {
                      if (!user) { setAuthMode('login'); setAuthOpen(true); return }
                      const next = !saved
                      setSaved(next)
                      if (next) {
                        await supabase.from('saves').upsert({ user_id: user.id!, artwork_id: id })
                      } else {
                        await supabase.from('saves').delete().eq('user_id', user.id!).eq('artwork_id', id)
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>

                {downloadOpen && (
                  <div className="download-size-panel">
                    {[
                      { label: 'Small',    fmt: 'JPG', res: '800 × 1067',   pro: false },
                      { label: 'Medium',   fmt: 'JPG', res: '1280 × 1707',  pro: false },
                      { label: 'Large',    fmt: 'JPG', res: '1920 × 2560',  pro: true  },
                      { label: 'Original', fmt: 'JPG', res: '3000 × 4000',  pro: true  },
                    ].map(({ label, fmt, res, pro }) => (
                      <button
                        key={label}
                        className="download-size-row"
                        onClick={async () => {
                          if (pro && !isPro) { setDownloadOpen(false); setUpgradeOpen(true); return }
                          setDownloadOpen(false)
                          try {
                            const blob = await fetch(art.img).then(r => r.blob())
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            a.download = `${art.name.replace(/\s+/g, '-').toLowerCase()}-${label.toLowerCase()}.jpg`
                            document.body.appendChild(a)
                            a.click()
                            document.body.removeChild(a)
                            URL.revokeObjectURL(url)
                          } catch {
                            // fallback for CORS-blocked URLs
                            window.open(art.img, '_blank')
                          }
                          if (user?.id) {
                            await supabase.from('downloads').insert({
                              user_id: user.id,
                              painting_id: art.id,
                              painting_name: art.name,
                              painting_img: art.img,
                              size: label,
                              downloaded_at: new Date().toISOString(),
                            })
                          }
                        }}
                      >
                        <span className="download-size-label">{label}</span>
                        <span className="download-size-fmt">{fmt}</span>
                        <span className="download-size-res">{res}</span>
                        {pro && !isPro && <span className="download-size-pro">Pro</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar paintings */}
        {related.length > 0 && (
          <section className="painting-related">
            <div className="painting-related-inner">
              <h2 className="section-title" style={{ fontSize: 'clamp(16px,2vw,22px)', marginBottom: '1.5rem' }}>Similar Paintings</h2>
              <div className="feed-grid">
                {related.map((a, i) => (
                  <a key={i} href={`/paintings/${a.id}`} className="artwork-card" style={{ textDecoration: 'none' }}>
                    <div className="artwork-img-wrap">
                      <Img src={a.img} alt={a.name} />
                      <div className="artwork-overlay">
                        <div className="artwork-overlay-top" />
                        <div className="artwork-overlay-bottom">
                          <div className="artwork-overlay-info">
                            <span className="artwork-overlay-name">{a.name}</span>
                            <span className="artwork-overlay-style">{a.style}</span>
                          </div>
                          <button className="artwork-overlay-dl">View Details</button>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* You may also like */}
        {similar.length > 0 && (
          <section className="painting-related">
            <div className="painting-related-inner">
              <h2 className="section-title" style={{ fontSize: 'clamp(16px,2vw,22px)', marginBottom: '1.5rem' }}>You May Also Like</h2>
              <div className="feed-grid">
                {similar.map((a, i) => (
                  <a key={i} href={`/paintings/${a.id}`} className="artwork-card" style={{ textDecoration: 'none' }}>
                    <div className="artwork-img-wrap">
                      <Img src={a.img} alt={a.name} />
                      <div className="artwork-overlay">
                        <div className="artwork-overlay-top" />
                        <div className="artwork-overlay-bottom">
                          <div className="artwork-overlay-info">
                            <span className="artwork-overlay-name">{a.name}</span>
                            <span className="artwork-overlay-style">{a.style}</span>
                          </div>
                          <button className="artwork-overlay-dl">View Details</button>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
        onSuccess={() => {}}
      />
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} userId={user?.id ?? ''} userEmail={user?.email} onSuccess={() => { setUpgradeOpen(false); setIsPro(true) }} />
    </>
  )
}
