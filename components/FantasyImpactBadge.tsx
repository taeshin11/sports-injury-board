'use client';

import { FantasyImpact } from '@/lib/data';

interface FantasyImpactBadgeProps {
  impact: FantasyImpact;
  size?: 'sm' | 'md';
}

export default function FantasyImpactBadge({ impact, size = 'md' }: FantasyImpactBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  if (impact === 'High') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium ${sizeClass}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        High Impact
      </span>
    );
  }

  if (impact === 'Medium') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium ${sizeClass}`}>
        <span className="h-2 w-2 rounded-full bg-amber-500 inline-block"></span>
        Medium Impact
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 font-medium ${sizeClass}`}>
      <span className="h-2 w-2 rounded-full bg-gray-400 inline-block"></span>
      Low Impact
    </span>
  );
}
