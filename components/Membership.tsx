'use client'

import { useState } from 'react'

const PLANS = [
  {
    name: 'Explorer', monthly: 0, yearly: 0,
    desc: 'Start discovering art with our free tier. Perfect for casual browsers.',
    features: [
      { text: 'Browse 10,000 artworks', on: true },
      { text: 'Standard resolution downloads', on: true },
      { text: '5 saves per month', on: true },
      { text: 'AI art recommendations', on: false },
      { text: 'Unlimited downloads', on: false },
      { text: 'Commercial licensing', on: false },
    ],
    cta: 'Start free', featured: false,
  },
  {
    name: 'Collector', monthly: 12, yearly: 9,
    desc: 'For art enthusiasts who want unlimited access to our full catalog.',
    features: [
      { text: 'Full catalog of 50,000+ works', on: true },
      { text: 'High-resolution downloads', on: true },
      { text: 'Unlimited saves', on: true },
      { text: 'AI art recommendations', on: true },
      { text: 'Unlimited downloads', on: true },
      { text: 'Commercial licensing', on: false },
    ],
    cta: 'Start free trial', featured: true, badge: 'Most Popular',
  },
  {
    name: 'Studio', monthly: 39, yearly: 29,
    desc: 'For designers, agencies, and studios needing commercial rights.',
    features: [
      { text: 'Everything in Collector', on: true },
      { text: 'Commercial use license', on: true },
      { text: 'Extended license options', on: true },
      { text: 'Team collaboration', on: true },
      { text: 'Priority support', on: true },
      { text: 'Custom collections', on: true },
    ],
    cta: 'Start free trial', featured: false,
  },
]

export default function Membership({ onSignup }: { onSignup: () => void }) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <div className="membership-outer" id="membership">
      <div className="mem-inner">
        <div className="mem-top">
          <span className="mem-eyebrow">Membership</span>
          <h2 className="mem-heading">Start free.<br />Scale as you grow.</h2>
          <p className="mem-sub">No credit card required. Upgrade or downgrade at any time.</p>
          <div className="mem-proof">
            <div className="mem-proof-avatars">
              {[1, 2, 3, 4].map(n => (
                <img key={n} className="mem-avatar loaded" src={`https://i.pravatar.cc/56?img=${n * 11}`} alt="Member" style={{ marginLeft: n > 1 ? -8 : 0 }} />
              ))}
            </div>
            <p className="mem-proof-text"><strong>12,400+</strong> collectors worldwide</p>
          </div>
        </div>

        <div className="mem-toggle-wrap">
          <button className={`mem-toggle${billing === 'monthly' ? ' active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
          <button className={`mem-toggle${billing === 'yearly' ? ' active' : ''}`} onClick={() => setBilling('yearly')}>
            Yearly <span className="mem-toggle-badge">Save 25%</span>
          </button>
        </div>

        <div className="mem-plans">
          {PLANS.map((p, i) => (
            <div key={i} className={`mem-plan${p.featured ? ' mem-plan-featured' : ''}`}>
              {p.badge && <div className="mem-plan-badge">{p.badge}</div>}
              <div className="mem-plan-top">
                <div className="mem-plan-name" style={p.featured ? { color: 'rgba(255,255,255,0.6)' } : {}}>{p.name}</div>
                <div className="mem-plan-price-row">
                  <span className="mem-plan-price" style={p.featured ? { color: '#fff' } : {}}>${billing === 'yearly' ? p.yearly : p.monthly}</span>
                  <div>
                    <span className="mem-plan-period" style={p.featured ? { color: 'rgba(255,255,255,0.5)' } : {}}>/mo</span>
                    {billing === 'yearly' && p.monthly > 0 && <div className="mem-plan-original">${p.monthly}/mo</div>}
                  </div>
                </div>
                <p className="mem-plan-desc" style={p.featured ? { color: 'rgba(255,255,255,0.65)' } : {}}>{p.desc}</p>
                {p.featured
                  ? <button className="mem-plan-cta-solid" onClick={onSignup}>{p.cta}</button>
                  : <button className="mem-plan-cta-ghost" onClick={onSignup}>{p.cta}</button>
                }
              </div>
              <div className="mem-plan-divider" style={p.featured ? { background: 'rgba(255,255,255,0.15)' } : {}} />
              <ul className="mem-plan-features">
                {p.features.map((f, j) => (
                  <li key={j} className={`mem-feature${!f.on ? ' mem-feature-off' : ''}`}>
                    {f.on
                      ? <span className="mem-check" style={{ color: p.featured ? '#22C55E' : 'var(--sage)' }}>✓</span>
                      : <span className="mem-check mem-check-off" style={p.featured ? { color: 'rgba(255,255,255,0.3)' } : {}}>–</span>
                    }
                    <span style={p.featured ? { color: f.on ? '#fff' : 'rgba(255,255,255,0.4)' } : {}}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mem-trust">
          {[{ icon: '🔒', text: 'Cancel anytime' }, { icon: '💳', text: 'No credit card required' }, { icon: '⭐', text: '4.9/5 rating' }, { icon: '🎨', text: '50,000+ artworks' }].map((item, i) => (
            <div key={i} className="mem-trust-item">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
