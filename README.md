# Bradley's Finance Hub

<div align="center">
  <h3>💼 Comprehensive Financial Management Progressive Web App</h3>
  <p>Take complete control of your finances with powerful tools for debt management, budgeting, savings tracking, and financial planning</p>
  
  [![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange.svg)](https://firebase.google.com/)
  [![Firestore](https://img.shields.io/badge/Firestore-Database-green.svg)](https://firebase.google.com/docs/firestore)
  [![PWA](https://img.shields.io/badge/PWA-Enabled-blue.svg)](https://web.dev/progressive-web-apps/)
  [![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
</div>

---

## 📱 About

Bradley's Finance Hub is a modern Progressive Web App (PWA) designed to help you manage every aspect of your financial life. Built with vanilla JavaScript and Firebase, the app provides comprehensive tools for debt management, budgeting, savings tracking, tax estimation, and financial optimization using velocity banking and zero-based budgeting principles.

**🔒 Privacy-First**: Your financial data is stored securely in Firebase Firestore with authentication and encrypted connections.

**📱 Mobile-Optimized**: Fully responsive design works seamlessly on desktop, tablet, and mobile devices.

**⚡ Performance**: Built for speed with optimized code, lazy loading, and efficient data caching.

---

## ✨ Features

### 💳 **1. Debt Tracker**
- Track multiple debts with detailed information
- Monitor balances, interest rates, and minimum payments
- Calculate total debt and average interest rates
- Payment due date tracking
- Full CRUD operations (Create, Read, Update, Delete)

### 💰 **2. Budget Tracker**
- Monthly budget creation and tracking by category
- Track budgeted vs. spent amounts
- Visual progress bars with percentage tracking
- Month-by-month budget history
- Budget alerts when approaching limits

### 🎯 **3. Savings Goal Tracker**
- Set multiple savings goals with target amounts
- Track progress with visual progress bars
- Priority-based goal management (Low, Medium, High)
- Target date planning
- Current vs. target amount tracking

### ⚡ **4. Velocity Calculator**
- Optimize debt payoff using velocity banking principles
- Compare traditional vs. velocity banking strategies
- Calculate interest savings and time savings
- Line of credit integration calculations

### 💎 **5. Net Worth Tracker**
- Track total assets and liabilities
- Calculate and monitor net worth over time
- Visual breakdown of assets vs. liabilities
- Integration with debt data for accurate tracking

### 💳 **6. Credit Score Estimator**
- Estimate credit score based on financial factors
- Factor analysis: Payment History (35%), Credit Utilization (30%), Credit Age (15%), Credit Mix (10%), New Credit (10%)
- Visual score display with color-coded ranges
- Detailed score breakdown by factor

### 📟 **7. 1099 Tax Estimator**
- Calculate quarterly tax payments for self-employed individuals
- Self-employment tax calculations (15.3%)
- Federal income tax estimation
- Quarterly payment breakdown (Q1-Q4)
- Support for different filing statuses

### 🔔 **8. Notifications**
- Financial alerts and notifications
- Budget warnings and overspend alerts
- Savings goal milestones
- High-interest debt warnings
- Mark as read / mark all as read functionality

### 🧾 **9. Activity Feed**
- Complete financial activity history
- Chronological timeline of all financial events
- Aggregates data from debts, budgets, goals, and net worth
- Activity icons and descriptions
- Date/time formatting

### 🏆 **10. Challenge Library**
- 6 pre-built savings challenges:
  - **52-Week Challenge**: Save $1,378 over a year
  - **365-Day Penny Challenge**: Save $667.95 over a year
  - **100 Envelope Challenge**: Save $5,050 over 2 years
  - **No-Spend Month Challenge**: Break spending habits
  - **Biweekly $100 Challenge**: Save $2,600 annually
  - **Spare Change Challenge**: Save all change daily
- Challenge details and descriptions
- Direct integration with Savings Goal Tracker

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Progressive Web App**: Service Worker, Web App Manifest
- **Build Tools**: None (direct deployment from source)
- **Hosting**: Firebase Hosting
- **Database**: Cloud Firestore
- **Authentication**: Firebase Authentication

---

## 📋 Requirements

- **Browser**: Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Firebase Account**: For hosting and backend services
- **Node.js** (Optional): For Firebase CLI tools
- **Firebase CLI**: For deployment (install via `npm install -g firebase-tools`)

---

## 🚀 Getting Started

### Prerequisites

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ronb12/Bradleys-Financial-Hub.git
   cd Bradleys-Financial-Hub
   ```

2. **Initialize Firebase** (if starting fresh):
   ```bash
   firebase init
   ```
   - Select: Hosting, Firestore
   - Use existing project: `mobile-debt-tracker`

### Configuration

1. **Firebase Configuration**:
   - The Firebase configuration is already set in `config/firebase-config.js`
   - For a new project, update the config with your Firebase project credentials

2. **App Configuration**:
   - Review `config/config.js` for app settings
   - Configure session timeout, security settings, and feature flags

3. **Firestore Security Rules**:
   - Security rules are defined in `firestore.rules`
   - Rules ensure users can only access their own data
   - Deploy rules: `firebase deploy --only firestore:rules`

4. **Firestore Indexes**:
   - Indexes are defined in `firestore.indexes.json`
   - Required for queries using `where()` + `orderBy()`
   - Deploy indexes: `firebase deploy --only firestore:indexes`

---

## 📁 Project Structure

```
Bradleys-Financial-Hub/
├── config/                  # Configuration files
│   ├── config.js            # App configuration and settings
│   └── firebase-config.js   # Firebase initialization
├── scripts/                 # Core application scripts
│   ├── auth.js             # Authentication logic and session management
│   └── service-worker.js   # Service worker for PWA and offline support
├── dist/                    # Build/deployment directory (deployed to Firebase)
│   ├── index.html          # Main dashboard page
│   ├── src/pages/          # All application pages
│   │   ├── debt/           # Debt Tracker
│   │   ├── other/          # Budget, Net Worth, Notifications, Activity Feed
│   │   ├── savings/        # Savings Goals, Challenge Library
│   │   └── calculators/    # Velocity Calculator, Credit Score, 1099 Tax
│   ├── utils/              # Utility scripts
│   │   ├── dataService.js  # Firestore data operations (CRUD)
│   │   ├── authHelper.js   # Authentication helpers
│   │   ├── themeManager.js # Dark/light theme management
│   │   └── ...             # Other utility scripts
│   ├── config.js           # Config (copied to dist)
│   ├── auth.js             # Auth (copied to dist)
│   └── firebase-config.js  # Firebase config (copied to dist)
├── src/                     # Source code (development)
│   ├── components/         # Reusable components
│   └── pages/              # Page components
├── docs/                    # Documentation
│   ├── markdown/           # Technical documentation
│   └── logs/               # Test logs and reports
├── firebase.json            # Firebase configuration (hosting, firestore)
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore composite indexes
├── .firebaserc              # Firebase project configuration
└── README.md                # This file
```

---

## 🏗️ Architecture

### Data Flow

1. **Authentication**: Firebase Authentication handles user login/logout
2. **Data Storage**: Cloud Firestore stores all user financial data
3. **Data Access**: `dataService.js` provides CRUD operations for all collections
4. **UI Updates**: Vanilla JavaScript manipulates DOM based on data changes
5. **Real-time Updates**: Firestore listeners (optional) for real-time data sync

### Collections Structure

- **users**: User profile data
- **debts**: Debt records with userId, balance, interest rate, payments
- **budgets**: Budget records with userId, category, amounts, month
- **savingsGoals**: Savings goals with userId, target/current amounts, dates
- **netWorth**: Net worth snapshots with userId, assets, liabilities
- **activities**: Activity log entries with userId, type, description, amounts

### Security

- **Firestore Rules**: User-based access control (users can only access their own data)
- **Authentication**: Required for all data operations
- **Data Isolation**: All queries filtered by `userId` field
- **Encryption**: Firebase handles encryption in transit and at rest

---

## 🚀 Deployment

### Deploy All Services

```bash
firebase deploy
```

### Deploy Specific Services

**Deploy Hosting Only**:
```bash
firebase deploy --only hosting
```

**Deploy Firestore Rules Only**:
```bash
firebase deploy --only firestore:rules
```

**Deploy Firestore Indexes Only**:
```bash
firebase deploy --only firestore:indexes
```

### Deployment Process

1. **Build** (if needed): Ensure `dist/` folder contains latest files
2. **Deploy Hosting**: `firebase deploy --only hosting`
3. **Deploy Rules**: `firebase deploy --only firestore:rules`
4. **Deploy Indexes**: `firebase deploy --only firestore:indexes`

**Note**: The `dist/` folder is not tracked in git (in `.gitignore`). Deploy directly from local `dist/` folder.

---

## 🔧 Development

### Local Development

1. **Serve locally** (for testing):
   ```bash
   cd dist
   python3 -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Use Firebase Emulator** (advanced):
   ```bash
   firebase emulators:start
   ```

### Code Organization

- **Separation of Concerns**: Utilities, services, and pages are separated
- **Modular Design**: Each page is self-contained HTML file
- **Shared Utilities**: Common functionality in `/utils` directory
- **Data Layer**: All Firestore operations centralized in `dataService.js`

---

## 📚 API Documentation

### DataService API

All data operations go through `window.DataService`:

```javascript
// Debts
await window.DataService.getDebts()
await window.DataService.addDebt(debtData)
await window.DataService.updateDebt(debtId, debtData)
await window.DataService.deleteDebt(debtId)

// Budgets
await window.DataService.getBudgets()
await window.DataService.addBudget(budgetData)
await window.DataService.updateBudget(budgetId, budgetData)
await window.DataService.deleteBudget(budgetId)

// Savings Goals
await window.DataService.getSavingsGoals()
await window.DataService.addSavingsGoal(goalData)
await window.DataService.updateSavingsGoal(goalId, goalData)
await window.DataService.deleteSavingsGoal(goalId)

// Net Worth
await window.DataService.getNetWorth()
await window.DataService.saveNetWorth(netWorthData)

// Activities
await window.DataService.getActivities(limitCount)
await window.DataService.addActivity(activityData)

// Helpers
window.DataService.formatDate(timestamp)
window.DataService.formatCurrency(amount)
```

### Authentication API

```javascript
// Check authentication
await window.waitForAuth()

// Global auth functions
window.logout()
window.extendSession()
window.login(email, password)
window.register(email, password, displayName)
```

---

## 🔒 Security & Privacy

### Data Security

- **Authentication Required**: All data operations require authenticated user
- **User Isolation**: Firestore rules ensure users can only access their own data
- **Encrypted Connections**: All data transmitted over HTTPS
- **Secure Storage**: Firebase encrypts data at rest

### Privacy Policy

For detailed privacy information, see: [Privacy Policy](https://ronb12.github.io/Bradleys-Financial-Hub/privacy-policy.html)

---

## 📊 Performance

- **Lazy Loading**: Scripts and resources loaded on demand
- **Service Worker**: Offline support and asset caching
- **Optimized Queries**: Firestore indexes for fast queries
- **Efficient Rendering**: DOM manipulation optimized for performance
- **Minimal Dependencies**: Vanilla JavaScript (no heavy frameworks)

---

## 🐛 Troubleshooting

### Common Issues

**"Missing or insufficient permissions" Error**:
- Ensure Firestore security rules are deployed: `firebase deploy --only firestore:rules`
- Verify user is authenticated: Check `window.auth.currentUser`

**"The query requires an index" Error**:
- Deploy Firestore indexes: `firebase deploy --only firestore:indexes`
- Or click the link in the error to create the index automatically

**Module Import Errors**:
- Ensure `auth.js` and `firebase-config.js` are loaded as modules: `<script type="module">`
- Check import paths use absolute paths (starting with `/`)

**Service Worker Issues**:
- Clear browser cache and service workers
- Unregister old service workers: Visit `/unregister_sw.html` (if available)

---

## 🌐 Live Sites

- **Production (Firebase)**: [https://mobile-debt-tracker.web.app/](https://mobile-debt-tracker.web.app/)
- **GitHub Pages**: [https://ronb12.github.io/Bradleys-Financial-Hub/](https://ronb12.github.io/Bradleys-Financial-Hub/)

---

## 📖 Additional Documentation

Technical documentation available in `docs/markdown/`:
- `PROJECT_STRUCTURE.md` - Detailed project structure
- `CONSOLE_ERRORS_FIXED.md` - Error resolution guide
- `SERVICE_WORKER_CACHE_FIX.md` - Service worker documentation

---

## 🤝 Contributing

This is a personal project. Contributions and suggestions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

Copyright © 2025 Bradley's Finance Hub. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

---

## 🔗 Links

- **Live App**: [mobile-debt-tracker.web.app](https://mobile-debt-tracker.web.app/)
- **GitHub Repository**: [github.com/ronb12/Bradleys-Financial-Hub](https://github.com/ronb12/Bradleys-Financial-Hub)
- **Privacy Policy**: [View Online](https://ronb12.github.io/Bradleys-Financial-Hub/privacy-policy.html)

---

## 📞 Support

For support, questions, or feature requests:
- Open an issue on [GitHub](https://github.com/ronb12/Bradleys-Financial-Hub/issues)
- Contact: [GitHub Profile](https://github.com/ronb12)

---

<div align="center">
  <p>Made with ❤️ using Firebase and Progressive Web App technologies</p>
  <p><strong>Bradley's Finance Hub</strong> - Comprehensive Financial Management Tools</p>
  <p>© 2025 Bradley's Finance Hub. All rights reserved.</p>
</div>
