'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('page-entered')
    // Force reflow so the animation retriggers on navigation
    void el.offsetHeight
    el.classList.add('page-entered')
  }, [pathname])

  return (
    <div ref={ref} className="page-transition">
      {children}
    </div>
  )
}
