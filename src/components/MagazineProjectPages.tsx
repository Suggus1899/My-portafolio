'use client';

import { useMemo, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Github } from 'lucide-react';
import { getBlogPostsForLocale, type AppLocale } from '@/data/blogPosts';
import { routing } from '@/i18n/routing';
import repos from '@/repos.json';
import type { Project } from '@/types';
import ProjectFigure from './ProjectFigure';

export type MagazineProjectPage = {
  id: string;
  title: string;
  content: ReactNode;
};

function PageHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="mb-5 border-b border-current/20 pb-4">
      <p className="editorial-kicker">{kicker}</p>
      <h2 className="mt-3 font-space text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
        {title}
      </h2>
    </header>
  );
}

function ExternalCodeLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="editorial-button editorial-button--secondary editorial-button--small">
      <Github size={15} aria-hidden="true" /> {label} <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export function useMagazineProjectPages(): MagazineProjectPage[] {
  const locale = useLocale();
  const tProjects = useTranslations('Projects');
  const tBlog = useTranslations('Blog');
  const appLocale = routing.locales.includes(locale as AppLocale) ? locale as AppLocale : routing.defaultLocale;
  return useMemo(() => {
    const projects = repos.map((repo) => ({ ...repo, ...tProjects.raw(`items.${repo.id}`) })) as Project[];
    const pages: MagazineProjectPage[] = [];

    for (const project of projects) {
      const caseHref = project.caseStudySlug ? `/${appLocale}/blog/${project.caseStudySlug}` : undefined;
      pages.push({
        id: `project-${project.id}`,
        title: project.name,
        content: (
          <article className="magazine-project-page">
            <PageHeading kicker={tProjects('title')} title={project.name} />
            {project.isPrivate && <p className="editorial-tag mb-4 inline-block">{tProjects('private')}</p>}
            <p className="text-base leading-relaxed">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {caseHref && <a href={caseHref} className="editorial-button editorial-button--primary editorial-button--small">{tProjects('caseStudy')} <ArrowUpRight size={14} aria-hidden="true" /></a>}
              {project.url && <ExternalCodeLink href={project.url} label={tProjects('viewCode')} />}
            </div>
          </article>
        ),
      });

      pages.push({
        id: `project-${project.id}-details`,
        title: project.name,
        content: (
          <article className="magazine-project-page">
            <PageHeading kicker={tProjects('title')} title={project.name} />
            <ul className="space-y-3 text-sm leading-relaxed sm:text-base">
              {project.highlights.map((point) => <li key={point} className="border-l-2 border-blue-600 pl-3">{point}</li>)}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => <li key={technology} className="editorial-tag">{technology}</li>)}
            </ul>
            <p className="mt-4 text-xs font-mono">{project.languages.join(' · ')}</p>
          </article>
        ),
      });

      if (project.imageSrc) {
        pages.push({
          id: `project-${project.id}-figure`,
          title: project.name,
          content: (
            <article className="magazine-project-page">
              <PageHeading kicker={tProjects('caseStudy')} title={project.name} />
              <ProjectFigure src={project.imageSrc} alt={tProjects(`items.${project.id}.imageAlt`)} caption={tProjects('diagramCaption')} featured={project.id === 'visitors'} />
            </article>
          ),
        });
      }
    }

    for (const post of getBlogPostsForLocale(appLocale)) {
      const project = post.caseStudy ? projects.find((item) => item.id === post.caseStudy?.projectId) : undefined;
      const articleHref = `/${appLocale}/blog/${post.slug}`;
      pages.push({
        id: `article-${post.slug}`,
        title: post.title,
        content: (
          <article className="magazine-article-page">
            <PageHeading kicker={post.caseStudy ? tProjects('caseStudy') : tBlog('title')} title={post.title} />
            <p className="text-base leading-relaxed">{post.excerpt}</p>
            <p className="mt-4 text-xs"><time dateTime={post.date}>{post.date}</time><span aria-hidden="true"> · </span>{post.readTime}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{post.tags.map((tag) => <li key={tag} className="editorial-tag">{tag}</li>)}</ul>
            <a href={articleHref} className="editorial-button editorial-button--secondary editorial-button--small mt-5">{tBlog('readMore')} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </article>
        ),
      });

      if (project?.imageSrc) {
        pages.push({
          id: `article-${post.slug}-figure`,
          title: post.title,
          content: (
            <article className="magazine-article-page">
              <PageHeading kicker={tProjects('caseStudy')} title={project.name} />
              <ProjectFigure src={project.imageSrc} alt={tProjects(`items.${project.id}.imageAlt`)} caption={tProjects('diagramCaption')} featured={project.id === 'visitors'} />
            </article>
          ),
        });
      }

      const sections = post.caseStudy?.sections.map((section) => ({ heading: section.heading, body: section.body }))
        ?? post.content.map((body) => ({ heading: '', body }));
      sections.forEach((section, index) => {
        const last = index === sections.length - 1;
        pages.push({
          id: `article-${post.slug}-part-${index + 1}`,
          title: section.heading ? `${post.title} · ${section.heading}` : post.title,
          content: (
            <article className="magazine-article-page">
              <PageHeading kicker={post.caseStudy ? tProjects('caseStudy') : tBlog('title')} title={post.title} />
              {section.heading && <h3 className="mb-3 font-space text-xl font-bold">{section.heading}</h3>}
              <p className="text-base leading-relaxed">{section.body}</p>
              {last && project?.url && <div className="mt-6"><ExternalCodeLink href={project.url} label={tProjects('viewCode')} /></div>}
            </article>
          ),
        });
      });
    }

    return pages;
  }, [appLocale, tBlog, tProjects]);
}
