import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../../dictionaries'
import CartPageClient from '../components/CartPageClient'

export default async function CartPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return <CartPageClient lang={lang} dict={dict.cart} shopLink={`/${lang}/shop`} />
}
