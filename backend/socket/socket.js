import http from "http"
import express from "express"
import { Server } from "socket.io"

let app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://realtimechatapp-oj22.onrender.com",
        methods: ["GET", "POST"],
    }
})
const userSocketMap = {}
export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
}

// In socket.io we always call "user" as socket//
io.on("connection", (socket)=>{
    // emit -> send //
    // on -> receive //
    const userId=socket.handshake.query.userId
   if (userId) {
  userSocketMap[userId] = socket.id; // overwrite safely
}
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        if(userId){
            delete userSocketMap[userId]
        }
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })



}) 



export {app, server, io}
