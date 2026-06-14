'use client'

import { useState, useEffect } from 'react'

const TESTIMONIALS = [
  {
    quote: 'Paintora transformed my living room into a gallery. The curation is exquisite — every piece feels intentional.',
    name: 'Emma R.',
    title: 'Interior Designer',
    location: 'New York',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'I found art I never would have discovered on my own. The AI curation is remarkably aligned with my personal taste.',
    name: 'James K.',
    title: 'Architect',
    location: 'London',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'The quality and accessibility make this platform exceptional. My clients love the curated selections.',
    name: 'Sofia M.',
    title: 'Art Consultant',
    location: 'Paris',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'We sourced every piece for our boutique hotel through Paintora. The process was seamless and the results stunning.',
    name: 'Ravi S.',
    title: 'Hospitality Director',
    location: 'Mumbai',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'As a law firm, we needed art that conveyed authority and calm. Paintora nailed the brief on the first pass.',
    name: 'Priya N.',
    title: 'Senior Partner',
    location: 'Bangalore',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'Genuinely the best way to discover original art online. The filter by space feature is a game changer.',
    name: 'Lucas M.',
    title: 'Creative Director',
    location: 'Berlin',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'We redesigned our entire office with Paintora. The team\'s taste is impeccable and delivery was flawless.',
    name: 'Ananya T.',
    title: 'Founder & CEO',
    location: 'Delhi',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80',
    stars: 5,
  },
  {
    quote: 'Bought three pieces for my home. Each arrived perfectly packaged with a certificate. Will be back for more.',
    name: 'Daniel F.',
    title: 'Homeowner',
    location: 'Sydney',
    img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&q=80',
    stars: 5,
  },
]

const PER_PAGE = 3

function Stars({ count }: { count: number }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#0F0F14" stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE)
  const visible = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(p => (p + 1) % totalPages)
    }, 4000)
    return () => clearInterval(timer)
  }, [totalPages])

  return (
    <section className="testimonials-section">
      <div className="testimonials-head">
        <div>
          <h2 className="section-title">Trusted by designers<br />and homeowners.</h2>
          <p className="testimonials-sub">{TESTIMONIALS.length}+ verified reviews from artists, designers, and collectors.</p>
        </div>
        <div className="testimonials-nav">
          <button
            className="testimonials-nav-btn"
            onClick={() => setPage(p => (p - 1 + totalPages) % totalPages)}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            className="testimonials-nav-btn"
            onClick={() => setPage(p => (p + 1) % totalPages)}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="testimonials-grid">
        {visible.map((t, i) => (
          <div key={`${page}-${i}`} className="testimonial-card">
            <Stars count={t.stars} />
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <img
                src={t.img}
                alt={t.name}
                className="testimonial-avatar loaded"
              />
              <div className="testimonial-author-info">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-title">{t.title} · {t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="testimonials-dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`testimonials-dot${i === page ? ' active' : ''}`}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
