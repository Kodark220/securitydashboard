import React, { useEffect, useState } from 'react';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { WalletRiskDashboard } from '../types/contract';

interface WalletSecurityPanelProps {
  walletAddress?: string;
}

export const WalletSecurityPanel: React.FC<WalletSecurityPanelProps> = ({ 
  walletAddress = '0xuser1234567890abcdef1234567890abcdef12' 
}) => {
  const { getWalletRiskDashboard, loading } = useSecurityGuard();
  const [data, setData] = useState<WalletRiskDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWalletRiskDashboard(walletAddress);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load wallet security data');
      }
    };

    fetchData();
  }, [walletAddress, getWalletRiskDashboard]);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading wallet security data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-gray-400">No data available</div>;
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Wallet Security Dashboard</h3>
        <span className="text-2xl">{data.status_icon}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-700/50 rounded p-4">
          <p className="text-gray-400 text-sm mb-1">Overall Status</p>
          <p className="text-2xl font-bold text-white">{data.overall_status}</p>
          <p className="text-gray-500 text-xs mt-1">Health Score: {data.health_score}/100</p>
        </div>

        <div className="bg-slate-700/50 rounded p-4">
          <p className="text-gray-400 text-sm mb-1">Total Contracts</p>
          <p className="text-2xl font-bold text-white">{data.security_metrics.total_contracts}</p>
          <p className="text-gray-500 text-xs mt-1">Under Monitoring</p>
        </div>
      </div>

      <div className="bg-slate-700/30 rounded p-4 mb-6">
        <h4 className="font-semibold text-white mb-3">Security Breakdown</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-green-400">🟢 Safe Contracts</span>
            <span className="text-white font-semibold">{data.security_metrics.safe_contracts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-400">🟡 Warning</span>
            <span className="text-white font-semibold">{data.security_metrics.warning_contracts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-400">🔴 High Risk</span>
            <span className="text-white font-semibold">{data.security_metrics.high_risk_contracts}</span>
          </div>
        </div>
      </div>

      {data.pending_warnings.length > 0 && (
        <div className="bg-red-900/30 border border-red-700 rounded p-4">
          <h4 className="font-semibold text-red-300 mb-2">⚠️ Pending Warnings</h4>
          {data.pending_warnings.map((warning, idx) => (
            <div key={idx} className="text-sm text-red-200 mb-2">
              <strong>{warning.dapp}</strong>: {warning.issue}
            </div>
          ))}
        </div>
      )}

      {data.actions_recommended.filter(Boolean).length > 0 && (
        <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded p-4">
          <h4 className="font-semibold text-blue-300 mb-2">💡 Recommendations</h4>
          <ul className="text-sm text-blue-200 space-y-1">
            {data.actions_recommended.filter(Boolean).map((action, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">→</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
