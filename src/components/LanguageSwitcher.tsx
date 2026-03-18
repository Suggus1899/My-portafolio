'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, routing } from '@/i18n/routing';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type AppLocale = (typeof routing.locales)[number];

const languages: Array<{ code: AppLocale; shortName: string; nativeName: string; flagSrc: string }> = [
  { code: 'en', shortName: 'EN', nativeName: 'English', flagSrc: '/flags/us.svg' },
  { code: 'es', shortName: 'ES', nativeName: 'Español', flagSrc: '/flags/es.svg' },
  { code: 'fr', shortName: 'FR', nativeName: 'Français', flagSrc: '/flags/fr.svg' },
  { code: 'it', shortName: 'IT', nativeName: 'Italiano', flagSrc: '/flags/it.svg' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (nextLocale: AppLocale) => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="group flex items-center gap-2.5 rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-2 text-sm text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        <Languages size={14} className="text-zinc-500 transition-colors group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
        <Image
          src={currentLanguage.flagSrc}
          alt={currentLanguage.nativeName}
          width={24}
          height={16}
          className="h-4 w-6 rounded-[3px] object-cover shadow-sm"
        />
        <span className="font-semibold tracking-wide">{currentLanguage.shortName}</span>
        <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 shadow-xl backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-950/95 z-[100]"
          >
            <div className="py-1.5" role="listbox" aria-label="Language options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  type="button"
                  role="option"
                  aria-selected={locale === lang.code}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-900 ${
                    locale === lang.code
                      ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-100/60 dark:bg-zinc-900/80'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <Image
                    src={lang.flagSrc}
                    alt={lang.nativeName}
                    width={24}
                    height={16}
                    className="h-4 w-6 rounded-[3px] object-cover shadow-sm"
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{lang.shortName}</span>
                  </div>
                  {locale === lang.code && <Check size={14} className="text-zinc-700 dark:text-zinc-200" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
