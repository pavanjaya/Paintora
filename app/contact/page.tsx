'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const TOPICS = ['Buying a painting', 'Selling / listing art', 'Order or delivery', 'Partnership', 'Press enquiry', 'Other']

export default function ContactPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    // Save to Supabase contact_submissions table
    await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      topic: form.topic,
      message: form.message,
    })
    setSending(false)
    setSubmitted(true)
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

      <main className="contact-page">
        <div className="contact-inner">
          <div className="contact-left">
            <p className="about-eyebrow">Get in touch</p>
            <h1 className="contact-title">We&rsquo;d love to hear from you.</h1>
            <p className="contact-sub">Whether you want to buy a painting, list your art, or just say hello — we read every message and reply within 24 hours.</p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-detail-icon">✉️</span>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <a href="mailto:hello@paintora.com" className="contact-detail-value">hello@paintora.com</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📸</span>
                <div>
                  <div className="contact-detail-label">Instagram</div>
                  <a href="https://www.instagram.com/mypaintora/" target="_blank" rel="noopener noreferrer" className="contact-detail-value">@mypaintora</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">💼</span>
                <div>
                  <div className="contact-detail-label">LinkedIn</div>
                  <a href="https://www.linkedin.com/company/paintora" target="_blank" rel="noopener noreferrer" className="contact-detail-value">Paintora</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">🎨</div>
                <h2 className="contact-success-title">Message received!</h2>
                <p className="contact-success-sub">Thanks for reaching out. We&rsquo;ll get back to you within 24 hours.</p>
                <button className="contact-success-btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }) }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label className="contact-label">Your name *</label>
                    <input className="contact-input" placeholder="Emma Rodriguez" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="contact-field">
                    <label className="contact-label">Email address *</label>
                    <input className="contact-input" type="email" placeholder="emma@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>

                <div className="contact-field">
                  <label className="contact-label">Topic</label>
                  <select className="contact-input contact-select" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}>
                    <option value="">Select a topic…</option>
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="contact-field">
                  <label className="contact-label">Message *</label>
                  <textarea className="contact-input contact-textarea" placeholder="Tell us what you're looking for, or ask us anything…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={5} />
                </div>

                <button type="submit" className="contact-submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
                <p className="contact-note">We reply to every message within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
