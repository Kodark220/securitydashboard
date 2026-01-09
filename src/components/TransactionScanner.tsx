import { useState } from 'react';
import { Send } from 'lucide-react';
import type { ScanResult } from '../types/contract';

interface TransactionScannerProps {
  onScan: (
    fromAddr: string,
    toAddr: string,
    valueWei: string,
    calldata: string,
    gasUsed: string
  ) => Promise<ScanResult>;
  loading: boolean;
  onResult: (result: ScanResult) => void;
}

export const TransactionScanner = ({ onScan, loading, onResult }: TransactionScannerProps) => {
  const [fromAddr, setFromAddr] = useState('');
  const [toAddr, setToAddr] = useState('');
  const [value, setValue] = useState('');
  const [calldata, setCalldata] = useState('');
  const [gasUsed, setGasUsed] = useState('');
  const [error, setError] = useState('');

  const handleScan = async () => {
    setError('');

    if (!fromAddr || !toAddr) {
      setError('From and To addresses are required');
      return;
    }

    try {
      const result = await onScan(
        fromAddr,
        toAddr,
        value || '0',
        calldata || '0x',
        gasUsed || '21000'
      );
      onResult(result);
      // Reset form
      setFromAddr('');
      setToAddr('');
      setValue('');
      setCalldata('');
      setGasUsed('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan transaction');
    }
  };

  return (
    <div className="glass rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Scan Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">From Address</label>
          <input
            type="text"
            value={fromAddr}
            onChange={(e) => setFromAddr(e.target.value)}
            placeholder="0x..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">To Address</label>
          <input
            type="text"
            value={toAddr}
            onChange={(e) => setToAddr(e.target.value)}
            placeholder="0x..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Value (wei)</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Gas Used</label>
          <input
            type="text"
            value={gasUsed}
            onChange={(e) => setGasUsed(e.target.value)}
            placeholder="21000"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-2">Calldata</label>
        <textarea
          value={calldata}
          onChange={(e) => setCalldata(e.target.value)}
          placeholder="0x"
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:border-blue-500 focus:outline-none font-mono text-sm"
        />
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4 text-red-400 text-sm">{error}</div>}

      <button
        onClick={handleScan}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Send className="w-5 h-5" />
        {loading ? 'Scanning...' : 'Scan Transaction'}
      </button>
    </div>
  );
};
