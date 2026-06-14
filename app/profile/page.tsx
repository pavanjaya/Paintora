'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSavedMsg] = useState(false)
  const [joinedDate, setJoinedDate] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u)
      setJoinedDate(new Date(u.created_at ?? '').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }))
      // Load profile metadata
      const meta = u.user_metadata ?? {}
      setName(meta.full_name ?? '')
      setBio(meta.bio ?? '')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null
      if (!u) router.push('/')
      setUser(u)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.auth.updateUser({ data: { full_name: name, bio } })
    setSaving(false)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2500)
  }

  const initial = (user?.email ?? 'U')[0].toUpperCase()

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
              <a href="/profile" className="account-nav-link active">Profile</a>
              <a href="/saved" className="account-nav-link">Saved</a>
              <a href="/downloads" className="account-nav-link">Downloads</a>
              <a href="/settings" className="account-nav-link">Settings</a>
            </nav>
          </div>

          <div className="account-content">
            <h1 className="account-title">Profile</h1>

            <div className="profile-avatar-row">
              <div className="profile-avatar">{initial}</div>
              <div>
                <div className="profile-avatar-name">{name || user?.email?.split('@')[0]}</div>
                <div className="profile-avatar-meta">Member since {joinedDate}</div>
              </div>
            </div>

            <form className="profile-form" onSubmit={handleSave}>
              <div className="profile-field">
                <label className="profile-label">Full name</label>
                <input className="profile-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="profile-field">
                <label className="profile-label">Email</label>
                <input className="profile-input" value={user?.email ?? ''} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
              </div>
              <div className="profile-field">
                <label className="profile-label">Bio</label>
                <textarea className="profile-input profile-textarea" value={bio} onChange={e => setBio(e.target.value)} placeholder="A few words about yourself…" rows={3} />
              </div>
              <button type="submit" className="profile-save-btn" disabled={saving}>
                {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
