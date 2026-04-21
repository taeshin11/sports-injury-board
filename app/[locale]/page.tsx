import { getTranslations } from 'next-intl/server';
import { getInjuriesBySport, allInjuries, allSports } from '@/lib/data';
import InjuryTable from '@/components/InjuryTable';
import SportTabs from '@/components/SportTabs';
import PlayerCard from '@/components/PlayerCard';
import { Activity, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'NFL NBA MLB NHL Injury Report Today — Live Updates | SportsInjuryBoard',
    description: 'Live injury report across NFL, NBA, MLB, and NHL. Updated every 30 minutes. See who\'s out, questionable, and today\'s projected starters.',
    other: {
      'schema:WebSite': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SportsInjuryBoard',
        url: 'https://sports-injury-board.vercel.app',
        description: 'Multi-sport injury reports and player status tracking',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://sports-injury-board.vercel.app/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('hero');
  const tCommon = await getTranslations('common');

  const injuredPlayers = allInjuries.filter(p => p.status !== 'Healthy');
  const outCount = allInjuries.filter(p => p.status === 'Out').length;
  const questionableCount = allInjuries.filter(p => p.status === 'Questionable').length;
  const highImpact = allInjuries.filter(p => p.fantasyImpact === 'High' && p.status !== 'Healthy').length;
  const healthyCount = allInjuries.filter(p => p.status === 'Healthy').length;

  const lastUpdated = new Date('2025-01-13T10:00:00Z').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I find NFL injury reports?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SportsInjuryBoard provides up-to-date NFL injury reports including player status (Out, Questionable, Probable) and fantasy impact ratings.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often is the injury data updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Injury data is refreshed every 30 minutes during the active season across NFL, NBA, MLB, and NHL.'
        }
      },
      {
        '@type': 'Question',
        name: 'What does High Fantasy Impact mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'High Fantasy Impact means the player is a top-24 starter at their position and their injury significantly affects fantasy lineups.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1c0010] to-[#3d0020] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300 text-sm font-medium uppercase tracking-wide">Live Updates</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {t('title')}
          </h1>
          <p className="text-rose-200 text-lg mb-6 max-w-2xl">{t('subtitle')}</p>
          <p className="text-rose-300 text-xs">{t('lastUpdated')}: {lastUpdated}</p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-xs text-rose-300 uppercase tracking-wide">Out</span>
              </div>
              <p className="text-2xl font-bold">{outCount}</p>
              <p className="text-xs text-rose-300">players out</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-rose-300 uppercase tracking-wide">Questionable</span>
              </div>
              <p className="text-2xl font-bold">{questionableCount}</p>
              <p className="text-xs text-rose-300">game-time decisions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-rose-400" />
                <span className="text-xs text-rose-300 uppercase tracking-wide">High Impact</span>
              </div>
              <p className="text-2xl font-bold">{highImpact}</p>
              <p className="text-xs text-rose-300">fantasy-critical</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-rose-300 uppercase tracking-wide">Healthy</span>
              </div>
              <p className="text-2xl font-bold">{healthyCount}</p>
              <p className="text-xs text-rose-300">cleared to play</p>
            </div>
          </div>
        </div>
      </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />

      {/* Sport tabs */}
      <SportTabs activeSport="all" locale={locale} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* High impact alerts */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#1c0010] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#be123c] animate-pulse inline-block"></span>
            High Fantasy Impact Injuries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allInjuries
              .filter(p => p.fantasyImpact === 'High' && p.status !== 'Healthy')
              .slice(0, 6)
              .map(player => (
                <PlayerCard key={player.id} player={player} locale={locale} />
              ))}
          </div>
        </div>

        {/* Full table by sport */}
        {(['NFL', 'NBA', 'MLB', 'NHL'] as const).map(sport => {
          const players = getInjuriesBySport(sport);
          return (
            <div key={sport} className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#1c0010] flex items-center gap-2">
                  <span className="text-2xl">
                    {sport === 'NFL' ? '🏈' : sport === 'NBA' ? '🏀' : sport === 'MLB' ? '⚾' : '🏒'}
                  </span>
                  {sport} Injury Report
                </h2>
                <a
                  href={`/${locale === 'en' ? '' : locale + '/'}${sport.toLowerCase()}`}
                  className="text-sm text-[#be123c] hover:underline font-medium"
                >
                  {tCommon('viewAll')} →
                </a>
              </div>
              <InjuryTable players={players.slice(0, 8)} locale={locale} sport={sport} />
            </div>
          );
        })}
      </div>
    </>
  );
}
