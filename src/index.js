const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;
const users = require("./routes/api/users");
const socketio = requrie("socket.io")

const server = http.createServer(app);
const io = socketio(server);
const socketEvents = require('./sockets/events')(io);

app.use(express.json())
app.use("/api/users", users)

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");   // test message
});

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});
