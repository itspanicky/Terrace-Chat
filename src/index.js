const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = require("../config/keys").mongoURI;

const port = process.env.PORT || 3000;

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));