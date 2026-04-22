import Link from 'next/link';
import { AIAdvisory, getMetafieldValue } from '@/types';
import SeverityBadge from './SeverityBadge';

export default function AdvisoryCard({ advisory }: { advisory: AIAdvisory }) {
  const m = advisory.metadata || {};
  const adviceType = getMetafieldValue(m.advice_type);
  const probability = typeof m.reversal_probability === 'number' ? m.reversal_probability : 0;
  const confidence = typeof m.confidence_score === 'number' ? m.confidence_score : 0;

  const adviceColor: Record<string, string> = {
    'Cancel': 'text-red-400 border-red-500/30 bg-red-500/5',
    'Hold': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    'Partial Exit': 'text-orange-400 border-orange-500/30 bg-orange-500/5',
    'Tighten Stop': 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5'
  };
  const cls = adviceColor[adviceType] || 'text-gray-400 border-gray-500/30 bg-gray-500/5';

  return (
    <Link href={`/advisories/${advisory.slug}`} className={`block card card-hover p-5 border-l-4 ${cls}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-sm uppercase tracking-wide ${cls.split(' ')[0]}`}>{adviceType || 'Advice'}</span>
              <SeverityBadge severity={m.severity} />
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {m.advisory_time ? new Date(m.advisory_time).toLocaleString() : ''}
            </div>
          </div>
        </div>
        {m.trader_accepted !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded ${m.trader_accepted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'}`}>
            {m.trader_accepted ? '✓ Accepted' : 'Ignored'}
          </span>
        )}
      </div>

      <p className="text-white text-sm mb-4 line-clamp-2">{m.short_message || advisory.title}</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wide mb-1">
            <span>Reversal</span>
            <span className="mono">{probability}%</span>
          </div>
          <div className="h-1.5 bg-bg rounded-full overflow-hidden">
            <div className="h-full bg-brand" style={{ width: `${probability}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wide mb-1">
            <span>Confidence</span>
            <span className="mono">{confidence}%</span>
          </div>
          <div className="h-1.5 bg-bg rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${confidence}%` }} />
          </div>
        </div>
      </div>
    </Link>
  );
}