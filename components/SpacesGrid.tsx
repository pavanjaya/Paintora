import Link from 'next/link'
import Img from './Img'

const SPACES = [
  { name: 'Living Room',      slug: 'living-room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&fit=crop', desc: 'Paintings for warmth and gathering' },
  { name: 'Bedroom',          slug: 'bedroom',     img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80&fit=crop', desc: 'Calm, restful, intentional' },
  { name: 'Dining Room',      slug: 'dining-room', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&fit=crop', desc: 'Conversation-starting pieces' },
  { name: 'Home Office',      slug: 'office',      img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80&fit=crop', desc: 'Focus and creative energy' },
  { name: 'Law Office',       slug: 'office',      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop', desc: 'Authority and gravitas' },
  { name: 'Corporate Office', slug: 'office',      img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&fit=crop', desc: 'Brand-aligned curation' },
  { name: 'Hotel Lobby',      slug: 'hotel',       img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&fit=crop', desc: 'Grand, welcoming statements' },
  { name: 'Restaurant',       slug: 'cafe',        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop', desc: 'Atmosphere and ambience' },
]

export default function SpacesGrid({ onSpacePage }: { onSpacePage: () => void }) {
  return (
    <div className="spaces-outer" id="spaces">
      <div className="spaces-inner">
        <div className="section-head">
          <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Designed for every space.</h2>
          <Link href="/spaces/office" className="view-all" style={{ border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', textDecoration: 'none' }}>View all</Link>
        </div>
        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <Link key={i} className="space-card" href={`/spaces/${s.slug}`} style={{ textDecoration: 'none' }}>
              <Img src={s.img} alt={s.name} />
              <div className="space-overlay">
                <div className="space-name">{s.name}</div>
                <div className="space-desc">{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
