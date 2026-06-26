## 📸 Project Screenshot

![Saffrona Project Screenshot](./src/assets/projectImage.png)

---

# Saffrona Backend

This is the backend repository for the **Saffrona** application. Built with Node.js, Express, and MongoDB, it provides a secure, scalable, and robust RESTful API infrastructure to handle user authentication, food menu management, shopping carts, and order processing.

---

## 🌐 Live Links

- **Frontend Live Site:** [https://saffrona.netlify.app/](https://saffrona.netlify.app/)


---

## ✨ Features

* **User Authentication:** Secure signup, login, and token-based authentication using JSON Web Tokens (JWT).
* **Menu Management:** Full CRUD operations for managing food items (including image uploads).
* **Shopping Cart System:** Dynamic cart management synced per user in the database.
* **Order Processing:** Smooth order creation, status tracking, and checkout flows.
* **Secure Middleware:** Route protection via custom JWT verification middleware.

---

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **File Uploads:** Multer

---

## 📁 Project Structure

```bash
saffrona-backend/
├── src/
│   ├── assets/
│   ├── config/
│   │   └── db.js                 # Database connection config
│   ├── controllers/
│   │   ├── cartController.js     # Logic for cart operations
│   │   ├── foodController.js     # Logic for menu items
│   │   ├── orderController.js    # Logic for checkout & orders
│   │   └── userController.js     # Logic for auth & user profiles
│   ├── models/
│   │   ├── foodModel.js          # Mongoose schema for food items
│   │   ├── orderModel.js         # Mongoose schema for orders
│   │   └── userModel.js          # Mongoose schema for users
│   ├── routes/
│   │   ├── cartRoute.js          # Cart endpoints
│   │   ├── foodRoute.js          # Food endpoints
│   │   ├── orderRoute.js         # Order endpoints
│   │   └── userRoute.js          # User endpoints
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   └── uploads/                  # Storage directory for food images
├── .env                          # Local environment variables
├── .gitignore
├── package.json
└── server.js                     # Main application entry point
```



## 🔐 Authentication & Security System

The authentication mechanism for Saffrona is built to ensure robust security and data privacy. It leverages **JSON Web Tokens (JWT)** for stateless session management and **bcryptjs** for secure credential hashing.

### ⚙️ Authentication Workflow
1. **User Registration:** When a new user signs up, their password is encrypted using a strong salt factor via `bcryptjs` before being stored in MongoDB.
2. **User Login:** Upon providing valid credentials, the backend compares the passwords. If verified, it signs and issues a unique **JWT token** containing the user's ID payload.
3. **Route Protection (Middleware):** For protected operations (like managing carts or placing orders), the frontend sends this token in the request headers. The `auth.js` middleware intercepts the request, decodes the token, validates it, and dynamically injects the `userId` into the request body.

---

### 🛠️ Core Security Functionalities

#### 1. User Authentication (`userController.js` & `userModel.js`)
* **`registerUser`:** Handles incoming registration data. It checks for duplicate emails (enforced by MongoDB's `unique` index), validates email formatting, ensures password complexity, hashes the password, and returns a fresh JWT token to log the user in immediately.
* **`loginUser`:** Validates existing user credentials. It uses `bcrypt.compare()` to securely match the plaintext input password against the stored database hash, regenerating a JWT session token upon success.

#### 2. Route Authorization Gatekeeper (`middleware/auth.js`)
* Acts as a global route guard for private end-points.
* Inspects incoming API requests for the `token` header.
* Uses `jwt.verify()` against the server-side `JWT_SECRET`. Once validated, it extracts the `userId` payload and binds it directly to `req.body.userId`, passing control to the final controller.

#### 3. Data Isolation & Integrity
* Cart structures are embedded directly within the individual user's document schema (`cartData: { type: Object, default: {} }`). This setup ensures that users can only modify or access their own shopping cart information once successfully authenticated.

---

## 📡 API Endpoints (Quick Reference)

### 🔑 Authentication (`/api/user`)
* `POST /api/user/register` - Register a new user & receive token
* `POST /api/user/login` - Authenticate user & receive token

### 🍔 Food Menu (`/api/food`)
* `GET /api/food/list` - Fetch all food items
* `POST /api/food/add` - Add a new food item (Admin only)
* `POST /api/food/remove` - Remove a food item (Admin only)

### 🛒 Cart (`/api/cart`) *[Protected]*
* `POST /api/cart/get` - Retrieve current user's cart data
* `POST /api/cart/add` - Add / increment an item in the cart
* `POST /api/cart/remove` - Decrement / remove an item from the cart

### 📦 Orders (`/api/order`) *[Protected]*
* `POST /api/order/place` - Place a new order
* `POST /api/order/userorders` - Get order history for the authenticated user
* `GET /api/order/list` - List all system orders (Admin tracking)
* `POST /api/order/status` - Update order dispatch status (Admin)
<br>
<br>


<p align="center"><b>Sudipto Das</b> | Amplifying human capability and scaling innovation with the speed of AI.</p>