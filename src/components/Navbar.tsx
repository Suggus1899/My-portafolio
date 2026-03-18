 'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b-2 border-zinc-900/90 bg-white/90 px-6 py-4 backdrop-blur-sm dark:border-zinc-100/90 dark:bg-[#0a0a0a]/88">
      <Link href="/" className="text-xl font-space font-black uppercase tracking-[0.04em] text-zinc-900 dark:text-zinc-100">
        Gustavo Colina
      </Link>
      
      <ul className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300">
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><a href={`/${locale}#curriculum`}>{t('curriculum')}</a></li>
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><Link href="/services">{t('services')}</Link></li>
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><a href={`/${locale}#experience`}>{t('experience')}</a></li>
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><Link href="/projects">{t('projects')}</Link></li>
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><a href={`/${locale}#skills`}>{t('skills')}</a></li>
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><Link href="/now">{t('now')}</Link></li>
        <li className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"><Link href="/blog">{t('blog')}</Link></li>
      </ul>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
