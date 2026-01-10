import React, { useState } from 'react';
import { useSecurityGuard } from '../hooks/useSecurityGuard';

export const ContractWatchManager: React.FC = () => {
  const { addContractToWatch, getContractRiskProfile, loading } = useSecurityGuard();
  const [contractAddr, setContractAddr] = useState('');
  const [contractName, setContractName] = useState('');
  const [riskCheckAddr, setRiskCheckAddr] = useState('');
  const [riskData, setRiskData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [checkedAddress, setCheckedAddress] = useState('');

  const handleAddContract = async () => {
    if (!contractAddr.trim() || !contractName.trim()) {
      setError('Please enter both contract address and name');
      return;
    }

    try {
      const result = await addContractToWatch(contractAddr, contractName);
      setSuccess(result.message);
      setContractAddr('');
      setContractName('');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contract');
      setSuccess(null);
    }
  };

  const handleCheckRisk = async () => {
    if (!riskCheckAddr.trim()) {
      setError('Please enter a contract address');
      return;
    }

    try {
      const result = await getContractRiskProfile(riskCheckAddr);
      setRiskData(result);
      setCheckedAddress(riskCheckAddr);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch risk profile');
      setRiskData(null);
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'low') return 'text-green-400';
    if (risk === 'medium') return 'text-yellow-400';
    if (risk === 'high') return 'text-orange-400';
    return 'text-red-400';
  };

  const getRiskBgColor = (risk: string) => {
    if (risk === 'low') return 'bg-green-900/30 border-green-700';
    if (risk === 'medium') return 'bg-yellow-900/30 border-yellow-700';
    if (risk === 'high') return 'bg-orange-900/30 border-orange-700';
    return 'bg-red-900/30 border-red-700';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Contract Watch Manager</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded text-green-300 text-sm">
          ✓ {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Contract */}
        <div className="bg-slate-700/50 rounded p-4">
          <h4 className="font-semibold text-white mb-4">Add Contract to Watch</h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Contract Address</label>
              <input
                type="text"
                value={contractAddr}
                onChange={(e) => setContractAddr(e.target.value)}
                placeholder="0x..."
                className="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm border border-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Contract Name</label>
              <input
                type="text"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder="e.g., Uniswap V2"
                className="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm border border-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleAddContract}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add to Watch List'}
            </button>
          </div>
        </div>

        {/* Check Risk */}
        <div className="bg-slate-700/50 rounded p-4">
          <h4 className="font-semibold text-white mb-4">Check Contract Risk</h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Contract Address</label>
              <input
                type="text"
                value={riskCheckAddr}
                onChange={(e) => setRiskCheckAddr(e.target.value)}
                placeholder="0x..."
                className="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm border border-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleCheckRisk}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Risk Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Risk Profile Results */}
      {riskData && checkedAddress && (
        <div className={`mt-6 rounded-lg p-4 border ${getRiskBgColor(riskData.risk)}`}>
          <h4 className="font-semibold text-white mb-4">
            Risk Profile for {riskData.name}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-700/50 rounded p-3">
              <p className="text-gray-400 text-xs mb-1">Risk Level</p>
              <p className={`text-lg font-bold ${getRiskColor(riskData.risk)}`}>
                {riskData.risk.toUpperCase()}
              </p>
            </div>

            <div className="bg-slate-700/50 rounded p-3">
              <p className="text-gray-400 text-xs mb-1">Type</p>
              <p className="text-white font-semibold">{riskData.type}</p>
            </div>

            <div className="bg-slate-700/50 rounded p-3">
              <p className="text-gray-400 text-xs mb-1">Audit Status</p>
              <p className="text-white font-semibold">{riskData.audit_needed ? 'Needed' : 'Good'}</p>
            </div>
          </div>

          {riskData.precautions && riskData.precautions.length > 0 && (
            <div className="bg-slate-700/30 rounded p-3">
              <p className="text-sm font-semibold text-gray-300 mb-2">Precautions:</p>
              <ul className="text-sm text-gray-400 space-y-1">
                {riskData.precautions.map((precaution: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">→</span>
                    <span>{precaution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-sm text-gray-300 mt-4">
            <strong>Recommendation:</strong> {riskData.recommendation}
          </p>
        </div>
      )}
    </div>
  );
};
