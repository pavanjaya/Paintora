'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

type DownloadRecord = {
  id: number
  painting_name: string
  painting_img: string
  painting_id: number
  size: string
  downloaded_at: string
}

export default function DownloadsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [downloads, setDownloads] = useState<DownloadRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u)
      const { data: rows } = await supabase
        .from('downloads')
        .select('*')
        .eq('user_id', u.id)
        .order('downloaded_at', { ascending: false })
      setDownloads(rows ?? [])
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s?.user) router.push('/')
      setUser(s?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

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
              <a href="/saved" className="account-nav-link">Saved</a>
              <a href="/downloads" className="account-nav-link active">Downloads</a>
              <a href="/settings" className="account-nav-link">Settings</a>
            </nav>
          </div>

          <div className="account-content">
            <div className="account-title-row">
              <h1 className="account-title">Downloads</h1>
              {!loading && <span className="account-count">{downloads.length} file{downloads.length !== 1 ? 's' : ''}</span>}
            </div>

            {loading ? (
              <div className="account-loading">Loading…</div>
            ) : downloads.length === 0 ? (
              <div className="account-empty">
                <div className="account-empty-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <h3 className="account-empty-title">No downloads yet</h3>
                <p className="account-empty-sub">Your downloaded paintings will appear here.</p>
                <Link href="/" className="account-empty-cta">Browse paintings</Link>
              </div>
            ) : (
              <div className="downloads-list">
                {downloads.map(d => (
                  <div key={d.id} className="download-row">
                    <img src={d.painting_img} alt={d.painting_name} className="download-row-img" />
                    <div className="download-row-info">
                      <span className="download-row-name">{d.painting_name}</span>
                      <span className="download-row-meta">{d.size} · {new Date(d.downloaded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <Link href={`/paintings/${d.painting_id}`} className="download-row-view">View</Link>
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
