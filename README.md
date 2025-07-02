# 🌐 Open Library

![Open Library](./open-library.png)

## 🧾 Overview

Open Lobrary is a full-stack gardening tips platform where users can explore books, borrow books, connect with others. The site supports authentication, CRUD functionalities, filtering, and user-specific experiences.

---

## Live site & Relavent links

**Live Site URL**: [https://openlibrary-31653.web.app/](https://openlibrary-31653.web.app/)

**Server Code**:
[Server side repo](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-FreeCodeJunction)

## 🚀 Tech Stack

### 🔹 Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Firebase Authentication

### 🔹 Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)

---

## 🔑 Core Features

- 🔐 User Authentication (Login/Register with Firebase)
- 📦 Dynamic Content Fetching (via API)
- 🧩 JWT-Protected Routes
- 🛠️ Admin Access / Dashboard
- 💬 Real-time Feedback or Messaging
- 📱 Responsive Mobile-first Design

---

## 📦 Dependencies

### Client (`/client`)

```json
{
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "react-router-dom": "^6.x.x",
  "axios": "^1.x.x",
  "tailwindcss": "^3.x.x",
  "firebase": "^10.x.x"
}
```

### Server (`/server`)

```json
{
  "express": "^4.x.x",
  "mongoose": "^7.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x",
  "jsonwebtoken": "^9.x.x"
}
```

## 💻 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/FreeCodeJunction/open-library.git
cd open-library
```

### 2. Install Dependencies

- client

```bash
cd client
npm install
```

- server

```bash
cd ../server
npm install
```

### 3. Setup Environment Variables

- client

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

- server

```
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

### 4. Start Servers

- server

```bash
cd server
npm start
```

- client

```bash
cd ../client
npm run dev
```

### 5. Visit

```
http://localhost:3000
```
