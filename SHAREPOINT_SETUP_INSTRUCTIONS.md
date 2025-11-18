# SharePoint Integration Setup Instructions

This document provides detailed instructions to resolve the "Access denied" error when connecting to SharePoint.

## Common Causes of Access Denied Error

1. **Missing API Permissions** - The Azure AD app registration doesn't have the required permissions
2. **Admin Consent Not Granted** - Required permissions haven't been approved by an admin
3. **Incorrect Credentials** - Client ID or secret is incorrect
4. **SharePoint Site Permissions** - The app doesn't have access to the specific SharePoint site
5. **Site URL Mismatch** - The site URL in configuration doesn't match the actual SharePoint site

## Solution Steps

### 1. Verify Azure AD App Registration Permissions

1. Go to [Azure Portal](https://portal.azure.com/) → Azure Active Directory → App Registrations
2. Find your app registration (using the CLIENT_ID from your .env file)
3. Click on "API permissions"
4. Ensure the following permissions are added:
   - `Sites.Read.All` (for read-only access) OR
   - `Sites.ReadWrite.All` (for read and write access)
5. These permissions should be of type "Application permissions" (not delegated)

### 2. Grant Admin Consent

1. In the API permissions page, click "Grant admin consent for [your tenant]"
2. Confirm the consent when prompted
3. Wait a few minutes for the consent to propagate

### 3. Verify SharePoint Site Access

1. Go to your SharePoint site: https://adaniltd.sharepoint.com/sites/AGEL-Automation
2. Click the gear icon → Site Settings → Site permissions
3. Click "Advanced permissions settings"
4. Click "Grant permissions"
5. Add the app registration using its client ID or name
6. Grant appropriate permissions (Read or Edit)

### 4. Verify Environment Variables

Ensure your [.env](file:///c:/Users/cogni/powerapp/.env) file in the backend directory contains the correct values:

```env
# SharePoint Configuration
SHAREPOINT_TENANT_ID=04c72f56-1848-46a2-8167-8e5d36510cbc
SHAREPOINT_CLIENT_ID=eb477319-b6fa-4619-832f-dcb69d0ecda2
SHAREPOINT_CLIENT_SECRET=WGpGOFF+eUM3SEZyVFc3dE1CSldJa1VmY1FUZ3l4NHV3N240cGJEeg==
SHAREPOINT_SITE_NAME=AGEL-Automation
SHAREPOINT_SITE_URL=https://adaniltd.sharepoint.com/sites/AGEL-Automation

# SharePoint Proxy URL
VITE_SHAREPOINT_PROXY_URL=http://localhost

# FastAPI Server
FASTAPI_HOST=localhost
FASTAPI_PORT=8000
```

**Important Notes:**
- Make sure the `SHAREPOINT_SITE_NAME` matches exactly with your SharePoint site name (case-sensitive)
- Ensure the `SHAREPOINT_SITE_URL` is the complete URL to your SharePoint site
- The `SHAREPOINT_TENANT_ID` should be your Azure AD tenant ID, not your domain name

### 5. Test the Connection

After making these changes:

1. Restart the backend server:
   ```bash
   cd backend
   python fastapi_server.py
   ```

2. Test the connection by visiting:
   ```
   /health
   ```

3. Then try:
   ```
   /lists
   ```

## Troubleshooting Tips

1. **Double-check the site name** - It must match exactly, including spaces and capitalization
2. **Wait for propagation** - After granting permissions, it may take a few minutes to take effect
3. **Check tenant ID** - Ensure you're using the correct tenant ID, not a domain name
4. **Regenerate client secret** - If you suspect the secret might be incorrect, generate a new one
5. **Verify site URL** - Make sure the SHAREPOINT_SITE_URL exactly matches your SharePoint site URL
6. **Check API permissions type** - Ensure you're using "Application permissions" not "Delegated permissions"

## Required Permissions Summary

For the SharePoint integration to work properly, your app registration needs:

| Permission | Type | Description |
|------------|------|-------------|
| Sites.Read.All | Application | Read items in all site collections |
| Sites.ReadWrite.All | Application | Read and write items in all site collections (if you need write access) |

Note: Application permissions (not delegated) are required for server-to-server communication.

## Common Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| -2147024891 | UnauthorizedAccessException | Check permissions and admin consent |
| 403 | Forbidden | Verify app has access to the specific SharePoint site |
| Invalid hostname | Site URL mismatch | Ensure SHAREPOINT_SITE_URL is correct |

## Testing Your Configuration

To verify your configuration is correct:

1. Open a browser and navigate to: /health
2. You should see a JSON response indicating the service is healthy
3. Then navigate to: /lists
4. If configured correctly, you should see a list of SharePoint lists

If you still get a 403 error, double-check all the steps above, particularly:
1. API permissions are set to "Application" type
2. Admin consent has been granted
3. The app has been granted access to the specific SharePoint site
4. All environment variables are correct