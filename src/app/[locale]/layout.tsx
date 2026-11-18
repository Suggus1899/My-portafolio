import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import ScrollToTop from '@/components/ScrollToTop';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/config/constants';
import { Analytics } from '@vercel/analytics/next';
import { MotionConfig } from 'framer-motion';

type AppLocale = (typeof routing.locales)[number];

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

const siteUrl = SITE_URL;

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  const t = await getTranslations({ locale: appLocale, namespace: 'Index' });

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${appLocale}`,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `/${item}`]))
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${appLocale}`,
      siteName: 'Gustavo Colina Portfolio',
      locale: appLocale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1254,
          height: 1254,
          alt: 'Gustavo Colina — Software Engineer'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteUrl}/og-image.png`]
    }
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground dark:bg-[#101827] dark:text-[#f5f1e8] transition-colors duration-300 selection:bg-blue-600 selection:text-white`} suppressHydrationWarning>
        <SchemaOrg siteUrl={siteUrl} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <MotionConfig reducedMotion="user">
              <ScrollProgressBar />
              <Navbar />
              <main id="main-content" className="pt-24 min-h-screen page-gradient">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </MotionConfig>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
