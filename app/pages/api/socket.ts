// pages/api/socket.ts (for Pages Router)
import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res?.socket?.server?.io) {
    console.log("Starting Socket.IO server...");

    const io = new Server(res?.socket?.server, {
      path: "/api/socketio",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("code_change", ({ roomId, code }) => {
        socket.to(roomId).emit("receive_code", code);
      });

      socket.on("join_room", (roomId) => {
        socket.join(roomId);
      });
    });
  }

  res.end();
}
