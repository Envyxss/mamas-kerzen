'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from './CartContext'
import { CheckIcon } from './Icons'

const VALID_CODES: Record<string, number> = { MAMA10: 0.10, FIRST10: 0.10 }
const STORAGE_KEY = 'usedFirstOrderCodes'

function getUsedCodes(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

interface Props {
  lang: string
  cartLabel: string
  emptyLabel: string
  shopLabel: string
  removeLabel: string
  totalLabel: string
  checkoutLabel: string
  checkoutNote: string
  discountPlaceholder: string
  discountApply: string
  discountApplied: string
  discountInvalid: string
  discountUsed: string
  subtotalLabel: string
  discountLabel: string
}

export function useCartDrawer() {
  const [open, setOpen] = useState(false)
  return { open, setOpen }
}

// Global drawer state via custom event
export function openCartDrawer() {
  window.dispatchEvent(new CustomEvent('open-cart-drawer'))
}

export default function CartDrawer({ lang, cartLabel, emptyLabel, shopLabel, removeLabel, totalLabel, checkoutLabel, checkoutNote, discountPlaceholder, discountApply, discountApplied, discountInvalid, discountUsed, subtotalLabel, discountLabel }: Props) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [appliedCode, setAppliedCode] = useState('')
  const [discountRate, setDiscountRate] = useState(0)
  const [codeStatus, setCodeStatus] = useState<'idle' | 'applied' | 'invalid' | 'used'>('idle')
  const [usedCodes, setUsedCodes] = useState<string[]>([])

  useEffect(() => {
    setUsedCodes(getUsedCodes())
    const handler = () => setOpen(true)
    window.addEventListener('open-cart-drawer', handler)
    return () => window.removeEventListener('open-cart-drawer', handler)
  }, [])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function applyCode() {
    const upper = code.trim().toUpperCase()
    const rate = VALID_CODES[upper]
    if (!rate) { setDiscountRate(0); setAppliedCode(''); setCodeStatus('invalid'); return }
    if (usedCodes.includes(upper)) { setDiscountRate(0); setAppliedCode(''); setCodeStatus('used'); return }
    setDiscountRate(rate); setAppliedCode(upper); setCodeStatus('applied')
  }

  function handleCheckout() {
    if (appliedCode && VALID_CODES[appliedCode]) {
      const used = getUsedCodes()
      if (!used.includes(appliedCode)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...used, appliedCode]))
        setUsedCodes([...used, appliedCode])
      }
    }
  }

  const discount = totalPrice * discountRate
  const finalPrice = totalPrice - discount

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'oklch(0% 0 0 / 0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 70,
          width: 'min(100vw, 420px)',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-soft)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.33,1,0.68,1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: 'var(--border-soft)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--text)' }}>
            {cartLabel}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'var(--bg-sand)', color: 'var(--text-muted)' }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M2 2L12 12M12 2L2 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'var(--bg-sand)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }} aria-hidden>
                <path d="M3 3H6L8 15H20L22 7H8M12 23a1.5 1.5 0 100-3 1.5 1.5 0 000 3ZM18 23a1.5 1.5 0 100-3 1.5 1.5 0 000 3Z" />
              </svg>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{emptyLabel}</p>
            <Link
              href={`/${lang}/shop`}
              onClick={() => setOpen(false)}
              className="btn-press px-6 py-2.5 rounded-[12px] text-sm font-medium text-white"
              style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
            >
              {shopLabel}
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b"
                  style={{ borderColor: 'var(--border-soft)' }}>
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--bg-tint)', fontSize: '1.4rem' }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}>−</button>
                    <span className="w-5 text-center text-sm font-medium" style={{ color: 'var(--text)' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                    style={{ color: 'var(--border)' }}
                    aria-label={removeLabel}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                      <path d="M2 2L10 10M10 2L2 10" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Discount + Summary */}
            <div className="px-6 py-5 border-t space-y-3" style={{ borderColor: 'var(--border-soft)' }}>
              {/* Discount code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setCodeStatus('idle') }}
                  placeholder={discountPlaceholder}
                  onKeyDown={(e) => e.key === 'Enter' && applyCode()}
                  className="flex-1 px-3 py-2 rounded-[10px] text-xs focus:outline-none"
                  style={{
                    border: `1px solid ${codeStatus === 'invalid' || codeStatus === 'used' ? '#e87654' : 'var(--border)'}`,
                    background: 'var(--bg-page)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button onClick={applyCode}
                  className="px-3 py-2 rounded-[10px] text-xs font-medium"
                  style={{ background: 'var(--bg-sand)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
                  {discountApply}
                </button>
              </div>
              {codeStatus === 'applied' && (
                <p className="text-xs flex items-center gap-1" style={{ color: 'var(--green-ok)' }}>
                  <CheckIcon size={12} /> {discountApplied}
                </p>
              )}
              {codeStatus === 'invalid' && <p className="text-xs" style={{ color: '#e87654' }}>{discountInvalid}</p>}
              {codeStatus === 'used' && <p className="text-xs" style={{ color: '#e87654' }}>⚠ {discountUsed}</p>}

              {/* Totals */}
              <div className="rounded-[16px] p-4 space-y-2" style={{ background: 'var(--footer-bg)' }}>
                {discountRate > 0 && (
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--footer-text)' }}>{subtotalLabel}</span>
                    <span style={{ color: 'var(--footer-text)' }}>€{totalPrice.toFixed(2)}</span>
                  </div>
                )}
                {discountRate > 0 && (
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--green-ok)' }}>{discountLabel} (−{Math.round(discountRate * 100)}%)</span>
                    <span style={{ color: 'var(--green-ok)' }}>−€{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-sm" style={{ color: 'var(--footer-text)', fontFamily: 'var(--font-body)' }}>{totalLabel}</span>
                  <span className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--footer-title)' }}>
                    €{finalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="btn-press w-full text-white font-semibold py-3 rounded-[12px] text-sm mt-2"
                  style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
                >
                  {checkoutLabel}
                </button>
                <p className="text-xs text-center pt-1" style={{ color: 'var(--footer-faint)', fontFamily: 'var(--font-body)' }}>
                  {checkoutNote}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
