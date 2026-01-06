# DHR Home - Digital HR Application Launcher

A modern, full-stack application launcher built with React, Node.js, Express, and MongoDB. Provides a centralized hub for accessing internal applications with an adaptive, beautiful UI.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)

## ✨ Features

- **Adaptive UI** - Automatically adjusts colors based on background image brightness
- **Smart Search** - Search apps by name, description, keywords (Persian & English)
- **Category Organization** - Customizable app categories with sorting
- **Responsive Design** - Dedicated mobile and desktop experiences
- **PWA Support** - Installable with offline capabilities
- **Secure Authentication** - JWT-based auth with HTTP-only cookies
- **Modern Stack** - React, TypeScript, Express, MongoDB

## 🛠 Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express 5, MongoDB, Mongoose, Zod, JWT  
**DevOps:** Docker, Docker Compose, Nx, Nginx

## 📦 Prerequisites

- Node.js >= 22.x
- npm >= 10.x
- MongoDB >= 6.0
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd dhr_home

# Install dependencies
npm install

# Configure environment variables (see Configuration section)

# Start MongoDB
docker run -d -p 27017:27017 --name mongo mongo:6.0

# Start both frontend and backend
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:1338

### Docker Deployment

```bash
# Configure .env files in apps/backend/ and apps/frontend/
# Then start containers
docker-compose up -d
```

## ⚙️ Configuration

### Backend Environment (`apps/backend/.env`)

```env
MONGODB_URI=mongodb://localhost:27017/dhr
PORT=1338
JWT_SECRET_CODE=your-super-secret-jwt-key-here
JWT_EXPIRE_TIME=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment (`apps/frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:1338
VITE_PORT=3000
VITE_HOST=0.0.0.0
```

## 📡 API Documentation

### Base URL: `http://localhost:1338`

### Authentication

**Register:**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "securepassword"
}
```

**Login:**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "securepassword"
}
```

**Logout:**
```http
POST /auth/logout
```

### Public Endpoints

**Get All Data (Apps & Categories):**
```http
GET /api/data
Origin: http://localhost:3000
```

Returns all categories with their apps in a structured format.

**Health Check:**
```http
GET /health
```

### Protected Endpoints (Require JWT Cookie)

**Create App:**
```http
POST /api/app
Cookie: token=<jwt-token>

{
  "name": "App Name",
  "englishName": "App Name",
  "description": "App description",
  "url": "/apps/app-slug",
  "keywords": ["keyword1", "keyword2"],
  "icon_background_color": "#FF0000",
  "icon": { "url": "/uploads/icon.png" },
  "category": "Category Name"
}
```

**Update App:**
```http
PUT /api/app/:id
Cookie: token=<jwt-token>
```

**Delete App:**
```http
DELETE /api/app/:id
Cookie: token=<jwt-token>
```

**Create Category:**
```http
POST /api/category
Cookie: token=<jwt-token>

{
  "name": "Category Name",
  "order": 1
}
```

**Update Category:**
```http
PUT /api/category/:id
Cookie: token=<jwt-token>
```

**Delete Category:**
```http
DELETE /api/category/:id
Cookie: token=<jwt-token>
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

### Rate Limiting

Auth endpoints limited to **1 request per 10 minutes** per IP.

## 🔧 Development

### Available Scripts

```bash
# Root level
npm run dev              # Start both backend and frontend
npm run dev:backend      # Start backend only
npm run dev:frontend     # Start frontend only

# Backend (apps/backend/)
npm run dev              # Development with nodemon
npm run build            # Build TypeScript
npm run start            # Run production build

# Frontend (apps/frontend/)
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview production build
```

### Adding Apps & Categories

**Via API:** Use the protected endpoints above (requires authentication)

**Direct Database:** Insert documents into MongoDB `apps` or `categories` collections

**Icon Files:** Place in `apps/backend/uploads/` and reference as `/uploads/icon.png`

## 🚢 Deployment

### Docker Production

```bash
docker-compose build
docker-compose up -d
docker-compose ps         # Check status
docker-compose logs -f    # View logs
```

### Manual Deployment

**Backend:**
```bash
cd apps/backend
npm run build
NODE_ENV=production npm start
```

**Frontend:**
```bash
cd apps/frontend
npm run build
# Serve dist/ folder with Nginx or any static server
```

### Production Checklist

- ✅ Set `NODE_ENV=production`
- ✅ Use strong `JWT_SECRET_CODE`
- ✅ Enable HTTPS
- ✅ Configure proper CORS origins
- ✅ Set secure cookie flags
- ✅ Use connection pooling for MongoDB
- ✅ Set up monitoring and logging

## 📁 Project Structure

```
dhr_home/
├── apps/
│   ├── backend/                 # Express API server
│   │   ├── src/
│   │   │   ├── config/         # Configuration files (DB, JWT)
│   │   │   ├── controllers/    # Route controllers
│   │   │   ├── middleware/     # Custom middleware
│   │   │   ├── models/         # Mongoose models
│   │   │   ├── repositories/   # Data access layer
│   │   │   ├── routes/         # API routes
│   │   │   ├── services/       # Business logic
│   │   │   ├── utils/          # Utility functions
│   │   │   ├── validators/     # Zod schemas
│   │   │   └── server.ts       # Entry point
│   │   ├── uploads/            # Static files (icons, images)
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── frontend/               # React application
│       ├── public/             # Static assets
│       │   ├── sw.js          # Service Worker
│       │   └── manifest.json  # PWA manifest
│       ├── src/
│       │   ├── assets/        # Images, fonts
│       │   ├── data/          # Data management
│       │   │   ├── api.ts     # API client
│       │   │   ├── apps.ts    # Apps store
│       │   │   ├── categories.ts
│       │   │   └── types.ts
│       │   ├── hooks/         # Custom React hooks
│       │   ├── pages/         # Page components
│       │   ├── constants.ts   # App constants
│       │   ├── fonts.ts       # Font loading
│       │   ├── observability.ts # Error tracking
│       │   └── main.tsx       # Entry point
│       ├── Dockerfile
│       ├── nginx.conf
│       ├── .env.example
│       └── package.json
│
├── docker-compose.yml          # Docker orchestration
├── nx.json                     # Nx configuration
└── package.json               # Root package.json
```

## 📱 PWA Features

- **Service Worker** for offline support
- **Installation banner** after 3 seconds
- **Caching strategy** for static and dynamic content
- **Manifest** with app icons and metadata
