'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { FEED_ARTWORKS, GALLERY_IMGS } from '@/lib/data'
import type { ArtItem } from '@/lib/data'
import Img from '@/components/Img'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import UpgradeModal from '@/components/UpgradeModal'

const ALL: ArtItem[] = [...FEED_ARTWORKS, ...GALLERY_IMGS]

const PRICES: Record<number, string> = {
  1: '₹18,000', 2: '₹24,000', 3: '₹15,500', 4: '₹12,000',
  5: '₹21,000', 6: '₹32,000', 7: '₹19,500', 8: '₹28,000',
}

export default function PaintingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  const checkPro = async (userId: string) => {
    const { data } = await supabase.from('subscriptions').select('status, current_period_end').eq('user_id', userId).single()
    if (data?.status === 'active' && new Date(data.current_period_end) > new Date()) setIsPro(true)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) checkPro(u.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null
      setUser(u)
      if (u) checkPro(u.id)
    })
    return () => subscription.unsubscribe()
  }, [])

  const art = ALL.find(a => String(a.id) === id)
  const related = ALL.filter(a => a.style === art?.style && String(a.id) !== id).slice(0, 8)
  const similar = ALL.filter(a => String(a.id) !== id && a.style !== art?.style).slice(0, 8)

  if (!art) {
    return (
      <>
        <Nav onLogin={() => {}} onSignup={() => {}} onGallery={() => {}} onStylesPage={() => {}} isLoggedIn={false} onLogout={() => {}} />
        <main style={{ paddingTop: 68, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 28 }}>Painting not found</h1>
          <button className="btn-dark" onClick={() => router.push('/')} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Back to Home</button>
        </main>
        <Footer />
      </>
    )
  }

  const price = PRICES[art.id] ?? '₹16,000'

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

      <main className="painting-detail-main">
        {/* Main content */}
        <div className="painting-detail-grid">
          {/* Image */}
          <div className="painting-detail-img-wrap">
            <img
              src={art.img}
              alt={art.name}
              className={imgLoaded ? 'loaded' : ''}
              loading="eager"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
            />
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
              <button
                className="painting-download-btn"
                onClick={() => {
                  if (!user) { setAuthMode('signup'); setAuthOpen(true); return }
                  if (!isPro) { setUpgradeOpen(true); return }
                  window.open(art.img, '_blank')
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {isPro ? 'Download' : 'Download — Pro'}
              </button>
              <button
                className={`painting-save-btn-large${saved ? ' saved' : ''}`}
                onClick={() => { if (!user) { setAuthMode('login'); setAuthOpen(true); return } setSaved(s => !s) }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                {saved ? 'Saved' : 'Save to Collection'}
              </button>
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
                        <button className="artwork-view-btn">View Details</button>
                      </div>
                    </div>
                    <div className="artwork-info">
                      <span className="artwork-name">{a.name}</span>
                      <span className="artwork-style">{a.style}</span>
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
              <h2 className="section-title" style={{ fontSize: 'clamp(16px,2vw,22px)', marginBottom: '1.5rem' }}>You may also like</h2>
              <div className="feed-grid">
                {similar.map((a, i) => (
                  <a key={i} href={`/paintings/${a.id}`} className="artwork-card" style={{ textDecoration: 'none' }}>
                    <div className="artwork-img-wrap">
                      <Img src={a.img} alt={a.name} />
                      <div className="artwork-overlay">
                        <button className="artwork-view-btn">View Details</button>
                      </div>
                    </div>
                    <div className="artwork-info">
                      <span className="artwork-name">{a.name}</span>
                      <span className="artwork-style">{a.style}</span>
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

      {user && (
        <UpgradeModal
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          userId={user.id ?? ''}
          userEmail={user.email}
          onSuccess={() => setIsPro(true)}
        />
      )}
    </>
  )
}
