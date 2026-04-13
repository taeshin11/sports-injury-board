import { getTranslations } from 'next-intl/server';
import { allInjuries } from '@/lib/data';
import StatusBadge from '@/components/StatusBadge';
import FantasyImpactBadge from '@/components/FantasyImpactBadge';
import SportTabs from '@/components/SportTabs';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Fantasy Sports Injury Impact — NFL NBA MLB NHL | SportsInjuryBoard',
    description: 'Fantasy impact summary for all injured players across NFL, NBA, MLB, and NHL. See who to drop, add, or stream based on current injury status.',
  };
}

export default async function FantasyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('fantasy');
  const basePath = locale === 'en' ? '' : `/${locale}`;

  const highImpact = allInjuries.filter(p => p.fantasyImpact === 'High' && p.status !== 'Healthy');
  const mediumImpact = allInjuries.filter(p => p.fantasyImpact === 'Medium' && p.status !== 'Healthy');
  const outPlayers = allInjuries.filter(p => p.status === 'Out' || p.status === 'IR');
  const gameTimeDecisions = allInjuries.filter(p => p.status === 'Questionable' || p.status === 'Day-to-Day');

  return (
    <>
      <section className="bg-gradient-to-br from-[#1c0010] to-[#3d0020] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🎯</span>
            <span className="text-rose-300 text-sm font-medium uppercase tracking-wide">Fantasy Sports</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-rose-200 text-lg">{t('subtitle')}</p>
        </div>
      </section>

      <SportTabs activeSport="all" locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="text-sm text-red-600 font-semibold mb-1">Must Drop</p>
            <p className="text-3xl font-bold text-red-700">{outPlayers.filter(p => p.fantasyImpact === 'High').length}</p>
            <p className="text-xs text-red-400 mt-1">High-impact players out</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-sm text-amber-600 font-semibold mb-1">Watch List</p>
            <p className="text-3xl font-bold text-amber-700">{gameTimeDecisions.length}</p>
            <p className="text-xs text-amber-400 mt-1">Game-time decisions</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-600 font-semibold mb-1">High Impact</p>
            <p className="text-3xl font-bold text-blue-700">{highImpact.length}</p>
            <p className="text-xs text-blue-400 mt-1">Fantasy-critical injuries</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-sm text-emerald-600 font-semibold mb-1">Medium Impact</p>
            <p className="text-3xl font-bold text-emerald-700">{mediumImpact.length}</p>
            <p className="text-xs text-emerald-400 mt-1">Flex-worthy concerns</p>
          </div>
        </div>

        {/* Must drop / sit section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1c0010] mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            {t('mustDrop')} — High Impact Players Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {outPlayers.filter(p => p.fantasyImpact === 'High').map(player => (
              <div key={player.id} className="bg-white rounded-xl border border-red-100 shadow-sm p-4 border-l-4 border-l-red-400">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link href={`${basePath}/players/${player.slug}`} className="font-bold text-[#1c0010] hover:text-[#be123c]">
                      {player.playerName}
                    </Link>
                    <p className="text-xs text-gray-500">{player.sport} · {player.position} · {player.team}</p>
                  </div>
                  <StatusBadge status={player.status} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{player.injury}</p>
                {player.returnDate && (
                  <p className="text-xs text-gray-400">Est. return: {new Date(player.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Game-time decisions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1c0010] mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block animate-pulse"></span>
            {t('watchList')} — Game-Time Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameTimeDecisions.map(player => (
              <div key={player.id} className="bg-white rounded-xl border border-amber-100 shadow-sm p-4 border-l-4 border-l-amber-400">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link href={`${basePath}/players/${player.slug}`} className="font-bold text-[#1c0010] hover:text-[#be123c]">
                      {player.playerName}
                    </Link>
                    <p className="text-xs text-gray-500">{player.sport} · {player.position} · {player.team}</p>
                  </div>
                  <StatusBadge status={player.status} size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{player.injury}</p>
                  <FantasyImpactBadge impact={player.fantasyImpact} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium impact */}
        {mediumImpact.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1c0010] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              {t('streamable')} — Medium Impact Injuries
            </h2>
            <div className="overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-rose-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#1c0010]">Player</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#1c0010]">Sport/Pos</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#1c0010]">Injury</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#1c0010]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {mediumImpact.map(player => (
                    <tr key={player.id} className="hover:bg-rose-50/50">
                      <td className="px-4 py-3">
                        <Link href={`${basePath}/players/${player.slug}`} className="font-semibold text-[#1c0010] hover:text-[#be123c]">
                          {player.playerName}
                        </Link>
                        <p className="text-xs text-gray-400">{player.team}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{player.sport} · {player.position}</td>
                      <td className="px-4 py-3 text-gray-600">{player.injury || '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={player.status} size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
