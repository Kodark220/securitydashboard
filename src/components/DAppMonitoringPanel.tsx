import React, { useEffect, useState } from 'react';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { DAppMonitoring } from '../types/contract';

export const DAppMonitoringPanel: React.FC = () => {
  const { monitorDappContracts, loading } = useSecurityGuard();
  const [data, setData] = useState<DAppMonitoring | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await monitorDappContracts();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dApp data');
      }
    };

    fetchData();
  }, [monitorDappContracts]);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading dApp monitoring data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-gray-400">No dApps being monitored</div>;
  }

  const riskSummary = {
    safe: data.safe_dapps,
    warning: data.total_dapps_monitored - data.safe_dapps - data.high_risk_dapps,
    critical: data.high_risk_dapps,
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">dApp Monitoring Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded p-4">
          <p className="text-gray-400 text-sm mb-1">Total dApps</p>
          <p className="text-2xl font-bold text-white">{data.total_dapps_monitored}</p>
        </div>

        <div className="bg-green-900/30 rounded p-4">
          <p className="text-green-400 text-sm mb-1">🟢 Safe</p>
          <p className="text-2xl font-bold text-green-300">{riskSummary.safe}</p>
        </div>

        <div className="bg-yellow-900/30 rounded p-4">
          <p className="text-yellow-400 text-sm mb-1">🟡 Warning</p>
          <p className="text-2xl font-bold text-yellow-300">{riskSummary.warning}</p>
        </div>

        <div className="bg-red-900/30 rounded p-4">
          <p className="text-red-400 text-sm mb-1">🔴 High Risk</p>
          <p className="text-2xl font-bold text-red-300">{data.high_risk_dapps}</p>
        </div>
      </div>

      {data.require_audit > 0 && (
        <div className="bg-orange-900/30 border border-orange-700 rounded p-4 mb-6">
          <p className="text-orange-300 font-semibold">⚠️ {data.require_audit} dApp(s) require audit</p>
          <p className="text-orange-200 text-sm mt-2">Consider reviewing and potentially auditing these contracts</p>
        </div>
      )}

      {data.dapp_list.length > 0 ? (
        <div className="bg-slate-700/30 rounded p-4">
          <h4 className="font-semibold text-white mb-4">Monitored dApps</h4>
          <div className="space-y-3">
            {data.dapp_list.map((dapp, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded p-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{dapp.name}</p>
                  <p className="text-xs text-gray-400">Type: {dapp.type}</p>
                  {dapp.red_flags > 0 && (
                    <p className="text-xs text-red-400">⚠️ {dapp.red_flags} red flags</p>
                  )}
                </div>
                <span className={
                  dapp.risk === 'low' ? 'text-green-400 font-bold' :
                  dapp.risk === 'medium' ? 'text-yellow-400 font-bold' :
                  'text-red-400 font-bold'
                }>
                  {dapp.risk.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">
          No dApps currently monitored
        </div>
      )}

      {data.alerts > 0 && (
        <div className="mt-4 bg-red-900/30 border border-red-700 rounded p-4">
          <p className="text-red-300 font-semibold">🔔 {data.alerts} Active Alerts</p>
          <p className="text-red-200 text-sm mt-1">Action required on {data.action_items} items</p>
        </div>
      )}
    </div>
  );
};
