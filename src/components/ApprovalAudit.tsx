import React, { useEffect, useState } from 'react';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { ApprovalSafetyReport } from '../types/contract';

interface ApprovalAuditProps {
  walletAddress?: string;
}

export const ApprovalAudit: React.FC<ApprovalAuditProps> = ({ 
  walletAddress = '0xuser1234567890abcdef1234567890abcdef12' 
}) => {
  const { getApprovalSafetyReport, loading } = useSecurityGuard();
  const [data, setData] = useState<ApprovalSafetyReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getApprovalSafetyReport(walletAddress);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load approval data');
      }
    };

    fetchData();
  }, [walletAddress, getApprovalSafetyReport]);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading approval audit...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-gray-400">No approval data available</div>;
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSafetyBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/30';
    if (score >= 60) return 'bg-yellow-900/30';
    if (score >= 40) return 'bg-orange-900/30';
    return 'bg-red-900/30';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Token Approval Audit</h3>

      <div className={`rounded-lg p-6 mb-6 border ${getSafetyBgColor(data.safety_score)} ${
        data.overall_safety === 'safe' 
          ? 'border-green-700' 
          : 'border-red-700'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className={`text-2xl font-bold ${getSafetyColor(data.safety_score)}`}>
            {data.overall_safety === 'safe' ? '✅ SAFE' : '⚠️ AT RISK'}
          </h4>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getSafetyColor(data.safety_score)}`}>
              {data.safety_score}%
            </p>
            <p className="text-gray-400 text-xs mt-1">Safety Score</p>
          </div>
        </div>

        <p className={`text-sm ${
          data.overall_safety === 'safe' 
            ? 'text-green-300' 
            : 'text-red-300'
        }`}>
          {data.approval_audit.recommendation}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded p-4">
          <p className="text-gray-400 text-sm mb-1">Dangerous Approvals</p>
          <p className="text-2xl font-bold text-white">{data.dangerous_approvals}</p>
        </div>

        <div className="bg-slate-700/50 rounded p-4">
          <p className="text-gray-400 text-sm mb-1">Critical Risk</p>
          <p className="text-2xl font-bold text-white">{data.approval_audit.critical_risk ? 'YES' : 'NO'}</p>
        </div>

        <div className="bg-slate-700/50 rounded p-4">
          <p className="text-gray-400 text-sm mb-1">Actions Required</p>
          <p className="text-2xl font-bold text-white">{data.actions_required}</p>
        </div>
      </div>

      {data.dangerous_details.length > 0 && (
        <div className="bg-red-900/30 border border-red-700 rounded p-4 mb-6">
          <h4 className="font-semibold text-red-300 mb-3">⚠️ Dangerous Approvals Found</h4>
          <div className="space-y-2">
            {data.dangerous_details.map((detail, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded p-3">
                <p className="text-red-300 text-sm font-semibold">
                  {detail.token.slice(0, 6)}...{detail.token.slice(-4)}
                </p>
                <p className="text-gray-400 text-xs">
                  Spender: {detail.spender.slice(0, 6)}...{detail.spender.slice(-4)}
                </p>
                <p className="text-red-400 text-xs mt-1">Severity: {detail.severity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
        <h4 className="font-semibold text-blue-300 mb-3">📋 Recommended Actions</h4>
        <ul className="space-y-2">
          {data.next_steps.map((step, idx) => (
            <li key={idx} className="text-blue-200 text-sm flex items-start">
              <span className="mr-2 flex-shrink-0">→</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
