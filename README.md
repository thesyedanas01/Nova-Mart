# 🛒 NovaMart — Mini Product + Cart Module

A full-stack e-commerce application built with **React**, **Node.js/Express**, and **MongoDB**.

## ✨ Features

- **Authentication** — JWT-based signup/login with bcrypt password hashing
- **Product Catalog** — Browsable product listing with search, category filter, and pagination
- **Shopping Cart** — Add/remove items with real-time quantity management and price calculation
- **Premium UI** — Dark glassmorphism design with smooth animations and responsive layout
- **Security** — Helmet, CORS, rate limiting, input validation

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + React Router v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Styling | Vanilla CSS (Glassmorphism Design System) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier) or local MongoDB

### 1. Clone & Setup Environment

```bash
# Clone the repository
git clone <your-repo-url>
cd Assignment

# Setup backend
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install

# Setup frontend
cd ../client
cp .env.example .env
npm install
```

### 2. Configure Environment Variables

**server/.env:**
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/novamart
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**client/.env:**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

### 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |

### Products (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports `?search=`, `?category=`, `?page=`, `?limit=`) |
| GET | `/api/products/:id` | Get single product |

### Cart (Protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart/:itemId` | Remove item from cart |

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set root directory to `client`
4. Add env variable: `VITE_API_URL=https://your-backend.onrender.com/api`

### Backend → Render
1. Create Web Service on [render.com](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables (MONGO_URI, JWT_SECRET, CLIENT_URL, NODE_ENV=production)

### Database → MongoDB Atlas
1. Create free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user and whitelist IPs (0.0.0.0/0 for Render)
3. Copy connection string to `MONGO_URI`

## 📁 Project Structure

```
Assignment/
├── server/                    # Express.js Backend
│   ├── src/
│   │   ├── config/db.js       # MongoDB connection
│   │   ├── models/            # Mongoose schemas
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/            # API routes
│   │   └── app.js             # Express configuration
│   ├── seed/seed.js           # Database seeder
│   └── server.js              # Entry point
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── api/axios.js       # Axios instance
│   │   ├── context/           # Auth & Cart providers
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route pages
│   │   ├── hooks/             # Custom hooks
│   │   └── index.css          # Design system
│   └── index.html             # Entry HTML
│
└── README.md
```
