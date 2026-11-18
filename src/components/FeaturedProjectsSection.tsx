'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/types';
import repos from '../repos.json';
import ProjectFigure from './ProjectFigure';

const FEATURED_PROJECT_IDS = ['visitors', 'trickreport', 'chiguire'];

export default function FeaturedProjectsSection() {
  const t = useTranslations('Projects');
  const locale = useLocale();
  const projects = FEATURED_PROJECT_IDS.flatMap((id) => {
    const repo = repos.find((project) => project.id === id);
    return repo ? [{ ...repo, ...t.raw(`items.${id}`) } as Project] : [];
  });

  return (
    <section id="featured-projects" className="editorial-section mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-20">
      <header className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-zinc-900/15 pb-6 dark:border-zinc-100/20 sm:mb-10 sm:flex-row sm:items-end">
        <div>
          <p className="editorial-kicker">01 / {t('caseStudy')}</p>
          <h2 className="mt-3 font-space text-3xl font-black uppercase leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {t('featuredTitle')}
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-400">{t('featuredDescription')}</p>
        </div>
        <a href={`/${locale}/projects`} className="editorial-button editorial-button--secondary w-full sm:w-auto">
          {t('viewAll')} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => {
          const lead = project.id === 'visitors';
          return (
            <article key={project.id} className={`editorial-project-card${lead ? ' editorial-project-card--lead md:col-span-2' : ''}`}>
              {project.imageSrc && (
                <ProjectFigure
                  src={project.imageSrc}
                  alt={t(`items.${project.id}.imageAlt`)}
                  caption={t('diagramCaption')}
                  featured={lead}
                />
              )}
              <div className="p-5 sm:p-6">
                <p className="editorial-kicker">{t('caseStudy')}</p>
                <h3 className="mt-2 font-space text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 sm:text-2xl">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="editorial-tag">{technology}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.caseStudySlug && (
                    <a href={`/${locale}/blog/${project.caseStudySlug}`} className="editorial-button editorial-button--primary editorial-button--small">
                      {t('caseStudy')} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('viewCode')}: ${project.name}`} className="editorial-button editorial-button--secondary editorial-button--small">
                      <Github size={14} aria-hidden="true" /> {t('viewCode')}
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
