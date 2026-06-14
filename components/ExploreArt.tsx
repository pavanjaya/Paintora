import Link from 'next/link'

const STYLES_LIST = [
  { name: 'Abstract Expressionism', tag: 'Emotion & Movement', slug: 'abstract' },
  { name: 'Minimalism',             tag: 'Form & Negative Space', slug: 'minimalist' },
  { name: 'Impressionism',          tag: 'Light & Atmosphere', slug: 'impressionism' },
  { name: 'Geometric',              tag: 'Pattern & Precision', slug: 'geometric' },
  { name: 'Landscape',              tag: 'Horizon & Depth', slug: 'landscape' },
  { name: 'Contemporary',           tag: 'Modern Voices', slug: 'contemporary' },
  { name: 'Portraiture',            tag: 'Character & Expression', slug: 'portrait' },
]

const MEDIUMS_LIST = [
  { name: 'Oil Painting', tag: '5,400+ works', slug: 'oil' },
  { name: 'Acrylic',      tag: '4,200+ works', slug: 'acrylic' },
  { name: 'Watercolor',   tag: '3,100+ works', slug: 'watercolor' },
  { name: 'Mixed Media',  tag: '2,400+ works', slug: 'mixed-media' },
  { name: 'Ink',          tag: '1,800+ works', slug: 'oil' },
  { name: 'Charcoal',     tag: '1,200+ works', slug: 'oil' },
  { name: 'Digital',      tag: '2,900+ works', slug: 'oil' },
]

const SUBJECTS_LIST = [
  { name: 'Landscape',    tag: '6,200+ works', slug: 'landscape' },
  { name: 'Architecture', tag: '3,400+ works', slug: 'architecture' },
  { name: 'Floral',       tag: '2,800+ works', slug: 'floral' },
  { name: 'Nature',       tag: '4,100+ works', slug: 'nature' },
  { name: 'Portrait',     tag: '2,200+ works', slug: 'portrait' },
  { name: 'Animals',      tag: '1,600+ works', slug: 'nature' },
  { name: 'Cityscape',    tag: '2,900+ works', slug: 'architecture' },
]

function ArtCol({ title, items, baseHref, exploreHref }: {
  title: string
  items: { name: string; tag: string; slug: string }[]
  baseHref: string
  exploreHref: string
}) {
  return (
    <div>
      <h3 style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <Link
            key={i}
            href={`${baseHref}/${item.slug}`}
            className="style-card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}
          >
            <div className="style-card-info" style={{ flex: 1 }}>
              <div className="style-name">{item.name}</div>
              <span className="style-tag">{item.tag}</span>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={exploreHref}
        className="view-all"
        style={{ marginTop: '1rem', background: 'none', border: '1.5px solid var(--border)', fontFamily: 'var(--sans)', textDecoration: 'none', display: 'inline-block' }}
      >
        Explore more
      </Link>
    </div>
  )
}

export default function ExploreArt({ onGallery, onStylesPage }: { onGallery: () => void; onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Explore art.</h2>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 6 }}>Discover paintings through artistic language, medium, and subject.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '1.5rem' }}>
          <ArtCol title="Styles"   items={STYLES_LIST}   baseHref="/styles"   exploreHref="/styles/abstract" />
          <ArtCol title="Mediums"  items={MEDIUMS_LIST}  baseHref="/mediums"  exploreHref="/mediums/oil" />
          <ArtCol title="Subjects" items={SUBJECTS_LIST} baseHref="/subjects" exploreHref="/subjects/landscape" />
        </div>
      </div>
    </div>
  )
}
