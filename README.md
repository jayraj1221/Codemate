# 🚀 CodeMate - Collaborative Code Editor

**CodeMate** is a real-time collaborative coding platform 🧑‍💻👩‍💻 that lets developers code together in the browser, execute code in multiple languages instantly, and share sessions live - all from a modern web interface. Whether you're pair programming, tutoring, or doing coding interviews, CodeMate makes real-time collaboration effortless.

---

## 🎯 Project Goal

The main objective of **CodeMate** is to provide:
- A **real-time collaborative code editor** for seamless programming with peers.
- **Instant code execution** for multiple programming languages using the Judge0 API.
- A **lightweight, browser-based IDE** that removes the need for setting up local environments.

---

## ✨ Features

- ⚡ **Real-Time Code Collaboration**  
  Edit and share code with others live - changes are synchronized instantly using Socket.IO.

- 🌐 **Multi-Language Code Execution**  
  Run code in languages like Python, JavaScript, C++, Java, and more via the Judge0 API.

- 🖥️ **Modern Code Editor**  
  Sleek, syntax-highlighted in-browser code editor for a smooth coding experience.

- 🔐 **User Authentication**  
  Sign up and log in securely. JWT-based sessions and MongoDB-backed user data.

- 💾 **Session Persistence**  
  Save coding sessions and revisit them later.

---

## 🛠️ Local Setup Guide

> 🧠 **Prerequisites:** Make sure you have **Node.js**, **npm**, and **MongoDB** installed.  
> You’ll also need a [Judge0 API key](https://judge0.com/).

---

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/sumit3105/CodeMate.git
cd CodeMate
```

---

### ⚙️ Step 2: Create Root-Level `.env` File

At the root of the project (same level as `client/` and `server/`), create a file named `.env` and add:

```env
JUDGE0_API_KEY=<your-judge0-api-key>
JWT_SECRET=<your-jwt-secret>
DEVELOPMENT_FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=<your-production-frontend-url>
MONGO_URI=<your-mongo-uri>
```

This root `.env` file is used by both Docker containers and backend configuration.

---

### 🧩 Step 3: Server Setup (Manual)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create a `.env` file with:
   ```bash
   API_KEY=<your-judge0-api-key>
   JWT_SECRET=<your-jwt-secret>
   MONGODB_CONNECTION=<your-mongodb-uri>
   DEVELOPMENT_FRONTEND_URL=http://localhost:5173
   PRODUCTION_FRONTEND_URL=<your-production-frontend-url>
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

---

### 🎨 Step 4: Client Setup (Manual)

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:5000/
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🐳 Containerization with Docker

You can run **both frontend and backend** of CodeMate using Docker containers - no manual setup required.

> 🧠 **Prerequisites:** Make sure you have **Docker** and **Docker Desktop** installed.

### 📁 Folder Overview

```
CodeMate/
│
├── client/           # React + Vite frontend
│   ├── Dockerfile
│
├── server/           # Node.js backend
│   ├── Dockerfile
│
├── docker-compose.yml
└── .env              # Root-level environment file
```

---

### 🧰 Step 5: Build and Run with Docker Compose

From the root of the project, simply run:

```bash
docker-compose --env-file .env up --build
```

This will:
- Build and start the **backend** container (Node.js)
- Build and start the **frontend** container (React + Nginx)
- Automatically connect both containers in a Docker network

Then open:
- Frontend → http://localhost:80  
- Backend API → http://localhost:5000  

---

## ✅ Verify Everything

Once containers are running:
- Visit **http://localhost**
- Login or Sign up
- Create a room and collaborate in real-time 🚀

---

## 🧹 Stop Containers

```bash
docker-compose down
```

---

## 💡 Technologies Used
- **Frontend:** React, Vite, TailwindCSS, Socket.IO client  
- **Backend:** Node.js, Express.js, Socket.IO, MongoDB (Mongoose), JWT  
- **Execution API:** Judge0  
- **Containerization:** Docker, Docker Compose  
- **Reverse Proxy:** Nginx  

---

## 🤝 Contributing
  Contributions are welcome!
  Feel free to open an issue to suggest features or report bugs.
  If you'd like to contribute directly:
  1. Fork the repository
  2. Create a new branch ```git checkout -b feature/YourFeature```
  3. Make your changes and commit ```git commit -m "Add YourFeature" ```
  4. Push to the branch ```git push origin feature/YourFeature ```
  5. Create a pull request ✅

Thank you for checking out CodeMate! <br>
Happy coding 👨‍💻👩‍💻