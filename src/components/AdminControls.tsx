import { AlertTriangle, Lock, Unlock, Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { SystemStatus } from '../types/contract';

interface AdminControlsProps {
  status: SystemStatus;
  onEmergencyPause: (reason: string) => Promise<any>;
  onResume: (justification: string) => Promise<any>;
  onAddOperator: (address: string) => Promise<any>;
  onBlacklistAddress: (address: string) => Promise<any>;
  onWhitelistAddress: (address: string) => Promise<any>;
  onUpdateThresholds: (critical: number, high: number, medium: number) => Promise<any>;
  loading: boolean;
}

export const AdminControls = ({
  status,
  onEmergencyPause,
  onResume,
  onAddOperator,
  onBlacklistAddress,
  onWhitelistAddress,
  onUpdateThresholds,
  loading,
}: AdminControlsProps) => {
  const [activeTab, setActiveTab] = useState<'pause' | 'operators' | 'lists' | 'thresholds'>('pause');
  const [pauseReason, setPauseReason] = useState('');
  const [resumeJustification, setResumeJustification] = useState('');
  const [newOperator, setNewOperator] = useState('');
  const [blacklistAddr, setBlacklistAddr] = useState('');
  const [whitelistAddr, setWhitelistAddr] = useState('');
  const [critThreshold, setCritThreshold] = useState(status.thresholds.critical);
  const [highThreshold, setHighThreshold] = useState(status.thresholds.high);
  const [medThreshold, setMedThreshold] = useState(status.thresholds.medium);
  const [message, setMessage] = useState('');

  const handlePause = async () => {
    try {
      await onEmergencyPause(pauseReason);
      setMessage('Success: System paused successfully');
      setPauseReason('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to pause system');
    }
  };

  const handleResume = async () => {
    try {
      await onResume(resumeJustification);
      setMessage('Success: System resumed successfully');
      setResumeJustification('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to resume system');
    }
  };

  const handleAddOperator = async () => {
    try {
      await onAddOperator(newOperator);
      setMessage('Success: Operator added successfully');
      setNewOperator('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to add operator');
    }
  };

  const handleBlacklist = async () => {
    try {
      await onBlacklistAddress(blacklistAddr);
      setMessage('Success: Address blacklisted');
      setBlacklistAddr('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to blacklist address');
    }
  };

  const handleWhitelist = async () => {
    try {
      await onWhitelistAddress(whitelistAddr);
      setMessage('Success: Address whitelisted');
      setWhitelistAddr('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to whitelist address');
    }
  };

  const handleUpdateThresholds = async () => {
    try {
      await onUpdateThresholds(critThreshold, highThreshold, medThreshold);
      setMessage('Success: Thresholds updated');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to update thresholds');
    }
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-6 h-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-orange-400">Admin Controls</h2>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-700">
        {(['pause', 'operators', 'lists', 'thresholds'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === tab
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-semibold ${
          message.startsWith('Success:') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* Pause Controls */}
      {activeTab === 'pause' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${status.system.paused ? 'bg-red-500/10 border-red-500/50' : 'bg-green-500/10 border-green-500/50'}`}>
            <p className={`font-semibold ${status.system.paused ? 'text-red-400' : 'text-green-400'}`}>
              {status.system.paused ? '🔴 System is PAUSED' : '🟢 System is ACTIVE'}
            </p>
          </div>

          {!status.system.paused ? (
            <div>
              <label className="block text-gray-400 text-sm mb-2">Pause Reason</label>
              <textarea
                value={pauseReason}
                onChange={(e) => setPauseReason(e.target.value)}
                placeholder="Explain why you are pausing the system..."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={handlePause}
                disabled={loading || !pauseReason}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Lock className="w-5 h-5" />
                Emergency Pause System
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-gray-400 text-sm mb-2">Resume Justification</label>
              <textarea
                value={resumeJustification}
                onChange={(e) => setResumeJustification(e.target.value)}
                placeholder="Explain why the system is safe to resume..."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-green-500 focus:outline-none"
              />
              <button
                onClick={handleResume}
                disabled={loading || !resumeJustification}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Unlock className="w-5 h-5" />
                Resume System
              </button>
            </div>
          )}
        </div>
      )}

      {/* Operators */}
      {activeTab === 'operators' && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Current Operators: {status.counts.operators}</p>
            <p className="text-gray-500 text-xs">Owner: {status.system.owner.slice(0, 10)}...</p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Add New Operator</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newOperator}
                onChange={(e) => setNewOperator(e.target.value)}
                placeholder="0x..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddOperator}
                disabled={loading || !newOperator}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lists */}
      {activeTab === 'lists' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Blacklisted</p>
              <p className="text-2xl font-bold text-red-400">{status.counts.blacklisted}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Whitelisted</p>
              <p className="text-2xl font-bold text-green-400">{status.counts.whitelisted}</p>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Blacklist Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={blacklistAddr}
                onChange={(e) => setBlacklistAddr(e.target.value)}
                placeholder="0x..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={handleBlacklist}
                disabled={loading || !blacklistAddr}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Whitelist Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={whitelistAddr}
                onChange={(e) => setWhitelistAddr(e.target.value)}
                placeholder="0x..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-green-500 focus:outline-none"
              />
              <button
                onClick={handleWhitelist}
                disabled={loading || !whitelistAddr}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thresholds */}
      {activeTab === 'thresholds' && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-3">Adjust risk thresholds for threat detection</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Critical Threshold (Auto-pause): {critThreshold}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={critThreshold}
                  onChange={(e) => setCritThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  High Alert Threshold: {highThreshold}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={highThreshold}
                  onChange={(e) => setHighThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Medium Alert Threshold: {medThreshold}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={medThreshold}
                  onChange={(e) => setMedThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleUpdateThresholds}
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Update Thresholds
          </button>
        </div>
      )}
    </div>
  );
};
