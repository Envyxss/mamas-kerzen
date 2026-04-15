'use client'

import { useState, useEffect } from 'react'

interface Props {
  cookieText: string
  cookieAccept: string
  cookieDecline: string
}

export default function CookieBanner({ cookieText, cookieAccept, cookieDecline }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent')
      if (!consent) setVisible(true)
    } catch {}
  }, [])

  function accept() {
    try { localStorage.setItem('cookie_consent', 'accepted') } catch {}
    setVisible(false)
  }

  function decline() {
    try { localStorage.setItem('cookie_consent', 'declined') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 shadow-lg rounded-t-[20px]"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-soft)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {cookieText}
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 rounded-[14px] text-sm font-medium transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', background: 'var(--bg-sand)', border: '1px solid var(--border)' }}
          >
            {cookieDecline}
          </button>
          <button
            onClick={accept}
            className="btn-press px-5 py-2 rounded-[14px] text-sm font-medium text-white"
            style={{ fontFamily: 'var(--font-body)', background: 'var(--terra)' }}
          >
            {cookieAccept}
          </button>
        </div>
      </div>
    </div>
  )
}
