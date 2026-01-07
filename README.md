# DHR Home - Digital HR Application Launcher

A modern, Progressive Web App (PWA) launcher for Digikala's Digital HR applications. Built with a React frontend and Node.js/Express backend, featuring a adaptive UI that adjusts to background images, offline support, and comprehensive application management.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI library with modern hooks
- **TypeScript** - Type-safe development
- **Vite 6.3** - Fast build tool and dev server
- **Motion (Framer Motion) 11.11** - Smooth animations and transitions
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Service Worker** - Offline support and caching

### Backend
- **Node.js 22** - JavaScript runtime
- **Express 5.2** - Web application framework
- **MongoDB 6.0** - NoSQL database
- **Mongoose 9.0** - MongoDB object modeling
- **TypeScript** - Type-safe backend development

### Security & Authentication
- **JWT (jsonwebtoken 9.0)** - Token-based authentication
- **bcrypt 6.0** - Password hashing
- **Helmet 8.1** - Security headers
- **HPP 0.2** - HTTP parameter pollution protection
- **express-rate-limit 8.2** - Rate limiting for authentication endpoints
- **CORS** - Cross-Origin Resource Sharing configuration

### Validation
- **Zod 3.22** - Schema validation for API requests

### Development Tools
- **Nx 22.3** - Monorepo management
- **concurrently 8.0** - Run multiple commands
- **wait-on 9.0** - Wait for services to be ready
- **nodemon 3.1** - Auto-restart on file changes

### Observability
- **Sentry 10.32** - Error tracking and monitoring (production)

---

## ✨ Features

### User Experience
- 🎨 **Adaptive UI** - Automatically adjusts colors based on background image brightness
- 📱 **Responsive Design** - Optimized for both desktop and mobile devices
- 🔍 **Smart Search** - Search apps by name, English name, description, or keywords
- 🏷️ **Category Filtering** - Filter applications by category (desktop only)
- ⌨️ **Keyboard Shortcuts** - Quick access with ⌘K (Cmd+K)
- 🎯 **Hover Descriptions** - Interactive app descriptions on hover (desktop)
- 🌐 **RTL Support** - Full right-to-left layout for Persian content

### Progressive Web App (PWA)
- 📲 **Installable** - Install as a native app on any device
- 🔌 **Offline Support** - Works without internet connection
- 🔄 **Auto Updates** - Service worker automatically updates cached content
- 💾 **Smart Caching** - Efficient caching strategy for assets and API responses

### Backend Features
- 🔐 **JWT Authentication** - Secure token-based auth with HTTP-only cookies
- 🛡️ **Rate Limiting** - Protection against brute force attacks (3 attempts per 10 minutes)
- 📊 **RESTful API** - Standard REST endpoints with proper HTTP methods
- ✅ **Input Validation** - Zod schema validation for all requests
- 🗄️ **Auto-incrementing IDs** - User-friendly sequential IDs using Counter model
- 🏥 **Health Checks** - Monitoring endpoint for service status

### Developer Experience
- 📦 **Monorepo Structure** - Organized workspace with Nx
- 🐳 **Docker Support** - Complete containerization with Docker Compose
- 🔧 **Environment Variables** - Flexible configuration
- 📝 **TypeScript** - Full type safety across the stack
- 🎯 **Error Handling** - Comprehensive error handling and logging

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** (latest LTS recommended)
- **MongoDB 6.0+** (local or cloud instance)
- **npm** or **yarn** package manager
- **Docker & Docker Compose** (optional, for containerized deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dhr_home
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env` files for both backend and frontend:

**Backend** (`apps/backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/dhr
PORT=1338
JWT_SECRET_CODE=your-super-secret-jwt-key-here
JWT_EXPIRE_TIME=1d
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX=3
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`apps/frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:1338
VITE_PORT=3000
VITE_HOST=0.0.0.0
```

4. **Start MongoDB**

If using Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

Or install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)

5. **Run the application**

Start both backend and frontend:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:1338
- Health Check: http://localhost:1338/health

---

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/dhr` | Yes |
| `PORT` | Backend server port | `1338` | No |
| `JWT_SECRET_CODE` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRE_TIME` | Token expiration time | `1d` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window (ms) | `600000` (10 min) | No |
| `RATE_LIMIT_MAX` | Max requests per window | `3` | No |
| `FRONTEND_URL` | Frontend URL for CORS | - | Yes |
| `FRONTEND_URLS` | Multiple frontend URLs (comma-separated) | - | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `AUTH_COOKIE_MAX_AGE` | Auth cookie expiration (ms) | `86400000` (24h) | No |
| `SALT_ROUNDS` | bcrypt salt rounds | `10` | No |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_BACKEND_URL` | Backend API base URL | - | Yes |
| `VITE_PORT` | Frontend dev server port | `3000` | No |
| `VITE_HOST` | Frontend dev server host | `0.0.0.0` | No |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking | - | No |
| `VITE_APP_RELEASE` | App version for Sentry | - | No |

### MongoDB Configuration

The backend uses connection pooling and timeout settings:
- **Server Selection Timeout**: 5 seconds
- **Socket Timeout**: 45 seconds
- **Max Pool Size**: 10 connections
- **Min Pool Size**: 2 connections
- **Max Idle Time**: 10 seconds

### CORS Configuration

Configure allowed origins in backend `.env`:
```env
# Single origin
FRONTEND_URL=http://localhost:3000

# Multiple origins
FRONTEND_URLS=http://localhost:3000,https://your-domain.com
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:1338
```

### Authentication

All authentication endpoints are rate-limited (3 requests per 10 minutes).

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "string (3-30 chars, alphanumeric)",
  "password": "string (min 6 chars)"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered"
}
```

**Errors**:
- `400` - Validation error
- `409` - Username already exists
- `429` - Too many attempts

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response** (200 OK):
```json
{
  "message": "Logged in successfully",
  "user": {
    "id": 1,
    "username": "johndoe"
  }
}
```

Sets HTTP-only cookie: `token` (JWT)

**Errors**:
- `400` - Missing credentials
- `401` - Invalid credentials
- `429` - Too many attempts

#### Logout
```http
POST /auth/logout
```

**Response** (200 OK):
```json
{
  "message": "Logged out"
}
```

Clears the authentication cookie.

---

### Applications

All application endpoints require authentication (JWT cookie).

#### Get All Data (Public)
```http
GET /api/data
Origin: <allowed-origin>
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "507f1f77bcf86cd799439011",
      "name": "اپلیکیشن ۱",
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "apps": [
        {
          "id": 1,
          "documentId": "507f1f77bcf86cd799439012",
          "name": "اپ تستی",
          "englishName": "Test App",
          "description": "توضیحات اپلیکیشن",
          "url": "/apps/test",
          "keywords": ["test", "sample"],
          "icon_background_color": "#FF0000",
          "icon": {
            "url": "/uploads/icon.png"
          },
          "createdAt": "2024-01-01T00:00:00.000Z",
          "updatedAt": "2024-01-01T00:00:00.000Z",
          "publishedAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 1,
      "total": 10
    }
  }
}
```

**Note**: This endpoint requires `Origin` header matching `FRONTEND_URL`.

#### Create App
```http
POST /api/app
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "name": "string (required)",
  "englishName": "string (optional)",
  "description": "string (optional)",
  "url": "string (valid URL, optional)",
  "keywords": ["string"] (optional, default: []),
  "icon_background_color": "string (hex color, optional)",
  "icon": {
    "url": "string (valid URL, optional)"
  },
  "category": "string (optional)"
}
```

**Response** (201 Created):
```json
{
  "data": {
    "id": 1,
    "_id": "507f1f77bcf86cd799439011",
    "name": "اپ جدید",
    "englishName": "New App",
    "description": "توضیحات",
    "url": "/apps/new",
    "keywords": ["new"],
    "icon_background_color": "#FF0000",
    "icon": {
      "url": "/uploads/icon.png"
    },
    "category": "دسته‌بندی",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "publishedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors**:
- `400` - Validation error
- `401` - Unauthorized

#### Get App by ID
```http
GET /api/app/:id
Cookie: token=<jwt-token>
```

**Response** (200 OK):
```json
{
  "data": {
    "id": 1,
    "name": "اپ تستی",
    ...
  }
}
```

**Errors**:
- `401` - Unauthorized
- `404` - App not found

#### Update App
```http
PUT /api/app/:id
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "name": "string (optional)",
  "description": "string (optional)",
  ...
}
```

**Response** (200 OK):
```json
{
  "data": {
    "id": 1,
    "name": "اپ بروزشده",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    ...
  }
}
```

**Note**: At least one field must be provided for update.

**Errors**:
- `400` - Validation error
- `401` - Unauthorized
- `404` - App not found

#### Delete App
```http
DELETE /api/app/:id
Cookie: token=<jwt-token>
```

**Response** (200 OK):
```json
{
  "message": "App deleted successfully",
  "data": {
    "id": 1,
    "name": "اپ حذف‌شده",
    ...
  }
}
```

**Errors**:
- `401` - Unauthorized
- `404` - App not found

---

### Categories

All category endpoints require authentication.

#### Create Category
```http
POST /api/category
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "name": "string (required)",
  "order": number (optional, >= 0)
}
```

**Response** (201 Created):
```json
{
  "data": {
    "id": 1,
    "_id": "507f1f77bcf86cd799439011",
    "name": "دسته‌بندی جدید",
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "publishedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors**:
- `400` - Validation error
- `401` - Unauthorized

#### Get Category by ID
```http
GET /api/category/:id
Cookie: token=<jwt-token>
```

**Response** (200 OK):
```json
{
  "data": {
    "id": 1,
    "name": "دسته‌بندی",
    "order": 1,
    ...
  }
}
```

**Errors**:
- `401` - Unauthorized
- `404` - Category not found

#### Update Category
```http
PUT /api/category/:id
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "name": "string (optional)",
  "order": number (optional)
}
```

**Response** (200 OK):
```json
{
  "data": {
    "id": 1,
    "name": "دسته‌بندی بروزشده",
    "order": 2,
    "updatedAt": "2024-01-02T00:00:00.000Z",
    ...
  }
}
```

**Errors**:
- `400` - Validation error
- `401` - Unauthorized
- `404` - Category not found

#### Delete Category
```http
DELETE /api/category/:id
Cookie: token=<jwt-token>
```

**Response** (200 OK):
```json
{
  "message": "Category deleted successfully",
  "data": {
    "id": 1,
    "name": "دسته‌بندی حذف‌شده",
    ...
  }
}
```

**Errors**:
- `401` - Unauthorized
- `404` - Category not found

---

### Health Check

#### Check System Health
```http
GET /health
```

**Response** (200 OK):
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "mongodb_uri": "localhost:27017/dhr"
}
```

**Response** (503 Service Unavailable):
```json
{
  "status": "error",
  "database": "disconnected",
  "readyState": 0,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### Error Responses

All endpoints may return these common errors:

#### 400 Bad Request
```json
{
  "error": "ValidationError",
  "details": [
    {
      "message": "Invalid input",
      "path": ["fieldName"]
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

Or:
```json
{
  "error": "Invalid token"
}
```

Or:
```json
{
  "error": "Token expired"
}
```

#### 403 Forbidden
```json
{
  "error": "Forbidden: origin not allowed"
}
```

#### 404 Not Found
```json
{
  "error": "Route not found",
  "path": "/requested/path"
}
```

Or:
```json
{
  "error": "App not found"
}
```

#### 409 Conflict
```json
{
  "error": "username already exists"
}
```

#### 429 Too Many Requests
```json
{
  "error": "Too many attempts. Please try again later."
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

In development mode, includes stack trace:
```json
{
  "error": "Error message",
  "stack": "Error stack trace..."
}
```

---

## 📁 Project Structure

```
dhr_home/
├── apps/
│   ├── backend/                    # Backend application
│   │   ├── dist/                   # Compiled JavaScript (generated)
│   │   ├── node_modules/           # Backend dependencies (generated)
│   │   ├── uploads/                # Static file uploads
│   │   │   └── background.png      # Background image for frontend
│   │   ├── src/
│   │   │   ├── config/             # Configuration files
│   │   │   │   ├── db.ts          # MongoDB connection setup
│   │   │   │   └── jwt.ts         # JWT configuration
│   │   │   ├── controllers/        # Request handlers
│   │   │   │   ├── appController.ts
│   │   │   │   ├── authController.ts
│   │   │   │   └── categoryController.ts
│   │   │   ├── middleware/         # Express middleware
│   │   │   │   ├── auth.ts        # JWT authentication middleware
│   │   │   │   ├── checkOrigin.ts # Origin validation middleware
│   │   │   │   ├── errorHandler.ts # Global error handler
│   │   │   │   └── rateLimit.ts   # Rate limiting configuration
│   │   │   ├── models/            # Mongoose schemas
│   │   │   │   ├── App.ts         # Application model
│   │   │   │   ├── Category.ts    # Category model
│   │   │   │   ├── Counter.ts     # Auto-increment counter model
│   │   │   │   └── User.ts        # User model
│   │   │   ├── repositories/      # Data access layer
│   │   │   │   ├── appRepository.ts
│   │   │   │   ├── categoryRepository.ts
│   │   │   │   └── userRepository.ts
│   │   │   ├── routes/            # API routes
│   │   │   │   ├── api.ts         # Main API routes
│   │   │   │   └── auth.ts        # Authentication routes
│   │   │   ├── services/          # Business logic layer
│   │   │   │   ├── appService.ts
│   │   │   │   ├── authService.ts
│   │   │   │   └── categoryService.ts
│   │   │   ├── utils/             # Utility functions
│   │   │   │   └── security.ts    # Password hashing utilities
│   │   │   ├── validators/        # Zod validation schemas
│   │   │   │   ├── appValidator.ts
│   │   │   │   ├── categoryValidator.ts
│   │   │   │   ├── userValidator.ts
│   │   │   │   └── index.ts       # Validator middleware
│   │   │   └── server.ts          # Express app entry point
│   │   ├── .dockerignore          # Docker ignore file
│   │   ├── .env.example           # Environment variables template
│   │   ├── Dockerfile             # Docker configuration
│   │   ├── package.json           # Backend dependencies
│   │   ├── project.json           # Nx project configuration
│   │   └── tsconfig.json          # TypeScript configuration
│   │
│   └── frontend/                   # Frontend application
│       ├── dist/                   # Production build (generated)
│       ├── node_modules/           # Frontend dependencies (generated)
│       ├── public/                 # Static assets
│       │   ├── icon-192.png       # PWA icon (192x192)
│       │   ├── icon-512.png       # PWA icon (512x512)
│       │   ├── manifest.json      # PWA manifest
│       │   └── sw.js              # Service Worker
│       ├── scripts/               # Build scripts
│       │   ├── generate-icons.js  # Icon generator script
│       │   └── log-api.js         # API testing script
│       ├── src/
│       │   ├── assets/            # Static assets
│       │   │   ├── fonts/         # IRANYekanX font files
│       │   │   │   ├── IRANYekanX-Regular.woff2
│       │   │   │   ├── IRANYekanX-Medium.woff2
│       │   │   │   ├── IRANYekanX-DemiBold.woff2
│       │   │   │   └── IRANYekanX-Bold.woff2
│       │   │   └── digikala-logo.svg
│       │   ├── data/              # Data layer
│       │   │   ├── api.ts         # API client functions
│       │   │   ├── apps.ts        # Apps data store
│       │   │   ├── categories.ts  # Categories data store
│       │   │   ├── icons.tsx      # Icon components (empty)
│       │   │   ├── types.ts       # TypeScript interfaces
│       │   │   └── README.md      # Data structure documentation
│       │   ├── hooks/             # Custom React hooks
│       │   │   └── useInstallPrompt.ts # PWA install hook
│       │   ├── pages/             # Page components
│       │   │   ├── LauncherPage.tsx    # Main launcher page
│       │   │   └── iconPaths.ts        # SVG path definitions
│       │   ├── App.tsx            # Root component
│       │   ├── ErrorBoundary.tsx  # Error boundary component
│       │   ├── constants.ts       # Application constants
│       │   ├── fonts.ts           # Font loading
│       │   ├── index.css          # Global styles
│       │   ├── main.tsx           # Application entry point
│       │   ├── observability.ts   # Sentry integration
│       │   └── vite-env.d.ts      # Vite type declarations
│       ├── .dockerignore          # Docker ignore file
│       ├── .env.example           # Environment variables template
│       ├── Dockerfile             # Docker configuration
│       ├── index.html             # HTML entry point
│       ├── nginx.conf             # Nginx configuration for production
│       ├── package.json           # Frontend dependencies
│       ├── postcss.config.js      # PostCSS configuration
│       ├── project.json           # Nx project configuration
│       ├── tailwind.config.js     # Tailwind CSS configuration
│       ├── tsconfig.json          # TypeScript configuration
│       ├── tsconfig.node.json     # TypeScript config for Vite
│       └── vite.config.ts         # Vite configuration
│
├── node_modules/                   # Root dependencies (generated)
├── .gitignore                      # Git ignore rules
├── docker-compose.yml              # Docker Compose configuration
├── nx.json                         # Nx workspace configuration
├── package.json                    # Root package configuration
└── README.md                       # This file
```

### Key Directories Explained

#### Backend Structure

**`config/`** - Configuration management
- Database connection with pooling and error handling
- JWT secret and expiration settings

**`controllers/`** - HTTP request handlers
- Thin layer that delegates to services
- Handles request/response formatting

**`middleware/`** - Express middleware
- Authentication verification
- CORS and origin checking
- Global error handling
- Rate limiting for auth endpoints

**`models/`** - Mongoose schemas
- MongoDB document definitions
- Auto-incrementing ID logic with Counter model
- Timestamp management

**`repositories/`** - Data access layer
- Abstract database operations
- Reusable query functions
- No business logic

**`services/`** - Business logic layer
- Application-specific logic
- Orchestrates repositories
- Transaction handling

**`validators/`** - Input validation
- Zod schema definitions
- Request body validation
- Type-safe validation

#### Frontend Structure

**`data/`** - Data management layer
- API client functions
- Data stores (apps, categories)
- Type definitions
- Well-documented for easy modification

**`hooks/`** - Custom React hooks
- PWA installation logic
- Reusable stateful logic

**`pages/`** - Page components
- LauncherPage: Main application UI
- Icon path definitions for SVG rendering

**`constants.ts`** - Centralized configuration
- Breakpoints, timing, layout constants
- Single source of truth for magic numbers

**`observability.ts`** - Error tracking
- Sentry integration for production
- Console fallback for development

---

## 🔧 Development

### Development Commands

```bash
# Install all dependencies
npm install

# Run both frontend and backend concurrently
npm run dev

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend

# Build backend
cd apps/backend && npm run build

# Build frontend
cd apps/frontend && npm run build

# Type checking
cd apps/backend && npx tsc --noEmit
cd apps/frontend && npx tsc --noEmit
```

### Code Organization Best Practices

#### Backend

1. **Controllers** - Keep thin, delegate to services
2. **Services** - Business logic, orchestrate repositories
3. **Repositories** - Database operations only
4. **Validators** - Define Zod schemas for all inputs
5. **Middleware** - Reusable cross-cutting concerns

#### Frontend

1. **Components** - Small, reusable, single responsibility
2. **Hooks** - Extract stateful logic
3. **Constants** - No magic numbers in code
4. **Data Layer** - Separate API calls from UI

### Adding New Features

#### Adding a New App

1. Navigate to `apps/frontend/src/data/README.md`
2. Follow the instructions to add a new app to `apps.ts`
3. Or use the backend API to create apps dynamically

#### Adding a New Category

1. Add to backend via API: `POST /api/category`
2. Or add to frontend `categories.ts` for static categories

#### Adding a New API Endpoint

1. Create validator in `apps/backend/src/validators/`
2. Create repository function in `apps/backend/src/repositories/`
3. Create service function in `apps/backend/src/services/`
4. Create controller in `apps/backend/src/controllers/`
5. Add route in `apps/backend/src/routes/`

### Database Schema

#### User Collection
```javascript
{
  _id: ObjectId,
  id: Number (auto-increment),
  username: String (unique, 3-30 chars),
  password: String (bcrypt hashed),
  createdAt: Date
}
```

#### App Collection
```javascript
{
  _id: ObjectId,
  id: Number (auto-increment),
  name: String (required),
  englishName: String,
  description: String,
  url: String,
  keywords: [String],
  icon_background_color: String,
  icon: {
    url: String
  },
  category: String,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

#### Category Collection
```javascript
{
  _id: ObjectId,
  id: Number (auto-increment),
  name: String (required),
  order: Number,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

#### Counter Collection
```javascript
{
  _id: ObjectId,
  name: String (unique: 'user', 'app', 'category'),
  seq: Number (auto-incrementing)
}
```

### Testing the API

Use the included health check and test scripts:

```bash
# Check backend health
curl http://localhost:1338/health

# Test API endpoint
cd apps/frontend
npm run log-api

# Manual API testing with curl
curl -X POST http://localhost:1338/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

---

## 🚢 Deployment

### Docker Deployment (Recommended)

The project includes complete Docker support with multi-stage builds.

#### Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v
```

#### Services

- **MongoDB** - `localhost:27017`
  - Persistent volume: `mongo-data`
  - Health check: ping database every 10s
  
- **Backend** - `localhost:1338`
  - Depends on MongoDB
  - Mounts `./apps/backend/uploads` for static files
  - Health check: `/health` endpoint
  
- **Frontend** - `localhost:3000`
  - Depends on Backend
  - Nginx serving static files
  - Production-optimized build

#### Individual Docker Builds

**Backend:**
```bash
cd apps/backend
docker build -t dhr-backend .
docker run -p 1338:1338 --env-file .env dhr-backend
```

**Frontend:**
```bash
cd apps/frontend
docker build -t dhr-frontend \
  --build-arg VITE_BACKEND_URL=http://localhost:1338 \
  .
docker run -p 3000:80 dhr-frontend
```

### Production Deployment

#### Prerequisites

1. **MongoDB Atlas** or self-hosted MongoDB instance
2. **Node.js 22+** on production server
3. **Nginx** for reverse proxy (optional)
4. **SSL Certificate** for HTTPS (recommended)

#### Environment Setup

**Backend Production `.env`:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dhr
PORT=1338
JWT_SECRET_CODE=<strong-random-secret-use-openssl-rand-base64-32>
JWT_EXPIRE_TIME=7d
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX=3
FRONTEND_URL=https://your-domain.com
NODE_ENV=production
```

**Frontend Production `.env`:**
```env
VITE_BACKEND_URL=https://api.your-domain.com
VITE_SENTRY_DSN=https://your-sentry-dsn
VITE_APP_RELEASE=v1.0.0
```

#### Build for Production

```bash
# Backend
cd apps/backend
npm install --production
npm run build

# Frontend
cd apps/frontend
npm install
npm run build
```

#### Process Management with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd apps/backend
pm2 start dist/server.js --name dhr-backend

# Monitor
pm2 monit

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Nginx Configuration

**Backend Reverse Proxy (`/etc/nginx/sites-available/dhr-backend`):**
```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://localhost:1338;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Frontend Static Files (`/etc/nginx/sites-available/dhr-frontend`):**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /path/to/dhr_home/apps/frontend/dist;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Service Worker must be served with correct MIME type
    location /sw.js {
        add_header Cache-Control "no-cache";
        add_header Service-Worker-Allowed "/";
    }

    # PWA manifest
    location /manifest.json {
        add_header Cache-Control "no-cache";
    }

    # Static assets with caching
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable sites:
```bash
sudo ln -s /etc/nginx/sites-available/dhr-backend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/dhr-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Deployment Checklist

- [ ] Update environment variables for production
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Configure MongoDB connection string
- [ ] Setup SSL certificates
- [ ] Configure CORS origins
- [ ] Setup Sentry for error tracking
- [ ] Configure rate limiting
- [ ] Setup database backups
- [ ] Configure CDN for static assets (optional)
- [ ] Setup monitoring and alerting
- [ ] Test PWA installation
- [ ] Test service worker caching
- [ ] Load testing
- [ ] Security audit

---

## 🔒 Security

### Implemented Security Measures

#### Authentication & Authorization
- **JWT Tokens** with HTTP-only cookies
- **bcrypt** password hashing (10 salt rounds)
- **Rate limiting** on auth endpoints (3 attempts per 10 minutes)
- **Token expiration** (configurable, default 24h)

#### HTTP Security
- **Helmet.js** for security headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
- **CORS** with origin whitelist
- **HPP** protection against parameter pollution

#### Input Validation
- **Zod schemas** for all API inputs
- **MongoDB injection** prevention via Mongoose
- **XSS protection** through proper escaping

#### Best Practices
- Secrets stored in environment variables
- No sensitive data in logs
- Graceful error handling without leaking info
- HTTP-only cookies prevent XSS token theft
- Secure cookies in production (HTTPS only)

### Security Recommendations

1. **Use Strong JWT Secrets**
   ```bash
   # Generate a strong secret
   openssl rand -base64 32
   ```

2. **Enable HTTPS in Production**
   - Never run production without SSL/TLS
   - Use Let's Encrypt for free certificates

3. **Regular Dependency Updates**
   ```bash
   npm audit
   npm audit fix
   ```

4. **Database Security**
   - Use MongoDB authentication
   - Enable MongoDB SSL/TLS
   - Restrict MongoDB network access
   - Regular backups

5. **Monitor Failed Login Attempts**
   - Rate limiting is configured
   - Consider adding IP blocking for repeated failures

6. **Environment Variables**
   - Never commit `.env` files
   - Use secrets management in production (AWS Secrets Manager, HashiCorp Vault)

7. **Content Security Policy**
   - Consider adding CSP headers
   - Restrict script sources

---

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start

**Problem:** `MONGODB_URI is not defined`
```
Solution: Create apps/backend/.env file with proper MongoDB connection string
```

**Problem:** `MongoDB connection error`
```
Solution: 
- Check if MongoDB is running: docker ps or sudo systemctl status mongod
- Verify connection string is correct
- Check network connectivity
- Ensure MongoDB allows connections from your IP
```

**Problem:** `Port 1338 already in use`
```
Solution:
- Change PORT in .env file
- Or kill process using the port: lsof -ti:1338 | xargs kill -9
```

#### Frontend issues

**Problem:** `Failed to fetch` or CORS errors
```
Solution:
- Ensure backend is running
- Check VITE_BACKEND_URL in frontend/.env
- Verify FRONTEND_URL in backend/.env matches frontend origin
- Check browser console for specific CORS errors
```

**Problem:** Background image not loading
```
Solution:
- Verify background.png exists in apps/backend/uploads/
- Check browser network tab for 404 errors
- Ensure backend serves static files: /uploads route
```

**Problem:** Service Worker not registering
```
Solution:
- Service Worker only works on HTTPS or localhost
- Check browser console for SW errors
- Ensure sw.js is in public folder
- Clear browser cache and try again
```

#### Database issues

**Problem:** Auto-increment IDs not working
```
Solution:
- Counter collection may be missing
- Create manually in MongoDB:
  db.counters.insertMany([
    { name: 'user', seq: 0 },
    { name: 'app', seq: 0 },
    { name: 'category', seq: 0 }
  ])
```

**Problem:** Duplicate key error
```
Solution:
- Check for existing documents with same unique field
- Drop and recreate collection if in development
- Ensure Counter collection is working properly
```

#### Docker issues

**Problem:** Container exits immediately
```
Solution:
- Check container logs: docker logs dhr_backend
- Verify environment variables in docker-compose.yml
- Ensure MongoDB is healthy before backend starts
```

**Problem:** Cannot connect to MongoDB in Docker
```
Solution:
- Use service name instead of localhost: mongodb://mongo:27017/dhr
- Verify networks in docker-compose.yml
- Check if MongoDB container is running: docker ps
```

### Debug Mode

Enable detailed logging:

**Backend:**
```env
NODE_ENV=development
```

**Frontend:**
```env
MODE=development
```

### Getting Help

1. **Check Logs**
   ```bash
   # Backend
   docker logs dhr_backend
   # or
   npm run dev:backend
   
   # Frontend
   docker logs dhr_frontend
   # or
   npm run dev:frontend
   ```

2. **MongoDB Logs**
   ```bash
   docker logs dhr_mongo
   ```

3. **Health Check**
   ```bash
   curl http://localhost:1338/health
   ```

4. **Database Inspection**
   ```bash
   # Connect to MongoDB
   docker exec -it dhr_mongo mongosh dhr
   
   # Show collections
   show collections
   
   # Query data
   db.apps.find().pretty()
   db.categories.find().pretty()
   db.counters.find().pretty()
   ```


