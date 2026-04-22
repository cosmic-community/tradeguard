// app/advisories/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdvisoryBySlug } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import SeverityBadge from '@/components/SeverityBadge';

export default async function AdvisoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const advisory = await getAdvisoryBySlug(slug);

  if (!advisory) notFound();

  const m = advisory.metadata || {};
  const trade = m.trade;
  const adviceType = getMetafieldValue(m.advice_type);
  const probability = typeof m.reversal_probability === 'number' ? m.reversal_probability : 0;
  const confidence = typeof m.confidence_score === 'number' ? m.confidence_score : 0;
  const factors = Array.isArray(m.triggering_factors) ? m.triggering_factors : [];

  const adviceBorderColor: Record<string, string> = {
    'Cancel': 'border-l-red-500',
    'Hold': 'border-l-emerald-500',
    'Partial Exit': 'border-l-orange-500',
    'Tighten Stop': 'border-l-yellow-500'
  };
  const borderCls = adviceBorderColor[adviceType] || 'border-l-gray-500';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/advisories" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Back to advisories</Link>

      <div className={`card p-6 md:p-8 mb-6 border-l-4 ${borderCls}`}>
        <div className="flex items-start gap-4 mb-6">
          <div className="text-5xl">🤖</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-2xl font-bold text-white uppercase tracking-wide">{adviceType || 'Advisory'}</span>
              <SeverityBadge severity={m.severity} />
              {m.trader_accepted !== undefined && (
                <span className={`text-xs px-2 py-1 rounded font-semibold ${m.trader_accepted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {m.trader_accepted ? '✓ Accepted' : '✗ Ignored'}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {m.advisory_time ? new Date(m.advisory_time).toLocaleString() : ''}
              {typeof m.price_at_advisory === 'number' && ` • Price: $${m.price_at_advisory.toFixed(2)}`}
            </div>
          </div>
        </div>

        {m.short_message && (
          <div className="bg-bg rounded-lg p-5 mb-6 border border-border">
            <p className="text-white text-lg font-medium">{m.short_message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className="font-semibold uppercase tracking-wide">Reversal Probability</span>
              <span className="mono text-white font-bold">{probability}%</span>
            </div>
            <div className="h-3 bg-bg rounded-full overflow-hidden border border-border">
              <div className="h-full bg-gradient-to-r from-brand to-brand-dark" style={{ width: `${probability}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className="font-semibold uppercase tracking-wide">AI Confidence</span>
              <span className="mono text-white font-bold">{confidence}%</span>
            </div>
            <div className="h-3 bg-bg rounded-full overflow-hidden border border-border">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700" style={{ width: `${confidence}%` }} />
            </div>
          </div>
        </div>

        {factors.length > 0 && (
          <div className="mb-6">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Triggering Factors</div>
            <div className="flex flex-wrap gap-2">
              {factors.map((f, i) => (
                <span key={i} className="px-3 py-1.5 bg-bg border border-border rounded-lg text-sm text-gray-300">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {m.ai_explanation && (
          <div className="pt-6 border-t border-border">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">AI Explanation</div>
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{m.ai_explanation}</p>
          </div>
        )}
      </div>

      {trade && (
        <div className="card p-6">
          <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Related Trade</div>
          <Link href={`/trades/${trade.slug}`} className="flex items-center justify-between hover:bg-bg p-3 rounded-lg -m-3 transition-colors">
            <div>
              <div className="text-white font-bold mono">{trade.metadata?.symbol || trade.title}</div>
              <div className="text-sm text-gray-500">View trade details →</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}