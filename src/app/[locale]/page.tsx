import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import CurriculumSummarySection from '@/components/CurriculumSummarySection';
import ExperienceSection from '@/components/ExperienceSection';
import FavoriteStackSection from '@/components/FavoriteStackSection';
import BlogPreviewSection from '@/components/BlogPreviewSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import AvailabilitySection from '@/components/AvailabilitySection';

const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });

type AppLocale = (typeof routing.locales)[number];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      <StatsSection />
      <CurriculumSummarySection />
      <ExperienceSection />
      <EducationSection />
      <FavoriteStackSection />
      <BlogPreviewSection locale={appLocale} />
      <SkillsSection />
      <AvailabilitySection />
      <ContactSection />
    </div>
  );
}
