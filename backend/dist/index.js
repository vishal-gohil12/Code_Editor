"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const room_1 = require("./routes/room");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/room", room_1.roomRoute);
const httpServer = app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
const io = new socket_io_1.Server(httpServer);
const socketMap = {};
const getAllClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: socketMap[socketId]
        };
    });
};
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on("join", ({ roomId, username }) => {
        socketMap[socket.id] = username;
        socket.join(roomId);
        const client = getAllClients(roomId);
        client.forEach(({ socketId }) => {
            io.to(socketId).emit("joined", {
                socketId: socket.id,
                username,
                client
            });
        });
    });
    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('leave', {
                socket: socket.id,
                username: socketMap[socket.id]
            });
            socket.leave(socket.id);
        });
        delete socketMap[socket.id];
    });
    socket.on('code-change', ({ roomId, code }) => {
        socket.in(roomId).emit('code-change', { code });
    });
    socket.on('code-sync', ({ code, socketId }) => {
        socket.in(socketId).emit('change', {
            code
        });
    });
    socket.on('output-change', ({ roomId, output }) => {
        socket.in(roomId).emit('output-change', { output });
    });
});
