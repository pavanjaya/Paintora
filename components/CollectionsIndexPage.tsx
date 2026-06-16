'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const COLLECTIONS = [
  { title: 'Luxury Living',      desc: 'Statement paintings for spaces that demand presence.',           count: 340,  tag: 'Spaces',  href: '/spaces/living-room',    filter: { category: 'living-room' } },
  { title: 'Executive Office',   desc: 'Art that commands authority and quiet confidence.',              count: 280,  tag: 'Spaces',  href: '/spaces/office',         filter: { category: 'office' } },
  { title: 'Bold Abstracts',     desc: "High-energy works that become a room's focal point.",           count: 510,  tag: 'Style',   href: '/styles/abstract',       filter: { style: 'abstract' } },
  { title: 'Scandinavian Calm',  desc: 'Minimal, restrained works for considered interiors.',           count: 190,  tag: 'Style',   href: '/styles/minimalist',     filter: { style: 'minimalist' } },
  { title: 'Nature & Botanical', desc: 'Bringing the outside in — flora, fauna, and the wild.',        count: 360,  tag: 'Subject', href: '/subjects/floral',       filter: { style: 'floral' } },
  { title: 'Earth Tones',        desc: 'Warm, grounded palettes that anchor any interior.',            count: 420,  tag: 'Curated', href: '/styles/contemporary',   filter: { style: 'contemporary' } },
  { title: 'Hospitality & Hotels', desc: 'Sophisticated art for lobbies, suites, and corridors.',      count: 1200, tag: 'Spaces',  href: '/spaces/hotel',          filter: { category: 'hotel' } },
  { title: 'Impressionist Light', desc: 'Soft, luminous works that shift with the hour.',              count: 1400, tag: 'Style',   href: '/styles/impressionism',  filter: { style: 'impressionism' } },
  { title: 'Oil on Canvas',      desc: 'The timeless depth and texture of traditional oil painting.',  count: 4100, tag: 'Medium',  href: '/mediums/oil',           filter: { medium: 'oil' } },
]

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&q=80&fit=crop',
]

const ALL_TAGS = ['All', 'Spaces', 'Style', 'Subject', 'Medium', 'Curated']

const STATS = [
  { saves: '12.4k', downloads: '8.2k' },
  { saves: '9.1k',  downloads: '5.6k' },
  { saves: '21.3k', downloads: '14.7k' },
  { saves: '7.8k',  downloads: '4.2k' },
  { saves: '15.6k', downloads: '9.3k' },
  { saves: '11.2k', downloads: '6.9k' },
  { saves: '18.9k', downloads: '12.1k' },
  { saves: '24.5k', downloads: '17.3k' },
  { saves: '31.2k', downloads: '22.8k' },
]

export default function CollectionsIndexPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [activeTag, setActiveTag] = useState('All')
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

  const filtered = activeTag === 'All' ? COLLECTIONS : COLLECTIONS.filter(c => c.tag === activeTag)

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
          <p className="spaces-index-sub">Handpicked by our editorial team — grouped by mood, space, and intention.</p>
        </div>

        <div className="collections-filter-bar">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`collections-filter-chip${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="col-rank-grid">
          {filtered.map((c, i) => {
            const originalIdx = COLLECTIONS.indexOf(c)
            const imgs = previews[originalIdx] ?? FALLBACK_IMGS
            const stats = STATS[originalIdx]
            return (
              <Link key={i} href={c.href} className="col-rank-card">
                <div className="col-rank-header">
                  <span className="col-rank-num">{originalIdx + 1}</span>
                  <div className="col-rank-meta">
                    <span className="col-rank-title">{c.title}</span>
                    <span className="col-rank-count">{c.count}+ paintings</span>
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
