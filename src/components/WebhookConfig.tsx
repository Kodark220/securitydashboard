import { useState } from 'react';
import type { WebhookConfig as WebhookConfigType } from '../types/contract';

interface WebhookConfigProps {
  config: WebhookConfigType | null;
  onConfigure: (url: string, enabled: boolean, minRisk: number) => Promise<any>;
  loading?: boolean;
}

export const WebhookConfigPanel = ({ config, onConfigure, loading = false }: WebhookConfigProps) => {
  const [url, setUrl] = useState(config?.url || '');
  const [enabled, setEnabled] = useState(config?.enabled || false);
  const [minRisk, setMinRisk] = useState(config?.min_risk_threshold || 70);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!url && enabled) {
      setMessage('Please enter a webhook URL');
      return;
    }

    setIsSaving(true);
    setMessage('');
    try {
      await onConfigure(url, enabled, minRisk);
      setMessage('Webhook configuration saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-xl">🔔</span>
        Webhook Notifications
      </h3>

      <div className="space-y-4">
        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Webhook URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-server.com/webhook"
            disabled={loading || isSaving}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
          <p className="text-xs text-gray-400 mt-1">
            Receives POST requests when threats are detected
          </p>
        </div>

        {/* Min Risk Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Risk Score to Alert: {minRisk}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={minRisk}
            onChange={(e) => setMinRisk(parseInt(e.target.value))}
            disabled={loading || isSaving}
            className="w-full disabled:opacity-50"
          />
          <p className="text-xs text-gray-400 mt-1">
            Only send alerts for threats with risk score ≥ {minRisk}
          </p>
        </div>

        {/* Enable Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEnabled(!enabled)}
            disabled={loading || isSaving}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              enabled ? 'bg-blue-600' : 'bg-gray-600'
            } disabled:opacity-50`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-300">
            {enabled ? 'Webhooks Enabled' : 'Webhooks Disabled'}
          </span>
        </div>

        {/* Status */}
        {config && (
          <div className="text-xs text-gray-400 p-2 bg-gray-700 rounded">
            <p>Current Status: {config.enabled ? '✅ Active' : '⏹️ Inactive'}</p>
            {config.url && <p>URL: {config.url}</p>}
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            className={`text-sm p-2 rounded ${
              message.includes('successfully')
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading || isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
};
