# Dashboard Quick Start Guide

## What's New?

The Security Dashboard has been completely updated to support all features of the new SecurityGuard smart contract. You now have access to:

- 🤖 **AI-Powered Recommendations** - Get smart suggestions on what to do next
- 🔮 **Proactive Threat Predictions** - Know about threats before they happen
- 🏥 **System Health Monitoring** - Automatic diagnostics and issue detection
- 🔔 **Webhook Notifications** - Real-time alerts to your systems
- 📊 **Enhanced Analytics** - Better threat tracking and pattern analysis

## Dashboard Tabs

### 1. Overview Tab (📊)
**Your Central Hub**
- System health status at a glance
- 5 key metrics: Total scans, Threats detected, Detection rate, Pauses, Avg risk
- Security roster summary
- Current risk thresholds
- Recent activity count
- Quick action buttons (Pause, Resume, Scan)

**When to Use**: Morning check-ins and overall system health monitoring

### 2. Threats & Predictions Tab (⚠️)
**Active Threat Intelligence**
- Visual breakdown of active threats by severity
- Threat escalation risk score (0-100%)
- AI-predicted attack types that might happen next
- Pre-attack patterns already forming
- Recommended preventive actions

**When to Use**: When you see high threat counts or want to understand emerging risks

### 3. Intelligence Tab (🤖)
**AI Insights & Recommendations**
- Priority-scored action items (immediate, short-term, long-term)
- Optimization tips for better detection
- Pattern analysis from historical scan data
- Global threat intelligence
- Emerging exploit patterns

**When to Use**: Planning security strategy, deciding on threshold adjustments

### 4. Health Check Tab (🏥)
**System Diagnostics**
- Overall system health score (0-100)
- Critical issues requiring action
- Warnings about operational risks
- Improvement suggestions
- System readiness status

**When to Use**: Troubleshooting, identifying configuration problems

### 5. Settings Tab (⚙️)
**Configuration Management**
- Webhook URL setup
- Minimum risk threshold for alerts
- Enable/disable webhook notifications
- Current configuration status

**When to Use**: Setting up integrations, changing alert sensitivity

## Key Features Explained

### Threat Severity Colors
```
🔴 Critical (85-100)  → Immediate action required, auto-pauses system
🟠 High (70-84)       → Urgent attention needed
🟡 Medium (50-69)     → Monitor closely, take preventive measures
🟢 Safe (0-49)        → Normal operation
```

### Health Status
```
🟢 Excellent  (80-100) → All systems nominal
🟡 Fair       (60-79)  → Some minor issues
🟠 Poor       (40-59)  → Multiple issues detected
🔴 Critical   (0-39)   → Severe problems, needs immediate attention
```

### Priority Levels (for recommendations)
```
🔴 IMMEDIATE → Do this now (often blocking issues)
🟡 SHORT-TERM → This week (important improvements)
🔵 LONG-TERM  → This month (strategic improvements)
💡 TIPS       → Nice-to-have optimizations
```

## Quick Actions

### Pause System
- Use when under active attack
- Stops all transaction scanning
- Manually triggered by operators
- Shows in "Recent Pauses" count

### Resume System
- Re-enable after threat mitigated
- Owner-only permission
- Resumes monitoring immediately
- See in Health Check for any blocking issues

### Refresh Data
- Updates all dashboard metrics
- Takes ~1-2 seconds
- Automatically refreshes every 30 seconds
- Manual refresh always available via button

## Understanding the Numbers

### System Metrics Explained

| Metric | Meaning | Action at High Values |
|--------|---------|----------------------|
| Total Scans | How many transactions analyzed | Normal growth over time |
| Threats Detected | Count of flagged transactions | Review threat types below |
| Detection Rate % | % of scans that are flagged | >30% = possible tuning needed |
| Emergency Pauses | Times system auto-paused | Review critical threshold setting |
| Avg Risk Score | Average risk of all transactions | >50 = more threats than normal |

### Security Roster

| Item | Means |
|------|-------|
| Operators | How many addresses can trigger pause |
| Blacklisted | Addresses completely blocked |
| Whitelisted | Addresses always allowed (no scan) |
| Tracked | Addresses we're monitoring |

## Common Tasks

### Task: Configure Webhook Alerts
1. Go to **Settings** tab
2. Enter webhook URL (e.g., `https://your-api.com/security-alerts`)
3. Set minimum risk threshold (70 = alert on high threats only)
4. Toggle "Webhooks Enabled" switch
5. Click "Save Configuration"

*Webhook will receive POST requests with threat details when risk ≥ threshold*

### Task: Understand Why System Paused
1. Go to **Overview** tab
2. Check "Emergency Pauses" count
3. Go to **Health Check** tab
4. Look at recent critical issues
5. Review in **Threats & Predictions** tab

### Task: Improve Detection Accuracy
1. Go to **Intelligence** tab
2. Read "Optimization Tips"
3. Review "Short-Term Improvements"
4. Implement suggestions one at a time
5. Monitor detection rate improvement

### Task: Plan Security Improvements
1. Go to **Intelligence** tab
2. Review "Long-Term Strategy" recommendations
3. Go to **Health Check** tab
4. Review improvement suggestions
5. Create timeline for implementation

### Task: Set Alert Sensitivity
1. Go to **Settings** tab
2. Adjust "Minimum Risk Score to Alert" slider
   - Lower value (40) = more alerts
   - Higher value (80) = only critical threats
3. Save and monitor alert volume

## Interpreting Predictions

### When ThreatPredictions show "Action Required"
- Escalation risk is >70%
- Follow recommended preventive actions
- Prepare to pause if risk continues rising
- Review blacklist and whitelist policies

### When you see "Pre-Attack Patterns"
- System detected suspicious behavior
- Not an attack yet, but early warning
- Increase monitoring of those addresses
- Consider preventive blacklisting

## Health Check Issues

### Critical Issue Example
```
🔴 System is paused
→ Solution: Call resume_system() when threat mitigated
→ Impact: No transactions are being scanned
```

### Warning Example
```
⚠️ High threat detection rate (35%)
→ Solution: Review thresholds and optimize
→ Impact: May need threshold adjustment
```

### Improvement Example
```
💡 Webhooks not configured
→ Solution: Set up webhook notifications
→ Impact: Faster incident response
```

## Dashboard Refresh Behavior

- **Auto-refresh**: Every 30 seconds
- **Manual refresh**: Click "🔄 Refresh All Data" button
- **No data loss**: Switching tabs doesn't reset data
- **Loading states**: "Refreshing..." label appears during updates
- **Errors**: Display at top with retry option

## Tips & Tricks

### 💡 Pro Tips
1. **Pin important alerts**: Screenshot critical threat predictions
2. **Set webhook alerts**: Get instant notifications on mobile
3. **Weekly reviews**: Check Intelligence tab for pattern insights
4. **Monthly tune-up**: Adjust thresholds based on detection rates
5. **Health check daily**: 30 seconds to catch issues early

### ⚡ Quick Wins
- Add more operators for better coverage
- Enable webhooks to external monitoring
- Whitelist trusted addresses to reduce false positives
- Review and update blacklist monthly
- Archive old recommendations monthly

### 🔍 Debugging
- **No data showing?**: Click refresh button
- **Webhook not firing?**: Check Settings tab configuration
- **Too many alerts?**: Increase "Minimum Risk Score to Alert"
- **System paused unexpectedly?**: Check Health Check tab
- **Old patterns in recommendations?**: Data updates every 30s

## Dashboard Performance

- **Load time**: ~1-2 seconds initial load
- **Refresh time**: ~500ms for data + 100ms UI update
- **Tab switching**: Instant (data already loaded)
- **Memory usage**: ~5-10MB for full dashboard state
- **Browser support**: Chrome, Firefox, Safari, Edge (latest 2 versions)

## Troubleshooting

### Dashboard not updating?
- Check browser console for errors (F12)
- Click "🔄 Refresh All Data" button
- Verify contract address in `.env` file
- Check network connectivity

### Numbers seem wrong?
- Wait 30 seconds for auto-refresh
- Manual refresh by clicking button
- Check if another admin is making changes
- Verify you're looking at the right account

### Settings not saving?
- Verify wallet is connected
- Check gas/transaction fees
- Look for error message at top of screen
- Try refreshing and trying again

### Webhooks not triggering?
- Verify URL is publicly accessible
- Check webhook server logs
- Verify minimum risk threshold setting
- Test with manual scan at higher risk

## Support & Next Steps

### For Help
1. Check ARCHITECTURE_DIAGRAM.md for component details
2. Review DASHBOARD_UPDATE_SUMMARY.md for feature list
3. Consult GitHub Issues for known problems
4. Contact support with error messages

### To Extend
1. Add custom charts component
2. Implement report exporting
3. Add historical trend analysis
4. Create custom alert rules UI
5. Build mobile native app

---

**Last Updated**: January 9, 2026  
**Version**: 1.0  
**Status**: Production Ready  

For technical architecture details, see **ARCHITECTURE_DIAGRAM.md**  
For complete feature list, see **DASHBOARD_UPDATE_SUMMARY.md**
