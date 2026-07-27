# NovaMart — Full-Stack E-Commerce Application

NovaMart is a modern full-stack e-commerce web application designed for showcasing and selling authentic Indian heritage products, including handicrafts, ethnic wear, organic wellness items, artisanal gourmet goods, and folk art.

## Table of Contents

- Overview
- Features
- Tech Stack
- Folder Structure
- API Endpoints
- Local Setup & Installation
- Database Seeding
- Environment Variables
- Deployment

---

## Overview

NovaMart delivers a responsive e-commerce experience featuring a dedicated landing page, product catalog with advanced filtering and sorting, interactive product detail gallery with a full-screen image lightbox, shopping cart management, and a header-anchored user profile management dropdown panel.

---

## Features

### 1. Authentication & Security
- User registration and login using JSON Web Tokens (JWT).
- Password hashing using bcrypt with 12 salt rounds.
- Protected client-side and server-side routes.
- Persistent session handling.

### 2. User Profile Dropdown
- Anchored directly below the profile button in the top navigation bar.
- Full-page backdrop blur overlay when opened.
- Read-only email address display.
- Editable First Name, Last Name, and Shipping Address (Address Lines 1 & 2, City, State, Zipcode).
- Password change functionality requiring current password verification.
- Dynamic visual feedback turning the update button green upon password match.
- Standard red logout action button.

### 3. Product Catalog, Search & Filtering
- Search bar with instant real-time query filtering.
- Category filtering via interactive category pill buttons and filter popover select.
- Max Price slider filter in steps of 100 (range 0 to 5000+).
- Custom sort dropdown supporting price ascending, price descending, and featured/newest sorting.

### 4. Product Detail & Image Lightbox
- Image gallery slider for products with multiple preview images.
- Interactive full-screen frosted glass lightbox modal.
- Controls for zooming images up to 300% scale and thumbnail navigation.
- Seller information and product specifications breakdown.

### 5. Shopping Cart
- Add items to cart with dynamic quantity selection.
- Update item quantities and remove items.
- Live order subtotal and total calculation.
- Demo checkout action button.

### 6. Mobile Responsiveness & SPA Client Routing
- Fully responsive layout for Desktop, Tablet, and Mobile viewports.
- Configured single-page application client routing rewrites to ensure seamless page refreshes across all routes.

---

## Tech Stack

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- React Icons (Hi2 outline set)
- React Hot Toast
- Vanilla CSS3 (Custom design system with design tokens)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose ORM
- JSON Web Token (JWT)
- BcryptJS
- Helmet & CORS
- Express Rate Limit

---

## Folder Structure

```
Nova-Mart/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── CartItem.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── CartPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── seed/
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── cart.controller.js
│   │   │   └── product.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── Cart.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── cart.routes.js
│   │   │   └── product.routes.js
│   │   └── app.js
│   ├── package.json
│   └── server.js
├── .gitignore
├── vercel.json
└── README.md
```

---

## API Endpoints

### Authentication & User Profile (`/api/auth`)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/signup` | Register new user account | Public |
| POST | `/login` | Authenticate user and return JWT token | Public |
| GET | `/me` | Get current logged-in user profile | Protected |
| PUT | `/profile` | Update user first name, last name, and address | Protected |
| PUT | `/change-password` | Update user password after verifying current password | Protected |

### Products (`/api/products`)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/` | Fetch products list with filtering, sorting, and search parameters | Public |
| GET | `/:id` | Fetch detailed product information by ID | Public |

### Cart (`/api/cart`)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/` | Fetch items in user shopping cart | Protected |
| POST | `/` | Add product item to shopping cart | Protected |
| PUT | `/:itemId` | Update quantity of a cart item | Protected |
| DELETE | `/:itemId` | Remove an item from shopping cart | Protected |

---

## Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB local instance or MongoDB Atlas URI

### 1. Clone Repository
```bash
git clone https://github.com/thesyedanas01/Nova-Mart.git
cd Nova-Mart
```

### 2. Server Configuration
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/novamart
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Database Seeding
To populate the database with initial products:
```bash
cd server
npm run seed
```

### 4. Client Configuration
Open a new terminal tab:
```bash
cd client
npm install
```

Create a `.env` file inside the `client/` directory (optional for local dev):
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## Deployment

- **Frontend**: Deployed on Vercel with single-page application rewrite configurations in `vercel.json`.
- **Backend**: Deployed as a Web Service on Render.com.
- **Database**: Hosted on MongoDB Atlas Cloud.

---

## License

This project is open source and available under the MIT License.
