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
import { GENLAYER_NETWORK, formatAddress, getContractAddress } from '../lib/config';
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'threats' | 'intelligence' | 'health' | 'wallet' | 'dapps' | 'approvals' | 'settings'
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
      setLastUpdated(new Date());
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
        <div className="text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  const contractAddress = getContractAddress();
  const threatRate = status.statistics.total_scans > 0
    ? Math.round((status.statistics.total_threats / status.statistics.total_scans) * 100)
    : 0;
  const statusLabel = status.system.paused
    ? 'Paused'
    : status.system.monitoring_enabled
      ? 'Monitoring'
      : 'Standby';
  const statusClass = status.system.paused
    ? 'status-pill--warn'
    : status.system.monitoring_enabled
      ? 'status-pill--ok'
      : 'status-pill--neutral';
  const lastUpdatedLabel = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '-';

  return (
    <div className="space-y-6">
      <section className="hero-panel rounded-3xl p-6 md:p-8 fade-rise">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <span className={`status-pill ${statusClass}`}>{statusLabel}</span>
              <span className="status-pill status-pill--neutral">Auto-refresh: 30s</span>
              <span className="status-pill status-pill--neutral">Threat Rate: {threatRate}%</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white">
                SecurityGuard Mission Control
              </h1>
              <p className="text-slate-200/80 mt-2">
                Real-time defense, predictive intelligence, and contract safety orchestration in one view.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-semibold shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
              >
                {loading ? 'Syncing...' : 'Sync Dashboard'}
              </button>
              <button
                onClick={() => setActiveTab('threats')}
                className="px-5 py-2.5 rounded-full border border-white/30 text-white/90 font-semibold hover:text-white hover:border-white/60 transition"
              >
                View Threat Feed
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:max-w-sm">
            <div className="hero-metric">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">Contract</p>
              <p className="font-mono text-sm text-white mt-2" title={contractAddress || 'Not configured'}>
                {contractAddress ? formatAddress(contractAddress, 16) : 'Not configured'}
              </p>
            </div>
            <div className="hero-metric">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">Owner</p>
              <p className="font-mono text-sm text-white mt-2" title={status.system.owner}>
                {formatAddress(status.system.owner, 16)}
              </p>
            </div>
            <div className="hero-metric">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">Network</p>
              <p className="text-sm text-white mt-2">{GENLAYER_NETWORK.chainName}</p>
            </div>
            <div className="hero-metric">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">Last Sync</p>
              <p className="text-sm text-white mt-2">{lastUpdatedLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="tabs-shell overflow-x-auto fade-rise stagger-1">
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
            className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <SystemDashboardCard dashboard={dashboard} loading={loading} />
          </div>
          <div className="fade-rise stagger-2">
            <StatusCard status={status} />
          </div>
          <div className="fade-rise stagger-3">
            <RiskCharts status={status} />
          </div>
        </div>
      )}

      {/* Threats & Predictions Tab */}
      {activeTab === 'threats' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <ThreatSummaryCard summary={threatSummary} loading={loading} />
          </div>
          <div className="fade-rise stagger-2">
            <ThreatPredictions prediction={predictions} loading={loading} />
          </div>
        </div>
      )}

      {/* Intelligence Tab */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <AIRecommendationsPanel recommendations={recommendations} loading={loading} />
          </div>
          <div className="fade-rise stagger-2">
            <IntelligencePanel intelligence={intelligence} patterns={patterns} loading={loading} />
          </div>
        </div>
      )}

      {/* Health Check Tab */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <HealthCheck report={health} loading={loading} />
          </div>
        </div>
      )}

      {/* Wallet Security Tab */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <WalletSecurityPanel />
          </div>
        </div>
      )}

      {/* dApp Monitoring Tab */}
      {activeTab === 'dapps' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <DAppMonitoringPanel />
          </div>
          <div className="fade-rise stagger-2">
            <ContractWatchManager />
          </div>
        </div>
      )}

      {/* Token Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <ApprovalAudit />
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="fade-rise stagger-1">
            <WebhookConfigPanel
              config={webhookConfig}
              onConfigure={configureWebhook}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={loadData}
        disabled={loading}
        className="w-full rounded-2xl border border-slate-300/60 bg-white/70 text-slate-900 font-semibold py-3 px-4 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
      >
        {loading ? 'Refreshing...' : '🔄 Refresh All Data'}
      </button>
    </div>
  );
};
