'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useWishlist } from './WishlistContext'
import AddToCartButton from './AddToCartButton'
import { CandleIcon } from './Icons'
import { products as allProducts } from '../../data/products'

interface ProductData {
  id: number; slug: string; price: number; emoji: string
  color: string; image?: string; scent: string
  isNew?: boolean; isBestseller?: boolean
  rating: number; reviewCount: number; name: string; description: string
}

interface ShopDict {
  filter_all: string; filter_floral: string; filter_woody: string
  filter_fresh: string; filter_sweet: string; wishlist_add: string
  wishlist_saved: string; recently_viewed: string; new_badge: string
  bestseller_badge: string; reviews: string; view_details: string
  add_to_cart: string; added: string; currency: string
  empty_state_title: string; empty_state_sub: string; empty_state_reset: string
}

interface Props { products: ProductData[]; dict: ShopDict; lang: string; locale: string }

const scentGradient: Record<string, string> = {
  floral: 'radial-gradient(ellipse at 35% 30%, oklch(90% 0.04 340), oklch(80% 0.07 320))',
  woody:  'radial-gradient(ellipse at 65% 25%, oklch(90% 0.04 60),  oklch(80% 0.06 42))',
  fresh:  'radial-gradient(ellipse at 50% 20%, oklch(92% 0.06 140), oklch(84% 0.08 130))',
  sweet:  'radial-gradient(ellipse at 40% 30%, oklch(93% 0.05 80),  oklch(86% 0.07 65))',
}

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'new'

export default function ShopGridClient({ products, dict, lang, locale }: Props) {
  const { toggle, has } = useWishlist()
  const [activeFilter, setActiveFilter] = useState('all')
  const [sort, setSort] = useState<SortKey>('default')
  const [recentIds, setRecentIds] = useState<number[]>([])
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentlyViewed')
      if (saved) setRecentIds(JSON.parse(saved))
    } catch {}
  }, [])

  function handleFilterChange(key: string) {
    setActiveFilter(key)
    setAnimKey((k) => k + 1)
  }

  function handleSortChange(key: SortKey) {
    setSort(key)
    setAnimKey((k) => k + 1)
  }

  const filters = [
    { key: 'all', label: dict.filter_all },
    { key: 'floral', label: dict.filter_floral },
    { key: 'woody', label: dict.filter_woody },
    { key: 'fresh', label: dict.filter_fresh },
    { key: 'sweet', label: dict.filter_sweet },
  ]

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'default', label: '—' },
    { key: 'price-asc', label: '€ ↑' },
    { key: 'price-desc', label: '€ ↓' },
    { key: 'rating', label: '★' },
    { key: 'new', label: 'Neu' },
  ]

  let filtered = activeFilter === 'all' ? products : products.filter((p) => p.scent === activeFilter)

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  else if (sort === 'new') filtered = [...filtered].sort((a) => (a.isNew ? -1 : 1))

  const recentProducts = recentIds
    .map((id) => {
      const p = allProducts.find((x) => x.id === id)
      if (!p) return null
      const t = p.translations[locale as 'en' | 'ru' | 'de']
      return { ...p, name: t.name, description: t.description }
    })
    .filter(Boolean)
    .slice(0, 4) as ProductData[]

  return (
    <div>
      {/* Controls: filter + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f.key} onClick={() => handleFilterChange(f.key)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                fontFamily: 'var(--font-body)', letterSpacing: '0.03em',
                ...(activeFilter === f.key
                  ? { background: 'var(--terra)', color: '#fff' }
                  : { background: 'var(--bg-sand)', color: 'var(--text-muted)' }),
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-1.5 items-center">
          {sortOptions.map((s) => (
            <button key={s.key} onClick={() => handleSortChange(s.key)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                ...(sort === s.key
                  ? { background: 'var(--bg-sand)', color: 'var(--text)', border: '1px solid var(--border)' }
                  : { background: 'transparent', color: 'var(--text-muted)', border: '1px solid transparent' }),
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <CandleIcon size={40} style={{ color: 'var(--border)', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.1rem', marginBottom: 8 }}>
            {dict.empty_state_title}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>
            {dict.empty_state_sub}
          </p>
          <button
            onClick={() => handleFilterChange('all')}
            className="btn-press px-6 py-2.5 rounded-[14px] text-sm font-medium text-white"
            style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
          >
            {dict.empty_state_reset}
          </button>
        </div>
      )}

      {/* Grid */}
      <div key={animKey} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, idx) => (
          <div key={product.id}
            className="card-lift rounded-[20px] overflow-hidden flex flex-col"
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-soft)',
              animation: 'fadeUp 0.5s cubic-bezier(0.33,1,0.68,1) both',
              animationDelay: `${idx * 60}ms`,
            }}>

            <div className="relative product-img-wrap">
              <Link href={`/${lang}/shop/${product.slug}`} className="block">
                {product.image ? (
                  <div className="relative h-52">
                    <Image src={product.image} alt={product.name} fill className="object-cover img-inner" />
                  </div>
                ) : (
                  <div className="h-52 flex items-center justify-center img-inner"
                    style={{ background: scentGradient[product.scent] ?? scentGradient.sweet }}>
                    <CandleIcon size={52} style={{ color: 'oklch(100% 0 0 / 0.22)' }} />
                  </div>
                )}
              </Link>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isBestseller && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white leading-none uppercase tracking-wide"
                    style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
                    {dict.bestseller_badge}
                  </span>
                )}
                {product.isNew && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full leading-none uppercase tracking-wide"
                    style={{ background: 'var(--bg-surface)', color: 'var(--text)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}>
                    {dict.new_badge}
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button onClick={() => toggle(product.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: has(product.id) ? 'var(--terra)' : 'var(--bg-surface)', color: has(product.id) ? '#fff' : 'var(--text-muted)', boxShadow: '0 1px 4px oklch(0% 0 0 / 0.12)' }}
                aria-label={has(product.id) ? dict.wishlist_saved : dict.wishlist_add}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill={has(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 12C7 12 1.5 8.5 1.5 4.5C1.5 2.5 3 1.5 4.5 1.5C5.5 1.5 6.5 2 7 3C7.5 2 8.5 1.5 9.5 1.5C11 1.5 12.5 2.5 12.5 4.5C12.5 8.5 7 12 7 12Z" />
                </svg>
              </button>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className="text-xs"
                      style={{ color: s <= Math.round(product.rating) ? 'var(--terra)' : 'var(--border)' }}>★</span>
                  ))}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {product.rating} ({product.reviewCount} {dict.reviews})
                </span>
              </div>

              <h3 className="text-base mb-1.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--text)' }}>
                <Link href={`/${lang}/shop/${product.slug}`} className="hover:opacity-70 transition-opacity">
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                <span className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}>
                  {dict.currency}{product.price.toFixed(2)}
                </span>
                <AddToCartButton
                  product={{ id: product.id, slug: product.slug, name: product.name, price: product.price, emoji: product.emoji }}
                  labels={{ add: dict.add_to_cart, added: dict.added }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recently viewed */}
      {recentProducts.length > 0 && (
        <div className="mt-20">
          <p className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            {dict.recently_viewed}
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentProducts.map((product) => (
              <Link key={product.id} href={`/${lang}/shop/${product.slug}`}
                className="flex-shrink-0 w-40 rounded-[16px] overflow-hidden transition-opacity hover:opacity-80"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}>
                <div className="h-28 flex items-center justify-center"
                  style={{ background: scentGradient[product.scent] ?? scentGradient.sweet }}>
                  <CandleIcon size={32} style={{ color: 'oklch(100% 0 0 / 0.22)' }} />
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                    {product.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
                    {dict.currency}{product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
