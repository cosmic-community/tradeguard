// app/debriefs/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDebriefBySlug } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import PnLDisplay from '@/components/PnLDisplay';

export default async function DebriefDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debrief = await getDebriefBySlug(slug);

  if (!debrief) notFound();

  const m = debrief.metadata || {};
  const trade = m.trade;
  const tags = Array.isArray(m.behavior_tags) ? m.behavior_tags : [];
  const followed = m.followed_ai_advice;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/debriefs" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← Back to debriefs</Link>

      <div className="card p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{debrief.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={m.outcome} />
              <span className="text-sm text-gray-500">
                {m.debrief_date ? new Date(m.debrief_date).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Final P&L</div>
            <PnLDisplay value={m.final_pnl} size="lg" />
            {typeof m.pnl_percentage === 'number' && (
              <div className="mt-1">
                <PnLDisplay value={m.pnl_percentage} size="sm" />
                <span className="text-xs text-gray-500 ml-1">%</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Followed AI Advice</div>
            <div className={`text-lg font-bold ${followed ? 'text-emerald-400' : 'text-red-400'}`}>
              {followed ? '✓ Yes' : '✗ No'}
            </div>
          </div>
          {typeof m.time_from_signal_minutes === 'number' && (
            <div className="card p-4">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Time from Signal</div>
              <div className="mono text-lg font-bold text-white">{m.time_from_signal_minutes} min</div>
            </div>
          )}
          <div className="card p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Outcome</div>
            <div className="text-lg font-bold text-white">{getMetafieldValue(m.outcome) || '—'}</div>
          </div>
        </div>

        {m.key_lesson && (
          <div className="bg-brand/5 border-l-4 border-brand rounded-lg p-5 mb-6">
            <div className="text-[10px] text-brand uppercase tracking-wider font-bold mb-2">💡 Key Lesson</div>
            <p className="text-white text-lg leading-relaxed">{m.key_lesson}</p>
          </div>
        )}

        {m.ai_feedback && (
          <div className="mb-6">
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">AI Feedback</div>
            <div className="bg-bg rounded-lg p-4 border border-border">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{m.ai_feedback}</p>
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Behavior Tags</div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
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