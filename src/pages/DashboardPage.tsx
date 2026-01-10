import { useEffect, useState } from 'react';
import { StatusCard } from '../components/StatusCard';
import { RiskCharts } from '../components/RiskCharts';
import { IntelligencePanel } from '../components/IntelligencePanel';
import { SystemDashboardCard } from '../components/SystemDashboardCard';
import { ThreatSummaryCard } from '../components/ThreatSummary';
import { AIRecommendationsPanel } from '../components/AIRecommendations';
import { ThreatPredictions } from '../components/ThreatPredictions';
import { HealthCheck } from '../components/HealthCheck';
import { WebhookConfigPanel } from '../components/WebhookConfig';
import { WalletSecurityPanel } from '../components/WalletSecurityPanel';
import { DAppMonitoringPanel } from '../components/DAppMonitoringPanel';
import { ApprovalAudit } from '../components/ApprovalAudit';
import { ContractWatchManager } from '../components/ContractWatchManager';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type {
  SystemStatus,
  ThreatIntelligence,
  PatternAnalysis,
  SystemDashboard,
  ThreatSummary as ThreatSummaryType,
  AIRecommendations as AIRecommendationsType,
  ThreatPrediction,
  HealthCheckReport,
  WebhookConfig as WebhookConfigType,
} from '../types/contract';

export const DashboardPage = () => {
  const {
    getSystemStatus,
    getThreatIntelligence,
    analyzePatterns,
    getSystemDashboard,
    getThreatSummary,
    getAIRecommendations,
    predictThreatsProactive,
    systemHealthCheck,
    getWebhookConfig,
    configureWebhook,
    loading,
  } = useSecurityGuard();

  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [intelligence, setIntelligence] = useState<ThreatIntelligence | null>(null);
  const [patterns, setPatterns] = useState<PatternAnalysis | null>(null);
  const [dashboard, setDashboard] = useState<SystemDashboard | null>(null);
  const [threatSummary, setThreatSummary] = useState<ThreatSummaryType | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendationsType | null>(null);
  const [predictions, setPredictions] = useState<ThreatPrediction | null>(null);
  const [health, setHealth] = useState<HealthCheckReport | null>(null);
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfigType | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'threats' | 'intelligence' | 'health' | 'wallet' | 'dapps' | 'approvals' | 'settings'
  // ...existing code...
  >('overview');

  const loadData = async () => {
    try {
      setError('');
      const [
        statusData,
        intelData,
        patternData,
        dashboardData,
        threatData,
        recData,
        predData,
        healthData,
        webhookData,
      ] = await Promise.all([
        getSystemStatus(),
        getThreatIntelligence(),
        analyzePatterns(),
        getSystemDashboard(),
        getThreatSummary(),
        getAIRecommendations(),
        predictThreatsProactive(),
        systemHealthCheck(),
        getWebhookConfig(),
      ]);

      setStatus(statusData);
      setIntelligence(intelData);
      setPatterns(patternData);
      setDashboard(dashboardData);
      setThreatSummary(threatData);
      setRecommendations(recData);
      setPredictions(predData);
      setHealth(healthData);
      setWebhookConfig(webhookData);
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
        <p className="text-gray-400">AI-powered threat detection, proactive predictions & comprehensive monitoring</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-700 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'threats', label: '⚠️ Threats' },
          { id: 'intelligence', label: '🤖 Intelligence' },
          { id: 'health', label: '🏥 Health' },
          { id: 'wallet', label: '👛 Wallet' },
          { id: 'dapps', label: '🔗 dApps' },
          { id: 'approvals', label: '✅ Approvals' },
          { id: 'settings', label: '⚙️ Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <SystemDashboardCard dashboard={dashboard} loading={loading} />
          <StatusCard status={status} />
          <RiskCharts status={status} />
        </div>
      )}

      {/* Threats & Predictions Tab */}
      {activeTab === 'threats' && (
        <div className="space-y-6">
          <ThreatSummaryCard summary={threatSummary} loading={loading} />
          <ThreatPredictions prediction={predictions} loading={loading} />
        </div>
      )}

      {/* Intelligence Tab */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          <AIRecommendationsPanel recommendations={recommendations} loading={loading} />
          <IntelligencePanel intelligence={intelligence} patterns={patterns} loading={loading} />
        </div>
      )}

      {/* Health Check Tab */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <HealthCheck report={health} loading={loading} />
        </div>
      )}

      {/* Wallet Security Tab */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          <WalletSecurityPanel />
        </div>
      )}

      {/* dApp Monitoring Tab */}
      {activeTab === 'dapps' && (
        <div className="space-y-6">
          <DAppMonitoringPanel />
          <ContractWatchManager />
        </div>
      )}

      {/* Token Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <ApprovalAudit />
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <WebhookConfigPanel
            config={webhookConfig}
            onConfigure={configureWebhook}
            loading={loading}
          />
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={loadData}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Refreshing...' : '🔄 Refresh All Data'}
      </button>
    </div>
  );
};
