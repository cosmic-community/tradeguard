import Link from 'next/link';
import { Trade } from '@/types';
import DirectionBadge from './DirectionBadge';
import StatusBadge from './StatusBadge';
import PnLDisplay from './PnLDisplay';

export default function TradeCard({ trade }: { trade: Trade }) {
  const m = trade.metadata || {};
  return (
    <Link href={`/trades/${trade.slug}`} className="block card card-hover p-5 group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white mono">{m.symbol || trade.title}</h3>
            <DirectionBadge direction={m.direction} />
          </div>
          <div className="text-xs text-gray-500">
            {m.entry_time ? new Date(m.entry_time).toLocaleString() : 'No time'}
          </div>
        </div>
        <StatusBadge status={m.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">Entry</div>
          <div className="mono text-sm text-white">${typeof m.entry_price === 'number' ? m.entry_price.toFixed(2) : '—'}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">Current</div>
          <div className="mono text-sm text-white">${typeof m.current_price === 'number' ? m.current_price.toFixed(2) : '—'}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">Size</div>
          <div className="mono text-sm text-gray-300">{typeof m.position_size === 'number' ? m.position_size : '—'}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">P&L</div>
          <PnLDisplay value={m.current_pnl} size="sm" />
        </div>
      </div>
    </Link>
  );
}