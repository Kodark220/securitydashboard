export interface SystemStatus {
  system: {
    paused: boolean;
    monitoring_enabled: boolean;
    owner: string;
  };
  thresholds: {
    critical: number;
    high: number;
    medium: number;
  };
  statistics: {
    total_scans: number;
    total_threats: number;
    total_pauses: number;
  };
  counts: {
    operators: number;
    blacklisted: number;
    whitelisted: number;
    tracked_addresses: number;
  };
}

export interface ScanResult {
  scan_id: number;
  status: string;
  risk_score: number;
  threat_level: "low" | "medium" | "high" | "critical";
  exploits_detected: string[];
  explanation: string;
  action_taken: string;
  system_paused: boolean;
  paused_this_scan?: boolean;
}

export interface AddressRisk {
  address: string;
  risk_score: number;
  threat_level: string;
  blacklisted: boolean;
  whitelisted: boolean;
  tracked: boolean;
}

export interface ThreatIntelligence {
  intelligence: {
    threat_level: "low" | "medium" | "high" | "critical";
    active_threats: string[];
    recommendations: string[];
    summary: string;
  };
  timestamp: string;
}

export interface WebhookConfig {
  url: string;
  enabled: boolean;
  min_risk_threshold: number;
}

export interface PatternAnalysis {
  status: string;
  scans_analyzed: number;
  patterns: {
    common_exploits: string[];
    false_positive_rate: "low" | "medium" | "high";
    recommended_thresholds: {
      critical: number;
      high: number;
      medium: number;
    };
    emerging_threats: string[];
    optimization_suggestions: string[];
    system_health: "excellent" | "good" | "needs_improvement";
    summary: string;
  };
  current_thresholds: {
    critical: number;
    high: number;
    medium: number;
  };
}

export interface SystemDashboard {
  system_status: {
    health: "excellent" | "caution" | "warning" | "critical";
    icon: string;
    paused: boolean;
    monitoring: boolean;
    owner: string;
  };
  metrics: {
    total_scans: number;
    total_threats_detected: number;
    threat_detection_rate_percent: number;
    emergency_pauses: number;
    average_risk_score: number;
  };
  security_roster: {
    operators: number;
    blacklisted_addresses: number;
    whitelisted_addresses: number;
    addresses_tracked: number;
  };
  risk_assessment: {
    critical_threshold: number;
    high_threshold: number;
    medium_threshold: number;
    current_health_level: string;
  };
  recent_activity: {
    recent_threats: number;
    recent_scans: number;
    recent_recommendations: number;
    predicted_threats_count: number;
  };
  quick_actions: {
    pause_enabled: boolean;
    resume_enabled: boolean;
    can_scan: boolean;
  };
}

export interface ThreatSummary {
  threat_breakdown: {
    critical: number;
    high: number;
    medium: number;
    total: number;
  };
  visual_summary: string;
  system_alert: boolean;
  alert_message: string;
  action_items: number;
}

export interface AIRecommendations {
  status: string;
  recommendations: {
    immediate_actions: string[];
    short_term: string[];
    long_term: string[];
    optimization_tips: string[];
    priority_score: number;
  };
  urgent: boolean;
}

export interface ThreatPrediction {
  status: string;
  threat_prediction: {
    predicted_attacks: string[];
    high_risk_patterns: string[];
    escalation_risk: number;
    preventive_actions: string[];
    confidence: number;
  };
  action_required: boolean;
  recommended_actions: string[];
}

export interface HealthCheckReport {
  health_score: number;
  health_status: "excellent" | "poor" | "fair" | "critical";
  issues: Array<{
    severity: "critical" | "high" | "medium" | "info";
    issue: string;
    solution: string;
    impact: string;
  }>;
  warnings: Array<{
    severity: "critical" | "high" | "medium" | "info";
    issue: string;
    solution: string;
    impact: string;
  }>;
  improvements: Array<{
    severity: "critical" | "high" | "medium" | "info";
    issue: string;
    solution: string;
    impact: string;
  }>;
  total_issues: number;
  system_ready: boolean;
  diagnostic_timestamp: string;
}

export interface AddressProfile {
  address: string;
  security_status: string;
  risk_profile: "safe" | "suspicious" | "dangerous" | "critical";
  risk_score: number;
  threat_level: string;
  lists: {
    blacklisted: boolean;
    whitelisted: boolean;
  };
  tracking: {
    tracked: boolean;
    trend_data: Record<string, any>;
  };
  recommendations: {
    safe_to_interact: boolean;
    needs_monitoring: boolean;
    should_block: boolean;
  };
}

// ==================== NEW: WALLET & dAPP MONITORING ====================

export interface WalletConnection {
  wallet: string;
  connected_at: string;
  monitoring_enabled: boolean;
  auto_scan_enabled: boolean;
  alerts_enabled: boolean;
  health_score: number;
}

export interface ContractProfile {
  contract: string;
  name: string;
  risk: "low" | "medium" | "high" | "critical";
  type: string;
  initial_risk: "low" | "medium" | "high" | "critical";
  risks_to_watch: string[];
  red_flags: string[];
  precautions: string[];
  audit_needed: boolean;
  threats_detected: number;
  recommendation: string;
}

export interface InteractionAnalysis {
  status: string;
  contract: string;
  function: string;
  interaction_risk: "safe" | "caution" | "dangerous" | "critical";
  reason: string;
  precautions: string[];
  should_proceed: boolean;
  verify_before_confirming: string[];
  common_scams_to_watch: string[];
  confidence_percent: number;
  action: string;
}

export interface WalletSecurityScan {
  status: string;
  wallet: string;
  health_score: number;
  overall_status: "healthy" | "warning" | "critical";
  contracts_analyzed: number;
  breakdown: {
    safe_contracts: number;
    warning_contracts: number;
    high_risk_contracts: number;
  };
  high_risk_list: string[];
  warning_list: string[];
  detailed_analysis: Array<{
    contract: string;
    name: string;
    risk: string;
    type: string;
  }>;
  recommendation: string;
}

export interface DAppHealthStatus {
  status: string;
  dapp: string;
  address: string;
  health_icon: string;
  health_status: "healthy" | "warning" | "critical";
  risk_level: "low" | "medium" | "high" | "critical";
  security_issues: string[];
  audit_status: string;
  warnings: string[];
  recommendation: string;
  safe_to_interact: boolean;
  warning_before_use: boolean;
}

export interface WalletRiskDashboard {
  wallet: string;
  overall_status: "Safe" | "Warning" | "Critical";
  status_icon: string;
  health_score: number;
  security_metrics: {
    safe_contracts: number;
    warning_contracts: number;
    high_risk_contracts: number;
    total_contracts: number;
  };
  pending_warnings: Array<{
    dapp: string;
    issue: string;
    severity: string;
  }>;
  recent_high_risk: string[];
  actions_recommended: (string | null)[];
  quick_actions: {
    scan_wallet: boolean;
    check_dapp_health: boolean;
    view_interaction_history: boolean;
    get_safer_alternatives: boolean;
  };
}

export interface InteractionHistory {
  user: string;
  total_watched_contracts: number;
  watched_contracts: Array<{
    contract: string;
    name: string;
    risk: string;
    type: string;
    interactions: number;
  }>;
  total_interactions: number;
  recent_interactions: any[];
  high_risk_contracts: number;
  recommendation: string;
}

export interface DAppMonitoring {
  status: string;
  total_dapps_monitored: number;
  high_risk_dapps: number;
  safe_dapps: number;
  require_audit: number;
  dapp_list: Array<{
    name: string;
    address: string;
    risk: string;
    type: string;
    red_flags: number;
  }>;
  alerts: number;
  action_items: number;
}

export interface SaferAlternatives {
  status: string;
  safer_alternatives: Record<string, any>;
  safety_tips: string[];
  priority_switches: string[];
  message: string;
}

// ==================== TOKEN ALLOWANCE & APPROVAL TRACKING ====================

export interface TokenApproval {
  status: string;
  token: string;
  spender: string;
  amount: string;
  is_infinite: boolean;
  spender_analysis: {
    spender_name: string;
    is_known_safe: boolean;
    risk_score: number;
    known_exploits: string[];
    recommendation: string;
    warning: string;
  };
  warning: string | null;
  recommendation: string;
  risk_level: "low" | "medium" | "high" | "critical";
}

export interface DangerousApprovals {
  wallet: string;
  dangerous_approvals_found: number;
  severity: "safe" | "critical";
  approvals: Array<{
    token: string;
    spender: string;
    approved_at: string;
    action_needed: string;
  }>;
  recommendation: string;
  how_to_revoke: string;
}

export interface ApprovalSafetyReport {
  wallet: string;
  overall_safety: "safe" | "critical";
  dangerous_approvals: number;
  dangerous_details: Array<{
    token: string;
    spender: string;
    approved_at: string;
    severity: string;
  }>;
  actions_required: number;
  approval_audit: {
    total_dangerous: number;
    critical_risk: boolean;
    recommendation: string;
  };
  safety_score: number;
  next_steps: string[];
}

export interface CustomThresholds {
  success: boolean;
  user: string;
  custom_thresholds?: {
    critical: number;
    high: number;
    medium: number;
  };
  message?: string;
  error?: string;
}

export interface UserThresholds {
  status: string;
  thresholds: {
    critical: number;
    high: number;
    medium: number;
  };
  set_by: string;
  set_at?: string;
  message?: string;
}

export interface TransactionSimulation {
  status: string;
  function: string;
  will_succeed: boolean;
  failure_reason: string;
  estimated_gas: string;
  expected_output: string;
  risks_detected: string[];
  slippage_risk: "low" | "medium" | "high" | "unknown";
  front_run_risk: "low" | "medium" | "high" | "unknown";
  recommendation: string;
  safe_to_execute: boolean;
}
