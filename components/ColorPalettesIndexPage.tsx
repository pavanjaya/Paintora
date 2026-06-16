'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { COLOR_PALETTES } from '@/lib/browse-data'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

export default function ColorPalettesIndexPage() {
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

      <main style={{ paddingTop: 68, minHeight: '100vh' }}>
        <div className="spaces-index-header">
          <h1 className="spaces-index-title">Browse by color.</h1>
          <p className="spaces-index-sub">Find paintings that match your palette — from warm earthy tones to cool moody blues.</p>
        </div>

        <div className="palette-index-grid">
          {COLOR_PALETTES.map(p => (
            <Link key={p.slug} href={`/color-palettes/${p.slug}`} className="palette-index-card">
              <div className="palette-index-swatches">
                {p.hex.map(h => (
                  <span key={h} className="palette-index-swatch" style={{ background: h }} />
                ))}
              </div>
              <div className="palette-index-info">
                <h2 className="palette-index-name">{p.title}</h2>
                <p className="palette-index-desc">{p.description}</p>
                <span className="palette-index-count">{p.count} paintings</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)}
        onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
