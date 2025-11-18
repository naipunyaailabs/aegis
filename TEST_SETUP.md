# Test Setup

This document explains how to test that the React app is correctly served on the root path `/` by the FastAPI server.

## Prerequisites

1. Make sure you have built the React application:
   ```bash
   npm run build
   ```

2. Make sure you have installed the Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

## Testing the Setup

### 1. Start the FastAPI Server

Run the FastAPI server:
```bash
cd backend
python fastapi_server.py
```

Or use the npm script:
```bash
npm run serve:ssl
```

### 2. Verify the React App is Served on Root Path

Open your browser and navigate to:
- With SSL: https://localhost (port 443)
- Without SSL: 

You should see the React application loaded (not the API information).

**Note**: If you see API information instead of the React app, it means the root endpoint (`/`) was defined in the FastAPI server, preventing static file serving. The root endpoint should not be defined to allow React app serving.

### 3. Verify API Endpoints Still Work

Test that the API endpoints are still accessible:

1. Visit the API documentation:
   - With SSL: https://localhost/api/docs
   - Without SSL: /api/docs

2. Test a few endpoints:
   ```bash
   # Get visit count
   curl /visits/count
   
   # Get BSE alerts
   curl /bse-alerts?limit=5
   
   # Get SEBI analysis data
   curl /sebi-analysis-data?limit=5
   ```

### 4. Verify SPA Routing Works

Navigate to a specific route in your React app (e.g., `/bse-alerts`) directly in the browser address bar. The React app should load correctly and show the appropriate page, demonstrating that SPA routing is working properly.

## Expected Results

1. The React app should load when visiting the root URL
2. API endpoints should be accessible and return JSON data
3. SPA routing should work correctly (deep links should load the correct React components)
4. All functionality should work as expected

## Troubleshooting

### If the React app doesn't load (seeing API info instead):

1. Make sure the root endpoint (`/`) is not defined in `backend/fastapi_server.py`
2. Check that the static file serving is properly configured:
   ```python
   app.mount("/", SPAStaticFiles(directory=DIST_DIR, html=True), name="static")
   ```
3. Ensure this mounting happens after all other API endpoint definitions
4. Restart the FastAPI server after making changes

### If the React app doesn't load (404 error):

1. Make sure you've built the React app with `npm run build`
2. Check that the `dist` folder exists and contains the built files
3. Check the FastAPI server logs for any errors

### If API endpoints don't work:

1. Make sure the FastAPI server is running
2. Check that the database files exist in `backend/public/`
3. Check the server logs for any errors

### If SPA routing doesn't work:

1. Make sure the `SPAStaticFiles` class is correctly implemented
2. Verify that the static file serving is mounted last in the FastAPI app
3. Check that the fallback to `index.html` is working for 404 responses