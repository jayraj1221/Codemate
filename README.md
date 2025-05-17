# 🚀 CodeMate - Collaborative Code Editor

**CodeMate** is a real-time collaborative coding platform 🧑‍💻👩‍💻 that lets developers code together in the browser, execute code in multiple languages instantly, and share sessions live — all from a modern web interface. Whether you're pair programming, tutoring, or doing coding interviews, CodeMate makes real-time collaboration effortless.

---

## 🎯 Project Goal

The main objective of **CodeMate** is to provide:
- A **real-time collaborative code editor** for seamless programming with peers.
- **Instant code execution** for multiple programming languages using the Judge0 API.
- A **lightweight, browser-based IDE** that removes the need for setting up local environments.

---

## ✨ Features

- ⚡ **Real-Time Code Collaboration**  
  Edit and share code with others live — changes are synchronized instantly using Socket.IO.

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

> 🧠 Prerequisites: Make sure you have **Node.js**, **npm**, and **MongoDB** installed. You’ll also need a [Judge0 API key](https://judge0.com/).

---

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/jayraj1221/Codemate.git
cd Codemate
```

### 🧩 Step 2: Server Setup

  - 1️. Navigate to the server/ directory
      ```bash
      cd server
      ```
    2️. Create a ```.env``` file with the following variables:
      ```bash
      API_KEY=<your-judge0-api-key>
      JWT_SECRET=<your-jwt-secret>
      MONGODB_CONNECTION=<your-mongodb-connection-url>
      DEVELOPMENT_FRONTEND_URL=<your-local-client-app-url>
      PRODUCTION_FRONTEND_URL=<your-host-client-app-url>
      ```
      ✅ Replace placeholders with:    
      - Your Judge0 API Key
      - A secure JWT secret (e.g., a random string)
      - Your MongoDB URI (e.g., from MongoDB Atlas or local DB)
      - Your frontend development URL (e.g., http://localhost:5173)
      - Your production frontend URL if deploying later
  
    3️. Install backend dependencies
      ```bash
      npm install
      ```
    4️. Start the backend server
      ```bash
      npm run dev
      ```

### 🎨 Step 3: Client Setup

  - 1. Navigate to the client/ directory
       ```bash
       cd client
       ```
    2. Create a ```.env``` file with the following content:
       ```bash
       VITE_BACKEND_URL=http://localhost:5000/
       ```
       - 🛠️ Update the URL if your backend is running on a different host or port.
    3. Install frontend dependencies
       ```bash
       npm install
       ```
    4. Start the frontend development server
       ```bash
       npm run dev
       ```
       - 🌐 The app should open at http://localhost:5173 or the next available port.

### 🔗 Step 4: Using the Application
  1. Open the frontend in your browser → http://localhost:5173
  2. Create a new account or log in ✉️🔐
  3. Create a new room or join an existing one using the Room ID 🔗
  4. Start collaborating and coding in real-time with your peers 👯‍♀️👨‍👨‍👧‍👦
  4. Click the Run ▶️ button to execute the code and see the output instantly ⚙️

---

### 💡 Technologies Used
  - Frontend: React, Vite, TailwindCSS, Socket.IO client
  - Backend: Node.js, Express.js, Socket.IO, MongoDB (Mongoose), JWT
  - Code Execution: Judge0 API
  - Realtime Features: WebSockets (via Socket.IO)

---

### 🤝 Contributing
  Contributions are welcome!
  Feel free to open an issue to suggest features or report bugs.
  If you'd like to contribute directly:
  1. Fork the repository
  2. Create a new branch ```git checkout -b feature/YourFeature```
  3. Make your changes and commit ```git commit -m "Add YourFeature" ```
  4. Push to the branch ```git push origin feature/YourFeature ```
  5. Create a pull request ✅

Thank you for checking out CodeMate!
Happy coding 👨‍💻👩‍💻



