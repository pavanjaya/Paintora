import Img from './Img'
import { STYLES } from '@/lib/data'

export default function StylesSection({ onStylesPage }: { onStylesPage: () => void }) {
  return (
    <div className="styles-outer">
      <div className="styles-inner">
        <div className="section-head">
          <div>
            <div className="section-label" style={{ color: 'var(--amber)', background: 'var(--amber-light)' }}>Art Styles</div>
            <h2 className="section-title">Explore by<br />artistic movement</h2>
          </div>
          <button className="view-all" onClick={onStylesPage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>All styles</button>
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
