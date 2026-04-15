import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../../dictionaries'
import Reveal from '../components/Reveal'

function FireIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 2C11 2 7 6.5 7 10C7 12.2 8.8 14 11 14C13.2 14 15 12.2 15 10C15 7 13 4 11 2Z" />
      <path d="M11 14V20M8 20H14" />
    </svg>
  )
}
function ScissorsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="16" r="3" />
      <path d="M8.7 7.7L18 17M18 5L8.7 14.3" />
    </svg>
  )
}
function WindIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8h10a4 4 0 0 0 0-8 4 4 0 0 0 0 8" />
      <path d="M3 13h14a4 4 0 0 1 0 8 4 4 0 0 1 0-8" />
      <path d="M3 17h5" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="9" /><path d="M11 6v5l3 3" />
    </svg>
  )
}
function SnowflakeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 2v18M2 11h18M4.9 4.9l12.2 12.2M17.1 4.9L4.9 17.1" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 2L3 6v5c0 4.4 3.4 8.5 8 9.6C16.6 19.5 20 15.4 20 11V6l-9-4Z" />
    </svg>
  )
}

const icons = [FireIcon, ScissorsIcon, WindIcon, ClockIcon, SnowflakeIcon, ShieldIcon]

export default async function CarePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const tips = [
    { title: dict.care.tip1_title, text: dict.care.tip1_text },
    { title: dict.care.tip2_title, text: dict.care.tip2_text },
    { title: dict.care.tip3_title, text: dict.care.tip3_text },
    { title: dict.care.tip4_title, text: dict.care.tip4_text },
    { title: dict.care.tip5_title, text: dict.care.tip5_text },
    { title: dict.care.tip6_title, text: dict.care.tip6_text },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
      {/* Header */}
      <p className="page-eyebrow text-xs font-medium uppercase tracking-widest mb-3"
        style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
        Mamas Kerzen
      </p>
      <h1 className="page-title mb-3" style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)', lineHeight: '1.15',
      }}>
        {dict.care.title}
      </h1>
      <p className="page-subtitle mb-12 max-w-xl"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7' }}>
        {dict.care.subtitle}
      </p>

      {/* Tips grid — staggered */}
      <div className="grid sm:grid-cols-2 gap-5">
        {tips.map((tip, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={i} delay={i * 80} distance={20}>
              <div
                className="rounded-[20px] p-6 flex gap-4 h-full"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center"
                  style={{ background: 'oklch(from var(--terra) l c h / 0.1)', color: 'var(--terra)' }}
                >
                  <Icon />
                </div>
                <div>
                  <h3 className="font-semibold mb-1.5"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)' }}>
                    {tip.title}
                  </h3>
                  <p className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
                    {tip.text}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
