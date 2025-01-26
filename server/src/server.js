require('dotenv').config();
const { SocketEvent, USER_CONNECTION_STATUS } = require('./types');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const express = require("express");
const { convertToCodeFormat } = require("./util")
const executeCodeRoutes = require("./routes/execute-routes");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

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
    // console.log("User connected: " + socket.id);


    socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
        const isUsernameExist = getUsersInRoom(roomId).filter(
            (user) => user.username === username
        );
        if (isUsernameExist.length > 0) {
            // Notify the client that the username already exists
            io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
            return;
        }
        console.log("...............ROOM = " + roomId + " User  = " + username);
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
        console.log(userSocketMap)
        socket.join(roomId);
        socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
        const users = getUsersInRoom(roomId);
        io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
    });

    socket.on("disconnecting", () => {
		const user = getUserBySocketId(socket.id);
		
        if (!user) 
            return;

		const roomId = user.roomId;

		socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
		
        console.log("USER IS LEAVING .....>" + user.username);
        userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id);
		socket.leave(roomId);
	});

	socket.on(SocketEvent.USER_OFFLINE, ({ socketId }) => {

		userSocketMap = userSocketMap.map((u) => {
			if (u.socketId === socketId) 
            {
				return { ...u, status: USER_CONNECTION_STATUS.OFFLINE };
			}
			return u;
		});

		const roomId = getRoomId(socketId);

		if (!roomId) 
            return;

		socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { socketId });
	});
    socket.on(SocketEvent.FILE_UPDATED, (data) => {
        const {fileId , newContent} = data;
        const roomId = getRoomId(socket.id)
        // console.log(newContent)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
			fileId,
			newContent,
		})
    });
	socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {

		userSocketMap = userSocketMap.map((u) => {
			if (u.socketId === socketId)
            {
				return { ...u, status: USER_CONNECTION_STATUS.ONLINE };
			}
			return u;
		});

		const roomId = getRoomId(socketId);
		if (!roomId) 
            return;
		socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId });
	});

    socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {

		userSocketMap = userSocketMap.map((u) => {
			if (u.socketId === socket.id) 
            {
				return { ...u, typing: true, cursorPosition }
			}
			return u;
		});

		const user = getUserBySocketId(socket.id);
		
        if (!user)
            return;

		const roomId = user.roomId;

		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user });
	});

	socket.on(SocketEvent.TYPING_PAUSE, () => {
		userSocketMap = userSocketMap.map((u) => {
			if (u.socketId === socket.id) 
            {
				return { ...u, typing: false };
			}
			return u;
		});

		const user = getUserBySocketId(socket.id);

		if (!user)
            return;

		const roomId = user.roomId;

		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user });
	});

    socket.on(SocketEvent.SEND_MESSAGE, ({ msg }) => {
        let roomId = getRoomId(socket.id);
        
        if(!roomId)
            return;

        socket.broadcast.to(roomId).emit(SocketEvent.RECEIVE_MESSAGE, {msg});
    });
    socket.on("fileCreated",(newFile) => {
        console.log(newFile);
        let roomId = getRoomId(socket.id);
        socket.broadcast.to(roomId).emit("fileCreated",newFile)
    })

});

// Handle "/api/code/execute" route
app.use("/api/code", executeCodeRoutes);

server.listen(PORT, () => {
    console.log(`🚀 Server is live on port ${PORT}! Ready to rock and roll! 🎉`);
});
