# Base Runtime Environment (Base RTE)

A modern, full-stack web application built with Next.js for managing and analyzing vulnerability data from logs, images, repositories, and groups. This project provides a dashboard interface for viewing risk factors, severity metrics, and detailed vulnerability information.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)

## Features

- **File Upload**: Import JSON log files for processing
- **Advanced Filtering**: Filter data by multiple criteria with support for field selection, negation, and various filter types (string, number, date, select)
- **Sorting**: Sort data by multiple fields with ascending/descending options
- **Data Table**: Paginated table view with customizable columns
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Processing**: Stream-based JSON file processing for large file handling
- **Responsive Design**: Mobile-friendly interface using Material-UI
- **Type-Safe**: Full TypeScript support with Zod validation

## Tech Stack

- **Frontend**:
  - Next.js 16+ with App Router
  - React 19
  - TypeScript 5
  - Material-UI (MUI) v7
  - Recharts for data visualization
  - React Query (TanStack Query) for state management
  - React Hook Form for form handling
  - Emotion for styling

- **Backend**:
  - Next.js API Routes
  - MongoDB for data persistence
  - Axios for HTTP requests
  - Stream processing for JSON parsing

- **Development & Quality**:
  - ESLint with TypeScript support
  - Prettier for code formatting
  - Zod for runtime type validation
  - env-cmd for environment management

## Prerequisites

- Node.js 18+ (recommended 20 LTS)
- npm or yarn package manager
- MongoDB instance (local or cloud)
- `.env.development.local` file with required environment variables

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd base-runtime-environment-nextjs
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**
   
   Create a `.env.development.local` file in the project root:
   ```bash
   MONGO_DB_URI=mongodb://localhost:27017
   DB_NAME=your_database_name
   NEXT_PUBLIC_VERCEL_ENV=development
   ```

   For production deployments, create a `.env.production.local` file with appropriate values.

4. **Verify Installation**
   ```bash
   yarn run lint
   ```

## Getting Started

### Development Server

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app will automatically reload as you make changes to files.

### Production Build

```bash
yarn run build
yarn start
```

## Project Architecture

### Directory Structure

```
ironclad-interview-rte/
├── app/
│   ├── _components/              # Reusable React components
│   │   ├── Chart/                # Data visualization component
│   │   ├── Dashboard/            # Main dashboard layout
│   │   ├── DataTable/            # Paginated table with filtering/sorting
│   │   ├── Filter/               # Filter criteria builder
│   │   ├── FilterDialog/         # Filter modal dialog
│   │   ├── Form/                 # Form wrapper with react-hook-form
│   │   ├── Sort/                 # Sort criteria builder
│   │   ├── SortDialog/           # Sort modal dialog
│   │   ├── Table/                # Base table component
│   │   ├── TableRowActionMenu/   # Row action menu
│   │   ├── LeftNavBar/           # Navigation sidebar
│   │   ├── UploadFileDialog/     # File upload modal
│   │   └── ...
│   ├── _contexts/                # React contexts for global state
│   │   ├── ThemeContext.tsx      # Dark mode theme management
│   │   ├── AlertProvider/        # Global alert/notification system
│   │   └── ReactQueryProvider.tsx # React Query configuration
│   ├── api/                       # Next.js API routes
│   │   └── files/
│   │       ├── upload/           # File upload handler (production)
│   │       └── upload-dev/       # File upload handler (development)
│   ├── home/                      # Home page route and components
│   │   ├── page.tsx              # Home page
│   │   └── _components/
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main page
│   ├── page.module.css           # Main page styles
│   ├── favicon.ico               # Favicon
│   └── globals.css               # Global styles
├── lib/                          # Utility functions and helpers
│   ├── constants.ts              # Enum definitions (Collections, PackageType, Severity, etc.)
│   ├── jsonStreamHelpers.ts      # JSON streaming parser utilities
│   ├── mongo.ts                  # MongoDB connection and transaction management
│   └── routes.ts                 # Route handling utilities
├── _locale/                      # Internationalization strings
│   └── en-US.ts                  # English locale strings
├── _schemas/                     # Shared Zod schemas
│   └── index.ts                  # Schema exports
├── public/                       # Static assets
├── .vscode/                      # VS Code settings
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies

```

### Core Components

#### **Chart Component** (`app/_components/Chart/`)
- Renders bar charts using Recharts
- Displays vulnerability data by category (Risk Factors, Severity, Kai Status, Package Type)
- Theme-aware styling

#### **Form Component** (`app/_components/Form/`)
- Wraps react-hook-form's FormProvider for centralized form state management
- Supports optional title display with Material-UI Typography
- Renders form fields as children
- Action buttons row at the bottom with dark mode support
- Handles form submission with optional form name attribute
- Full TypeScript generic support for type-safe form values

#### **DataTable Component** (`app/_components/DataTable/`)
- Wrapper component combining table, filtering, and sorting
- Pagination with custom page navigation
- Responsive design

#### **Filter/Sort Components** (`app/_components/Filter/` and `app/_components/Sort/`)
- Dynamic criteria builder for filtering and sorting
- Multiple filter types: string, number, date, select
- Supports negation for filter criteria

#### **Upload File Dialog** (`app/_components/UploadFileDialog/`)
- File selection and upload interface
- Progress tracking for large files
- Stream-based processing for development mode
- Vercel Blob storage for production

#### **Left Navigation** (`app/_components/LeftNavBar/`)
- Responsive sidebar navigation
- Dark mode toggle
- Mobile drawer support

### State Management

#### **Contexts**
- **ThemeContext**: Manages light/dark mode, persists preference to localStorage
- **AlertProvider**: Global notification system with Snackbar
- **ReactQueryProvider**: TanStack React Query configuration with retry logic and error handling

### API Routes

#### **Upload Endpoints**
- `POST /api/files/upload`: Production file upload with Vercel Blob
- `POST /api/files/upload-dev`: Development file upload for local testing

### Database Layer

- **MongoDB Integration** (`lib/mongo.ts`):
  - Connection pooling and caching
  - Transaction management with retry logic
  - Session handling

### Utilities

- **jsonStreamHelpers.ts**: Stream-based JSON parsing for handling large files without memory overhead
- **constants.ts**: Enum definitions for Collections, PackageType, Severity, Protocol, and Kai Status

## Environment Configuration

### Development Setup

1. Create `.env.development.local`:
   ```
   MONGO_DB_URI=mongodb://localhost:27017
   DB_NAME=base_rte_dev
   NEXT_PUBLIC_VERCEL_ENV=development
   ```

2. For local MongoDB, install and run:
   ```bash
   kubectl apply -f ./__k8s__/local
   ```

### Production Setup

Environment variables for production:
- `MONGO_DB_URI`: Your production MongoDB connection string
- `DB_NAME`: Production database name
- `NEXT_PUBLIC_VERCEL_ENV=production`

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn run dev` | Start development server with environment variables from `.env.development.local` |
| `yarn run build` | Build the project for production |
| `yarn start` | Start production server |
| `yarn run lint` | Run ESLint to check code quality |

## Code Standards

- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier integration
- **Max Line Length**: 120 characters
- **Imports**: Organized and checked for unused imports
- **Type Safety**: Full TypeScript strict mode

## Contributing

When working on this project:

1. Follow the existing file structure and naming conventions
2. Keep components small and focused
3. Use locale strings for all user-facing text
4. Maintain TypeScript strict mode compliance
5. Run linting before committing: `yarn run lint`
6. Add appropriate error handling and validation using Zod

## License

Private project
