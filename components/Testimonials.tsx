import { TESTIMONIALS } from '@/lib/data'

export default function Testimonials() {
  return (
    <section>
      <div className="section-head">
        <div>
          <h2 className="section-title">What our clients<br />are saying.</h2>
        </div>
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
