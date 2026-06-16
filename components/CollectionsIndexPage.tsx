'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const COLLECTIONS = [
  {
    emoji: '🌿', title: 'Echoes of the Earth',
    desc: 'Natural landscapes, organic textures, and earthy palettes.',
    count: 28, tag: 'Nature', href: '/collections/echoes-of-the-earth',
    filter: { style: 'landscape' },
  },
  {
    emoji: '🏡', title: 'Spaces That Feel Like Home',
    desc: 'Warm, inviting artwork for contemporary interiors.',
    count: 24, tag: 'Interior', href: '/collections/spaces-that-feel-like-home',
    filter: { category: 'living-room' },
  },
  {
    emoji: '🧭', title: 'Art for Harmony & Positive Living',
    desc: 'A Vastu-inspired selection that brings balance and energy to your space.',
    count: 22, tag: 'Vastu', href: '/collections/harmony-positive-living',
    filter: { style: 'contemporary' },
  },
  {
    emoji: '✨', title: 'The Quiet Luxury Collection',
    desc: 'Elegant, understated paintings for timeless interiors.',
    count: 20, tag: 'Luxury', href: '/collections/quiet-luxury',
    filter: { style: 'minimalist' },
  },
  {
    emoji: '🌊', title: 'Beyond the Horizon',
    desc: 'Oceans, skies, serenity, and expansive landscapes.',
    count: 26, tag: 'Landscape', href: '/collections/beyond-the-horizon',
    filter: { style: 'landscape' },
  },
  {
    emoji: '🎨', title: 'Modern Forms & Gentle Lines',
    desc: 'Contemporary and geometric expressions for modern spaces.',
    count: 30, tag: 'Modern', href: '/collections/modern-forms',
    filter: { style: 'geometric' },
  },
  {
    emoji: '🤍', title: 'Calm Corners & Peaceful Walls',
    desc: 'Minimal and meditative artwork for quiet spaces.',
    count: 25, tag: 'Minimal', href: '/collections/calm-corners',
    filter: { style: 'minimalist' },
  },
  {
    emoji: '⭐', title: 'Curated by Paintora',
    desc: 'Our handpicked selection of the most exceptional paintings.',
    count: 32, tag: 'Curated', href: '/collections/curated-by-paintora',
    filter: { style: 'abstract' },
  },
]

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&q=80&fit=crop',
]

const STATS = [
  { saves: '4.2k', downloads: '2.1k' },
  { saves: '3.8k', downloads: '1.9k' },
  { saves: '5.1k', downloads: '2.8k' },
  { saves: '6.3k', downloads: '3.4k' },
  { saves: '4.9k', downloads: '2.5k' },
  { saves: '3.5k', downloads: '1.7k' },
  { saves: '5.7k', downloads: '3.1k' },
  { saves: '8.2k', downloads: '4.6k' },
]

export default function CollectionsIndexPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [previews, setPreviews] = useState<Record<number, string[]>>({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    async function loadPreviews() {
      const { data: all } = await supabase
        .from('artworks')
        .select('id, thumbnail_url, style:styles(name), medium:mediums(name), category:categories(name)')
        .eq('status', 'published')
        .not('thumbnail_url', 'is', null)
        .limit(200)

      if (!all || all.length === 0) return

      const result: Record<number, string[]> = {}
      COLLECTIONS.forEach((c, i) => {
        const { style, medium, category } = c.filter as any
        let matches = all.filter((a: any) => {
          if (style)    return a.style?.name?.toLowerCase().includes(style)
          if (medium)   return a.medium?.name?.toLowerCase().includes(medium)
          if (category) return a.category?.name?.toLowerCase().includes(category.replace('-', ' '))
          return true
        })
        if (matches.length < 3) matches = all
        result[i] = matches.slice(0, 3).map((a: any) => a.thumbnail_url)
      })
      setPreviews(result)
    }
    loadPreviews()
  }, [])

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      <main style={{ paddingTop: 68, minHeight: '100vh' }}>
        <div className="spaces-index-header">
          <h1 className="spaces-index-title">Collections.</h1>
          <p className="spaces-index-sub">Curated themes — each a story told through paintings.</p>
        </div>

        <div className="col-rank-grid">
          {COLLECTIONS.map((c, i) => {
            const imgs = previews[i] ?? FALLBACK_IMGS
            const stats = STATS[i]
            return (
              <Link key={i} href={c.href} className="col-rank-card">
                <div className="col-rank-header">
                  <div className="col-rank-meta">
                    <span className="col-rank-title">{c.title}</span>
                    <span className="col-rank-count">{c.count} paintings</span>
                  </div>
                  <span className="col-rank-tag">{c.tag}</span>
                </div>
                <div className="col-rank-previews">
                  <div className="col-rank-img"><Img src={imgs[0]} alt={c.title} /></div>
                  <div className="col-rank-img"><Img src={imgs[1]} alt={c.title} /></div>
                  <div className="col-rank-img col-rank-img--more">
                    <Img src={imgs[2]} alt={c.title} />
                    <div className="col-rank-more-overlay">+{c.count - 3} more</div>
                  </div>
                </div>
                <div className="col-rank-footer">
                  <span className="col-rank-stat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    {stats.saves} saves
                  </span>
                  <span className="col-rank-dot">·</span>
                  <span className="col-rank-stat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    {stats.downloads} downloads
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
