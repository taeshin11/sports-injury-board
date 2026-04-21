import type { Metadata } from 'next';
import { HelpCircle, Activity } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'How to Use SportsInjuryBoard — FAQ & Injury Status Guide',
    description:
      'Learn how to read NFL, NBA, MLB, and NHL injury reports. FAQ covering injury statuses, fantasy sports impact, betting lines, IR, PUP list, and more.',
    alternates: { canonical: 'https://sports-injury-board.vercel.app/how-to-use' },
  };
}

const faqs = [
  {
    q: 'What do injury statuses mean?',
    a: `Injury statuses indicate a player's likelihood of playing in an upcoming game. "Out" means they will definitely not play. "Doubtful" means they are very unlikely to play (~25% chance). "Questionable" means it's roughly 50/50. "Day-to-Day" means they have a minor issue and could be cleared by game time. "Probable" means they are expected to play with minimal concern. "IR" (Injured Reserve) or "IL" (Injured List) means the player is sidelined for an extended period.`,
  },
  {
    q: 'How current is the injury data?',
    a: `SportsInjuryBoard refreshes injury data every 30 minutes during active seasons. Official team injury reports are typically released on specific days mandated by each league (e.g., Wednesday/Thursday/Friday for the NFL), but we also capture real-time updates from league transactions, practice reports, and breaking news throughout the week.`,
  },
  {
    q: 'Which sports leagues are covered?',
    a: `We cover all four major North American professional sports leagues: the NFL (National Football League), NBA (National Basketball Association), MLB (Major League Baseball), and NHL (National Hockey League). We track injuries for all active roster players throughout each league's regular season and playoffs.`,
  },
  {
    q: 'How do I find injuries for my fantasy team?',
    a: `Use the sport-specific pages (NFL, NBA, MLB, NHL) to browse injuries by league. The Fantasy Impact page highlights the players most critical to fantasy rosters, sorted by impact level (High, Medium, Low). You can also check individual player pages for detailed injury history and expected return dates. The color-coded status badges make it easy to spot players you need to act on quickly.`,
  },
  {
    q: 'What is IR (Injured Reserve)?',
    a: `Injured Reserve (IR) in the NFL is a roster designation that removes a player from the active 53-man roster, placing them on a separate list. Players on IR miss at least 4 games. Teams can designate a limited number of players to return from IR during the season. In the NBA and NHL, the equivalent is called the Injured List (IL). In MLB it is also called the Injured List, with 10-day and 60-day versions depending on severity.`,
  },
  {
    q: 'How do injuries affect fantasy points?',
    a: `A player who is listed as "Out" will score zero fantasy points for that week or game. Questionable players are risky starts — they may play but could be limited in snaps or minutes, reducing their fantasy ceiling. When a high-impact player is injured, their backup often becomes a waiver wire target. SportsInjuryBoard provides a "Fantasy Impact" rating (High, Medium, Low) for each injured player to help you assess the urgency of roster moves.`,
  },
  {
    q: 'What is a day-to-day injury?',
    a: `A day-to-day injury designation means the player has a minor issue that is being evaluated on a daily basis. The team and medical staff are monitoring the player's progress and will make a final decision closer to game time. These are often soft-tissue concerns, minor sprains, or rest-related absences. Always check back the morning of the game for a final status update on day-to-day players.`,
  },
  {
    q: 'What is a questionable injury?',
    a: `A "Questionable" designation (used primarily in the NFL) means the player has approximately a 50% chance of playing. The team lists them as questionable when the injury is significant enough to warrant concern but not severe enough to rule them out entirely. Avoid starting questionable players as a top option in fantasy unless you have no better alternative, and always check for a final game-time status update.`,
  },
  {
    q: 'How do player injuries affect betting lines?',
    a: `Injuries to key players — especially quarterbacks, running backs, star shooters, or top starting pitchers — can significantly shift point spreads, totals (over/unders), and moneylines. When a superstar is ruled out, books often move the line 2 to 7 points (or more) in favor of the opposing team. Knowing injury news before it is widely priced into the market can be advantageous. Always confirm a player's status from official sources before placing wagers, and remember that lines can move rapidly around injury announcements.`,
  },
  {
    q: 'What is a PUP list?',
    a: `PUP stands for Physically Unable to Perform. It is an NFL-specific designation used during training camp and the preseason for players who are recovering from injuries suffered in the prior season. If a player is placed on the regular-season PUP list, they miss at least the first four games of the season. After that window, teams may activate them to the 53-man roster or move them to IR. The PUP list is distinct from the standard in-season IR designation.`,
  },
];

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1c0010] to-[#3d0020] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300 text-sm font-medium uppercase tracking-wide">Help & FAQ</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            How to Use SportsInjuryBoard
          </h1>
          <p className="text-rose-200 text-lg max-w-2xl">
            Everything you need to know about reading injury reports, understanding status designations, and using injury data for fantasy sports and betting.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c0010] mb-6">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Choose Your Sport', desc: 'Click NFL, NBA, MLB, or NHL in the navigation to see the full injury report for that league.' },
              { step: '2', title: 'Check Injury Status', desc: 'Color-coded badges show Out, Questionable, Day-to-Day, IR, and more at a glance.' },
              { step: '3', title: 'Act on Fantasy Impact', desc: 'Use the High / Medium / Low impact ratings to prioritize waiver moves and lineup changes.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card p-6">
                <div className="w-9 h-9 rounded-full bg-[#be123c] text-white font-bold text-lg flex items-center justify-center mb-3">
                  {step}
                </div>
                <h3 className="font-bold text-[#1c0010] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-[#1c0010] mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#be123c]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-bold text-[#1c0010] mb-3 text-base">{q}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
