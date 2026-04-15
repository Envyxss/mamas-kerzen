export type Locale = 'en' | 'ru' | 'de'
export type Scent = 'floral' | 'woody' | 'fresh' | 'sweet'

export interface Product {
  id: number
  slug: string
  price: number
  emoji: string
  color: string
  image?: string
  scent: Scent
  notes: string[]          // visible scent notes on product detail
  isNew?: boolean
  isBestseller?: boolean
  rating: number
  reviewCount: number
  translations: Record<Locale, { name: string; description: string }>
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'lavender',
    price: 14.99,
    emoji: '💜',
    color: 'from-purple-100 to-purple-200',
    scent: 'floral',
    notes: ['Lavendel', 'Vanille', 'Zeder'],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 124,
    translations: {
      en: { name: 'Lavender Dream', description: 'Calming lavender scent with hints of vanilla. Perfect for relaxation and evening rituals.' },
      ru: { name: 'Лавандовая мечта', description: 'Успокаивающий аромат лаванды с нотками ванили. Идеально для расслабления и вечерних ритуалов.' },
      de: { name: 'Lavendeltraum', description: 'Beruhigender Lavendelduft mit Vanillenoten. Perfekt für Entspannung und Abendrituale.' },
    },
  },
  {
    id: 2,
    slug: 'vanilla',
    price: 13.99,
    emoji: '🤍',
    color: 'from-amber-50 to-amber-100',
    scent: 'sweet',
    notes: ['Vanille', 'Karamell', 'Sandelholz'],
    isBestseller: true,
    rating: 4.9,
    reviewCount: 89,
    translations: {
      en: { name: 'Warm Vanilla', description: 'Rich, warm vanilla with caramel undertones. Creates a cozy, inviting atmosphere.' },
      ru: { name: 'Тёплая ваниль', description: 'Насыщенная тёплая ваниль с карамельными нотками. Создаёт уютную, приглашающую атмосферу.' },
      de: { name: 'Warme Vanille', description: 'Reiches, warmes Vanillearoma mit Karamelluntertönen. Schafft eine gemütliche, einladende Atmosphäre.' },
    },
  },
  {
    id: 3,
    slug: 'forest',
    price: 16.99,
    emoji: '🌲',
    color: 'from-green-100 to-green-200',
    scent: 'woody',
    notes: ['Kiefer', 'Zeder', 'Moos'],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 67,
    translations: {
      en: { name: 'Forest Walk', description: 'Fresh pine, cedar and earthy moss. Brings the calming energy of a forest into your home.' },
      ru: { name: 'Лесная прогулка', description: 'Свежая сосна, кедр и земляной мох. Приносит умиротворяющую энергию леса в ваш дом.' },
      de: { name: 'Waldspaziergang', description: 'Frische Kiefer, Zeder und erdiges Moos. Bringt die beruhigende Energie eines Waldes in Ihr Zuhause.' },
    },
  },
  {
    id: 4,
    slug: 'rose',
    price: 15.99,
    emoji: '🌹',
    color: 'from-rose-100 to-rose-200',
    scent: 'floral',
    notes: ['Rose', 'Jasmin', 'Moschus'],
    rating: 4.6,
    reviewCount: 45,
    translations: {
      en: { name: 'Rose Garden', description: 'Romantic rose with jasmine and a soft musk base. A timeless, elegant fragrance.' },
      ru: { name: 'Розовый сад', description: 'Романтическая роза с жасмином и мягкой мускусной базой. Вневременной элегантный аромат.' },
      de: { name: 'Rosengarten', description: 'Romantische Rose mit Jasmin und weicher Moschusbase. Ein zeitloser, eleganter Duft.' },
    },
  },
  {
    id: 5,
    slug: 'citrus',
    price: 12.99,
    emoji: '🍋',
    color: 'from-yellow-100 to-yellow-200',
    scent: 'fresh',
    notes: ['Zitrone', 'Orange', 'Grapefruit'],
    isNew: true,
    rating: 4.5,
    reviewCount: 23,
    translations: {
      en: { name: 'Citrus Burst', description: 'Energizing blend of lemon, orange and grapefruit. Perfect for morning routines.' },
      ru: { name: 'Цитрусовый взрыв', description: 'Бодрящая смесь лимона, апельсина и грейпфрута. Идеально для утренних ритуалов.' },
      de: { name: 'Zitrusschwung', description: 'Belebende Mischung aus Zitrone, Orange und Grapefruit. Perfekt für Morgenrituale.' },
    },
  },
  {
    id: 6,
    slug: 'sandalwood',
    price: 17.99,
    emoji: '🪵',
    color: 'from-orange-100 to-orange-200',
    scent: 'woody',
    notes: ['Sandelholz', 'Amber', 'Moschus'],
    isNew: true,
    rating: 4.8,
    reviewCount: 31,
    translations: {
      en: { name: 'Sandalwood & Amber', description: 'Deep, woody sandalwood with warm amber. A luxurious, sophisticated scent.' },
      ru: { name: 'Сандал и Амбра', description: 'Глубокий древесный сандал с тёплой амброй. Роскошный изысканный аромат.' },
      de: { name: 'Sandelholz & Amber', description: 'Tiefes, holziges Sandelholz mit warmem Amber. Ein luxuriöser, raffinierter Duft.' },
    },
  },
]

export const bestsellers = products.filter((p) => p.isBestseller)
