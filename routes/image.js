const express = require('express');

const Image = require('../models/image.js');

// Initialize app
const router = express.Router();
router.get('/', function (req, res) {
    let image = Image.find({}, function(err, image){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else {
            res.json(image);
        }
    });
});
router.get('/:id', function (req, res) {
    const id = req.params.id;

    console.log(id);
  
    Image.findById(id, (err, image) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        // if (image) {
        //   res.contentType(image.contentType);
        //   res.send(image.data);
        // } else {
        //   res.sendStatus(404);
        // }
        res.json(image)
      }
    });
  });

module.exports = router;