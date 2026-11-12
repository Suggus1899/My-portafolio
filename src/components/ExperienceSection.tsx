'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { experiences } from '@/data/experience';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  return (
    <motion.section
      id="experience"
      className="py-24 px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-10 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
      <div className="space-y-12">
        {experiences.map((exp, idx) => (
          <article key={idx} className="flex flex-col md:flex-row gap-4 md:gap-12 border-2 border-zinc-900 bg-white/95 p-5 dark:border-zinc-100 dark:bg-zinc-950/95">
            <div className="md:w-1/4 text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400 font-mono mt-1">
              {t(exp.periodKey)}
            </div>
            <div className="md:w-3/4 space-y-4">
              <div>
                <h3 className="text-xl font-space font-black uppercase mb-1 text-zinc-900 dark:text-zinc-100">
                  {t(exp.roleKey)}
                </h3>
                <div className="text-zinc-700 dark:text-zinc-300 mb-3 font-semibold uppercase tracking-wide text-sm">
                  {t(exp.companyKey)}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t(exp.descriptionKey)}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {t(exp.technologiesKey).split(', ').map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <ul className="space-y-2">
                {exp.achievementsKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
