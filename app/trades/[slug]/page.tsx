// app/trades/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTradeBySlug, getAdvisories, getDebriefs } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import DirectionBadge from '@/components/DirectionBadge';
import StatusBadge from '@/components/StatusBadge';
import PnLDisplay from '@/components/PnLDisplay';
import AdvisoryCard from '@/components/AdvisoryCard';
import DebriefCard from '@/components/DebriefCard';

export default async function TradeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trade = await getTradeBySlug(slug);

  if (!trade) notFound();

  const m = trade.metadata || {};
  const [allAdvisories, allDebriefs] = await Promise.all([getAdvisories(), getDebriefs()]);
  const relatedAdvisories = allAdvisories.filter((a) => a.metadata?.trade?.id === trade.id);
  const relatedDebriefs = allDebriefs.filter((d) => d.metadata?.trade?.id === trade.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/trades" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Back to trades</Link>

      <div className="card p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white mono">{m.symbol || trade.title}</h1>
              <DirectionBadge direction={m.direction} />
              <StatusBadge status={m.status} />
            </div>
            <div className="text-sm text-gray-500">
              {m.entry_time ? `Opened ${new Date(m.entry_time).toLocaleString()}` : ''}
              {m.exit_time && ` • Closed ${new Date(m.exit_time).toLocaleString()}`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Current P&L</div>
            <PnLDisplay value={m.current_pnl} size="lg" />
          </div>
        </div>

        {m.chart_snapshot?.imgix_url && (
          <div className="mb-6 rounded-lg overflow-hidden border border-border">
            <img
              src={`${m.chart_snapshot.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt="Chart snapshot"
              className="w-full h-auto"
              width={800}
              height={400}
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DetailStat label="Entry Price" value={typeof m.entry_price === 'number' ? `$${m.entry_price.toFixed(2)}` : '—'} />
          <DetailStat label="Current Price" value={typeof m.current_price === 'number' ? `$${m.current_price.toFixed(2)}` : '—'} />
          <DetailStat label="Position Size" value={typeof m.position_size === 'number' ? `${m.position_size}` : '—'} />
          <DetailStat label="Stop Loss" value={typeof m.stop_loss === 'number' ? `$${m.stop_loss.toFixed(2)}` : '—'} className="text-red-400" />
          <DetailStat label="Take Profit" value={typeof m.take_profit === 'number' ? `$${m.take_profit.toFixed(2)}` : '—'} className="text-emerald-400" />
        </div>

        {m.trade_notes && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Trade Notes</div>
            <p className="text-gray-300 whitespace-pre-wrap">{m.trade_notes}</p>
          </div>
        )}
      </div>

      {relatedAdvisories.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">AI Advisories for this trade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedAdvisories.map((a) => <AdvisoryCard key={a.id} advisory={a} />)}
          </div>
        </section>
      )}

      {relatedDebriefs.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Debriefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedDebriefs.map((d) => <DebriefCard key={d.id} debrief={d} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function DetailStat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">{label}</div>
      <div className={`mono text-lg font-semibold ${className || 'text-white'}`}>{value}</div>
    </div>
  );
}