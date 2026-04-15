import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { contactEmailHtml } from '../email-template'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.RESEND_TO_EMAIL ?? 'your@email.de'

export async function POST(req: Request) {
  const { name, email, message } = await req.json()
  if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  await resend.emails.send({
    from: 'Mamas Kerzen <onboarding@resend.dev>',
    to: TO,
    replyTo: email,
    subject: `Neue Nachricht von ${name}`,
    html: contactEmailHtml(name, email, message),
  })

  return NextResponse.json({ ok: true })
}
