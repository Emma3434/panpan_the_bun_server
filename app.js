// Load express module
const express = require('express');

// to ensure client side run on same machine
const cors = require("cors");

// Initialize app
const app = express();

// Mongoose connection
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Check for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB successfully!");
});
db.on('error', function(){
    console.log(err);
});

// to ensure client side run on same machine
app.use(cors());

// Route for home
app.get('/', function (req, res) {
    res.send('hello world')
});

// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});

const diaries = require('./routes/diaries');
app.use('/diaries', diaries);

