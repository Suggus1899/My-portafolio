import { routing } from '@/i18n/routing';

export function getLocalizedAlternates(locale: (typeof routing.locales)[number], pathname = '') {
  return {
    canonical: `/${locale}${pathname}`,
    languages: Object.fromEntries(
      routing.locales.map((item) => [item, `/${item}${pathname}`])
    )
  };
}
