# Bradley's Finance Hub - Web App

<div align="center">
  <h3>Progressive Web App for Financial Management</h3>
  <p>Track debts, manage budgets, achieve savings goals, and optimize your finances with velocity banking principles</p>
  
  [![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange.svg)](https://firebase.google.com/)
  [![PWA](https://img.shields.io/badge/PWA-Enabled-green.svg)](https://web.dev/progressive-web-apps/)
  [![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
</div>

---

## 📱 About

Bradley's Finance Hub is a Progressive Web App (PWA) designed to help you take complete control of your finances. Built with vanilla JavaScript and Firebase, the app provides powerful tools for debt management, budgeting, savings tracking, and financial planning using velocity banking and zero-based budgeting principles.

**Privacy-First**: Your financial data is stored securely in Firebase with authentication and encryption.

## ✨ Features

### 💳 Debt Management
- Track all your debts in one place
- Debt snowball and avalanche payoff strategies
- Payment history and progress tracking
- Debt payoff timeline visualization
- Interest rate calculations

### 💰 Budgeting
- Monthly budget creation and tracking
- Zero-based budgeting system
- Envelope budgeting method
- Budget categories and alerts
- Spending vs. budgeted comparisons

### 🎯 Savings Goals
- Set and track multiple savings goals
- Progress visualization
- Target date planning
- Contribution tracking
- Priority-based goal management

### 📊 Financial Overview
- Net worth calculator and tracking
- Financial health score
- Credit score estimator
- Comprehensive financial reports
- Interactive charts and graphs

### 🏦 Account Management
- Multiple account tracking
- Transaction history
- Recurring transaction management
- Account balance monitoring

### ⚡ Velocity Banking
- Velocity calculator for debt optimization
- Payment strategy recommendations
- Cash flow analysis
- Debt payoff acceleration tools

## 🛠️ Technical Details

- **Platform**: Web (Progressive Web App)
- **Hosting**: Firebase Hosting
- **Backend**: Firebase (Authentication, Firestore)
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Service Worker**: Offline support and caching

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (for hosting and backend services)

## 🚀 Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Firebase:
   - Copy `config/config.js.example` to `config/config.js`
   - Add your Firebase configuration

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## 📁 Project Structure

```
├── config/              # Configuration files
│   ├── config.js        # App configuration
│   └── firebase-config.js  # Firebase initialization
├── scripts/             # Core application scripts
│   ├── auth.js         # Authentication logic
│   └── service-worker.js  # Service worker for PWA
├── src/                 # Source code
│   ├── components/      # Reusable components
│   └── pages/        # Page components
├── dist/                # Build output (deployed to Firebase)
├── public/              # Public assets
├── docs/                # Documentation (GitHub Pages)
├── firebase.json        # Firebase Hosting configuration
└── README.md           # This file
```

## 🔒 Privacy & Security

- **Firebase Security**: Data stored securely in Firebase with authentication
- **Encryption**: Data encrypted in transit and at rest
- **Authentication**: Firebase Authentication for user accounts

For detailed privacy information, see our [Privacy Policy](https://ronb12.github.io/Bradleys-Financial-Hub/privacy-policy.html).

## 🌐 Live Site

- **Production**: [https://mobile-debt-tracker.web.app/](https://mobile-debt-tracker.web.app/)
- **GitHub Pages**: [https://ronb12.github.io/Bradleys-Financial-Hub/](https://ronb12.github.io/Bradleys-Financial-Hub/)

## 🤝 Contributing

This is a personal project. Contributions and suggestions are welcome! Please feel free to open an issue or submit a pull request.

## 📄 License

Copyright © 2025 Bradley's Finance Hub. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

## 🔗 Links

- **Privacy Policy**: [View Online](https://ronb12.github.io/Bradleys-Financial-Hub/privacy-policy.html)
- **GitHub Pages**: [Website](https://ronb12.github.io/Bradleys-Financial-Hub/)
- **Repository**: [GitHub](https://github.com/ronb12/Bradleys-Financial-Hub)

## 📞 Support

For support, questions, or feature requests, please open an issue on GitHub.

---

<div align="center">
  <p>Made with ❤️ using Firebase and Progressive Web App technologies</p>
  <p>© 2025 Bradley's Finance Hub. All rights reserved.</p>
</div>
