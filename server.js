const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const ACTIONS = require('./src/Actions');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`Server is running...`);
})

const userSocketMap = {};
function getAllConnectedUsers(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username: userSocketMap[socketId],
        };
    });
}

io.on('connection', (socket)=>{
    console.log(`Connected to port: ${socket.id}`);
    socket.on(ACTIONS.JOIN, ({roomId, username}) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedUsers(roomId);
        clients.forEach(({socketId}) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });
    socket.on(ACTIONS.CODE_CHANGE, ({code, roomId}) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
    })
    socket.on('disconnecting', () => {
        const room = [...socket.rooms];
        room.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});