'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const t = useTranslations('Stats');

  const stats = [
    { value: 3, suffix: '+', label: t('yearsLabel') },
    { value: 15, suffix: '+', label: t('projectsLabel') },
    { value: 4, suffix: '', label: t('languagesLabel') },
    { value: 20, suffix: '+', label: t('techLabel') },
  ];

  return (
    <section className="w-full py-16 px-6 border-y-2 border-zinc-900/20 dark:border-zinc-100/20 bg-zinc-50/70 dark:bg-zinc-900/30">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center md:items-start gap-1">
            <p className="text-4xl md:text-5xl font-space font-black text-zinc-900 dark:text-zinc-100">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400 text-center md:text-left">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
