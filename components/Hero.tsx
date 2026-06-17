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
          <span>12,400+ paintings</span>
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
