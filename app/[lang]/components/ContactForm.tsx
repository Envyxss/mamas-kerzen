'use client'

import { useState } from 'react'
import { CheckIcon } from './Icons'

interface ContactDict {
  name: string; email: string; message: string
  send: string; sent: string; or: string; instagram: string; whatsapp: string
}

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-14 rounded-[20px]"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'oklch(48% 0.095 152 / 0.12)', color: 'var(--green-ok)' }}>
          <CheckIcon size={24} />
        </div>
        <p className="font-medium text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
          {dict.sent}
        </p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}
        className="rounded-[20px] p-7 space-y-5 mb-8"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
        {[
          { key: 'name', label: dict.name, type: 'text' },
          { key: 'email', label: dict.email, type: 'email' },
        ].map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              {label}
            </label>
            <input type={type} required
              value={form[key as 'name' | 'email']}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full rounded-[14px] px-4 py-3 text-sm focus:outline-none transition-colors"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-page)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            {dict.message}
          </label>
          <textarea required rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-[14px] px-4 py-3 text-sm focus:outline-none resize-none"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-page)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}
          />
        </div>
        {error && (
          <p className="text-sm" style={{ color: 'oklch(55% 0.18 25)', fontFamily: 'var(--font-body)' }}>
            {error}
          </p>
        )}
        <button type="submit" disabled={loading}
          className="btn-press w-full text-white font-semibold py-3 rounded-[14px] text-sm flex items-center justify-center gap-2"
          style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)', opacity: loading ? 0.7 : 1 }}>
          {loading ? (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M8 2a6 6 0 016 6" strokeLinecap="round" />
            </svg>
          ) : null}
          {dict.send}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{dict.or}</p>
        <div className="flex justify-center gap-3">
          {[
            {
              href: 'https://instagram.com',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="12" height="12" rx="3.5"/><circle cx="8" cy="8" r="3"/><circle cx="11.5" cy="4.5" r="0.5" fill="currentColor"/></svg>,
              label: dict.instagram,
            },
            {
              href: 'https://wa.me/',
              icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 13.5L3.5 10A6 6 0 1113 5.5"/><path d="M6 6.5C6.5 7.5 7.5 8.5 8.5 9C8.5 9 9.5 8.5 10 9L11 10C10 11 8.5 11 7 9.5C5.5 8 5 6.5 6 5.5L7 6.5C7.5 7 7 8 6 6.5Z"/></svg>,
              label: dict.whatsapp,
            },
          ].map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-sm font-medium"
              style={{ background: 'var(--bg-sand)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
