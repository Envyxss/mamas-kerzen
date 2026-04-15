import type { MetadataRoute } from 'next'
import { locales } from './dictionaries'
import { products } from './data/products'

const baseUrl = 'https://mamas-kerzen.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/shop', '/about', '/faq', '/process', '/contact', '/care', '/wishlist', '/gifts']

  const staticEntries = locales.flatMap((lang) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )

  const productEntries = locales.flatMap((lang) =>
    products.map((p) => ({
      url: `${baseUrl}/${lang}/shop/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticEntries, ...productEntries]
}
