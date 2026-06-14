import Img from './Img'
import { INSITU } from '@/lib/data'

export default function InSitu() {
  return (
    <div className="insitu-outer">
      <div className="insitu-inner">
        <div style={{ maxWidth: 560 }}>
          <div className="section-label" style={{ color: 'var(--sky)', background: 'var(--sky-light)' }}>In Situ</div>
          <h2 className="insitu-title">See it in<br />your space first.</h2>
          <p className="insitu-sub">
            Every artwork is visualized in real home environments — so you can see exactly how it
            will feel before you commit.
          </p>
        </div>
        <div className="insitu-grid">
          {INSITU.map((item, i) => (
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
