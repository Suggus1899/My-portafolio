'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EducationSection() {
  const t = useTranslations('Education');

  const education = [
    {
      title: 'Ingeniería en Informática',
      subtitle: 'Mención Ingeniería en Sistemas (8vo Semestre de 10)',
      entity: 'Universidad',
      icon: <GraduationCap className="text-blue-500" />,
    }
  ];

  const certifications = [
    {
      title: 'Data Science, Prompt Engineering, SQL (Intro & Intermediate)',
      entity: 'DataCamp',
      icon: <Award className="text-green-500" />
    },
    {
      title: 'Java Principios, Java POO, Spring Boot',
      entity: 'TodoCode',
      icon: <Award className="text-purple-500" />
    }
  ];

  return (
    <motion.section
      id="education"
      className="py-24 px-6 max-w-4xl mx-auto w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-10 h-[2px] w-52 bg-zinc-900/85 dark:bg-zinc-100/85" />
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-space font-black uppercase mb-6 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            Estudios Universitarios
          </h3>
          <div className="grid gap-4">
            {education.map((item, idx) => (
              <div key={idx} className="p-6 border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-950 flex gap-4 items-start">
                <div className="p-3 border border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-900">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-space font-black uppercase text-lg text-zinc-900 dark:text-zinc-100">{item.title}</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-space font-black uppercase mb-6 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            Cursos y Certificaciones
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((item, idx) => (
              <div key={idx} className="p-6 border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 flex gap-4 items-start transition-colors">
                <div className="p-2.5 border border-zinc-900 bg-white dark:border-zinc-100 dark:bg-zinc-950">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono">{item.entity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
