export default function ImpressumPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
        Impressum
      </h1>

      <section className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Angaben gemäß § 5 TMG</h2>
          <p>Maksym Stasiuk<br />
          Trierer Straße 281B<br />
          52078 Aachen<br />
          Deutschland</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Kontakt</h2>
          <p>E-Mail: <a href="mailto:maxstasod@icloud.com" style={{ color: 'var(--accent)' }}>maxstasod@icloud.com</a></p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Maksym Stasiuk<br />
          Trierer Straße 281B<br />
          52078 Aachen</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Urheberrecht</h2>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
        </div>

      </section>
    </main>
  )
}
