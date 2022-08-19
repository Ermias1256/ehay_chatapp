import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { Server } from "socket.io";

import http from "http";

import userRoutes from "./routes/user.js";
import roomRoutes from "./routes/room.js";
import messageRoutes from "./routes/message.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`User with Id : ${socket.id} joined room: ${roomId}`);
  });

  socket.on("chat message", (msg) => {
    io.to(msg.roomId).emit("chat message", msg);
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
