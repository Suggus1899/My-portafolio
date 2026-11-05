"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types";
import repos from "../repos.json";

const FEATURED_PROJECT_IDS = ["visitors", "trickreport", "chiguire"];

export default function FeaturedProjectsSection() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const projects = FEATURED_PROJECT_IDS.flatMap((id) => {
    const repo = repos.find((project) => project.id === id);
    return repo ? [{ ...repo, ...t.raw(`items.${id}`) } as Project] : [];
  });

  return (
    <motion.section
      id="featured-projects"
      className="w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-space font-black uppercase leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("featuredTitle")}
          </h2>
          <div className="mt-3 h-[2px] w-36 bg-zinc-900/85 dark:bg-zinc-100/85" />
          <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400">
            {t("featuredDescription")}
          </p>
        </div>
        <a
          href={`/${locale}/projects`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 border-2 border-zinc-900 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-100 sm:w-auto"
        >
          {t("viewAll")}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => {
          const isLead = project.id === "visitors";

          return (
            <article
              key={project.id}
              className={`border-2 border-zinc-900 bg-white/95 p-5 dark:border-zinc-100 dark:bg-zinc-950/95 sm:p-6 ${
                isLead ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-8" : ""
              }`}
            >
              <div className="flex flex-col items-start">
                <h3 className="font-space text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-zinc-900/40 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-600 dark:border-zinc-100/40 dark:text-zinc-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex w-full flex-wrap gap-2">
                  {isLead && (
                    <a
                      href={`/${locale}/blog/caso-de-estudio-logmaster`}
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-100"
                    >
                      {t("caseStudy")}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("viewCode")}: ${project.name}`}
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 border-2 border-zinc-900 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-100"
                    >
                      <Github size={14} aria-hidden="true" />
                      {t("viewCode")}
                    </a>
                  )}
                </div>
              </div>

              {isLead && (
                <ul className="mt-5 space-y-2 border-t border-zinc-900/20 pt-5 text-sm leading-relaxed text-zinc-600 dark:border-zinc-100/20 dark:text-zinc-400 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-zinc-900 dark:bg-zinc-100" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
