'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { getSkillIcon } from './SkillIcon';

export default function SkillsSection() {
  const t = useTranslations('Skills');

  return (
    <motion.section
      id="skills"
      className="py-24 px-6 max-w-4xl mx-auto mb-24 w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-10 h-[2px] w-36 bg-zinc-900/85 dark:bg-zinc-100/85" />
      
      <div className="space-y-12 w-full">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8 border-2 border-zinc-900 dark:border-zinc-100 p-6 bg-white/95 dark:bg-zinc-950/95">
            <h3 className="md:w-1/4 font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
              {t(category.titleKey)}
            </h3>
            <div className="md:w-3/4 flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm font-medium border border-zinc-900 dark:border-zinc-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg flex items-center">{getSkillIcon(skill.name)}</span>
                  {skill.name.startsWith('lang') ? t(skill.name) : skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
