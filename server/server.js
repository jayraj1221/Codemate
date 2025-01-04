require('dotenv').config();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const express = require("express");
const { convertToCodeFormat } = require("./util")
const executeCodeRoutes = require("./src/routes/execute-routes");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("User is connected: " + socket.id);
});

// Handle "/api/code/execute" route
app.use("/api/code", executeCodeRoutes);

server.listen(PORT, () => {
  console.log("<-----SERVER IS RUNNING----->");
});