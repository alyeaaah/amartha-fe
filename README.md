# Zau Amartha Test - React + TypeScript

A modern, full-featured React + TypeScript admin dashboard application built with Vite, Ant Design, and Tailwind CSS. This project demonstrates best practices in component architecture, testing, state management, and responsive design.

## Demo

Live demo available at: **[amartha-fe-bay.vercel.app](https://amartha-fe-bay.vercel.app)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
  - [Production Build](#production-build)
- [Testing](#testing)
  - [Running Tests](#running-tests)
  - [Test Coverage](#test-coverage)
  - [Test UI](#test-ui)
- [Deployment](#deployment)
  - [Vercel Deployment](#vercel-deployment)
  - [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Package Manager: pnpm](#package-manager-pnpm)
- [Documentation](#documentation)

---

## ✨ Features

- **Admin Dashboard** - Comprehensive dashboard for managing orders, pets, and other resources
- **Anime Browser** - Browse and explore anime using the Jikan open API with advanced filtering
- **Anime Details** - View detailed anime information including recommendations and relations
- **Pet Management** - Full CRUD operations on pet data with form validation using React Hook Form + Zod
- **Authentication** - Secure login and registration system
- **User Management** - Admin controls for user and pet management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Data Visualization** - Charts and analytics for dashboard metrics
- **Form Handling** - React Hook Form with Zod validation and robust error handling
- **API Integration** - Jikan (Anime) and Swagger Pet Store APIs with intelligent retry logic
- **State Management** - Jotai for lightweight, efficient state management
- **Dark Mode Ready** - Theme provider with light/dark mode support
- **Comprehensive Testing** - Full test coverage with Vitest and React Testing Library

---

## 🛠 Tech Stack

### Core Framework
- **React 18** - UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server

### UI & Styling
- **Ant Design 5** - Component library
- **Tailwind CSS 3** - Utility-first CSS framework
- **SASS/SCSS** - Advanced styling

### State Management & Data
- **Jotai** - Lightweight primitive and flexible state management
- **React Query (TanStack Query)** - Server state management with automatic retries
- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation

### APIs & Services
- **Jikan API** - Open anime database API for anime browsing and details
- **Swagger Pet Store API** - Example REST API for CRUD operations and form validation examples
- **Axios** - HTTP client with MSW mocking support

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **MSW (Mock Service Worker)** - API mocking

### Other Libraries
- **React Router v6** - Client-side routing
- **Day.js** - Date manipulation
- **Faker.js** - Mock data generation

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Installation Guide](#why-pnpm)

> We recommend using **pnpm** for faster installations and better dependency management.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zau-amartha-test
   ```

2. **Install dependencies using pnpm**
   ```bash
   pnpm install
   ```

   If you prefer npm:
   ```bash
   npm install
   ```

   Or yarn:
   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://petstore3.swagger.io/api/v3/
VITE_JIKAN_BASE_URL=https://api.jikan.moe/v4/

# Security (key can be customized)
VITE_SECRET_KEY=AsY0uW1sh0rCu5t0m4b1e
VITE_AUTH_COOKIE_NAME=@martha

# Deployment
VITE_BASENAME=/
```

**Environment Variables Explanation:**
- `VITE_API_BASE_URL` - Base URL for Swagger Pet Store API (used for Pet CRUD examples)
- `VITE_JIKAN_BASE_URL` - Base URL for Jikan Anime API
- `VITE_SECRET_KEY` - Secret key for authentication (customize for your app)
- `VITE_AUTH_COOKIE_NAME` - Name of the authentication cookie
- `VITE_BASENAME` - Base path for the app when deployed to a subdirectory (e.g., `/app/` if deployed at domain.com/app)

**Note on Swagger Pet Store API:**
The Swagger Pet Store API may occasionally return HTTP 500 errors. TanStack Query automatically retries failed requests up to 1 times with exponential backoff, ensuring reliable data fetching even with transient API issues.

### Development

Start the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

**Features during development:**
- Hot Module Replacement (HMR) for instant updates
- TypeScript type checking
- CSS processing with Tailwind and SCSS
- SVG import with SVGR

### Production Build

Create an optimized production build:

```bash
pnpm build
```

This will:
- Run TypeScript type checking
- Bundle and minify the application
- Generate optimized assets in the `dist/` directory

**Preview the production build locally:**

```bash
pnpm preview
```

The production build will be served at `http://localhost:4173`.

---

## 🧪 Testing

### Running Tests

Run all tests in watch mode (recommended during development):

```bash
pnpm test
```

Run tests once (CI mode):

```bash
pnpm test --run
```

### Test Coverage

Generate test coverage report:

```bash
pnpm test:coverage
```

This will create a coverage report showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

### Test UI

Launch the interactive Vitest UI for better test visualization:

```bash
pnpm test:ui
```

The UI will open at `http://localhost:51204/__vitest__/` (or available port).

**Benefits of Test UI:**
- Visual test explorer
- Real-time test results
- Coverage visualization
- Easy filtering and debugging

### Test Structure

Tests are organized in `src/__tests___/` with mirrors of the source structure:

```
src/__tests___/
├── components/        # Component tests
├── pages/            # Page tests
├── mocks/            # API mocks and handlers
├── store/            # State management tests
└── utils.tsx         # Shared test utilities
```

---

## 🚢 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration for seamless Vercel deployment.

**Deploy to Vercel:**

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel automatically detects the configuration and deploys
4. Add environment variables in Vercel dashboard under **Settings > Environment Variables**

### Docker Deployment

Build and run the application in a Docker container:

**Build Docker image:**

```bash
docker build -t zau-amartha:latest .
```

**Run Docker container:**

```bash
docker run -p 3000:3000 zau-amartha:latest
```

**With environment variables:**

```bash
docker run -p 3000:3000 \
  -e VITE_API_BASE_URL=https://petstore3.swagger.io/api/v3/ \
  -e VITE_JIKAN_BASE_URL=https://api.jikan.moe/v4/ \
  zau-amartha:latest
```

**Using Docker Compose:**

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_BASE_URL=https://petstore3.swagger.io/api/v3/
      - VITE_JIKAN_BASE_URL=https://api.jikan.moe/v4/
      - VITE_SECRET_KEY=AsY0uW1sh0rCu5t0m4b1e
      - VITE_AUTH_COOKIE_NAME=@martha
      - VITE_BASENAME=/
```

Then run:

```bash
docker-compose up
```

### Self-Hosted Deployment

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Serve the `dist/` directory** using any static hosting (nginx, Apache, etc.)

3. **Configure your server:**
   - Point your domain to the server
   - Ensure all routes fallback to `index.html` for SPA routing
   - Set appropriate cache headers for production

---

## 📁 Project Structure

```
zau-amartha-test/
├── src/
│   ├── __tests___/              # Test files
│   │   ├── components/
│   │   ├── pages/
│   │   ├── mocks/               # MSW handlers
│   │   └── store/
│   ├── assets/                  # Images, icons, SVGs
│   ├── components/              # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Modal/
│   │   └── ...
│   ├── pages/                   # Page components
│   │   ├── Admin/               # Admin features
│   │   │   ├── DashboardAdministrator/
│   │   │   ├── Pet/             # Pet CRUD with Swagger API
│   │   │   └── Orders/
│   │   ├── Anime/               # Main feature - Anime browsing
│   │   │   ├── Detail/          # Anime details page
│   │   │   ├── api/             # Jikan API integration
│   │   │   └── components/      # Anime-specific components
│   │   ├── Login/
│   │   └── Register/
│   ├── router/                  # Routing configuration
│   ├── stores/                  # Jotai atoms and state
│   ├── utils/                   # Utility functions
│   ├── types/                   # TypeScript type definitions
│   ├── themes/                  # Theme configuration
│   └── index.tsx                # Application entry point
├── public/                      # Static assets
├── vitest.config.ts             # Vitest configuration
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose config
├── vercel.json                  # Vercel deployment config
├── package.json                 # Dependencies and scripts
└── pnpm-lock.yaml               # Lockfile (recommended)
```

---

## 📦 Package Manager: pnpm

### Why pnpm?

We recommend using **pnpm** for this project. Here's why:

#### 1. **Faster Installation**
   - pnpm uses a content-addressable storage system
   - Installs dependencies up to **3x faster** than npm
   - Reduces disk space usage significantly

#### 2. **Stricter Dependency Management**
   - Prevents "phantom dependencies" (undeclared dependencies)
   - Creates a proper node_modules structure
   - Reduces bundle size

#### 3. **Monorepo Support**
   - Better workspace management
   - Easier to maintain multiple packages
   - Shared dependency caching

#### 4. **Workspace Support**
   - Native monorepo capabilities
   - Efficient handling of interdependent projects

#### 5. **Better Performance**
   - Parallel installations
   - Optimized disk usage
   - Faster lock file resolution

### Installing pnpm

```bash
# Using npm (globally)
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using Chocolatey (Windows)
choco install pnpm

# Using Scoop (Windows)
scoop install pnpm
```

**Verify installation:**

```bash
pnpm --version
```

### Using pnpm

```bash
# Install dependencies
pnpm install

# Add a package
pnpm add package-name

# Add dev dependency
pnpm add -D package-name

# Remove a package
pnpm remove package-name

# Update packages
pnpm update

# Run scripts
pnpm dev
pnpm build
pnpm test
```

---

## 📚 Documentation

- **[Project Explanation](./EXPLANATION.md)** - Architecture and design decisions
- **[Testing Guide](./TEST_GUIDE.md)** - Detailed testing documentation
- **[Ant Design Docs](https://ant.design/)** - Component library documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Utility CSS framework
- **[Vite Docs](https://vitejs.dev/)** - Build tool documentation
- **[React Query Docs](https://tanstack.com/query/latest)** - Data fetching library
- **[Jotai Docs](https://jotai.org/)** - State management library
- **[Jikan API Docs](https://docs.api.jikan.moe/)** - Anime database API

---

## 📝 License

This project is created as a frontend test assignment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
