import { AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
import type { ScanResult } from '../types/contract';

interface ScanResultCardProps {
  result: ScanResult;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'text-red-500';
    case 'high':
      return 'text-orange-400';
    case 'medium':
      return 'text-yellow-400';
    case 'low':
    case 'none':
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
};

const getRiskBgColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'bg-red-500/10 border-red-500/50';
    case 'high':
      return 'bg-orange-500/10 border-orange-500/50';
    case 'medium':
      return 'bg-yellow-500/10 border-yellow-500/50';
    case 'low':
    case 'none':
      return 'bg-green-500/10 border-green-500/50';
    default:
      return 'bg-gray-500/10 border-gray-500/50';
  }
};

const getActionIcon = (action: string) => {
  switch (action) {
    case 'emergency_pause':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'blocked':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'bypassed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'threat_detected':
      return <AlertCircle className="w-5 h-5 text-orange-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

export const ScanResultCard = ({ result }: ScanResultCardProps) => {
  const riskColor = getRiskColor(result.threat_level);
  const bgColor = getRiskBgColor(result.threat_level);

  return (
    <div className={`glass rounded-lg p-6 border ${bgColor} mb-4`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getActionIcon(result.action_taken)}
          <div>
            <p className="text-gray-400 text-sm">Scan #{result.scan_id}</p>
            <p className={`text-xl font-bold ${riskColor}`}>
              {result.status.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Risk Score</p>
          <p className={`text-3xl font-bold ${riskColor}`}>{result.risk_score}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Threat Level</p>
          <p className={`text-lg font-semibold ${riskColor}`}>{result.threat_level.toUpperCase()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Action Taken</p>
          <p className="text-lg font-semibold text-blue-400">{result.action_taken}</p>
        </div>
      </div>

      {result.exploits_detected && result.exploits_detected.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">Exploits Detected:</p>
          <div className="flex flex-wrap gap-2">
            {result.exploits_detected.map((exploit, i) => (
              <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                {exploit}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.explanation && (
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">Analysis:</p>
          <p className="text-gray-300 text-sm">{result.explanation}</p>
        </div>
      )}

      {result.paused_this_scan && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-4">
          <p className="text-red-400 font-semibold text-sm">⚠️ System Emergency Pause Triggered</p>
        </div>
      )}

      {result.system_paused && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-2">
          <p className="text-red-400 text-sm">System is currently paused</p>
        </div>
      )}
    </div>
  );
};
