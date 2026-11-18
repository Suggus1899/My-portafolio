import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ServicesSection from '@/components/ServicesSection';
import { getLocalizedAlternates, getPageSocial } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  return {
    title: `${t('title')} | Gustavo Colina`,
    description: t('subtitle'),
    alternates: getLocalizedAlternates(locale as 'es' | 'en' | 'fr' | 'it', '/services'),
    ...getPageSocial(locale as 'es' | 'en' | 'fr' | 'it', '/services', `${t('title')} | Gustavo Colina`, t('subtitle'))
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesSection />;
}
