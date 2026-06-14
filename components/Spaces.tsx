'use client'

import { useState } from 'react'
import Img from './Img'
import { SPACES } from '@/lib/data'

const MOODS = ['Calm & Serene', 'Bold & Dramatic', 'Warm & Cozy', 'Modern & Minimal', 'Eclectic', 'Nature-Inspired']

export default function Spaces({ onSpacePage }: { onSpacePage: () => void }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  return (
    <div className="spaces-outer" id="spaces">
      <div className="spaces-inner">
        <div className="section-head">
          <div>
            <div className="section-label" style={{ color: 'var(--sage)', background: 'var(--sage-light)' }}>Spaces</div>
            <h2 className="section-title">Art for every<br />room in your home</h2>
          </div>
          <button className="view-all" onClick={onSpacePage} style={{ background: 'none', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Explore all spaces</button>
        </div>
        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <div key={i} className="space-card" onClick={onSpacePage}>
              <Img src={s.img} alt={s.name} />
              <div className="space-overlay">
                <div className="space-name">{s.name}</div>
                <div className="space-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mood-row">
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 8 }}>Mood:</span>
          {MOODS.map(m => (
            <button key={m} className={`mood-tag${activeTag === m ? ' active' : ''}`} onClick={() => setActiveTag(activeTag === m ? null : m)}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
