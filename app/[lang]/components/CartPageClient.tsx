'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart, getTranslatedCartItems } from './CartContext'

interface CartDict {
  title: string
  empty: string
  empty_cta: string
  total: string
  checkout: string
  checkout_note: string
  remove: string
  quantity: string
  discount_placeholder: string
  discount_apply: string
  discount_applied: string
  discount_invalid: string
  discount_used: string
  subtotal: string
  discount_label: string
}

interface Props {
  lang: string
  dict: CartDict
  shopLink: string
}



// These codes are "first order only"
const FIRST_ORDER_CODES: Record<string, number> = {
  MAMA10: 0.10,
  FIRST10: 0.10,
}

const STORAGE_KEY = 'usedFirstOrderCodes'

function getUsedCodes(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function markCodeUsed(code: string) {
  try {
    const used = getUsedCodes()
    if (!used.includes(code)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...used, code]))
    }
  } catch {}
}

export default function CartPageClient({ lang, dict, shopLink }: Props) {
  const { items: rawItems, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const items = getTranslatedCartItems(rawItems, lang)
  const [code, setCode] = useState('')
  const [appliedCode, setAppliedCode] = useState('')
  const [discountRate, setDiscountRate] = useState(0)
  const [codeStatus, setCodeStatus] = useState<'idle' | 'applied' | 'invalid' | 'used'>('idle')
  const [usedCodes, setUsedCodes] = useState<string[]>([])
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  useEffect(() => {
    setUsedCodes(getUsedCodes())
  }, [])

  function applyCode() {
    const upper = code.trim().toUpperCase()
    const rate = FIRST_ORDER_CODES[upper]

    if (!rate) {
      setDiscountRate(0)
      setAppliedCode('')
      setCodeStatus('invalid')
      return
    }

    if (usedCodes.includes(upper)) {
      setDiscountRate(0)
      setAppliedCode('')
      setCodeStatus('used')
      return
    }

    setDiscountRate(rate)
    setAppliedCode(upper)
    setCodeStatus('applied')
  }

  async function handleCheckout() {
    if (appliedCode && FIRST_ORDER_CODES[appliedCode]) {
      markCodeUsed(appliedCode)
      setUsedCodes(getUsedCodes())
    }
    setCheckoutLoading(true)
    setCheckoutError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          items: items.map(item => ({
            name: item.name,
            price: item.price * (1 - discountRate),
            quantity: item.quantity,
          })),
        }),
      })
      const data = await res.json()
      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        setCheckoutError('Checkout fehlgeschlagen: ' + (data.error ?? 'Unbekannter Fehler'))
      }
    } catch (e) {
      setCheckoutError('Netzwerkfehler. Bitte versuche es erneut.')
      console.error(e)
    } finally {
      setCheckoutLoading(false)
    }
  }

  const discount = totalPrice * discountRate
  const finalPrice = totalPrice - discount

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-28 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text)' }}>{dict.title}</h1>
        <p className="mb-8 text-base" style={{ color: 'var(--text-muted)' }}>{dict.empty}</p>
        <Link
          href={shopLink}
          className="inline-block px-8 py-3 rounded-[16px] font-medium transition-colors text-white"
          style={{ background: 'var(--terra)' }}
        >
          {dict.empty_cta}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold mb-8 tracking-tight" style={{ color: 'var(--text)' }}>{dict.title}</h1>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[20px] border p-4 flex items-center gap-4"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}
          >
            <span className="text-4xl flex-shrink-0">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>{item.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>€{item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold transition-colors text-sm"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
              >
                −
              </button>
              <span className="w-6 text-center font-medium text-sm" style={{ color: 'var(--text)' }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold transition-colors text-sm"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
              >
                +
              </button>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>€{(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs mt-1 transition-colors hover:opacity-70"
                style={{ color: 'var(--border)' }}
              >
                {dict.remove}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discount code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setCodeStatus('idle') }}
            placeholder={dict.discount_placeholder}
            className="flex-1 px-4 py-2.5 rounded-[16px] text-sm focus:outline-none"
            style={{
              border: `1px solid ${codeStatus === 'invalid' || codeStatus === 'used' ? '#e87654' : 'var(--border)'}`,
              background: 'var(--bg-page)',
              color: 'var(--text)',
            }}
            onKeyDown={(e) => e.key === 'Enter' && applyCode()}
          />
          <button
            onClick={applyCode}
            className="px-4 py-2.5 rounded-[16px] text-sm font-medium transition-colors"
            style={{ background: 'var(--bg-sand)', color: 'var(--text)' }}
          >
            {dict.discount_apply}
          </button>
        </div>
        {codeStatus === 'applied' && (
          <p className="text-xs mt-2 font-medium" style={{ color: '#4a7c59' }}>✓ {dict.discount_applied}</p>
        )}
        {codeStatus === 'invalid' && (
          <p className="text-xs mt-2" style={{ color: '#e87654' }}>{dict.discount_invalid}</p>
        )}
        {codeStatus === 'used' && (
          <p className="text-xs mt-2" style={{ color: '#e87654' }}>⚠ {dict.discount_used}</p>
        )}
      </div>

      {/* Summary */}
      <div className="rounded-[20px] p-6" style={{ background: 'var(--footer-bg)' }}>
        {discountRate > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: 'var(--footer-text)' }}>{dict.subtotal}</span>
            <span className="text-sm" style={{ color: 'var(--footer-text)' }}>€{totalPrice.toFixed(2)}</span>
          </div>
        )}
        {discountRate > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: '#4a7c59' }}>{dict.discount_label} (−{Math.round(discountRate * 100)}%)</span>
            <span className="text-sm font-medium" style={{ color: '#4a7c59' }}>−€{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between mb-5">
          <span className="text-base" style={{ color: 'var(--footer-text)' }}>{dict.total}</span>
          <span className="text-2xl font-bold" style={{ color: 'var(--footer-title)' }}>€{finalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="w-full text-white font-semibold py-3 rounded-[16px] transition-colors text-base mb-3 disabled:opacity-60"
          style={{ background: 'var(--terra)' }}
        >
          {checkoutLoading ? '⏳ Weiterleitung...' : dict.checkout}
        </button>
        <p className="text-xs text-center" style={{ color: 'var(--footer-faint)' }}>{dict.checkout_note}</p>
        {checkoutError && (
          <p className="text-xs text-center mt-2 font-medium" style={{ color: '#e87654' }}>{checkoutError}</p>
        )}
      </div>
    </div>
  )
}
