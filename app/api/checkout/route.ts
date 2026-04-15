import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { rateLimit, getIP } from '../rate-limit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  if (!rateLimit(getIP(req), 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'No items' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const lang = body.lang ?? 'de'

  const line_items = body.items.map((item: { name: string; price: number; quantity: number; image?: string }) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
        ...(item.image ? { images: [item.image] } : {}),
      },
      unit_amount: Math.round(item.price * 100), // cents
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${baseUrl}/${lang}/bestellung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/${lang}/cart`,
    locale: lang === 'de' ? 'de' : lang === 'ru' ? 'ru' : 'en',
  })

  return NextResponse.json({ url: session.url })
}
