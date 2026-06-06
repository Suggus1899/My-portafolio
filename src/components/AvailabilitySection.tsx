'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, MapPin, Clock, Briefcase } from 'lucide-react';
import { WHATSAPP_NUMBER, EMAIL } from '@/config/constants';

export default function AvailabilitySection() {
  const t = useTranslations('Availability');

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full py-16 px-6"
    >
      <div className="max-w-4xl mx-auto border-2 border-zinc-900 dark:border-zinc-100 bg-white/95 dark:bg-zinc-950/95 p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            {t('badge')}
          </span>
        </div>

        <h2 className="text-3xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h2>
        <div className="mt-3 h-[2px] w-44 bg-zinc-900/85 dark:bg-zinc-100/85" />
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t('description')}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 border border-zinc-900/30 dark:border-zinc-100/30 px-4 py-3">
            <MapPin size={16} className="text-zinc-500 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">{t('modalityLabel')}</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{t('modality')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-zinc-900/30 dark:border-zinc-100/30 px-4 py-3">
            <Briefcase size={16} className="text-zinc-500 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">{t('contractLabel')}</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{t('contract')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-zinc-900/30 dark:border-zinc-100/30 px-4 py-3">
            <Clock size={16} className="text-zinc-500 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">{t('timezoneLabel')}</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{t('timezone')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Gustavo, estoy interesado en trabajar contigo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <MessageCircle size={16} />
            {t('ctaWhatsapp')}
          </a>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('Oportunidad de trabajo remoto')}`}
            className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            <Mail size={16} />
            {t('ctaEmail')}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
