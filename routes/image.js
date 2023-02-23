const express = require('express');
const Image = require('../models/image.js');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

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
        // } else if (image && image.data) {
        //   res.contentType(image.contentType);
        //   res.send(image.data);
        } else {
          res.json(image);
          // res.sendStatus(404);
        }
    });
});

router.post('/', upload.single('img'), function(req, res) {
  const newImage = new Image({
    img_id: req.body.img_id,
    img: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  });
  newImage.save(function(err, image) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(image);
    }
  });
});


router.put('/:id', async function(req, res) {
    try {
        const updatedImage = await Image.findByIdAndUpdate(req.params.id, {
            img: req.body.img
        }, { new: true });
        if (!updatedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
