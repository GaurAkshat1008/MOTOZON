# MERN E-commerce Application

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Features](#features)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)

---

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or Atlas)

## Backend Setup

1. Open a terminal in the `backend/` folder:
   ```bash
   cd backend
   ```
2. Create a `.env` file with the following values:
   ```env
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in development mode (with auto-reload):
   ```bash
   npm run dev
   ```
5. The backend API will be available at `http://localhost:5000`.

## Frontend Setup

1. Open a terminal in the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The frontend app will open at `http://localhost:3000`.

## Features

### 1. User Authentication & Authorization

- Registration and login (customers & admins)
- Password hashing with bcrypt
- JWT-based authentication
- Role-based protected routes (admin vs customer)
- Logout functionality

### 2. Product Management (Admin)

- Add, update, delete products
- Image upload via Multer
- Admin dashboard for CRUD operations

### 3. Product Display (Customer)

- Product listing in a responsive grid
- Product detail pages with images, price, stock
- "Add to Cart" functionality

### 4. Shopping Cart

- Add products to cart with quantity
- View cart page: update quantities, remove items
- Cart persistence in localStorage

### 5. Reviews & Ratings

- Customers can leave 1–5 star ratings and comments
- Prevent multiple reviews per user/product
- Display reviews on product detail pages

### 6. User Review History

- "My Reviews" page to view past reviews
- Links back to reviewed products

## Project Structure

```
backend/
  config/db.js       # MongoDB connection
  controllers/       # Business logic (auth, products, reviews)
  middleware/auth.js # JWT & role-based middleware
  models/            # Mongoose schemas (User, Product, Review)
  routes/            # API endpoints
  server.js          # Express app entry point

frontend/
  src/
    api/             # Axios config
    components/      # Navbar, route guards
    context/         # Auth & Cart context
    pages/           # All React page components
    index.js         # App bootstrap
    App.js           # Routes definition
    tailwind.config.js
```

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Order management & checkout flow
- Product search, filtering, sorting
- User profile & order history pages
- Pagination or infinite scroll
- UI/UX and responsive design refinements
