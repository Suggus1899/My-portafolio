'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Mail, Github, FileText } from 'lucide-react';

const PROFILE_IMAGE_PATH = '/profile-photo.png';
const PROFILE_IMAGE_FALLBACK = '/profile-photo-placeholder.svg';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const [imageSrc, setImageSrc] = useState(PROFILE_IMAGE_PATH);

  return (
    <section className="relative isolate overflow-hidden px-6 py-20 min-h-[72vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <div className="grid items-start gap-10 md:grid-cols-[250px,1fr]">
          <aside className="mx-auto w-full max-w-[250px]">
            <div className="border-2 border-zinc-900 bg-white p-2 dark:border-zinc-100 dark:bg-zinc-950">
              <div className="relative aspect-square overflow-hidden border-2 border-zinc-900 dark:border-zinc-100">
                <Image
                  src={imageSrc}
                  alt="Foto de Gustavo Colina"
                  fill
                  priority
                  sizes="(max-width: 768px) 250px, 250px"
                  className="object-cover"
                  onError={() => {
                    if (imageSrc !== PROFILE_IMAGE_FALLBACK) {
                      setImageSrc(PROFILE_IMAGE_FALLBACK);
                    }
                  }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <a
                href="mailto:gustavojose0819@gmail.com"
                aria-label={t('contact')}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-zinc-900 bg-white text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://github.com/Suggus1899"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('github')}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-zinc-900 bg-white text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <Github size={16} />
              </a>
              <a
                href="/docs/sintesis-curricular.md"
                download
                aria-label={t('downloadCv')}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-zinc-900 bg-white text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <FileText size={16} />
              </a>
            </div>
          </aside>

          <div className="text-center md:text-left">
            <span className="inline-block border border-zinc-900 bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-200">
              {t('availability')}
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-space font-black uppercase tracking-tight leading-[0.95] text-zinc-900 dark:text-zinc-100">
              {t('greeting')}
            </h1>

            <div className="mt-4 h-[2px] w-full bg-zinc-900/85 dark:bg-zinc-100/85" />
            <p className="mt-4 max-w-3xl text-lg md:text-2xl font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              {t('role')}
            </p>

            <div className="mt-7 max-w-3xl border-2 border-zinc-900 bg-white/95 p-6 dark:border-zinc-100 dark:bg-zinc-950/95">
              <h2 className="text-3xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
                {t('whatIDo')}
              </h2>
              <div className="mt-3 h-[2px] w-56 bg-zinc-900/85 dark:bg-zinc-100/85" />
              <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                {t('role')}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="mailto:gustavojose0819@gmail.com"
                className="inline-flex items-center justify-center border-2 border-zinc-900 bg-zinc-900 px-8 py-3 text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {t('contact')}
              </a>
              <a
                href="/docs/sintesis-curricular.md"
                download
                className="inline-flex items-center justify-center border-2 border-zinc-900 bg-white px-8 py-3 text-base font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                {t('downloadCv')}
              </a>
              <a
                href="https://github.com/Suggus1899"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-zinc-900 bg-white px-8 py-3 text-base font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                {t('github')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
