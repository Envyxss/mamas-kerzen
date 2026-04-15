'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ErfolgPage() {
  const { lang } = useParams() as { lang: string }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🕯️</div>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
          Vielen Dank!
        </h1>
        <p className="mb-2" style={{ color: 'var(--text-muted)' }}>
          Deine Bestellung ist bei uns eingegangen.
        </p>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          Du bekommst in Kürze eine Bestätigungs-E-Mail.
        </p>
        <Link
          href={`/${lang}/shop`}
          className="inline-block px-8 py-3 rounded-full text-white text-sm font-semibold"
          style={{ background: 'var(--accent)' }}
        >
          Weiter einkaufen →
        </Link>
      </div>
    </main>
  )
}
