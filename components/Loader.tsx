'use client'

import { useState, useEffect } from 'react'

export default function Loader({ done }: { done: boolean }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 1800
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)
      if (p >= 100) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (done) setTimeout(() => setHidden(true), 600)
  }, [done])

  if (hidden) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.5s ease', opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'all',
    }}>
      <svg width="140" height="36" viewBox="0 0 140 36" fill="none">
        <text x="0" y="28" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="26" fill="#191947" letterSpacing="-1">Paintora</text>
      </svg>
      <div style={{ marginTop: '2.5rem', width: '180px', height: '3px', borderRadius: '2px', background: '#F0F0F0', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#191947', borderRadius: '2px', width: `${progress}%`, transition: 'width 0.1s linear' }} />
      </div>
      <p style={{ marginTop: '1.25rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#9898A6', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Loading gallery…
      </p>
    </div>
  )
}
