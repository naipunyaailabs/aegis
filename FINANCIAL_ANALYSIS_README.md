# Financial Analysis Dashboard

This document provides an overview of the newly implemented financial analysis features for BSE India and other regulatory bodies.

## Current Implementation

### Main Product: BSE Alerts (`/bse-alerts`)
The main product is BSE Alerts, which provides real-time monitoring and alerts for BSE market activities:
- Real-time market alerts
- Customizable notifications
- Compliance monitoring
- Regulatory updates
- Mobile notifications

## Future Products

### 1. BSE India Analysis (`/bse-india`)
A comprehensive dashboard for analyzing BSE market data including:
- Real-time market indices tracking (SENSEX, NIFTY, etc.)
- Interactive charts for price movements and trading volumes
- Sector weightage analysis with pie charts
- Top gainers and losers tracking
- Market summary with key insights

### 2. RBI Analysis (`/rbi-analysis`)
Regulatory analysis for Reserve Bank of India:
- Monetary policy tracking
- Banking sector compliance monitoring
- Interest rate trend analysis
- Regulatory update notifications

### 3. SEBI Analysis (`/sebi-analysis`)
Securities and Exchange Board of India market regulation analysis:
- Market surveillance insights
- Investor protection measures
- Listing agreement compliance
- Corporate governance analysis

### 4. Insider Trading Analysis (`/insider-trading`)
Monitoring and analysis of insider trading activities:
- Unusual trading pattern detection
- Regulatory compliance tracking
- Risk assessment tools
- Reporting dashboard

### 5. Directors' Disclosure (`/directors-disclosure`)
Tracking and analysis of directors' disclosure reports:
- Automated disclosure tracking
- Compliance monitoring
- Report generation
- Regulatory filing alerts

### 6. Minutes Preparation (`/minutes-preparation`)
Automated preparation and management of meeting minutes:
- Automated transcription
- Template-based formatting
- Action item tracking
- Compliance verification

### 7. Invoice Processing (NIS) (`/invoice-processing`)
Automated invoice processing with data extraction:
- PDF data extraction using OCR
- Automated validation
- Approval workflows
- Accounting system integration

### 8. App Connectivity Data Extraction (`/app-connectivity`)
Data extraction and analysis from connected applications:
- Multi-application data extraction
- Real-time synchronization
- Advanced analytics
- API integration management

## Reusable Components

### FinancialChart
A flexible charting component supporting multiple chart types:
- Line charts
- Bar charts
- Pie charts
- Area charts

### FinancialDataTable
A data table component for displaying financial data:
- Sortable columns
- Numeric formatting
- Row click handlers
- Responsive design

## Technical Implementation

### Frontend
- Built with React and TypeScript
- Uses Recharts for data visualization
- Implements responsive design with Tailwind CSS
- Follows component-based architecture

### Backend
- SharePoint integration via proxy server
- RESTful API endpoints
- Environment-based configuration
- Error handling and logging

### Data Flow
1. Data is fetched from SharePoint via backend proxy
2. Processed and formatted in frontend services
3. Visualized using reusable chart components
4. Displayed in dashboard layout

## Services

### BSE Service (`src/services/bseService.ts`)
A service for fetching BSE market data:
- Market indices data
- Stock price data for charting
- Sector weightage data
- Top gainers and losers

### RBI Service (`src/services/rbiService.ts`)
A service for RBI regulatory data:
- Regulatory updates
- Monetary policy data
- Banking sector compliance data

### SharePoint Service (`src/services/sharePointService.ts`)
A service for integrating with SharePoint:
- File management
- List operations
- Data extraction

## Types

### Financial Data Types (`src/types/financialData.ts`)
Type definitions for financial data:
- StockDataPoint
- IndexData
- SectorData
- CompanyData

## Future Enhancements

1. Real-time data streaming
2. Advanced analytics and machine learning
3. Customizable dashboards
4. Export functionality for reports
5. Mobile-responsive design improvements
6. Enhanced security features
7. Multi-language support

## Getting Started

1. Ensure all dependencies are installed:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Start the backend proxy server:
   ```
   npm run backend
   ```

4. Access the application at `http://localhost:8082`

## Routes

- `/` - Landing page
- `/bse-alerts` - Main BSE Alerts dashboard (current product)
- `/bse-india` - BSE India Analysis (future product)
- `/rbi-analysis` - RBI Analysis (future product)
- `/sebi-analysis` - SEBI Analysis (future product)
- `/insider-trading` - Insider Trading Analysis (future product)
- `/directors-disclosure` - Directors' Disclosure (future product)
- `/minutes-preparation` - Minutes Preparation (live product)
- `/notifications` - Total Notifications
- `/emaildata` - Email Data
- `/websitedata` - Website Data
- `/sharepoint` - SharePoint Data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.