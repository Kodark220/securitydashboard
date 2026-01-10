import type { ThreatSummary as ThreatSummaryType } from '../types/contract';

interface ThreatSummaryProps {
  summary: ThreatSummaryType | null;
  loading?: boolean;
}

export const ThreatSummaryCard = ({ summary, loading = false }: ThreatSummaryProps) => {
  if (!summary) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-400">
        {loading ? 'Loading threat summary...' : 'No threat data available'}
      </div>
    );
  }

  const { threat_breakdown, visual_summary, system_alert, alert_message, action_items } = summary;
  const total = threat_breakdown.total;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          Threat Summary
        </h3>
        {system_alert && (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
            🚨 SYSTEM ALERT
          </span>
        )}
      </div>

      {/* Visual Summary */}
      <div className={`p-4 rounded-lg border ${
        system_alert
          ? 'bg-red-500/10 border-red-500/30'
          : threat_breakdown.critical > 0
            ? 'bg-orange-500/10 border-orange-500/30'
            : threat_breakdown.high > 0
              ? 'bg-yellow-500/10 border-yellow-500/30'
              : 'bg-green-500/10 border-green-500/30'
      }`}>
        <p className="font-mono text-sm md:text-base text-gray-100">
          {visual_summary}
        </p>
      </div>

      {/* Alert Message */}
      <div className={`p-4 rounded-lg border ${
        system_alert
          ? 'bg-red-500/10 border-red-500/30 text-red-300'
          : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
      }`}>
        <p className="font-semibold flex items-center gap-2">
          {system_alert ? '🔴' : '🔵'} {alert_message}
        </p>
      </div>

      {/* Threat Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Critical */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-red-400">Critical</h4>
            <span className="text-2xl">🔴</span>
          </div>
          <p className="text-3xl font-bold text-red-300">{threat_breakdown.critical}</p>
          <p className="text-xs text-red-300/70 mt-2">Requires immediate action</p>
        </div>

        {/* High */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-orange-400">High</h4>
            <span className="text-2xl">🟠</span>
          </div>
          <p className="text-3xl font-bold text-orange-300">{threat_breakdown.high}</p>
          <p className="text-xs text-orange-300/70 mt-2">Urgent attention needed</p>
        </div>

        {/* Medium */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-yellow-400">Medium</h4>
            <span className="text-2xl">🟡</span>
          </div>
          <p className="text-3xl font-bold text-yellow-300">{threat_breakdown.medium}</p>
          <p className="text-xs text-yellow-300/70 mt-2">Monitor closely</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Threats</p>
          <p className="text-2xl font-bold text-white mt-1">{total}</p>
        </div>
        <div className={`rounded-lg p-4 ${
          action_items > 5
            ? 'bg-red-500/10 border border-red-500/30'
            : 'bg-blue-500/10 border border-blue-500/30'
        }`}>
          <p className="text-sm text-gray-400">Action Items</p>
          <p className="text-2xl font-bold mt-1">
            {action_items > 5 ? <span className="text-red-400">{action_items}</span> : <span className="text-blue-400">{action_items}</span>}
          </p>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-4 rounded-lg bg-gray-700 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Current Status</p>
          <p className="font-semibold text-white mt-1">
            {total === 0
              ? '✅ All Clear'
              : threat_breakdown.critical > 0
                ? '🔴 Critical Status'
                : threat_breakdown.high > 0
                  ? '🟠 High Alert'
                  : '🟡 Caution'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{total > 0 ? total : 0}</p>
          <p className="text-xs text-gray-400">Threats Detected</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300">
        <p className="text-sm">
          <span className="font-semibold">💡 Recommendation:</span> {
            total === 0
              ? 'System is secure. Continue monitoring for new threats.'
              : action_items > 0
                ? `Focus on the ${action_items} action items that require immediate attention.`
                : 'Review identified threats and take appropriate mitigation steps.'
          }
        </p>
      </div>
    </div>
  );
};
