import type { HealthCheckReport } from '../types/contract';

interface HealthCheckProps {
  report: HealthCheckReport | null;
  loading?: boolean;
}

const severityColors = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const severityIcons = {
  critical: '🔴',
  high: '🟠',
  medium: '🟡',
  info: 'ℹ️',
};

export const HealthCheck = ({ report, loading = false }: HealthCheckProps) => {
  if (!report) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-400">
        {loading ? 'Loading health check...' : 'No health report available'}
      </div>
    );
  }

  const getHealthColor = () => {
    switch (report.health_status) {
      case 'excellent':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'fair':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'poor':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'critical':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-700 border-gray-600 text-gray-300';
    }
  };

  const getHealthIcon = () => {
    switch (report.health_status) {
      case 'excellent':
        return '✅';
      case 'fair':
        return '⚠️';
      case 'poor':
        return '⚠️';
      case 'critical':
        return '🔴';
      default:
        return '❓';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-2xl">🏥</span>
        System Health Check
      </h3>

      {/* Health Score */}
      <div className={`p-4 rounded-lg border ${getHealthColor()}`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold flex items-center gap-2">
            <span className="text-2xl">{getHealthIcon()}</span>
            {report.health_status.toUpperCase()}
          </h4>
          <span className="text-2xl font-bold">{report.health_score}/100</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              report.health_score >= 80
                ? 'bg-green-500'
                : report.health_score >= 60
                  ? 'bg-yellow-500'
                  : report.health_score >= 40
                    ? 'bg-orange-500'
                    : 'bg-red-500'
            }`}
            style={{ width: `${report.health_score}%` }}
          />
        </div>
        <p className="text-sm mt-2">
          {report.system_ready ? '✅ System is ready' : '⚠️ Issues detected - see below'}
        </p>
      </div>

      {/* Critical Issues */}
      {report.issues.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-red-400 flex items-center gap-2">
            🔴 Critical Issues ({report.issues.length})
          </h4>
          <div className="space-y-2">
            {report.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-3 rounded border ${severityColors[issue.severity as keyof typeof severityColors]}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{severityIcons[issue.severity as keyof typeof severityIcons]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{issue.issue}</p>
                    <p className="text-xs opacity-80 mt-1">Solution: {issue.solution}</p>
                    <p className="text-xs opacity-70 mt-1">Impact: {issue.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {report.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-orange-400 flex items-center gap-2">
            ⚠️ Warnings ({report.warnings.length})
          </h4>
          <div className="space-y-2">
            {report.warnings.map((warning, idx) => (
              <div
                key={idx}
                className={`p-3 rounded border ${severityColors[warning.severity as keyof typeof severityColors]}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{severityIcons[warning.severity as keyof typeof severityIcons]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{warning.issue}</p>
                    <p className="text-xs opacity-80 mt-1">Solution: {warning.solution}</p>
                    <p className="text-xs opacity-70 mt-1">Impact: {warning.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {report.improvements.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-400 flex items-center gap-2">
            💡 Improvements ({report.improvements.length})
          </h4>
          <div className="space-y-2">
            {report.improvements.map((improvement, idx) => (
              <div key={idx} className="p-3 rounded border border-blue-500/30 bg-blue-500/10">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{improvement.issue}</p>
                    <p className="text-xs opacity-80 mt-1">Suggestion: {improvement.solution}</p>
                    <p className="text-xs opacity-70 mt-1">Benefit: {improvement.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Good */}
      {report.issues.length === 0 &&
        report.warnings.length === 0 &&
        report.improvements.length === 0 && (
          <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-center">
            <p className="text-lg font-semibold">✅ All systems operational!</p>
            <p className="text-sm">No issues detected. System is running optimally.</p>
          </div>
        )}
    </div>
  );
};
