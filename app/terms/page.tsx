'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

export default function TermsPage() {
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
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-lead">By using Paintora, you agree to these terms. Please read them carefully.</p>

          <div className="legal-section">
            <h2>1. Using Paintora</h2>
            <p>Paintora provides a platform to discover, browse, and enquire about original paintings. You may use the platform for personal and commercial interior design purposes. You must be at least 18 years old to create an account or make a purchase.</p>
          </div>

          <div className="legal-section">
            <h2>2. Accounts</h2>
            <p>You are responsible for keeping your account credentials secure. You agree not to share your account or use another person&rsquo;s account without permission. We reserve the right to suspend accounts that violate these terms.</p>
          </div>

          <div className="legal-section">
            <h2>3. Purchases and enquiries</h2>
            <p>Enquiries submitted through Paintora are not binding purchase agreements. A purchase is complete only when confirmed in writing by Paintora and payment is received. Prices are listed in INR and are subject to change without notice.</p>
          </div>

          <div className="legal-section">
            <h2>4. Artwork and intellectual property</h2>
            <p>All artwork on Paintora belongs to the respective artists. Purchasing a painting transfers ownership of the physical work only — not reproduction rights or copyright. You may not reproduce, distribute, or create derivative works without the artist&rsquo;s written consent.</p>
          </div>

          <div className="legal-section">
            <h2>5. Returns and refunds</h2>
            <p>We want you to love every piece you buy. If a painting arrives damaged, contact us within 48 hours with photos at <a href="mailto:support@paintora.com">support@paintora.com</a>. Undamaged returns are considered on a case-by-case basis within 7 days of delivery.</p>
          </div>

          <div className="legal-section">
            <h2>6. Prohibited conduct</h2>
            <p>You agree not to scrape, copy, or reproduce Paintora&rsquo;s content; submit false enquiries; attempt to bypass authentication; or use the platform for any unlawful purpose.</p>
          </div>

          <div className="legal-section">
            <h2>7. Limitation of liability</h2>
            <p>Paintora is provided &ldquo;as is.&rdquo; We are not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount paid for the specific transaction in question.</p>
          </div>

          <div className="legal-section">
            <h2>8. Changes to terms</h2>
            <p>We may update these terms at any time. Continued use of Paintora after changes are posted constitutes your acceptance of the new terms.</p>
          </div>

          <div className="legal-section">
            <h2>9. Contact</h2>
            <p>Questions? Email us at <a href="mailto:legal@paintora.com">legal@paintora.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
