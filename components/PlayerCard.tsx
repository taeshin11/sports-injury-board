'use client';

import Link from 'next/link';
import { Player } from '@/lib/data';
import StatusBadge from './StatusBadge';
import FantasyImpactBadge from './FantasyImpactBadge';
import { User, Calendar } from 'lucide-react';

const SPORT_COLORS: Record<string, string> = {
  NFL: '#0B6623',
  NBA: '#C9082A',
  MLB: '#002D72',
  NHL: '#00539B',
};

interface PlayerCardProps {
  player: Player;
  locale: string;
}

export default function PlayerCard({ player, locale }: PlayerCardProps) {
  const basePath = locale === 'en' ? '' : `/${locale}`;
  const sportColor = SPORT_COLORS[player.sport] || '#be123c';

  const borderColor =
    player.status === 'Out' || player.status === 'IR' ? '#ef4444' :
    player.status === 'Questionable' ? '#f59e0b' :
    player.status === 'Day-to-Day' ? '#eab308' :
    player.status === 'Probable' ? '#3b82f6' :
    '#10b981';

  return (
    <div
      className="bg-white rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: sportColor }}>
              {player.sport}
            </div>
            <div>
              <Link
                href={`${basePath}/players/${player.slug}`}
                className="font-bold text-[#1c0010] hover:text-[#be123c] transition-colors text-sm"
              >
                {player.playerName}
              </Link>
              <p className="text-xs text-gray-500">{player.position} · {player.team}</p>
            </div>
          </div>
          <StatusBadge status={player.status} size="sm" />
        </div>

        {player.injury && (
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Injury:</span> {player.injury}
          </p>
        )}

        <div className="flex items-center justify-between">
          {player.status !== 'Healthy' && (
            <FantasyImpactBadge impact={player.fantasyImpact} size="sm" />
          )}
          {player.returnDate && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(player.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
