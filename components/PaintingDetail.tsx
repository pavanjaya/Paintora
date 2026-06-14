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

const ALL: ArtItem[] = [...FEED_ARTWORKS, ...GALLERY_IMGS]

const PRICES: Record<number, string> = {
  1: '₹18,000', 2: '₹24,000', 3: '₹15,500', 4: '₹12,000',
  5: '₹21,000', 6: '₹32,000', 7: '₹19,500', 8: '₹28,000',
}

export default function PaintingDetail({ id }: { id: string }) {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
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
        {/* Breadcrumb */}
        <div className="painting-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href={`/styles/${art.style.toLowerCase().replace(/\s+/g, '-')}`}>{art.style}</a>
          <span>/</span>
          <span>{art.name}</span>
        </div>

        {/* Main content */}
        <div className="painting-detail-grid">
          {/* Image */}
          <div className="painting-detail-img-wrap">
            <img
              src={art.img}
              alt={art.name}
              className={imgLoaded ? 'loaded' : ''}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Info panel */}
          <div className="painting-detail-info">
            <span className="painting-detail-style">{art.style}</span>
            <h1 className="painting-detail-title">{art.name}</h1>
            <div className="painting-detail-price">{price}</div>

            <div className="painting-detail-meta">
              {art.medium && <div className="painting-meta-row"><span>Medium</span><span>{art.medium}</span></div>}
              {art.dim    && <div className="painting-meta-row"><span>Size</span><span>{art.dim}</span></div>}
              <div className="painting-meta-row"><span>Style</span><span>{art.style}</span></div>
            </div>

            <p className="painting-detail-desc">
              A stunning piece that brings depth and character to any interior. Perfect for executive offices, legal firms, and refined living spaces. Arrives ready to hang with a certificate of authenticity.
            </p>

            <div className="painting-detail-actions">
              <button className="btn-dark painting-detail-cta" style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', flex: 1 }}>
                Enquire Now
              </button>
              <button
                className={`painting-save-large${saved ? ' saved' : ''}`}
                onClick={() => { if (!user) { setAuthMode('login'); setAuthOpen(true); return } setSaved(s => !s) }}
                title={saved ? 'Unsave' : 'Save'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
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
    </>
  )
}
