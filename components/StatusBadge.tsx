import { getMetafieldValue } from '@/types';

export default function StatusBadge({ status }: { status: unknown }) {
  const value = getMetafieldValue(status);
  const styles: Record<string, string> = {
    'Open': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Closed - Win': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Closed - Loss': 'bg-red-500/10 text-red-400 border-red-500/30',
    'Cancelled': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    'Win': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Loss': 'bg-red-500/10 text-red-400 border-red-500/30',
    'Breakeven': 'bg-gray-500/10 text-gray-400 border-gray-500/30'
  };
  const cls = styles[value] || 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${cls}`}>
      {value || 'Unknown'}
    </span>
  );
}