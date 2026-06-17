'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => { setCopied(false); setShareOpen(false) }, 2000)
  }, [])

  const shareLinks = [
    { label: 'Pinterest', href: () => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(story.title)}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg> },
    { label: 'WhatsApp', href: () => `https://wa.me/?text=${encodeURIComponent(story.title + ' — ' + window.location.href)}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> },
    { label: 'Facebook', href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { label: 'X (Twitter)', href: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(window.location.href)}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  ]

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
          <div className="ss-hero-share" ref={shareRef}>
            <button className="ss-share-btn" onClick={() => setShareOpen(o => !o)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share
            </button>
            {shareOpen && (
              <div className="ss-share-dropdown">
                {shareLinks.map(s => (
                  <a key={s.label} href={s.href()} target="_blank" rel="noopener noreferrer" className="ss-share-option" onClick={() => setShareOpen(false)}>
                    {s.icon}<span>{s.label}</span>
                  </a>
                ))}
                <button className="ss-share-option" onClick={copyLink}>
                  {copied
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  }
                  <span>{copied ? 'Copied!' : 'Copy link'}</span>
                </button>
              </div>
            )}
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

        {/* Designer quote */}
        <div className="ss-container">
          <blockquote className="ss-quote">
            <span className="ss-quote-mark">"</span>
            <p className="ss-quote-text">{story.quote.text}"</p>
            <footer className="ss-quote-author">
              <Img src={story.quote.avatar} alt={story.quote.author} className="ss-quote-avatar" />
              <div className="ss-quote-meta">
                <span className="ss-quote-name">{story.quote.author}</span>
                <span className="ss-quote-role">{story.quote.role}</span>
              </div>
            </footer>
          </blockquote>
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
          <Link href="/" className="ss-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to home
          </Link>
        </div>

      </article>

      <Footer />
      <AuthModal mode={authMode} open={authOpen} onClose={() => setAuthOpen(false)} onSwitch={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} onSuccess={() => {}} />
    </>
  )
}
