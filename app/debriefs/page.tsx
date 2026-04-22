import { getDebriefs } from '@/lib/cosmic';
import DebriefCard from '@/components/DebriefCard';

export default async function DebriefsPage() {
  const debriefs = await getDebriefs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Trade Debriefs</h1>
        <p className="text-gray-400">Post-trade analysis and lessons learned</p>
      </div>

      {debriefs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {debriefs.map((d) => <DebriefCard key={d.id} debrief={d} />)}
        </div>
      ) : (
        <div className="card p-12 text-center text-gray-500">
          <div className="text-4xl mb-3">📊</div>
          <p>No debriefs yet</p>
        </div>
      )}
    </div>
  );
}