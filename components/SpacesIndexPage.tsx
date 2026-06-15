'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { BROWSE_DATA } from '@/lib/browse-data'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const SPACE_IMAGES: Record<string, string> = {
  'living-room': 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80&fit=crop',
  'office':      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop',
  'bedroom':     'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80&fit=crop',
  'dining-room': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80&fit=crop',
  'hotel':       'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80&fit=crop',
  'cafe':        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80&fit=crop',
  'retail':      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop',
  'spa':         'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&fit=crop',
}

export default function SpacesIndexPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const spaces = BROWSE_DATA.spaces

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
          <h1 className="spaces-index-title">Designed for every space.</h1>
          <p className="spaces-index-sub">Curated paintings matched to where you live, work, and gather.</p>
        </div>

        <div className="spaces-index-grid">
          {spaces.map(space => (
            <Link key={space.slug} href={`/spaces/${space.slug}`} className="spaces-index-card">
              <div className="spaces-index-img">
                <img
                  src={SPACE_IMAGES[space.slug] ?? SPACE_IMAGES['office']}
                  alt={space.title}
                  className="loaded"
                />
                <div className="spaces-index-overlay" />
              </div>
              <div className="spaces-index-info">
                <span className="spaces-index-count">{space.count} paintings</span>
                <h2 className="spaces-index-name">{space.title}</h2>
                <p className="spaces-index-desc">{space.description}</p>
                <span className="spaces-index-cta">Browse →</span>
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
