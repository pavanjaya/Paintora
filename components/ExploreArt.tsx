import Link from 'next/link'

const STYLES_LIST = [
  { name: 'Abstract Expressionism', tag: 'Emotion & Movement',     slug: 'abstract',        img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&q=70' },
  { name: 'Minimalism',             tag: 'Form & Negative Space',  slug: 'minimalist',      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=70' },
  { name: 'Impressionism',          tag: 'Light & Atmosphere',     slug: 'impressionism',   img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&q=70' },
  { name: 'Geometric',              tag: 'Pattern & Precision',    slug: 'geometric',       img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70' },
  { name: 'Landscape',              tag: 'Horizon & Depth',        slug: 'landscape',       img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&q=70' },
  { name: 'Contemporary',           tag: 'Modern Voices',          slug: 'contemporary',    img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200&q=70' },
]

const MEDIUMS_LIST = [
  { name: 'Oil Painting', tag: '5,400+ works', slug: 'oil',         img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&q=70' },
  { name: 'Acrylic',      tag: '4,200+ works', slug: 'acrylic',     img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=70' },
  { name: 'Watercolor',   tag: '3,100+ works', slug: 'watercolor',  img: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=200&q=70' },
  { name: 'Mixed Media',  tag: '2,400+ works', slug: 'mixed-media', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=200&q=70' },
  { name: 'Ink',          tag: '1,800+ works', slug: 'oil',         img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=70' },
  { name: 'Charcoal',     tag: '1,200+ works', slug: 'oil',         img: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=200&q=70' },
]

const SUBJECTS_LIST = [
  { name: 'Landscape',    tag: '6,200+ works', slug: 'landscape',    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&q=70' },
  { name: 'Architecture', tag: '3,400+ works', slug: 'architecture', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=70' },
  { name: 'Floral',       tag: '2,800+ works', slug: 'floral',       img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc98?w=200&q=70' },
  { name: 'Nature',       tag: '4,100+ works', slug: 'nature',       img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=70' },
  { name: 'Portrait',     tag: '2,200+ works', slug: 'portrait',     img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=70' },
  { name: 'Cityscape',    tag: '2,900+ works', slug: 'architecture', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&q=70' },
]

function ArtCol({ title, items, baseHref, exploreHref }: {
  title: string
  items: { name: string; tag: string; slug: string; img: string }[]
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
            <img src={item.img} alt={item.name} className="loaded" loading="lazy" decoding="async" />
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

export default function ExploreArt({ onStylesPage }: { onStylesPage: () => void }) {
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
          <ArtCol title="Styles"   items={STYLES_LIST}   baseHref="/styles"   exploreHref="/styles" />
          <ArtCol title="Mediums"  items={MEDIUMS_LIST}  baseHref="/mediums"  exploreHref="/mediums" />
          <ArtCol title="Subjects" items={SUBJECTS_LIST} baseHref="/subjects" exploreHref="/subjects" />
        </div>
      </div>
    </div>
  )
}
