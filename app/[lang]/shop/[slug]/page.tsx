import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, hasLocale } from '../../../dictionaries'
import { products } from '../../../data/products'
import type { Locale } from '../../../data/products'
import ProductDetailClient from '../../components/ProductDetailClient'
import AddToCartButton from '../../components/AddToCartButton'
import Reveal from '../../components/Reveal'
import Breadcrumbs from '../../components/Breadcrumbs'
import { CandleIcon } from '../../components/Icons'

const scentGradient: Record<string, string> = {
  floral: 'radial-gradient(ellipse at 35% 30%, oklch(90% 0.04 340), oklch(80% 0.07 320))',
  woody:  'radial-gradient(ellipse at 65% 25%, oklch(90% 0.04 60),  oklch(80% 0.06 42))',
  fresh:  'radial-gradient(ellipse at 50% 20%, oklch(92% 0.06 140), oklch(84% 0.08 130))',
  sweet:  'radial-gradient(ellipse at 40% 30%, oklch(93% 0.05 80),  oklch(86% 0.07 65))',
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/shop/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  const dict = await getDictionary(lang)
  const locale = lang as Locale
  const t = product.translations[locale]
  return {
    title: `${t.name} – Mamas Kerzen`,
    description: t.description,
    openGraph: { title: `${t.name} – Mamas Kerzen`, description: t.description },
  }
}

export default async function ProductPage({ params }: PageProps<'/[lang]/shop/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const dict = await getDictionary(lang)
  const locale = lang as Locale
  const t = product.translations[locale]

  const related = products
    .filter((p) => p.id !== product.id && p.scent === product.scent)
    .slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        crumbs={[
          { label: dict.nav.shop, href: `/${lang}/shop` },
          { label: t.name },
        ]}
        lang={lang}
      />

      {/* Back */}
      <Reveal>
        <Link
          href={`/${lang}/shop`}
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-opacity hover:opacity-60"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 7H2M6 3L2 7L6 11" />
          </svg>
          {dict.product.back_to_shop}
        </Link>
      </Reveal>

      {/* Product detail */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <Reveal>
          <div className="rounded-[24px] overflow-hidden" style={{ background: scentGradient[product.scent] }}>
            {product.image ? (
              <div className="relative h-[420px]">
                <Image src={product.image} alt={t.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="h-[380px] flex items-center justify-center">
                <CandleIcon size={100} style={{ color: 'oklch(100% 0 0 / 0.22)' }} />
              </div>
            )}
          </div>
        </Reveal>

        {/* Info */}
        <Reveal delay={100}>
          <div className="flex flex-col justify-center">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isBestseller && (
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white uppercase tracking-wide"
                  style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
                  {dict.shop.bestseller_badge}
                </span>
              )}
              {product.isNew && (
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                  style={{ background: 'var(--bg-sand)', color: 'var(--text)', fontFamily: 'var(--font-body)', border: '1px solid var(--border)' }}>
                  {dict.shop.new_badge}
                </span>
              )}
            </div>

            <h1 className="mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--text)',
                lineHeight: 1.1,
              }}>
              {t.name}
            </h1>

            <p className="text-base leading-relaxed mb-6"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', maxWidth: '42ch' }}>
              {t.description}
            </p>

            {/* Scent notes */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--bg-tint)',
                    color: 'var(--text-mid)',
                    fontFamily: 'var(--font-body)',
                    border: '1px solid var(--border-soft)',
                  }}
                >
                  {note}
                </span>
              ))}
            </div>

            <ProductDetailClient
              product={{
                id: product.id,
                slug: product.slug,
                name: t.name,
                price: product.price,
                emoji: product.emoji,
                rating: product.rating,
                reviewCount: product.reviewCount,
              }}
              dict={dict.product}
              reviewsLabel={dict.shop.reviews}
              currency={dict.shop.currency}
            />
          </div>
        </Reveal>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <Reveal>
            <h2 className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.75rem',
                color: 'var(--text)',
              }}>
              {dict.product.related}
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((rel, i) => {
              const rt = rel.translations[locale]
              return (
                <Reveal key={rel.id} delay={i * 80}>
                  <div className="card-lift rounded-[20px] overflow-hidden flex flex-col"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
                    <Link href={`/${lang}/shop/${rel.slug}`} className="product-img-wrap block">
                      <div className="h-44 flex items-center justify-center img-inner"
                        style={{ background: scentGradient[rel.scent] ?? scentGradient.sweet }}>
                        <CandleIcon size={40} style={{ color: 'oklch(100% 0 0 / 0.22)' }} />
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm mb-1"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--text)' }}>
                        {rt.name}
                      </h3>
                      <p className="text-xs leading-relaxed flex-1 mb-4"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                        {rt.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                        <span className="font-semibold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                          {dict.shop.currency}{rel.price.toFixed(2)}
                        </span>
                        <AddToCartButton
                          product={{ id: rel.id, slug: rel.slug, name: rt.name, price: rel.price, emoji: rel.emoji }}
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
      )}
    </div>
  )
}
