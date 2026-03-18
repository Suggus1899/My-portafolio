'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight, PlayCircle, Github } from 'lucide-react';
import repos from '../repos.json';
import { motion } from 'framer-motion';

type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  demoUrl?: string | null;
  status?: string;
  year?: string;
  license?: string;
  highlights?: string[];
};

type Project = Repo & {
  isPrivate?: boolean;
};

export default function ProjectsSection() {
  const t = useTranslations('Projects');

  const privateProject: Project = {
    name: t('privateName'),
    description: t('private_projects_note') + t('privateDescSuffix'),
    url: '#',
    language: t('privateLanguage'),
    demoUrl: null,
    status: t('privateStatus'),
    year: t('privateDate'),
    license: t('privateLicense'),
    highlights: [
      t('privateHighlight1'),
      t('privateHighlight2')
    ],
    isPrivate: true,
  };

  const allProjects: Project[] = [privateProject, ...(repos as Repo[])];

  return (
    <motion.section
      id="projects"
      className="py-24 px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-10 h-[2px] w-36 bg-zinc-900/85 dark:bg-zinc-100/85" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map((repo, idx) => (
          <article
            key={idx}
            className={`group p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
              repo.isPrivate 
                ? 'bg-zinc-50/90 border-zinc-900 dark:bg-zinc-900/50 dark:border-zinc-100 border-dashed' 
                : 'bg-white/95 border-zinc-900 hover:shadow-lg dark:bg-zinc-950/95 dark:border-zinc-100'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-space font-black uppercase text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                {repo.name}
                {repo.isPrivate && (
                  <span className="text-[10px] px-2 py-0.5 border border-zinc-900 dark:border-zinc-100 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase tracking-wider font-bold">
                    {t('private')}
                  </span>
                )}
              </h3>
              {!repo.isPrivate && (
                <ArrowUpRight className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" size={20} />
              )}
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 line-clamp-2">
              {repo.description || t('noDescription')}
            </p>

            <div className="mb-5 grid grid-cols-2 gap-2 text-[11px] uppercase tracking-wider">
              <div className="border border-zinc-900/70 px-2 py-1 text-zinc-700 dark:border-zinc-100/70 dark:text-zinc-300">
                <span className="font-bold">{t('statusLabel')}: </span>{repo.status || t('unknown')}
              </div>
              <div className="border border-zinc-900/70 px-2 py-1 text-zinc-700 dark:border-zinc-100/70 dark:text-zinc-300">
                <span className="font-bold">{t('yearLabel')}: </span>{repo.year || t('unknown')}
              </div>
              <div className="col-span-2 border border-zinc-900/70 px-2 py-1 text-zinc-700 dark:border-zinc-100/70 dark:text-zinc-300">
                <span className="font-bold">{t('licenseLabel')}: </span>{repo.license || t('unknown')}
              </div>
            </div>

            {!!repo.highlights?.length && (
              <ul className="mb-5 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                {repo.highlights.slice(0, 2).map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center justify-between gap-3">
              {repo.language && (
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {repo.language}
                </span>
              )}

              <div className="flex items-center gap-2">
                {!repo.isPrivate && repo.url !== '#' && (
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-zinc-900 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                  >
                    <Github size={13} />
                    {t('viewCode')}
                  </a>
                )}

                {!repo.isPrivate && repo.demoUrl ? (
                  <a
                    href={repo.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                  >
                    <PlayCircle size={13} />
                    {t('liveDemo')}
                  </a>
                ) : (
                  !repo.isPrivate && (
                    <span className="inline-flex items-center border border-dashed border-zinc-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-100 dark:text-zinc-400">
                      {t('comingSoon')}
                    </span>
                  )
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
