import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProjectsSection from '@/components/ProjectsSection';
import { getLocalizedAlternates, getPageSocial } from '@/lib/seo';

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
    ...getPageSocial(locale as 'es' | 'en' | 'fr' | 'it', '/projects', `${tProjects('title')} | Gustavo Colina`, tProjects('description'))
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsSection />;
}
