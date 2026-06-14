'use client'

import Img from './Img'

const SPACES = [
  { name: 'Living Room',      count: '2,400+', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&fit=crop', desc: 'Paintings for warmth and gathering' },
  { name: 'Bedroom',          count: '1,800+', img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80&fit=crop', desc: 'Calm, restful, intentional' },
  { name: 'Dining Room',      count: '1,200+', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&fit=crop', desc: 'Conversation-starting pieces' },
  { name: 'Home Office',      count: '980+',   img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80&fit=crop', desc: 'Focus and creative energy' },
  { name: 'Law Office',       count: '640+',   img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop', desc: 'Authority and gravitas' },
  { name: 'Corporate Office', count: '820+',   img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&fit=crop', desc: 'Brand-aligned curation' },
  { name: 'Hotel Lobby',      count: '560+',   img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&fit=crop', desc: 'Grand, welcoming statements' },
  { name: 'Restaurant',       count: '720+',   img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop', desc: 'Atmosphere and ambience' },
]

export default function SpacesGrid({ onSpacePage }: { onSpacePage: () => void }) {
  return (
    <div className="spaces-outer" id="spaces">
      <div className="spaces-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Designed for every space.</h2>
          </div>
          <button className="view-all" onClick={onSpacePage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all</button>
        </div>
        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <div key={i} className="space-card" onClick={onSpacePage}>
              <Img src={s.img} alt={s.name} />
              <div className="space-overlay">
                <div className="space-name">{s.name}</div>
                <div className="space-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
