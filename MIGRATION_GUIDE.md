# Migration Guide: From Reverse Proxy to FastAPI SSL Serving

This guide documents the changes made to migrate from using a Node.js reverse proxy to serving the React app directly through FastAPI with SSL.

## Architecture Changes

### Before (Reverse Proxy Setup)
- React app served by Node.js Express server
- FastAPI backend running on port 8000
- Node.js server proxying API requests to FastAPI
- Separate servers for frontend and backend

### After (FastAPI SSL Serving)
- React app served directly by FastAPI
- Single server handling both frontend and backend
- SSL support built into FastAPI
- Simplified architecture with fewer moving parts

## Code Changes

### 1. FastAPI Server ([backend/fastapi_server.py](file:///C:/Users/cogni/AI-Agents-Marketplace/backend/fastapi_server.py))
- Added custom `SPAStaticFiles` class for proper React SPA routing
- Configured static file serving from the `dist` directory
- Added SSL support with automatic certificate detection
- Implemented all necessary API endpoints:
  - `/visits/count` - Get visit count
  - `/visits/increment` - Increment visit count
  - `/bse-alerts` - Get BSE alerts data
  - `/sebi-analysis-data` - Get SEBI analysis data
  - `/rbi-analysis-data` - Get RBI analysis data
  - `/emails` - Email management (GET, POST, DELETE)
  - `/admin/login` - Admin authentication
  - `/excel-data/{file_name}` - Excel data access
  - `/health` - Health check endpoint
- Moved static file serving to end of file to avoid route conflicts

### 2. Frontend API Calls
All frontend files that previously used `VITE_API_BASE_URL` have been updated to use direct relative paths:

- **Before**: 
  ```typescript
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  const response = await fetch(`${API_BASE_URL}/endpoint`);
  ```

- **After**:
  ```typescript
  const response = await fetch(`/endpoint`);
  ```

### 3. Package.json Scripts
- Added `serve:ssl` script to run FastAPI server directly
- Updated documentation for existing scripts

### 4. Documentation
- Updated [README.md](file:///C:/Users/cogni/AI-Agents-Marketplace/README.md) to reflect new architecture
- Added this migration guide

## Benefits of the New Approach

1. **Simplified Architecture**: Only one server instead of two
2. **Better Performance**: Direct serving of static files
3. **Easier Deployment**: Single server to manage
4. **Proper SSL Handling**: Native SSL support in FastAPI
5. **SPA Routing**: Correct handling of React client-side routing
6. **No Environment Variables**: Removed need for `VITE_API_BASE_URL`
7. **Direct Paths**: No need for `/api` prefix since frontend and backend share the same origin

## How to Use the New Approach

1. Build your React app:
   ```bash
   npm run build
   ```

2. Run the FastAPI server with SSL:
   ```bash
   npm run serve:ssl
   ```
   or
   ```bash
   cd backend && python fastapi_server.py
   ```

3. Access your application at `https://localhost` (port 443)

## Rollback (If Needed)

If you need to revert to the previous reverse proxy setup:

1. Restore the original [server.js](file:///C:/Users/cogni/AI-Agents-Marketplace/server.js) file
2. Revert the API call changes in frontend files
3. Restore the `VITE_API_BASE_URL` environment variable usage
4. Use the original startup process with the Node.js server

## Testing

After migration, verify that:

1. The React app loads correctly at `https://localhost`
2. All API endpoints are accessible
3. SPA routing works (deep links load correctly)
4. SSL is properly configured
5. Admin functionality still works
6. All data fetching operations succeed