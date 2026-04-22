import Link from 'next/link';
import { TradeDebrief, getMetafieldValue } from '@/types';
import StatusBadge from './StatusBadge';
import PnLDisplay from './PnLDisplay';

export default function DebriefCard({ debrief }: { debrief: TradeDebrief }) {
  const m = debrief.metadata || {};
  const followed = m.followed_ai_advice;

  return (
    <Link href={`/debriefs/${debrief.slug}`} className="block card card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{debrief.title}</h3>
          <div className="text-xs text-gray-500">
            {m.debrief_date ? new Date(m.debrief_date).toLocaleDateString() : ''}
          </div>
        </div>
        <StatusBadge status={m.outcome} />
      </div>

      {m.key_lesson && (
        <div className="bg-bg rounded-lg p-3 mb-3 border-l-2 border-brand">
          <div className="text-[10px] text-brand uppercase tracking-wide font-bold mb-1">Key Lesson</div>
          <p className="text-sm text-gray-300 line-clamp-2">{m.key_lesson}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">Final P&L</div>
          <PnLDisplay value={m.final_pnl} size="sm" />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">%</div>
          <PnLDisplay value={m.pnl_percentage} size="sm" />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">AI Advice</div>
          <div className={`text-sm font-semibold ${followed ? 'text-emerald-400' : 'text-red-400'}`}>
            {followed ? '✓ Followed' : '✗ Ignored'}
          </div>
        </div>
      </div>
    </Link>
  );
}