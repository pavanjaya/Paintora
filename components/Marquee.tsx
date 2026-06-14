export default function Marquee() {
  const items = ['Contemporary Art', '·', 'AI Curated', '·', '50,000+ Works', '·', 'Free High-Resolution Downloads', '·', 'Licensed for Commercial Use', '·', 'New Artworks Weekly', '·']
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className={item === '·' ? 'dot' : ''}>{item}</span>
        ))}
      </div>
    </div>
  )
}
