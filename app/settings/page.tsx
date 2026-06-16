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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </div>
              <div className="ap-plan-info">
                <div className="ap-plan-name">Paintora Pro <span className="ap-pro-badge">Active</span></div>
                <div className="ap-plan-meta">Renews on {renewDate} · Full 4K downloads included</div>
              </div>
              <div className="ap-plan-price">₹199<span>/mo</span></div>
            </div>
          ) : (
            <div className="ap-plan-compare">
              {/* Free */}
              <div className="ap-plan-tier">
                <div className="ap-plan-tier-head">
                  <div className="ap-plan-tier-icon ap-plan-tier-icon-free">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </div>
                  <div>
                    <div className="ap-plan-tier-name">Free</div>
                    <div className="ap-plan-tier-price">₹0<span>/mo</span></div>
                  </div>
                </div>
                <ul className="ap-plan-features">
                  <li><span className="ap-feat-check">✓</span> Browse all paintings</li>
                  <li><span className="ap-feat-check">✓</span> Save to collection</li>
                  <li><span className="ap-feat-muted">✗</span> <span style={{color:'#a1a1aa'}}>4K downloads</span></li>
                  <li><span className="ap-feat-muted">✗</span> <span style={{color:'#a1a1aa'}}>Original resolution</span></li>
                </ul>
                <div className="ap-plan-tier-current">Current plan</div>
              </div>

              {/* Pro */}
              <div className="ap-plan-tier ap-plan-tier-pro">
                <div className="ap-plan-tier-head">
                  <div className="ap-plan-tier-icon ap-plan-tier-icon-pro">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                  </div>
                  <div>
                    <div className="ap-plan-tier-name">Pro</div>
                    <div className="ap-plan-tier-price">₹199<span>/mo</span></div>
                  </div>
                </div>
                <ul className="ap-plan-features">
                  <li><span className="ap-feat-check">✓</span> Browse all paintings</li>
                  <li><span className="ap-feat-check">✓</span> Save to collection</li>
                  <li><span className="ap-feat-check">✓</span> 4K downloads</li>
                  <li><span className="ap-feat-check">✓</span> Original resolution</li>
                </ul>
                <button className="ap-plan-upgrade-btn" onClick={() => setUpgradeOpen(true)}>Upgrade to Pro</button>
              </div>
            </div>
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

        {/* Delete account */}
        <div className="ap-card ap-danger-card">
          <h2 className="ap-section-title">Delete account</h2>
          <p className="ap-danger-desc">Once deleted, your account and all associated data — saved paintings, download history, and preferences — cannot be recovered.</p>
          {!deleteConfirm ? (
            <button className="ap-btn-danger" onClick={() => setDeleteConfirm(true)}>Delete my account</button>
          ) : (
            <div className="ap-delete-confirm">
              <p className="ap-delete-warn">This will permanently remove your account. This cannot be undone.</p>
              <div className="ap-delete-actions">
                <button className="ap-btn-danger" onClick={() => { supabase.auth.signOut(); router.push('/') }}>Yes, delete my account</button>
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
