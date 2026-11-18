'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, RefAttributes, TouchEvent as ReactTouchEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, BookOpen, BookText, List, Minus, Plus, RotateCcw, X } from 'lucide-react';
import type { MagazineBookSceneHandle, MagazineBookSceneProps, MagazineBookTransform } from './MagazineBookScene';
import MagazineCover from './MagazineCover';
import { useMagazineChapters, type MagazinePage } from './MagazineChapters';
import { useMagazineProjectPages } from './MagazineProjectPages';
import styles from './MagazineReader.module.css';

type SceneComponent = ComponentType<MagazineBookSceneProps & RefAttributes<MagazineBookSceneHandle>>;
type ReaderMode = 'cover' | 'flat' | '3d';

const oldAnchors: Record<string, string> = {
  curriculum: 'cover', 'featured-projects': 'projects', experience: 'experience', education: 'education',
  'favorite-stack': 'favorite-stack', skills: 'skills', blog: 'articles', contact: 'contact', services: 'services',
};

function resolvePage(id: string | null, pages: MagazinePage[]): number {
  if (id === 'projects') return Math.max(0, pages.findIndex((page) => page.id.startsWith('project-')));
  if (id === 'articles') return Math.max(0, pages.findIndex((page) => page.id.startsWith('article-')));
  const index = pages.findIndex((page) => page.id === id);
  if (index >= 0) return index;
  const part = id?.match(/^(.*)-part-(\d+)$/);
  if (part) {
    const candidates = pages.map((page, pageIndex) => ({ pageIndex, part: Number(page.id.slice(part[1].length + 6)) }))
      .filter(({ pageIndex, part: number }) => pages[pageIndex].id.startsWith(`${part[1]}-part-`) && Number.isFinite(number));
    if (candidates.length) return candidates[Math.max(1, Math.min(Number(part[2]), candidates.length)) - 1].pageIndex;
    const beginning = pages.findIndex((page) => page.id === part[1]);
    if (beginning >= 0) return beginning;
  }
  return 0;
}

function locationPage(fallback: string): string {
  const url = new URL(window.location.href);
  let hash = url.hash.slice(1);
  try { hash = decodeURIComponent(hash); } catch { /* malformed escape: keep raw hash */ }
  return url.searchParams.get('page') || oldAnchors[hash] || fallback;
}

export default function MagazineReader({ initialPage = 'cover' }: { initialPage?: string }) {
  const t = useTranslations('Magazine');
  const locale = useLocale();
  const projectPages = useMagazineProjectPages();
  const chapters = useMagazineChapters(projectPages);
  const pageList = useMemo(() => [{ id: 'index', title: t('index'), content: null }, { id: 'index-2', title: t('index'), content: null }, ...chapters], [chapters, t]);
  const initialIndex = resolvePage(initialPage, pageList);
  const [mode, setMode] = useState<ReaderMode>(initialPage === 'cover' ? 'cover' : 'flat');
  const [Scene, setScene] = useState<SceneComponent | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<'unavailable' | 'reducedMotion' | null>(null);
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(initialIndex);
  const [targetIndex, setTargetIndex] = useState(initialIndex);
  const [turning, setTurning] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const pagesLayerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<MagazineBookSceneHandle>(null);
  const indexButtonRef = useRef<HTMLButtonElement>(null);
  const targetRef = useRef(initialIndex);
  const turningRef = useRef(false);
  const scaleRef = useRef(1);
  const swipeRef = useRef<{ x: number; y: number; multi: boolean } | null>(null);
  const loadingToken = useRef(0);
  const lastLocale = useRef(locale);

  const pageListRef = useRef(pageList);
  useEffect(() => { pageListRef.current = pageList; }, [pageList]);

  const setPageImmediately = useCallback((index: number) => {
    targetRef.current = index;
    turningRef.current = false;
    setTargetIndex(index);
    setDisplayIndex(index);
    setTurning(false);
  }, []);

  useEffect(() => {
    if (lastLocale.current === locale) return;
    lastLocale.current = locale;
    setPageImmediately(resolvePage(locationPage(initialPage), pageListRef.current));
  }, [locale, initialPage, pageList, setPageImmediately]);

  const syncUrl = useCallback((id: string, replace = false) => {
    const url = new URL(window.location.href);
    if (id === 'cover') url.searchParams.delete('page');
    else url.searchParams.set('page', id);
    url.hash = '';
    window.history[replace ? 'replaceState' : 'pushState'](null, '', url);
  }, []);

  const navigate = useCallback((index: number, writeUrl = true) => {
    const next = Math.max(0, Math.min(index, pageListRef.current.length - 1));
    if (next === targetRef.current) return;
    const previous = targetRef.current;
    targetRef.current = next;
    setTargetIndex(next);
    if (writeUrl) syncUrl(pageListRef.current[next].id);
    sceneRef.current?.resetZoom();
    if (mode === '3d' && Scene) {
      setDirection(next > previous ? 1 : -1);
      turningRef.current = true;
      setTurning(true);
    } else setPageImmediately(next);
  }, [mode, Scene, setPageImmediately, syncUrl]);

  const open3d = useCallback(async () => {
    setMenuOpen(false);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setNotice('reducedMotion');
      setMode('flat');
      return;
    }
    setNotice(null);
    if (Scene) { setMode('3d'); return; }
    const token = ++loadingToken.current;
    setLoading(true);
    try {
      const sceneModule = await import('./MagazineBookScene');
      if (token !== loadingToken.current) return;
      setScene(() => sceneModule.default);
      setMode('3d');
    } catch {
      if (token === loadingToken.current) { setNotice('unavailable'); setMode('flat'); }
    } finally {
      if (token === loadingToken.current) setLoading(false);
    }
  }, [Scene]);

  const showFlat = useCallback(() => {
    loadingToken.current += 1;
    setLoading(false);
    setPageImmediately(targetRef.current);
    setMode('flat');
    setNotice(null);
    scaleRef.current = 1;
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }, [setPageImmediately]);

  const showCover = useCallback(() => {
    loadingToken.current += 1;
    setLoading(false);
    setPageImmediately(0);
    setMenuOpen(false);
    setMode('cover');
    setNotice(null);
    syncUrl('cover');
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }, [setPageImmediately, syncUrl]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const id = locationPage(initialPage);
    // Deep links open the light flat view; three.js only loads when the reader asks for the book.
    if (id !== 'cover') {
      setPageImmediately(resolvePage(id, pageListRef.current));
      setMode('flat');
    }
  }, [initialPage, setPageImmediately]);

  useEffect(() => {
    const onLocationChange = () => {
      const id = locationPage(initialPage);
      if (id === 'cover') {
        loadingToken.current += 1;
        setLoading(false);
        setMenuOpen(false);
        setMode('cover');
        setPageImmediately(0);
        return;
      }
      setPageImmediately(resolvePage(id, pageListRef.current));
      sceneRef.current?.resetZoom();
      if (mode === 'cover') setMode('flat');
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => { window.removeEventListener('popstate', onLocationChange); window.removeEventListener('hashchange', onLocationChange); };
  }, [initialPage, mode, setPageImmediately]);

  const focusReader = useRef(false);
  const readerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (mode === 'cover' || !focusReader.current) return;
    focusReader.current = false;
    readerRef.current?.focus({ preventScroll: true });
  }, [mode]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || mode !== '3d') return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const unit = Math.min(width / (window.matchMedia('(max-width: 767px)').matches ? 2.85 : 5.32), height / 3.7);
      stage.style.setProperty('--magazine-unit', `${unit}px`);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [mode]);

  const onTransform = useCallback(({ scale, x, y }: MagazineBookTransform) => {
    scaleRef.current = scale;
    if (pagesLayerRef.current) pagesLayerRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }, []);
  const onTurnComplete = useCallback(() => {
    if (turningRef.current) setPageImmediately(targetRef.current);
  }, [setPageImmediately]);
  const onUnavailable = useCallback(() => {
    setPageImmediately(targetRef.current);
    setScene(null);
    setMode('flat');
    setNotice('unavailable');
  }, [setPageImmediately]);

  const move = useCallback((delta: number) => {
    if (!turningRef.current) navigate(targetRef.current + delta * (mobile ? 1 : 2));
  }, [mobile, navigate]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"], [role="dialog"], [role="listbox"]')) return;
    if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); indexButtonRef.current?.focus(); return; }
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    else if (mode === '3d' && (event.key === '+' || event.key === '=')) { event.preventDefault(); sceneRef.current?.zoomIn(); }
    else if (mode === '3d' && event.key === '-') { event.preventDefault(); sceneRef.current?.zoomOut(); }
  };

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a,button,input,textarea,select,[role="dialog"]')) return;
    if (event.touches.length !== 1) { if (swipeRef.current) swipeRef.current.multi = true; return; }
    swipeRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, multi: false };
  };
  const onTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    if (!start || start.multi || event.touches.length || scaleRef.current > 1.01) { swipeRef.current = null; return; }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
    swipeRef.current = null;
  };

  const indexItems = [
    ['profile', t('profile')], ['experience', t('experience')], ['education', t('education')],
    ['skills', t('skills')], ['projects', t('projects')], ['articles', t('articles')],
    ['services', t('services')], ['now', t('now')], ['contact', t('contact')], ['privacy', t('privacy')],
  ];
  const selectPage = (id: string) => {
    setMenuOpen(false);
    navigate(resolvePage(id, pageListRef.current));
  };
  const renderPage = (index: number) => {
    const page = pageList[index];
    if (!page) return null;
    if (page.id === 'index' || page.id === 'index-2') return <article className={styles.indexPage}><p className="magazine-page-kicker">{t('issue')} / 01</p><h2>{t('index')}</h2><ol>{indexItems.slice(page.id === 'index' ? 0 : 5, page.id === 'index' ? 5 : 10).map(([id, label]) => <li key={id}><button type="button" onClick={() => selectPage(id)}><span>{label}</span><span>{resolvePage(id, pageList) + 1}</span></button></li>)}</ol></article>;
    return page.content;
  };

  if (mode === 'cover') return <MagazineCover onOpen={() => { focusReader.current = true; syncUrl('index'); setMode('flat'); requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' })); void open3d(); }} onRead={() => { focusReader.current = true; syncUrl('index'); showFlat(); }} />;

  const pageSize = mobile ? 1 : 2;
  const maxIndex = pageList.length - 1;
  return (
    <section ref={readerRef} tabIndex={-1} className={styles.reader} aria-label={t('issue')} onKeyDown={onKeyDown}>
      <div className={styles.toolbar}>
        <button type="button" onClick={showCover} aria-label={t('backToCover')}><X size={17} aria-hidden="true" /><span>{t('cover')}</span></button>
        <div className={styles.indexWrap}>
          <button ref={indexButtonRef} type="button" aria-expanded={menuOpen} aria-controls="magazine-index" onClick={() => setMenuOpen(!menuOpen)}><List size={17} aria-hidden="true" /><span>{t('index')}</span></button>
          {menuOpen && <nav id="magazine-index" aria-label={t('index')} className={styles.indexMenu}>
            {indexItems.map(([id, label]) => <button type="button" key={id} onClick={() => selectPage(id)}>{label}<span>{resolvePage(id, pageList) + 1}</span></button>)}
            <strong>{t('projects')}</strong>{pageList.filter((page) => page.id.startsWith('project-') && !page.id.endsWith('-details') && !page.id.endsWith('-figure')).map((page) => <button type="button" key={page.id} onClick={() => selectPage(page.id)}>{page.title}<span>{resolvePage(page.id, pageList) + 1}</span></button>)}
            <strong>{t('articles')}</strong>{pageList.filter((page) => page.id.startsWith('article-') && !page.id.endsWith('-figure') && !/-part-\d+$/.test(page.id)).map((page) => <button type="button" key={page.id} onClick={() => selectPage(page.id)}>{page.title}<span>{resolvePage(page.id, pageList) + 1}</span></button>)}
          </nav>}
        </div>
        <p className={styles.pageCount} aria-live="polite">{t('pageOf', { current: displayIndex + 1, total: pageList.length })}</p>
        {mode === '3d' && <div className={styles.zoomControls}>
          <button type="button" onClick={() => sceneRef.current?.zoomOut()} aria-label={t('zoomOut')}><Minus size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => sceneRef.current?.zoomIn()} aria-label={t('zoomIn')}><Plus size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => sceneRef.current?.resetZoom()} aria-label={t('resetZoom')}><RotateCcw size={16} aria-hidden="true" /></button>
        </div>}
        <button type="button" onClick={mode === '3d' ? showFlat : () => void open3d()} disabled={loading}>{mode === '3d' ? <BookText size={17} aria-hidden="true" /> : <BookOpen size={17} aria-hidden="true" />}<span>{loading ? t('loading') : mode === '3d' ? t('readView') : t('bookView')}</span></button>
      </div>
      {notice && <p role="status" className={styles.notice}>{t(notice)}</p>}
      <div className={styles.navigationRow}>
        <button type="button" className={styles.arrow} onClick={() => move(-1)} aria-disabled={targetIndex <= 0 || turning} aria-label={t('previous')}><ArrowLeft aria-hidden="true" /></button>
        {mode === '3d' && Scene ? <div ref={stageRef} className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <Scene ref={sceneRef} page={targetIndex} opened interactionRef={stageRef} onUnavailable={onUnavailable} onTransformChange={onTransform} onTurnComplete={onTurnComplete} />
          <div ref={pagesLayerRef} className={styles.pagesLayer}>
            {!mobile && <div className={`${styles.sheet} ${styles.leftSheet} ${turning && direction < 0 ? styles.turnBack : ''}`}><div className={styles.sheetContent}>{renderPage(displayIndex)}</div><span className={styles.folio}>{String(displayIndex + 1).padStart(2, '0')}</span></div>}
            <div className={`${styles.sheet} ${styles.rightSheet} ${turning && direction > 0 ? styles.turnForward : ''} ${mobile && turning && direction < 0 ? styles.turnBack : ''}`}><div className={styles.sheetContent}>{renderPage(displayIndex + (mobile ? 0 : 1))}</div>{pageList[displayIndex + (mobile ? 0 : 1)] && <span className={styles.folio}>{String(displayIndex + (mobile ? 1 : 2)).padStart(2, '0')}</span>}</div>
          </div>
        </div> : <div className={styles.flatPages} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{Array.from({ length: pageSize }, (_, part) => pageList[displayIndex + part] && <div className={styles.flatSheet} key={pageList[displayIndex + part].id}><div className={styles.flatContent}>{renderPage(displayIndex + part)}</div><span className={styles.flatFolio}>{String(displayIndex + part + 1).padStart(2, '0')}</span></div>)}</div>}
        <button type="button" className={styles.arrow} onClick={() => { if (targetIndex + pageSize <= maxIndex) move(1); }} aria-disabled={targetIndex + pageSize > maxIndex || turning} aria-label={t('next')}><ArrowRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}
