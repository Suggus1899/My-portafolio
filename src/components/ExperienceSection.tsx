'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  const experiences = [
    {
      role: 'Software Engineer Intern / Student',
      company: 'Universidad',
      period: '2022 — Present',
      description: 'Studying Systems Engineering (8/10 semesters). Focused on backend development with Java and Node.js, API design, and cloud networking fundamentals while building full-stack applications.',
    },
    // Placholder for the user to add more
    {
      role: 'Backend Developer',
      company: 'Freelance',
      period: '2023 — Present',
      description: 'Developing independent projects with Spring Boot, Spring Security, Hibernate/JPA and Node.js. Designing relational data models in PostgreSQL, MySQL and SQLite, plus MongoDB integrations when domain flexibility is needed.',
    }
  ];

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
              {exp.period}
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-space font-black uppercase mb-1 text-zinc-900 dark:text-zinc-100">
                {exp.role}
              </h3>
              <div className="text-zinc-700 dark:text-zinc-300 mb-4 font-semibold uppercase tracking-wide text-sm">
                {exp.company}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
