"use strict";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.PORTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        console.log("User Connected", socket.id);
        socket.on("join-room", ({ room, userName }) => {
            socket.join(room);
            console.log(`User ${userName} joined room ${room}`);
            socket.to(room).emit("user_joined", `${userName} joined the room`);
        });
        socket.on("message", ({ room, message, sender }) => {
            console.log(`Message: ${message} from ${sender}`);
            socket.to(room).emit("message", { sender, message });
        });
        socket.on("disconnect", () => {
            console.log(`User Disconnected ${socket.id}`);
        });
    });
    httpServer.listen(port, () => {
        console.log(`Server is running on http://${hostname}:${port}`);
    });
});
