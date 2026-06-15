'use client'

import { useRef } from 'react'
import Img from './Img'

const INSITU_ITEMS = [
  { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85', label: 'Modern Living Room', title: 'Contemporary Arrangement', tag: 'Residential' },
  { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85', label: 'Executive Office', title: 'Authority & Gravitas', tag: 'Commercial' },
  { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85', label: 'Boutique Café', title: 'Warm Atmosphere', tag: 'Hospitality' },
  { img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85', label: 'Hotel Lobby', title: 'Grand Welcome', tag: 'Hospitality' },
  { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85', label: 'Luxury Bedroom', title: 'Quiet Luxury', tag: 'Residential' },
  { img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=85', label: 'Home Library', title: 'Curated Calm', tag: 'Residential' },
]

export default function InSitu() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 480 : -480, behavior: 'smooth' })
  }

  return (
    <div className="insitu-outer">
      <div className="insitu-header">
        <div>
          <h2 className="insitu-title">Painted for the room<br />it lives in.</h2>
          <p className="insitu-sub">Every painting comes to life in context. Explore interiors where art completes the space.</p>
        </div>
        <div className="insitu-nav">
          <button className="insitu-nav-btn" onClick={() => scroll('left')} aria-label="Scroll left">
            <span className="material-icons" style={{ fontSize: 20 }}>arrow_back</span>
          </button>
          <button className="insitu-nav-btn" onClick={() => scroll('right')} aria-label="Scroll right">
            <span className="material-icons" style={{ fontSize: 20 }}>arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="insitu-track" ref={scrollRef}>
        {INSITU_ITEMS.map((item, i) => (
          <div key={i} className="insitu-card">
            <div className="insitu-card-img">
              <Img src={item.img} alt={item.title} />
            </div>
            <div className="insitu-card-caption">
              <span className="insitu-card-tag">{item.tag}</span>
              <p className="insitu-card-label">{item.label}</p>
              <strong className="insitu-card-title">{item.title}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
