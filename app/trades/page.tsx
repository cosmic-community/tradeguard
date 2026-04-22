import { getTrades } from '@/lib/cosmic';
import TradeCard from '@/components/TradeCard';

export default async function TradesPage() {
  const trades = await getTrades();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">All Trades</h1>
        <p className="text-gray-400">{trades.length} {trades.length === 1 ? 'trade' : 'trades'} total</p>
      </div>

      {trades.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trades.map((t) => <TradeCard key={t.id} trade={t} />)}
        </div>
      ) : (
        <div className="card p-12 text-center text-gray-500">
          <div className="text-4xl mb-3">📊</div>
          <p>No trades yet</p>
        </div>
      )}
    </div>
  );
}