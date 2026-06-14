'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ProgressBar() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    setWidth(0)

    const t1 = setTimeout(() => setWidth(30), 10)
    const t2 = setTimeout(() => setWidth(70), 150)
    const t3 = setTimeout(() => setWidth(100), 350)
    const t4 = setTimeout(() => setVisible(false), 550)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${width}%`,
        background: '#0F0F14',
        zIndex: 9999,
        transition: width === 0 ? 'none' : 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: 'none',
      }}
    />
  )
}
