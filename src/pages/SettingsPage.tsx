import { useEffect, useState } from 'react';
import { AdminControls } from '../components/AdminControls';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { SystemStatus } from '../types/contract';

export const SettingsPage = () => {
  const {
    getSystemStatus,
    emergencyPause,
    resumeSystem,
    loading,
  } = useSecurityGuard();

  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [error, setError] = useState('');

  const loadStatus = async () => {
    try {
      const statusData = await getSystemStatus();
      setStatus(statusData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">System Settings</h1>
        <p className="text-slate-600">Configure security parameters and manage access</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <AdminControls
        status={status}
        onEmergencyPause={emergencyPause}
        onResume={resumeSystem}
        onAddOperator={async (addr) => {
          // Mock implementation - would call actual API
          console.log('Add operator:', addr);
        }}
        onBlacklistAddress={async (addr) => {
          // Mock implementation - would call actual API
          console.log('Blacklist:', addr);
        }}
        onWhitelistAddress={async (addr) => {
          // Mock implementation - would call actual API
          console.log('Whitelist:', addr);
        }}
        onUpdateThresholds={async (crit, high, med) => {
          // Mock implementation - would call actual API
          console.log('Update thresholds:', { crit, high, med });
        }}
        loading={loading}
      />

      <div className="glass rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Webhook Configuration</h2>
        <p className="text-gray-400 text-sm mb-4">Configure webhook notifications for high-risk threats</p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Webhook URL</label>
            <input
              type="text"
              placeholder="https://your-webhook-url.com/alerts"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Minimum Risk Score to Alert (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              defaultValue="70"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Enable Webhooks
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg transition">
              Test Webhook
            </button>
          </div>
        </div>
      </div>

      <div className="glass rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-400">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Owner Address</p>
            <p className="text-gray-100 font-mono text-sm break-all">{status.system.owner}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Monitoring Status</p>
            <p className={`text-lg font-semibold ${status.system.monitoring_enabled ? 'text-green-400' : 'text-gray-400'}`}>
              {status.system.monitoring_enabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Total Operators</p>
            <p className="text-2xl font-bold text-blue-400">{status.counts.operators}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Tracked Addresses</p>
            <p className="text-2xl font-bold text-cyan-300">{status.counts.tracked_addresses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
