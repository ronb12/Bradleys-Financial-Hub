# Project Structure

## Directory Organization

```
Bradley's Finance Hub.backup/
├── config/              # Configuration files
│   ├── config.js        # App configuration
│   └── firebase-config.js  # Firebase initialization
│
├── scripts/             # Core application scripts
│   ├── auth.js         # Authentication logic
│   └── service-worker.js  # Service worker for PWA
│
├── src/                 # Source code
│   ├── components/      # Reusable components
│   └── pages/          # Page components
│       └── dashboard/  # Dashboard pages
│
├── dist/                # Build output (deployed to Firebase)
│   ├── assets/         # Static assets (images, icons)
│   ├── src/            # Built source files
│   ├── utils/          # Utility scripts
│   └── *.html          # HTML pages
│
├── docs/                # Documentation
│   ├── markdown/       # Markdown documentation files
│   ├── images/         # Documentation images
│   ├── logs/           # Test logs and outputs
│   └── *.html          # Documentation pages
│
├── public/              # Public assets (source)
│   └── assets/         # Public asset files
│
├── tests/               # Test files
│   └── output/         # Test output files
│
├── .github/             # GitHub configuration
│   └── workflows/      # GitHub Actions workflows
│
├── firebase.json        # Firebase Hosting configuration
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## File Locations

### Configuration
- **config.js**: App-wide configuration settings
- **firebase-config.js**: Firebase SDK initialization
- **firebase.json**: Firebase Hosting deployment config

### Core Scripts
- **auth.js**: Authentication and user management
- **service-worker.js**: Progressive Web App service worker

### Build Output
- **dist/**: All files in this directory are deployed to Firebase Hosting
- Files in `dist/` are generated/copied from source during build

### Documentation
- **docs/markdown/**: All markdown documentation files
- **docs/images/**: Screenshots and test images
- **docs/logs/**: Test results and logs

## Notes

- `node_modules/`: Dependencies (ignored by git)
- `dist/`: Build output (ignored by git)
- `.firebase/`: Firebase cache (ignored by git)
- `.git/`: Git repository data
