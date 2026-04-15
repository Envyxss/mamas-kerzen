import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { newsletterEmailHtml } from '../email-template'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.RESEND_TO_EMAIL ?? 'your@email.de'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  await resend.emails.send({
    from: 'Mamas Kerzen <onboarding@resend.dev>',
    to: email,
    subject: '🕯️ Dein Rabattcode wartet auf dich',
    html: newsletterEmailHtml('MAMA10'),
  })

  await resend.emails.send({
    from: 'Mamas Kerzen <onboarding@resend.dev>',
    to: TO,
    subject: `Neuer Newsletter-Abonnent: ${email}`,
    html: `<p>Neue Anmeldung: <strong>${email}</strong></p>`,
  })

  return NextResponse.json({ ok: true })
}
