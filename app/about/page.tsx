import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About | Paintora',
  description: 'Paintora curates contemporary paintings for homes, offices, and thoughtfully designed interiors. Learn about our mission and story.',
}

const STATS = [
  { value: '500+', label: 'Curated artworks' },
  { value: '12+', label: 'Countries served' },
  { value: '200+', label: 'Happy collectors' },
  { value: '50+', label: 'Artists featured' },
]

const VALUES = [
  {
    icon: '🎨',
    title: 'Curation over quantity',
    desc: 'Every painting on Paintora is hand-selected. We say no to 90% of submissions so you never have to sift through noise.',
  },
  {
    icon: '🏠',
    title: 'Art for real spaces',
    desc: 'We think about where art lives — your living room, your law office, your hotel lobby. Our collections are organised around life, not art movements.',
  },
  {
    icon: '✍️',
    title: 'Artists first',
    desc: 'We pay artists fairly and prominently credit their work. When you buy through Paintora, the artist earns more than they would through a traditional gallery.',
  },
  {
    icon: '📦',
    title: 'Delivered with care',
    desc: 'Every piece arrives professionally packed with a certificate of authenticity and hanging instructions. Ready to go on the wall the day it arrives.',
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="about-page">
        {/* Nav — simple header */}
        <header className="about-header">
          <Link href="/" className="about-logo">
            <img src="/logo.svg" alt="Paintora" style={{ height: 26, width: 'auto' }} />
          </Link>
          <nav className="about-header-nav">
            <Link href="/trending" className="about-header-link">Browse</Link>
            <Link href="/spaces" className="about-header-link">Spaces</Link>
            <Link href="/" className="about-header-cta">Start exploring</Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-inner">
            <p className="about-eyebrow">Our story</p>
            <h1 className="about-hero-title">Art belongs in every space.<br />We make that possible.</h1>
            <p className="about-hero-sub">
              Paintora was built for people who believe their surroundings shape how they think, feel, and work — and who want art that fits their life, not a museum wall.
            </p>
          </div>
          <div className="about-hero-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&q=80"
              alt="Paintings in a bright interior"
              className="about-hero-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="about-stats">
          {STATS.map(s => (
            <div key={s.label} className="about-stat">
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Mission */}
        <section className="about-mission">
          <div className="about-mission-inner">
            <div className="about-mission-text">
              <p className="about-section-label">Our mission</p>
              <h2 className="about-section-title">Making original art accessible — not aspirational.</h2>
              <p className="about-body">
                For too long, buying original art meant knowing the right gallerist, attending the right openings, or spending a fortune. We think that&rsquo;s broken.
              </p>
              <p className="about-body">
                Paintora removes the gatekeeping. We work directly with emerging and established artists, curate their work with real spaces in mind, and make it straightforward to discover, enquire, and own a piece you&rsquo;ll love for decades.
              </p>
              <p className="about-body">
                No art-world jargon. No inflated gallery markups. Just great paintings, honestly priced, beautifully presented.
              </p>
            </div>
            <div className="about-mission-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80"
                alt="Artist at work"
                className="about-mission-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          <div className="about-values-inner">
            <p className="about-section-label">What we stand for</p>
            <h2 className="about-section-title">How we think about art.</h2>
            <div className="about-values-grid">
              {VALUES.map(v => (
                <div key={v.title} className="about-value-card">
                  <span className="about-value-icon">{v.icon}</span>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta-section">
          <div className="about-cta-inner">
            <h2 className="about-cta-title">Find art that belongs in your space.</h2>
            <p className="about-cta-sub">Browse hundreds of curated paintings organised by room, style, and subject.</p>
            <div className="about-cta-actions">
              <Link href="/" className="about-cta-btn-primary">Browse paintings</Link>
              <Link href="/spaces" className="about-cta-btn-secondary">Browse by space</Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
