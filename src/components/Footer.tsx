'use client';

import { Github, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/584243737586',
      icon: <MessageCircle size={20} />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gus_gus1899/',
      icon: <Instagram size={20} />
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100010337793761',
      icon: <Facebook size={20} />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Suggus1899/Suggus1899',
      icon: <Github size={20} />
    }
  ];

  const secondaryLinks = [
    { label: t('now'), href: '/now' },
    { label: t('blog'), href: '/blog' },
  ];

  return (
    <footer className="w-full border-t-2 border-zinc-900 dark:border-zinc-100 py-12 px-6 mt-12 bg-zinc-50/95 dark:bg-[#0a0a0a]/95">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-space font-black uppercase text-xl mb-2 text-zinc-900 dark:text-zinc-100">Gustavo Colina (Suggus1899)</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {t('footerSubtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">{t('language')}</p>
          <div className="flex gap-2">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="p-3 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500 mb-1">Links</p>
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as '/'}
              className="text-sm font-bold uppercase tracking-[0.08em] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t-2 border-zinc-900/70 dark:border-zinc-100/70 text-center text-zinc-500 dark:text-zinc-500 text-sm uppercase tracking-[0.08em]">
        <p>© {currentYear} Gustavo Colina. {t('allRightsReserved')}</p>
      </div>
    </footer>
  );
}
