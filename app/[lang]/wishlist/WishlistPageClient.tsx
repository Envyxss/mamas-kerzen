'use client'

import Link from 'next/link'
import { useWishlist } from '../components/WishlistContext'
import AddToCartButton from '../components/AddToCartButton'
import { CandleIcon } from '../components/Icons'
import { products as allProducts } from '../../data/products'
import type { Locale } from '../../data/products'

interface WishlistDict {
  wishlist_empty: string
  wishlist_title: string
  wishlist_page_sub: string
  shop: {
    add_to_cart: string
    added: string
    currency: string
    wishlist_add: string
    wishlist_saved: string
    reviews: string
  }
}

interface Props {
  lang: string
  locale: Locale
  dict: WishlistDict
}

const scentGradient: Record<string, string> = {
  floral: 'radial-gradient(ellipse at 35% 30%, oklch(90% 0.04 340), oklch(80% 0.07 320))',
  woody:  'radial-gradient(ellipse at 65% 25%, oklch(90% 0.04 60),  oklch(80% 0.06 42))',
  fresh:  'radial-gradient(ellipse at 50% 20%, oklch(92% 0.06 140), oklch(84% 0.08 130))',
  sweet:  'radial-gradient(ellipse at 40% 30%, oklch(93% 0.05 80),  oklch(86% 0.07 65))',
}

export default function WishlistPageClient({ lang, locale, dict }: Props) {
  const { ids, toggle, has } = useWishlist()

  const wishlisted = ids
    .map((id) => {
      const p = allProducts.find((x) => x.id === id)
      if (!p) return null
      const t = p.translations[locale]
      return { ...p, name: t.name, description: t.description }
    })
    .filter(Boolean) as Array<typeof allProducts[0] & { name: string; description: string }>

  if (wishlisted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-28 px-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="mb-5"
          style={{ color: 'var(--border)' }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <p
          className="mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.1rem' }}
        >
          {dict.wishlist_empty}
        </p>
        <Link
          href={`/${lang}/shop`}
          className="btn-press mt-4 inline-flex items-center px-6 py-2.5 rounded-[14px] text-sm font-medium text-white"
          style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
        >
          {dict.shop.add_to_cart ? 'Shop' : 'Shop'}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {wishlisted.map((product) => (
        <div
          key={product.id}
          className="card-lift rounded-[20px] overflow-hidden flex flex-col"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
        >
          <div className="relative">
            <Link href={`/${lang}/shop/${product.slug}`} className="block">
              {product.image ? (
                <div className="relative h-52">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div
                  className="h-52 flex items-center justify-center"
                  style={{ background: scentGradient[product.scent] ?? scentGradient.sweet }}
                >
                  <CandleIcon size={52} style={{ color: 'oklch(100% 0 0 / 0.22)' }} />
                </div>
              )}
            </Link>

            {/* Remove from wishlist */}
            <button
              onClick={() => toggle(product.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: has(product.id) ? 'var(--terra)' : 'var(--bg-surface)',
                color: has(product.id) ? '#fff' : 'var(--text-muted)',
                boxShadow: '0 1px 4px oklch(0% 0 0 / 0.12)',
              }}
              aria-label={has(product.id) ? dict.shop.wishlist_saved : dict.shop.wishlist_add}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill={has(product.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 12C7 12 1.5 8.5 1.5 4.5C1.5 2.5 3 1.5 4.5 1.5C5.5 1.5 6.5 2 7 3C7.5 2 8.5 1.5 9.5 1.5C11 1.5 12.5 2.5 12.5 4.5C12.5 8.5 7 12 7 12Z" />
              </svg>
            </button>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="text-xs"
                    style={{ color: s <= Math.round(product.rating) ? 'var(--terra)' : 'var(--border)' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                ({product.reviewCount} {dict.shop.reviews})
              </span>
            </div>

            <h3
              className="text-base mb-1.5"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--text)' }}
            >
              <Link
                href={`/${lang}/shop/${product.slug}`}
                className="hover:opacity-70 transition-opacity"
              >
                {product.name}
              </Link>
            </h3>
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
            >
              {product.description}
            </p>

            <div
              className="flex items-center justify-between mt-5 pt-4 border-t"
              style={{ borderColor: 'var(--border-soft)' }}
            >
              <span
                className="text-lg"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}
              >
                {dict.shop.currency}{product.price.toFixed(2)}
              </span>
              <AddToCartButton
                product={{
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  emoji: product.emoji,
                }}
                labels={{ add: dict.shop.add_to_cart, added: dict.shop.added }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
