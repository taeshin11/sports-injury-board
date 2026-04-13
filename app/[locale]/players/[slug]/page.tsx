import { getTranslations } from 'next-intl/server';
import { allInjuries, getPlayerBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';
import FantasyImpactBadge from '@/components/FantasyImpactBadge';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Activity } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateStaticParams() {
  return allInjuries.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return { title: 'Player Not Found' };

  return {
    title: `${player.playerName} Injury Status — ${player.sport} | SportsInjuryBoard`,
    description: `${player.playerName} is currently ${player.status}${player.injury ? ` with ${player.injury}` : ''}. Fantasy impact: ${player.fantasyImpact}. ${player.returnDate ? `Expected return: ${player.returnDate}.` : ''}`,
    openGraph: {
      title: `${player.playerName} — ${player.status} | SportsInjuryBoard`,
      description: `${player.sport} injury status for ${player.playerName} (${player.team})`,
    }
  };
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) notFound();

  const t = await getTranslations('player');
  const basePath = locale === 'en' ? '' : `/${locale}`;

  // Similar players (same position, same sport)
  const similar = allInjuries
    .filter(p => p.position === player.position && p.sport === player.sport && p.slug !== player.slug)
    .slice(0, 3);

  const SPORT_COLORS: Record<string, string> = {
    NFL: '#0B6623',
    NBA: '#C9082A',
    MLB: '#002D72',
    NHL: '#00539B',
  };
  const sportColor = SPORT_COLORS[player.sport] || '#be123c';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: player.playerName,
    jobTitle: `Professional ${player.sport === 'NFL' ? 'Football' : player.sport === 'NBA' ? 'Basketball' : player.sport === 'MLB' ? 'Baseball' : 'Hockey'} Player`,
    memberOf: {
      '@type': 'SportsTeam',
      name: player.team
    }
  };

  const borderColor =
    player.status === 'Out' || player.status === 'IR' ? '#ef4444' :
    player.status === 'Questionable' ? '#f59e0b' :
    player.status === 'Day-to-Day' ? '#eab308' :
    player.status === 'Probable' ? '#3b82f6' :
    '#10b981';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href={`${basePath}/${player.sport.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#be123c] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {player.sport} Injury Report
        </Link>

        {/* Player header */}
        <div
          className="bg-white rounded-2xl border border-rose-100 shadow-md overflow-hidden mb-6"
          style={{ borderLeft: `6px solid ${borderColor}` }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: sportColor }}
                  >
                    {player.sport}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1c0010]">{player.playerName}</h1>
                    <p className="text-gray-500">{player.position} · {player.team}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <StatusBadge status={player.status} />
                {player.status !== 'Healthy' && <FantasyImpactBadge impact={player.fantasyImpact} />}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Injury details */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#1c0010] mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#be123c]" />
              {t('currentStatus')}
            </h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">{t('injury')}</dt>
                <dd className="text-sm font-medium text-[#1c0010]">{player.injury || 'None'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Status</dt>
                <dd><StatusBadge status={player.status} size="sm" /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">{t('expectedReturn')}</dt>
                <dd className="text-sm font-medium text-[#1c0010]">
                  {player.returnDate
                    ? new Date(player.returnDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'Unknown'
                  }
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Last Updated</dt>
                <dd className="text-sm text-gray-400">
                  {new Date(player.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Fantasy impact */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#1c0010] mb-4 flex items-center gap-2">
              <span>🎯</span>
              {t('fantasyImpact')}
            </h2>
            <FantasyImpactBadge impact={player.fantasyImpact} />
            <p className="text-sm text-gray-600 mt-3">
              {player.fantasyImpact === 'High' && player.status === 'Out' &&
                `${player.playerName} is a top-24 player at ${player.position} and is currently out. Consider dropping or placing on IR in your fantasy league.`
              }
              {player.fantasyImpact === 'High' && player.status === 'Questionable' &&
                `${player.playerName} is a top-24 player and is questionable. Monitor closely before lineups lock and have a handcuff ready.`
              }
              {player.fantasyImpact === 'High' && player.status === 'Day-to-Day' &&
                `${player.playerName} is a top-24 player and is day-to-day. Check for practice reports before setting your lineup.`
              }
              {player.fantasyImpact === 'Medium' &&
                `${player.playerName} is a flex-worthy player. The injury may affect their performance but shouldn't require immediate roster moves.`
              }
              {player.fantasyImpact === 'Low' &&
                `${player.playerName}'s injury has low fantasy impact. If healthy, the player is likely a bench option.`
              }
              {player.status === 'Healthy' &&
                `${player.playerName} is healthy and cleared to play. No fantasy concerns at this time.`
              }
            </p>
          </div>
        </div>

        {/* Injury timeline placeholder */}
        <div className="bg-white rounded-xl border border-rose-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1c0010] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#be123c]" />
            {t('injuryHistory')}
          </h2>
          <div className="relative pl-6 border-l-2 border-rose-100 space-y-4">
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#be123c] border-2 border-white shadow"></div>
              <p className="text-sm font-semibold text-[#1c0010]">Jan 13, 2025</p>
              <p className="text-sm text-gray-600">{player.injury ? `${player.injury} — ${player.status}` : 'No active injury'}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow"></div>
              <p className="text-sm font-semibold text-[#1c0010]">Previous season</p>
              <p className="text-sm text-gray-400">Historical data available with ESPN API integration</p>
            </div>
          </div>
        </div>

        {/* Similar players */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[#1c0010] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#be123c]" />
              Similar Players ({player.position} · {player.sport})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similar.map(p => (
                <Link
                  key={p.id}
                  href={`${basePath}/players/${p.slug}`}
                  className="bg-white rounded-xl border border-rose-100 shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-[#1c0010] text-sm">{p.playerName}</p>
                  <p className="text-xs text-gray-500 mb-2">{p.team}</p>
                  <StatusBadge status={p.status} size="sm" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
