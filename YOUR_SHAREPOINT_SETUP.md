# Your SharePoint Setup - AGEL-Automation

This document provides specific instructions for setting up the SharePoint integration with your site: 
**https://adaniltd.sharepoint.com/sites/AGEL-Automation**

## Current Configuration

Based on your environment variables, here's your current configuration:

- **Tenant**: adaniltd
- **Site Name**: AGEL-Automation
- **Tenant ID**: 04c72f56-1848-46a2-8167-8e5d36510cbc
- **Client ID**: eb477319-b6fa-4619-832f-dcb69d0ecda2

## Required Steps

### 1. Verify Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com) → **Azure Active Directory** → **App Registrations**
2. Find the app with Client ID: `eb477319-b6fa-4619-832f-dcb69d0ecda2`
3. Check that it has the following **Application permissions** (not delegated):
   - `Sites.Read.All` - For read-only access
   - `Sites.ReadWrite.All` - For read and write access (if needed)

### 2. Grant Admin Consent

1. In the app registration, go to **API permissions**
2. Click **Grant admin consent for adaniltd**
3. Confirm the consent
4. Wait 5-10 minutes for propagation

### 3. Add App to SharePoint Site Permissions

1. Go to your SharePoint site: https://adaniltd.sharepoint.com/sites/AGEL-Automation
2. Click the gear icon (Settings) → **Site permissions**
3. Click **Advanced permissions settings**
4. Click **Grant permissions**
5. Enter the Client ID: `eb477319-b6fa-4619-832f-dcb69d0ecda2`
6. Grant appropriate permissions (Read or Edit)

### 4. Verify Client Secret

The current client secret may have expired. To check:

1. In the Azure AD app registration, go to **Certificates & secrets**
2. Check if the secret has expired or is about to expire
3. If needed, create a new secret and update your environment variables

## Testing the Connection

After completing these steps:

1. Restart both frontend and backend servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory (another terminal)
   npm run dev
   ```

2. Test the backend API directly:
   ```
   http://localhost:3001/api/sharepoint/lists
   ```

## Common Issues and Solutions

### "Access Denied" Error

If you still get access denied:

1. Double-check that you granted **Application permissions** (not delegated) in Azure AD
2. Ensure admin consent was granted for the permissions
3. Verify the app was added to the SharePoint site permissions
4. Check that the client secret is still valid

### "Site Not Found" Error

If you get a site not found error:

1. Verify the site name is exactly `AGEL-Automation`
2. Ensure the site actually exists at the URL
3. Check that you have access to the site

### Authentication Errors

If you get authentication errors:

1. Generate a new client secret
2. Update both [.env](file:///c:/Users/cogni/powerapp/.env) files with the new secret
3. Restart both servers

## Verification Steps

To verify everything is working:

1. Visit: http://localhost:3001/api/health
2. You should see: `{"status":"OK","message":"SharePoint proxy service is running"}`
3. Visit: http://localhost:3001/api/sharepoint/lists
4. You should see a JSON response with your SharePoint lists

If these URLs work, your SharePoint integration should work in the frontend application as well.