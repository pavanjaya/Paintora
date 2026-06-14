'use client'

import { useRef, useEffect } from 'react'

export default function Img({
  src, alt, className, style,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (ref.current?.complete) ref.current.classList.add('loaded')
  }, [src])
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onLoad={() => ref.current?.classList.add('loaded')}
    />
  )
}
