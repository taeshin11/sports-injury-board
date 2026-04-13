import { getTranslations } from 'next-intl/server';
import { getInjuriesBySport } from '@/lib/data';
import InjuryTable from '@/components/InjuryTable';
import SportTabs from '@/components/SportTabs';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'NBA Injury Report Today 2025 — Player Status & Fantasy Impact',
    description: 'Complete NBA injury report for the 2024-25 season. Player status, expected return dates, and fantasy basketball impact ratings.',
    openGraph: {
      title: 'NBA Injury Report Today — SportsInjuryBoard',
      description: 'All NBA player injuries, status updates, and fantasy impact.',
    }
  };
}

export default async function NBAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const players = getInjuriesBySport('NBA');
  const outCount = players.filter(p => p.status === 'Out').length;
  const questionableCount = players.filter(p => p.status === 'Questionable').length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'NBA Injury Report 2025',
    description: 'Complete NBA injury report with player status and fantasy impact',
    url: 'https://sports-injury-board.vercel.app/nba'
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-[#C9082A] to-[#9a0620] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🏀</span>
            <span className="text-red-200 text-sm font-medium uppercase tracking-wide">2024-25 Season</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">NBA Injury Report</h1>
          <p className="text-red-200 mb-4">
            {players.length} players tracked · {outCount} out · {questionableCount} questionable
          </p>
          <div className="flex gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">Updated: Jan 13, 2025</span>
          </div>
        </div>
      </section>

      <SportTabs activeSport="nba" locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-[#1c0010] mb-6">All NBA Injuries ({players.length} players)</h2>
        <InjuryTable players={players} locale={locale} sport="NBA" />
      </div>
    </>
  );
}
