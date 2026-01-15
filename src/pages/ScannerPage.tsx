import { useState } from 'react';
import { TransactionScanner } from '../components/TransactionScanner';
import { ScanResultCard } from '../components/ScanResultCard';
import { useSecurityGuard } from '../hooks/useSecurityGuard';
import type { ScanResult } from '../types/contract';

export const ScannerPage = () => {
  const { scanTransaction, loading } = useSecurityGuard();
  const [results, setResults] = useState<ScanResult[]>([]);

  const handleScan = async (
    fromAddr: string,
    toAddr: string,
    valueWei: string,
    calldata: string,
    gasUsed: string
  ) => {
    const result = await scanTransaction(fromAddr, toAddr, valueWei, calldata, gasUsed);
    return result;
  };

  const handleResult = (result: ScanResult) => {
    setResults((prev) => [result, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Transaction Scanner</h1>
        <p className="text-slate-600">Scan transactions for threats using AI-powered threat detection</p>
      </div>

      <TransactionScanner onScan={handleScan} loading={loading} onResult={handleResult} />

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Scan Results ({results.length})</h2>
        {results.length === 0 ? (
          <div className="glass rounded-lg p-6 text-center text-gray-400">
            No scans performed yet. Start by entering a transaction above.
          </div>
        ) : (
          results.map((result) => <ScanResultCard key={result.scan_id} result={result} />)
        )}
      </div>
    </div>
  );
};
