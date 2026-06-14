'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import UpgradeModal from '@/components/UpgradeModal'

type Sub = { status: string; current_period_end: string; razorpay_payment_id?: string } | null

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [sub, setSub] = useState<Sub>(null)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const loadSub = async (userId: string) => {
    const { data } = await supabase.from('subscriptions').select('status, current_period_end, razorpay_payment_id').eq('user_id', userId).single()
    setSub(data)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u)
      loadSub(u.id!)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s?.user) router.push('/')
      setUser(s?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const isPro = sub?.status === 'active' && new Date(sub.current_period_end) > new Date()
  const renewDate = sub?.current_period_end ? new Date(sub.current_period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) { setPwMsg('Password must be at least 8 characters.'); return }
    setPwSaving(true)
    const { error } = await supabase.auth.updateUser({ password })
    setPwSaving(false)
    setPwMsg(error ? error.message : '✓ Password updated successfully.')
    if (!error) setPassword('')
  }

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
              <a href="/downloads" className="account-nav-link">Downloads</a>
              <a href="/settings" className="account-nav-link active">Settings</a>
            </nav>
          </div>

          <div className="account-content">
            <h1 className="account-title">Settings</h1>

            {/* Subscription */}
            <section className="settings-section">
              <h2 className="settings-section-title">Subscription</h2>
              <div className="settings-plan-card">
                <div className="settings-plan-left">
                  <div className="settings-plan-badge" data-pro={isPro}>{isPro ? 'Pro' : 'Free'}</div>
                  <div>
                    <div className="settings-plan-name">{isPro ? 'Paintora Pro' : 'Free plan'}</div>
                    <div className="settings-plan-meta">
                      {isPro ? `Renews on ${renewDate}` : 'Upgrade to download full-resolution paintings'}
                    </div>
                  </div>
                </div>
                {!isPro && (
                  <button className="settings-upgrade-btn" onClick={() => setUpgradeOpen(true)}>
                    Upgrade — ₹199/mo
                  </button>
                )}
              </div>
            </section>

            {/* Change password */}
            <section className="settings-section">
              <h2 className="settings-section-title">Change password</h2>
              <form className="profile-form" onSubmit={handlePasswordChange} style={{ maxWidth: 400 }}>
                <div className="profile-field">
                  <label className="profile-label">New password</label>
                  <input className="profile-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" />
                </div>
                {pwMsg && <p className={`settings-msg${pwMsg.startsWith('✓') ? ' ok' : ' err'}`}>{pwMsg}</p>}
                <button type="submit" className="profile-save-btn" disabled={pwSaving}>{pwSaving ? 'Updating…' : 'Update password'}</button>
              </form>
            </section>

            {/* Danger zone */}
            <section className="settings-section">
              <h2 className="settings-section-title" style={{ color: '#E53E3E' }}>Danger zone</h2>
              {!deleteConfirm ? (
                <button className="settings-danger-btn" onClick={() => setDeleteConfirm(true)}>Delete account</button>
              ) : (
                <div className="settings-delete-confirm">
                  <p className="settings-delete-msg">This will permanently delete your account and all saved data. This cannot be undone.</p>
                  <div className="settings-delete-actions">
                    <button className="settings-danger-btn" onClick={async () => { await supabase.auth.admin?.deleteUser(user?.id ?? ''); supabase.auth.signOut(); router.push('/') }}>Yes, delete my account</button>
                    <button className="settings-cancel-btn" onClick={() => setDeleteConfirm(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
      {user && (
        <UpgradeModal
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          userId={user.id ?? ''}
          userEmail={user.email}
          onSuccess={() => { setSub({ status: 'active', current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() }) }}
        />
      )}
    </>
  )
}
