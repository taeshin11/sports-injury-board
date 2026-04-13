import { getInjuriesBySport } from '@/lib/data';
import InjuryTable from '@/components/InjuryTable';
import SportTabs from '@/components/SportTabs';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'MLB Injury Report Today 2025 — Player Status & Fantasy Impact',
    description: 'Complete MLB injury report for the 2025 season. Pitcher and hitter injury status, expected return dates, and fantasy baseball impact ratings.',
  };
}

export default async function MLBPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const players = getInjuriesBySport('MLB');
  const outCount = players.filter(p => p.status === 'Out').length;
  const questionableCount = players.filter(p => p.status === 'Questionable').length;

  return (
    <>
      <section className="bg-gradient-to-br from-[#002D72] to-[#001a44] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">⚾</span>
            <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">2025 Season</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">MLB Injury Report</h1>
          <p className="text-blue-200 mb-4">
            {players.length} players tracked · {outCount} out · {questionableCount} questionable
          </p>
          <div className="flex gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">Updated: Jan 13, 2025</span>
          </div>
        </div>
      </section>

      <SportTabs activeSport="mlb" locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-[#1c0010] mb-6">All MLB Injuries ({players.length} players)</h2>
        <InjuryTable players={players} locale={locale} sport="MLB" />
      </div>
    </>
  );
}
