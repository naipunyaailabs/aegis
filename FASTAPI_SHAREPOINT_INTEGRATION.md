# FastAPI SharePoint Integration

This document explains how to set up and use the FastAPI SharePoint integration for accessing SharePoint data directly.

## Overview

The FastAPI server provides a modern REST API for SharePoint operations, enabling direct access to SharePoint lists, items, and files. It replaces the older Express.js proxy server with a more robust Python-based solution.

## Setup

### 1. Install Python Dependencies

```bash
npm run backend:install-deps
```

Or manually:
```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration

Make sure your `.env` file in the root directory contains the SharePoint configuration:

```env
# SharePoint Configuration
SHAREPOINT_TENANT_ID="your-tenant-id"
SHAREPOINT_CLIENT_ID="your-client-id"
SHAREPOINT_CLIENT_SECRET="your-client-secret"
SHAREPOINT_SITE_URL="https://your-domain.sharepoint.com/sites/yoursite"

# FastAPI Server
VITE_SHAREPOINT_PROXY_URL=http://localhost
```

### 3. Running the Server

#### Development Mode
```bash
npm run backend:fastapi
```

Or manually:
```bash
cd backend
uvicorn fastapi_server:app --host 0.0.0.0 --port 8000 --reload
```

#### With Frontend (Concurrently)
```bash
npm run dev:all:fastapi
```

## API Endpoints

### GET /
Root endpoint to verify the server is running and see available endpoints.

### GET /health
Health check endpoint.

### GET /lists
Retrieve all SharePoint lists from the configured site.

### GET /lists/{list_id}/items
Retrieve items from a specific SharePoint list.

### POST /lists/{list_id}/items
Create a new item in a SharePoint list.

**Request Body:**
```json
{
  "Title": "New Item",
  "Description": "Item description"
}
```

### GET /files
Retrieve files from a SharePoint folder.

**Query Parameters:**
- `folder_path` (optional): Path to the folder (default: "/")

### GET /files/{file_id}/content
Download the content of a specific SharePoint file.

### POST /download-sharepoint-files
Download files from SharePoint synchronously.

**Request Body:**
```json
{
  "sharepoint_folder_url": "/sites/yoursite/Shared Documents/FolderName",
  "local_folder_path": "./downloads",
  "log_path": "download.log"
}
```

### POST /download-sharepoint-files-async
Download files from SharePoint asynchronously (in the background).

**Request Body:**
```json
{
  "sharepoint_folder_url": "/sites/yoursite/Shared Documents/FolderName",
  "local_folder_path": "./downloads",
  "log_path": "download.log"
}
```

## Frontend Integration

The frontend includes several hooks and components that demonstrate how to use the FastAPI endpoints:

### Using the Hooks

```typescript
import { 
  useSharePointLists, 
  useSharePointListItems, 
  useSharePointFiles, 
  useSharePointFileDownload 
} from '@/hooks/useSharePointData';

const MyComponent = () => {
  const { lists, loading, error, refetch } = useSharePointLists();
  const { items, loading: itemsLoading, error: itemsError } = useSharePointListItems(selectedListId);
  const { files, loading: filesLoading, error: filesError } = useSharePointFiles(folderPath);
  const { downloadFile, downloading, error: downloadError } = useSharePointFileDownload();
  
  // Example usage
  const handleDownload = async (fileId: string, fileName: string) => {
    await downloadFile(fileId, fileName);
  };
  
  return (
    // Your component JSX
  );
};
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all Python dependencies are installed:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **Environment Variables**: Ensure all required environment variables are set in the `.env` file.

3. **SharePoint Permissions**: Verify that your Azure AD app registration has the necessary permissions for SharePoint:
   - Sites.Read.All (for read-only access)
   - Sites.ReadWrite.All (for read-write access)

4. **Admin Consent**: Ensure admin consent has been granted for the SharePoint permissions in Azure AD.

5. **403 Forbidden Errors**: This is typically a permissions issue. Check:
   - Azure AD app registration has Sites.Read.All or Sites.ReadWrite.All permissions
   - Admin consent has been granted for these permissions
   - The app has been granted access to the specific SharePoint site
   - Client ID and secret are correct
   - Site URL is correct

### Testing Connection

You can test your SharePoint connection with the provided script:
```bash
npm run test:sharepoint
```

### Logs

Check the log file specified in the request or the default `sharepoint_download.log` file for detailed information about download operations.

### Detailed Error Information

When a 403 Forbidden error occurs, the API will return detailed information about what might be wrong and how to fix it. The error message will include:

1. Specific error code and description
2. Possible causes of the issue
3. Step-by-step solution instructions
4. Links to relevant documentation

For more detailed SharePoint setup instructions, see [SHAREPOINT_SETUP_INSTRUCTIONS.md](SHAREPOINT_SETUP_INSTRUCTIONS.md).