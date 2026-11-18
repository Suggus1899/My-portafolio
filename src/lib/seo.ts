import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/config/constants';

type AppLocale = (typeof routing.locales)[number];

export const ogLocale: Record<AppLocale, string> = { es: 'es_ES', en: 'en_US', fr: 'fr_FR', it: 'it_IT' };
export const ogImage = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Gustavo Colina' };

export function getLocalizedAlternates(locale: AppLocale, pathname = '') {
  return {
    canonical: `/${locale}${pathname}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((item) => [item, `/${item}${pathname}`])),
      'x-default': `/${routing.defaultLocale}${pathname}`
    }
  };
}

export function getPageSocial(locale: AppLocale, pathname: string, title: string, description: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: { title, description, url: `/${locale}${pathname}`, siteName: 'Gustavo Colina', locale: ogLocale[locale], type: 'website', images: [ogImage] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] }
  };
}
