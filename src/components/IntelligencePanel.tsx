import { AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import type { ThreatIntelligence, PatternAnalysis } from '../types/contract';

interface IntelligencePanelProps {
  intelligence?: ThreatIntelligence | null;
  patterns?: PatternAnalysis | null;
  loading: boolean;
}

const getThreatColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'text-red-500 bg-red-500/10 border-red-500/50';
    case 'high':
      return 'text-orange-400 bg-orange-500/10 border-orange-500/50';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50';
    case 'low':
      return 'text-green-400 bg-green-500/10 border-green-500/50';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/50';
  }
};

export const IntelligencePanel = ({ intelligence, patterns, loading }: IntelligencePanelProps) => {
  if (loading) {
    return (
      <div className="glass rounded-lg p-6 text-center">
        <p className="text-gray-400">Loading intelligence...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Threat Intelligence */}
      {intelligence && (
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h3 className="text-lg font-bold text-orange-400">Global Threat Intelligence</h3>
          </div>

          <div className={`border rounded-lg p-4 mb-4 ${getThreatColor(intelligence.intelligence.threat_level)}`}>
            <p className="text-sm text-gray-400 mb-1">Current Threat Level</p>
            <p className="text-2xl font-bold">{intelligence.intelligence.threat_level.toUpperCase()}</p>
          </div>

          {intelligence.intelligence.active_threats.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2 font-semibold">Active Threats:</p>
              <div className="space-y-2">
                {intelligence.intelligence.active_threats.map((threat, i) => (
                  <div key={i} className="bg-red-500/10 border border-red-500/30 rounded px-3 py-2 text-red-400 text-sm">
                    • {threat}
                  </div>
                ))}
              </div>
            </div>
          )}

          {intelligence.intelligence.recommendations.length > 0 && (
            <div>
              <p className="text-gray-400 text-sm mb-2 font-semibold">Recommendations:</p>
              <div className="space-y-2">
                {intelligence.intelligence.recommendations.map((rec, i) => (
                  <div key={i} className="bg-blue-500/10 border border-blue-500/30 rounded px-3 py-2 text-blue-400 text-sm">
                    ✓ {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {intelligence.intelligence.summary && (
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm">{intelligence.intelligence.summary}</p>
            </div>
          )}
        </div>
      )}

      {/* Pattern Analysis */}
      {patterns && patterns.status !== 'insufficient_data' && (
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold text-blue-400">Pattern Analysis</h3>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <p className="text-gray-400 text-sm mb-1">System Health</p>
            <p className={`text-lg font-bold ${patterns.patterns.system_health === 'excellent' ? 'text-green-400' : patterns.patterns.system_health === 'good' ? 'text-blue-400' : 'text-yellow-400'}`}>
              {patterns.patterns.system_health.toUpperCase()}
            </p>
          </div>

          {patterns.patterns.common_exploits.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2 font-semibold">Common Exploits:</p>
              <div className="space-y-2">
                {patterns.patterns.common_exploits.slice(0, 3).map((exploit, i) => (
                  <div key={i} className="bg-orange-500/10 border border-orange-500/30 rounded px-3 py-2 text-orange-400 text-sm">
                    ⚠ {exploit}
                  </div>
                ))}
              </div>
            </div>
          )}

          {patterns.patterns.optimization_suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2 font-semibold">Suggestions:</p>
              <div className="space-y-2">
                {patterns.patterns.optimization_suggestions.slice(0, 3).map((suggestion, i) => (
                  <div key={i} className="bg-green-500/10 border border-green-500/30 rounded px-3 py-2 text-green-400 text-sm text-xs">
                    → {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}

          {patterns.patterns.emerging_threats.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm font-semibold mb-2">Emerging Threats:</p>
              <p className="text-red-400 text-xs">{patterns.patterns.emerging_threats.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      {/* Insufficient Data */}
      {patterns && patterns.status === 'insufficient_data' && (
        <div className="glass rounded-lg p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">Need more data for pattern analysis</p>
            <p className="text-gray-500 text-sm">Continue scanning transactions to unlock pattern analysis</p>
          </div>
        </div>
      )}
    </div>
  );
};
