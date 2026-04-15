'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface WishlistContextType {
  ids: number[]
  toggle: (id: number) => void
  has: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType>({
  ids: [],
  toggle: () => {},
  has: () => false,
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wishlist')
      if (saved) setIds(JSON.parse(saved))
    } catch {}
  }, [])

  function toggle(id: number) {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try { localStorage.setItem('wishlist', JSON.stringify(next)) } catch {}
      return next
    })
  }

  function has(id: number) {
    return ids.includes(id)
  }

  return (
    <WishlistContext.Provider value={{ ids, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
