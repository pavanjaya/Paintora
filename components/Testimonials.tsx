import { TESTIMONIALS } from '@/lib/data'

export default function Testimonials() {
  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label" style={{ margin: '0 auto 1.25rem' }}>Testimonials</div>
        <h2 className="section-title">Loved by collectors<br />and designers</h2>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-icon">&ldquo;</div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-title">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
