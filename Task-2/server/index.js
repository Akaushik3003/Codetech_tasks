const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let messageHistory = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send previous messages
  socket.emit("messageHistory", messageHistory);

  // Handle new incoming message
  socket.on("sendMessage", (data) => {
    const msg = {
      user: data.user || "Anonymous",
      text: data.text,
      time: new Date().toLocaleTimeString()
    };

    messageHistory.push(msg);

    // Broadcast to all clients
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("✅ WebSocket server running on http://localhost:3001");
});
