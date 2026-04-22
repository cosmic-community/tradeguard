import { getAdvisories } from '@/lib/cosmic';
import AdvisoryCard from '@/components/AdvisoryCard';

export default async function AdvisoriesPage() {
  const advisories = await getAdvisories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Advisories</h1>
        <p className="text-gray-400">Real-time cancel and hold recommendations from your AI advisor</p>
      </div>

      {advisories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advisories.map((a) => <AdvisoryCard key={a.id} advisory={a} />)}
        </div>
      ) : (
        <div className="card p-12 text-center text-gray-500">
          <div className="text-4xl mb-3">🤖</div>
          <p>No advisories yet</p>
        </div>
      )}
    </div>
  );
}