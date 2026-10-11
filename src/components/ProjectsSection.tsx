"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/types";
import repos from "../repos.json";

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const [activeFilter, setActiveFilter] = useState("All");
  const projects = repos.map((repo) => ({
    ...repo,
    ...t.raw(`items.${repo.id}`),
  })) as Project[];
  const filters = ["All", ...new Set(projects.flatMap((project) => project.languages))];
  const displayedProjects = projects.filter(
    (project) => activeFilter === "All" || project.languages.includes(activeFilter),
  );

  return (
    <motion.section
      id="projects"
      className="py-24 px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">
        {t("title")}
      </h2>
      <div className="mb-10 h-[2px] w-36 bg-zinc-900/85 dark:bg-zinc-100/85" />
      <p className="mb-8 max-w-3xl text-zinc-600 dark:text-zinc-400">{t("description")}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-2 transition-colors ${
              activeFilter === filter
                ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                : "bg-transparent text-zinc-900 border-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:border-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            {filter === "All" ? t("filterAll") : filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedProjects.map((project) => (
          <article
            key={project.id}
            className={`group p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
              project.isPrivate
                ? "bg-zinc-50/90 border-zinc-900 dark:bg-zinc-900/50 dark:border-zinc-100 border-dashed"
                : "bg-white/95 border-zinc-900 hover:shadow-lg dark:bg-zinc-950/95 dark:border-zinc-100"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-space font-black uppercase text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                {project.name}
                {project.isPrivate && (
                  <span className="text-[10px] px-2 py-0.5 border border-zinc-900 dark:border-zinc-100 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase tracking-wider font-bold">
                    {t("private")}
                  </span>
                )}
              </h3>
              {project.url && (
                <ArrowUpRight
                  className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                  size={20}
                />
              )}
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 line-clamp-3">
              {project.description}
            </p>

            <ul className="mb-5 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              {project.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 bg-zinc-900 dark:bg-zinc-100" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-zinc-900/40 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-600 dark:border-zinc-100/40 dark:text-zinc-400"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {project.languages.join(" · ")}
              </span>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-zinc-900 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  <Github size={13} />
                  {t("viewCode")}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
