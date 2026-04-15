import Link from 'next/link'
import { CandleIcon } from './components/Icons'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-4">
      <CandleIcon size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(4rem, 12vw, 7rem)',
          fontWeight: 700,
          color: 'var(--terra)',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </p>
      <h1
        className="mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          color: 'var(--text)',
          lineHeight: 1.2,
        }}
      >
        Seite nicht gefunden
      </h1>
      <p
        className="mb-8 max-w-sm"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}
      >
        Diese Seite existiert leider nicht.
      </p>
      <Link
        href="/de/shop"
        className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-[14px] text-sm font-medium text-white"
        style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}
      >
        Zurück zum Shop
      </Link>
    </div>
  )
}
