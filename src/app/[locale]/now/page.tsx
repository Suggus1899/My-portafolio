import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Now' });

  return {
    title: `${t('title')} | Gustavo Colina`,
    description: t('intro')
  };
}

export default async function NowPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NowContent />;
}

function NowContent() {
  const t = useTranslations('Now');

  const cards = [
    {
      title: t('buildingTitle'),
      items: [t('building1'), t('building2'), t('building3'), t('building4')]
    },
    {
      title: t('learningTitle'),
      items: [t('learning1'), t('learning2'), t('learning3'), t('learning4')]
    },
    {
      title: t('shippingTitle'),
      items: [t('shipping1'), t('shipping2'), t('shipping3')]
    },
    {
      title: t('nextTitle'),
      items: [t('next1'), t('next2'), t('next3')]
    }
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {t('kicker')}
        </p>
        <h1 className="mt-3 text-4xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h1>
        <div className="mt-3 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('intro')}</p>
        <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('currentFocus')}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <article key={card.title} className="border-2 border-zinc-900 bg-white p-6 dark:border-zinc-100 dark:bg-zinc-950">
              <h2 className="font-space font-black uppercase text-zinc-900 dark:text-zinc-100">{card.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
