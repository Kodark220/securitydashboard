import React, { useMemo, useState } from 'react';
import { formatAddress } from '../lib/config';

export type WalletSource = 'metamask' | 'manual';

interface WalletConnectPanelProps {
  walletAddress: string | null;
  walletSource: WalletSource | null;
  onConnect: (address: string, source: WalletSource) => void;
  onDisconnect: () => void;
}

const isValidAddress = (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value.trim());

export const WalletConnectPanel: React.FC<WalletConnectPanelProps> = ({
  walletAddress,
  walletSource,
  onConnect,
  onDisconnect,
}) => {
  const [manualAddress, setManualAddress] = useState('');
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const hasProvider = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const provider = (window as any).ethereum;
    return Boolean(provider && typeof provider.request === 'function');
  }, []);

  const handleConnectMetaMask = async () => {
    setError('');
    if (!hasProvider) {
      setError('MetaMask is not available in this browser.');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = (window as any).ethereum;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const account = Array.isArray(accounts) ? accounts[0] : null;
      if (!account) {
        setError('No account returned from MetaMask.');
        return;
      }
      onConnect(account, 'metamask');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to MetaMask.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleManualConnect = () => {
    setError('');
    if (!isValidAddress(manualAddress)) {
      setError('Enter a valid wallet address (0x + 40 hex characters).');
      return;
    }
    onConnect(manualAddress.trim(), 'manual');
    setManualAddress('');
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Wallet Connection</h3>
          <p className="text-sm text-slate-200/70 mt-1">
            Connect your wallet to monitor activity and run wallet scans.
          </p>
        </div>
        {walletAddress ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-200/60">Connected</p>
              <p className="font-mono text-sm text-white">
                {formatAddress(walletAddress, 16)}
              </p>
              {walletSource && (
                <p className="text-xs text-slate-200/60 mt-1">
                  Source: {walletSource === 'metamask' ? 'MetaMask' : 'Manual'}
                </p>
              )}
            </div>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 rounded-full border border-white/30 text-white/90 hover:text-white hover:border-white/60 transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-200/70">No wallet connected.</div>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Connect with MetaMask</h4>
          <p className="text-xs text-slate-200/70 mb-4">
            Use the browser wallet to authenticate and monitor your address.
          </p>
          <button
            onClick={handleConnectMetaMask}
            disabled={!hasProvider || isConnecting}
            className="w-full rounded-full bg-white text-slate-900 font-semibold py-2 px-4 transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
          >
            {isConnecting ? 'Connecting...' : hasProvider ? 'Connect MetaMask' : 'MetaMask Not Detected'}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Enter Address Manually</h4>
          <p className="text-xs text-slate-200/70 mb-4">
            Paste any wallet address to monitor without a wallet extension.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={manualAddress}
              onChange={(event) => setManualAddress(event.target.value)}
              placeholder="0x..."
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-300/60 focus:outline-none focus:border-cyan-200"
            />
            <button
              onClick={handleManualConnect}
              className="w-full rounded-full border border-white/40 text-white font-semibold py-2 px-4 transition hover:border-white/70"
            >
              Use This Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
