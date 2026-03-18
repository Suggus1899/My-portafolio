import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProjectsSection from '@/components/ProjectsSection';

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
    description: tIndex('description')
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsSection />;
}
