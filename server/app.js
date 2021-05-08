require('dotenv').config({});
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    socket.on('message', (payload) => {
        io.emit('message', payload);
    })
})

http.listen(process.env.PORT, () => {
    console.log(`App is listening ${process.env.PORT}`)
})