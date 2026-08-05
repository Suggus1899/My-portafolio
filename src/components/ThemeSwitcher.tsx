'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('Navigation');

  const handleToggleTheme = () => {
    const isCurrentlyDark = resolvedTheme
      ? resolvedTheme === 'dark'
      : document.documentElement.classList.contains('dark');

    setTheme(isCurrentlyDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
      aria-label={t('toggleTheme')}
    >
      <span className="block dark:hidden" aria-hidden="true">
        <Moon size={18} />
      </span>
      <span className="hidden dark:block" aria-hidden="true">
        <Sun size={18} />
      </span>
    </button>
  );
}
