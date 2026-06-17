'use client'

import { useState, useEffect, useCallback } from 'react'
import { type ArtItem, FEED_ARTWORKS } from '@/lib/data'
import { fetchFeedArtworks } from '@/lib/artworks'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

import Nav                 from '@/components/Nav'
import Hero                from '@/components/Hero'
import TrendingPaintings   from '@/components/TrendingPaintings'
import SpacesGrid          from '@/components/SpacesGrid'
import FeaturedCollections from '@/components/FeaturedCollections'
import ExploreArt          from '@/components/ExploreArt'
import InSitu              from '@/components/InSitu'
import Testimonials        from '@/components/Testimonials'
import FinalCTA            from '@/components/FinalCTA'
import Footer              from '@/components/Footer'
import AuthModal      from '@/components/AuthModal'
import StylesPage     from '@/components/StylesPage'
import SpacePage      from '@/components/SpacePage'
import PreviewModal   from '@/components/PreviewModal'


export default function Home() {
  const [authMode, setAuthMode]           = useState<'login' | 'signup'>('login')
  const [authOpen, setAuthOpen]           = useState(false)
  const [user, setUser]                   = useState<User | null>(null)
  const [savedIds, setSavedIds]           = useState<Set<string>>(new Set())
  const isLoggedIn = user !== null
  const [isPro, setIsPro]                 = useState(false)
  const [artworks, setArtworks]           = useState<ArtItem[] | undefined>(undefined)
  const [stylesOpen, setStylesOpen]       = useState(false)
  const [spaceOpen, setSpaceOpen]         = useState(false)
  const [previewOpen, setPreviewOpen]     = useState(false)
  const [previewIdx, setPreviewIdx]       = useState(0)
  const [previewList, setPreviewList]     = useState<ArtItem[]>(FEED_ARTWORKS)

  const loadSaves = async (userId: string) => {
    const { data } = await supabase.from('saves').select('artwork_id').eq('user_id', userId)
    if (data) setSavedIds(new Set(data.map((r: { artwork_id: string }) => r.artwork_id)))
  }

  useEffect(() => {
    fetchFeedArtworks().then(setArtworks)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) {
        loadSaves(u.id)
        const { data: sub } = await supabase.from('subscriptions').select('status, current_period_end').eq('user_id', u.id).single()
        setIsPro(sub?.status === 'active' && new Date(sub.current_period_end) > new Date())
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        loadSaves(u.id)
        const { data: sub } = await supabase.from('subscriptions').select('status, current_period_end').eq('user_id', u.id).single()
        setIsPro(sub?.status === 'active' && new Date(sub.current_period_end) > new Date())
      } else {
        setSavedIds(new Set())
        setIsPro(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const openLogin  = useCallback(() => { setAuthMode('login');  setAuthOpen(true) }, [])
  const openSignup = useCallback(() => { setAuthMode('signup'); setAuthOpen(true) }, [])

  const toggleSave = useCallback(async (id: string) => {
    if (!user) { setAuthMode('login'); setAuthOpen(true); return }
    const isSaved = savedIds.has(id)
    setSavedIds(prev => { const n = new Set(prev); isSaved ? n.delete(id) : n.add(id); return n })
    if (isSaved) {
      await supabase.from('saves').delete().eq('user_id', user.id).eq('artwork_id', id)
    } else {
      await supabase.from('saves').upsert({ user_id: user.id, artwork_id: id })
    }
  }, [user, savedIds])

  const openPreview = useCallback((idx: number, list: ArtItem[]) => {
    setPreviewList(list)
    setPreviewIdx(idx)
    setPreviewOpen(true)
  }, [])

  const prevArt = useCallback(() => setPreviewIdx(i => (i - 1 + previewList.length) % previewList.length), [previewList.length])
  const nextArt = useCallback(() => setPreviewIdx(i => (i + 1) % previewList.length), [previewList.length])

  return (
    <>
      <Nav
        onLogin={openLogin}
        onSignup={openSignup}
        onStylesPage={() => setStylesOpen(true)}
        isLoggedIn={isLoggedIn}
        userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
        isPro={isPro}
      />

      <main>
        <Hero userName={user ? (user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]) : undefined} />
        <TrendingPaintings   artworks={artworks} onPreview={openPreview} savedIds={savedIds} onToggleSave={toggleSave} />
        <SpacesGrid          onSpacePage={() => setSpaceOpen(true)} />
        <FeaturedCollections />
        <ExploreArt          onStylesPage={() => setStylesOpen(true)} />
        <InSitu />
        <Testimonials />
        <FinalCTA            onSignup={openSignup} />
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
