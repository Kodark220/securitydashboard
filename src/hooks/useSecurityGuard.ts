import { useState, useCallback, useMemo } from 'react';
import { getContractAddress } from '../lib/config';
import type { SystemStatus, ScanResult, AddressRisk, ThreatIntelligence, PatternAnalysis } from '../types/contract';

/**
 * Mock data for development/testing
 */
const MOCK_SYSTEM_STATUS: SystemStatus = {
  system: {
    paused: false,
    monitoring_enabled: true,
    owner: '0x636f5448d15A4932645D75ecA8933C7382efe5Fe',
  },
  thresholds: {
    critical: 85,
    high: 70,
    medium: 50,
  },
  statistics: {
    total_scans: 1250,
    total_threats: 23,
    total_pauses: 2,
  },
  counts: {
    operators: 3,
    blacklisted: 12,
    whitelisted: 45,
    tracked_addresses: 456,
  },
};

const MOCK_SCAN_RESULT: ScanResult = {
  scan_id: 1,
  status: 'completed',
  risk_score: 45,
  threat_level: 'medium',
  exploits_detected: ['sandwich_attack'],
  explanation: 'Potential sandwich attack pattern detected',
  action_taken: 'flagged',
  system_paused: false,
};

const MOCK_THREAT_INTELLIGENCE: ThreatIntelligence = {
  intelligence: {
    threat_level: 'medium',
    active_threats: ['flash_loan_attacks', 'sandwich_attacks'],
    recommendations: ['Increase monitoring', 'Review whitelist policies'],
    summary: 'Current threat level is moderate with 2 active threat patterns',
  },
  timestamp: new Date().toISOString(),
};

const MOCK_PATTERN_ANALYSIS: PatternAnalysis = {
  status: 'completed',
  scans_analyzed: 1250,
  patterns: {
    common_exploits: ['sandwich_attack', 'flash_loan'],
    false_positive_rate: 'low',
    recommended_thresholds: {
      critical: 85,
      high: 70,
      medium: 50,
    },
    emerging_threats: ['MEV_extraction', 'oracle_manipulation'],
    optimization_suggestions: ['Increase monitoring frequency', 'Add more validators'],
    system_health: 'good',
    summary: 'System is performing well with optimal thresholds',
  },
  current_thresholds: {
    critical: 85,
    high: 70,
    medium: 50,
  },
};

export const useSecurityGuard = (contractAddress?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use provided contract address or get from config
  const address = useMemo(() => {
    return contractAddress || getContractAddress();
  }, [contractAddress]);

  const callContract = useCallback(
    async (method: string, params?: any) => {
      if (!address) {
        throw new Error(
          'Contract address not configured. Please set VITE_CONTRACT_ADDRESS in your .env file.'
        );
      }

      setLoading(true);
      setError(null);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        // Mock implementation - returns realistic data
        // TODO: Replace with actual GenLayer contract calls when API is available
        console.log(`Contract call: ${method}`, params);
        return { success: true, data: null };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to call contract';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [address]
  );

  const getSystemStatus = useCallback(async (): Promise<SystemStatus> => {
    await callContract('get_system_status');
    return MOCK_SYSTEM_STATUS;
  }, [callContract]);

  const scanTransaction = useCallback(
    async (
      fromAddr: string,
      toAddr: string,
      valueWei: string,
      calldata: string,
      gasUsed: string
    ): Promise<ScanResult> => {
      await callContract('scan_transaction', {
        from_addr: fromAddr,
        to_addr: toAddr,
        value_wei: valueWei,
        calldata,
        gas_used: gasUsed,
      });
      return MOCK_SCAN_RESULT;
    },
    [callContract]
  );

  const emergencyPause = useCallback(
    async (reason: string) => {
      await callContract('emergency_pause', { reason });
      return { success: true, message: 'System paused' };
    },
    [callContract]
  );

  const resumeSystem = useCallback(
    async (justification: string) => {
      await callContract('resume_system', { justification });
      return { success: true, message: 'System resumed' };
    },
    [callContract]
  );

  const getAddressRisk = useCallback(
    async (addr: string): Promise<AddressRisk> => {
      await callContract('get_address_risk', { address: addr });
      return {
        address: addr,
        risk_score: 35,
        threat_level: 'low',
        blacklisted: false,
        whitelisted: true,
        tracked: true,
      };
    },
    [callContract]
  );

  const getBlacklist = useCallback(async () => {
    await callContract('get_blacklist');
    return ['0x1234567890abcdef1234567890abcdef12345678'];
  }, [callContract]);

  const getWhitelist = useCallback(async () => {
    await callContract('get_whitelist');
    return ['0xAbCdEf1234567890AbCdEf1234567890AbCdEf12'];
  }, [callContract]);

  const getThreatIntelligence = useCallback(async (): Promise<ThreatIntelligence> => {
    await callContract('get_threat_intelligence');
    return MOCK_THREAT_INTELLIGENCE;
  }, [callContract]);

  const configureWebhook = useCallback(
    async (url: string, enabled: boolean, minRisk: number) => {
      await callContract('configure_webhook', {
        url,
        enabled,
        min_risk: minRisk,
      });
      return { success: true, message: 'Webhook configured' };
    },
    [callContract]
  );

  const analyzePatterns = useCallback(async (): Promise<PatternAnalysis> => {
    await callContract('analyze_patterns');
    return MOCK_PATTERN_ANALYSIS;
  }, [callContract]);

  return {
    loading,
    error,
    getSystemStatus,
    scanTransaction,
    emergencyPause,
    resumeSystem,
    getAddressRisk,
    getBlacklist,
    getWhitelist,
    getThreatIntelligence,
    configureWebhook,
    analyzePatterns,
  };
};
