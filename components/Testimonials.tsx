'use client'

import { useState, useEffect } from 'react'

const TESTIMONIALS = [
  {
    quote: 'Paintora transformed my living room into a gallery. The curation is exquisite — every piece feels intentional.',
    name: 'Emma R.',
    title: 'Interior Designer',
    location: 'New York',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    quote: 'As a law firm, we needed art that conveyed authority and calm. Paintora nailed the brief on the first pass.',
    name: 'Priya N.',
    title: 'Senior Partner',
    location: 'Bangalore',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80',
  },
  {
    quote: 'We sourced every piece for our boutique hotel through Paintora. The process was seamless and the results stunning.',
    name: 'Ravi S.',
    title: 'Hospitality Director',
    location: 'Mumbai',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
  },
  {
    quote: 'The filter by space feature is a game changer. Genuinely the best way to discover original art online.',
    name: 'Lucas M.',
    title: 'Creative Director',
    location: 'Berlin',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
  },
  {
    quote: 'We redesigned our entire office with Paintora. The taste is impeccable.',
    name: 'Ananya T.',
    title: 'Founder & CEO',
    location: 'Delhi',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive(i => (i + 1) % TESTIMONIALS.length)
        setFading(false)
      }, 350)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => { setActive(i); setFading(false) }, 350)
  }

  const t = TESTIMONIALS[active]

  return (
    <section className="testi-section">
      <div className="testi-inner">
        <div className="testi-label">What people say</div>

        <div className={`testi-quote-wrap${fading ? ' fading' : ''}`}>
          <div className="testi-mark">"</div>
          <p className="testi-quote">{t.quote}</p>
          <div className="testi-author">
            <img src={t.img} alt={t.name} className="testi-avatar loaded" loading="lazy" decoding="async" />
            <div>
              <div className="testi-name">{t.name}</div>
              <div className="testi-role">{t.title} · {t.location}</div>
            </div>
          </div>
        </div>

        <div className="testi-dots">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} className={`testi-dot${i === active ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
