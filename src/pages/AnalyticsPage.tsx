import { useEffect, useState } from 'react';
import { RiskCharts } from '../components/RiskCharts';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { SystemStatus, AddressRisk } from '../types/contract';
import { Search } from 'lucide-react';

export const AnalyticsPage = () => {
  const { getSystemStatus, getAddressRisk } = useSecurityGuard();
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [addressRisk, setAddressRisk] = useState<AddressRisk | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');

  const loadStatus = async () => {
    try {
      const statusData = await getSystemStatus();
      setStatus(statusData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    }
  };

  const handleSearchAddress = async () => {
    if (!searchAddress) return;

    setSearchLoading(true);
    try {
      const risk = await getAddressRisk(searchAddress);
      setAddressRisk(risk);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get address risk');
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 85) return 'text-red-500';
    if (score >= 70) return 'text-orange-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Insights</h1>
        <p className="text-slate-600">Detailed security metrics and address risk analysis</p>
      </div>

      {/* Address Search */}
      <div className="glass rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Address Risk Lookup</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            placeholder="Enter address (0x...)"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSearchAddress}
            disabled={searchLoading || !searchAddress}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>

        {addressRisk && (
          <div className={`border rounded-lg p-6 ${addressRisk.risk_score >= 50 ? 'bg-red-500/10 border-red-500/50' : 'bg-green-500/10 border-green-500/50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Address</p>
                <p className="text-gray-100 font-mono text-sm break-all">{addressRisk.address}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Risk Score</p>
                <p className={`text-3xl font-bold ${getRiskColor(addressRisk.risk_score)}`}>
                  {addressRisk.risk_score}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Threat Level</p>
                <p className={`text-lg font-semibold ${getRiskColor(addressRisk.risk_score)}`}>
                  {addressRisk.threat_level.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Status</p>
                <div className="space-y-1">
                  <p className={`text-sm ${addressRisk.blacklisted ? 'text-red-400' : 'text-gray-400'}`}>
                    {addressRisk.blacklisted ? '🔴 Blacklisted' : '✓ Not blacklisted'}
                  </p>
                  <p className={`text-sm ${addressRisk.whitelisted ? 'text-green-400' : 'text-gray-400'}`}>
                    {addressRisk.whitelisted ? '✓ Whitelisted' : '○ Not whitelisted'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {status && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">System Metrics</h2>
          <RiskCharts status={status} />
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};
