'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
}

export default function ShippingBanner({ text }: Props) {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    try {
      const val = localStorage.getItem('shipping_banner_dismissed')
      if (!val) setDismissed(false)
    } catch {}
  }, [])

  function dismiss() {
    setDismissed(true)
    try { localStorage.setItem('shipping_banner_dismissed', '1') } catch {}
  }

  if (dismissed) return null

  return (
    <div
      className="flex items-center justify-center gap-3 py-2 px-4 relative"
      style={{ background: 'var(--terra)', color: '#fff' }}
    >
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', textAlign: 'center' }}>
        {text}
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
        style={{ color: '#fff', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  )
}
