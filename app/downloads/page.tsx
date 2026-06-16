'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'

import AuthModal from '@/components/AuthModal'
import AccountLayout from '@/components/AccountLayout'

type DownloadRecord = {
  id: string
  painting_name: string
  painting_img: string
  painting_id: string
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
  const [removingId, setRemovingId] = useState<string | null>(null)

  const removeDownload = async (id: string) => {
    setRemovingId(id)
    await supabase.from('downloads').delete().eq('id', id)
    setDownloads(prev => prev.filter(d => d.id !== id))
    setRemovingId(null)
  }

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
        onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <AccountLayout active="downloads" user={user}>
        <div className="ap-page-header">
          <h1 className="ap-page-title">Downloads</h1>
          {!loading && downloads.length > 0 && <span className="ap-page-badge">{downloads.length}</span>}
        </div>

        {loading ? (
          <div className="ap-loading">
            <div className="ap-loading-spinner" />
            Loading your downloads…
          </div>
        ) : downloads.length === 0 ? (
          <div className="ap-empty">
            <div className="ap-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <h3 className="ap-empty-title">No downloads yet</h3>
            <p className="ap-empty-sub">Paintings you download will show up here with their size and date.</p>
            <Link href="/" className="ap-btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Browse paintings
            </Link>
          </div>
        ) : (
          <div className="ap-card ap-dl-list">
            {downloads.map((d, i) => (
              <div key={d.id} className={`ap-dl-row${i === downloads.length - 1 ? ' last' : ''}`}>
                <img src={d.painting_img} alt={d.painting_name} className="ap-dl-img" />
                <div className="ap-dl-info">
                  <span className="ap-dl-name">{d.painting_name}</span>
                  <div className="ap-dl-meta">
                    <span className="ap-dl-size-badge">{d.size}</span>
                    <span className="ap-dl-dot">·</span>
                    <span>{new Date(d.downloaded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <Link href={`/paintings/${d.painting_id}`} className="ap-dl-btn">View</Link>
                  <button
                    className="ap-art-remove"
                    onClick={() => removeDownload(d.id)}
                    disabled={removingId === d.id}
                    title="Remove from history"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
