'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import Img from '@/components/Img'
import type { SpaceStory } from '@/lib/space-stories'
import { SPACE_STORIES } from '@/lib/space-stories'

export default function SpaceStoryClient({ story }: { story: SpaceStory }) {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const related = SPACE_STORIES.filter(s => story.relatedSlugs.includes(s.slug))

  return (
    <>
      <Nav
        onLogin={() => { setAuthMode('login'); setAuthOpen(true) }}
        onSignup={() => { setAuthMode('signup'); setAuthOpen(true) }}
        onStylesPage={() => {}}
        isLoggedIn={!!user} userEmail={user?.email}
        onLogout={() => supabase.auth.signOut()}
      />

      <article className="ss-article">

        {/* Hero */}
        <div className="ss-hero">
          <Img src={story.heroImg} alt={story.title} className="ss-hero-img" />
          <div className="ss-hero-overlay" />
          <div className="ss-hero-content">
            <div className="ss-hero-tag">{story.tag} · {story.label}</div>
            <h1 className="ss-hero-title">{story.title}</h1>
          </div>
        </div>

        {/* Intro */}
        <div className="ss-container">
          <div className="ss-intro-wrap">
            <p className="ss-headline">{story.headline}</p>
            {story.intro.split('\n\n').map((p, i) => (
              <p key={i} className="ss-body">{p}</p>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="ss-highlights-band">
          <div className="ss-container">
            <h2 className="ss-section-label">Design Highlights</h2>
            <ul className="ss-highlights">
              {story.highlights.map((h, i) => (
                <li key={i} className="ss-highlight-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Body sections */}
        <div className="ss-container">
          {story.sections.map((sec, i) => (
            <div key={i} className="ss-section">
              {sec.heading && <h2 className="ss-section-heading">{sec.heading}</h2>}
              {sec.body.split('\n\n').map((p, j) => (
                <p key={j} className="ss-body">{p}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Curated paintings */}
        <div className="ss-paintings-band">
          <div className="ss-container">
            <h2 className="ss-section-label">Paintings from this space</h2>
            <div className="ss-paintings-grid">
              {story.paintings.map((p, i) => (
                <Link key={i} href={p.href} className="ss-painting-card">
                  <div className="ss-painting-img">
                    <Img src={p.src} alt={p.name} />
                  </div>
                  <div className="ss-painting-info">
                    <span className="ss-painting-name">{p.name}</span>
                    <span className="ss-painting-style">{p.style}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related stories */}
        {related.length > 0 && (
          <div className="ss-container ss-related-wrap">
            <h2 className="ss-section-label">More Space Stories</h2>
            <div className="ss-related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/space-stories/${r.slug}`} className="ss-related-card">
                  <div className="ss-related-img">
                    <Img src={r.heroImg} alt={r.title} />
                  </div>
                  <div className="ss-related-info">
                    <span className="ss-related-tag">{r.tag} · {r.label}</span>
                    <span className="ss-related-title">{r.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="ss-back-wrap">
          <Link href="/" className="ss-back">← Back to home</Link>
        </div>

      </article>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
