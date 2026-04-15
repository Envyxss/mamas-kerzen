import 'server-only'

export type Locale = 'en' | 'ru' | 'de'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
}

export const locales: Locale[] = ['en', 'ru', 'de']
export const defaultLocale: Locale = 'en'

export function hasLocale(locale: string): locale is Locale {
  return locale in dictionaries
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
