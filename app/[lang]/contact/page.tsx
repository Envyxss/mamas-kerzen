import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../../dictionaries'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

function MailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="22" height="16" rx="3"/>
      <path d="M3 9l11 7 11-7"/>
    </svg>
  )
}

export default async function ContactPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <div
          className="page-icon inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'var(--bg-sand)', color: 'var(--terra)' }}
        >
          <MailIcon />
        </div>
        <h1 className="page-title text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text)' }}>
          {dict.contact.title}
        </h1>
        <p className="page-subtitle text-base" style={{ color: 'var(--text-muted)' }}>
          {dict.contact.subtitle}
        </p>
      </div>

      <Reveal delay={80}>
        <ContactForm dict={dict.contact} />
      </Reveal>
    </div>
  )
}
