// ต้องติดตั้ง: npm install express socket.io
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 3000;

// ให้บริการไฟล์ index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// จัดการการเชื่อมต่อ Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // 1. รับข้อความจากไคลเอนต์
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // 2. ส่งข้อความกลับไปให้ไคลเอนต์ทุกตัวที่เชื่อมต่ออยู่
    io.emit('chat message', msg);
  });
  
  // จัดการเมื่อผู้ใช้ตัดการเชื่อมต่อ
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// รันเซิร์ฟเวอร์
server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});