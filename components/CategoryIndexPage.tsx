'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { BROWSE_DATA, type BrowseCategory } from '@/lib/browse-data'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

type Props = {
  category: BrowseCategory
  title: string
  subtitle: string
  images: Record<string, string>
  basePath: string
}

export default function CategoryIndexPage({ category, title, subtitle, images, basePath }: Props) {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const items = BROWSE_DATA[category]

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
          <h1 className="spaces-index-title">{title}</h1>
          <p className="spaces-index-sub">{subtitle}</p>
        </div>

        <div className="spaces-index-grid">
          {items.map(item => (
            <Link key={item.slug} href={`${basePath}/${item.slug}`} className="spaces-index-card">
              <div className="spaces-index-img">
                <img
                  src={images[item.slug] ?? Object.values(images)[0]}
                  alt={item.title}
                  className="loaded"
                />
                <div className="spaces-index-overlay" />
              </div>
              <div className="spaces-index-info">
                <span className="spaces-index-count">{item.count} paintings</span>
                <h2 className="spaces-index-name">{item.title}</h2>
                <p className="spaces-index-desc">{item.description}</p>
                <span className="spaces-index-cta">Browse →</span>
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
