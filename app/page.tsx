'use client'

import { useState, useEffect, useCallback } from 'react'
import { type ArtItem, FEED_ARTWORKS } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

import Loader         from '@/components/Loader'
import Nav            from '@/components/Nav'
import Hero           from '@/components/Hero'
import Marquee        from '@/components/Marquee'
import Collections    from '@/components/Collections'
import Spaces         from '@/components/Spaces'
import StylesSection  from '@/components/StylesSection'
import ArtworkFeed    from '@/components/ArtworkFeed'
import InSitu         from '@/components/InSitu'
import Testimonials   from '@/components/Testimonials'
import Membership     from '@/components/Membership'
import Footer         from '@/components/Footer'
import AuthModal      from '@/components/AuthModal'
import GalleryPage    from '@/components/GalleryPage'
import StylesPage     from '@/components/StylesPage'
import SpacePage      from '@/components/SpacePage'
import PreviewModal   from '@/components/PreviewModal'

function Licensing({ onSignup }: { onSignup: () => void }) {
  return (
    <div className="licensing-outer">
      <div className="licensing-label">Licensing</div>
      <h2 className="licensing-title">Use it anywhere.<br />License it properly.</h2>
      <p className="licensing-sub">
        Every artwork on Paintora comes with a clear, straightforward license. From personal
        projects to commercial campaigns — we have you covered.
      </p>
      <button className="btn-dark" onClick={onSignup} style={{ fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none' }}>
        Explore licensing options
      </button>
    </div>
  )
}

export default function Home() {
  const [loaderDone, setLoaderDone]       = useState(false)
  const [authMode, setAuthMode]           = useState<'login' | 'signup'>('login')
  const [authOpen, setAuthOpen]           = useState(false)
  const [user, setUser]                   = useState<User | null>(null)
  const isLoggedIn = user !== null
  const [galleryOpen, setGalleryOpen]     = useState(false)
  const [stylesOpen, setStylesOpen]       = useState(false)
  const [spaceOpen, setSpaceOpen]         = useState(false)
  const [previewOpen, setPreviewOpen]     = useState(false)
  const [previewIdx, setPreviewIdx]       = useState(0)
  const [previewList, setPreviewList]     = useState<ArtItem[]>(FEED_ARTWORKS)

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const openLogin  = useCallback(() => { setAuthMode('login');  setAuthOpen(true) }, [])
  const openSignup = useCallback(() => { setAuthMode('signup'); setAuthOpen(true) }, [])

  const openPreview = useCallback((idx: number, list: ArtItem[]) => {
    setPreviewList(list)
    setPreviewIdx(idx)
    setPreviewOpen(true)
  }, [])

  const prevArt = useCallback(() => setPreviewIdx(i => (i - 1 + previewList.length) % previewList.length), [previewList.length])
  const nextArt = useCallback(() => setPreviewIdx(i => (i + 1) % previewList.length), [previewList.length])

  return (
    <>
      <Loader done={loaderDone} />

      <Nav
        onLogin={openLogin}
        onSignup={openSignup}
        onGallery={() => setGalleryOpen(true)}
        onStylesPage={() => setStylesOpen(true)}
        isLoggedIn={isLoggedIn}
        userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      <main>
        <Hero        onGallery={() => setGalleryOpen(true)} />
        <Marquee />
        <Collections onGallery={() => setGalleryOpen(true)} />
        <Spaces      onSpacePage={() => setSpaceOpen(true)} />
        <StylesSection onStylesPage={() => setStylesOpen(true)} />
        <ArtworkFeed onPreview={openPreview} onGallery={() => setGalleryOpen(true)} onLogin={openLogin} />
        <InSitu />
        <Testimonials />
        <Membership  onSignup={openSignup} />
        <Licensing   onSignup={openSignup} />
      </main>

      <Footer />

      {/* Modals & overlays */}
      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
        onSuccess={() => {}}
      />
      <GalleryPage
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onPreview={openPreview}
        onLogin={openLogin}
      />
      <StylesPage
        open={stylesOpen}
        onClose={() => setStylesOpen(false)}
        onLogin={openLogin}
      />
      <SpacePage
        open={spaceOpen}
        onClose={() => setSpaceOpen(false)}
        onLogin={openLogin}
      />
      <PreviewModal
        open={previewOpen}
        artwork={previewList[previewIdx] || null}
        onClose={() => setPreviewOpen(false)}
        onPrev={prevArt}
        onNext={nextArt}
      />
    </>
  )
}
