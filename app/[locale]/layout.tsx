import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'NFL NBA MLB NHL Injury Report Today — Live Updates | SportsInjuryBoard',
    template: '%s | SportsInjuryBoard'
  },
  description: 'Live injury report across NFL, NBA, MLB, and NHL. Updated every 30 minutes. See who\'s out, questionable, and today\'s projected starters.',
  metadataBase: new URL('https://sports-injury-board.vercel.app'),
  openGraph: {
    siteName: 'SportsInjuryBoard',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    languages: {
      en: 'https://sports-injury-board.vercel.app/',
      ko: 'https://sports-injury-board.vercel.app/ko',
      ja: 'https://sports-injury-board.vercel.app/ja',
      zh: 'https://sports-injury-board.vercel.app/zh',
      es: 'https://sports-injury-board.vercel.app/es',
      fr: 'https://sports-injury-board.vercel.app/fr',
      de: 'https://sports-injury-board.vercel.app/de',
      pt: 'https://sports-injury-board.vercel.app/pt',
    }
  }
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
