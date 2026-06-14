import Img from './Img'
import { STYLES } from '@/lib/data'

export default function StylesSection({ onStylesPage }: { onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Browse by painting style.</h2>
          </div>
          <button className="view-all" onClick={onStylesPage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>View all</button>
        </div>
        <div className="styles-scroll">
          {STYLES.map((s, i) => (
            <div key={i} className="style-card" onClick={onStylesPage}>
              <div className="style-card-info">
                <div className="style-name">{s.name}</div>
                <span className="style-tag">{s.tag}</span>
              </div>
              <Img src={s.img} alt={s.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
