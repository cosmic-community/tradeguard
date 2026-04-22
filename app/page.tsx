import Link from 'next/link';
import { getTrades, getAdvisories, getDebriefs } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import TradeCard from '@/components/TradeCard';
import AdvisoryCard from '@/components/AdvisoryCard';
import DebriefCard from '@/components/DebriefCard';

export default async function HomePage() {
  const [trades, advisories, debriefs] = await Promise.all([
    getTrades(),
    getAdvisories(),
    getDebriefs()
  ]);

  const openTrades = trades.filter((t) => getMetafieldValue(t.metadata?.status) === 'Open');
  const totalPnL = trades.reduce((sum, t) => sum + (t.metadata?.current_pnl || 0), 0);
  const winRate = debriefs.length > 0
    ? Math.round((debriefs.filter((d) => getMetafieldValue(d.metadata?.outcome) === 'Win').length / debriefs.length) * 100)
    : 0;
  const criticalAdvisories = advisories.filter((a) => getMetafieldValue(a.metadata?.severity) === 'Critical').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-semibold">
            <span className="w-2 h-2 bg-brand rounded-full animate-pulse"></span>
            AI Advisor Active
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Exit losers <span className="text-brand">before</span> they become disasters
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          TradeGuard's AI watches your open trades and tells you when to cancel — before a small loss becomes a big one.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Open Trades" value={openTrades.length.toString()} icon="📊" />
        <StatCard
          label="Total P&L"
          value={`${totalPnL >= 0 ? '+' : ''}$${totalPnL.toFixed(2)}`}
          icon="💰"
          valueClass={totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}
        />
        <StatCard label="Win Rate" value={`${winRate}%`} icon="🎯" />
        <StatCard
          label="Critical Alerts"
          value={criticalAdvisories.toString()}
          icon="🚨"
          valueClass={criticalAdvisories > 0 ? 'text-red-400' : 'text-gray-400'}
        />
      </div>

      {/* Open Trades */}
      <Section title="Active Positions" href="/trades" linkLabel="View all trades →">
        {openTrades.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {openTrades.slice(0, 3).map((t) => <TradeCard key={t.id} trade={t} />)}
          </div>
        ) : (
          <EmptyState message="No open trades" />
        )}
      </Section>

      {/* Recent AI Advisories */}
      <Section title="Recent AI Advisories" href="/advisories" linkLabel="View all →">
        {advisories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advisories.slice(0, 4).map((a) => <AdvisoryCard key={a.id} advisory={a} />)}
          </div>
        ) : (
          <EmptyState message="No advisories yet" />
        )}
      </Section>

      {/* Recent Debriefs */}
      <Section title="Recent Debriefs" href="/debriefs" linkLabel="View all →">
        {debriefs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {debriefs.slice(0, 3).map((d) => <DebriefCard key={d.id} debrief={d} />)}
          </div>
        ) : (
          <EmptyState message="No debriefs yet" />
        )}
      </Section>
    </div>
  );
}

function StatCard({ label, value, icon, valueClass }: { label: string; value: string; icon: string; valueClass?: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className={`text-2xl font-bold mono ${valueClass || 'text-white'}`}>{value}</div>
    </div>
  );
}

function Section({ title, href, linkLabel, children }: { title: string; href: string; linkLabel: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <Link href={href} className="text-sm text-brand hover:text-brand-dark font-medium">{linkLabel}</Link>
      </div>
      {children}
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="card p-10 text-center text-gray-500">{message}</div>
  );
}