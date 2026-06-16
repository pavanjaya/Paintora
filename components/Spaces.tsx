'use client'

import { useState } from 'react'
import Link from 'next/link'
import Img from './Img'
import { SPACES } from '@/lib/data'

const SPACE_SLUGS: Record<string, string> = {
  'Living Room': 'living-room',
  'Bedroom': 'bedroom',
  'Home Office': 'office',
  'Dining Room': 'dining-room',
}

const MOODS = ['Calm & Serene', 'Bold & Dramatic', 'Warm & Cozy', 'Modern & Minimal', 'Eclectic', 'Nature-Inspired']

export default function Spaces({ onSpacePage }: { onSpacePage: () => void }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  return (
    <div className="spaces-outer" id="spaces">
      <div className="spaces-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(18px,2vw,24px)' }}>Browse by space.</h2>
          </div>
          <Link href="/spaces" className="view-all" style={{ border: '1.5px solid var(--border)', borderRadius: 20, padding: '6px 16px', textDecoration: 'none', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>View all</Link>
        </div>
        <div className="spaces-grid">
          {SPACES.map((s, i) => (
            <Link key={i} href={`/spaces/${SPACE_SLUGS[s.name] ?? s.name.toLowerCase().replace(/\s+/g, '-')}`} className="space-card" style={{ textDecoration: 'none' }}>
              <Img src={s.img} alt={s.name} />
              <div className="space-overlay">
                <div className="space-name">{s.name}</div>
                <div className="space-desc">{s.desc}</div>
              </div>
            </Link>
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
