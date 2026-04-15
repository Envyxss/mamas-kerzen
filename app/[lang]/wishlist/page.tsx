import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../../dictionaries'
import type { Locale } from '../../data/products'
import WishlistPageClient from './WishlistPageClient'

export default async function WishlistPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
      <h1
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: 'var(--text)',
          lineHeight: '1.15',
        }}
      >
        {dict.wishlist_title}
      </h1>
      <p
        className="mb-10"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}
      >
        {dict.wishlist_page_sub}
      </p>

      <WishlistPageClient
        lang={lang}
        locale={lang as Locale}
        dict={{
          wishlist_empty: dict.wishlist_empty,
          wishlist_title: dict.wishlist_title,
          wishlist_page_sub: dict.wishlist_page_sub,
          shop: {
            add_to_cart: dict.shop.add_to_cart,
            added: dict.shop.added,
            currency: dict.shop.currency,
            wishlist_add: dict.shop.wishlist_add,
            wishlist_saved: dict.shop.wishlist_saved,
            reviews: dict.shop.reviews,
          },
        }}
      />
    </div>
  )
}
