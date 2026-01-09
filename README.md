# SecurityGuard Dashboard

A modern, AI-powered security dashboard for real-time blockchain transaction threat detection powered by GenLayer's intelligent contracts.

## Features

✨ **Real-Time Threat Detection**
- AI-powered transaction scanning
- Instant threat level assessment (0-100 risk score)
- Automatic emergency pause on critical threats

📊 **Analytics & Insights**
- Comprehensive security metrics and statistics
- Risk distribution charts and visualizations
- Address risk tracking and historical analysis
- Pattern learning from security events

🛡️ **Security Management**
- Address blacklist/whitelist management
- Multi-operator role-based access
- Configurable threat thresholds
- Emergency pause & resume controls

🔔 **Notifications & Monitoring**
- Webhook integration for real-time alerts
- System health monitoring
- Global threat intelligence feed
- Threat pattern analysis recommendations

🎨 **Modern UI**
- Dark-themed glassmorphism design
- Responsive mobile-friendly interface
- Intuitive navigation and controls
- Real-time data refresh

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- GenLayer contract deployment URL
- (Optional) Webhook service for notifications

### Installation

1. **Clone and install**
```bash
cd Securitydashboard
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:8000
VITE_CONTRACT_ADDRESS=0x...your_contract_address
```

3. **Start development server**
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

4. **Build for production**
```bash
npm run build
npm run preview
```

## Pages & Features

### 🏠 Dashboard
- System status overview with real-time indicators
- Threat detection statistics
- Risk distribution visualizations
- Global threat intelligence
- AI-powered pattern analysis
- Auto-refresh every 30 seconds

### 🔍 Scanner
- Manual transaction threat analysis
- Input fields for:
  - From/To addresses
  - Transaction value (wei)
  - Call data
  - Gas usage
- Detailed scan result cards with exploit detection
- Scan history with risk scores

### 📈 Analytics
- Address risk lookup and tracking
- Detailed security metrics
- System performance statistics
- Risk score and threat level analysis
- Blacklist/whitelist status verification

### ⚙️ Settings
- **Pause Controls**
  - Emergency pause system with reason
  - Resume system with justification
  - System status indicator
  
- **Operator Management**
  - Add new security operators
  - Track operator count
  
- **Address Lists**
  - Blacklist addresses
  - Whitelist trusted addresses
  - Quick management UI
  
- **Threat Thresholds**
  - Adjust critical threshold (auto-pause)
  - Configure high alert level
  - Set medium alert level
  - Visual threshold sliders
  
- **Webhook Config**
  - Set webhook URL
  - Configure minimum risk alert threshold
  - Enable/disable webhooks
  - Test webhook connectivity
  
- **System Info**
  - Display owner address
  - Show monitoring status
  - List total operators
  - Show tracked address count

## Component Architecture

### Core Components
- **Navigation** - Top navigation bar with page routing
- **StatusCard** - Real-time system status indicators
- **ScanResultCard** - Individual scan result display
- **TransactionScanner** - Transaction input and scanning interface
- **RiskCharts** - Recharts visualizations for metrics
- **AdminControls** - Security management interface
- **IntelligencePanel** - Threat intelligence & pattern analysis

### Pages
- **DashboardPage** - Overview and key metrics
- **ScannerPage** - Manual transaction scanning
- **AnalyticsPage** - Detailed analysis and address lookup
- **SettingsPage** - System configuration and admin controls

### Hooks
- **useSecurityGuard** - Main contract interaction hook
  - System status retrieval
  - Transaction scanning
  - Address risk checking
  - Admin operations
  - Webhook management
  - Pattern analysis

## API Integration

The dashboard communicates with the GenLayer SecurityGuard contract through an API:

### Base URL
```
http://localhost:8000 (configurable via VITE_API_URL)
```

### Endpoints Used
- `POST /contract/call` - Call contract methods
  - `get_system_status`
  - `scan_transaction`
  - `emergency_pause`
  - `resume_system`
  - `get_address_risk`
  - `get_blacklist`
  - `get_whitelist`
  - `get_threat_intelligence`
  - `configure_webhook`
  - `analyze_patterns`

## Styling

### Tailwind CSS
- Custom dark theme with glassmorphism
- Responsive grid layouts
- Color-coded threat levels:
  - 🟢 Low (0-49): Green
  - 🟡 Medium (50-69): Yellow
  - 🟠 High (70-84): Orange
  - 🔴 Critical (85-100): Red

### Custom Classes
- `.glass` - Glassmorphism effect
- `.glass-dark` - Dark glass variant
- `.gradient-*` - Gradient backgrounds
- `.pulse-glow` - Critical alert animation
- `.risk-*` - Threat level colors

## Threat Detection

The AI analyzes transactions for:
1. **Reentrancy attacks** - Callback pattern detection
2. **Flash loan exploits** - Large temporary transfers
3. **Front-running/MEV** - Gas price & timing patterns
4. **Oracle manipulation** - Price feed tampering
5. **Suspicious gas patterns** - Unusual gas usage
6. **Large transfers** - Significant value movements
7. **Malicious calldata** - Known exploit signatures
8. **Unauthorized access** - Privilege escalation
9. **Phishing patterns** - Known scam signatures
10. **Brute force** - Multiple failed transactions

## Risk Scoring Guide

| Score | Level | Action | Auto-Pause |
|-------|-------|--------|-----------|
| 0-49 | Low | None | ❌ |
| 50-69 | Medium | Log | ❌ |
| 70-84 | High | Alert | ❌ |
| 85-100 | Critical | Block | ✅ |

## Emergency Features

🚨 **Auto-Pause on Critical Threat**
- Automatically triggered at risk score ≥ 85
- Attacker address auto-blacklisted
- Full system pause
- Audit trail recorded

🔒 **Manual Emergency Controls**
- Operators can trigger pause with reason
- Owner only can resume system
- Requires justification for audit trail

## Development

### Project Structure
```
src/
├── components/      # React components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── types/          # TypeScript types
├── App.tsx         # Main app component
├── main.tsx        # Entry point
├── App.css         # App styles
└── index.css       # Global styles
```

### Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint (if configured)
npm run type-check # Check TypeScript (if configured)
```

### Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Ethers.js** - Blockchain utilities

## Security Considerations

⚠️ **Important Notes**
- This dashboard is a frontend interface
- It requires secure backend API connection
- Never commit `.env.local` with sensitive keys
- Validate all user inputs before contract calls
- Use HTTPS in production
- Implement API authentication/authorization

## Performance

- **Auto-refresh**: Dashboard updates every 30 seconds
- **Lazy loading**: Pages load on demand
- **Optimized renders**: React memoization
- **Chart optimization**: Recharts performance tuning

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Contract Connection Issues
```bash
# Check API URL in .env.local
# Verify backend service is running
# Check CORS configuration
```

### Missing Data Display
- Ensure contract has been deployed
- Verify VITE_CONTRACT_ADDRESS is set
- Check browser console for API errors

### Styling Issues
- Clear cache: `npm run build`
- Restart dev server
- Check Tailwind CSS configuration

## Contributing

To enhance the dashboard:
1. Add new component to `src/components/`
2. Create corresponding hook if needed
3. Import and integrate in appropriate page
4. Test thoroughly before committing

## License

This project is part of the GenLayer ecosystem.

## Support

For issues or questions:
- Check GenLayer documentation
- Review contract implementation
- Test with sample data first
- Check browser console for errors

## Roadmap

🚀 **Future Enhancements**
- Real-time WebSocket updates
- Advanced filtering and search
- Export/import blacklist & whitelist
- Multi-chain support
- Historical graph comparisons
- Custom threshold profiles
- User role management
- Notification preferences
- Mobile app version

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
