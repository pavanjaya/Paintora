'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import AccountLayout from '@/components/AccountLayout'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string; created_at?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u as typeof u & { created_at?: string })
      const meta = u.user_metadata ?? {}
      setName(meta.full_name ?? '')
      setBio(meta.bio ?? '')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s?.user) router.push('/')
      setUser((s?.user ?? null) as typeof s extends null ? null : { id?: string; email?: string; created_at?: string } | null)
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
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : ''

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onGallery={() => {}} onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <AccountLayout active="profile" user={user}>
        <div className="ap-card">
          <div className="ap-card-header">
            <div className="ap-avatar-lg">{initial}</div>
            <div>
              <div className="ap-card-title">{name || user?.email?.split('@')[0] || 'Your Profile'}</div>
              <div className="ap-card-sub">{user?.email}</div>
              {joinedDate && <div className="ap-card-meta">Member since {joinedDate}</div>}
            </div>
          </div>
        </div>

        <div className="ap-card">
          <h2 className="ap-section-title">Personal information</h2>
          <form onSubmit={handleSave} className="ap-form">
            <div className="ap-form-row">
              <div className="ap-field">
                <label className="ap-label">Full name</label>
                <input className="ap-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="ap-field">
                <label className="ap-label">Email address</label>
                <input className="ap-input ap-input-disabled" value={user?.email ?? ''} disabled />
              </div>
            </div>
            <div className="ap-field">
              <label className="ap-label">Bio <span className="ap-label-opt">Optional</span></label>
              <textarea className="ap-input ap-textarea" value={bio} onChange={e => setBio(e.target.value)} placeholder="A few words about yourself…" rows={3} />
            </div>
            <div className="ap-form-footer">
              <button type="submit" className="ap-btn-primary" disabled={saving}>
                {saving ? 'Saving…' : savedMsg ? '✓ Saved' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </AccountLayout>
      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
