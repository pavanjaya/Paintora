import Link from 'next/link'
import Img from './Img'

const MOSAIC = [
  { src: '/paintings/painting-1.jpg', alt: 'Tagore portrait' },
  { src: '/paintings/painting-2.jpg', alt: 'Victoria Memorial watercolor' },
  { src: '/paintings/painting-3.png', alt: 'Victoria Memorial gouache' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">Curated contemporary art</p>
        <h1 className="hero-title">Paintings that<br />define a space.</h1>
        <p className="hero-sub">
          Curated contemporary paintings designed through artistic direction and AI-assisted creativity. For modern homes, offices, and spaces of intention.
        </p>
        <div className="hero-ctas">
          <Link href="/discover" className="hero-cta-primary">Browse paintings</Link>
          <Link href="/collections" className="hero-cta-secondary">View collections</Link>
        </div>
        <div className="hero-stats">
          <span>12,400+ paintings</span>
          <span className="hero-stat-dot" />
          <span>340 artists</span>
          <span className="hero-stat-dot" />
          <span>Free delivery</span>
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
