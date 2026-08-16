'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {t('kicker')}
        </p>
        <h1 className="mt-3 text-4xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h1>
        <div className="mx-auto mt-3 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('description')}</p>

        <Link
          href="/"
          className="mt-8 inline-flex border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}
