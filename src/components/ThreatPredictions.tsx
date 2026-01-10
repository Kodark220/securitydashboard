import type { ThreatPrediction } from '../types/contract';

interface ThreatPredictionsProps {
  prediction: ThreatPrediction | null;
  loading?: boolean;
}

export const ThreatPredictions = ({ prediction, loading = false }: ThreatPredictionsProps) => {
  if (!prediction) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-400">
        {loading ? 'Analyzing threat predictions...' : 'No predictions available'}
      </div>
    );
  }

  const { threat_prediction, action_required } = prediction;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    if (confidence >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'bg-red-500/20 border-red-500/30 text-red-400';
    if (risk >= 60) return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
    if (risk >= 40) return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
    return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">🔮</span>
          Proactive Threat Predictions
        </h3>
        {action_required && (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30">
            ⚠️ ACTION REQUIRED
          </span>
        )}
      </div>

      {/* Escalation Risk */}
      <div className={`p-4 rounded-lg border ${getRiskColor(threat_prediction.escalation_risk)}`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold">Risk Escalation Probability</h4>
          <span className="text-3xl font-bold">{threat_prediction.escalation_risk}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${getConfidenceColor(threat_prediction.escalation_risk)}`}
            style={{ width: `${threat_prediction.escalation_risk}%` }}
          />
        </div>
        <p className="text-sm mt-2">
          {threat_prediction.escalation_risk >= 70
            ? '🚨 High probability of threat escalation'
            : threat_prediction.escalation_risk >= 40
              ? '⚠️ Moderate risk of escalation'
              : '✅ Low risk of escalation'}
        </p>
      </div>

      {/* Predicted Attacks */}
      {threat_prediction.predicted_attacks.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-red-400 flex items-center gap-2">
            🎯 Predicted Attack Types
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {threat_prediction.predicted_attacks.map((attack, idx) => (
              <div
                key={idx}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-300 text-sm font-medium"
              >
                • {attack}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High Risk Patterns */}
      {threat_prediction.high_risk_patterns.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-orange-400 flex items-center gap-2">
            🔍 Pre-Attack Patterns Detected
          </h4>
          <div className="space-y-2">
            {threat_prediction.high_risk_patterns.map((pattern, idx) => (
              <div key={idx} className="p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                <p className="text-orange-300 text-sm">{pattern}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confidence */}
      <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
        <div className="flex-1">
          <p className="text-sm text-gray-300">Prediction Confidence</p>
          <p className="text-2xl font-bold text-white">{threat_prediction.confidence}%</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Based on historical patterns</p>
          <p className="text-lg mt-1">
            {threat_prediction.confidence >= 80
              ? '🟢 High Confidence'
              : threat_prediction.confidence >= 60
                ? '🟡 Moderate Confidence'
                : '🔵 Low Confidence'}
          </p>
        </div>
      </div>

      {/* Preventive Actions */}
      {threat_prediction.preventive_actions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-green-400 flex items-center gap-2">
            ✅ Recommended Preventive Actions
          </h4>
          <ul className="space-y-2">
            {threat_prediction.preventive_actions.map((action, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 bg-green-500/10 rounded border border-green-500/30"
              >
                <span className="text-lg mt-1">✓</span>
                <span className="text-sm text-green-200">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alert Status */}
      <div className="p-4 rounded-lg bg-gray-700">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Prediction Status:</span> {prediction.status}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Use these predictions to stay ahead of potential threats and prepare your defense strategy.
        </p>
      </div>
    </div>
  );
};
