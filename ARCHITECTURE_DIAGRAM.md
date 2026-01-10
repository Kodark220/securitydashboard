# Dashboard Architecture & Component Structure

## Component Hierarchy

```
App
└── DashboardPage
    ├── Tab Navigation
    │   ├── Overview
    │   ├── Threats & Predictions
    │   ├── Intelligence
    │   ├── Health Check
    │   └── Settings
    │
    ├── [Overview Tab]
    │   ├── SystemDashboardCard
    │   │   ├── Health Status Badge
    │   │   ├── Metrics Grid (5 cards)
    │   │   ├── Security Roster (4 cards)
    │   │   ├── Risk Thresholds (3 items)
    │   │   ├── Recent Activity (4 cards)
    │   │   └── Quick Actions (3 buttons)
    │   ├── StatusCard (existing)
    │   └── RiskCharts (existing)
    │
    ├── [Threats & Predictions Tab]
    │   ├── ThreatSummaryCard
    │   │   ├── Visual Summary
    │   │   ├── Alert Status
    │   │   ├── Threat Breakdown (Critical/High/Medium)
    │   │   ├── Statistics Grid
    │   │   └── Recommendations
    │   └── ThreatPredictions
    │       ├── Escalation Risk Bar
    │       ├── Predicted Attacks List
    │       ├── Risk Patterns
    │       ├── Confidence Score
    │       └── Preventive Actions
    │
    ├── [Intelligence Tab]
    │   ├── AIRecommendationsPanel
    │   │   ├── Priority Score Indicator
    │   │   ├── Immediate Actions (red)
    │   │   ├── Short-Term Improvements (yellow)
    │   │   ├── Long-Term Strategy (blue)
    │   │   ├── Optimization Tips (green)
    │   │   └── Statistics Summary
    │   └── IntelligencePanel (existing)
    │       ├── Threat Intelligence
    │       └── Pattern Analysis
    │
    ├── [Health Check Tab]
    │   └── HealthCheck
    │       ├── Health Score Progress Bar
    │       ├── Critical Issues Section
    │       ├── Warnings Section
    │       ├── Improvements Section
    │       └── System Ready Indicator
    │
    ├── [Settings Tab]
    │   └── WebhookConfigPanel
    │       ├── URL Input
    │       ├── Risk Threshold Slider
    │       ├── Enable/Disable Toggle
    │       ├── Status Display
    │       └── Save Button
    │
    └── Refresh Button (Global)
```

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│      useSecurityGuard Hook              │
│  (Central Data Management)              │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┼──────────┬─────────────────────┬─────────────────┬────────────┐
        │          │          │                     │                 │            │
        v          v          v                     v                 v            v
 getSystemStatus getThreat getAddressRisk getThreatIntl configureWebhook analyzePatterns
 getSystemDash   Prediction getBlacklist getThreatSummary getHealthCheck getAIRecommendations
 getThreatSummary            getWhitelist resumeSystem emergencyPause predictThreatsProactive
                                          ...          ...            ...

                                        │
                                        v
                                   
                    ┌──────────────────────────────────┐
                    │   DashboardPage Component       │
                    │   (State Management & Routing)  │
                    └──────────┬──────────────────────┘
                               │
            ┌──────────────────┼──────────────────┬──────────────────┬──────────────────┐
            │                  │                  │                  │                  │
            v                  v                  v                  v                  v
        Overview          Threats &          Intelligence         Health Check      Settings
        Tab              Predictions Tab      Tab                  Tab                Tab
            │                  │                  │                  │                  │
            ├─ SystemDash   ├─ ThreatSummary  ├─ AIRecommend    ├─ HealthCheck   ├─ WebhookConfig
            ├─ StatusCard   └─ ThreatPredicts └─ Intelligence   └─ (diagnostics) └─ (configuration)
            └─ RiskCharts
```

## Data Models & Interfaces

```typescript
// System Overview
SystemDashboard {
  system_status: { health, icon, paused, monitoring, owner }
  metrics: { total_scans, threats_detected, detection_rate, pauses, avg_risk }
  security_roster: { operators, blacklisted, whitelisted, tracked }
  risk_assessment: { thresholds, health_level }
  recent_activity: { threats, scans, recommendations, predictions }
  quick_actions: { pause_enabled, resume_enabled, can_scan }
}

// Threat Summary
ThreatSummary {
  threat_breakdown: { critical, high, medium, total }
  visual_summary: string
  system_alert: boolean
  alert_message: string
  action_items: number
}

// AI Recommendations
AIRecommendations {
  status: string
  recommendations: {
    immediate_actions: string[]
    short_term: string[]
    long_term: string[]
    optimization_tips: string[]
    priority_score: 0-100
  }
  urgent: boolean
}

// Threat Prediction
ThreatPrediction {
  status: string
  threat_prediction: {
    predicted_attacks: string[]
    high_risk_patterns: string[]
    escalation_risk: 0-100
    preventive_actions: string[]
    confidence: 0-100
  }
  action_required: boolean
  recommended_actions: string[]
}

// System Health
HealthCheckReport {
  health_score: 0-100
  health_status: "excellent|poor|fair|critical"
  issues: Array<Issue>
  warnings: Array<Warning>
  improvements: Array<Improvement>
  total_issues: number
  system_ready: boolean
}

// Webhook Configuration
WebhookConfig {
  url: string
  enabled: boolean
  min_risk_threshold: 0-100
}
```

## Color Coding System

```
Severity Levels:
  🔴 Critical  → Red (RGB: 220, 53, 69)      - bg-red-500/20 text-red-400
  🟠 High      → Orange (RGB: 251, 146, 60)  - bg-orange-500/20 text-orange-400
  🟡 Medium    → Yellow (RGB: 245, 158, 11)  - bg-yellow-500/20 text-yellow-400
  🟢 Safe/Low  → Green (RGB: 34, 197, 94)    - bg-green-500/20 text-green-400
  🔵 Info      → Blue (RGB: 59, 130, 246)    - bg-blue-500/20 text-blue-400

Health Status:
  🟢 Excellent → Green
  🟡 Fair      → Yellow
  🟠 Poor      → Orange
  🔴 Critical  → Red
```

## Component Props Interface

```typescript
// SystemDashboardCard
interface SystemDashboardProps {
  dashboard: SystemDashboard | null
  loading?: boolean
}

// ThreatSummaryCard
interface ThreatSummaryProps {
  summary: ThreatSummary | null
  loading?: boolean
}

// AIRecommendationsPanel
interface AIRecommendationsProps {
  recommendations: AIRecommendations | null
  loading?: boolean
}

// ThreatPredictions
interface ThreatPredictionsProps {
  prediction: ThreatPrediction | null
  loading?: boolean
}

// HealthCheck
interface HealthCheckProps {
  report: HealthCheckReport | null
  loading?: boolean
}

// WebhookConfigPanel
interface WebhookConfigProps {
  config: WebhookConfig | null
  onConfigure: (url: string, enabled: boolean, minRisk: number) => Promise<any>
  loading?: boolean
}
```

## API Call Sequence

```
Component Mount
    │
    ├─ loadData() function called
    │
    └─ Promise.all([
        1. getSystemStatus()
        2. getThreatIntelligence()
        3. analyzePatterns()
        4. getSystemDashboard()
        5. getThreatSummary()
        6. getAIRecommendations()
        7. predictThreatsProactive()
        8. systemHealthCheck()
        9. getWebhookConfig()
    ])
    
    ├─ Set all state variables simultaneously
    │
    ├─ Render active tab with latest data
    │
    └─ Set interval for 30-second refresh
```

## State Management

```typescript
DashboardPage State:
├── status: SystemStatus
├── intelligence: ThreatIntelligence
├── patterns: PatternAnalysis
├── dashboard: SystemDashboard
├── threatSummary: ThreatSummary
├── recommendations: AIRecommendations
├── predictions: ThreatPrediction
├── health: HealthCheckReport
├── webhookConfig: WebhookConfig
├── error: string
└── activeTab: 'overview'|'threats'|'intelligence'|'health'|'settings'
```

## Tab Navigation Logic

```typescript
activeTab === 'overview' → Show SystemDashboardCard + StatusCard + RiskCharts
activeTab === 'threats' → Show ThreatSummaryCard + ThreatPredictions
activeTab === 'intelligence' → Show AIRecommendationsPanel + IntelligencePanel
activeTab === 'health' → Show HealthCheck
activeTab === 'settings' → Show WebhookConfigPanel
```

## File Structure

```
src/
├── components/
│   ├── SystemDashboardCard.tsx        (NEW - Overview metrics)
│   ├── ThreatSummary.tsx              (NEW - Threat breakdown)
│   ├── AIRecommendations.tsx          (NEW - AI suggestions)
│   ├── ThreatPredictions.tsx          (NEW - Threat predictions)
│   ├── HealthCheck.tsx                (NEW - Health diagnostics)
│   ├── WebhookConfig.tsx              (NEW - Webhook setup)
│   ├── StatusCard.tsx                 (EXISTING)
│   ├── RiskCharts.tsx                 (EXISTING)
│   ├── IntelligencePanel.tsx          (EXISTING)
│   ├── Navigation.tsx                 (EXISTING)
│   ├── AdminControls.tsx              (EXISTING)
│   └── ...
├── hooks/
│   └── useSecurityGuard.ts            (UPDATED - new methods)
├── pages/
│   └── DashboardPage.tsx              (UPDATED - tabbed interface)
├── types/
│   └── contract.ts                    (UPDATED - new interfaces)
└── ...
```

## Responsive Breakpoints

- **Mobile** (< 640px): Single column layouts, stacked cards
- **Tablet** (640px - 1024px): 2-column grids, compact cards
- **Desktop** (> 1024px): Multi-column grids, full-sized cards

## Performance Considerations

1. **Parallel Data Loading**: All API calls made simultaneously using Promise.all()
2. **Memoization**: useCallback hooks prevent unnecessary re-renders
3. **Lazy Loading**: Tab content only rendered when tab is active
4. **Auto-Refresh**: 30-second interval balances freshness with performance
5. **Error Isolation**: Component errors don't cascade (graceful fallbacks)

## Accessibility Features

- Semantic HTML structure
- Color contrast meeting WCAG standards
- Icon + text labels for clarity
- Keyboard navigable tabs
- Loading state indicators
- Error messages with clear actions

---

**Last Updated**: January 9, 2026
**Version**: 1.0
**Status**: Production Ready
