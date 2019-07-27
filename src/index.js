const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;
const users = require("./routes/api/users");
const socketio = require("socket.io")

const io = require('socket.io')(http);
const socketEvents = require('./sockets/events')(io);
http.listen(3001, function() {
    console.log('listening on port 3001')
})



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
