require('dotenv').config();
const http = require("http");
const cors = require("cors");
const { Server, Socket } = require("socket.io");
const path = require("path");
const express = require("express");
const { convertToCodeFormat } = require("./util")
const executeCodeRoutes = require("./routes/execute-routes");
const { SocketEvent, USER_CONNECTION_STATUS } = require("./types");
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

let userSocketMap = []; // Array to store user objects

// Function to get all users in a room
function getUsersInRoom(roomId) {
  return userSocketMap.filter((user) => user.roomId === roomId);
}

// Function to get room ID by socket ID
function getRoomId(socketId) {
  const roomId = userSocketMap.find(
    (user) => user.socketId === socketId
  )?.roomId;

  if (!roomId) {
    console.error("Room ID is undefined for socket ID:", socketId);
    return null;
  }
  return roomId;
}

// Function to get a user by socket ID
function getUserBySocketId(socketId) {
  const user = userSocketMap.find((user) => user.socketId === socketId);
  if (!user) {
    console.error("User not found for socket ID:", socketId);
    return null;
  }
  return user;
}

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);


  socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
    const isUsernameExist = getUsersInRoom(roomId).filter(
      (user) => user.username === username
    );
    if (isUsernameExist.length > 0) {
      // Notify the client that the username already exists
      io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
      return;
    }
    const user = {
      username,
      roomId,
      status: USER_CONNECTION_STATUS.ONLINE,
      cursorPosition: 0,
      typing: false,
      socketId: socket.id,
      currentFile: null,
    };
    userSocketMap.push(user);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
    const users = getUsersInRoom(roomId);
    io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
  });

  socket.on("disconnecting", () => {
    const user = getUserBySocketId(socket.id);

    if(!user)
      return;
    
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
    userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id);
    socket.leave(roomId);

  });

  socket.on(SocketEvent.USER_OFFLINE, ({ socketId }) => {

		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) 
      {
				return { ...user, status: USER_CONNECTION_STATUS.OFFLINE };
			}
			return user;
		});

		const roomId = getRoomId(socketId);

		if (!roomId) 
      return;

		socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { socketId });

	});

  socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {
    userSocketMap = userSocketMap.map((user) => {
      if(user.socketId === socketId)
      {
        return { ...user, status: USER_CONNECTION_STATUS.ONLINE };
      }
      return user;
    });

    const roomId = getRoomId(socketId);

    if (!roomId) 
      return;

    socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId });
  });

  socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
    userSocketMap = userSocketMap.map((u) => {
      if(u.socketId === socket.id)
      {
        return { ...u, typing: true, cursorPosition }
      }
      return u;
    });
    const user = getUserBySocketId(socket.id);
    
    if(!user)
      return;
    
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user });

  });

  socket.on(SocketEvent.TYPING_PAUSE, () => {
    userSocketMap = userSocketMap.map((u) => {
      if(u.socketId === socket.id)
      {
        return { ...u, typing: false };
      }
      return u;
    });

    const user = getUserBySocketId(socket.id);
    
    if(!user)
      return;

    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user });
  });

});

// Handle "/api/code/execute" route
app.use("/api/code", executeCodeRoutes);

server.listen(PORT, () => {
  console.log("<-----SERVER IS RUNNING----->");
});