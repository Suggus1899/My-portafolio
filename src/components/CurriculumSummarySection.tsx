import { useTranslations } from 'next-intl';
import { Download, BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: BriefcaseBusiness,
    key: 'highlight1'
  },
  {
    icon: GraduationCap,
    key: 'highlight2'
  },
  {
    icon: Sparkles,
    key: 'highlight3'
  }
] as const;

export default function CurriculumSummarySection() {
  const t = useTranslations('Curriculum');

  return (
    <section id="curriculum" className="w-full py-24 px-6">
      <div className="max-w-4xl mx-auto border-2 border-zinc-900 bg-white/95 p-8 dark:border-zinc-100 dark:bg-zinc-950/95">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {t('kicker')}
        </p>
        <h2 className="text-3xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {t('title')}
        </h2>
        <div className="mt-3 h-[2px] w-44 bg-zinc-900/85 dark:bg-zinc-100/85" />
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {t('summary')}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="border-2 border-zinc-900 bg-zinc-50/70 p-4 dark:border-zinc-100 dark:bg-zinc-900/70">
                <Icon size={18} className="text-zinc-700 dark:text-zinc-300" />
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{t(item.key)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/docs/sintesis-curricular.md"
            download
            className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <Download size={16} />
            {t('download')}
          </a>
          <a
            href="mailto:gustavojose0819@gmail.com"
            className="inline-flex items-center border-2 border-zinc-900 bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            {t('contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
