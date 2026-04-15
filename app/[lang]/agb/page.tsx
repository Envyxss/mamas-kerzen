export default function AGBPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
        Allgemeine Geschäftsbedingungen (AGB)
      </h1>

      <section className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 1 Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die über den Online-Shop von Mamas Kerzen (Inhaberin: Maksym Stasiuk, Trierer Straße 281B, 52078 Aachen) aufgegeben werden.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 2 Vertragsschluss</h2>
          <p>Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar. Durch Anklicken des Buttons „Kaufen" geben Sie eine verbindliche Bestellung ab. Die Bestätigung des Eingangs Ihrer Bestellung erfolgt per E-Mail. Ein Kaufvertrag kommt erst mit unserer ausdrücklichen Annahme der Bestellung zustande.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 3 Preise und Versandkosten</h2>
          <p>Alle Preise sind Endpreise. Als Privatverkäufer erheben wir gemäß § 19 UStG keine Umsatzsteuer. Die anfallenden Versandkosten werden Ihnen im Bestellprozess mitgeteilt.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 4 Zahlung</h2>
          <p>Die Zahlung erfolgt über die im Shop angebotenen Zahlungsmethoden. Der Rechnungsbetrag ist sofort bei Bestellung fällig.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 5 Lieferung</h2>
          <p>Die Lieferung erfolgt innerhalb von 3–7 Werktagen nach Zahlungseingang. Alle Kerzen werden sorgfältig verpackt und per Post versandt. Lieferverzögerungen, die durch höhere Gewalt oder Umstände entstehen, die wir nicht zu vertreten haben, berechtigen uns, die Lieferung um die Dauer der Behinderung zu verschieben.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 6 Eigentumsvorbehalt</h2>
          <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 7 Mängelhaftung</h2>
          <p>Es gelten die gesetzlichen Mängelhaftungsrechte. Bei Mängeln wenden Sie sich bitte unter <a href="mailto:maxstasod@icloud.com" style={{ color: 'var(--accent)' }}>maxstasod@icloud.com</a> an uns.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>§ 8 Schlussbestimmungen</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Aachen, sofern der Kunde Kaufmann, eine juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen ist.</p>
        </div>

      </section>
    </main>
  )
}
