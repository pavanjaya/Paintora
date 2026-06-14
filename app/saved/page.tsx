'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ALL_ARTWORKS } from '@/lib/browse-data'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import Img from '@/components/Img'

export default function SavedPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [saved, setSaved] = useState<Set<number>>(new Set())

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s?.user) router.push('/')
      setUser(s?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const toggle = (id: number) => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const savedArtworks = ALL_ARTWORKS.filter(a => saved.has(a.id))

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onGallery={() => {}} onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <main className="account-page">
        <div className="account-inner">
          <div className="account-sidebar">
            <nav className="account-nav">
              <a href="/profile" className="account-nav-link">Profile</a>
              <a href="/saved" className="account-nav-link active">Saved</a>
              <a href="/downloads" className="account-nav-link">Downloads</a>
              <a href="/settings" className="account-nav-link">Settings</a>
            </nav>
          </div>

          <div className="account-content">
            <div className="account-title-row">
              <h1 className="account-title">Saved</h1>
              <span className="account-count">{savedArtworks.length} painting{savedArtworks.length !== 1 ? 's' : ''}</span>
            </div>

            {savedArtworks.length === 0 ? (
              <div className="account-empty">
                <div className="account-empty-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </div>
                <h3 className="account-empty-title">No saved paintings yet</h3>
                <p className="account-empty-sub">Tap the bookmark icon on any painting to save it here.</p>
                <Link href="/" className="account-empty-cta">Browse paintings</Link>
              </div>
            ) : (
              <div className="account-grid">
                {savedArtworks.map(art => (
                  <div key={art.id} className="account-art-card">
                    <Link href={`/paintings/${art.id}`} className="account-art-img-wrap">
                      <Img src={art.img} alt={art.name} />
                    </Link>
                    <div className="account-art-info">
                      <span className="account-art-name">{art.name}</span>
                      <button className="account-art-unsave" onClick={() => toggle(art.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
