import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../../dictionaries'
import { products } from '../../data/products'
import type { Locale } from '../../data/products'
import ShopGridClient from '../components/ShopGridClient'

export default async function ShopPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const locale = lang as Locale

  const productData = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    price: p.price,
    emoji: p.emoji,
    color: p.color,
    image: p.image,
    scent: p.scent,
    isNew: p.isNew,
    isBestseller: p.isBestseller,
    rating: p.rating,
    reviewCount: p.reviewCount,
    name: p.translations[locale].name,
    description: p.translations[locale].description,
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-14">
        <h1 className="page-title text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text)' }}>
          {dict.shop.title}
        </h1>
        <p className="page-subtitle text-base max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          {dict.shop.subtitle}
        </p>
      </div>

      <ShopGridClient
        products={productData}
        dict={dict.shop}
        lang={lang}
        locale={locale}
      />
    </div>
  )
}
