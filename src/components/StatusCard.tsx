import { AlertTriangle, Shield, Activity, Eye } from 'lucide-react';
import type { SystemStatus } from '../types/contract';

interface StatusCardProps {
  status: SystemStatus;
}

export const StatusCard = ({ status }: StatusCardProps) => {
  const isPaused = status.system.paused;
  const threatCount = status.statistics.total_threats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* System Status */}
      <div className={`glass rounded-lg p-6 ${isPaused ? 'ring-2 ring-red-500' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">System Status</p>
            <p className={`text-2xl font-bold ${isPaused ? 'text-red-400' : 'text-green-400'}`}>
              {isPaused ? 'PAUSED' : 'ACTIVE'}
            </p>
          </div>
          <Shield className={`w-10 h-10 ${isPaused ? 'text-red-400' : 'text-green-400'}`} />
        </div>
      </div>

      {/* Total Scans */}
      <div className="glass rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">Total Scans</p>
            <p className="text-2xl font-bold text-blue-400">{status.statistics.total_scans}</p>
          </div>
          <Activity className="w-10 h-10 text-blue-400" />
        </div>
      </div>

      {/* Threats Detected */}
      <div className={`glass rounded-lg p-6 ${threatCount > 10 ? 'ring-2 ring-orange-500' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">Threats Detected</p>
            <p className={`text-2xl font-bold ${threatCount > 0 ? 'text-orange-400' : 'text-green-400'}`}>
              {status.statistics.total_threats}
            </p>
          </div>
          <AlertTriangle className={`w-10 h-10 ${threatCount > 0 ? 'text-orange-400' : 'text-green-400'}`} />
        </div>
      </div>

      {/* Emergency Pauses */}
      <div className="glass rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">Emergency Pauses</p>
            <p className={`text-2xl font-bold ${status.statistics.total_pauses > 0 ? 'text-red-400' : 'text-gray-400'}`}>
              {status.statistics.total_pauses}
            </p>
          </div>
          <Eye className={`w-10 h-10 ${status.statistics.total_pauses > 0 ? 'text-red-400' : 'text-gray-400'}`} />
        </div>
      </div>
    </div>
  );
};
