require('dotenv').config();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const express = require("express");
const { main } = require("./execute"); 
const { convertToCodeFormat } = require("./util")
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

// Handle /execute route
app.post('/execute', async (req, res) => {
  const code = req.body.code;
  
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    console.log("Executing code...");
    const { type, output } = await main(code);

    if (type === 'stdout') {
      res.status(200).json({ success: true, output });
    } 
    else if (type === 'stderr') {
      res.status(200).json({ success: false, error: output });
    }
  } 
  catch (error) {
    console.error("Error during code execution:", error);
    res.status(500).json({ error: "An error occurred during code execution" });
  }
});

server.listen(PORT, () => {
  console.log("<-----SERVER IS RUNNING----->");
});