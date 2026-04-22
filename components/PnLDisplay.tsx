export default function PnLDisplay({ value, size = 'md' }: { value: number | undefined; size?: 'sm' | 'md' | 'lg' }) {
  const num = typeof value === 'number' ? value : 0;
  const isPositive = num > 0;
  const isZero = num === 0;
  const sizeClass = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg';
  const color = isZero ? 'text-gray-400' : isPositive ? 'text-emerald-400' : 'text-red-400';
  const sign = isPositive ? '+' : '';

  return (
    <span className={`mono font-bold ${sizeClass} ${color}`}>
      {sign}
      {num.toFixed(2)}
    </span>
  );
}