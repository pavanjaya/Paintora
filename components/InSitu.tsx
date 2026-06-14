import Img from './Img'
import { INSITU } from '@/lib/data'

export default function InSitu() {
  return (
    <div className="insitu-outer">
      <div className="insitu-inner">
        <div style={{ maxWidth: 560 }}>
          <h2 className="insitu-title">Painted for the room<br />it lives in.</h2>
          <p className="insitu-sub">
            Every piece in our archive is conceived alongside the architecture it inhabits — light, scale, material, intention.
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
