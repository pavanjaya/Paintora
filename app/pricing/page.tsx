'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

const FREE_FEATURES = [
  'Browse 12,400+ paintings',
  'Save up to 10 artworks',
  'Explore by space & style',
  'Basic search & filters',
  'View in room (3 previews/month)',
]

const PRO_FEATURES = [
  'Everything in Free',
  'Unlimited saves & collections',
  'Full high-res image downloads',
  'View in room — unlimited',
  'Priority customer support',
  'Early access to new collections',
  'Commercial licensing included',
]

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel your Pro subscription anytime — no questions asked. You keep access until the end of your billing period.',
  },
  {
    q: 'What does commercial licensing mean?',
    a: 'Pro members can use downloaded images for commercial projects — interior design presentations, mood boards, hospitality proposals, and similar professional use cases.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Free plan lets you explore the full catalogue. You can upgrade to Pro anytime when you need unlimited access or downloads.',
  },
  {
    q: 'Do you offer team or business plans?',
    a: 'We\'re working on it. If you\'re an interior design firm or hospitality brand with specific needs, reach out at hello@paintora.in.',
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onStylesPage={() => router.push('/')}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      {/* Hero */}
      <div className="pricing-hero">
        <div className="pricing-eyebrow">Simple pricing</div>
        <h1 className="pricing-title">Art without limits.</h1>
        <p className="pricing-sub">Start free. Upgrade when you need more.</p>
      </div>

      {/* Cards */}
      <div className="pricing-cards">
        {/* Free */}
        <div className="pricing-card">
          <div className="pricing-card-top">
            <div className="pricing-plan-name">Free</div>
            <div className="pricing-price">
              <span className="pricing-amount">₹0</span>
              <span className="pricing-period">forever</span>
            </div>
            <p className="pricing-plan-desc">Discover the catalogue. No credit card needed.</p>
            <button className="pricing-cta-free" onClick={() => { setAuthMode('signup'); setAuthOpen(true) }}>
              Get started free
            </button>
          </div>
          <ul className="pricing-features">
            {FREE_FEATURES.map((f, i) => (
              <li key={i} className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="pricing-card pricing-card-pro">
          <div className="pricing-pro-badge">Most popular</div>
          <div className="pricing-card-top">
            <div className="pricing-plan-name">Pro</div>
            <div className="pricing-price">
              <span className="pricing-amount">₹199</span>
              <span className="pricing-period">/ month</span>
            </div>
            <p className="pricing-plan-desc">For collectors, designers, and serious art lovers.</p>
            <button className="pricing-cta-pro" onClick={() => { setAuthMode('signup'); setAuthOpen(true) }}>
              Start Pro
            </button>
          </div>
          <ul className="pricing-features">
            {PRO_FEATURES.map((f, i) => (
              <li key={i} className={`pricing-feature${i === 0 ? ' pricing-feature-inherit' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="pricing-faq-section">
        <h2 className="pricing-faq-title">Questions</h2>
        <div className="pricing-faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`pricing-faq-item${openFaq === i ? ' open' : ''}`}>
              <button className="pricing-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <svg className="pricing-faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {openFaq === i && <p className="pricing-faq-a">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
        onSuccess={() => setAuthOpen(false)}
      />
    </>
  )
}
