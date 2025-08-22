# URL Shortener Service

A high-performance URL shortening service built with Node.js, TypeScript, Express, and MongoDB. This service provides both REST API and tRPC endpoints for creating short URLs and redirecting users to original URLs.

## 🚀 Features

- **URL Shortening**: Convert long URLs to short, manageable links
- **Click Tracking**: Monitor how many times each short URL has been accessed
- **High Performance**: Redis caching for improved response times
- **Multiple API Interfaces**:
  - REST API (v1 and v2)
  - tRPC for type-safe API calls
- **Base62 Encoding**: Efficient short URL generation using base62 encoding
- **Comprehensive Logging**: Winston logger with daily rotation
- **Error Handling**: Centralized error handling with correlation IDs
- **Database Indexing**: Optimized MongoDB queries with proper indexing
- **Type Safety**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis
- **API**: tRPC for type-safe APIs
- **Validation**: Zod schema validation
- **Logging**: Winston with daily rotation
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd urlShortner/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/short_my_url
REDIS_URL=redis://localhost:6379
Redis_COUNTER_KEY=urlShortnerCounter
BASE_URL=http://localhost:3001
```

### 4. Start the Application

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:3001`

## 📚 API Documentation

### Postman Collection

📋 **Complete API Collection**: [URL Shortener API Collection](https://.postman.co/workspace/My-Workspace~2b341c6e-1d01-4e60-8d66-88c78e680db0/collection/23200684-d5a9fe58-3262-41be-a9e9-98aba6539117?action=share&creator=23200684)

Import this collection into Postman to test all available endpoints with pre-configured requests.

### Available Endpoints

#### tRPC Endpoints

- **Create Short URL**: `POST /trpc/url.create`
- **Get Original URL**: `GET /trpc/url.getOrginalUrl`

#### REST API Endpoints

- **Health Check**: `GET /api/v1/ping`
- **URL Redirection**: `GET /:shortUrl`

#### REST API v2

The v2 router is available at `/api/v2` for future API versions.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.ts        # MongoDB connection
│   │   ├── redis.ts     # Redis connection
│   │   ├── index.ts     # Server configuration
│   │   └── logger.config.ts # Winston logger setup
│   ├── controllers/     # Request handlers
│   │   ├── url.controller.ts # URL operations
│   │   └── ping.controller.ts # Health check
│   ├── middlewares/     # Express middlewares
│   │   ├── correlation.middleware.ts # Request correlation
│   │   └── error.middleware.ts # Error handling
│   ├── models/          # Database models
│   │   └── url.model.ts # URL schema
│   ├── repository/      # Data access layer
│   │   ├── url.repository.ts # URL database operations
│   │   └── cache.repository.ts # Redis cache operations
│   ├── routers/         # Route definitions
│   │   ├── trpc/        # tRPC router
│   │   ├── v1/          # API v1 routes
│   │   └── v2/          # API v2 routes
│   ├── service/         # Business logic
│   │   └── url.service.ts # URL shortening logic
│   ├── utils/           # Utility functions
│   │   ├── base62.ts    # Base62 encoding/decoding
│   │   └── errors/      # Custom error classes
│   ├── validators/      # Input validation schemas
│   └── server.ts        # Express server setup
├── logs/                # Application logs
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

| Variable            | Description               | Default                                  |
| ------------------- | ------------------------- | ---------------------------------------- |
| `PORT`              | Server port               | `3001`                                   |
| `MONGO_URI`         | MongoDB connection string | `mongodb://localhost:27017/short_my_url` |
| `REDIS_URL`         | Redis connection string   | `redis://localhost:6379`                 |
| `Redis_COUNTER_KEY` | Redis key for URL counter | `urlShortnerCounter`                     |
| `BASE_URL`          | Base URL for short links  | `http://localhost:3001`                  |

### Database Schema

The URL model includes:

- `orginalUrl`: The original long URL
- `shortUrl`: The generated short URL identifier
- `clicks`: Number of times the URL has been accessed
- `createdAt`: URL creation timestamp
- `updatedAt`: Last update timestamp

## 🚀 Performance Features

- **Redis Caching**: Frequently accessed URLs are cached in Redis
- **Database Indexing**: Optimized queries with indexes on `shortUrl` and `createdAt`
- **Base62 Encoding**: Efficient short URL generation
- **Connection Pooling**: Optimized database connections

## 📊 Logging

The application uses Winston for logging with:

- Daily log rotation
- Different log levels (error, warn, info, debug)
- Structured logging with correlation IDs
- Log files stored in the `logs/` directory

## 🛡️ Error Handling

- Centralized error handling middleware
- Custom error classes for different error types
- Correlation IDs for request tracking
- Graceful error responses

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm start`: Start production server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
