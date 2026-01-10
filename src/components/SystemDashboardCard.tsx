import type { SystemDashboard } from '../types/contract';

interface SystemDashboardProps {
  dashboard: SystemDashboard | null;
  loading?: boolean;
}

export const SystemDashboardCard = ({ dashboard, loading = false }: SystemDashboardProps) => {
  if (!dashboard) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-400">
        {loading ? 'Loading dashboard...' : 'No dashboard data available'}
      </div>
    );
  }

  const { system_status, metrics, security_roster, risk_assessment, recent_activity, quick_actions } =
    dashboard;

  const getHealthColor = () => {
    switch (system_status.health) {
      case 'excellent':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'caution':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'warning':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'critical':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-700 border-gray-600 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <div className={`rounded-lg p-6 border ${getHealthColor()}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">{system_status.icon}</span>
              {system_status.health.toUpperCase()}
            </h3>
            <p className="text-sm opacity-80 mt-1">
              {system_status.monitoring ? '✅ Monitoring Active' : '⏸️ Monitoring Disabled'}
              {system_status.paused && ' | 🔴 PAUSED'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Owner</p>
            <p className="text-sm font-mono">{system_status.owner.substring(0, 10)}...</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
          <p className="text-xs opacity-70">Contract Address</p>
          <p className="text-xs font-mono mt-1 break-all">{system_status.owner}</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Scans */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Total Scans</p>
          <p className="text-2xl font-bold text-white">{metrics.total_scans}</p>
          <p className="text-xs text-gray-500 mt-2">transactions analyzed</p>
        </div>

        {/* Threats Detected */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Threats</p>
          <p className="text-2xl font-bold text-red-400">{metrics.total_threats_detected}</p>
          <p className="text-xs text-gray-500 mt-2">identified</p>
        </div>

        {/* Detection Rate */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Detection Rate</p>
          <p className="text-2xl font-bold text-orange-400">{metrics.threat_detection_rate_percent}%</p>
          <p className="text-xs text-gray-500 mt-2">of scans flagged</p>
        </div>

        {/* Emergency Pauses */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Pauses</p>
          <p className="text-2xl font-bold text-yellow-400">{metrics.emergency_pauses}</p>
          <p className="text-xs text-gray-500 mt-2">triggered</p>
        </div>

        {/* Average Risk */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Avg Risk</p>
          <p className="text-2xl font-bold text-blue-400">{metrics.average_risk_score}</p>
          <p className="text-xs text-gray-500 mt-2">score</p>
        </div>
      </div>

      {/* Security Roster */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Security Roster</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Operators</p>
            <p className="text-3xl font-bold text-blue-400">{security_roster.operators}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Blacklisted</p>
            <p className="text-3xl font-bold text-red-400">{security_roster.blacklisted_addresses}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Whitelisted</p>
            <p className="text-3xl font-bold text-green-400">{security_roster.whitelisted_addresses}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Tracked</p>
            <p className="text-3xl font-bold text-purple-400">{security_roster.addresses_tracked}</p>
          </div>
        </div>
      </div>

      {/* Risk Thresholds */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Risk Thresholds</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔴</span>
              <span className="font-medium">Critical (Auto-Pause)</span>
            </div>
            <span className="text-lg font-bold text-red-400">{risk_assessment.critical_threshold}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🟠</span>
              <span className="font-medium">High Alert</span>
            </div>
            <span className="text-lg font-bold text-orange-400">{risk_assessment.high_threshold}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🟡</span>
              <span className="font-medium">Medium Alert</span>
            </div>
            <span className="text-lg font-bold text-yellow-400">{risk_assessment.medium_threshold}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-2xl font-bold text-red-400">{recent_activity.recent_threats}</p>
            <p className="text-xs text-gray-400 mt-1">Threats</p>
          </div>
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-2xl font-bold text-blue-400">{recent_activity.recent_scans}</p>
            <p className="text-xs text-gray-400 mt-1">Scans</p>
          </div>
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-2xl font-bold text-green-400">{recent_activity.recent_recommendations}</p>
            <p className="text-xs text-gray-400 mt-1">Recommendations</p>
          </div>
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-2xl font-bold text-purple-400">{recent_activity.predicted_threats_count}</p>
            <p className="text-xs text-gray-400 mt-1">Predictions</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Quick Actions Available</h4>
        <div className="grid grid-cols-3 gap-3">
          <button
            disabled={!quick_actions.pause_enabled}
            className={`py-2 px-3 rounded font-medium text-sm transition ${
              quick_actions.pause_enabled
                ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {quick_actions.pause_enabled ? '⏸️ Pause' : '✓ Already Paused'}
          </button>
          <button
            disabled={!quick_actions.resume_enabled}
            className={`py-2 px-3 rounded font-medium text-sm transition ${
              quick_actions.resume_enabled
                ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {quick_actions.resume_enabled ? '▶️ Resume' : '✓ Running'}
          </button>
          <button
            disabled={!quick_actions.can_scan}
            className={`py-2 px-3 rounded font-medium text-sm transition ${
              quick_actions.can_scan
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {quick_actions.can_scan ? '🔍 Scan' : '⏸️ Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};
