// Load express module
const express = require('express');

// Initialize app
const app = express();

// Mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://emma_wang:wangzhiheng@panpan.vhe0yg4.mongodb.net/blogs?retryWrites=true&w=majority');
const db = mongoose.connection;

// Check for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB successfully!");
});
db.on('error', function(){
    console.log(err);
});

// Route for home
app.get('/', function (req, res) {
    res.send('hello world')
});

// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});

const blogs = require('./routes/blogs');
app.use('/blogs', blogs);