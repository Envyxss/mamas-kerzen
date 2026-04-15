import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '../../dictionaries'
import FaqAccordion from '../components/FaqAccordion'
import Reveal from '../components/Reveal'

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return { title: `${dict.faq.title} – Mamas Kerzen`, description: dict.faq.subtitle }
}

const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const

export default async function FAQPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const f = dict.faq

  const items = questionKeys.map((key, i) => ({
    num: i + 1,
    q: f[key as keyof typeof f] as string,
    a: f[`a${i + 1}` as keyof typeof f] as string,
  }))

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-14">
      <Reveal>
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest mb-4"
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
            FAQ
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
            {f.title}
          </h1>
          <p className="text-base" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            {f.subtitle}
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <FaqAccordion items={items} />
      </Reveal>
    </div>
  )
}
