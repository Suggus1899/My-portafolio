import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link, routing } from '@/i18n/routing';
import { getBlogPostsForLocale, type AppLocale } from '@/data/blogPosts';
import { getLocalizedAlternates } from '@/lib/seo';
import repos from '@/repos.json';
import ProjectFigure from '@/components/ProjectFigure';
import { ArrowUpRight } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale: appLocale, namespace: 'Blog' });

  return {
    title: `${t('title')} | Gustavo Colina`,
    description: t('subtitle'),
    alternates: getLocalizedAlternates(appLocale, '/blog')
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  return <BlogList locale={appLocale} />;
}

function BlogList({ locale }: { locale: AppLocale }) {
  const t = useTranslations('Blog');
  const tProjects = useTranslations('Projects');
  const posts = getBlogPostsForLocale(locale);

  return (
    <section id="blog" className="editorial-section w-full px-5 py-12 sm:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 max-w-4xl border-b border-zinc-900/15 pb-6 dark:border-zinc-100/20 sm:mb-10">
          <p className="editorial-kicker">{t('kicker')}</p>
          <h1 className="mt-3 font-space text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-300">{t('subtitle')}</p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => {
            const project = post.caseStudy ? repos.find((repo) => repo.id === post.caseStudy?.projectId) : undefined;
            return (
              <article key={post.slug} className="editorial-story">
                {post.caseStudy && project?.imageSrc && (
                  <ProjectFigure
                    src={project.imageSrc}
                    alt={tProjects(`items.${post.caseStudy.projectId}.imageAlt`)}
                    caption={tProjects('diagramCaption')}
                    featured={post.caseStudy.projectId === 'visitors'}
                  />
                )}
                <div className="p-5 sm:p-6">
                  <p className="editorial-kicker">{post.caseStudy ? tProjects('caseStudy') : t('kicker')}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <time dateTime={post.date}>{post.date}</time><span aria-hidden="true">·</span><span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-space text-xl font-black uppercase leading-snug text-zinc-900 dark:text-zinc-100">{post.title}</h2>
                  <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('kicker')}>
                    {post.tags.map((tag) => <li key={tag} className="editorial-tag">{tag}</li>)}
                  </ul>
                  <Link href={`/blog/${post.slug}`} aria-label={`${t('readMore')} — ${post.title}`} className="editorial-button editorial-button--secondary editorial-button--small mt-5">
                    {t('readMore')} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
