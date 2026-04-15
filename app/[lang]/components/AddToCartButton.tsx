'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import { CheckIcon } from './Icons'

interface Props {
  product: {
    id: number
    slug: string
    name: string
    price: number
    emoji: string
  }
  labels: {
    add: string
    added: string
  }
}

export default function AddToCartButton({ product, labels }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleClick() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <button
      onClick={handleClick}
      className="btn-press inline-flex items-center gap-1.5 px-4 py-2 rounded-[12px] text-sm font-medium text-white"
      style={{
        background: added ? 'var(--green-ok)' : 'var(--terra)',
        fontFamily: 'var(--font-body)',
        transition: 'background 0.3s ease, transform 0.12s ease, opacity 0.15s ease',
      }}
    >
      {added ? (
        <>
          <CheckIcon size={13} />
          {labels.added}
        </>
      ) : (
        labels.add
      )}
    </button>
  )
}
