# SEBI Analysis Feature

This document describes the SEBI Analysis feature that retrieves data from a database file and displays it in the frontend.

## Feature Overview

The SEBI Analysis feature provides:
- Real-time access to SEBI regulatory data stored in a SQLite database
- Display of regulatory summaries and related documents
- Refresh functionality to get the latest data
- Responsive UI with loading states and error handling

## Technical Implementation

### Backend (FastAPI)

1. **New Endpoint**: `/sebi-analysis`
   - Retrieves data from `sebi_excel_master.db` SQLite database
   - Returns paginated results (default 100 records)
   - Supports limit and offset parameters
   - Proper error handling and logging

2. **Database Schema**:
   - Table: `excel_summaries`
   - Columns:
     - `id` (INTEGER)
     - `date_key` (TEXT) - Date of the regulatory update
     - `row_index` (INTEGER) - Record index
     - `pdf_link` (TEXT) - Link to related PDF document
     - `summary` (TEXT) - Summary of the regulatory update
     - `inserted_at` (DATETIME) - Timestamp when record was added

### Frontend (React)

1. **SEBIAnalysis Component**:
   - Fetches data from the backend endpoint
   - Displays data in a responsive card layout
   - Shows loading skeletons during data fetch
   - Handles errors with user-friendly messages
   - Provides refresh functionality

2. **Features**:
   - Responsive design that works on all screen sizes
   - Hover effects on cards for better UX
   - Proper handling of NIL/empty values
   - Direct links to PDF documents
   - Timestamp display for data freshness

## How to Use

1. Ensure both frontend and backend servers are running:
   - Frontend: `npm run dev` (runs on port 8081)
   - Backend: `python backend/fastapi_server.py` (runs on port 8000)

2. Navigate to the SEBI Analysis page:
   - http://localhost:8081/sebi-analysis

3. The page will automatically load SEBI data from the database
4. Use the Refresh button to reload data if needed

## Data Flow

```
SQLite Database (sebi_excel_master.db)
        ↓
FastAPI Endpoint (/sebi-analysis)
        ↓
React Component (SEBIAnalysis.tsx)
        ↓
User Interface
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure the backend CORS settings include your frontend URL
   - Check that both servers are running on the correct ports

2. **Database Connection Errors**:
   - Verify that `sebi_excel_master.db` exists in `backend/public/excel/`
   - Check file permissions on the database file

3. **No Data Displayed**:
   - Check that the database contains data in the `excel_summaries` table
   - Verify the backend endpoint is returning data correctly

### Testing

1. **Backend Endpoint Test**:
   ```bash
   curl /sebi-analysis
   ```

## Future Enhancements

1. **Search and Filter**:
   - Add search functionality by date or keyword
   - Implement filtering by document type

2. **Pagination**:
   - Add pagination controls for large datasets

3. **Data Visualization**:
   - Add charts for regulatory trend analysis
   - Include compliance tracking metrics