'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { AppLocale } from '@/data/blogPosts';
import { getBlogPostsForLocale } from '@/data/blogPosts';
import { motion } from 'framer-motion';

export default function BlogPreviewSection({ locale }: { locale: AppLocale }) {
  const t = useTranslations('Blog');
  const posts = getBlogPostsForLocale(locale).slice(0, 3);

  return (
    <motion.section
      id="blog"
      className="py-24 px-6 max-w-4xl mx-auto w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-space font-black uppercase tracking-tight">{t('title')}</h2>
          <div className="mt-3 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
        </div>
        <Link
          href="/blog"
          className="border-2 border-zinc-900 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          {t('viewAll')}
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="border-2 border-zinc-900 bg-white p-5 dark:border-zinc-100 dark:bg-zinc-950">
            <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{post.date}</p>
            <h3 className="mt-3 font-space font-black uppercase text-zinc-900 dark:text-zinc-100">{post.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              {t('readMore')}
            </Link>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
