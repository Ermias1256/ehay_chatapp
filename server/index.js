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
const CONNECTION_URL = process.env.LOCAL
  ? process.env.CONNECTION_URL_LOCAL
  : CONNECTION_URL;
const CLIENT_APP = process.env.LOCAL
  ? process.env.CLIENT_APP_LOCAL
  : CLIENT_APP;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_APP, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("join room", (roomId) => {
    if (roomId) socket.join(roomId);
    // console.log(`User with Id : ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send message", (msg) => {
    if (msg?.roomId) io.to(msg.roomId).emit("receive message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
