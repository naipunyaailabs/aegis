# Fix for "Unknown Entity 835" Issue in BSE Alerts Notification Bar

## Problem
The BSE alerts notification bars were showing "Unknown Entity 835" because the EntityName field was missing from the API response. This was caused by two issues:

1. The Pydantic model [SEBIExcelSummary](file://c:\Users\cogni\powerapp\backend\fastapi_server.py#L37-L44) did not include an entity_name field
2. The transformation logic in the [/bse-alerts](file:///c:/Users/cogni/powerapp/backend/fastapi_server.py#L152-L207) endpoint was not properly preserving the EntityName field from the database

## Solution
I made the following changes to fix the issue:

### 1. Backend Changes (fastapi_server.py)

**Updated the SEBIExcelSummary model:**
```python
class SEBIExcelSummary(BaseModel):
    id: int
    date_key: str
    row_index: int
    pdf_link: Optional[str]
    summary: Optional[str]
    inserted_at: str
    entity_name: Optional[str] = None  # Added this field
```

**Updated the transformation logic in get_bse_alerts_data:**
```python
# Preserve EntityName for BSE alerts
if 'EntityName' in record:
    record['entity_name'] = record.pop('EntityName')
else:
    record['entity_name'] = None
```

### 2. Frontend Changes

**Updated NotificationBar.tsx:**
```typescript
// Changed from:
const entityName = item.EntityName || "Unknown Entity";
// To:
const entityName = item.entity_name || "Unknown Entity";
```

**Updated Dashboard.tsx transform function:**
```typescript
// Changed from:
"Name of Entity": item.EntityName || "Unknown Entity",
// To:
"Name of Entity": item.entity_name || "Unknown Entity",
```

**Updated TotalNotifications.tsx transform function:**
```typescript
// Changed from:
"Name of Entity": item.EntityName || "Unknown Entity",
// To:
"Name of Entity": item.entity_name || "Unknown Entity",
```

## Verification
After implementing these changes and restarting the backend server, the API now correctly returns the entity_name field:

```
First record keys: ['id', 'date_key', 'row_index', 'pdf_link', 'summary', 'inserted_at', 'entity_name']
entity_name: Waaree Energies Ltd
```

The notification bars now display actual entity names instead of "Unknown Entity 835".

## Additional Information

The "835" in "Unknown Entity 835" was actually the correct count of records in the notifications.db database. The database contains 835 valid records where the Link field is not NULL and not 'NIL'. The issue was that the EntityName field was not being properly included in the API response, causing the frontend to display "Unknown Entity" for all records.

Database verification:
```
Total valid records in notifications.db: 835
Recent records:
  Waaree Energies Ltd - 2025-09-28
  Adani Enterprises Ltd - 2025-09-27
  Hindustan Unilever Ltd - 2025-09-27
  PSP Projects Ltd - 2025-09-27
  PSP Projects Ltd - 2025-09-27
```

With our fix, users will now see the actual company names in the notification bars instead of "Unknown Entity", and the total count of 835 records is correct.
