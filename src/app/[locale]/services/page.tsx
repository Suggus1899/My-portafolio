import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ServicesSection from '@/components/ServicesSection';
import { SITE_URL } from '@/config/constants';
import { getLocalizedAlternates } from '@/lib/seo';

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
    openGraph: {
      title: `${t('title')} | Gustavo Colina`,
      description: t('subtitle'),
      url: `${SITE_URL}/${locale}/services`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1254, height: 1254 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Gustavo Colina`,
      description: t('subtitle'),
      images: [`${SITE_URL}/og-image.png`]
    }
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesSection />;
}
