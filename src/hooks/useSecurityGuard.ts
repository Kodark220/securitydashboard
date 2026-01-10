import { useState, useCallback, useMemo } from 'react';
import { getContractAddress } from '../lib/config';
import type {
  SystemStatus,
  ScanResult,
  AddressRisk,
  ThreatIntelligence,
  PatternAnalysis,
  SystemDashboard,
  ThreatSummary,
  AIRecommendations,
  ThreatPrediction,
  HealthCheckReport,
  AddressProfile,
  WebhookConfig,
  WalletConnection,
  ContractProfile,
  InteractionAnalysis,
  WalletSecurityScan,
  DAppHealthStatus,
  WalletRiskDashboard,
  InteractionHistory,
  DAppMonitoring,
  SaferAlternatives,
  TokenApproval,
  DangerousApprovals,
  ApprovalSafetyReport,
  CustomThresholds,
  UserThresholds,
  TransactionSimulation,
} from '../types/contract';

/**
 * Mock data generators for development/testing
 */
const getMockSystemStatus = (): SystemStatus => {
  const contractAddress = getContractAddress();
  return {
    system: {
      paused: false,
      monitoring_enabled: true,
      owner: contractAddress,
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
};

const getMockSystemDashboard = (): SystemDashboard => {
  const contractAddress = getContractAddress();
  return {
    system_status: {
      health: 'excellent',
      icon: '🟢',
      paused: false,
      monitoring: true,
      owner: contractAddress,
    },
    metrics: {
      total_scans: 1250,
      total_threats_detected: 23,
      threat_detection_rate_percent: 18,
      emergency_pauses: 2,
      average_risk_score: 42,
    },
    security_roster: {
      operators: 3,
      blacklisted_addresses: 12,
      whitelisted_addresses: 45,
      addresses_tracked: 456,
    },
    risk_assessment: {
      critical_threshold: 85,
      high_threshold: 70,
      medium_threshold: 50,
      current_health_level: 'excellent',
    },
    recent_activity: {
      recent_threats: 2,
      recent_scans: 45,
      recent_recommendations: 3,
      predicted_threats_count: 5,
    },
    quick_actions: {
      pause_enabled: true,
      resume_enabled: false,
      can_scan: true,
    },
  };
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

const MOCK_THREAT_SUMMARY: ThreatSummary = {
  threat_breakdown: {
    critical: 1,
    high: 4,
    medium: 8,
    total: 13,
  },
  visual_summary: '🔴 1 Critical | 🟠 4 High | 🟡 8 Medium',
  system_alert: false,
  alert_message: 'System monitoring normally',
  action_items: 5,
};

const MOCK_AI_RECOMMENDATIONS: AIRecommendations = {
  status: 'recommended',
  recommendations: {
    immediate_actions: [
      'Review the 1 critical threat detected in the last 24 hours',
      'Check recent high-risk transactions',
    ],
    short_term: [
      'Add more trusted addresses to whitelist',
      'Review and optimize threshold settings',
      'Consider increasing monitoring frequency',
    ],
    long_term: [
      'Implement advanced ML-based threat detection',
      'Expand security operator team',
      'Set up automatic threat intelligence feeds',
    ],
    optimization_tips: [
      'Use historical data to tune thresholds more precisely',
      'Monitor false positive rates and adjust accordingly',
    ],
    priority_score: 65,
  },
  urgent: false,
};

const MOCK_THREAT_PREDICTION: ThreatPrediction = {
  status: 'predicted',
  threat_prediction: {
    predicted_attacks: ['sandwich_attack', 'flash_loan_exploit', 'MEV_extraction'],
    high_risk_patterns: [
      'Multiple failed transactions from same address',
      'Unusual gas price patterns',
    ],
    escalation_risk: 45,
    preventive_actions: [
      'Increase monitoring of high-risk addresses',
      'Prepare emergency pause procedures',
      'Review whitelist policies',
    ],
    confidence: 72,
  },
  action_required: false,
  recommended_actions: [
    'Monitor the predicted attack patterns',
    'Prepare preventive measures',
  ],
};

const MOCK_HEALTH_CHECK: HealthCheckReport = {
  health_score: 85,
  health_status: 'excellent',
  issues: [],
  warnings: [
    {
      severity: 'medium',
      issue: 'Only 3 operators - consider adding more for redundancy',
      solution: 'Add 2-3 more trusted operators',
      impact: 'Improved operational resilience',
    },
  ],
  improvements: [
    {
      severity: 'info',
      issue: 'Webhooks not yet configured',
      solution: 'Set up webhook notifications for real-time alerts',
      impact: 'Faster incident response',
    },
  ],
  total_issues: 0,
  system_ready: true,
  diagnostic_timestamp: new Date().toISOString(),
};

const MOCK_WEBHOOK_CONFIG: WebhookConfig = {
  url: '',
  enabled: false,
  min_risk_threshold: 70,
};

const MOCK_WALLET_RISK_DASHBOARD: WalletRiskDashboard = {
  wallet: '0xuser1234567890abcdef1234567890abcdef12',
  overall_status: 'Safe',
  status_icon: '🟢',
  health_score: 82,
  security_metrics: {
    safe_contracts: 15,
    warning_contracts: 3,
    high_risk_contracts: 1,
    total_contracts: 19,
  },
  pending_warnings: [],
  recent_high_risk: [],
  actions_recommended: [],
  quick_actions: {
    scan_wallet: true,
    check_dapp_health: true,
    view_interaction_history: true,
    get_safer_alternatives: true,
  },
};

const MOCK_WALLET_SECURITY_SCAN: WalletSecurityScan = {
  status: 'scan_complete',
  wallet: '0xuser1234567890abcdef1234567890abcdef12',
  health_score: 82,
  overall_status: 'healthy',
  contracts_analyzed: 19,
  breakdown: {
    safe_contracts: 15,
    warning_contracts: 3,
    high_risk_contracts: 1,
  },
  high_risk_list: [],
  warning_list: [],
  detailed_analysis: [],
  recommendation: 'Your wallet appears safe',
};

const MOCK_DAPP_HEALTH: DAppHealthStatus = {
  status: 'health_check_complete',
  dapp: 'Sample dApp',
  address: '0xSampleDapp',
  health_icon: '🟢',
  health_status: 'healthy',
  risk_level: 'low',
  security_issues: [],
  audit_status: 'audited',
  warnings: [],
  recommendation: 'Safe to use',
  safe_to_interact: true,
  warning_before_use: false,
};

const MOCK_SAFER_ALTERNATIVES: SaferAlternatives = {
  status: 'recommendations_generated',
  safer_alternatives: {},
  safety_tips: ['Research before interacting', 'Start with small amounts'],
  priority_switches: [],
  message: 'Review safer alternatives before interacting',
};

const MOCK_DANGEROUS_APPROVALS: DangerousApprovals = {
  wallet: '0xuser1234567890abcdef1234567890abcdef12',
  dangerous_approvals_found: 0,
  severity: 'safe',
  approvals: [],
  recommendation: '✅ No infinite approvals found',
  how_to_revoke: 'Use token contract approve() with amount=0',
};

const MOCK_APPROVAL_SAFETY: ApprovalSafetyReport = {
  wallet: '0xuser1234567890abcdef1234567890abcdef12',
  overall_safety: 'safe',
  dangerous_approvals: 0,
  dangerous_details: [],
  actions_required: 0,
  approval_audit: {
    total_dangerous: 0,
    critical_risk: false,
    recommendation: '✅ Approvals are safe',
  },
  safety_score: 100,
  next_steps: ['Your approvals look safe'],
};

const MOCK_TRANSACTION_SIMULATION: TransactionSimulation = {
  status: 'simulation_complete',
  function: 'swap()',
  will_succeed: true,
  failure_reason: '',
  estimated_gas: '~150,000 gas',
  expected_output: '~9.95 USDC',
  risks_detected: [],
  slippage_risk: 'low',
  front_run_risk: 'medium',
  recommendation: 'Safe to execute',
  safe_to_execute: true,
};

export const useSecurityGuard = (contractAddress?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      await new Promise(resolve => setTimeout(resolve, 300));

      try {
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

  // ==================== CORE SYSTEM METHODS ====================

  const getSystemStatus = useCallback(async (): Promise<SystemStatus> => {
    await callContract('get_system_status');
    return getMockSystemStatus();
  }, [callContract]);

  const getSystemDashboard = useCallback(async (): Promise<SystemDashboard> => {
    await callContract('get_system_dashboard');
    return getMockSystemDashboard();
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

  // ==================== ADDRESS & LIST METHODS ====================

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

  const getAddressProfile = useCallback(
    async (addr: string): Promise<AddressProfile> => {
      await callContract('get_address_profile', { address: addr });
      return {
        address: addr,
        security_status: '🟢 Safe',
        risk_profile: 'safe',
        risk_score: 15,
        threat_level: 'low',
        lists: {
          blacklisted: false,
          whitelisted: true,
        },
        tracking: {
          tracked: true,
          trend_data: {
            min_score: 10,
            max_score: 25,
            avg_score: 15,
            scans: 12,
            trend: 'stable',
          },
        },
        recommendations: {
          safe_to_interact: true,
          needs_monitoring: false,
          should_block: false,
        },
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

  // ==================== THREAT INTELLIGENCE & ANALYSIS ====================

  const getThreatIntelligence = useCallback(async (): Promise<ThreatIntelligence> => {
    await callContract('get_threat_intelligence');
    return MOCK_THREAT_INTELLIGENCE;
  }, [callContract]);

  const getThreatSummary = useCallback(async (): Promise<ThreatSummary> => {
    await callContract('get_threat_summary');
    return MOCK_THREAT_SUMMARY;
  }, [callContract]);

  const analyzePatterns = useCallback(async (): Promise<PatternAnalysis> => {
    await callContract('analyze_patterns');
    return MOCK_PATTERN_ANALYSIS;
  }, [callContract]);

  // ==================== AI & PREDICTIONS ====================

  const getAIRecommendations = useCallback(async (): Promise<AIRecommendations> => {
    await callContract('get_ai_recommendations');
    return MOCK_AI_RECOMMENDATIONS;
  }, [callContract]);

  const predictThreatsProactive = useCallback(async (): Promise<ThreatPrediction> => {
    await callContract('predict_threats_proactive');
    return MOCK_THREAT_PREDICTION;
  }, [callContract]);

  // ==================== HEALTH & CONFIG ====================

  const systemHealthCheck = useCallback(async (): Promise<HealthCheckReport> => {
    await callContract('system_health_check');
    return MOCK_HEALTH_CHECK;
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

  const getWebhookConfig = useCallback(async (): Promise<WebhookConfig> => {
    await callContract('get_webhook_config');
    return MOCK_WEBHOOK_CONFIG;
  }, [callContract]);

  // ==================== WALLET MONITORING ====================

  const connectWallet = useCallback(async (): Promise<WalletConnection> => {
    await callContract('connect_wallet');
    return {
      wallet: address,
      connected_at: new Date().toISOString(),
      monitoring_enabled: true,
      auto_scan_enabled: true,
      alerts_enabled: true,
      health_score: 100,
    };
  }, [callContract, address]);

  const scanWalletSecurity = useCallback(
    async (walletAddr: string): Promise<WalletSecurityScan> => {
      await callContract('scan_wallet_security', { wallet_addr: walletAddr });
      return MOCK_WALLET_SECURITY_SCAN;
    },
    [callContract]
  );

  const getWalletRiskDashboard = useCallback(
    async (walletAddr: string): Promise<WalletRiskDashboard> => {
      await callContract('get_wallet_risk_dashboard', { wallet_addr: walletAddr });
      return MOCK_WALLET_RISK_DASHBOARD;
    },
    [callContract]
  );

  const getUserInteractionHistory = useCallback(
    async (userAddr: string): Promise<InteractionHistory> => {
      await callContract('get_user_interaction_history', { user_addr: userAddr });
      return {
        user: userAddr,
        total_watched_contracts: 5,
        watched_contracts: [],
        total_interactions: 0,
        recent_interactions: [],
        high_risk_contracts: 0,
        recommendation: 'Start monitoring contracts',
      };
    },
    [callContract]
  );

  // ==================== dAPP MONITORING ====================

  const registerDapp = useCallback(
    async (dappAddr: string, dappName: string, dappType: string) => {
      await callContract('register_dapp', {
        dapp_addr: dappAddr,
        dapp_name: dappName,
        dapp_type: dappType,
      });
      return { success: true, message: `${dappName} registered` };
    },
    [callContract]
  );

  const getDAppHealthStatus = useCallback(
    async (dappAddr: string): Promise<DAppHealthStatus> => {
      await callContract('get_dapp_health_status', { dapp_addr: dappAddr });
      return MOCK_DAPP_HEALTH;
    },
    [callContract]
  );

  const monitorDappContracts = useCallback(async (): Promise<DAppMonitoring> => {
    await callContract('monitor_dapp_contracts');
    return {
      status: 'monitoring_active',
      total_dapps_monitored: 0,
      high_risk_dapps: 0,
      safe_dapps: 0,
      require_audit: 0,
      dapp_list: [],
      alerts: 0,
      action_items: 0,
    };
  }, [callContract]);

  const getSaferAlternatives = useCallback(async (): Promise<SaferAlternatives> => {
    await callContract('get_safer_alternatives');
    return MOCK_SAFER_ALTERNATIVES;
  }, [callContract]);

  const addContractToWatch = useCallback(
    async (contractAddr: string, contractName: string) => {
      await callContract('add_contract_to_watch', {
        contract_addr: contractAddr,
        contract_name: contractName,
      });
      return { success: true, message: `${contractName} added to watch list` };
    },
    [callContract]
  );

  const getContractRiskProfile = useCallback(
    async (contractAddr: string): Promise<ContractProfile> => {
      await callContract('get_contract_risk_profile', { contract_addr: contractAddr });
      return {
        contract: contractAddr,
        name: 'Sample Contract',
        risk: 'low',
        type: 'Unknown',
        initial_risk: 'low',
        risks_to_watch: [],
        red_flags: [],
        precautions: [],
        audit_needed: false,
        threats_detected: 0,
        recommendation: 'Monitor for changes',
      };
    },
    [callContract]
  );

  const analyzeContractBeforeInteraction = useCallback(
    async (
      contractAddr: string,
      functionName: string,
      params: string,
      valueEth: string
    ): Promise<InteractionAnalysis> => {
      await callContract('analyze_contract_before_interaction', {
        contract_addr: contractAddr,
        function_name: functionName,
        params,
        value_eth: valueEth,
      });
      return {
        status: 'analyzed',
        contract: contractAddr,
        function: functionName,
        interaction_risk: 'safe',
        reason: 'Standard interaction pattern',
        precautions: [],
        should_proceed: true,
        verify_before_confirming: [],
        common_scams_to_watch: [],
        confidence_percent: 85,
        action: 'OK to proceed',
      };
    },
    [callContract]
  );

  // ==================== TOKEN APPROVALS ====================

  const trackTokenApproval = useCallback(
    async (tokenAddr: string, spenderAddr: string, amount: string): Promise<TokenApproval> => {
      await callContract('track_token_approval', {
        token_addr: tokenAddr,
        spender_addr: spenderAddr,
        amount,
      });
      return {
        status: 'approval_tracked',
        token: tokenAddr,
        spender: spenderAddr,
        amount,
        is_infinite: false,
        spender_analysis: {
          spender_name: 'Unknown',
          is_known_safe: false,
          risk_score: 50,
          known_exploits: [],
          recommendation: 'Review before approving',
          warning: '',
        },
        warning: null,
        recommendation: 'Review carefully',
        risk_level: 'medium',
      };
    },
    [callContract]
  );

  const checkDangerousApprovals = useCallback(
    async (walletAddr: string): Promise<DangerousApprovals> => {
      await callContract('check_dangerous_approvals', { wallet_addr: walletAddr });
      return MOCK_DANGEROUS_APPROVALS;
    },
    [callContract]
  );

  const getApprovalSafetyReport = useCallback(
    async (walletAddr: string): Promise<ApprovalSafetyReport> => {
      await callContract('get_approval_safety_report', { wallet_addr: walletAddr });
      return MOCK_APPROVAL_SAFETY;
    },
    [callContract]
  );

  // ==================== CUSTOM THRESHOLDS & SIMULATION ====================

  const setCustomRiskThresholds = useCallback(
    async (critical: number, high: number, medium: number): Promise<CustomThresholds> => {
      await callContract('set_custom_risk_thresholds', { critical, high, medium });
      return {
        success: true,
        user: address,
        custom_thresholds: { critical, high, medium },
        message: 'Thresholds saved',
      };
    },
    [callContract, address]
  );

  const getUserThresholds = useCallback(
    async (walletAddr: string): Promise<UserThresholds> => {
      await callContract('get_user_thresholds', { wallet_addr: walletAddr });
      return {
        status: 'using_default_thresholds',
        thresholds: { critical: 85, high: 70, medium: 50 },
        set_by: 'system',
      };
    },
    [callContract]
  );

  const simulateTransaction = useCallback(
    async (toAddr: string, func: string, params: string, valueEth: string): Promise<TransactionSimulation> => {
      await callContract('simulate_transaction', {
        to_addr: toAddr,
        function: func,
        params,
        value_eth: valueEth,
      });
      return MOCK_TRANSACTION_SIMULATION;
    },
    [callContract]
  );

  // ==================== ADMIN METHODS ====================

  const addOperator = useCallback(
    async (operatorAddress: string) => {
      await callContract('add_operator', { operator_address: operatorAddress });
      return { success: true, message: 'Operator added' };
    },
    [callContract]
  );

  const blacklistAddress = useCallback(
    async (addressToBlacklist: string) => {
      await callContract('blacklist_address', { address_to_blacklist: addressToBlacklist });
      return { success: true, message: 'Address blacklisted' };
    },
    [callContract]
  );

  const whitelistAddress = useCallback(
    async (addressToWhitelist: string) => {
      await callContract('whitelist_address', { address_to_whitelist: addressToWhitelist });
      return { success: true, message: 'Address whitelisted' };
    },
    [callContract]
  );

  const updateThresholds = useCallback(
    async (criticalThreshold: number, highThreshold: number, mediumThreshold: number) => {
      await callContract('update_thresholds', {
        new_critical: criticalThreshold,
        new_high: highThreshold,
        new_medium: mediumThreshold,
      });
      return { success: true, message: 'Thresholds updated' };
    },
    [callContract]
  );

  return {
    loading,
    error,
    // System
    getSystemStatus,
    getSystemDashboard,
    scanTransaction,
    emergencyPause,
    resumeSystem,
    // Addresses
    getAddressRisk,
    getAddressProfile,
    getBlacklist,
    getWhitelist,
    // Threats
    getThreatIntelligence,
    getThreatSummary,
    analyzePatterns,
    // AI
    getAIRecommendations,
    predictThreatsProactive,
    // Health
    systemHealthCheck,
    configureWebhook,
    getWebhookConfig,
    // Wallet
    connectWallet,
    scanWalletSecurity,
    getWalletRiskDashboard,
    getUserInteractionHistory,
    // dApps
    registerDapp,
    getDAppHealthStatus,
    monitorDappContracts,
    getSaferAlternatives,
    addContractToWatch,
    getContractRiskProfile,
    analyzeContractBeforeInteraction,
    // Approvals
    trackTokenApproval,
    checkDangerousApprovals,
    getApprovalSafetyReport,
    // Advanced
    setCustomRiskThresholds,
    getUserThresholds,
    simulateTransaction,
    // Admin
    addOperator,
    blacklistAddress,
    whitelistAddress,
    updateThresholds,
  };
};
