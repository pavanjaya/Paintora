import Link from 'next/link'
import Img from './Img'
import { STYLES } from '@/lib/data'

const STYLE_SLUGS: Record<string, string> = {
  'Abstract Expressionism': 'abstract',
  'Minimalism': 'minimalist',
  'Impressionism': 'impressionism',
  'Botanical Realism': 'floral',
  'Geometric': 'geometric',
  'Portraiture': 'portrait',
  'Landscape': 'landscape',
  'Surrealism': 'abstract',
}

export default function StylesSection({ onStylesPage }: { onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Browse by painting style.</h2>
          </div>
          <Link href="/styles" className="view-all" style={{ border: '1.5px solid var(--border)', borderRadius: 20, padding: '6px 16px', textDecoration: 'none', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>View all</Link>
        </div>
        <div className="styles-scroll">
          {STYLES.map((s, i) => (
            <Link key={i} href={`/styles/${STYLE_SLUGS[s.name] ?? s.name.toLowerCase().replace(/\s+/g, '-')}`} className="style-card" style={{ textDecoration: 'none' }}>
              <div className="style-card-info">
                <div className="style-name">{s.name}</div>
                <span className="style-tag">{s.tag}</span>
              </div>
              <Img src={s.img} alt={s.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
