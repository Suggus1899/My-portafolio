import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProjectsSection from '@/components/ProjectsSection';
import { SITE_URL } from '@/config/constants';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tProjects = await getTranslations({ locale, namespace: 'Projects' });
  const tIndex = await getTranslations({ locale, namespace: 'Index' });

  return {
    title: `${tProjects('title')} | Gustavo Colina`,
    description: tProjects('private_projects_note'),
    openGraph: {
      title: `${tProjects('title')} | Gustavo Colina`,
      description: tProjects('private_projects_note'),
      url: `${SITE_URL}/${locale}/projects`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tProjects('title')} | Gustavo Colina`,
      description: tProjects('private_projects_note'),
      images: [`${SITE_URL}/og-image.png`]
    }
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsSection />;
}
