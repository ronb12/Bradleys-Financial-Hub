# Service Worker Cache Fix

## Problem
Browser is getting "Unexpected token <" errors because an old cached service worker is serving HTML responses for JavaScript file requests.

## Root Cause
- Old service worker (v4/v5) cached HTML responses for JS files
- Browser is using cached service worker instead of fetching new files
- Service worker intercepts requests and serves cached HTML

## Solution Applied

### 1. Updated Service Worker to v6
- Bumped version to force new registration
- Updated cache names to clear old caches
- Added logic to detect and unregister old versions

### 2. Created Unregister Helper Page
- `unregister_sw.html` - Helper page to unregister service workers
- Access at: http://localhost:8080/unregister_sw.html

## How to Fix

### Quick Fix (Recommended)
1. Navigate to: http://localhost:8080/unregister_sw.html
2. Click "Unregister Service Worker" button
3. Refresh the main page (http://localhost:8080/index.html)

### Manual Fix
1. Open DevTools (F12 or Cmd+Option+I)
2. Go to **Application** tab
3. Click **Service Workers** in left sidebar
4. Click **Unregister** for any registered service workers
5. Go to **Storage** > **Clear site data**
6. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

## Prevention
The new service worker (v6) will:
- Auto-detect and unregister old versions
- Return 404 for HTML responses to JS requests (instead of serving HTML)
- Clear old caches on activation

## Status
✅ Service worker updated to v6
✅ Auto-unregister logic added
✅ Helper page created
