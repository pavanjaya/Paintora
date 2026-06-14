'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ALL_ARTWORKS } from '@/lib/browse-data'
import Nav from '@/components/Nav'

import AuthModal from '@/components/AuthModal'
import AccountLayout from '@/components/AccountLayout'
import Img from '@/components/Img'

export default function SavedPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)

  const loadSaves = async (userId: string) => {
    const { data } = await supabase.from('saves').select('artwork_id').eq('user_id', userId)
    setSavedIds(new Set((data ?? []).map((r: { artwork_id: number }) => r.artwork_id)))
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u)
      loadSaves(u.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s?.user) router.push('/')
      setUser(s?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const unsave = async (id: number) => {
    if (!user) return
    setSavedIds(prev => { const n = new Set(prev); n.delete(id); return n })
    await supabase.from('saves').delete().eq('user_id', (user as { id?: string }).id!).eq('artwork_id', id)
  }
  const savedArtworks = ALL_ARTWORKS.filter(a => savedIds.has(a.id))

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onGallery={() => {}} onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <AccountLayout active="saved" user={user}>
        <div className="ap-page-header">
          <h1 className="ap-page-title">Saved paintings</h1>
          {savedArtworks.length > 0 && <span className="ap-page-badge">{savedArtworks.length}</span>}
        </div>

        {loading ? (
          <div className="ap-loading"><div className="ap-loading-spinner" />Loading your saved paintings…</div>
        ) : savedArtworks.length === 0 ? (
          <div className="ap-empty">
            <div className="ap-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3 className="ap-empty-title">Nothing saved yet</h3>
            <p className="ap-empty-sub">Tap the bookmark icon on any painting to save it to your collection.</p>
            <Link href="/" className="ap-btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Browse paintings
            </Link>
          </div>
        ) : null}
        {!loading && savedArtworks.length > 0 && (
          <div className="ap-art-grid">
            {savedArtworks.map(art => (
              <div key={art.id} className="ap-art-card">
                <Link href={`/paintings/${art.id}`} className="ap-art-img">
                  <Img src={art.img} alt={art.name} />
                  <div className="ap-art-overlay">
                    <span className="ap-art-view">View</span>
                  </div>
                </Link>
                <div className="ap-art-footer">
                  <div className="ap-art-meta">
                    <span className="ap-art-name">{art.name}</span>
                    <span className="ap-art-style">{art.style}</span>
                  </div>
                  <button className="ap-art-remove" onClick={() => unsave(art.id)} title="Remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AccountLayout>

      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
