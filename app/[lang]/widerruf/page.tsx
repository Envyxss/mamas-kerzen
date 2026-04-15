export default function WiderrufPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
        Widerrufsbelehrung
      </h1>

      <section className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Widerrufsrecht</h2>
          <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
          <p className="mt-2">Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
          <p className="mt-2">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
          <div className="mt-2 p-4 rounded-lg" style={{ background: 'var(--bg-card)' }}>
            <p>Maksym Stasiuk<br />
            Trierer Straße 281B<br />
            52078 Aachen<br />
            E-Mail: <a href="mailto:maxstasod@icloud.com" style={{ color: 'var(--accent)' }}>maxstasod@icloud.com</a></p>
          </div>
          <p className="mt-2">mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
          <p className="mt-2">Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Folgen des Widerrufs</h2>
          <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
          <p className="mt-2">Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.</p>
          <p className="mt-2">Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.</p>
          <p className="mt-2">Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden. Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
        </div>

        <div>
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>Ausschluss des Widerrufsrechts</h2>
          <p>Das Widerrufsrecht besteht nicht bei Waren, die nach Kundenspezifikation angefertigt wurden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind (z.B. personalisierte Kerzen mit individueller Gravur).</p>
        </div>

      </section>
    </main>
  )
}
