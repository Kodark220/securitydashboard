# SecurityGuard Dashboard - Quick Start Guide

## ✅ Installation Complete

Your SecurityGuard Dashboard is ready to use! Here's what was created:

### Project Structure

```
Securitydashboard/
├── src/
│   ├── components/
│   │   ├── AdminControls.tsx       - System pause, operators, blacklist/whitelist, thresholds
│   │   ├── IntelligencePanel.tsx   - Threat intelligence & pattern analysis
│   │   ├── Navigation.tsx          - App navigation & routing
│   │   ├── RiskCharts.tsx          - Analytics visualizations (Recharts)
│   │   ├── ScanResultCard.tsx      - Individual scan result display
│   │   ├── StatusCard.tsx          - System metrics dashboard
│   │   └── TransactionScanner.tsx  - Transaction input & scanning interface
│   ├── hooks/
│   │   └── useSecurityGuard.ts     - Contract interaction & API calls
│   ├── lib/
│   │   └── config.ts               - Environment configuration
│   ├── pages/
│   │   ├── DashboardPage.tsx       - Main dashboard with overview
│   │   ├── ScannerPage.tsx         - Transaction scanning interface
│   │   ├── AnalyticsPage.tsx       - Risk analysis & address lookup
│   │   └── SettingsPage.tsx        - Admin controls & configuration
│   ├── types/
│   │   └── contract.ts             - TypeScript interfaces
│   ├── App.tsx                     - Main app component
│   ├── index.css                   - Tailwind + global styles
│   └── main.tsx                    - React entry point
├── .env.example                    - Environment template
├── vite.config.ts                  - Vite configuration
├── tailwind.config.js              - Tailwind CSS config
├── tsconfig.json                   - TypeScript config
└── package.json                    - Dependencies
```

## 🚀 Getting Started

### 1. Configure Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your contract address
VITE_CONTRACT_ADDRESS=0x<your-deployed-address>
```

### 2. Start Development Server

```bash
npm run dev
```

The dashboard opens at: **http://localhost:5173**

### 3. Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Features Overview

### 📊 Dashboard Page
- **System Status**: Real-time operational state (Active/Paused)
- **Metrics Cards**: Total scans, threats detected, emergency pauses
- **Security Charts**: 
  - Bar chart of statistics
  - Pie chart of threat distribution
  - Address management visualization
  - System health summary
- **Intelligence Panel**: 
  - Global threat landscape
  - Common exploits
  - System health assessment
  - Pattern recommendations

### 🔍 Scanner Page
- **Transaction Input**: From/to addresses, value, calldata, gas
- **AI Analysis**: Real-time threat detection powered by GenLayer
- **Risk Scoring**: 0-100 scale with threat levels
- **Exploit Detection**: Identifies common blockchain attack patterns
- **Emergency Actions**: Auto-pause on critical threats (≥85)
- **Scan History**: Complete record of all scans performed

### 📈 Analytics Page
- **Address Lookup**: Search any address for risk assessment
- **Risk Metrics**: 
  - Historical trends
  - Detection rates
  - False positive analysis
- **System Statistics**: Comprehensive security metrics dashboard
- **Visualization Charts**: Multiple data perspectives

### ⚙️ Settings Page
- **Emergency Controls**: Pause/Resume system
- **Operator Management**: Add security team members
- **Address Lists**:
  - Blacklist: Block high-risk addresses
  - Whitelist: Bypass scanning for trusted addresses
- **Threshold Configuration**:
  - Critical (auto-pause): Default 85
  - High alert: Default 70
  - Medium alert: Default 50
- **Webhook Setup**: Configure alert notifications
- **System Info**: Owner, status, operators count

## 🔐 Risk Scoring System

| Score Range | Level | Action |
|-----------|-------|--------|
| 0-49 | **Low** | Standard transaction |
| 50-69 | **Medium** | Logged for review |
| 70-84 | **High** | Threat detected |
| 85-100 | **Critical** | Emergency pause |

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP**: Axios
- **UI Components**: Custom + shadcn-inspired

## 📚 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🔗 Environment Variables

All variables are optional except `VITE_CONTRACT_ADDRESS`:

```env
# Required - Your deployed SecurityGuard contract
VITE_CONTRACT_ADDRESS=0x...

# GenLayer Configuration
VITE_GENLAYER_RPC_URL=https://studio.genlayer.com/api
VITE_GENLAYER_CHAIN_ID=61999
VITE_GENLAYER_CHAIN_NAME=GenLayer Studio

# Feature Toggles
VITE_ENABLE_MOCK_DATA=false
VITE_POLLING_INTERVAL=30000
```

## 🔗 Integration with SecurityGuard Contract

The dashboard calls these contract methods:

### Read Methods (View-Only)
```typescript
getSystemStatus()              // System state & statistics
getAddressRisk(address)        // Risk score for address
getBlacklist()                 // All blacklisted addresses
getWhitelist()                 // All whitelisted addresses
getThreatIntelligence()        // Current threat landscape
analyzePatterns()              // Pattern analysis from history
```

### Write Methods (Require Transaction)
```typescript
scanTransaction(...)           // Scan transaction for threats
emergencyPause(reason)         // Pause system (operators only)
resumeSystem(justification)    // Resume system (owner only)
addOperator(address)           // Add team member (owner only)
blacklistAddress(address)      // Block address (operators only)
whitelistAddress(address)      // Allow address (owner only)
updateThresholds(...)          // Change risk thresholds (owner only)
configureWebhook(...)          // Setup alert webhook (owner only)
```

## 💡 Tips & Best Practices

### For Development
1. **Hot Reload**: Changes auto-refresh during development
2. **TypeScript**: Full type safety for all contract interactions
3. **Error Handling**: All API calls wrapped with error boundaries
4. **Console Logging**: Check browser console for debugging

### For Deployment
1. **Environment Setup**: Configure `VITE_CONTRACT_ADDRESS` before build
2. **Build Size**: Current bundle ~600KB (gzipped ~185KB)
3. **Performance**: Polling interval default 30 seconds
4. **Security**: Never commit `.env` with real contract addresses

## 🐛 Troubleshooting

### "Contract address not configured"
→ Set `VITE_CONTRACT_ADDRESS` in `.env` and restart dev server

### Build fails with "rolldown-vite" errors
→ Run `npm install` again and clear cache: `rm -rf dist node_modules`

### Charts not rendering
→ Check browser console for Recharts errors, ensure data format is correct

### API calls failing
→ Verify GenLayer Studio is running and RPC URL is correct

## 📖 Additional Resources

- [GenLayer Docs](https://docs.genlayer.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

## 🎓 Next Steps

1. **Deploy Contract**: Use GenLayer CLI to deploy `SecurityGuard` contract
2. **Configure Dashboard**: Add contract address to `.env`
3. **Test Features**: Try scanning transactions and analyzing threats
4. **Customize**: Modify colors, layouts, add new pages
5. **Deploy**: Build and deploy to Vercel, Netlify, or your server

## 📞 Support

For issues or questions:
- Check GenLayer documentation
- Review component props in source files
- Inspect browser console for errors
- Test contract methods independently

---

**Happy securing! 🛡️**
