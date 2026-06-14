'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const COLLECTIONS = [
  {
    title: 'Luxury Living',
    desc: 'Statement paintings for spaces that demand presence.',
    count: '340+ paintings', tag: 'Spaces',
    href: '/spaces/living-room',
    img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80&fit=crop',
  },
  {
    title: 'Executive Office',
    desc: 'Art that commands authority and quiet confidence.',
    count: '280+ paintings', tag: 'Spaces',
    href: '/spaces/office',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
  },
  {
    title: 'Bold Abstracts',
    desc: 'High-energy works that become a room\'s focal point.',
    count: '510+ paintings', tag: 'Style',
    href: '/styles/abstract',
    img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80&fit=crop',
  },
  {
    title: 'Scandinavian Calm',
    desc: 'Minimal, restrained works for considered interiors.',
    count: '190+ paintings', tag: 'Style',
    href: '/styles/minimalist',
    img: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d75f?w=900&q=80&fit=crop',
  },
  {
    title: 'Nature & Botanical',
    desc: 'Bringing the outside in — flora, fauna, and the wild.',
    count: '360+ paintings', tag: 'Subject',
    href: '/subjects/floral',
    img: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=900&q=80&fit=crop',
  },
  {
    title: 'Earth Tones',
    desc: 'Warm, grounded palettes that anchor any interior.',
    count: '420+ paintings', tag: 'Curated',
    href: '/styles/contemporary',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&fit=crop',
  },
  {
    title: 'Hospitality & Hotels',
    desc: 'Sophisticated art for lobbies, suites, and corridors.',
    count: '1,200+ paintings', tag: 'Spaces',
    href: '/spaces/hotel',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80&fit=crop',
  },
  {
    title: 'Impressionist Light',
    desc: 'Soft, luminous works that shift with the hour.',
    count: '1,400+ paintings', tag: 'Style',
    href: '/styles/impressionism',
    img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=80&fit=crop',
  },
  {
    title: 'Oil on Canvas',
    desc: 'The timeless depth and texture of traditional oil painting.',
    count: '4,100+ paintings', tag: 'Medium',
    href: '/mediums/oil',
    img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=80&fit=crop',
  },
]

const ALL_TAGS = ['All', 'Spaces', 'Style', 'Subject', 'Medium', 'Curated']

export default function CollectionsIndexPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const filtered = activeTag === 'All' ? COLLECTIONS : COLLECTIONS.filter(c => c.tag === activeTag)

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onGallery={() => {}} onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      <main style={{ paddingTop: 68, minHeight: '100vh' }}>
        <div className="spaces-index-header">
          <h1 className="spaces-index-title">Collections.</h1>
          <p className="spaces-index-sub">Handpicked by our editorial team — grouped by mood, space, and intention.</p>
        </div>

        {/* Filter tabs */}
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

        <div className="collections-index-grid">
          {filtered.map((c, i) => (
            <Link key={i} href={c.href} className="collections-index-card">
              <div className="collections-index-img">
                <img src={c.img} alt={c.title} className="loaded" />
                <div className="collections-index-overlay" />
                <span className="collections-index-tag">{c.tag}</span>
              </div>
              <div className="collections-index-info">
                <h2 className="collections-index-name">{c.title}</h2>
                <p className="collections-index-desc">{c.desc}</p>
                <div className="collections-index-footer">
                  <span className="collections-index-count">{c.count}</span>
                  <span className="collections-index-cta">Explore →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
