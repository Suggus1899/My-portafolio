'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, X } from 'lucide-react';
import type { ServiceCategory, ServiceDetail } from '@/types';
import { WHATSAPP_NUMBER, EMAIL } from '@/config/constants';

export default function ServicesSection() {
  const t = useTranslations('Services');
  const categories = useMemo(() => t.raw('categories') as ServiceCategory[], [t]);

  // Calculate initial category
  const initialCategory = useMemo(() =>
    categories.length > 0 ? categories[0].id : '',
    [categories]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedCategoryData = useMemo(
    () => categories.find((cat) => cat.id === selectedCategory),
    [categories, selectedCategory]
  );

  const selectedService = useMemo(() => {
    if (!selectedCategoryData || !selectedServiceId) return null;
    return selectedCategoryData.services.find((s) => s.id === selectedServiceId) ?? null;
  }, [selectedCategoryData, selectedServiceId]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedServiceId(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const handleWhatsApp = (service: ServiceDetail) => {
    const text = encodeURIComponent(`Hola Gustavo, me interesa el servicio: ${service.title}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const handleEmail = (service: ServiceDetail) => {
    const subject = encodeURIComponent(`Cotización: ${service.title}`);
    const body = encodeURIComponent(`Hola Gustavo,\n\nMe gustaría recibir más información sobre tu servicio: ${service.title}\n\nQuedo atento a tu respuesta.\n\nSaludos.`);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto w-full">
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-5 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
      <p className="mb-8 max-w-3xl text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-2 transition-all ${
              selectedCategory === category.id
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100'
                : 'bg-white text-zinc-900 border-zinc-900 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-100 dark:hover:bg-zinc-900'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Category Description */}
      {selectedCategoryData && (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          {selectedCategoryData.description}
        </p>
      )}

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedCategoryData?.services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => setSelectedServiceId(service.id)}
            className="text-left border-2 border-zinc-900 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-100 dark:bg-zinc-950 flex flex-col h-full"
          >
            <div className="flex flex-wrap gap-1 mb-3">
              {service.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {service.technologies.length > 3 && (
                <span className="inline-flex px-2 py-0.5 text-[10px] text-zinc-500 dark:text-zinc-500">
                  +{service.technologies.length - 3}
                </span>
              )}
            </div>
            <h3 className="font-space font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">{service.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 flex-grow">{service.idealFor}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{t('openModal')} →</p>
          </button>
        ))}
      </div>

      {selectedService && selectedCategoryData && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4"
          onClick={() => setSelectedServiceId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-2xl border-2 border-zinc-900 bg-white p-6 dark:border-zinc-100 dark:bg-zinc-950 max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="inline-flex border border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {selectedCategoryData.name}
                </span>
                <h3 className="mt-3 text-2xl font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceId(null)}
                className="inline-flex h-9 w-9 items-center justify-center border border-zinc-900 dark:border-zinc-100"
                aria-label={t('close')}
              >
                <X size={16} />
              </button>
            </div>

            {/* Ideal For */}
            <div className="mt-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{t('idealFor')}</h4>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{selectedService.idealFor}</p>
            </div>

            {/* Scope */}
            <div className="mt-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{t('scope')}</h4>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{selectedService.scope}</p>
            </div>

            {/* Technologies */}
            <div className="mt-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{t('technologies')}</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedService.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{t('deliverables')}</h4>
              <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {selectedService.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Duration and Price */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="border border-zinc-900/70 dark:border-zinc-100/70 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                {t('duration')}: {selectedService.duration}
              </div>
              {selectedService.startingPrice && (
                <div className="border border-zinc-900/70 dark:border-zinc-100/70 px-3 py-2 text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30">
                  {t('startingPrice')}: {selectedService.startingPrice}
                </div>
              )}
            </div>

            {/* Contact CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleWhatsApp(selectedService)}
                className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                <MessageCircle size={16} />
                {t('contactCTAs.whatsapp')}
              </button>
              <button
                type="button"
                onClick={() => handleEmail(selectedService)}
                className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <Mail size={16} />
                {t('contactCTAs.email')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
