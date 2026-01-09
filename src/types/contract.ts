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
