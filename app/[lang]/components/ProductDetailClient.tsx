'use client'

import { useEffect, useState } from 'react'
import { useCart } from './CartContext'
import { useWishlist } from './WishlistContext'

interface ProductDict {
  quantity: string
  add_to_cart: string
  added: string
}

interface Props {
  product: {
    id: number
    slug: string
    name: string
    price: number
    emoji: string
    rating: number
    reviewCount: number
  }
  dict: ProductDict
  reviewsLabel: string
  currency: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="text-base"
          style={{ color: star <= Math.round(rating) ? '#c4622d' : 'var(--border)' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function ProductDetailClient({ product, dict, reviewsLabel, currency }: Props) {
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // Save to recently viewed
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentlyViewed')
      const ids: number[] = saved ? JSON.parse(saved) : []
      const next = [product.id, ...ids.filter((id) => id !== product.id)].slice(0, 10)
      localStorage.setItem('recentlyViewed', JSON.stringify(next))
    } catch {}
  }, [product.id])

  function handleAdd() {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {product.rating} ({product.reviewCount} {reviewsLabel})
        </span>
      </div>

      {/* Price */}
      <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
        {currency}{product.price.toFixed(2)}
      </p>

      {/* Quantity */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
          {dict.quantity}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-lg transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
          >
            −
          </button>
          <span className="w-8 text-center font-semibold text-base" style={{ color: 'var(--text)' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-lg transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 py-3.5 rounded-[16px] font-semibold text-base text-white transition-all"
          style={{ background: added ? '#4a7c59' : 'var(--terra)' }}
        >
          {added ? `✓ ${dict.added}` : dict.add_to_cart}
        </button>
        <button
          onClick={() => toggle(product.id)}
          className="w-12 h-12 rounded-[16px] flex items-center justify-center text-lg transition-all"
          style={{
            background: has(product.id) ? 'var(--terra)' : 'var(--bg-sand)',
            color: has(product.id) ? '#fff' : 'var(--text-muted)',
          }}
          aria-label="Wishlist"
        >
          {has(product.id) ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}
