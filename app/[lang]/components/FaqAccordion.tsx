'use client'

import { useState } from 'react'

interface Item {
  q: string
  a: string
  num: number
}

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = open === item.num
        return (
          <div
            key={item.num}
            className="rounded-[18px] overflow-hidden"
            style={{
              background: 'var(--bg-surface)',
              border: `1px solid ${isOpen ? 'var(--border)' : 'var(--border-soft)'}`,
              transition: 'border-color 0.2s ease',
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.num)}
              className="w-full flex items-center gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                style={{
                  background: isOpen ? 'var(--terra)' : 'var(--bg-sand)',
                  color: isOpen ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {item.num}
              </span>
              <span
                className="flex-1 font-medium text-sm text-left"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1rem' }}
              >
                {item.q}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden
                style={{
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.33,1,0.68,1)',
                }}
              >
                <path d="M3 6L8 11L13 6" />
              </svg>
            </button>

            {/* Animated answer */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.3s cubic-bezier(0.33,1,0.68,1)',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <p
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{
                    paddingLeft: '4rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
