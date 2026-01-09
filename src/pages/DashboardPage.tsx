import { useEffect, useState } from 'react';
import { StatusCard } from '../components/StatusCard';
import { RiskCharts } from '../components/RiskCharts';
import { IntelligencePanel } from '../components/IntelligencePanel';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { SystemStatus, ThreatIntelligence, PatternAnalysis } from '../types/contract';

export const DashboardPage = () => {
  const { getSystemStatus, getThreatIntelligence, analyzePatterns, loading } = useSecurityGuard();
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [intelligence, setIntelligence] = useState<ThreatIntelligence | null>(null);
  const [patterns, setPatterns] = useState<PatternAnalysis | null>(null);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      const [statusData, intelData, patternData] = await Promise.all([
        getSystemStatus(),
        getThreatIntelligence(),
        analyzePatterns(),
      ]);
      setStatus(statusData);
      setIntelligence(intelData);
      setPatterns(patternData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
        <p className="text-red-400 font-semibold">Error: {error}</p>
        <button
          onClick={loadData}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
        <p className="text-gray-400">Real-time threat monitoring and AI-powered security analysis</p>
      </div>

      <StatusCard status={status} />

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Analytics</h2>
          <RiskCharts status={status} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Intelligence & Analysis</h2>
          <IntelligencePanel intelligence={intelligence} patterns={patterns} loading={loading} />
        </div>
      </div>

      <button
        onClick={loadData}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>
  );
};
