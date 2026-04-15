import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { contactEmailHtml } from '../email-template'
import { rateLimit, getIP } from '../rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.RESEND_TO_EMAIL ?? 'your@email.de'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string) {
  return str.replace(/[<>]/g, '').trim().slice(0, 1000)
}

export async function POST(req: Request) {
  // Rate limit: max 5 requests per minute per IP
  if (!rateLimit(getIP(req), 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { name, email, message } = body

  if (!name || !email || !message)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  if (!isValidEmail(email))
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  const safeName = sanitize(String(name))
  const safeEmail = sanitize(String(email))
  const safeMessage = sanitize(String(message))

  if (safeName.length < 2 || safeMessage.length < 5)
    return NextResponse.json({ error: 'Too short' }, { status: 400 })

  await resend.emails.send({
    from: 'Mamas Kerzen <onboarding@resend.dev>',
    to: TO,
    replyTo: safeEmail,
    subject: `Neue Nachricht von ${safeName}`,
    html: contactEmailHtml(safeName, safeEmail, safeMessage),
  })

  return NextResponse.json({ ok: true })
}
