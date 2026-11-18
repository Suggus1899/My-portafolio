'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BookOpen, Download, Github, Instagram, Linkedin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import styles from './MagazineCover.module.css';

interface MagazineCoverProps {
  onOpen: () => void;
  onRead: () => void;
}

export default function MagazineCover({ onOpen, onRead }: MagazineCoverProps) {
  const t = useTranslations('Magazine');
  const hero = useTranslations('Hero');
  const locale = useLocale();

  return (
    <section id="curriculum" className={styles.stage} aria-label={t('cover')}>
      <div className={styles.book}>
        <div className={styles.sheet}>
          <Image
            src="/profile-photo.png"
            alt={hero('profileAlt')}
            fill
            priority
            sizes="(max-width: 500px) 90vw, 465px"
            className={styles.photo}
          />
          <div className={styles.shade} aria-hidden="true" />
          <div className={styles.coverContent}>
            <div className={styles.masthead}>
              <span>GC<span className={styles.dot}>.</span></span>
              <span>{t('issue')}<br />01 / 01</span>
            </div>
            <div className={styles.coverBottom}>
              <p className={styles.kicker}>{t('coverTopic')}</p>
              <h1 className={styles.name}>Gustavo<br />Colina</h1>
              <p className={styles.role}>{t('role')}</p>
              <div className={styles.identity}>
                <a href="https://github.com/Suggus1899" target="_blank" rel="noopener noreferrer" className={styles.username}>
                  @sugus1899 <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <nav aria-label={t('socialLinks')} className={styles.social}>
                  <a href="https://www.instagram.com/gus_gus1899/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={19} aria-hidden="true" /></a>
                  <a href="https://www.linkedin.com/in/gustavo-colina-a1b787286/" target="_blank" rel="noopener noreferrer" aria-label={t('linkedInAriaLabel')}><Linkedin size={19} aria-hidden="true" /></a>
                  <a href="https://github.com/Suggus1899" target="_blank" rel="noopener noreferrer" aria-label={hero('githubAriaLabel')}><Github size={19} aria-hidden="true" /></a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onOpen} className={styles.primary}><BookOpen size={17} aria-hidden="true" /> {t('open')}</button>
        <a href="?page=projects" className={styles.secondary}>{hero('viewProjects')} <ArrowRight size={17} aria-hidden="true" /></a>
        <a href={`/curriculum-${locale}.pdf`} download className={styles.secondary}><Download size={16} aria-hidden="true" /> {hero('downloadCv')}</a>
        <button type="button" onClick={onRead} className={styles.read}>{t('readView')}</button>
      </div>
    </section>
  );
}
