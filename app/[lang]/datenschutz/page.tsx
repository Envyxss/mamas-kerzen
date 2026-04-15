export default function DatenschutzPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
        Datenschutzerklärung
      </h1>

      <section className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>1. Datenschutz auf einen Blick</h2>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>2. Verantwortliche Stelle</h2>
          <p>Maksym Stasiuk<br />
          Trierer Straße 281B<br />
          52078 Aachen<br />
          E-Mail: <a href="mailto:maxstasod@icloud.com" style={{ color: 'var(--accent)' }}>maxstasod@icloud.com</a></p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>3. Datenerfassung auf dieser Website</h2>
          <h3 className="font-medium mt-3 mb-1" style={{ color: 'var(--text)' }}>Kontaktformular</h3>
          <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <h3 className="font-medium mt-3 mb-1" style={{ color: 'var(--text)' }}>Newsletter</h3>
          <p>Wenn Sie den Newsletter unserer Website abonnieren, wird die von Ihnen zuletzt angegebene E-Mail-Adresse genutzt, um Ihnen den Newsletter zuzusenden. Diese Daten werden nicht an Dritte weitergegeben.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>4. Analyse-Tools</h2>
          <p>Diese Website nutzt Vercel Analytics zur anonymisierten Auswertung des Nutzerverhaltens. Es werden keine personenbezogenen Daten gespeichert. Mehr Informationen finden Sie unter <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>vercel.com/legal/privacy-policy</a>.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>5. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>6. E-Mail-Versand</h2>
          <p>Der Versand von E-Mails erfolgt über den Dienst Resend (Resend Inc., USA). Ihre E-Mail-Adresse wird ausschließlich für den Versand der angeforderten E-Mails verwendet und nicht für andere Zwecke gespeichert oder weitergegeben.</p>
        </div>

      </section>
    </main>
  )
}
