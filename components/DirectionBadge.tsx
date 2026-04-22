import { getMetafieldValue } from '@/types';

export default function DirectionBadge({ direction }: { direction: unknown }) {
  const value = getMetafieldValue(direction);
  const isLong = value === 'Long';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border ${
        isLong
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-red-500/10 text-red-400 border-red-500/30'
      }`}
    >
      <span>{isLong ? '▲' : '▼'}</span>
      {value || '?'}
    </span>
  );
}