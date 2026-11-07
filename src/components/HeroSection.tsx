'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, RotateCcw } from 'lucide-react';
import type { MagazineCoverSceneProps } from './MagazineCoverScene';

type MagazineScene = ComponentType<MagazineCoverSceneProps>;

export default function HeroSection() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const coverRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const [Scene, setScene] = useState<MagazineScene | null>(null);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [fallback, setFallback] = useState<'reduced' | 'unavailable' | null>(null);

  const onComplete = useCallback(() => setOpened(true), []);
  const onFallback = useCallback(() => {
    setScene(null);
    setFallback('unavailable');
    setLoading(false);
  }, []);

  useEffect(() => {
    const cover = coverRef.current;
    if (!cover) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
      if (!entry.isIntersecting) {
        setScene(null);
        setOpened(false);
      }
    });
    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  const openMagazine = async () => {
    isVisible.current = true;
    if (Scene) {
      setFallback(null);
      setOpened(false);
      setReplayKey((key) => key + 1);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFallback('reduced');
      return;
    }
    setFallback(null);
    setLoading(true);
    try {
      const sceneModule = await import('./MagazineCoverScene');
      if (isVisible.current) setScene(() => sceneModule.default);
    } catch {
      setFallback('unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="curriculum" className="editorial-hero w-full px-5 pb-10 pt-7 sm:px-8 sm:pb-14 md:px-10 md:pb-20 md:pt-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-9 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-20">
        <div className="hero-copy order-1 max-w-2xl">
          <p className="editorial-kicker">{t('availability')}</p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.44, ease: 'easeOut' }}
            className="mt-4 font-space text-[clamp(2.6rem,9vw,5.9rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-zinc-900 dark:text-zinc-100"
          >
            Gustavo<br />Colina
          </motion.h1>
          <div aria-hidden="true" className="hero-rule mt-5 h-1 w-full origin-left bg-blue-600" />
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.08, ease: 'easeOut' }}
            className="mt-5 text-base font-extrabold uppercase leading-snug tracking-[0.06em] text-zinc-900 dark:text-zinc-100 sm:text-xl"
          >
            {t('role')}
          </motion.p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
            {t('whatIDoDescription')}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <a href="#featured-projects" className="editorial-button editorial-button--primary">
              {t('viewProjects')} <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a href={`/curriculum-${locale}.pdf`} download className="editorial-button editorial-button--secondary">
              {t('downloadCv')} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="order-2 mx-auto w-full max-w-[420px] md:justify-self-end">
          <div ref={coverRef} className="magazine-stage" role="img" aria-label={t('magazineAlt')}>
              {!Scene && (
                <div className="magazine-book" aria-hidden="true">
                  <div className="magazine-book__pages" />
                  <div className="magazine-book__spine" />
                  <div className="magazine-book__cover">
                    <span className="magazine-book__monogram">GC</span>
                    <span className="magazine-book__line magazine-book__line--blue" />
                    <span className="magazine-book__line" />
                    <span className="magazine-book__line magazine-book__line--short" />
                    <span className="magazine-book__art" />
                  </div>
                </div>
              )}
              {Scene && <Scene key={replayKey} replayKey={replayKey} onComplete={onComplete} onFallback={onFallback} />}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-zinc-500 dark:text-zinc-400">{t('magazineCaption')}</p>
            <button type="button" onClick={openMagazine} disabled={loading} className="editorial-button editorial-button--small">
              {loading ? t('loadingMagazine') : opened ? <>{t('replayMagazine')} <RotateCcw size={14} aria-hidden="true" /></> : t('openMagazine')}
            </button>
          </div>
          {fallback && (
            <p role="status" className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {fallback === 'reduced' ? t('reducedMotionMagazine') : t('unavailableMagazine')}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
