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
          width: 1200,
          height: 630,
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-zinc-100 transition-colors duration-300 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-black`} suppressHydrationWarning>
        <SchemaOrg siteUrl={siteUrl} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <ScrollProgressBar />
            <Navbar />
            <main id="main-content" className="pt-24 min-h-screen page-gradient">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
