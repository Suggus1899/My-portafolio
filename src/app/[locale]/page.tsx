import { setRequestLocale } from 'next-intl/server';
import MagazineReader from '@/components/MagazineReader';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MagazineReader />;
}
