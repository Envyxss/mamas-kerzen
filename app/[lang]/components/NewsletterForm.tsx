'use client'

import { useState } from 'react'

interface NewsletterDict {
  title: string
  subtitle: string
  placeholder: string
  button: string
  success: string
  success_hint: string
}

function MailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="22" height="16" rx="3"/>
      <path d="M3 9l11 7 11-7"/>
    </svg>
  )
}

export default function NewsletterForm({ dict }: { dict: NewsletterDict }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      try {
        const subs = JSON.parse(localStorage.getItem('newsletter_subs') || '[]')
        if (!subs.includes(email)) {
          localStorage.setItem('newsletter_subs', JSON.stringify([...subs, email]))
        }
      } catch {}
      setDone(true)
    } catch {
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div
        className="rounded-[24px] p-10 text-center"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
          style={{ background: 'oklch(from var(--terra) l c h / 0.1)', color: 'var(--terra)' }}
        >
          <MailIcon />
        </div>
        <p className="font-semibold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          {dict.success}
        </p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          {dict.success_hint}
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-[24px] p-8 sm:p-10 text-center"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
    >
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
        style={{ background: 'oklch(from var(--terra) l c h / 0.1)', color: 'var(--terra)' }}
      >
        <MailIcon />
      </div>
      <h2 className="text-2xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
        {dict.title}
      </h2>
      <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
        {dict.subtitle}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.placeholder}
          className="flex-1 px-4 py-3 rounded-[16px] text-sm focus:outline-none"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-page)',
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-press px-6 py-3 rounded-[16px] text-sm font-semibold text-white whitespace-nowrap flex items-center justify-center gap-2"
          style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M8 2a6 6 0 016 6" strokeLinecap="round" />
            </svg>
          ) : null}
          {dict.button}
        </button>
      </form>
      {error && (
        <p className="text-sm mt-3" style={{ color: 'oklch(55% 0.18 25)', fontFamily: 'var(--font-body)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
