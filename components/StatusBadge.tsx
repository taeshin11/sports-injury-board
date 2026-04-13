'use client';

import { InjuryStatus } from '@/lib/data';

const statusStyles: Record<string, string> = {
  'Out': 'bg-red-100 text-red-800 border-red-200',
  'Questionable': 'bg-amber-100 text-amber-800 border-amber-200',
  'Probable': 'bg-blue-100 text-blue-800 border-blue-200',
  'Day-to-Day': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'IR': 'bg-red-200 text-red-900 border-red-300',
  'Healthy': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Doubtful': 'bg-orange-100 text-orange-800 border-orange-200',
};

interface StatusBadgeProps {
  status: InjuryStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const styles = statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${styles} ${sizeClass}`}>
      {status}
    </span>
  );
}
