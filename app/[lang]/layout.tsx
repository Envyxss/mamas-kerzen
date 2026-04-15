import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, locales } from '../dictionaries'
import { CartProvider } from './components/CartContext'
import { WishlistProvider } from './components/WishlistContext'
import Navigation from './components/Navigation'
import CartDrawer from './components/CartDrawer'
import ShippingBanner from './components/ShippingBanner'
import CookieBanner from './components/CookieBanner'
import BackToTop from './components/BackToTop'
import { CandleIcon } from './components/Icons'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: { default: 'Mamas Kerzen', template: '%s – Mamas Kerzen' },
    description: dict.home.hero_subtitle,
    openGraph: {
      siteName: 'Mamas Kerzen',
      title: 'Mamas Kerzen',
      description: dict.home.hero_subtitle,
      locale: lang,
    },
  }
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <WishlistProvider>
      <CartProvider>
        <ShippingBanner text={dict.shipping_banner} />
        <Navigation lang={lang} dict={dict.nav} />

        <CartDrawer
          lang={lang}
          cartLabel={dict.cart.title}
          emptyLabel={dict.cart.empty}
          shopLabel={dict.cart.empty_cta}
          removeLabel={dict.cart.remove}
          totalLabel={dict.cart.total}
          checkoutLabel={dict.cart.checkout}
          checkoutNote={dict.cart.checkout_note}
          discountPlaceholder={dict.cart.discount_placeholder}
          discountApply={dict.cart.discount_apply}
          discountApplied={dict.cart.discount_applied}
          discountInvalid={dict.cart.discount_invalid}
          discountUsed={dict.cart.discount_used}
          subtotalLabel={dict.cart.subtotal}
          discountLabel={dict.cart.discount_label}
        />

        <main className="flex-1">{children}</main>
        <BackToTop />

        <footer style={{ background: 'var(--footer-bg)', color: 'var(--footer-text)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-8" style={{ paddingBlock: 'clamp(3rem, 7vw, 5rem)' }}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <CandleIcon size={18} style={{ color: 'var(--terra)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 600, color: 'var(--footer-title)' }}>
                    Mamas Kerzen
                  </span>
                </div>
                <p className="text-sm max-w-xs leading-relaxed"
                  style={{ color: 'var(--footer-text)', fontFamily: 'var(--font-body)' }}>
                  {dict.footer.tagline}
                </p>
              </div>
              <nav className="flex flex-wrap gap-x-8 gap-y-2">
                {[
                  { href: `/${lang}/shop`, label: dict.nav.shop },
                  { href: `/${lang}/about`, label: dict.footer.about },
                  { href: `/${lang}/faq`, label: dict.footer.faq },
                  { href: `/${lang}/process`, label: dict.footer.process },
                  { href: `/${lang}/contact`, label: dict.footer.contact },
                  { href: `/${lang}/care`, label: dict.footer.care },
                  { href: `/${lang}/wishlist`, label: dict.footer.wishlist },
                  { href: `/${lang}/gifts`, label: dict.footer.gifts },
                ].map((link) => (
                  <Link key={link.href} href={link.href}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: 'var(--footer-text)', fontFamily: 'var(--font-body)' }}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="w-full h-px mb-6" style={{ background: 'var(--footer-line)' }} />
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <p className="text-xs" style={{ color: 'var(--footer-faint)', fontFamily: 'var(--font-body)' }}>
                © {new Date().getFullYear()} Mamas Kerzen &nbsp;·&nbsp; {dict.footer.rights}
              </p>
              <div className="flex gap-4 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                <a href={`/${lang}/impressum`} style={{ color: 'var(--footer-faint)' }} className="hover:opacity-70 transition-opacity">Impressum</a>
                <a href={`/${lang}/datenschutz`} style={{ color: 'var(--footer-faint)' }} className="hover:opacity-70 transition-opacity">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>
        <CookieBanner
          cookieText={dict.cookie_text}
          cookieAccept={dict.cookie_accept}
          cookieDecline={dict.cookie_decline}
        />
      </CartProvider>
    </WishlistProvider>
  )
}
