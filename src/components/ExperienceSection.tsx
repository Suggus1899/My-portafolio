'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { experiences } from '@/data/experience';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  return (
    <motion.section
      id="experience"
      className="editorial-section w-full max-w-6xl px-5 py-12 sm:px-8 md:py-20"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <header className="mb-8 border-b border-zinc-900/15 pb-6 dark:border-zinc-100/20 sm:mb-10">
        <p className="editorial-kicker">02 / {t('title')}</p>
        <h2 className="mt-3 font-space text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">{t('title')}</h2>
      </header>

      <ol className="editorial-timeline">
        {experiences.map((exp) => (
          <li key={exp.roleKey} className="editorial-timeline__item">
            <article className="editorial-timeline__card">
              <p className="editorial-kicker">{t(exp.periodKey)}</p>
              <h3 className="mt-2 font-space text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">{t(exp.roleKey)}</h3>
              <p className="mt-1 font-semibold text-zinc-600 dark:text-zinc-300">{t(exp.companyKey)}</p>
              <p className="mt-4 max-w-4xl leading-relaxed text-zinc-600 dark:text-zinc-300">{t(exp.descriptionKey)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t(exp.technologiesKey).split(', ').map((tech) => <span key={tech} className="editorial-tag">{tech}</span>)}
              </div>
              <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {exp.achievementsKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
              {exp.roleKey === 'exp2Role' && (
                <Link href={`/blog/caso-de-estudio-logmaster`} className="editorial-button editorial-button--secondary editorial-button--small mt-5">
                  LogMaster <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              )}
            </article>
          </li>
        ))}
      </ol>
    </motion.section>
  );
}
