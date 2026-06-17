import Link from 'next/link'
import Img from './Img'

const MOSAIC = [
  { src: '/paintings/painting-3.png', alt: 'Victoria Memorial gouache' },
  { src: '/paintings/painting-1.png', alt: 'Tagore portrait' },
  { src: '/paintings/painting-2.jpg', alt: 'Victoria Memorial watercolor' },
]

const SPACES = [
  { label: 'For living rooms',  href: '/spaces/living-room' },
  { label: 'For offices',       href: '/spaces/office' },
  { label: 'For hotel lobbies', href: '/spaces/hotel' },
  { label: 'For bedrooms',      href: '/spaces/bedroom' },
  { label: 'For cafés',         href: '/spaces/cafe' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">#1 Painting Platform in India</div>
        <h1 className="hero-title">Paintings that<br />define a space.</h1>
        <p className="hero-sub">
          Curated contemporary paintings designed through artistic direction and AI-assisted creativity. For modern homes, offices, and spaces of intention.
        </p>
        <div className="hero-chips-label">Popular spaces</div>
        <div className="hero-chips">
          {SPACES.map(s => (
            <Link key={s.label} href={s.href} className="hero-chip">{s.label}</Link>
          ))}
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <svg className="hero-stat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <div>
              <span className="hero-stat-num">50,000+</span>
              <span className="hero-stat-label">curated paintings</span>
            </div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <svg className="hero-stat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            <div>
              <span className="hero-stat-num">250+</span>
              <span className="hero-stat-label">collections</span>
            </div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <svg className="hero-stat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <div>
              <span className="hero-stat-num">40+</span>
              <span className="hero-stat-label">spaces</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-mosaic">
        <div className="hero-mosaic-col hero-mosaic-col-a">
          <div className="hero-mosaic-img hero-mosaic-img-tall">
            <Img src={MOSAIC[0].src} alt={MOSAIC[0].alt} />
          </div>
        </div>
        <div className="hero-mosaic-col hero-mosaic-col-b">
          <div className="hero-mosaic-img hero-mosaic-img-sm">
            <Img src={MOSAIC[1].src} alt={MOSAIC[1].alt} />
          </div>
          <div className="hero-mosaic-img hero-mosaic-img-sm">
            <Img src={MOSAIC[2].src} alt={MOSAIC[2].alt} />
          </div>
        </div>
      </div>
    </section>
  )
}
