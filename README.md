# 🖥️ Blog Management System

![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

A **full-stack blog management application** that lets users register, login, and manage blogs with full CRUD functionality. Built with **Node.js** on the backend and **React** on the frontend.

---

## 🌟 Features

- ✅ User Authentication (Register & Login) with JWT tokens
- ✅ Protected Routes for authenticated users
- ✅ Blog Management (Create, Read, Update, Delete)
- ✅ MongoDB storage (Database is being used)
- ✅ Responsive UI with **React** and **CSS**
- ✅ Validation & Error Handling
- ✅ Full test coverage using **Jest**

---

## 📂 Project Structure

### Root

```

Blog-Management/
├── backend/              # Express + MongoDB backend
├── frontend/             # React frontend
├── package.json          # Root config (concurrently, scripts)
└── README.md             # Project documentation

```

### Backend

```

backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Auth logic
│   └── blogController.js   # Blog CRUD
├── middlewares/
│   ├── authMiddleware.js   # JWT auth check
│   └── errorHandler.js     # Error handler
├── models/
│   ├── User.js             # User schema
│   └── Blog.js             # Blog schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   └── blogRoutes.js       # Blog endpoints
├── test/
│   └── blog.test.js        # Api test
├── utils/
│   └── seedDB.js           # Seeds default user & blog
├── app.js                  # Express setup
├── server.js               # Server bootstrap
├── .env                    # Env config
└── package.json            # Backend dependencies

```

### Frontend

```

frontend/src/
├── components/
│   ├── Navbar.js               # Responsive navigation bar
│   └── ProtectedRoutes.js      # Protect authenticated routes
│
├── pages/
│   ├── Register.js             # Registration form
│   ├── Login.js                # Login form
│   ├── Dashboard.js            # User dashboard (list blogs, create blog)
│   ├── BlogList.js             # Show all blogs (public)
│   ├── BlogForm.js             # Create/Edit blog (protected)
│   └──BlogView.js             # Display a single blog post (public)
│
├── service/
│   └── api.js                  # Axios API utility (with JWT support)
│
├── App.js                      # Routing & layout
├── index.js                    # Bootstraps React app
├── index.css                   # Global Tailwind styles
├── App.css                     # Extra component styles if needed
├── reportWebVitals.js          # Performance monitoring
└── setupTests.js               # Jest setup


```

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/Abi2947/Blog_Management_System.git
cd Blog_Management_System
```

2. Install all dependencies from root:

```bash
npm install
npm run intsall:all
```

3. Set environment variables in `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blogdb
JWT_SECRET=node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"cd 
DEFAULT_USER_EMAIL=admin@example.com
DEFAULT_USER_PASSWORD=admin123
DEFAULT_USER_NAME=admin
```

---

## 💻 Running the App

### Run both frontend and backend together

```bash
npm run dev
```

### Run backend only

```bash
cd backend
npm run dev
```

### Run frontend only

```bash
cd frontend
npm start
```

Access the app at: [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts

### From root

- `npm run install:all` – Installs backend + frontend dependencies
- `npm run dev:backend` - Runs the backend server.
- `npm run dev:frontend` - Run frontend server
- `npm run dev` – Runs both server concurrently.

### Backend

- `npm start` – Run production server
- `npm run dev` – Run dev server with nodemon
- `npm test` – Run API tests

### Frontend

- `npm start` – Run frontend dev server
- `npm run build` – Build frontend for production
- `npm test` – Run frontend tests

---

## 🛠 Technologies Used

- **Backend:** Node.js, Express, JWT, bcrypt, express-validator, Mangoose
- **Frontend:** React, CSS, React Router
- **Database:** MangoDB
- **Testing:** Jest, supertest
- **Storage:** JSON files (file-based storage)
- **Tools:** Concurrently for running full-stack

---

## ✨ Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Utsab Gautam** – Full-Stack Developer

---

## 📸 Screenshots

![Register](./backend/public/images/Register.png)
![Login](./backend/public/images/Login.png)
![Dashboard](./backend/public/images/Dashboard.png)
![Blogs](./backend/public/images/Blog.png)
