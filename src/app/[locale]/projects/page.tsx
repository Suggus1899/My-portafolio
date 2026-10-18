import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProjectsSection from '@/components/ProjectsSection';
import { SITE_URL } from '@/config/constants';
import { getLocalizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tProjects = await getTranslations({ locale, namespace: 'Projects' });

  return {
    title: `${tProjects('title')} | Gustavo Colina`,
    description: tProjects('description'),
    alternates: getLocalizedAlternates(locale as 'es' | 'en' | 'fr' | 'it', '/projects'),
    openGraph: {
      title: `${tProjects('title')} | Gustavo Colina`,
      description: tProjects('description'),
      url: `${SITE_URL}/${locale}/projects`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1254, height: 1254 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tProjects('title')} | Gustavo Colina`,
      description: tProjects('description'),
      images: [`${SITE_URL}/og-image.png`]
    }
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsSection />;
}
