import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type GenerateMetadataOptions = {
  locale: string;
  namespace: string;
  titleKey?: string;
  descriptionKey?: string;
  path?: string;
  ogImage?: string;
};

export async function generatePageMetadata({
  locale,
  namespace,
  titleKey = 'title',
  descriptionKey = 'description',
  path = '',
  ogImage = '/og-image.png'
}: GenerateMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t(titleKey);
  const description = t(descriptionKey);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName: 'Gustavo Colina Portfolio',
      locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: 'Gustavo Colina — Software Engineer'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${ogImage}`]
    }
  };
}

export function createJsonLdPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gustavo Colina',
    jobTitle: 'Software Engineer',
    url: siteUrl,
    sameAs: [
      'https://github.com/Suggus1899',
      'https://linkedin.com/in/gustavo-colina'
    ]
  };
}
