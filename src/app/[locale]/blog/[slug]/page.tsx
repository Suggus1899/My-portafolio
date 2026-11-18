import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { getBlogPostBySlug, blogPosts, type AppLocale } from '@/data/blogPosts';
import { SITE_URL } from '@/config/constants';
import { getLocalizedAlternates } from '@/lib/seo';
import repos from '@/repos.json';
import ProjectFigure from '@/components/ProjectFigure';
import { ArrowUpRight, Github } from 'lucide-react';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const appLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  const post = getBlogPostBySlug(slug, appLocale);
  const tBlog = await getTranslations({ locale: appLocale, namespace: 'Blog' });

  if (!post) {
    return {
      title: `${tBlog('title')} | Gustavo Colina`,
      robots: { index: false, follow: false },
      alternates: { canonical: `/${appLocale}/blog/${slug}` }
    };
  }

  return {
    title: `${post.title} | Gustavo Colina`,
    description: post.excerpt,
    alternates: getLocalizedAlternates(appLocale, `/blog/${slug}`),
    openGraph: {
      title: `${post.title} | Gustavo Colina`,
      description: post.excerpt,
      url: `${SITE_URL}/${appLocale}/blog/${slug}`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1254, height: 1254 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Gustavo Colina`,
      description: post.excerpt,
      images: [`${SITE_URL}/og-image.png`]
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const appLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  const post = getBlogPostBySlug(slug, appLocale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale: appLocale, namespace: 'Blog' });
  const tProjects = await getTranslations({ locale: appLocale, namespace: 'Projects' });
  const project = post.caseStudy ? repos.find((repo) => repo.id === post.caseStudy?.projectId) : undefined;
  const projectName = post.caseStudy ? tProjects(`items.${post.caseStudy.projectId}.name`) : '';

  return (
    <article className="editorial-article w-full px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="editorial-button editorial-button--secondary editorial-button--small"
        >
          {t('backToBlog')}
        </Link>

        <header className="mt-8 border-y border-zinc-900/15 py-8 dark:border-zinc-100/20 sm:py-12">
          <p className="editorial-kicker">{post.caseStudy ? `${tProjects('caseStudy')} · ${projectName}` : t('title')}</p>
          <h1 className="mt-4 max-w-4xl font-space text-4xl font-black uppercase leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
            <time dateTime={post.date}>{post.date}</time><span aria-hidden="true">·</span><span>{post.readTime}</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={tProjects('title')}>
            {post.tags.map((tag) => <li key={tag} className="editorial-tag">{tag}</li>)}
          </ul>
        </header>

        {post.caseStudy && project?.imageSrc && (
          <div className="mt-8">
            <ProjectFigure
              src={project.imageSrc}
              alt={tProjects(`items.${post.caseStudy.projectId}.imageAlt`)}
              caption={tProjects('diagramCaption')}
              featured={post.caseStudy.projectId === 'visitors'}
            />
          </div>
        )}

        <div className="editorial-report mt-10">
          {post.caseStudy ? post.caseStudy.sections.map((section) => (
            <section key={section.heading} className="editorial-report__section">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          )) : post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {post.caseStudy && project?.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="editorial-button editorial-button--primary mt-8">
            <Github size={16} aria-hidden="true" /> {tProjects('viewCode')}: {projectName}<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
