const express = require('express');

const Diary = require('../models/diaries.js');

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
router.get('/:id', function (req, res) {
    let diaryId = req.params.id;
    let diary = Diary.findById(diaryId, function (err, diary) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(diary);
      }
    });
  });
module.exports = router;