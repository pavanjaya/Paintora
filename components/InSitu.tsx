import Img from './Img'

const INSITU_ITEMS = [
  { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', label: 'Modern Living Room', title: 'Contemporary Arrangement' },
  { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', label: 'Executive Office', title: 'Authority & Gravitas' },
  { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', label: 'Boutique Café', title: 'Warm Atmosphere' },
  { img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', label: 'Hotel Lobby', title: 'Grand Welcome' },
]

export default function InSitu() {
  return (
    <div className="insitu-outer">
      <div className="insitu-inner">
        <div style={{ maxWidth: 560 }}>
          <h2 className="insitu-title">Painted for the room<br />it lives in.</h2>
          <p className="insitu-sub">
            Every painting comes to life in context. Explore thoughtfully designed interiors where artwork complements architecture, light, material, and mood.
          </p>
        </div>
        <div className="insitu-grid">
          {INSITU_ITEMS.map((item, i) => (
            <div key={i} className="insitu-img-wrap">
              <Img src={item.img} alt={item.title} />
              <div className="insitu-caption">
                <p>{item.label}</p>
                <strong>{item.title}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
