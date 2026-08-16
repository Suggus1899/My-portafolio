import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE_URL, EMAIL } from '@/config/constants';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return {
    title: `${t('title')} | Gustavo Colina`,
    description: t('intro'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`
    }
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations('Privacy');

  const sections = [
    { title: t('dataTitle'), items: [t('dataForm'), t('dataAnalytics')] },
    { title: t('thirdPartiesTitle'), items: [t('thirdParties')] },
    { title: t('rightsTitle'), items: [t('rights')] }
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {t('lastUpdated')}
        </p>
        <div className="mt-3 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
        <p className="mt-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('intro')}</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
                {section.title}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 bg-zinc-900 dark:bg-zinc-100" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
              {t('contactTitle')}
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {t('contact')}{' '}
              <a href={`mailto:${EMAIL}`} className="font-bold text-zinc-900 dark:text-zinc-100 underline">
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
