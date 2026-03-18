'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h2>
        <div className="mb-6 h-[2px] w-36 bg-zinc-900/85 dark:bg-zinc-100/85" />
        <p className="mb-10 max-w-2xl text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>

        <div className="border-2 border-zinc-900 dark:border-zinc-100 bg-white/95 dark:bg-zinc-950/95 p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle size={48} className="text-emerald-500" />
              <p className="text-xl font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
                {t('successTitle')}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">{t('successMessage')}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 border-2 border-zinc-900 px-6 py-2 text-sm font-bold uppercase tracking-wide hover:bg-zinc-100 dark:border-zinc-100 dark:hover:bg-zinc-900"
              >
                {t('sendAnother')}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="from_name" className="block text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300 mb-2">
                    {t('nameLabel')}
                  </label>
                  <input
                    id="from_name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('namePlaceholder')}
                    className="w-full border-2 border-zinc-900 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:ring-zinc-100"
                  />
                </div>
                <div>
                  <label htmlFor="reply_to" className="block text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300 mb-2">
                    {t('emailLabel')}
                  </label>
                  <input
                    id="reply_to"
                    name="email"
                    type="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    className="w-full border-2 border-zinc-900 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:ring-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300 mb-2">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  className="w-full border-2 border-zinc-900 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:ring-zinc-100"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{t('errorMessage')}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> {t('sending')}</>
                ) : (
                  <><Send size={16} /> {t('submit')}</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
