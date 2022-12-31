const express = require('express');
const {Server} = require('socket.io')
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket)=> {
    console.log(`socket connected ${socket.id}`);
})
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})