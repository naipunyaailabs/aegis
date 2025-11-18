# SharePoint Online Setup Guide

This guide provides step-by-step instructions for setting up SharePoint integration with SharePoint Online (Microsoft 365) using Microsoft Graph API.

## Prerequisites

1. Azure AD admin privileges
2. SharePoint Online admin privileges
3. Access to Azure Portal (https://portal.azure.com)
4. Access to SharePoint Admin Center (https://yourtenant-admin.sharepoint.com)

## Step 1: Register Your App in Azure AD

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App Registrations**
3. Click **+ New registration**
4. Fill in the registration details:
   - **Name**: Give your app a descriptive name (e.g., "AGEIS SharePoint Integration")
   - **Supported account types**: Select "Accounts in this organizational directory only"
   - **Redirect URI**: Leave blank for now (this is a daemon/service app)
5. Click **Register**

## Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Choose **Application permissions** (not Delegated permissions)
5. Add the following permissions:
   - **Sites.Read.All** - Read items in all site collections
   - **Sites.ReadWrite.All** - Read and write items in all site collections (if you need write access)
6. Click **Add permissions**

## Step 3: Grant Admin Consent

1. After adding permissions, click **Grant admin consent for [your tenant]**
2. Confirm when prompted
3. Wait 5-10 minutes for the consent to propagate

## Step 4: Create Client Secret

1. In your app registration, go to **Certificates & secrets**
2. Under **Client secrets**, click **+ New client secret**
3. Add a description (e.g., "SharePoint Integration Secret")
4. Select an expiration period
5. Click **Add**
6. **Important**: Copy the **Value** of the secret immediately - you won't be able to see it again!

## Step 5: Configure SharePoint Site Access

1. Go to the SharePoint Admin Center: https://yourtenant-admin.sharepoint.com
2. Navigate to **Sites** → **Active sites**
3. Find your target site collection
4. Click on the site to open its details
5. Click **Permissions**
6. Click **+ Add** to add permissions
7. Enter the **Application (client) ID** of your Azure AD app
8. Assign appropriate permissions (Read or Write)

## Step 6: Update Environment Variables

Update your [.env](file:///c:/Users/cogni/powerapp/.env) file in the backend directory with the correct values:

```env
# SharePoint Configuration
SHAREPOINT_TENANT_ID=your-actual-tenant-id
SHAREPOINT_CLIENT_ID=your-application-client-id
SHAREPOINT_CLIENT_SECRET=your-client-secret-value
SHAREPOINT_SITE_NAME=exact-name-of-your-sharepoint-site
```

To find your Tenant ID:
1. In Azure Portal, go to **Azure Active Directory**
2. Click **Overview**
3. Copy the **Tenant ID**

## Step 7: Verify Site Name

Ensure the SITE_NAME in your environment variables exactly matches your SharePoint site name:
- For a site at `https://yourtenant.sharepoint.com/sites/MySite`, the SITE_NAME would be `MySite`
- For the root site at `https://yourtenant.sharepoint.com`, the SITE_NAME would be your tenant name

## Testing the Connection

After completing these steps:

1. Restart the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Test the connection by visiting:
   ```
   http://localhost:3001/api/health
   ```

3. Then try:
   ```
   http://localhost:3001/api/sharepoint/lists
   ```

## Troubleshooting Common Issues

### "Access Denied" Error
If you still get access denied errors:

1. Double-check that admin consent was granted
2. Verify the client secret is correct
3. Ensure the app has been granted access to the specific SharePoint site
4. Wait a few more minutes for propagation

### "Site Not Found" Error
If you get a site not found error:

1. Verify the SITE_NAME exactly matches your SharePoint site name
2. For the root site, use your tenant name
3. For a subsite, use just the site name (not the full URL path)

### "Invalid Client Secret" Error
If you get authentication errors:

1. Generate a new client secret
2. Update your environment variables with the new secret
3. Restart the backend server

## Required Permissions Summary

| Permission | Type | Description | Required For |
|------------|------|-------------|--------------|
| Sites.Read.All | Application | Read items in all site collections | Read operations |
| Sites.ReadWrite.All | Application | Read and write items in all site collections | Read and write operations |

Note: Application permissions are required for server-to-server communication in daemon/service applications.