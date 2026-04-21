import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: {
    default: 'NFL NBA MLB NHL Injury Report & Status | SportsInjuryBoard',
    template: '%s | SportsInjuryBoard'
  },
  description: 'Real-time player injury reports for NFL, NBA, MLB, and NHL. Check injury status, expected return dates, and fantasy sports impact.',
  keywords: ['NFL injuries', 'NBA injuries', 'MLB injuries', 'NHL injuries', 'player injury report', 'fantasy sports injuries', 'injury tracker', 'sports injury status'],
  metadataBase: new URL('https://sports-injury-board.vercel.app'),
  openGraph: {
    siteName: 'SportsInjuryBoard',
    type: 'website',
    title: 'NFL NBA MLB NHL Injury Report & Status | SportsInjuryBoard',
    description: 'Real-time player injury reports for NFL, NBA, MLB, and NHL. Check injury status, expected return dates, and fantasy sports impact.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SportsInjuryBoard — NFL NBA MLB NHL Injury Reports' }],
    url: 'https://sports-injury-board.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NFL NBA MLB NHL Injury Report & Status | SportsInjuryBoard',
    description: 'Real-time player injury reports for NFL, NBA, MLB, and NHL. Check injury status, expected return dates, and fantasy sports impact.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sports-injury-board.vercel.app',
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
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
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
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="SportsInjuryBoard" />
      <Footer />
    </NextIntlClientProvider>
  );
}
