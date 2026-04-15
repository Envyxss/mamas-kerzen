import Link from 'next/link'

interface Crumb { label: string; href?: string }
interface Props { crumbs: Crumb[]; lang: string }

export default function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>/</span>
          )}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="transition-opacity hover:opacity-60"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-muted)' }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text)' }}>
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
