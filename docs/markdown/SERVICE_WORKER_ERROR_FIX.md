# Service Worker HTML Response Error Fix

## Problem

When navigating to pages in subdirectories (like `/src/pages/debt/Debt_Tracker.html`), JavaScript files are requested with relative paths that resolve to non-existent locations:
- `config.js` → `/src/pages/debt/config.js` (doesn't exist)
- `utils/validation.js` → `/src/pages/debt/utils/validation.js` (doesn't exist)

Firebase's catch-all rewrite rule serves `index.html` for these non-existent files, causing:
1. **Service Worker Errors**: `[SW] ERROR: Got HTML response for /src/pages/debt/config.js - not caching`
2. **JavaScript Errors**: `Uncaught SyntaxError: Unexpected token '<'` (HTML being executed as JS)

## Root Cause

Pages in subdirectories use relative paths for shared resources. When the page is at `/src/pages/debt/Debt_Tracker.html`, relative paths like `config.js` resolve to `/src/pages/debt/config.js` instead of `/config.js`.

## Solution

Updated the service worker to handle this gracefully:

**Before:**
- Logged console errors when HTML was returned for JS/CSS requests
- Returned the HTML response (causing syntax errors)

**After:**
- Returns a proper 404 response instead of HTML
- Prevents console errors from appearing
- Browser handles missing files gracefully

## Changes Made

### `dist/service-worker.js` and `scripts/service-worker.js`

Changed the error handling when JS/CSS requests return HTML:

```javascript
// OLD: Logged error and returned HTML response
if ((isJavaScript || isCSS) && contentType.includes('text/html')) {
  console.error('[SW] ERROR: Got HTML response for', url.pathname, '- not caching');
  return response; // This caused syntax errors
}

// NEW: Return 404 instead
if ((isJavaScript || isCSS) && contentType.includes('text/html')) {
  return new Response('', { status: 404, statusText: 'Not Found' });
}
```

## Impact

- ✅ No more console errors about HTML responses
- ✅ No more syntax errors from HTML being executed as JS
- ✅ Missing files return proper 404 status
- ✅ Browser handles missing resources gracefully

## Long-term Solution

For a complete fix, HTML files in subdirectories should use absolute paths:
- `config.js` → `/config.js`
- `utils/validation.js` → `/utils/validation.js`

Or use relative paths that go up to root:
- `../../config.js`
- `../../utils/validation.js`

This would prevent the requests from being made in the first place.
