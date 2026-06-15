'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'

import AuthModal from '@/components/AuthModal'
import AccountLayout from '@/components/AccountLayout'
import UpgradeModal from '@/components/UpgradeModal'

type Sub = { status: string; current_period_end: string } | null

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

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/'); return }
      setUser(u)
      const { data: s } = await supabase.from('subscriptions').select('status, current_period_end').eq('user_id', u.id).single()
      setSub(s)
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
        onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <AccountLayout active="settings" user={user}>
        <div className="ap-page-header">
          <h1 className="ap-page-title">Settings</h1>
        </div>

        {/* Subscription */}
        <div className="ap-card">
          <h2 className="ap-section-title">Subscription plan</h2>
          {isPro ? (
            <div className="ap-plan-row ap-plan-pro">
              <div className="ap-plan-icon ap-plan-icon-pro">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </div>
              <div className="ap-plan-info">
                <div className="ap-plan-name">Paintora Pro <span className="ap-pro-badge">Active</span></div>
                <div className="ap-plan-meta">Renews on {renewDate}</div>
              </div>
              <div className="ap-plan-price">₹199<span>/mo</span></div>
            </div>
          ) : (
            <>
              <div className="ap-plan-row ap-plan-free">
                <div className="ap-plan-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <div className="ap-plan-info">
                  <div className="ap-plan-name">Free plan</div>
                  <div className="ap-plan-meta">Browse paintings · Save to collection</div>
                </div>
              </div>
              <div className="ap-upgrade-banner">
                <div className="ap-upgrade-banner-left">
                  <div className="ap-upgrade-banner-title">Unlock full-resolution downloads</div>
                  <div className="ap-upgrade-banner-sub">Download 4K paintings for print, décor, and personal use.</div>
                </div>
                <button className="ap-btn-primary" onClick={() => setUpgradeOpen(true)}>Upgrade — ₹199/mo</button>
              </div>
            </>
          )}
        </div>

        {/* Change password */}
        <div className="ap-card">
          <h2 className="ap-section-title">Change password</h2>
          <form onSubmit={handlePasswordChange} className="ap-form" style={{ maxWidth: 400 }}>
            <div className="ap-field">
              <label className="ap-label">New password</label>
              <input className="ap-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" />
            </div>
            {pwMsg && <p className={`ap-msg${pwMsg.startsWith('✓') ? ' ok' : ' err'}`}>{pwMsg}</p>}
            <button type="submit" className="ap-btn-secondary" disabled={pwSaving}>{pwSaving ? 'Updating…' : 'Update password'}</button>
          </form>
        </div>

        {/* Danger zone */}
        <div className="ap-card ap-danger-card">
          <h2 className="ap-section-title ap-section-title-danger">Danger zone</h2>
          <p className="ap-danger-desc">Permanently delete your account and all associated data. This action cannot be undone.</p>
          {!deleteConfirm ? (
            <button className="ap-btn-danger" onClick={() => setDeleteConfirm(true)}>Delete account</button>
          ) : (
            <div className="ap-delete-confirm">
              <p className="ap-delete-warn">Are you sure? All your saved paintings, downloads and account data will be permanently removed.</p>
              <div className="ap-delete-actions">
                <button className="ap-btn-danger" onClick={() => { supabase.auth.signOut(); router.push('/') }}>Yes, delete everything</button>
                <button className="ap-btn-ghost" onClick={() => setDeleteConfirm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </AccountLayout>


      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
      {user && (
        <UpgradeModal
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          userId={user.id ?? ''}
          userEmail={user.email}
          onSuccess={() => setSub({ status: 'active', current_period_end: new Date(Date.now() + 30 * 86400000).toISOString() })}
        />
      )}
    </>
  )
}
