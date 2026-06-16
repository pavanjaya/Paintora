'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'

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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u as typeof u & { created_at?: string })
      const meta = u.user_metadata ?? {}
      setName(meta.full_name ?? '')
      setBio(meta.bio ?? '')
      setAvatarUrl(meta.avatar_url ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s?.user) router.push('/')
      setUser((s?.user ?? null) as typeof s extends null ? null : { id?: string; email?: string; created_at?: string } | null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user?.id) return
    setAvatarUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (upErr) { setAvatarUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
    const urlWithBust = `${publicUrl}?t=${Date.now()}`
    await supabase.auth.updateUser({ data: { avatar_url: urlWithBust } })
    setAvatarUrl(urlWithBust)
    setAvatarUploading(false)
  }

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
        onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <AccountLayout active="profile" user={user} avatarUrl={avatarUrl}>
        <div className="ap-card">
          <div className="ap-card-header">
            {/* Clickable avatar with upload */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div className="ap-avatar-lg" style={{ cursor: 'pointer' }} onClick={() => fileRef.current?.click()}>
                {avatarUrl
                  ? <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : initial}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={avatarUploading}
                style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#7c3aed', border: '2px solid #fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff',
                }}
                title="Upload photo"
              >
                {avatarUploading
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/></svg>
                  : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
                }
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
            </div>
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

      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
