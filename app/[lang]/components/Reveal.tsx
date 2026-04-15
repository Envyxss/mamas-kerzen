'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  distance?: number
  className?: string
  style?: React.CSSProperties
}

export default function Reveal({
  children,
  delay = 0,
  distance = 24,
  className = '',
  style = {},
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity 0.65s cubic-bezier(0.33,1,0.68,1) ${delay}ms, transform 0.65s cubic-bezier(0.33,1,0.68,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
