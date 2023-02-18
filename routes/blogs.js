const express = require('express');

const Blog = require('../models/blogs.js');

// Initialize app
const router = express.Router();
router.get('/', function (req, res) {
    let blogs = Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else {
            res.json(blogs);
        }
    });
});
module.exports = router;