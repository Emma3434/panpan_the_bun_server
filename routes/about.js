const express = require('express');

const About = require('../models/about.js');

// Initialize app
const router = express.Router();
router.get('/', function (req, res) {
    let about = About.find({}, function(err, about){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else {
            res.json(about);
        }
    });
});

module.exports = router;