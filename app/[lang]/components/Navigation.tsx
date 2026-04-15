'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from './CartContext'
import ThemeToggle from './ThemeToggle'
import { CandleIcon } from './Icons'
import { openCartDrawer } from './CartDrawer'

const locales = ['en', 'ru', 'de'] as const
type Locale = (typeof locales)[number]

interface NavDict {
  home: string; shop: string; process: string
  cart: string; contact: string; about: string; faq: string; wishlist: string
}

interface Props { lang: Locale; dict: NavDict }

export default function Navigation({ lang, dict }: Props) {
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  function switchLocale(newLang: string) {
    const segments = pathname.split('/')
    segments[1] = newLang
    return segments.join('/')
  }

  const desktopLinks = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/shop`, label: dict.shop },
    { href: `/${lang}/process`, label: dict.process },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  const allLinks = [...desktopLinks,
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/faq`, label: dict.faq },
    { href: `/${lang}/wishlist`, label: dict.wishlist },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5">
            <CandleIcon size={18} style={{ color: 'var(--terra)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>
              Mamas Kerzen
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {desktopLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {locales.map((l) => (
                <Link key={l} href={switchLocale(l)}
                  className="text-xs px-2 py-1 rounded-[6px] font-medium uppercase transition-all"
                  style={l === lang
                    ? { background: 'var(--terra)', color: '#fff', fontFamily: 'var(--font-body)' }
                    : { color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  {l}
                </Link>
              ))}
            </div>

            <ThemeToggle />

            {/* Cart button — opens drawer */}
            <button
              onClick={openCartDrawer}
              className="btn-press relative flex items-center gap-1.5 px-4 py-2 rounded-[12px] text-sm font-medium text-white"
              style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
              aria-label={dict.cart}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1.5 1.5H3L4.5 9.5H11.5L13 4.5H4.5M6 12.5A1 1 0 106 10.5 1 1 0 006 12.5ZM10.5 12.5A1 1 0 1010.5 10.5 1 1 0 0010.5 12.5Z" />
              </svg>
              {totalItems > 0 && (
                <span className="rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
                  style={{ background: 'var(--bg-surface)', color: 'var(--terra)' }}>
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:inline">{dict.cart}</span>
            </button>

            <button className="md:hidden p-1.5 rounded-[8px]"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--text-muted)' }} aria-label="Menu">
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M3 3L15 15M15 3L3 15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M2 5H16M2 9H16M2 13H16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t flex flex-col gap-1" style={{ borderColor: 'var(--border-soft)' }}>
            {allLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="py-2 px-1 transition-opacity hover:opacity-60"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
