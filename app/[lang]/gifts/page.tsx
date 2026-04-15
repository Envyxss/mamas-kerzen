import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '../../dictionaries'
import { products } from '../../data/products'
import type { Locale } from '../../data/products'
import { CandleIcon } from '../components/Icons'
import Reveal from '../components/Reveal'

const scentGradient: Record<string, string> = {
  floral: 'radial-gradient(ellipse at 35% 30%, oklch(90% 0.04 340), oklch(80% 0.07 320))',
  woody:  'radial-gradient(ellipse at 65% 25%, oklch(90% 0.04 60),  oklch(80% 0.06 42))',
  fresh:  'radial-gradient(ellipse at 50% 20%, oklch(92% 0.06 140), oklch(84% 0.08 130))',
  sweet:  'radial-gradient(ellipse at 40% 30%, oklch(93% 0.05 80),  oklch(86% 0.07 65))',
}

export default async function GiftsPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const locale = lang as Locale

  const floralProducts = products.filter((p) => p.scent === 'floral').slice(0, 3)
  const sweetProducts  = products.filter((p) => p.scent === 'sweet').slice(0, 3)
  const woodyProducts  = products.filter((p) => p.scent === 'woody').slice(0, 3)

  const occasions = [
    { title: dict.gifts.christmas,   desc: dict.gifts.christmas_desc,   picks: woodyProducts },
    { title: dict.gifts.mothers_day, desc: dict.gifts.mothers_day_desc, picks: floralProducts },
    { title: dict.gifts.birthday,    desc: dict.gifts.birthday_desc,    picks: sweetProducts },
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
        {dict.gifts.title}
      </h1>
      <p className="page-subtitle mb-16 max-w-xl"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7' }}>
        {dict.gifts.subtitle}
      </p>

      <div className="flex flex-col gap-20">
        {occasions.map((occasion, oi) => (
          <Reveal key={oi} delay={oi * 60} distance={28}>
            <div>
              <h2 className="mb-1.5" style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: 'var(--text)',
              }}>
                {occasion.title}
              </h2>
              <p className="mb-7"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                {occasion.desc}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                {occasion.picks.map((product, pi) => {
                  const t = product.translations[locale]
                  return (
                    <Link key={product.id} href={`/${lang}/shop/${product.slug}`}
                      className="card-lift rounded-[20px] overflow-hidden flex flex-col stagger-item"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)',
                               animationDelay: `${oi * 80 + pi * 80 + 120}ms` }}>
                      <div className="h-44 flex items-center justify-center product-img-wrap"
                        style={{ background: scentGradient[product.scent] ?? scentGradient.sweet }}>
                        <CandleIcon size={40} style={{ color: 'oklch(100% 0 0 / 0.22)' }} className="img-inner" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm mb-1"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--text)' }}>
                          {t.name}
                        </h3>
                        <p className="text-xs leading-relaxed flex-1"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                          {t.description}
                        </p>
                        <p className="mt-3 font-semibold text-base"
                          style={{ fontFamily: 'var(--font-display)', color: 'var(--terra)' }}>
                          {dict.shop.currency}{product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <Link href={`/${lang}/shop`}
                className="btn-press inline-flex items-center gap-2 px-6 py-2.5 rounded-[14px] text-sm font-medium text-white"
                style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
                {dict.gifts.shop_cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
