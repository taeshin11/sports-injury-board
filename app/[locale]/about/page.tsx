import type { Metadata } from 'next';
import { Activity, Shield, Clock, Database, TrendingUp } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About SportsInjuryBoard — Real-Time NFL NBA MLB NHL Injury Tracking',
    description:
      'SportsInjuryBoard provides real-time player injury reports for NFL, NBA, MLB, and NHL. Track injury status, expected return dates, and fantasy sports impact from official sources.',
    alternates: { canonical: 'https://sports-injury-board.vercel.app/about' },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1c0010] to-[#3d0020] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300 text-sm font-medium uppercase tracking-wide">About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            About SportsInjuryBoard
          </h1>
          <p className="text-rose-200 text-lg max-w-2xl">
            Your go-to source for real-time player injury reports across all four major North American sports leagues.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c0010] mb-4">Our Mission</h2>
          <div className="card p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              SportsInjuryBoard was built for fantasy sports players and bettors who need fast, reliable injury information
              before making lineup and wagering decisions. We aggregate and present injury data from official NFL, NBA, MLB,
              and NHL team injury reports and league announcements so you can act on the latest status in seconds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you need to know if a star quarterback is listed as Questionable heading into Sunday, or whether an
              NBA center landed on the Injured Reserve, SportsInjuryBoard surfaces that information clearly and quickly —
              without the noise.
            </p>
          </div>
        </section>

        {/* What we track */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c0010] mb-6">What We Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                emoji: '🏈',
                league: 'NFL',
                full: 'National Football League',
                desc: 'Official weekly injury designations including Out, Doubtful, Questionable, and Probable. IR and PUP list movements updated as announced.',
              },
              {
                emoji: '🏀',
                league: 'NBA',
                full: 'National Basketball Association',
                desc: 'Daily injury reports submitted by teams before each game. Covers all active roster players through the regular season and playoffs.',
              },
              {
                emoji: '⚾',
                league: 'MLB',
                full: 'Major League Baseball',
                desc: '10-day and 60-day IL placements, day-to-day designations, and expected return timelines for pitchers and position players.',
              },
              {
                emoji: '🏒',
                league: 'NHL',
                full: 'National Hockey League',
                desc: 'Long-Term Injured Reserve, day-to-day status, and game-time decisions reported before puck drop.',
              },
            ].map(({ emoji, league, full, desc }) => (
              <div key={league} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <h3 className="font-bold text-[#1c0010] text-lg">{league}</h3>
                    <p className="text-xs text-gray-500">{full}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Injury statuses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c0010] mb-6">Injury Status Definitions</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-rose-50">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-[#1c0010]">Status</th>
                  <th className="px-5 py-3 text-left font-semibold text-[#1c0010]">What It Means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {[
                  { status: 'Out', color: 'bg-red-500', desc: 'Player will not play. Do not start in fantasy; factor into betting lines.' },
                  { status: 'Doubtful', color: 'bg-orange-500', desc: 'Extremely unlikely to play (~25% chance). Plan for their absence.' },
                  { status: 'Questionable', color: 'bg-amber-400', desc: 'Uncertain availability (~50/50). Monitor up to game time.' },
                  { status: 'Day-to-Day', color: 'bg-yellow-400', desc: 'Minor injury; player could be cleared day of. Check latest reports.' },
                  { status: 'IR / IL', color: 'bg-purple-500', desc: 'Injured Reserve / Injured List. Player is out for an extended period (weeks or months).' },
                  { status: 'PUP', color: 'bg-blue-500', desc: 'Physically Unable to Perform (NFL). Player misses at least first 4 weeks of the regular season.' },
                  { status: 'Probable', color: 'bg-emerald-500', desc: 'Highly likely to play. Minor concern; generally safe to start.' },
                ].map(({ status, color, desc }) => (
                  <tr key={status} className="hover:bg-rose-50/40">
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 font-semibold text-white text-xs px-2.5 py-1 rounded-full ${color}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-700">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c0010] mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: Clock, label: 'Updated Every 30 Min', desc: 'Injury data refreshed twice an hour during active seasons.' },
              { Icon: Database, label: 'Official Sources', desc: 'Data sourced from team and league official injury reports.' },
              { Icon: TrendingUp, label: 'Fantasy Impact Rating', desc: 'High / Medium / Low impact scores for every injured player.' },
              { Icon: Shield, label: 'All 4 Major Leagues', desc: 'NFL, NBA, MLB, and NHL covered in one place.' },
            ].map(({ Icon, label, desc }) => (
              <div key={label} className="card p-5 text-center">
                <Icon className="w-7 h-7 text-[#be123c] mx-auto mb-3" />
                <h3 className="font-bold text-[#1c0010] text-sm mb-1">{label}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c0010] mb-4">Data Sources</h2>
          <div className="card p-6">
            <p className="text-gray-700 leading-relaxed mb-3">
              SportsInjuryBoard pulls injury data from publicly available official team injury reports submitted to each
              respective league, as well as official league announcements covering IR placements, suspensions, and
              roster moves that affect player availability.
            </p>
            <p className="text-gray-700 leading-relaxed">
              While we strive to keep data as current as possible, always verify critical lineup and betting decisions
              against the official team or league source. See our <a href="/terms" className="text-[#be123c] hover:underline">Terms of Use</a> for
              full data accuracy disclaimers.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
