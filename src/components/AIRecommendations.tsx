import type { AIRecommendations as AIRecommendationsType } from '../types/contract';

interface AIRecommendationsProps {
  recommendations: AIRecommendationsType | null;
  loading?: boolean;
}

export const AIRecommendationsPanel = ({
  recommendations,
  loading = false,
}: AIRecommendationsProps) => {
  if (!recommendations) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-400">
        {loading ? 'Generating recommendations...' : 'No recommendations available'}
      </div>
    );
  }

  const { recommendations: recs, urgent } = recommendations;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-xl">🤖</span>
        AI-Generated Recommendations
        {urgent && <span className="ml-auto px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">URGENT</span>}
      </h3>

      {/* Priority Score */}
      <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
        <div className="flex-1">
          <p className="text-sm text-gray-300">Priority Level</p>
          <p className="text-2xl font-bold text-white">{recs.priority_score}%</p>
        </div>
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={
                recs.priority_score >= 70
                  ? '#ef4444'
                  : recs.priority_score >= 50
                    ? '#f59e0b'
                    : '#10b981'
              }
              strokeWidth="8"
              strokeDasharray={`${(recs.priority_score / 100) * 283} 283`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white">{recs.priority_score}%</span>
          </div>
        </div>
      </div>

      {/* Immediate Actions */}
      {recs.immediate_actions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-red-400 flex items-center gap-2">
            ⚡ Immediate Actions (Do Now!)
          </h4>
          <ul className="space-y-2">
            {recs.immediate_actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-red-500/10 rounded border border-red-500/30">
                <span className="text-lg mt-1">🔴</span>
                <span className="text-sm text-red-200">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Short Term Improvements */}
      {recs.short_term.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-yellow-400 flex items-center gap-2">
            📅 Short-Term Improvements (This Week)
          </h4>
          <ul className="space-y-2">
            {recs.short_term.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                <span className="text-lg mt-1">🟡</span>
                <span className="text-sm text-yellow-200">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Long Term Strategy */}
      {recs.long_term.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-400 flex items-center gap-2">
            🎯 Long-Term Strategy (This Month)
          </h4>
          <ul className="space-y-2">
            {recs.long_term.map((strategy, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <span className="text-lg mt-1">🔵</span>
                <span className="text-sm text-blue-200">{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optimization Tips */}
      {recs.optimization_tips.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-green-400 flex items-center gap-2">
            💡 Optimization Tips
          </h4>
          <ul className="space-y-2">
            {recs.optimization_tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-green-500/10 rounded border border-green-500/30">
                <span className="text-lg mt-1">💡</span>
                <span className="text-sm text-green-200">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-700 rounded-lg">
        <div>
          <p className="text-xs text-gray-400">Immediate Actions</p>
          <p className="text-2xl font-bold text-red-400">{recs.immediate_actions.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Short-Term</p>
          <p className="text-2xl font-bold text-yellow-400">{recs.short_term.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Long-Term</p>
          <p className="text-2xl font-bold text-blue-400">{recs.long_term.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Tips</p>
          <p className="text-2xl font-bold text-green-400">{recs.optimization_tips.length}</p>
        </div>
      </div>
    </div>
  );
};
