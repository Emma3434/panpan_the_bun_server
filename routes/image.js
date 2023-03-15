const express = require('express');
const Image = require('../models/image.js');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');

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
            res.json(image);
        }
    });
});

router.post('/', upload.single('img'), function(req, res) {
  // Read the file into a buffer
  const img_buffer = fs.readFileSync(req.file.path);

  let newImage = new Image({
    img_id: req.body.img_id || '',
    img: img_buffer
  });

  const error = newImage.validateSync(); // validate the new image
  
  if (error) {
    console.log(error);
    res.status(400).send(error.message);
  } else {
    newImage.save(function(err, image) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(image);
      }
    });
  }
});

router.put('/:id', upload.single('img'), async function(req, res) {
  const id = req.params.id;
  const img_id = req.body.img_id || '';

  let imageToUpdate = await Image.findById(id);

  if (!imageToUpdate) {
    res.status(404).send(`Image with id ${id} not found`);
    return;
  }

  if (img_id && img_id !== imageToUpdate.img_id) {
    const duplicateImage = await Image.findOne({ img_id });

    if (duplicateImage) {
      // Replace the existing image with the new image
      imageToUpdate.img_id = img_id;
      imageToUpdate.img = fs.readFileSync(req.file.path);
      await imageToUpdate.save();
      res.json(imageToUpdate);
      return;
    }
  }

  // Update the image with the new data
  imageToUpdate.img_id = img_id;
  imageToUpdate.img = fs.readFileSync(req.file.path);
  await imageToUpdate.save();
  res.json(imageToUpdate);
});

module.exports = router;
