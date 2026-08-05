import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { getBlogPostBySlug, blogPosts, type AppLocale } from '@/data/blogPosts';

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

  if (!post) {
    return {
      title: 'Post not found | Gustavo Colina'
    };
  }

  return {
    title: `${post.title} | Gustavo Colina`,
    description: post.excerpt
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

  return (
    <article className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          ← Blog
        </Link>

        <h1 className="mt-6 text-4xl font-space font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <div className="mt-8 space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
