import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../../dictionaries'
import Reveal from '../components/Reveal'
import { LeafIcon, HandsIcon, EcoIcon } from '../components/Icons'

function CandleRoundIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="4" width="10" height="16" rx="2"/>
      <path d="M9 20h10M12 24h4M14 4V2M12 2.5C12 2.5 14 1 14 3"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2C10.13 2 7 5.13 7 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"/>
      <circle cx="14" cy="9" r="2.5"/>
    </svg>
  )
}

const valueIcons = [LeafIcon, HandsIcon, EcoIcon]

const values = [
  { key: 'value1' },
  { key: 'value2' },
  { key: 'value3' },
] as const

export default async function AboutPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const a = dict.about

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="text-center mb-16">
        <div
          className="page-icon inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'var(--bg-sand)', color: 'var(--terra)' }}
        >
          <CandleRoundIcon />
        </div>
        <h1 className="page-title text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text)' }}>
          {a.title}
        </h1>
        <p className="page-subtitle text-base" style={{ color: 'var(--text-muted)' }}>{a.subtitle}</p>
      </div>

      {/* Story */}
      <Reveal>
        <div
          className="rounded-[24px] p-8 mb-12"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
        >
          <h2 className="text-xl font-bold mb-5 tracking-tight" style={{ color: 'var(--text)' }}>{a.story_title}</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{a.story1}</p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a.story2}</p>
        </div>
      </Reveal>

      {/* Values */}
      <Reveal delay={100}>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-center" style={{ color: 'var(--text)' }}>
          {a.values_title}
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        {values.map(({ key }, i) => {
          const Icon = valueIcons[i]
          const titleKey = `${key}_title` as keyof typeof a
          const descKey = `${key}_desc` as keyof typeof a
          return (
            <Reveal key={key} delay={i * 100}>
              <div
                className="rounded-[20px] p-6 text-center h-full"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ background: 'oklch(from var(--terra) l c h / 0.1)', color: 'var(--terra)' }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--text)' }}>{a[titleKey]}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a[descKey]}</p>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Location */}
      <Reveal delay={50}>
        <div
          className="rounded-[24px] p-8 text-center"
          style={{ background: 'var(--bg-tint)', border: '1px solid var(--border-soft)' }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: 'oklch(from var(--terra) l c h / 0.1)', color: 'var(--terra)' }}
          >
            <PinIcon />
          </div>
          <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text)' }}>{a.location_title}</h3>
          <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>{a.location_desc}</p>
        </div>
      </Reveal>
    </div>
  )
}
