'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

export default function PrivacyPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

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
        onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />
      <main className="legal-page">
        <div className="legal-inner">
          <p className="legal-eyebrow">Last updated: June 2025</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-lead">Paintora is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>

          <div className="legal-section">
            <h2>1. Information we collect</h2>
            <p>We collect information you provide directly — such as your name and email address when you sign up or submit an enquiry. We also collect usage data (pages visited, search queries) to improve the platform.</p>
          </div>

          <div className="legal-section">
            <h2>2. How we use your information</h2>
            <p>We use your information to operate Paintora, respond to enquiries, send you relevant updates (with your consent), and improve our curation. We do not sell your personal data to third parties.</p>
          </div>

          <div className="legal-section">
            <h2>3. Cookies</h2>
            <p>We use essential cookies to keep you logged in and remember your preferences. We may use analytics cookies (e.g. anonymous usage metrics) to understand how the platform is used. You can disable non-essential cookies in your browser settings.</p>
          </div>

          <div className="legal-section">
            <h2>4. Data storage</h2>
            <p>Your data is stored securely using Supabase infrastructure, hosted on AWS. We retain your data for as long as your account is active or as needed to provide services.</p>
          </div>

          <div className="legal-section">
            <h2>5. Your rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. To make a request, contact us at <a href="mailto:privacy@paintora.com">privacy@paintora.com</a>.</p>
          </div>

          <div className="legal-section">
            <h2>6. Third-party services</h2>
            <p>We use Supabase for authentication and database, and Vercel for hosting. These services have their own privacy policies. We use Unsplash for sample artwork images.</p>
          </div>

          <div className="legal-section">
            <h2>7. Changes to this policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes via email or a prominent notice on the platform.</p>
          </div>

          <div className="legal-section">
            <h2>8. Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:privacy@paintora.com">privacy@paintora.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
