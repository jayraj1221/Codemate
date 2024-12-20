const http  = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const path = require("path")
const express  = require("express");
const app = express();
const PORT = 5000

app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname,"public")))

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "*",
    },
    maxHttpBufferSize:1e8,
    pingTimeout:60000,
})

io.on("connection",(socket)=>{
    console.log("User is connected : " + socket.id);
})
server.listen(PORT,()=>{
    console.log("<-----SERVER IS RUNNING----->")
})