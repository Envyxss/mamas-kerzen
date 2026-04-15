import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { newsletterEmailHtml } from '../email-template'
import { rateLimit, getIP } from '../rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.RESEND_TO_EMAIL ?? 'your@email.de'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  // Rate limit: max 3 requests per minute per IP
  if (!rateLimit(getIP(req), 3, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { email } = body

  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  if (!isValidEmail(String(email)))
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  const safeEmail = String(email).trim().slice(0, 254)

  await resend.emails.send({
    from: 'Mamas Kerzen <onboarding@resend.dev>',
    to: safeEmail,
    subject: '🕯️ Dein Rabattcode wartet auf dich',
    html: newsletterEmailHtml('MAMA10'),
  })

  await resend.emails.send({
    from: 'Mamas Kerzen <onboarding@resend.dev>',
    to: TO,
    subject: `Neuer Newsletter-Abonnent: ${safeEmail}`,
    html: `<p>Neue Anmeldung: <strong>${safeEmail}</strong></p>`,
  })

  return NextResponse.json({ ok: true })
}
