# Nexus Viz React

A modern React dashboard application for real-time data visualization and analytics.

## Project Overview

This project is a comprehensive analytics dashboard built with React, TypeScript, and modern UI components. It features real-time data visualization, responsive design, and seamless integration capabilities.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Also ensure you have Python 3.8+ installed for the FastAPI backend.

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd powerapp

# Step 3: Install the necessary dependencies
npm install

# Step 4: Install Python dependencies for the backend
npm run backend:install-deps

# Step 5: Start the development server
npm run dev:all:fastapi
```

### Available Scripts

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run preview` - Preview the production build locally
- `npm run backend:fastapi` - Start the FastAPI backend server (now serves React app with SSL)
- `npm run backend:install-deps` - Install Python dependencies for the backend
- `npm run dev:all:fastapi` - Start both frontend and FastAPI backend concurrently
- `npm run serve:ssl` - Serve the production build with SSL directly from FastAPI

## Technology Stack

This project uses the following technologies:

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library
- **Recharts** - Charting library for data visualization
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Tanstack Query** - Data fetching and caching
- **FastAPI** - Modern Python web framework for backend services

## Features

- 📊 Interactive charts and data visualizations
- 🎨 Modern, responsive UI design
- 🔄 Real-time data updates
- 📱 Mobile-friendly interface
- 💯 TypeScript for type safety
- ⚡ Fast development with Vite
- 🎭 Smooth animations with Framer Motion
- 🔒 SSL support with FastAPI serving React app directly

## SSL Serving with FastAPI

This project now serves the React application directly through FastAPI with SSL support:

1. Build the React app: `npm run build`
2. Run the FastAPI server with SSL: `npm run serve:ssl`
3. Access the application at `https://localhost` (port 443)

The FastAPI server automatically detects SSL certificates in the `ssl/` directory and serves the React app with proper SPA routing support.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components (shadcn/ui)
├── data/               # Mock data and data utilities
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── services/           # External service integrations
└── main.tsx           # Application entry point
```

## Contributing

When contributing to this project, please:

1. Follow the existing code style and conventions
2. Run `npm run lint` to check for code quality issues
3. Test your changes thoroughly
4. Update documentation as needed

## SEBI Analysis Feature

This project now includes a SEBI Analysis feature that retrieves regulatory data from a SQLite database:

1. Refer to `SEBI_ANALYSIS_README.md` for detailed documentation
2. Access the feature at `/sebi-analysis` route
3. Data is retrieved from `backend/public/excel/sebi_excel_master.db`

## Docker Deployment

Alternatively, you can use Docker Compose to run the entire stack:

```bash
docker-compose up
```

This will start the frontend, backend, and Nginx reverse proxy in separate containers.

## License

This project is private and proprietary.