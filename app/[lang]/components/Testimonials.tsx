interface Props {
  eyebrow: string
  title: string
}

const testimonials = [
  {
    quote: 'Diese Kerzen sind einfach wunderschön. Der Duft füllt den ganzen Raum.',
    name: 'Maria K.',
    location: 'Aachen',
    rating: 5,
  },
  {
    quote: 'Perfektes Geschenk für meine Mutter. Die Verpackung war traumhaft.',
    name: 'Thomas B.',
    location: 'Berlin',
    rating: 5,
  },
  {
    quote: 'Handgemacht und nachhaltig – genau was ich gesucht habe.',
    name: 'Sophie L.',
    location: 'Hamburg',
    rating: 5,
  },
]

export default function Testimonials({ eyebrow, title }: Props) {
  return (
    <section className="py-20 border-t" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-soft)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}
        >
          {eyebrow}
        </p>
        <h2
          className="mb-10"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--text)',
            lineHeight: '1.15',
          }}
        >
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-[20px] p-6 flex flex-col gap-4"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-soft)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    style={{ color: s <= t.rating ? 'var(--terra)' : 'var(--border)', fontSize: '0.9rem' }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Name */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {t.name} &middot; {t.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
