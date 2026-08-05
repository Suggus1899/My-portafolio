'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, isOpen);

  const navLinks = [
    { label: t('cv'), href: `/${locale}#curriculum`, isAnchor: true },
    { label: t('services'), href: '/services', isAnchor: false },
    { label: t('projects'), href: '/projects', isAnchor: false },
    { label: t('skills'), href: `/${locale}#skills`, isAnchor: true },
  ];

  const isActive = (href: string, isAnchor: boolean) => {
    if (isAnchor) {
      return pathname === `/${locale}` || pathname === '/';
    }
    // Remove locale prefix for comparison
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const hrefWithoutLocale = href.replace(`/${locale}`, '') || '/';
    return pathWithoutLocale === hrefWithoutLocale;
  };

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-32 border-2 border-zinc-900 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-transform focus:translate-y-0 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100"
      >
        {t('skipToContent')}
      </a>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b-2 border-zinc-900/90 bg-white/90 px-6 py-4 backdrop-blur-sm dark:border-zinc-100/90 dark:bg-[#0a0a0a]/88" aria-label={t('mainNav')}>
        <Link href="/" className="text-xl font-space font-black uppercase tracking-[0.04em] text-zinc-900 dark:text-zinc-100" onClick={close}>
          Gustavo Colina
        </Link>
        
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300">
          {navLinks.map((link) => {
            const active = isActive(link.href, link.isAnchor);
            const activeClass = active ? 'text-zinc-900 dark:text-zinc-100' : '';
            return link.isAnchor ? (
              <li key={link.href} className={`transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 ${activeClass}`}>
                <a href={link.href}>{link.label}</a>
              </li>
            ) : (
              <li key={link.href} className={`transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 ${activeClass}`}>
                <Link href={link.href as '/'}>{link.label}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
          {/* Hamburger button — mobile only */}
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center border-2 border-zinc-900 bg-white text-zinc-900 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={close}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div ref={drawerRef} className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs border-l-2 border-zinc-900 bg-white dark:border-zinc-100 dark:bg-[#0a0a0a] flex flex-col pt-24 pb-8 px-6 gap-2 overflow-y-auto">
            <button
              type="button"
              className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center border-2 border-zinc-900 dark:border-zinc-100"
              onClick={close}
              aria-label={t('closeMenu')}
            >
              <X size={18} />
            </button>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href, link.isAnchor);
                const activeClass = active ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 -mx-2 px-2' : '';
                return link.isAnchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={`border-b border-zinc-200 dark:border-zinc-800 py-3 text-sm font-bold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 ${activeClass}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href as '/'}
                    onClick={close}
                    className={`border-b border-zinc-200 dark:border-zinc-800 py-3 text-sm font-bold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 ${activeClass}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </>
      )}
    </>
  );
}
