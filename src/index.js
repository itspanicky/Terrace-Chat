const express = require("express");
const app = express();
const http = require('http');
const socketio = require('socket.io')
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");

const server = http.createServer(app)
const io = socketio(server);
const socketEvents = require('./sockets/events')(io);

app.use(express.json())
app.use("/api/users", users)
app.use("/api/rooms", rooms)

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!!");   // test message
});

const port = process.env.PORT || 5000;

server.listen(port, () => {console.log(`Listening on port ${port}`)});
