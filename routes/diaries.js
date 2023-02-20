const express = require('express');

const Diary = require('../models/diaries.js');
const Image = require('../models/image.js');

// Initialize app
const router = express.Router();
router.get('/', function (req, res) {
    let diaries = Diary.find({}, function(err, diaries){
        if(err){
            console.log(err);
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
      if (item.type == 'image') {
        const image = await Image.findOne({ img_id: item.value });
        if (image) {
          resultContent.push({
            type: item.type,
            value: item.value,
            img: image.img,
            caption: item.caption
          });
        }
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

module.exports = router;