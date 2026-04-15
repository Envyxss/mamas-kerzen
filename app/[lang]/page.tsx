import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, hasLocale } from '../dictionaries'
import { bestsellers } from '../data/products'
import type { Locale } from '../data/products'
import AddToCartButton from './components/AddToCartButton'
import NewsletterForm from './components/NewsletterForm'
import Reveal from './components/Reveal'
import Testimonials from './components/Testimonials'
import ScentFinder from './components/ScentFinder'
import { LeafIcon, HandsIcon, EcoIcon, ArrowRightIcon, CandleIcon } from './components/Icons'

const scentGradient: Record<string, string> = {
  floral: 'radial-gradient(ellipse at 35% 30%, oklch(90% 0.04 340), oklch(80% 0.07 320))',
  woody:  'radial-gradient(ellipse at 65% 25%, oklch(90% 0.04 60),  oklch(80% 0.06 42))',
  fresh:  'radial-gradient(ellipse at 50% 20%, oklch(92% 0.06 140), oklch(84% 0.08 130))',
  sweet:  'radial-gradient(ellipse at 40% 30%, oklch(93% 0.05 80),  oklch(86% 0.07 65))',
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const locale = lang as Locale

  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="border-b"
        style={{ background: 'var(--bg-page)', borderColor: 'var(--border-soft)', paddingBlock: 'clamp(4.5rem, 11vw, 8rem)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <p className="hero-eyebrow text-xs font-medium uppercase tracking-widest mb-6"
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
            Mamas Kerzen &nbsp;·&nbsp; Aachen &nbsp;·&nbsp; Handgemacht
          </p>

          <h1 className="hero-title mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.8rem, 7.5vw, 5.75rem)',
              lineHeight: '1.08',
              letterSpacing: '-0.025em',
              color: 'var(--text)',
              maxWidth: '14ch',
            }}>
            {dict.home.hero_title}
          </h1>

          <p className="hero-subtitle mb-9"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
              lineHeight: '1.7',
              color: 'var(--text-muted)',
              maxWidth: '44ch',
            }}>
            {dict.home.hero_subtitle}
          </p>

          <div className="hero-ctas flex flex-wrap gap-3 mb-12">
            <Link
              href={`/${lang}/shop`}
              className="btn-press inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-[14px] text-sm text-white"
              style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
            >
              {dict.home.hero_cta}
              <ArrowRightIcon size={14} />
            </Link>
            <Link
              href={`/${lang}/about`}
              className="btn-press inline-flex items-center font-medium px-7 py-3.5 rounded-[14px] text-sm"
              style={{ background: 'var(--bg-sand)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}
            >
              {dict.home.section_why}
            </Link>
          </div>

          <div className="hero-trust flex flex-wrap gap-x-8 gap-y-2 pt-6 border-t"
            style={{ borderColor: 'var(--border-soft)' }}>
            {[
              { icon: <CandleIcon size={14} />, text: '379 Bewertungen · 4.8/5' },
              { icon: <LeafIcon size={14} />, text: '100% Sojawachs' },
              { icon: <HandsIcon size={14} />, text: 'Jede Kerze handgegossen' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span style={{ color: 'var(--terra)', display: 'flex' }}>{item.icon}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Our Candles ───────────────────────── */}
      <section className="py-20" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest mb-12"
              style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
              {dict.home.section_why}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <LeafIcon size={22} />, num: '01', title: dict.home.feature_natural, desc: dict.home.feature_natural_desc },
              { icon: <HandsIcon size={22} />, num: '02', title: dict.home.feature_handmade, desc: dict.home.feature_handmade_desc },
              { icon: <EcoIcon size={22} />, num: '03', title: dict.home.feature_eco, desc: dict.home.feature_eco_desc },
            ].map((f, i) => (
              <Reveal key={f.num} delay={i * 100}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--border)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                }}>
                  {f.num}
                </p>
                <div style={{ color: 'var(--terra)', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 className="font-semibold text-base mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {f.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bestsellers ──────────────────────────── */}
      <section className="py-20 border-t" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-soft)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--text)',
                lineHeight: '1.15',
              }}>
                {dict.home.section_bestsellers}
              </h2>
              <Link
                href={`/${lang}/shop`}
                className="nav-link text-sm font-medium"
                style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}
              >
                {dict.home.view_all} →
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestsellers.map((product, i) => {
              const t = product.translations[locale]
              return (
                <Reveal key={product.id} delay={i * 80}>
                  <div
                    className="card-lift rounded-[20px] overflow-hidden h-full flex flex-col"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
                  >
                    <Link href={`/${lang}/shop/${product.slug}`} className="product-img-wrap block">
                      {product.image ? (
                        <div className="relative h-52">
                          <Image src={product.image} alt={t.name} fill className="object-cover img-inner" />
                        </div>
                      ) : (
                        <div className="h-52 flex items-center justify-center img-inner"
                          style={{ background: scentGradient[product.scent] ?? scentGradient.sweet }}>
                          <CandleIcon size={48} style={{ color: 'oklch(100% 0 0 / 0.25)' }} />
                        </div>
                      )}
                    </Link>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className="text-xs"
                              style={{ color: s <= Math.round(product.rating) ? 'var(--terra)' : 'var(--border)' }}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                          ({product.reviewCount})
                        </span>
                      </div>

                      <h3 className="text-base mb-1.5"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--text)' }}>
                        {t.name}
                      </h3>
                      <p className="text-sm line-clamp-2 mb-4 leading-relaxed flex-1"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                        {t.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t"
                        style={{ borderColor: 'var(--border-soft)' }}>
                        <span className="text-lg font-semibold"
                          style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                          {dict.shop.currency}{product.price.toFixed(2)}
                        </span>
                        <AddToCartButton
                          product={{ id: product.id, slug: product.slug, name: t.name, price: product.price, emoji: product.emoji }}
                          labels={{ add: dict.shop.add_to_cart, added: dict.shop.added }}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <Reveal>
        <Testimonials eyebrow={dict.testimonials_eyebrow} title={dict.testimonials_title} />
      </Reveal>

      {/* ── Scent Finder ─────────────────────────── */}
      <section className="py-20 border-t" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
              Quiz
            </p>
            <h2 className="mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--text)',
                lineHeight: '1.15',
              }}>
              {dict.scent_finder_title}
            </h2>
            <div
              className="rounded-[20px] p-8"
              style={{ background: 'var(--bg-page)', border: '1px solid var(--border-soft)' }}
            >
              <ScentFinder lang={lang} cta={dict.scent_finder_cta} dict={dict.scent_finder} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className="py-20 border-t" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-8">
          <Reveal>
            <NewsletterForm dict={dict.newsletter} />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
