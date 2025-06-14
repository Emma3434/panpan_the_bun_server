const express = require('express');

const Diary = require('../models/diaries.js');
const Image = require('../models/image.js');

// Initialize app
const router = express.Router();
router.get('/', function (req, res) {
    let diaries = Diary.find({}, function(err, diaries){
      if (err) {
        console.error('Error fetching diaries:', err);
        res.sendStatus(500);
      }
        else {
            res.json(diaries);
        }
    });
});

router.get('/:id', async function(req, res) {
  try {
    const diary = await Diary.findById(req.params.id);
    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }
    const content = diary.content;
    const resultContent = [];

    for (let i = 0; i < content.length; i++) {
      const item = content[i];
      if (item.type == 'single-image') {
        const image = await Image.findOne({ img_id: item.value });
        if (image) {
          resultContent.push({
            type: item.type,
            value: item.value,
            img: image.img, // convert image buffer to base64 string
            caption: item.caption
          });
        }
      } else if (item.type == 'double-image') {
        const images = await Promise.all(
          item.value.map(async (imageItem) => {
            const image = await Image.findOne({ img_id: imageItem.value });
            if (image) {
              return {
                value: imageItem.value,
                img: image.img, // convert image buffer to base64 string
                caption: imageItem.caption
              };
            }
          })
        );
        resultContent.push({
          type: 'double-image',
          value: images,
        });
      } else {
        resultContent.push(item);
      }
    }
    res.status(200).json({
      _id: diary._id,
      title: diary.title,
      date: diary.date,
      weather: diary.weather,
      content: resultContent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST request to create a new diary entry
router.post('/', async function(req, res) {
  try {
    const diary = new Diary({
      title: req.body.title,
      date: req.body.date,
      weather: req.body.weather,
      content: req.body.content
    });
    const newDiary = await diary.save();
    res.status(201).json(newDiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// PUT request to update an existing diary entry
router.put('/:id', async function(req, res) {
  try {
    const diary = await Diary.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      date: req.body.date,
      weather: req.body.weather,
      content: req.body.content
    }, { new: true });
    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }
    res.status(200).json(diary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;