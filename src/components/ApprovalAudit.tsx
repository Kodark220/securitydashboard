import React, { useEffect, useState } from 'react';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import { formatAddress } from '../lib/config';
import type { ApprovalSafetyReport } from '../types/contract';

interface ApprovalAuditProps {
  walletAddress?: string;
}

export const ApprovalAudit: React.FC<ApprovalAuditProps> = ({ walletAddress }) => {
  const { getApprovalSafetyReport } = useSecurityGuard();
  const [data, setData] = useState<ApprovalSafetyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getApprovalSafetyReport(walletAddress);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load approval data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [walletAddress, getApprovalSafetyReport]);

  if (!walletAddress) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Token Approval Audit</h3>
        <p className="text-sm text-slate-200/70">
          Connect a wallet to review token approvals and detect dangerous allowances.
        </p>
      </div>
    );
  }

  if (isLoading && !data) {
    return <div className="glass rounded-2xl p-6 text-slate-200/70">Loading approval audit...</div>;
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-6">
        <p className="text-red-200">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass rounded-2xl p-6 text-slate-200/70">
        No approval data available for {formatAddress(walletAddress, 16)}.
      </div>
    );
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'text-emerald-300';
    if (score >= 60) return 'text-amber-300';
    if (score >= 40) return 'text-orange-300';
    return 'text-red-300';
  };

  const getSafetyBgColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/10 border-emerald-400/30';
    if (score >= 60) return 'bg-amber-500/10 border-amber-400/30';
    if (score >= 40) return 'bg-orange-500/10 border-orange-400/30';
    return 'bg-red-500/10 border-red-400/30';
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Token Approval Audit</h3>
          <p className="text-sm text-slate-200/70 mt-1">
            Wallet: {formatAddress(walletAddress, 18)}
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-200/60">
          Live approval check
        </span>
      </div>

      <div className={`rounded-xl p-5 mb-6 border ${getSafetyBgColor(data.safety_score)}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-2xl font-bold ${getSafetyColor(data.safety_score)}`}>
            {data.overall_safety === 'safe' ? 'SAFE' : 'AT RISK'}
          </h4>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getSafetyColor(data.safety_score)}`}>
              {data.safety_score}%
            </p>
            <p className="text-slate-200/60 text-xs mt-1">Safety Score</p>
          </div>
        </div>

        <p className="text-sm text-slate-100/80">
          {data.approval_audit.recommendation}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-slate-200/70 text-sm mb-1">Dangerous Approvals</p>
          <p className="text-2xl font-bold text-white">{data.dangerous_approvals}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-slate-200/70 text-sm mb-1">Critical Risk</p>
          <p className="text-2xl font-bold text-white">{data.approval_audit.critical_risk ? 'Yes' : 'No'}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-slate-200/70 text-sm mb-1">Actions Required</p>
          <p className="text-2xl font-bold text-white">{data.actions_required}</p>
        </div>
      </div>

      {data.dangerous_details.length > 0 && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-red-200 mb-3">Dangerous Approvals Found</h4>
          <div className="space-y-2">
            {data.dangerous_details.map((detail, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-red-200 text-sm font-semibold">
                  {detail.token.slice(0, 6)}...{detail.token.slice(-4)}
                </p>
                <p className="text-slate-200/70 text-xs">
                  Spender: {detail.spender.slice(0, 6)}...{detail.spender.slice(-4)}
                </p>
                <p className="text-red-200 text-xs mt-1">Severity: {detail.severity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-sky-500/10 border border-sky-300/20 rounded-xl p-4">
        <h4 className="font-semibold text-sky-100 mb-3">Recommended Actions</h4>
        <ul className="space-y-2">
          {data.next_steps.map((step, idx) => (
            <li key={idx} className="text-sky-100/80 text-sm flex items-start">
              <span className="mr-2 flex-shrink-0">-</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
