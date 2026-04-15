import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../../dictionaries'
import Reveal from '../components/Reveal'

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return { title: `${dict.process.title} – Mamas Kerzen`, description: dict.process.subtitle }
}

const stepIcons = [
  // 1 – Selecting Materials: leaf
  <svg key="1" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 19V11"/><path d="M11 11C11 11 6 10 3.5 6C1 2 6.5 1.5 9.5 3.5C9.5 3.5 11 6.5 11 11Z"/><path d="M11 11C11 11 16 10 18.5 6C21 2 15.5 1.5 12.5 3.5C12.5 3.5 11 6.5 11 11Z"/></svg>,
  // 2 – Wax: thermometer
  <svg key="2" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 13.5V4a2 2 0 00-4 0v9.5a4 4 0 104 0z"/><path d="M9 10h2"/></svg>,
  // 3 – Fragrance: drop
  <svg key="3" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 3C11 3 5 9.5 5 13.5C5 16.8 7.7 19.5 11 19.5C14.3 19.5 17 16.8 17 13.5C17 9.5 11 3 11 3Z"/></svg>,
  // 4 – Pouring: pour jar
  <svg key="4" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="5" y="10" width="12" height="9" rx="2"/><path d="M8 10V7a3 3 0 016 0v3"/><path d="M14 3l3-2"/><path d="M14 3l1 3"/></svg>,
  // 5 – Cooling: snowflake
  <svg key="5" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 3v16M3 11h16M5.5 5.5l11 11M16.5 5.5l-11 11"/><circle cx="11" cy="11" r="2"/></svg>,
  // 6 – Packaging: gift box
  <svg key="6" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="9" width="18" height="11" rx="2"/><path d="M2 9h18"/><path d="M11 9V20"/><path d="M7.5 9C6 7 6 5 8 5C9.5 5 11 7 11 9"/><path d="M14.5 9C16 7 16 5 14 5C12.5 5 11 7 11 9"/></svg>,
]

export default async function ProcessPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const p = dict.process

  const steps = [
    { title: p.step1_title, desc: p.step1_desc },
    { title: p.step2_title, desc: p.step2_desc },
    { title: p.step3_title, desc: p.step3_desc },
    { title: p.step4_title, desc: p.step4_desc },
    { title: p.step5_title, desc: p.step5_desc },
    { title: p.step6_title, desc: p.step6_desc },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-14">
      {/* Header */}
      <Reveal>
        <div className="mb-16">
          <p className="text-xs font-medium uppercase tracking-widest mb-4"
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
            Herstellung
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              color: 'var(--text)',
              marginBottom: '0.5rem',
            }}
          >
            {p.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', maxWidth: '48ch' }}>
            {p.subtitle}
          </p>
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute top-6 bottom-6 hidden sm:block"
          style={{ left: '1.375rem', width: '1px', background: 'var(--border-soft)' }}
        />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex gap-6 items-start">
                {/* Icon circle */}
                <div
                  className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--terra)',
                  }}
                >
                  {stepIcons[i]}
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-[18px] p-5 mb-1"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="font-medium text-base"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
