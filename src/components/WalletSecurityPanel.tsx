import React, { useCallback, useEffect, useState } from 'react';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import { formatAddress } from '../lib/config';
import type { WalletRiskDashboard, WalletSecurityScan } from '../types/contract';

interface WalletSecurityPanelProps {
  walletAddress?: string;
}

export const WalletSecurityPanel: React.FC<WalletSecurityPanelProps> = ({ walletAddress }) => {
  const { getWalletRiskDashboard, scanWalletSecurity } = useSecurityGuard();
  const [data, setData] = useState<WalletRiskDashboard | null>(null);
  const [scanResult, setScanResult] = useState<WalletSecurityScan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);

  const refreshDashboard = useCallback(async () => {
    if (!walletAddress) return;
    setIsLoading(true);
    try {
      const result = await getWalletRiskDashboard(walletAddress);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wallet security data');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, getWalletRiskDashboard]);

  const handleScan = async () => {
    if (!walletAddress) return;
    setScanLoading(true);
    setScanError(null);
    try {
      const result = await scanWalletSecurity(walletAddress);
      setScanResult(result);
    } catch (err) {
      setScanError(err instanceof Error ? err.message : 'Failed to scan wallet');
    } finally {
      setScanLoading(false);
    }
  };

  useEffect(() => {
    if (!walletAddress) {
      setData(null);
      setError(null);
      return;
    }
    refreshDashboard();
  }, [walletAddress, refreshDashboard]);

  if (!walletAddress) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white">Wallet Security Dashboard</h3>
        <p className="text-sm text-slate-200/70 mt-2">
          Connect a wallet to start monitoring activity and run wallet scans.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Wallet Security Dashboard</h3>
          <p className="text-sm text-slate-200/70 mt-1">
            Monitoring {formatAddress(walletAddress, 18)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleScan}
            disabled={scanLoading}
            className="px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow-md shadow-black/20 transition hover:-translate-y-0.5 disabled:opacity-70"
          >
            {scanLoading ? 'Scanning...' : 'Scan Wallet'}
          </button>
          <button
            onClick={refreshDashboard}
            disabled={isLoading}
            className="px-4 py-2 rounded-full border border-white/40 text-white font-semibold transition hover:border-white/70 disabled:opacity-70"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Metrics'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-slate-200/70 text-sm mb-1">Overall Status</p>
              <p className="text-2xl font-bold text-white">{data.overall_status}</p>
              <p className="text-slate-200/60 text-xs mt-1">Health Score: {data.health_score}/100</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-slate-200/70 text-sm mb-1">Total Contracts</p>
              <p className="text-2xl font-bold text-white">{data.security_metrics.total_contracts}</p>
              <p className="text-slate-200/60 text-xs mt-1">Under monitoring</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-white mb-3">Security Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Safe Contracts</span>
                <span className="text-white font-semibold">{data.security_metrics.safe_contracts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-300">Warning</span>
                <span className="text-white font-semibold">{data.security_metrics.warning_contracts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-300">High Risk</span>
                <span className="text-white font-semibold">{data.security_metrics.high_risk_contracts}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white">Latest Wallet Scan</h4>
              {scanResult && (
                <span className="text-xs text-slate-200/60">
                  Status: {scanResult.overall_status}
                </span>
              )}
            </div>
            {scanError && (
              <div className="mb-3 text-sm text-red-200">{scanError}</div>
            )}
            {scanResult ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-slate-200/70">Contracts Analyzed</p>
                  <p className="text-lg font-semibold text-white">{scanResult.contracts_analyzed}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-slate-200/70">High Risk</p>
                  <p className="text-lg font-semibold text-white">{scanResult.breakdown.high_risk_contracts}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-slate-200/70">Warnings</p>
                  <p className="text-lg font-semibold text-white">{scanResult.breakdown.warning_contracts}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-200/70">
                Run a wallet scan to generate a detailed security report.
              </p>
            )}
          </div>

          {data.pending_warnings.length > 0 && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-red-200 mb-2">Pending Warnings</h4>
              {data.pending_warnings.map((warning, idx) => (
                <div key={idx} className="text-sm text-red-100 mb-2">
                  <strong>{warning.dapp}</strong>: {warning.issue}
                </div>
              ))}
            </div>
          )}

          {data.actions_recommended.filter(Boolean).length > 0 && (
            <div className="bg-sky-500/10 border border-sky-300/20 rounded-xl p-4">
              <h4 className="font-semibold text-sky-100 mb-2">Recommendations</h4>
              <ul className="text-sm text-sky-100/80 space-y-1">
                {data.actions_recommended.filter(Boolean).map((action, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">-</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="text-sm text-slate-200/70">
          {isLoading ? 'Loading wallet security data...' : 'No data available.'}
        </div>
      )}
    </div>
  );
};
