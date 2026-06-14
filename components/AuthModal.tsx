'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthModal({ mode, open, onClose, onSwitch, onSuccess }: {
  mode: 'login' | 'signup'
  open: boolean
  onClose: () => void
  onSwitch: () => void
  onSuccess: () => void
}) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const reset = () => { setName(''); setEmail(''); setPassword(''); setError('') }

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) { setError(error.message); return }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        })
        if (error) { setError(error.message); return }
      }
      reset()
      onSuccess()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  return (
    <div className={`auth-modal${open ? ' open' : ''}`} role="dialog">
      <div className="auth-backdrop" onClick={onClose} />
      <div className="auth-panel">
        <button className="auth-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className="auth-left">
          <div className="auth-logo">
            <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
              <text x="0" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="20" fill="#0F0F14" letterSpacing="-0.5">Paintora</text>
            </svg>
          </div>
          <h2 className="auth-heading">{mode === 'login' ? 'Welcome back.' : 'Join Paintora.'}</h2>

          <form onSubmit={handle}>
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label">Full name</label>
                <input className="auth-input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            )}
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <input className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-pw-wrap">
                <input
                  className="auth-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder={mode === 'signup' ? 'Min 6 characters' : 'Your password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  required
                  minLength={6}
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>
                  {showPw
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {error && <p style={{ fontSize: 12, color: '#E53E3E', marginBottom: '1rem', lineHeight: 1.5 }}>{error}</p>}
            {mode === 'login' && <a href="#" className="auth-forgot" onClick={e => e.preventDefault()}>Forgot your password?</a>}

            <button type="submit" className="auth-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <button className="auth-google" onClick={handleGoogle}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <p className="auth-switch">
            {mode === 'login'
              ? <>Don&apos;t have an account? <a href="#" onClick={e => { e.preventDefault(); onSwitch() }}>Sign up free</a></>
              : <>Already have an account? <a href="#" onClick={e => { e.preventDefault(); onSwitch() }}>Sign in</a></>
            }
          </p>
          <p className="auth-terms">By continuing, you agree to Paintora&apos;s <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>

        <div className="auth-right">
          <div className="auth-right-inner">
            <div className="auth-artwork-stack">
              <div className="auth-art auth-art-1" />
              <div className="auth-art auth-art-2" />
              <div className="auth-art auth-art-3" />
            </div>
            <div className="auth-right-title">50,000+ artworks<br />waiting for you.</div>
            <p className="auth-right-sub">Join 12,400+ collectors discovering the world&apos;s best contemporary art.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
