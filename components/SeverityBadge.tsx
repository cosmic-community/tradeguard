import { getMetafieldValue } from '@/types';

export default function SeverityBadge({ severity }: { severity: unknown }) {
  const value = getMetafieldValue(severity);
  const styles: Record<string, string> = {
    'Low': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Medium': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'High': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    'Critical': 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse'
  };
  const cls = styles[value] || 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${cls}`}>
      {value || 'Unknown'}
    </span>
  );
}