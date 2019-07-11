const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;
const users = require("./routes/api/users");

app.use(express.json())

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");   // test message
});

app.use("/api/users", users);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});
