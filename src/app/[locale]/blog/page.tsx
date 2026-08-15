import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link, routing } from '@/i18n/routing';
import { getBlogPostsForLocale, type AppLocale } from '@/data/blogPosts';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  return {
    title: `${t('title')} | Gustavo Colina`,
    description: t('subtitle')
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
  const posts = getBlogPostsForLocale(locale);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {t('kicker')}
        </p>
        <h1 className="mt-3 text-4xl font-space font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('subtitle')}</p>

        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{post.title}</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={`/blog/${post.slug}`} aria-label={`${t('readMore')} — ${post.title}`} className="mt-5 inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                {t('readMore')}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
