'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Player } from '@/lib/data';
import StatusBadge from './StatusBadge';
import FantasyImpactBadge from './FantasyImpactBadge';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

interface InjuryTableProps {
  players: Player[];
  locale: string;
  sport: string;
}

export default function InjuryTable({ players, locale, sport }: InjuryTableProps) {
  const t = useTranslations('filter');
  const tTable = useTranslations('table');
  const tCommon = useTranslations('common');

  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPosition, setFilterPosition] = useState<string>('');
  const [filterImpact, setFilterImpact] = useState<string>('');
  const [sortField, setSortField] = useState<string>('playerName');
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const basePath = locale === 'en' ? '' : `/${locale}`;

  const statuses = Array.from(new Set(players.map(p => p.status)));
  const positions = Array.from(new Set(players.map(p => p.position))).sort();

  const filtered = players
    .filter(p => !filterStatus || p.status === filterStatus)
    .filter(p => !filterPosition || p.position === filterPosition)
    .filter(p => !filterImpact || p.fantasyImpact === filterImpact)
    .sort((a, b) => {
      const va = ((a as unknown) as Record<string, unknown>)[sortField] as string || '';
      const vb = ((b as unknown) as Record<string, unknown>)[sortField] as string || '';
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const handleSort = (field: string) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortAsc ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />;
  };

  const hasFilters = filterStatus || filterPosition || filterImpact;

  return (
    <div>
      {/* Ad placeholder */}
      <div id="adsterra-native-banner" className="w-full my-4 min-h-[90px] rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">
        Advertisement
      </div>

      {/* Filter bar */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#be123c] transition-colors"
          >
            <Filter className="w-4 h-4" />
            {t('clear')}
          </button>
          {hasFilters && (
            <button
              onClick={() => { setFilterStatus(''); setFilterPosition(''); setFilterImpact(''); }}
              className="flex items-center gap-1 text-xs text-[#be123c] hover:underline"
            >
              <X className="w-3 h-3" /> {t('clear')}
            </button>
          )}
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} {tCommon('players')}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#be123c]/30"
          >
            <option value="">{t('status')}: {t('all')}</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={filterPosition}
            onChange={e => setFilterPosition(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#be123c]/30"
          >
            <option value="">{t('position')}: {t('all')}</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select
            value={filterImpact}
            onChange={e => setFilterImpact(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#be123c]/30"
          >
            <option value="">{t('impact')}: {t('all')}</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Table - desktop */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-rose-50 text-[#1c0010]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-[#be123c]" onClick={() => handleSort('playerName')}>
                {tTable('player')} <SortIcon field="playerName" />
              </th>
              <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-[#be123c]" onClick={() => handleSort('position')}>
                {tTable('position')} <SortIcon field="position" />
              </th>
              <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-[#be123c]" onClick={() => handleSort('team')}>
                {tTable('team')} <SortIcon field="team" />
              </th>
              <th className="px-4 py-3 text-left font-semibold">{tTable('injury')}</th>
              <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:text-[#be123c]" onClick={() => handleSort('status')}>
                {tTable('status')} <SortIcon field="status" />
              </th>
              <th className="px-4 py-3 text-left font-semibold">{tTable('return')}</th>
              <th className="px-4 py-3 text-left font-semibold">{tTable('impact')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">{tCommon('noData')}</td>
              </tr>
            ) : filtered.map((player, i) => (
              <tr
                key={player.id}
                className={`hover:bg-rose-50/50 transition-colors border-l-4 ${
                  player.status === 'Out' || player.status === 'IR' ? 'border-l-red-400' :
                  player.status === 'Questionable' ? 'border-l-amber-400' :
                  player.status === 'Day-to-Day' ? 'border-l-yellow-400' :
                  player.status === 'Probable' ? 'border-l-blue-400' :
                  'border-l-emerald-400'
                }`}
              >
                <td className="px-4 py-3">
                  <Link
                    href={`${basePath}/players/${player.slug}`}
                    className="font-semibold text-[#1c0010] hover:text-[#be123c] transition-colors"
                  >
                    {player.playerName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{player.position}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{player.team}</td>
                <td className="px-4 py-3 text-gray-600">{player.injury || '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={player.status} size="sm" />
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {player.returnDate ? new Date(player.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                </td>
                <td className="px-4 py-3">
                  {player.status !== 'Healthy' && <FantasyImpactBadge impact={player.fantasyImpact} size="sm" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - mobile */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8">{tCommon('noData')}</p>
        ) : filtered.map(player => (
          <div
            key={player.id}
            className={`bg-white rounded-xl border border-rose-100 shadow-sm p-4 border-l-4 ${
              player.status === 'Out' || player.status === 'IR' ? 'border-l-red-400' :
              player.status === 'Questionable' ? 'border-l-amber-400' :
              player.status === 'Day-to-Day' ? 'border-l-yellow-400' :
              player.status === 'Probable' ? 'border-l-blue-400' :
              'border-l-emerald-400'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link
                  href={`${basePath}/players/${player.slug}`}
                  className="font-bold text-[#1c0010] hover:text-[#be123c] transition-colors"
                >
                  {player.playerName}
                </Link>
                <p className="text-xs text-gray-500">{player.position} · {player.team}</p>
              </div>
              <StatusBadge status={player.status} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{player.injury || 'No injury'}</span>
              {player.status !== 'Healthy' && <FantasyImpactBadge impact={player.fantasyImpact} size="sm" />}
            </div>
            {player.returnDate && (
              <p className="text-xs text-gray-400 mt-1">
                Est. return: {new Date(player.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Mid-page ad */}
      <div id="adsterra-display-banner" className="flex justify-center my-6">
        <div className="w-full max-w-3xl h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
          Advertisement (728x90)
        </div>
      </div>
    </div>
  );
}
