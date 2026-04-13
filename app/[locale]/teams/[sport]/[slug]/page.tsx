import { getTranslations } from 'next-intl/server';
import { allTeams, getPlayersByTeam, getTeamBySportAndSlug, Sport } from '@/lib/data';
import { notFound } from 'next/navigation';
import InjuryTable from '@/components/InjuryTable';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingDown } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateStaticParams() {
  const params: { sport: string; slug: string }[] = [];
  for (const [sport, teams] of Object.entries(allTeams)) {
    for (const team of teams) {
      params.push({ sport: sport.toLowerCase(), slug: team.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sport: string; slug: string; locale: string }>;
}): Promise<Metadata> {
  const { sport, slug } = await params;
  const team = getTeamBySportAndSlug(sport.toUpperCase() as Sport, slug);
  if (!team) return { title: 'Team Not Found' };

  const players = getPlayersByTeam(sport.toUpperCase() as Sport, slug);
  const injured = players.filter(p => p.status !== 'Healthy');

  return {
    title: `${team.name} Injury Report Today — ${sport.toUpperCase()} Lineup & Status | SportsInjuryBoard`,
    description: `${team.name} current injuries: ${injured.length} players listed. Updated Jan 13, 2025.`,
  };
}

const SPORT_COLORS: Record<string, string> = {
  nfl: '#0B6623',
  nba: '#C9082A',
  mlb: '#002D72',
  nhl: '#00539B',
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ sport: string; slug: string; locale: string }>;
}) {
  const { sport, slug, locale } = await params;
  const sportUpper = sport.toUpperCase() as Sport;
  const team = getTeamBySportAndSlug(sportUpper, slug);

  if (!team) notFound();

  const allPlayers = getPlayersByTeam(sportUpper, slug);
  const injured = allPlayers.filter(p => p.status !== 'Healthy');
  const healthy = allPlayers.filter(p => p.status === 'Healthy');
  const out = allPlayers.filter(p => p.status === 'Out' || p.status === 'IR');
  const basePath = locale === 'en' ? '' : `/${locale}`;
  const sportColor = SPORT_COLORS[sport] || '#be123c';

  const sportEmoji: Record<string, string> = { nfl: '🏈', nba: '🏀', mlb: '⚾', nhl: '🏒' };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: team.name,
    sport: team.sport === 'NFL' ? 'American Football' : team.sport === 'NBA' ? 'Basketball' : team.sport === 'MLB' ? 'Baseball' : 'Ice Hockey',
    memberOf: {
      '@type': 'SportsOrganization',
      name: team.sport
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="text-white py-10 px-4" style={{ background: `linear-gradient(135deg, ${sportColor}, ${sportColor}99)` }}>
        <div className="max-w-4xl mx-auto">
          <Link
            href={`${basePath}/${sport}`}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {sport.toUpperCase()} Injury Report
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{sportEmoji[sport] || '🏆'}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{team.name}</h1>
              <p className="text-white/70">{sport.toUpperCase()} · {team.city}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">{out.length} Out</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{injured.length} Injured Total</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{healthy.length} Healthy</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {allPlayers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No player data available for {team.name}.</p>
          </div>
        ) : (
          <>
            {/* Injury report */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#1c0010] mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-[#be123c]" />
                Injury Report ({allPlayers.length} players)
              </h2>
              <InjuryTable players={allPlayers} locale={locale} sport={sport.toUpperCase()} />
            </div>

            {/* Projected lineup placeholder */}
            <div className="bg-white rounded-xl border border-rose-100 shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-[#1c0010] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#be123c]" />
                Projected Lineup (Next Game)
              </h2>
              <div className="space-y-2">
                {healthy.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-rose-50 last:border-0">
                    <div>
                      <Link href={`${basePath}/players/${p.slug}`} className="font-medium text-[#1c0010] hover:text-[#be123c] text-sm">
                        {p.playerName}
                      </Link>
                      <span className="text-xs text-gray-400 ml-2">{p.position}</span>
                    </div>
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                ))}
                {healthy.length === 0 && (
                  <p className="text-gray-400 text-sm">No healthy players tracked for this team.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
