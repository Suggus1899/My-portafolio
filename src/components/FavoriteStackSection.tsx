import { useTranslations } from 'next-intl';

const stackItems = [
  {
    name: 'TypeScript + Node.js',
    detailKey: 'item1'
  },
  {
    name: 'Next.js + Tailwind CSS',
    detailKey: 'item2'
  },
  {
    name: 'PostgreSQL + MongoDB',
    detailKey: 'item3'
  },
  {
    name: 'AWS + Vercel',
    detailKey: 'item4'
  },
  {
    name: 'Java + Spring Boot',
    detailKey: 'item5'
  },
  {
    name: 'Spring Security + Hibernate/JPA',
    detailKey: 'item6'
  }
] as const;

export default function FavoriteStackSection() {
  const t = useTranslations('FavoriteStack');

  return (
    <section id="favorite-stack" className="py-24 px-6 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-5 h-[2px] w-44 bg-zinc-900/85 dark:bg-zinc-100/85" />
      <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10">{t('subtitle')}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {stackItems.map((item) => (
          <article
            key={item.name}
            className="border-2 border-zinc-900 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-100 dark:bg-zinc-950"
          >
            <h3 className="font-space font-black uppercase text-zinc-900 dark:text-zinc-100">{item.name}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{t(item.detailKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
