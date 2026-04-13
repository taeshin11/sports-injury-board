'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SportTabsProps {
  activeSport: string;
  locale: string;
}

const SPORTS = [
  { id: 'all', label: 'All Sports', color: '#be123c' },
  { id: 'nfl', label: 'NFL', color: '#0B6623' },
  { id: 'nba', label: 'NBA', color: '#C9082A' },
  { id: 'mlb', label: 'MLB', color: '#002D72' },
  { id: 'nhl', label: 'NHL', color: '#00539B' },
];

export default function SportTabs({ activeSport, locale }: SportTabsProps) {
  const basePath = locale === 'en' ? '' : `/${locale}`;

  const getHref = (sportId: string) => {
    if (sportId === 'all') return `${basePath}/`;
    return `${basePath}/${sportId}`;
  };

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
          {SPORTS.map(sport => {
            const isActive = activeSport === sport.id;
            return (
              <Link
                key={sport.id}
                href={getHref(sport.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:bg-rose-50 hover:text-[#be123c]'
                }`}
                style={isActive ? { backgroundColor: sport.color } : {}}
              >
                {sport.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
